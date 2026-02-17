import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { Resend } from "resend";
import FeedbackGeniusMagicLinkEmail from "@/components/email/FeedbackGeniusMagicLinkEmail";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const { email, propertyId } = await request.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    // Get current anonymous session
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session || !session.user.is_anonymous) {
      return NextResponse.json(
        { error: "No anonymous session found" },
        { status: 400 }
      );
    }

    // Check if email already exists in the system
    const { data: existingUser } = await supabase
      .from("profiles")
      .select("id")
      .eq("primary_email", email)
      .single();

    if (existingUser) {
      // Email already registered - send them to login page with magic link
      const { data, error } = await supabase.auth.signInWithOtp({
        email: email,
        options: {
          emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/properties/comps/${propertyId}`,
        },
      });

      if (error) {
        console.error("Error sending magic link to existing user:", error);
        return NextResponse.json(
          { error: "Failed to send magic link" },
          { status: 500 }
        );
      }

      return NextResponse.json({
        success: true,
        message: "Magic link sent to existing account",
      });
    }

    // Send magic link email - this will convert the anonymous user to permanent when clicked
    const magicLinkUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/properties/comps/${propertyId}`;

    // Send OTP magic link - Supabase will handle converting anonymous user to permanent user
    const { data: otpData, error: otpError } =
      await supabase.auth.signInWithOtp({
        email: email,
        options: {
          emailRedirectTo: magicLinkUrl,
        },
      });

    if (otpError) {
      console.error("Error generating magic link:", otpError);
      return NextResponse.json(
        { error: "Failed to send magic link" },
        { status: 500 }
      );
    }

    // Note: Supabase will send its own magic link email
    // If you want to customize it, you can send via Resend instead:
    /*
    const emailResponse = await resend.emails.send({
      from: "STR Feedback Genius <noreply@strsage.com>",
      to: email,
      subject: "View Your Complete Feedback Genius Report",
      react: FeedbackGeniusMagicLinkEmail({
        magicLink: magicLinkUrl,
      }),
    });

    if (emailResponse.error) {
      console.error("Error sending email:", emailResponse.error);
    }
    */

    return NextResponse.json({
      success: true,
      message: "Magic link sent successfully",
    });
  } catch (error) {
    console.error("Error in convert-anonymous:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
