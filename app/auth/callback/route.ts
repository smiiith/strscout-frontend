import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const next = requestUrl.searchParams.get("next");


  const supabase = createClient();

  // Determine the redirect destination
  // Default to / if no next parameter provided
  const getRedirectUrl = () => {
    if (!next) {
      return new URL("/", requestUrl.origin);
    }

    // Validate that the redirect is to a path within our app (security)
    // Only allow paths starting with /
    if (next.startsWith("/") && !next.startsWith("//")) {
      return new URL(next, requestUrl.origin);
    }

    // If validation fails, use default
    console.warn("Invalid redirect_to parameter:", next);
    return new URL("/", requestUrl.origin);
  };

  // If there's a code, exchange it for a session (OAuth/PKCE flow)
  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      console.error("Error exchanging code for session:", {
        message: error.message,
        status: error.status,
        name: error.name,
        code: error.code,
      });
      const errorUrl = new URL("/auth/error", requestUrl.origin);
      errorUrl.searchParams.set("reason", error.message || "exchange_failed");
      return NextResponse.redirect(errorUrl);
    }

    return NextResponse.redirect(getRedirectUrl());
  }

  // If there's no code, check if session already exists (email confirmation flow)
  // Supabase may have already set the session via cookies during the redirect
  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();

  if (sessionError) {
    console.error("Auth callback - Error getting session:", sessionError);
    const errorUrl = new URL("/auth/error", requestUrl.origin);
    errorUrl.searchParams.set(
      "reason",
      sessionError.message || "session_error"
    );
    return NextResponse.redirect(errorUrl);
  }

  if (session) {
    // Check if this user needs property ownership transferred
    // This happens when anonymous session expired and we created a new account
    try {
      const transferResponse = await fetch(
        `${requestUrl.origin}/api/auth/transfer-property-ownership`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: session.user.id }),
        }
      );

      if (!transferResponse.ok) {
        console.error("Property transfer failed, but continuing...");
      }
    } catch (error) {
      console.error("Error during property transfer:", error);
      // Continue anyway - don't block the redirect
    }

    return NextResponse.redirect(getRedirectUrl());
  }

  // No code and no session - something went wrong
  console.error("Auth callback - No code and no session found");
  return NextResponse.redirect(
    new URL("/auth/error?reason=no_code_or_session", requestUrl.origin)
  );
}
