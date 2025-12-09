"use client";

import { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { usePostHog } from "posthog-js/react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Link from "next/link";

export function FloatingChatButton() {
  const [isOpen, setIsOpen] = useState(false);
  const posthog = usePostHog();

  const handleClick = () => {
    // Track the click event in PostHog
    posthog.capture("clicked_chat_cta");

    // Open the dialog
    setIsOpen(true);
  };

  return (
    <>
      {/* Floating Chat Button */}
      <button
        onClick={handleClick}
        className="fixed bottom-6 right-6 md:bottom-24 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-all hover:scale-110 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        aria-label="Open chat"
      >
        <MessageCircle className="h-6 w-6" />
      </button>

      {/* Agents Busy Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Chat Support</DialogTitle>
            <DialogDescription className="space-y-4 pt-4">
              <p>
                All of our support agents are currently busy helping other customers.
              </p>
              <p>
                We'd still love to hear from you! Please visit our contact page to send us a message and we'll get back to you as soon as possible.
              </p>
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-3 pt-4">
            <Button
              variant="outline"
              onClick={() => setIsOpen(false)}
            >
              Close
            </Button>
            <Button asChild>
              <Link href="/contact-us" onClick={() => setIsOpen(false)}>
                Contact Us
              </Link>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
