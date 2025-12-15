"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useForm } from "react-hook-form";
import posthog from "posthog-js";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ContactUsPage() {
  const router = useRouter();
  const { register, handleSubmit, reset } = useForm();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);

  const onSubmit = async (data: any) => {
    // Capture PostHog event
    posthog.capture("contact_us_form_submitted", {
      name: data.name,
      email: data.email,
      message: data.message,
    });

    // Send email notification
    try {
      await fetch("/api/send-contact-form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          message: data.message,
          website: data.website, // Honeypot field
        }),
      });
    } catch (error) {
      console.error("Failed to send email notification:", error);
      // Continue with form submission even if email fails
    }

    reset();
    setAlertOpen(true);
    setIsSubmitted(true);
  };

  return (
    <>
      <div>
        <Image
          src="/STR-Feedback-Genius-Logo-single-line.png"
          alt="STR Feedback Genius"
          width="754"
          height="72"
          className="w-[754] h-auto my-6"
        />

        <Card className="max-w-sm bg-background border-none">
          <form onSubmit={handleSubmit(onSubmit)}>
            <CardHeader>
              <CardTitle className="text-2xl">Contact us</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-8 mb-8">
                <div className="grid gap-2">
                  <Label htmlFor="name">Your name</Label>
                  <Input
                    id="name"
                    className="w-full md:w-[500px]"
                    required
                    {...register("name")}
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    className="w-full md:w-[500px]"
                    required
                    {...register("email")}
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="message">
                    Message{" "}
                    <span className="text-secondary-foreground/50">
                      (500 characters max)
                    </span>
                  </Label>
                  <Textarea
                    id="message"
                    placeholder="Enter your message..."
                    rows={5}
                    maxLength={500}
                    required
                    {...register("message")}
                    className="w-full md:w-[500px]"
                  />
                </div>

                {/* Honeypot field - hidden from humans, visible to bots */}
                <div
                  className="absolute left-[-9999px] w-[1px] h-[1px] opacity-0 pointer-events-none"
                  aria-hidden="true"
                >
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    type="text"
                    autoComplete="off"
                    tabIndex={-1}
                    {...register("website")}
                  />
                </div>

                <Button type="submit" className="w-fit">
                  Submit
                </Button>

                <AlertDialog open={alertOpen} onOpenChange={setAlertOpen}>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Thanks for reaching out
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        We will review your message and get back to you if
                        appropriate.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>
                        Leave another message
                      </AlertDialogCancel>
                      <AlertDialogAction onClick={() => router.push("/")}>
                        Home
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </CardContent>
          </form>
        </Card>
      </div>
    </>
  );
}
