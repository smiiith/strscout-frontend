"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import posthog from "posthog-js";

interface EmailCaptureDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  propertyId: string;
}

export function EmailCaptureDialog({
  open,
  onOpenChange,
  propertyId,
}: EmailCaptureDialogProps) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const supabase = createClient();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Validate email
      if (!email || !email.includes("@")) {
        setError("Please enter a valid email address");
        setLoading(false);
        return;
      }

      posthog.capture("try_email_capture_submitted", {
        page: window.location.pathname,
        propertyId: propertyId,
      });

      // Call API route to send registration invitation
      const response = await fetch("/api/auth/send-registration-invite", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          propertyId,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("API Error Response:", data);
        throw new Error(data.error || "Failed to create account");
      }

      console.log("API Success Response:", data);

      posthog.capture("try_email_capture_success", {
        page: window.location.pathname,
        propertyId: propertyId,
        email: email,
      });

      setSuccess(true);
    } catch (error: any) {
      console.error("Error capturing email:", error);
      setError(
        error.message ||
          "An error occurred. Please try again or contact support."
      );
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) {
      onOpenChange(false);
      // Reset state when dialog closes
      setTimeout(() => {
        setEmail("");
        setError("");
        setSuccess(false);
      }, 300);
    }
  };

  if (success) {
    return (
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Check Your Email! 📧</DialogTitle>
            <DialogDescription>
              We've sent a registration link to <strong>{email}</strong>
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-sm text-green-800 font-semibold mb-2">
                Next steps:
              </p>
              <ol className="text-sm text-green-800 list-decimal list-inside space-y-1">
                <li>Click the link in your email to create your account</li>
                <li>Set your password and complete registration</li>
                <li>Confirm your email address</li>
                <li>View your complete Feedback Genius report</li>
              </ol>
            </div>

            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                <strong>What you'll get with your free account:</strong>
              </p>
              <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
                <li>Complete detailed feedback for each category</li>
                <li>Specific improvement suggestions</li>
                <li>Title and description rewrites</li>
                <li>Up to 6 properties (free plan)</li>
                <li>3 assessments per property per month</li>
              </ul>
            </div>

            <div className="pt-4">
              <Button onClick={handleClose} className="w-full">
                Got It!
              </Button>
            </div>

            <p className="text-xs text-center text-muted-foreground">
              Didn't receive the email? Check your spam folder or{" "}
              <button
                onClick={() => {
                  setSuccess(false);
                  setEmail("");
                }}
                className="underline hover:text-primary"
              >
                try again
              </button>
            </p>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>View Your Complete Report</DialogTitle>
          <DialogDescription>
            Enter your email to receive a magic link and unlock the full
            detailed analysis of your listing.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              required
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}

          <div className="space-y-2">
            <p className="text-xs text-muted-foreground">
              By continuing, you'll create a free account and get access to:
            </p>
            <ul className="text-xs text-muted-foreground list-disc list-inside space-y-1">
              <li>Full detailed feedback and suggestions</li>
              <li>Up to 6 properties (free plan)</li>
              <li>3 assessments per property per month</li>
            </ul>
          </div>

          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={loading}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading} className="flex-1">
              {loading ? "Sending..." : "Send Magic Link"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
