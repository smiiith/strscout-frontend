import { NextRequest, NextResponse } from "next/server";
import { createAdminClient, createClient } from "@/utils/supabase/server";

export async function POST(request: NextRequest) {
  try {
    const { email, password, propertyId } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    // Validate password requirements
    if (password.length < 10) {
      return NextResponse.json(
        { error: "Password must be at least 10 characters" },
        { status: 400 }
      );
    }

    const supabase = await createClient();
    const supabaseAdmin = createAdminClient();

    // Check if pending conversion exists for this email
    const { data: pendingConversion, error: conversionError } = await supabase
      .from("pending_conversions")
      .select("*")
      .eq("email", email)
      .is("converted_at", null)
      .single();

    if (conversionError && conversionError.code !== "PGRST116") {
      console.error("Error checking pending conversion:", conversionError);
    }

    // Build redirect URL for after email confirmation
    const origin = process.env.NEXT_PUBLIC_SITE_URL;
    const redirectPath = propertyId
      ? `/properties/comps/${propertyId}`
      : "/";
    const redirectUrl = `${origin}/auth/callback?next=${encodeURIComponent(redirectPath)}`;

    // Create new permanent user account
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        emailRedirectTo: redirectUrl,
      },
    });

    if (signUpError) {
      console.error("Sign up error:", signUpError);
      return NextResponse.json(
        { error: signUpError.message },
        { status: 400 }
      );
    }

    if (!signUpData.user) {
      return NextResponse.json(
        { error: "Failed to create user" },
        { status: 500 }
      );
    }

    // Set user role to freemium
    const { error: updateError } = await supabaseAdmin.auth.admin.updateUserById(
      signUpData.user.id,
      {
        app_metadata: { role: "freemium" },
      }
    );

    if (updateError) {
      console.error("Error updating app_metadata:", updateError);
    }

    // If pending conversion exists, mark it for property transfer
    if (pendingConversion) {
      const { error: updateConversionError } = await supabase
        .from("pending_conversions")
        .update({
          new_user_id: signUpData.user.id,
          converted_at: new Date().toISOString(),
        })
        .eq("id", pendingConversion.id);

      if (updateConversionError) {
        console.error("Error updating pending conversion:", updateConversionError);
      }
    }

    return NextResponse.json({
      success: true,
      message: "Account created successfully. Please check your email to confirm.",
      userId: signUpData.user.id,
    });
  } catch (error: any) {
    console.error("Error in complete-registration:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
