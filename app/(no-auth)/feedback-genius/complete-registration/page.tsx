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
  const email = searchParams.get("email") || "";
  const propertyId = searchParams.get("propertyId") || "";

  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [sessionChecked, setSessionChecked] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    // Check if user has anonymous session
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        // No session - that's OK, we'll create a new account
        setIsAnonymous(false);
        setSessionChecked(true);
        return;
      }

      if (!session.user.is_anonymous) {
        // User is already a permanent user, redirect to results
        if (propertyId) {
          router.push(`/properties/comps/${propertyId}`);
        } else {
          router.push("/");
        }
        return;
      }

      // Has anonymous session - we can convert it
      setIsAnonymous(true);
      setSessionChecked(true);
    };

    checkSession();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Validate password
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
        email: email,
        hasAnonymousSession: isAnonymous,
      });

      if (isAnonymous) {
        // Scenario 1: Anonymous session still exists - convert it
        const origin = window.location.origin;
        const redirectUrl = propertyId
          ? `${origin}/auth/callback?next=${encodeURIComponent(`/properties/comps/${propertyId}`)}`
          : `${origin}/auth/callback`;

        const { data, error: updateError } = await supabase.auth.updateUser(
          {
            email: email,
            password: password,
          },
          {
            emailRedirectTo: redirectUrl,
          }
        );

        if (updateError) {
          console.error("Error converting anonymous user:", updateError);
          setError(updateError.message);
          setIsLoading(false);
          return;
        }
      } else {
        // Scenario 2: Anonymous session expired - create new account
        const response = await fetch("/api/auth/complete-registration", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
            propertyId,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          console.error("Registration API error:", data);
          setError(data.error || "Failed to create account");
          setIsLoading(false);
          return;
        }
      }

      posthog.capture("try_complete_registration_success", {
        page: window.location.pathname,
        propertyId: propertyId,
        email: email,
        hasAnonymousSession: isAnonymous,
      });

      // Success! Redirect to confirmation page
      router.push("/confirmation?source=anonymous-conversion");
    } catch (error: any) {
      console.error("Error during registration:", error);
      setError(error.message || "An error occurred. Please try again.");
      setIsLoading(false);
    }
  };

  if (!sessionChecked) {
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

      <h1 className="text-4xl mb-6">Complete Your Registration</h1>

      <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 max-w-2xl">
        <p className="text-sm text-green-800 font-semibold mb-1">
          Your property analysis is ready! 🎉
        </p>
        <p className="text-sm text-green-800">
          Just set your password below to complete your free account and view
          your complete Feedback Genius report.
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
                value={email}
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
              {isLoading ? "Creating Account..." : "Complete Registration"}
            </Button>
          </div>

          <div className="text-sm text-muted-foreground">
            Your password must contain at least one uppercase letter, one
            lowercase letter, one number and one special character. The minimum
            length for your password is 10 characters.
          </div>

          <div className="text-sm text-muted-foreground">
            <strong>What happens next:</strong>
            <ol className="list-decimal list-inside mt-2 space-y-1">
              <li>We'll send a confirmation email to {email}</li>
              <li>Click the link in the email to verify your address</li>
              <li>You'll be automatically logged in</li>
              <li>View your complete Feedback Genius report</li>
            </ol>
          </div>
        </form>
      </div>
    </div>
  );
}
