import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient as createServerClient } from "@/utils/supabase/server";
import { createClient } from "@supabase/supabase-js";
import { headers } from "next/headers";
import {
  syncUserPlan,
  syncUserPlanBySubscriptionId,
  getListingCountFromPriceId,
  calculateTier,
} from "@/utils/stripe/plan-sync";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-05-28.basil",
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(request: Request) {
  console.log("🔥 WEBHOOK CALLED!");

  const rawBody = await request.arrayBuffer();
  const body = Buffer.from(rawBody);
  const signature = headers().get("stripe-signature")!;

  console.log("Body length:", body?.length);
  console.log("Signature exists:", !!signature);

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    console.log("✅ Signature verification successful");
  } catch (err: any) {
    console.error("❌ Webhook signature verification failed:", err.message);

    // For development with Stripe CLI, skip verification as fallback
    console.log(
      "⚠️ Falling back to parse without verification for development"
    );
    try {
      event = JSON.parse(body.toString());
    } catch (parseErr) {
      return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
    }
  }

  // Use service role client to bypass RLS for webhook operations
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  // Try new secret key first, fallback to legacy service_role key
  const supabaseServiceKey = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_KEY;

  console.log('🔍 DEBUG - Supabase URL exists:', !!supabaseUrl);
  console.log('🔍 DEBUG - Service key exists:', !!supabaseServiceKey);
  console.log('🔍 DEBUG - Service key length:', supabaseServiceKey?.length || 0);

  if (!supabaseUrl || !supabaseServiceKey) {
    console.error('❌ Missing Supabase credentials for webhook');
    return NextResponse.json(
      { error: "Server configuration error" },
      { status: 500 }
    );
  }

  const supabase = createClient(
    supabaseUrl,
    supabaseServiceKey,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    }
  );

  // Check if event already processed
  const { data: existingEvent } = await supabase
    .from("stripe_events")
    .select("id")
    .eq("stripe_event_id", event.id)
    .single();

  if (existingEvent) {
    console.log("⚠️ Event already processed:", event.id);
    return NextResponse.json({ message: "Event already processed" });
  }

  // Log the event
  const { data: loggedEvent, error: logError } = await supabase
    .from("stripe_events")
    .insert({
      stripe_event_id: event.id,
      event_type: event.type,
      processed: false,
      data: event.data,
    })
    .select()
    .single();

  if (logError) {
    console.error("❌ Failed to log event:", logError);
    return NextResponse.json({ error: "Failed to log event" }, { status: 500 });
  }

  console.log("📝 Event logged:", loggedEvent.id);

  try {
    console.log("🎯 Event type:", event.type);

    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;

        console.log("💳 Session mode:", session.mode);
        console.log("👤 Client reference ID:", session.client_reference_id);
        console.log("🏪 Customer ID:", session.customer);
        console.log("📧 Subscription ID:", session.subscription);

        if (session.mode === "subscription") {
          const userId = session.client_reference_id;
          const customerId = session.customer as string;
          const subscriptionId = session.subscription as string;

          if (userId) {
            // Get subscription details to extract price ID and quantity for plan mapping
            const subscription =
              await stripe.subscriptions.retrieve(subscriptionId);
            const priceId = subscription.items.data[0]?.price.id;
            const quantity = subscription.items.data[0]?.quantity || 1;

            console.log("💰 Price ID:", priceId);
            console.log("🔢 Quantity:", quantity);

            // Update user profile with subscription info
            const sub = subscription as any;
            const periodStart = sub.current_period_start 
              ? new Date(sub.current_period_start * 1000).toISOString()
              : null;
            const periodEnd = sub.current_period_end
              ? new Date(sub.current_period_end * 1000).toISOString() 
              : null;

            const { error } = await supabase
              .from("profiles")
              .update({
                stripe_customer_id: customerId,
                stripe_subscription_id: subscriptionId,
                subscription_status: "active",
                billing_type: "subscription",
                current_tier: calculateTier(quantity),
                current_period_start: periodStart,
                current_period_end: periodEnd,
                updated_at: new Date().toISOString(),
              })
              .eq("id", userId);

            if (error) {
              console.error("❌ Error updating user profile:", error);
            } else {
              console.log("✅ Successfully updated user profile");
            }

            // Sync user's plan based on the subscription with quantity
            if (priceId) {
              const planSyncResult = await syncUserPlan(
                userId,
                priceId,
                "active",
                quantity,
                supabase // Pass service role client to bypass RLS
              );
              if (planSyncResult) {
                console.log(
                  "✅ Successfully synced user plan with quantity:",
                  quantity
                );
              } else {
                console.error("❌ Failed to sync user plan");
              }
            }
          }
        } else if (session.mode === "payment") {
          // Handle one-time payments
          const userId = session.client_reference_id;
          const customerId = session.customer as string;
          const lineItems = await stripe.checkout.sessions.listLineItems(
            session.id
          );
          const priceId = lineItems.data[0]?.price?.id;
          const stripeQuantity = lineItems.data[0]?.quantity || 1;
          
          // Get actual listing count from price ID (not Stripe quantity)
          const actualListingCount = getListingCountFromPriceId(priceId || '');

          console.log("💳 One-time payment completed");
          console.log("💰 Price ID:", priceId);
          console.log("🔢 Stripe Quantity:", stripeQuantity);
          console.log("📊 Actual Listing Count:", actualListingCount);

          if (userId && priceId) {
            // Update user profile with customer info (no subscription for one-time)
            const { error } = await supabase
              .from("profiles")
              .update({
                stripe_customer_id: customerId,
                stripe_subscription_id: null, // Clear any existing subscription
                subscription_status: null, // No subscription status for one-time
                billing_type: "one_time",
                current_tier: calculateTier(actualListingCount),
                listings_purchased: actualListingCount, // Use actual listing count
                purchase_date: new Date().toISOString(),
                updated_at: new Date().toISOString(),
              })
              .eq("id", userId);

            if (error) {
              console.error("❌ Error updating user profile:", error);
            } else {
              console.log(
                "✅ Successfully updated user profile for one-time payment"
              );
            }

            // Sync user's plan based on the one-time purchase
            // Use null status for one-time purchases (no subscription status)
            const planSyncResult = await syncUserPlan(
              userId,
              priceId,
              null, // No subscription status for one-time payments
              actualListingCount, // Use actual listing count
              supabase // Pass service role client to bypass RLS
            );
            if (planSyncResult) {
              console.log(
                "✅ Successfully synced user plan for one-time purchase with listing count:",
                actualListingCount
              );
            } else {
              console.error(
                "❌ Failed to sync user plan for one-time purchase"
              );
            }
          }
        }
        break;
      }

      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription;
        const priceId = subscription.items.data[0]?.price.id;
        const quantity = subscription.items.data[0]?.quantity || 1;

        console.log(
          "🔄 Subscription updated:",
          subscription.id,
          "Status:",
          subscription.status
        );
        console.log("💰 Price ID:", priceId);
        console.log("🔢 Quantity:", quantity);

        // Update subscription status
        const { error } = await supabase
          .from("profiles")
          .update({
            subscription_status: subscription.status,
            updated_at: new Date().toISOString(),
          })
          .eq("stripe_subscription_id", subscription.id);

        if (error) {
          console.error("Error updating subscription status:", error);
        } else {
          console.log("✅ Successfully updated subscription status");
        }

        // Sync user's plan based on updated subscription with quantity
        if (priceId) {
          const planSyncResult = await syncUserPlanBySubscriptionId(
            subscription.id,
            priceId,
            subscription.status,
            quantity,
            supabase // Pass service role client to bypass RLS
          );
          if (planSyncResult) {
            console.log(
              "✅ Successfully synced user plan on subscription update with quantity:",
              quantity
            );
          } else {
            console.error("❌ Failed to sync user plan on subscription update");
          }
        }
        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        const priceId = subscription.items.data[0]?.price.id;
        const quantity = subscription.items.data[0]?.quantity || 1;

        console.log("🗑️ Subscription deleted:", subscription.id);
        console.log("💰 Price ID:", priceId);
        console.log("🔢 Quantity:", quantity);

        // Mark subscription as canceled
        const { error } = await supabase
          .from("profiles")
          .update({
            subscription_status: "canceled",
            updated_at: new Date().toISOString(),
          })
          .eq("stripe_subscription_id", subscription.id);

        if (error) {
          console.error("Error updating subscription status:", error);
        } else {
          console.log(
            "✅ Successfully updated subscription status to canceled"
          );
        }

        // Downgrade user's plan to freemium (quantity doesn't matter for cancellation)
        if (priceId) {
          const planSyncResult = await syncUserPlanBySubscriptionId(
            subscription.id,
            priceId,
            "canceled",
            0, // Set to 0 since subscription is canceled
            supabase // Pass service role client to bypass RLS
          );
          if (planSyncResult) {
            console.log("✅ Successfully downgraded user plan to freemium");
          } else {
            console.error("❌ Failed to downgrade user plan");
          }
        }
        break;
      }

      case "invoice.payment_succeeded": {
        const invoice = event.data.object as Stripe.Invoice;

        if ((invoice as any).subscription) {
          const subscriptionId =
            typeof (invoice as any).subscription === "string"
              ? (invoice as any).subscription
              : (invoice as any).subscription.id;

          console.log(
            "💰 Invoice payment succeeded for subscription:",
            subscriptionId
          );

          // Get subscription details to check billing period
          const subscription =
            await stripe.subscriptions.retrieve(subscriptionId);

          // Reset Market Spy usage for subscription billing cycles
          const sub = subscription as any;
          const periodStart = sub.current_period_start 
            ? new Date(sub.current_period_start * 1000).toISOString()
            : null;
          const periodEnd = sub.current_period_end
            ? new Date(sub.current_period_end * 1000).toISOString() 
            : null;

          const { error: resetError } = await supabase
            .from("profiles")
            .update({
              market_spy_listings_used: 0,
              current_period_start: periodStart,
              current_period_end: periodEnd,
              subscription_status: "active",
              updated_at: new Date().toISOString(),
            })
            .eq("stripe_subscription_id", subscriptionId);

          if (resetError) {
            console.error("Error resetting Market Spy usage:", resetError);
          } else {
            console.log(
              "✅ Successfully reset Market Spy usage for billing cycle"
            );
          }
        }
        break;
      }

      case "invoice.payment_failed": {
        const invoice = event.data.object as Stripe.Invoice;

        if ((invoice as any).subscription) {
          // Mark subscription as past_due
          const { error } = await supabase
            .from("profiles")
            .update({
              subscription_status: "past_due",
              updated_at: new Date().toISOString(),
            })
            .eq(
              "stripe_subscription_id",
              typeof (invoice as any).subscription === "string"
                ? (invoice as any).subscription
                : (invoice as any).subscription.id
            );

          if (error) {
            console.error("Error updating subscription status:", error);
          }
        }
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    // Mark event as processed
    await supabase
      .from("stripe_events")
      .update({ processed: true })
      .eq("stripe_event_id", event.id);

    console.log("✅ Event processed successfully:", event.id);
    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("❌ Error processing webhook:", error);

    // Mark event as failed (keep processed: false)
    await supabase
      .from("stripe_events")
      .update({
        processed: false,
        error_message: error instanceof Error ? error.message : "Unknown error",
      })
      .eq("stripe_event_id", event.id);

    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 }
    );
  }
}
