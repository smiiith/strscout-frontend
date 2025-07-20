import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import Stripe from 'stripe';
import { createClient } from '@/utils/supabase/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-05-28.basil',
});

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    
    // Get the current user
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { priceId, quantity = 1, successUrl, cancelUrl } = await request.json();

    if (!priceId) {
      return NextResponse.json({ error: 'Price ID is required' }, { status: 400 });
    }

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3005';
    
    // Ensure URLs are absolute
    const absoluteSuccessUrl = successUrl && successUrl.startsWith('http') 
      ? successUrl 
      : `${baseUrl}${successUrl || '/account?success=true'}`;
    const absoluteCancelUrl = cancelUrl && cancelUrl.startsWith('http') 
      ? cancelUrl 
      : `${baseUrl}${cancelUrl || '/pricing?canceled=true'}`;

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      customer_email: user.email,
      client_reference_id: user.id,
      line_items: [
        {
          price: priceId,
          quantity: quantity,
        },
      ],
      mode: 'subscription',
      success_url: absoluteSuccessUrl,
      cancel_url: absoluteCancelUrl,
      metadata: {
        userId: user.id,
        quantity: quantity.toString(),
      },
    });

    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}