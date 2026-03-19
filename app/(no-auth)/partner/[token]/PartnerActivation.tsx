"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface Props {
  token: string;
  partnerName: string;
}

export default function PartnerActivation({ token, partnerName }: Props) {
  const router = useRouter();
  const supabase = createClient();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isCheckingSession, setIsCheckingSession] = useState(true);
  const [existingRealUser, setExistingRealUser] = useState(false);

  // On mount: check if user already has an active partner session
  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session?.user) {
        if (session.user.is_anonymous) {
          // Check if they're already a partner user with runs remaining
          const res = await fetch("/api/account");
          if (res.ok) {
            const data = await res.json();
            if (data.profile?.is_partner_user) {
              // Already activated — send them straight to the tool
              window.location.href = "/market-spy/analyze";
              return;
            }
          }
        } else {
          // Real logged-in user — can't use a partner token without logging out
          setExistingRealUser(true);
        }
      }

      setIsCheckingSession(false);
    };

    checkSession();
  }, []);

  const handleGetStarted = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Create invisible anonymous session
      const { data, error: signInError } =
        await supabase.auth.signInAnonymously();

      if (signInError || !data.session) {
        throw new Error("Failed to create session. Please try again.");
      }

      // Redeem the partner token and upgrade the anonymous profile
      const response = await fetch("/api/partner/redeem", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token,
          userId: data.user.id,
        }),
      });

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.error || "Failed to activate access.");
      }

      // Full page navigation so the server middleware picks up the fresh session cookies
      window.location.href = "/market-spy/analyze";
    } catch (err: any) {
      console.error("Partner activation error:", err);
      setError(err.message || "Something went wrong. Please try again.");
      setIsLoading(false);
    }
  };

  if (isCheckingSession) {
    return (
      <div className="max-w-lg mx-auto mt-16 px-4 text-center text-muted-foreground">
        Loading…
      </div>
    );
  }

  if (existingRealUser) {
    return (
      <div className="max-w-lg mx-auto mt-16 px-4 text-center">
        <h1 className="text-2xl font-bold mb-3">Already signed in</h1>
        <p className="text-muted-foreground mb-6">
          You&apos;re currently signed in to an account. Partner links create a
          fresh session. Please open this link in a private/incognito window, or
          sign out first.
        </p>
        <Button variant="outline" onClick={() => router.push("/")}>
          Go to homepage
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto mt-12 px-4 text-center">
      <div className="mb-8">
        <Image
          src="/market-spy-logo.png"
          alt="STR Market Spy"
          width={200}
          height={60}
          className="h-auto mx-auto mb-6"
        />
        <h1 className="text-3xl font-bold mb-3">You&apos;re invited</h1>
        <p className="text-lg text-muted-foreground">
          <span className="font-semibold text-foreground">{partnerName}</span>{" "}
          has given you free access to STR Market Spy — market intelligence for
          short-term rental properties.
        </p>
      </div>

      <div className="bg-muted/50 border rounded-xl p-6 mb-8 text-left space-y-3">
        <div className="flex items-start gap-3">
          <span className="text-green-600 font-bold mt-0.5">✓</span>
          <p className="text-sm">
            Analyze any address to find comparable short-term rentals nearby
          </p>
        </div>
        <div className="flex items-start gap-3">
          <span className="text-green-600 font-bold mt-0.5">✓</span>
          <p className="text-sm">
            See occupancy rates, pricing data, and competitive insights
          </p>
        </div>
        <div className="flex items-start gap-3">
          <span className="text-green-600 font-bold mt-0.5">✓</span>
          <p className="text-sm">No account or credit card required</p>
        </div>
      </div>

      {error && (
        <div className="bg-destructive/10 border border-destructive/20 text-destructive rounded-lg p-3 mb-4 text-sm">
          {error}
        </div>
      )}

      <Button
        size="lg"
        className="w-full"
        onClick={handleGetStarted}
        disabled={isLoading}
      >
        {isLoading ? "Setting up your access…" : "Get Started for Free"}
      </Button>

      <p className="text-xs text-muted-foreground mt-4">
        This is a single-use link. Your access is valid for 1 analysis run.
      </p>
    </div>
  );
}
