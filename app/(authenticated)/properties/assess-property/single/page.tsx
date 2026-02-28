"use client";

import React, { use, useEffect, useState } from "react";
// import { createClient } from '../../../../utils/supabase/server'
import { createClient } from "@/utils/supabase/client";
import {
  useForm,
  SubmitHandler,
  Controller,
  FormProvider,
  set,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import LoadingOverlay from "@/components/LoadingOverlay";
import Image from "next/image";
import { CustomAlertDialog } from "@/components/AlertDialog";
import posthog from "posthog-js";
import AirbnbDirections from "@/components/AirbnbDirections";
import { useUserSession } from "@/lib/context/UserSessionProvider";

// const formSchema = z.object({
//   username: z.string().min(2, {
//     message: "Username must be at least 2 characters.",
//   }),
// })

const ERROR_FINDING_ID =
  "Could not find an Airbnb ID in the URL. Review the instructions below and try again.";

const formSchema = z.object({
  nickname: z.string().min(1, "Nickname is required"),
});
type Inputs = {
  address: string;
  propertyId: string;
};

const AssessProperty = () => {
  const { session, loading: sessionLoading, getAccessToken } = useUserSession();
  const router = useRouter();
  const [ratings, setRatings] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [reachedUsageLimit, setReachedUsageLimit] = useState(false);
  const [reachedPropertyLimit, setReachedPropertyLimit] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [notFoundMessage, setNotFoundMessage] = useState("");
  const [remainingAssessments, setRemainingAssessments] = useState<number | null>(null);
  const [remainingProperties, setRemainingProperties] = useState<number | null>(null);

  const {
    register,
    handleSubmit,
    control,
    watch,
    setError,
    setValue,
    formState: { errors },
  } = useForm<Inputs>();

  useEffect(() => {
    if (session?.id && session?.email) {
      posthog.identify(session.id, {
        email: session.email,
      });
    }
  }, [session]);

  useEffect(() => {
    // Fetch initial usage stats when page loads
    if (session?.id) {
      fetchUserStats(session.id);
    }
  }, [session?.id]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: any) => {
    if (!session?.id) {
      alert("Authentication failed. Please refresh the page and try again.");
      return;
    }

    posthog.capture("clicked_run_with_id", {
      page: window.location.pathname,
    });

    const verification = await verifyRequest(data.propertyId, session.id);
    const isVerified = verification?.data?.verified || false;

    // Extract remaining counts from verification response
    if (verification?.data?.remaining_assessments !== undefined) {
      setRemainingAssessments(verification.data.remaining_assessments);
    }
    if (verification?.data?.remaining_properties !== undefined) {
      setRemainingProperties(verification.data.remaining_properties);
    }

    if (!isVerified) {
      if (verification?.data?.reached_property_limit) {
        setReachedPropertyLimit(true);
        setIsLoading(false);
        return;
      }

      if (verification?.data?.reached_usage_limit) {
        setReachedUsageLimit(true);
        setIsLoading(false);
        return;
      }
      return;
    }

    setIsLoading(true);

    let config = {
      address: data.address,
      propertyId: data.propertyId,
      userId: session.id,
    };

    try {
      setIsLoading(true);

      // scrape the property
      const token = await getAccessToken();

      if (!token) {
        alert("Authentication failed. Please refresh the page and try again.");
        setIsLoading(false);
        return;
      }

      const authHeaders = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      };

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
        // console.error("property not found: ", responseData.errorMessage);
        return;
      }

      const ratingResponse = await rateProperty(response.data.property);

      if (ratingResponse?.data?.usage && ratingResponse.data.usage == "limit") {
        setReachedUsageLimit(true);
        setIsLoading(false);
        return;
      }

      router.push(`/properties/comps/${response.data?.property[0]?.id}`);
    } catch (error) {
      console.error("Error assessing property:", error);
      setIsLoading(true);
    }
  };

  const fetchUserProperties = async (userId: string) => {
    const endpoint = `${process.env.NEXT_PUBLIC_API_LLM_ENDPOINT}/user_properties/`;

    try {
      const token = await getAccessToken();

      if (!token) {
        console.error("Failed to get access token");
        return;
      }

      const authHeaders = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      };

      const userProperties: any = await axios.post(
        endpoint,
        { user_id: userId },
        { headers: authHeaders }
      );
      // setReachedPropertyLimit()
    } catch (error) {
      console.error("Error fetching user properties:", error);
    }
  };

  const fetchUserStats = async (userId: string) => {
    const endpoint = `${process.env.NEXT_PUBLIC_API_LLM_ENDPOINT}/user_stats`;

    try {
      const token = await getAccessToken();

      if (!token) {
        console.error("Failed to get access token");
        return;
      }

      const authHeaders = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      };

      const response: any = await axios.post(
        endpoint,
        { user_id: userId },
        { headers: authHeaders }
      );

      if (response?.data?.remaining_properties !== undefined) {
        setRemainingProperties(response.data.remaining_properties);
      }
    } catch (error) {
      console.error("Error fetching user stats:", error);
    }
  };

  const verifyRequest = async (externalId: any, userId: string) => {
    const endpoint = `${process.env.NEXT_PUBLIC_API_LLM_ENDPOINT}/verify`;

    try {
      const token = await getAccessToken();

      if (!token) {
        console.error("Failed to get access token");
        return;
      }

      const authHeaders = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      };

      const config = {
        external_id: externalId,
        user_id: userId,
      };

      const verification: any = await axios.post(endpoint, config, {
        headers: authHeaders,
      });
      return verification;
    } catch (error) {
      console.error("Error verifying request:", error);
    }
  };

  const rateProperty = async (property: any) => {
    const endpoint = `${process.env.NEXT_PUBLIC_API_LLM_ENDPOINT}/properties/`;

    try {
      const token = await getAccessToken();

      if (!token) {
        console.error("Failed to get access token");
        return;
      }

      const authHeaders = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      };

      const ratings: any = await axios.post(
        endpoint,
        { properties: property },
        { headers: authHeaders }
      );
      setRatings(ratings.results);
      return ratings;
    } catch (error) {
      console.error("Error calling FastAPI rateProperty:", error);
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
    await rateProperty([airbnbId]);
  };

  // const INPUT_CSS = "mt-2 mb-5 w-2/3 lg:w-1/2 bg-pink-500 md:bg-green-500 lg:bg-blue-500";
  const INPUT_CSS = "mt-2 mb-5 w-2/3 lg:w-1/2";

  return (
    <div className="pb-6">
      <CustomAlertDialog
        isOpen={isAlertOpen}
        setIsOpen={setIsAlertOpen}
        title="Property not found"
        message="We could not find a property with that ID/URL. Please check the ID or URL and try again. If you are sure this is correct, please contact us."
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
        Getting Your Free STR Listing Feedback is Easy
      </h1>

      {remainingProperties !== null && (
        <div className={`${remainingProperties === 0 ? 'bg-red-50 border-red-200' : 'bg-blue-50 border-blue-200'} border rounded-lg p-4 mb-6`}>
          <h2 className="font-semibold text-lg mb-2">Your Free Plan Usage</h2>
          <div className={`grid grid-cols-1 ${remainingAssessments !== null ? 'md:grid-cols-2' : ''} gap-4`}>
            {remainingAssessments !== null && (
              <div>
                <p className="text-sm text-gray-600">Assessments for this property:</p>
                <p className={`text-2xl font-bold ${remainingAssessments === 0 ? 'text-red-600' : 'text-blue-600'}`}>
                  {remainingAssessments} remaining
                </p>
                <p className="text-xs text-gray-500">
                  (3 per property per month)
                </p>
              </div>
            )}
            <div>
              <p className="text-sm text-gray-600">Properties you can add:</p>
              <p className={`text-2xl font-bold ${remainingProperties === 0 ? 'text-red-600' : 'text-blue-600'}`}>
                {remainingProperties} remaining
              </p>
              <p className="text-xs text-gray-500">
                (6 properties maximum)
              </p>
            </div>
          </div>
          {remainingAssessments === null && remainingProperties > 0 && (
            <div className="text-sm text-gray-600 mt-2">
              <p className="font-semibold">
                Free Plan includes:
              </p>
              <ul className="list-disc list-inside mt-1 space-y-1">
                <li>Up to 6 properties maximum</li>
                <li>3 assessments per property per calendar month</li>
              </ul>
              <p className="mt-2 text-gray-500 italic">
                Enter a property URL below to see how many assessments you have remaining for that listing.
              </p>
            </div>
          )}
          {remainingProperties === 0 && (
            <div className="text-sm text-red-600 mt-2">
              <p className="font-semibold">
                You have reached the maximum of 6 properties for free accounts.
              </p>
              <p className="mt-1">
                Note: You can still run 3 assessments per calendar month on each of your existing properties. Please contact us if you need to add more properties.
              </p>
            </div>
          )}
        </div>
      )}

      {reachedUsageLimit && (
        <div>
          <p className="text-destructive bg-destructive-foreground mb-6 p-6 border border-border rounded-lg">
            You have reached your usage limit for this property. Free accounts
            are limited to 3 assessments per property per calendar month. Feel
            free to <a href="/contact-us">contact us</a> if you need to run more
            assessments before the end of the month.
          </p>
        </div>
      )}

      {reachedPropertyLimit && (
        <div>
          <p className="text-destructive bg-destructive-foreground mb-6 p-6 border border-border rounded-lg">
            You have reached your limit of 6 properties for free accounts. Feel
            free to <a href="/contact-us">contact us</a> if you need to add more
            properties.
          </p>
        </div>
      )}

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
            disabled={remainingProperties === 0}
            {...register("address", {
              // required: 'Enter the address for this property',
            })}
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
              onClick={() => router.push("/properties")}
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                ratePropertyByUrl(watch("address"));

                posthog.capture("clicked_run_with_address", {
                  page: window.location.pathname,
                });
              }}
              type="button"
              disabled={remainingProperties === 0}
            >
              Run
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
            disabled={remainingProperties === 0}
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
              onClick={() => router.push("/properties")}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={remainingProperties === 0}>Run</Button>
          </div>
        </form>
      </FormProvider>

      {ratings && ratings.length > 0 && (
        <Table>
          <TableCaption>Your recent scans</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Property</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Feedback</TableHead>
              <TableHead>Suggestions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {ratings.map((rating: any, index: number) => (
              <TableRow
                key={`comp-${index}`}
                className="hover:muted-foreground"
              >
                <TableCell className="font-medium">
                  {rating.property_name}
                </TableCell>
                <TableCell>{rating.description_rating}</TableCell>
                <TableCell>{rating.description_rating_number}</TableCell>
                <TableCell>{rating.descsription_feedback}</TableCell>
                <TableCell>
                  {/* {rating.descsription_suggestions} */}
                  <div className="flex flex-col">
                    <div className="text-sm">
                      {rating.descsription_suggestions}
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default AssessProperty;
