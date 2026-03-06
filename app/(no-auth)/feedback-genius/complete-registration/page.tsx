"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import Image from "next/image";
import posthog from "posthog-js";

export default function CompleteRegistration() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const propertyId = searchParams.get("propertyId") || "";
  // invited=true is set by send-registration-invite when it generates the invite link.
  // It tells this page the user arrived via an invite link and still needs to set a password
  // (as opposed to an already-registered user who should be redirected to their results).
  const invited = searchParams.get("invited") === "true";

  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isReady, setIsReady] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  // Holds the raw access token when the user arrives via an email invite link.
  // When set, password is updated server-side (via /api/auth/set-password) using this
  // token rather than through the Supabase browser client, because createBrowserClient
  // uses flowType:'pkce' and does not process implicit-flow hash tokens.
  const [inviteAccessToken, setInviteAccessToken] = useState("");

  const supabase = createClient();

  useEffect(() => {
    // Case 1: Returning from the hard-navigation step that replaces the hung anonymous
    // session with the permanent user's session. The session tokens were stashed in
    // sessionStorage by handleSubmit before the navigation.
    if (searchParams.get("signin_complete") === "1") {
      const raw = sessionStorage.getItem("pending_session");
      sessionStorage.removeItem("pending_session");
      const tokens = raw ? JSON.parse(raw) : null;

      const finish = async () => {
        if (tokens?.access_token && tokens?.refresh_token) {
          // Fresh Supabase client (no hash in URL, no hung initializePromise).
          await supabase.auth.setSession(tokens);
        }
        // Hard-navigate to the report so the new page gets a completely fresh JS
        // environment. router.push() (client-side navigation) preserves the Supabase
        // singleton whose internal state after setSession() can cause getSession() calls
        // on the destination page to hang, keeping the loading spinner indefinitely.
        // A hard navigation ensures the session is read cleanly from cookies, matching
        // the behaviour of a manual page refresh (which always works).
        window.location.href = propertyId
          ? `/properties/comps/${propertyId}`
          : "/feedback-genius/analyze";
      };

      finish();
      return;
    }

    const hash = window.location.hash;

    if (hash && hash.includes("access_token")) {
      // The admin generateLink({ type: 'recovery' }) produces an implicit-flow link that
      // appends tokens as URL hash fragments. createBrowserClient (flowType:'pkce') does not
      // process these hash tokens — calls to getSession() will either hang (real tokens
      // trigger a network exchange attempt) or return null (fake/expired tokens).
      // Instead, decode the JWT payload directly (no network request) to get the user's
      // email, store the raw token for server-side password update, and bypass the
      // Supabase client entirely.
      //
      // Note: we intentionally do NOT call window.history.replaceState here to clean up
      // the hash. React StrictMode runs effects twice; if we clean the hash on the first
      // run, the second run finds an empty hash and incorrectly redirects to the error page.
      // The hash disappears naturally when the user is redirected to the results page.
      const params = new URLSearchParams(hash.substring(1));
      const token = params.get("access_token");

      if (token) {
        try {
          const base64Url = token.split(".")[1];
          const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
          const payload = JSON.parse(atob(base64));

          setUserEmail(payload.email || "");
          setInviteAccessToken(token);
          setIsReady(true);
          return;
        } catch {
          // Malformed token — fall through to cookie-based session check
        }
      }
    }

    // No hash token: check the cookie-based session (set by auth/callback for PKCE flows).
    supabase.auth.getSession().then(({ data }) => {
      const session = data.session;

      if (!session) {
        router.push("/auth/error?reason=invite_expired");
        return;
      }

      if (!session.user.is_anonymous && !invited) {
        // Already a fully registered user not coming from an invite link — send to results
        router.push(propertyId ? `/properties/comps/${propertyId}` : "/");
        return;
      }

      if (session.user.email) {
        setUserEmail(session.user.email);
      }

      setIsReady(true);
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      if (password.length < 10) {
        setError("Password must be at least 10 characters");
        setIsLoading(false);
        return;
      }

      const hasUpperCase = /[A-Z]/.test(password);
      const hasLowerCase = /[a-z]/.test(password);
      const hasNumber = /[0-9]/.test(password);
      const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

      if (!hasUpperCase || !hasLowerCase || !hasNumber || !hasSpecialChar) {
        setError(
          "Password must contain uppercase, lowercase, number, and special character"
        );
        setIsLoading(false);
        return;
      }

      posthog.capture("try_complete_registration_submitted", {
        page: window.location.pathname,
        propertyId: propertyId,
        email: userEmail,
      });

      if (inviteAccessToken) {
        // Arrived via invite email link: set password server-side using the access token.
        // The route also transfers property ownership and signs in server-side (writing
        // session cookies), so no further auth calls are needed in the browser.
        const response = await fetch("/api/auth/set-password", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ accessToken: inviteAccessToken, password }),
        });

        const data = await response.json();

        if (!response.ok) {
          setError(data.error || "Failed to set password");
          setIsLoading(false);
          return;
        }

        // Stash the session tokens so the signin_complete page-load can call setSession()
        // on a fresh Supabase client (free of the hung initializePromise caused by the
        // implicit-flow hash tokens still in the current page's URL).
        if (data.session) {
          sessionStorage.setItem("pending_session", JSON.stringify(data.session));
        }

        // Clear any leftover anonymous session tokens from storage.
        localStorage.removeItem("anon_token");
        localStorage.removeItem("anon_user_id");
        localStorage.removeItem("anon_refresh_token");
        sessionStorage.removeItem("anon_token");
        sessionStorage.removeItem("anon_user_id");
        sessionStorage.removeItem("anon_refresh_token");

        posthog.capture("try_complete_registration_success", {
          page: window.location.pathname,
          propertyId: propertyId,
          email: userEmail,
        });

        // Hard-navigate away from the hash URL. The new page load has no hash, so
        // createBrowserClient initialises cleanly and setSession() works.
        const dest = new URL(window.location.href);
        dest.hash = "";
        dest.searchParams.set("signin_complete", "1");
        // Keep propertyId so the signin_complete handler can redirect correctly.
        if (propertyId) dest.searchParams.set("propertyId", propertyId);
        window.location.href = dest.toString();
        return;
      } else {
        // Cookie-based session (PKCE flow) — update password directly via the client.
        const { error: updateError } = await supabase.auth.updateUser({
          password,
        });

        if (updateError) {
          console.error("Error setting password:", updateError);
          setError(updateError.message);
          setIsLoading(false);
          return;
        }
      }

      // Clear any leftover anonymous session tokens from storage
      localStorage.removeItem("anon_token");
      localStorage.removeItem("anon_user_id");
      localStorage.removeItem("anon_refresh_token");
      sessionStorage.removeItem("anon_token");
      sessionStorage.removeItem("anon_user_id");
      sessionStorage.removeItem("anon_refresh_token");

      posthog.capture("try_complete_registration_success", {
        page: window.location.pathname,
        propertyId: propertyId,
        email: userEmail,
      });

      // Go straight to full results — session was established server-side
      if (propertyId) {
        router.push(`/properties/comps/${propertyId}`);
      } else {
        router.push("/feedback-genius/analyze");
      }
    } catch (error: any) {
      console.error("Error during registration:", error);
      setError(error.message || "An error occurred. Please try again.");
      setIsLoading(false);
    }
  };

  if (!isReady) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Image
        src="/STR-Feedback-Genius-Logo-single-line.png"
        alt="STR Feedback Genius"
        width="754"
        height="72"
        className="w-[754] h-auto my-6"
      />

      <h1 className="text-4xl mb-6">Set Your Password</h1>

      <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 max-w-2xl">
        <p className="text-sm text-green-800 font-semibold mb-1">
          Almost there! 🎉
        </p>
        <p className="text-sm text-green-800">
          Set a password to complete your free account. You'll be taken straight
          to your complete Feedback Genius report.
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 max-w-2xl">
          <p className="text-sm text-red-800">{error}</p>
        </div>
      )}

      <div className="max-w-sm bg-background border-none px-0">
        <form onSubmit={handleSubmit} className="space-y-6 pb-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={userEmail}
                disabled
                className="bg-gray-100"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <PasswordInput
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Setting Up Account..." : "View My Report"}
            </Button>
          </div>

          <div className="text-sm text-muted-foreground">
            Your password must contain at least one uppercase letter, one
            lowercase letter, one number and one special character. The minimum
            length for your password is 10 characters.
          </div>
        </form>
      </div>
    </div>
  );
}
