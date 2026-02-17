"use client";

import React, { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import {
  useForm,
  FormProvider,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { useRouter } from "next/navigation";
import LoadingOverlay from "@/components/LoadingOverlay";
import Image from "next/image";
import { CustomAlertDialog } from "@/components/AlertDialog";
import posthog from "posthog-js";
import AirbnbDirections from "@/components/AirbnbDirections";

const ERROR_FINDING_ID =
  "Could not find an Airbnb ID in the URL. Review the instructions below and try again.";

const formSchema = z.object({
  nickname: z.string().min(1, "Nickname is required"),
});
type Inputs = {
  address: string;
  propertyId: string;
};

const TryFeedbackGenius = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [notFoundMessage, setNotFoundMessage] = useState("");
  const [anonymousUserId, setAnonymousUserId] = useState<string | null>(null);
  const [anonymousToken, setAnonymousToken] = useState<string | null>(null);
  const supabase = createClient();

  const {
    register,
    handleSubmit,
    control,
    watch,
    setError,
    setValue,
    formState: { errors },
  } = useForm<Inputs>();

  // Create anonymous user on mount
  useEffect(() => {
    const initAnonymousUser = async () => {
      // Check if we already have an anonymous session
      const { data: { session } } = await supabase.auth.getSession();

      if (session?.user) {
        // Check if this is an anonymous user
        const isAnonymous = session.user.is_anonymous;

        if (isAnonymous) {
          setAnonymousUserId(session.user.id);
          setAnonymousToken(session.access_token);
          return;
        }

        // If logged in as real user, redirect to regular analyze page
        router.push('/feedback-genius/analyze');
        return;
      }

      // Create new anonymous user
      const { data, error } = await supabase.auth.signInAnonymously();

      if (error) {
        console.error("Error creating anonymous user:", error);
        return;
      }

      if (data.session) {
        setAnonymousUserId(data.user.id);
        setAnonymousToken(data.session.access_token);

        posthog.identify(data.user.id, {
          anonymous: true,
        });
      }
    };

    initAnonymousUser();
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: any) => {
    if (!anonymousUserId || !anonymousToken) {
      alert("Setting up your session. Please wait a moment and try again.");
      return;
    }

    posthog.capture("clicked_run_with_id_try", {
      page: window.location.pathname,
    });

    setIsLoading(true);

    let config = {
      address: data.address,
      propertyId: data.propertyId,
      userId: anonymousUserId,
    };

    try {
      setIsLoading(true);

      const authHeaders = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${anonymousToken}`,
      };

      // Check rate limit before proceeding
      const rateLimitCheck = await axios.post(
        `/api/rate-limit/check`,
        { userId: anonymousUserId },
        { headers: authHeaders }
      );

      if (!rateLimitCheck.data.allowed) {
        setIsLoading(false);
        setNotFoundMessage(
          `You've reached the limit for anonymous assessments. Please sign up to continue using Feedback Genius.`
        );
        setIsAlertOpen(true);
        return;
      }

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/feedback-genius/assess/single`,
        config,
        {
          headers: authHeaders,
        }
      );
      const responseData = response.data;

      if (responseData.errorCode && responseData.errorCode == "404") {
        setIsLoading(false);
        setNotFoundMessage(
          `We could not find a property with that ID/URL. Please check the ID or URL and try again. If you are sure this is correct, please contact us.`
        );
        setIsAlertOpen(true);
        return;
      }

      const propertyId = response.data?.property[0]?.id;

      if (!propertyId) {
        console.error("No property ID in response:", response.data);
        setIsLoading(false);
        setNotFoundMessage(
          "We analyzed your property but couldn't retrieve the results. Please try again."
        );
        setIsAlertOpen(true);
        return;
      }

      // Send to FastAPI for AI analysis (same as regular analyze page)
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_LLM_ENDPOINT}/properties/`,
        { properties: response.data.property },
        { headers: authHeaders }
      );

      // Record this usage for rate limiting
      await axios.post(
        `/api/rate-limit/record`,
        { userId: anonymousUserId },
        { headers: authHeaders }
      );

      // Redirect to try results page - ratings are now saved
      router.push(`/properties/comps/try/${propertyId}`);
    } catch (error) {
      console.error("Error assessing property:", error);
      setIsLoading(false);
      setNotFoundMessage(
        "An error occurred while analyzing your property. Please try again."
      );
      setIsAlertOpen(true);
    }
  };


  function extractAirbnbId(url: string): string | null {
    const roomsRegex = /\/rooms\/([^\/?]+)/;
    const editorRegex = /\/editor\/([^\/]+)/;
    const hostingEditorRegex = /\/hosting\/listings\/editor\/([^\/]+)\//;

    const roomsMatch = url.match(roomsRegex);
    if (roomsMatch && roomsMatch[1]) {
      return roomsMatch[1];
    }

    const editorMatch = url.match(editorRegex);
    if (editorMatch && editorMatch[1]) {
      return editorMatch[1];
    }

    const hostingEditorMatch = url.match(hostingEditorRegex);
    if (hostingEditorMatch && hostingEditorMatch[1]) {
      return hostingEditorMatch[1];
    }

    return null;
  }

  const ratePropertyByUrl = async (url: string) => {
    if (!url) {
      setError("address", {
        type: "custom",
        message: "Listing URL is required",
      });
    }

    const airbnbId = extractAirbnbId(url);

    if (!airbnbId) {
      return null;
    }

    await onSubmit({
      address: "",
      propertyId: airbnbId,
    });
    // Note: onSubmit already calls rateProperty with the full property object
  };

  const INPUT_CSS = "mt-2 mb-5 w-2/3 lg:w-1/2";

  return (
    <div className="pb-6 max-w-7xl mx-auto px-4">
      <CustomAlertDialog
        isOpen={isAlertOpen}
        setIsOpen={setIsAlertOpen}
        title="Notice"
        message={notFoundMessage}
        buttonText="OK"
      />

      <Image
        src="/STR-Feedback-Genius-Logo-single-line.png"
        alt="STR Feedback Genius"
        width="754"
        height="72"
        className="w-[754] h-auto my-6"
      />

      <h1 className="text-4xl mb-6">
        Try STR Listing Feedback - No Account Required
      </h1>

      <div className="bg-blue-50 border-blue-200 border rounded-lg p-4 mb-6">
        <h2 className="font-semibold text-lg mb-2">Try Before You Sign Up!</h2>
        <p className="text-sm text-gray-600">
          Get a preview of what Feedback Genius can do for your listing. You'll see a teaser of your results, then can sign up to view the full detailed report.
        </p>
      </div>

      {isLoading && (
        <LoadingOverlay message="Analyzing now and preparing your feedback. This takes about a minute." />
      )}

      <FormProvider {...form}>
        <form onSubmit={handleSubmit(onSubmit)} name="fullUrl">
          <Label htmlFor="address" className="mt-5">
            Copy and paste the listing URL address from your browser and paste
            it here
          </Label>
          <Input
            id="address"
            className={`${INPUT_CSS}`}
            {...register("address")}
          />
          {errors.address && (
            <div className="text-destructive mb-5 mt-2">
              {errors.address.message}
            </div>
          )}

          <div className={`${INPUT_CSS} flex justify-end`}>
            <Button
              className="mx-2"
              variant="outline"
              onClick={() => router.push("/")}
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                ratePropertyByUrl(watch("address"));

                posthog.capture("clicked_run_with_address_try", {
                  page: window.location.pathname,
                });
              }}
              type="button"
            >
              Analyze My Listing
            </Button>
          </div>

          <p className="font-bold">
            How to Copy and Paste Your Airbnb Listing URL
          </p>
          <AirbnbDirections />
        </form>
      </FormProvider>

      <FormProvider {...form}>
        <form onSubmit={handleSubmit(onSubmit)} name="idOnly">
          <Label htmlFor="propertyId" className="mt-5">
            OR - if you know your <span className="font-bold">Airbnb ID</span>{" "}
            number, you can enter it here
          </Label>
          <Input
            id="propertyId"
            className="mt-2 mb-5 w-64"
            {...register("propertyId", {
              required: "Enter the Airbnb ID for this property",
            })}
          />
          {errors.propertyId && (
            <div className="text-destructive mb-5 mt-2">
              {errors.propertyId.message}
            </div>
          )}

          <div className="flex justify-end w-64">
            <Button
              className="mx-2"
              variant="outline"
              onClick={() => router.push("/")}
            >
              Cancel
            </Button>
            <Button type="submit">Analyze</Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default TryFeedbackGenius;
