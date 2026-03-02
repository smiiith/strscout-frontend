import { NextRequest, NextResponse } from "next/server";
import { createClient, createAdminClient } from "@/utils/supabase/server";

export async function POST(request: NextRequest) {
  try {
    const { accessToken, password } = await request.json();

    if (!accessToken || !password) {
      return NextResponse.json(
        { error: "Access token and password are required" },
        { status: 400 }
      );
    }

    const supabaseAdmin = createAdminClient();

    // Verify the access token and retrieve the user. The admin client validates
    // the JWT signature server-side without a network round-trip to GoTrue.
    const { data: userData, error: userError } =
      await supabaseAdmin.auth.getUser(accessToken);

    if (userError || !userData.user) {
      return NextResponse.json(
        { error: "Invalid or expired token. Please request a new invitation." },
        { status: 401 }
      );
    }

    const permanentUserId = userData.user.id;
    const email = userData.user.email!;

    // Set the user's password via the admin API (no confirmation email sent
    // because the user was created with email_confirm: true).
    const { error: updateError } =
      await supabaseAdmin.auth.admin.updateUserById(permanentUserId, {
        password,
      });

    if (updateError) {
      return NextResponse.json({ error: updateError.message }, { status: 500 });
    }

    // Transfer property ownership from the anonymous user to the permanent user.
    // We inline this here (rather than calling the HTTP route) so we can use the
    // correct permanent user ID — the auth/callback implicit-flow path gets the
    // anonymous session from cookies and passes the wrong ID.
    const { data: conversion } = await supabaseAdmin
      .from("pending_conversions")
      .select("*")
      .eq("new_user_id", permanentUserId)
      .is("converted_at", null)
      .order("created_at", { ascending: false })
      .limit(1)
      .single();

    if (conversion) {
      await supabaseAdmin
        .from("str_properties")
        .update({ user_id: permanentUserId })
        .eq("user_id", conversion.anonymous_user_id);

      await supabaseAdmin
        .from("pending_conversions")
        .update({ converted_at: new Date().toISOString() })
        .eq("id", conversion.id);

      console.log("Property ownership transferred in set-password:", {
        from: conversion.anonymous_user_id,
        to: permanentUserId,
        property_id: conversion.property_id,
      });
    }

    // Sign in server-side. Using createClient() (anon key + cookie adapter) in a
    // route handler writes the session to the response cookies, so the browser
    // immediately has a valid PKCE session — without needing the browser Supabase
    // client (which is blocked waiting on initializePromise processing the hash).
    const supabase = createClient();
    const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      console.error("Server-side sign-in after password set failed:", signInError);
    }

    // Return session tokens so the client can call setSession() on a fresh page
    // (free of the hung initializePromise caused by the implicit-flow hash tokens).
    // Server-side cookies may or may not be reliably forwarded via NextResponse.json,
    // so this is the belt-and-suspenders approach.
    return NextResponse.json({
      success: true,
      email,
      propertyId: conversion?.property_id ?? null,
      session: signInData?.session
        ? {
            access_token: signInData.session.access_token,
            refresh_token: signInData.session.refresh_token,
          }
        : null,
    });
  } catch (error) {
    console.error("Error in set-password:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
