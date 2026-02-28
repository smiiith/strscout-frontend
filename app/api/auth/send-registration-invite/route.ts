import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { Resend } from "resend";
import RegistrationInviteEmail from "@/components/email/RegistrationInviteEmail";

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

    const anonymousUserId = session.user.id;

    // Check if email already exists
    const { data: existingUser } = await supabase
      .from("profiles")
      .select("id")
      .eq("primary_email", email)
      .single();

    if (existingUser) {
      return NextResponse.json(
        { error: "An account with this email already exists. Please log in instead." },
        { status: 400 }
      );
    }

    // Store pending conversion in database
    // This allows us to transfer property ownership even if anonymous session expires
    const { error: insertError } = await supabase
      .from("pending_conversions")
      .insert({
        anonymous_user_id: anonymousUserId,
        email: email,
        property_id: propertyId,
      });

    if (insertError) {
      console.error("Error storing pending conversion:", insertError);
      return NextResponse.json(
        { error: "Failed to store conversion data" },
        { status: 500 }
      );
    }

    // Generate registration URL for anonymous user conversion
    const registrationUrl = new URL("/feedback-genius/complete-registration", process.env.NEXT_PUBLIC_SITE_URL!);
    registrationUrl.searchParams.set("email", email);
    registrationUrl.searchParams.set("propertyId", propertyId);

    const emailResponse = await resend.emails.send({
      from: "STR Feedback Genius <noreply@strsage.com>",
      to: email,
      subject: "Complete Your Registration to View Your Report",
      react: RegistrationInviteEmail({
        email: email,
        registrationUrl: registrationUrl.toString(),
      }),
    });

    if (emailResponse.error) {
      console.error("Error sending email:", emailResponse.error);
      return NextResponse.json(
        { error: `Failed to send registration email: ${emailResponse.error.message || emailResponse.error}` },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Registration invitation sent successfully",
    });
  } catch (error) {
    console.error("Error in send-registration-invite:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
