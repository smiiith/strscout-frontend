"use client";

import { PLANS } from "@/app/types/plans";
import GeoapifyAddressAutocomplete from "@/components/address-lookup/indext";
import ProtectedPage from "@/components/ProtectedPage";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useUserSession } from "@/lib/context/UserSessionProvider";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Image from "next/image";
import Link from "next/link";
import { add } from "date-fns";
import { supabaseClient } from "@/utils/supabase/js-client";

const formSchema = z.object({
  address: z.object({
    formattedAddress: z.string().min(1, "Please select an address"),
    latitude: z.number(),
    longitude: z.number(),
  }),
  roomType: z.string().min(1, "Please select a room type"),
  bedrooms: z.string().min(1, "Please select number of bedrooms"),
});

type FormData = z.infer<typeof formSchema>;

const MarketSpyPage = () => {
  const [loading, setLoading] = useState(false);
  const [searchCompleted, setSearchCompleted] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<{
    formattedAddress: string;
    latitude: number;
    longitude: number;
  } | null>(null);
  const [userProfile, setUserProfile] = useState<{
    market_spy_listings_limit: number;
    market_spy_listings_used: number;
    billing_type: string;
    subscription_status: string;
  } | null>(null);
  const { session } = useUserSession();

  // Fetch user profile data with Market Spy usage
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (session?.id) {
        try {
          const { data: profile } = await supabaseClient
            .from("profiles")
            .select(
              `
              market_spy_listings_limit,
              market_spy_listings_used,
              billing_type,
              subscription_status
            `
            )
            .eq("id", session.id)
            .single();

          if (profile) {
            setUserProfile(profile);
          }
        } catch (error) {
          console.error("Error fetching user profile:", error);
        }
      }
    };

    fetchUserProfile();
  }, [session?.id]);

  // Calculate remaining Market Spy runs
  const getRemainingRuns = () => {
    if (!userProfile) return 0;
    const used = userProfile.market_spy_listings_used || 0;
    const limit = userProfile.market_spy_listings_limit || 0;
    return Math.max(0, limit - used);
  };

  // Get usage message text
  const getUsageMessage = () => {
    if (!userProfile) return null;

    const remainingRuns = getRemainingRuns();
    const hasActiveSubscription = userProfile.subscription_status === "active";
    const isOneTime = userProfile.billing_type === "one_time";

    if (remainingRuns > 0) {
      if (hasActiveSubscription) {
        return `You have ${remainingRuns} Market Spy ${remainingRuns === 1 ? "run" : "runs"} remaining this month.`;
      } else if (isOneTime) {
        return `You have ${remainingRuns} Market Spy ${remainingRuns === 1 ? "run" : "runs"} remaining.`;
      }
    } else {
      if (hasActiveSubscription) {
        return "You've used all your Market Spy runs for this month. Your usage will reset at the start of your next billing cycle.";
      } else if (isOneTime) {
        return "You've used all your Market Spy runs. Purchase more listings to continue using Market Spy.";
      } else {
        return "Upgrade your plan to start using Market Spy.";
      }
    }

    return null;
  };

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      address: {
        formattedAddress: "",
        latitude: 0,
        longitude: 0,
      },
      roomType: "",
      bedrooms: "",
    },
  });

  const handleAddressSelect = (addressData: {
    formattedAddress: string;
    latitude: number;
    longitude: number;
  }) => {
    setSelectedAddress(addressData);
    form.setValue("address", addressData);
    form.clearErrors("address");
  };

  const onSubmit = async (data: FormData) => {
    setLoading(true);

    if (session && session.id) {
      try {
        // Check if user has remaining runs
        const remainingRuns = getRemainingRuns();
        if (remainingRuns <= 0) {
          alert(
            "You've used all your Market Spy runs. Please upgrade your plan or purchase more listings."
          );
          setLoading(false);
          return;
        }

        // Increment usage before running Market Spy
        const usageResponse = await fetch("/api/market-spy/increment-usage", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: session.id }),
        });

        if (!usageResponse.ok) {
          const usageError = await usageResponse.json();
          if (usageResponse.status === 403) {
            alert(
              "You've reached your Market Spy usage limit. Please upgrade your plan or purchase more listings."
            );
          } else {
            alert("Failed to process usage. Please try again.");
            console.error("Usage increment error:", usageError);
          }
          setLoading(false);
          return;
        }

        const requestData = {
          geocode: `${data.address.latitude}, ${data.address.longitude}`,
          address: data.address.formattedAddress,
          zoom_level: 50,
          room_type: data.roomType,
          bedrooms: data.bedrooms,
          length_of_stay: "1 night stay - tomorrow with 14 day window",
          profile_id: session.id,
        };

        const endpoint = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/marketspy/scrape`;

        const response = await axios.post(endpoint, requestData, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.data) {
          // Refresh user profile to show updated usage
          try {
            const { data: updatedProfile, error: profileError } =
              await supabaseClient
                .from("profiles")
                .select(
                  `
                market_spy_listings_limit,
                market_spy_listings_used,
                billing_type,
                subscription_status
              `
                )
                .eq("id", session.id)
                .single();

            if (profileError) {
              console.error("Error fetching updated profile:", profileError);
            } else if (updatedProfile) {
              setUserProfile(updatedProfile);
            }
          } catch (profileErr) {
            console.error("Profile update error:", profileErr);
          }

          // Mark search as completed
          setSearchCompleted(true);
        }
      } catch (error) {
        console.error("Error submitting form:", error);
        alert("An error occurred while running Market Spy. Please try again.");
      } finally {
        setLoading(false);
      }
    } else {
      console.error("User session not found or invalid.");
      setLoading(false);
    }
  };

  return (
    <ProtectedPage requiredPlan={PLANS.PRO}>
      <div className="min-h-[700px] py-6">
        <Image
          src="/market-spy-logo.png"
          alt="STR Market Spy"
          width={233}
          height={80}
        />

        <h1 className="text-3xl font-bold mt-6">
          Competitive Insights for Your Listing
        </h1>

        <div className="space-y-6 w-full mt-6">
          <p className="w-1/2">
            Enter your listing info below. STR Market Spy will analyze local
            bookings, policies, amenities, and more — then show you exactly how
            you compare.
          </p>

          {/* Market Spy Usage Message */}
          {getUsageMessage() && (
            <div
              className={`p-4 rounded-lg border ${
                getRemainingRuns() > 0
                  ? "bg-blue-50 border-blue-200 text-blue-800"
                  : "bg-amber-50 border-amber-200 text-amber-800"
              }`}
            >
              <p className="text-sm font-medium">{getUsageMessage()}</p>
            </div>
          )}

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6 max-w-[500px]"
            >
              {/* Address Field */}
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <div>
                        <GeoapifyAddressAutocomplete
                          apiKey={process.env.NEXT_PUBLIC_GEOAPIFY_API_KEY}
                          onAddressSelect={handleAddressSelect}
                        />
                        {selectedAddress && (
                          <div className="mt-2 p-3 bg-gray-50 rounded-md">
                            <p className="text-sm text-gray-600">
                              Selected: {selectedAddress.formattedAddress}
                            </p>
                          </div>
                        )}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Room Type Field */}
              <FormField
                control={form.control}
                name="roomType"
                render={({ field }) => (
                  <FormItem className="max-w-[300px]">
                    <FormLabel>Type of Stay</FormLabel>
                    <FormControl>
                      <select
                        {...field}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 max-w-[300px]"
                      >
                        <option value="">Select room type</option>
                        <option value="any type">Any Type</option>
                        <option value="room">Room</option>
                        <option value="entire home">Entire Home</option>
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Bedrooms Field */}
              <FormField
                control={form.control}
                name="bedrooms"
                render={({ field }) => (
                  <FormItem className="max-w-[300px]">
                    <FormLabel>Number of Bedrooms</FormLabel>
                    <FormControl>
                      <select
                        {...field}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 max-w-[300px]"
                      >
                        <option value="">Select number of bedrooms</option>
                        <option value="any">Any</option>
                        <option value="1+">1+</option>
                        <option value="2+">2+</option>
                        <option value="3+">3+</option>
                        <option value="4+">4+</option>
                        <option value="5+">5+</option>
                        <option value="6+">6+</option>
                        <option value="7+">7+</option>
                        <option value="8+">8+</option>
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                variant="default"
                disabled={loading || getRemainingRuns() <= 0}
                className="w-fit"
              >
                {loading
                  ? "Searching..."
                  : getRemainingRuns() <= 0
                    ? "No runs remaining"
                    : "Search Market"}
              </Button>
            </form>
          </Form>

          {/* Post-search status message */}
          {searchCompleted && (
            <Card className="mt-8 max-w-lg">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <p className="font-medium">
                    You have {getRemainingRuns()} Market Spy{" "}
                    {getRemainingRuns() === 1 ? "run" : "runs"} left for this month after this search.
                  </p>

                  <p className="text-sm text-muted-foreground">
                    You can now check on the status of your current search on
                    the My Comps page.{" "}
                    {getRemainingRuns() > 0 &&
                      "You can also run another Market Spy search if needed."}
                  </p>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Link
                      href="/my-comps"
                      className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                    >
                      My Comps
                    </Link>

                    {getRemainingRuns() > 0 && (
                      <Button
                        onClick={() => setSearchCompleted(false)}
                        variant="outline"
                        className="w-fit"
                      >
                        Search Again
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </ProtectedPage>
  );
};

export default MarketSpyPage;
