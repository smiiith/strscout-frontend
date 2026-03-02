import { NextRequest, NextResponse } from "next/server";
import { createClient, createAdminClient } from "@/utils/supabase/server";
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
    const supabaseAdmin = createAdminClient();

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

    // Build the redirect URL: after clicking the link, /auth/callback exchanges the PKCE
    // code for a session and redirects to complete-registration for password setup.
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL!;
    const nextPath = `/feedback-genius/complete-registration?propertyId=${encodeURIComponent(propertyId)}&invited=true`;
    const redirectTo = `${siteUrl}/auth/callback?next=${encodeURIComponent(nextPath)}`;

    // Create the permanent user with email pre-confirmed so no second confirmation
    // email is sent by Supabase.
    const { data: newUserData, error: createError } = await supabaseAdmin.auth.admin.createUser({
      email,
      email_confirm: true,
      app_metadata: { role: "freemium" },
    });

    if (createError || !newUserData?.user) {
      console.error("Error creating user:", createError);
      return NextResponse.json(
        { error: "Failed to create account" },
        { status: 500 }
      );
    }

    const newUserId = newUserData.user.id;

    // Generate a password recovery link. Despite the name, generateLink({ type: 'recovery' })
    // produces an implicit-flow link — GoTrue appends tokens as URL hash fragments on the
    // redirectTo URL, not as a ?code= param. complete-registration handles this by decoding
    // the JWT from the hash manually (bypassing the PKCE browser client entirely).
    const { data: linkData, error: linkError } = await supabaseAdmin.auth.admin.generateLink({
      type: "recovery",
      email,
      options: { redirectTo },
    });

    if (linkError || !linkData) {
      console.error("Error generating recovery link:", linkError);
      await supabaseAdmin.auth.admin.deleteUser(newUserId);
      return NextResponse.json(
        { error: "Failed to generate registration link" },
        { status: 500 }
      );
    }

    // Store pending conversion with new_user_id already known so transfer-property-ownership
    // can run as soon as the link is clicked (in /auth/callback), before password is set.
    const { error: insertError } = await supabaseAdmin
      .from("pending_conversions")
      .insert({
        anonymous_user_id: anonymousUserId,
        email: email,
        property_id: propertyId,
        new_user_id: newUserId,
      });

    if (insertError) {
      console.error("Error storing pending conversion:", insertError);
      await supabaseAdmin.auth.admin.deleteUser(newUserId);
      return NextResponse.json(
        { error: "Failed to store conversion data" },
        { status: 500 }
      );
    }

    // Send a single email with the recovery link. Because the user is pre-confirmed,
    // no second Supabase confirmation email will be sent.
    const emailResponse = await resend.emails.send({
      from: "STR Feedback Genius <noreply@strsage.com>",
      to: email,
      subject: "Your Report Is Ready — Set Your Password to View It",
      react: RegistrationInviteEmail({
        email: email,
        registrationUrl: linkData.properties.action_link,
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
