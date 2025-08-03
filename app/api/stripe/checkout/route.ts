import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import Stripe from "stripe";
import { createClient } from "@/utils/supabase/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-05-28.basil",
});

export async function POST(request: Request) {
  try {
    const supabase = await createClient();

    // Get the current user
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const {
      priceId,
      quantity = 1,
      successUrl,
      cancelUrl,
      mode, // Add mode parameter
    } = await request.json();

    if (!priceId) {
      return NextResponse.json(
        { error: "Price ID is required" },
        { status: 400 }
      );
    }

    const baseUrl =
      process.env.NEXT_PUBLIC_APP_DOMAIN || "http://localhost:3005";

    // Ensure URLs are absolute
    const absoluteSuccessUrl =
      successUrl && successUrl.startsWith("http")
        ? successUrl
        : `${baseUrl}${successUrl || "/market-spy?success=true"}`;
    const absoluteCancelUrl =
      cancelUrl && cancelUrl.startsWith("http")
        ? cancelUrl
        : `${baseUrl}${cancelUrl || "/pricing?canceled=true"}`;

    // Determine checkout mode based on the mode parameter or price ID pattern
    const checkoutMode = mode || (priceId.includes('subscription') ? 'subscription' : 'payment');
    
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
      mode: checkoutMode,
      success_url: absoluteSuccessUrl,
      cancel_url: absoluteCancelUrl,
      metadata: {
        userId: user.id,
        quantity: quantity.toString(),
      },
    });

    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
