"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import posthog from "posthog-js";
import { useState } from "react";

interface EarlyAccessDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EarlyAccessDialog({ open, onOpenChange }: EarlyAccessDialogProps) {
  const { register, handleSubmit, reset } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);

    // Capture PostHog event
    posthog.capture("host_assist_early_access_requested", {
      name: data.name,
      email: data.email,
      message: data.message,
      property_count: data.propertyCount,
    });

    // Send email notification
    try {
      await fetch('/api/host-assist/early-access', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          message: data.message,
          propertyCount: data.propertyCount,
        }),
      });
    } catch (error) {
      console.error('Failed to send early access request:', error);
    }

    reset();
    setIsSubmitting(false);
    onOpenChange(false);
    setAlertOpen(true);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl">Request Early Access</DialogTitle>
            <DialogDescription>
              Join the waitlist for Host Assist. We're pre-selecting hosts for early access.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Your name</Label>
              <Input
                id="name"
                placeholder="John Doe"
                required
                {...register("name")}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                required
                {...register("email")}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="propertyCount">How many properties do you manage?</Label>
              <Input
                id="propertyCount"
                type="number"
                min="1"
                placeholder="e.g., 3"
                required
                {...register("propertyCount")}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">
                Tell us about your biggest hosting challenges{" "}
                <span className="text-muted-foreground">(optional)</span>
              </Label>
              <Textarea
                id="message"
                placeholder="What tasks are hardest to keep track of?"
                rows={4}
                maxLength={500}
                {...register("message")}
              />
            </div>

            <div className="flex gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="flex-1"
              >
                {isSubmitting ? "Submitting..." : "Request Access"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <AlertDialog open={alertOpen} onOpenChange={setAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              You're on the list! 🎉
            </AlertDialogTitle>
            <AlertDialogDescription>
              Thanks for requesting early access to Host Assist. We'll review your request
              and reach out soon with next steps.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setAlertOpen(false)}>
              Got it
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
