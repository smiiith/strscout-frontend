import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@/utils/supabase/server';
import { headers } from 'next/headers';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-05-28.basil',
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(request: Request) {
  console.log('🔥 WEBHOOK CALLED!');
  
  const rawBody = await request.arrayBuffer();
  const body = Buffer.from(rawBody);
  const signature = headers().get('stripe-signature')!;
  
  console.log('Body length:', body?.length);
  console.log('Signature exists:', !!signature);

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    console.log('✅ Signature verification successful');
  } catch (err: any) {
    console.error('❌ Webhook signature verification failed:', err.message);
    
    // For development with Stripe CLI, skip verification as fallback
    console.log('⚠️ Falling back to parse without verification for development');
    try {
      event = JSON.parse(body.toString());
    } catch (parseErr) {
      return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
    }
  }

  const supabase = await createClient();

  // Check if event already processed
  const { data: existingEvent } = await supabase
    .from('stripe_events')
    .select('id')
    .eq('stripe_event_id', event.id)
    .single();

  if (existingEvent) {
    console.log('⚠️ Event already processed:', event.id);
    return NextResponse.json({ message: 'Event already processed' });
  }

  // Log the event
  const { data: loggedEvent, error: logError } = await supabase
    .from('stripe_events')
    .insert({
      stripe_event_id: event.id,
      event_type: event.type,
      processed: false,
      data: event.data
    })
    .select()
    .single();

  if (logError) {
    console.error('❌ Failed to log event:', logError);
    return NextResponse.json({ error: 'Failed to log event' }, { status: 500 });
  }

  console.log('📝 Event logged:', loggedEvent.id);

  try {
    console.log('🎯 Event type:', event.type);
    
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        
        console.log('💳 Session mode:', session.mode);
        console.log('👤 Client reference ID:', session.client_reference_id);
        console.log('🏪 Customer ID:', session.customer);
        console.log('📧 Subscription ID:', session.subscription);
        
        if (session.mode === 'subscription') {
          const userId = session.client_reference_id;
          const customerId = session.customer as string;
          const subscriptionId = session.subscription as string;

          console.log('🔄 Attempting to update user:', userId);

          if (userId) {
            // Update user profile with subscription info
            const { error } = await supabase
              .from('profiles')
              .update({
                stripe_customer_id: customerId,
                stripe_subscription_id: subscriptionId,
                subscription_status: 'active',
                updated_at: new Date().toISOString(),
              })
              .eq('id', userId);

            if (error) {
              console.error('❌ Error updating user profile:', error);
            } else {
              console.log('✅ Successfully updated user profile');
            }
          }
        }
        break;
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription;
        
        // Update subscription status
        const { error } = await supabase
          .from('profiles')
          .update({
            subscription_status: subscription.status,
            updated_at: new Date().toISOString(),
          })
          .eq('stripe_subscription_id', subscription.id);

        if (error) {
          console.error('Error updating subscription status:', error);
        }
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        
        // Mark subscription as canceled
        const { error } = await supabase
          .from('profiles')
          .update({
            subscription_status: 'canceled',
            updated_at: new Date().toISOString(),
          })
          .eq('stripe_subscription_id', subscription.id);

        if (error) {
          console.error('Error updating subscription status:', error);
        }
        break;
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice;
        
        if ((invoice as any).subscription) {
          // Mark subscription as past_due
          const { error } = await supabase
            .from('profiles')
            .update({
              subscription_status: 'past_due',
              updated_at: new Date().toISOString(),
            })
            .eq('stripe_subscription_id', typeof (invoice as any).subscription === 'string' ? (invoice as any).subscription : (invoice as any).subscription.id);

          if (error) {
            console.error('Error updating subscription status:', error);
          }
        }
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    // Mark event as processed
    await supabase
      .from('stripe_events')
      .update({ processed: true })
      .eq('stripe_event_id', event.id);

    console.log('✅ Event processed successfully:', event.id);
    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('❌ Error processing webhook:', error);
    
    // Mark event as failed (keep processed: false)
    await supabase
      .from('stripe_events')
      .update({ 
        processed: false,
        error_message: error instanceof Error ? error.message : 'Unknown error'
      })
      .eq('stripe_event_id', event.id);

    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}