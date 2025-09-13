"use client";

import GeoapifyAddressAutocomplete from "@/components/address-lookup/indext";
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
import { Message } from "@/components/ui/message";
import { useUserSession } from "@/lib/context/UserSessionProvider";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

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

interface AccountData {
  id: string;
  billing_type: string | null;
  subscription_status: string | null;
  market_spy_listings_used: number;
  market_spy_listings_limit: number;
  current_tier: string | null;
  listings_purchased: number | null;
  remaining_runs: number;
}

const MarketSpyPage = () => {
  return <MarketSpyContent />;
};

const MarketSpyContent = () => {
  const [loading, setLoading] = useState(false);
  const [searchCompleted, setSearchCompleted] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<{
    formattedAddress: string;
    latitude: number;
    longitude: number;
  } | null>(null);

  // Account data state
  const [accountData, setAccountData] = useState<AccountData | null>(null);
  const [accountLoading, setAccountLoading] = useState(true);
  const [accountError, setAccountError] = useState<string | null>(null);

  const { session } = useUserSession();
  const searchParams = useSearchParams();

  // Check for success parameter from checkout redirect
  const showSuccess = searchParams?.get("success") === "true";

  // Fetch account data
  const fetchAccountData = async () => {
    try {
      setAccountLoading(true);
      setAccountError(null);

      const response = await fetch("/api/account");

      if (!response.ok) {
        throw new Error(`Failed to fetch account data: ${response.status}`);
      }

      const data = await response.json();
      setAccountData(data.profile);
    } catch (error) {
      console.error("Error fetching account data:", error);
      setAccountError("Failed to load account information");
    } finally {
      setAccountLoading(false);
    }
  };

  // Load account data on mount and after successful checkout
  useEffect(() => {
    fetchAccountData();
  }, []);

  // Reload account data if coming from successful checkout
  useEffect(() => {
    if (showSuccess) {
      fetchAccountData();
    }
  }, [showSuccess]);

  // Get usage message text
  const getUsageMessage = () => {
    if (!accountData) return null;

    const remainingRuns = accountData.remaining_runs;
    const hasActiveSubscription = accountData.subscription_status === "active";
    const isOneTime = accountData.billing_type === "one_time";

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
    if (!accountData || !session?.id) {
      alert(
        "Unable to process request. Please refresh the page and try again."
      );
      return;
    }

    // Check if user has remaining runs
    if (accountData.remaining_runs <= 0) {
      alert(
        "You've used all your Market Spy runs. Please upgrade your plan or purchase more listings."
      );
      return;
    }

    setLoading(true);

    try {
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
        // Refresh account data to show updated usage
        await fetchAccountData();

        // Mark search as completed
        setSearchCompleted(true);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred while running Market Spy. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
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

        {/* Success Message from Checkout */}
        {showSuccess && (
          <div className="w-1/2">
            <Message variant="success">
              🎉 Payment successful! You can now use Market Spy with your new
              plan.
            </Message>
          </div>
        )}

        {/* Loading State */}
        {accountLoading && (
          <div className="w-1/2">
            <Message variant="info">
              Loading your account information...
            </Message>
          </div>
        )}

        {/* Error State */}
        {accountError && !accountLoading && (
          <div className="w-1/2">
            <Message variant="error">
              {accountError}. Please{" "}
              <button
                onClick={fetchAccountData}
                className="underline hover:no-underline"
              >
                try again
              </button>
              .
            </Message>
          </div>
        )}

        {/* Market Spy Usage Message */}
        {!accountLoading &&
          !accountError &&
          accountData &&
          getUsageMessage() && (
            <div className="w-1/2">
              <Message
                variant={accountData.remaining_runs > 0 ? "info" : "warning"}
              >
                {getUsageMessage()}
              </Message>
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
                      <option value="">Select</option>
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
                      <option value="">Select</option>
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

            <div className="text-sm text-muted-foreground">
              Run your report now - it typically takes 12-15 minutes.
              <div>
                Head to the Market Spy Reports page to check its progress on
                your reports page.
              </div>
            </div>

            <Button
              type="submit"
              variant="default"
              disabled={
                loading ||
                accountLoading ||
                !!accountError ||
                !accountData ||
                accountData.remaining_runs <= 0
              }
              className="w-fit"
            >
              {loading
                ? "Searching..."
                : accountLoading
                  ? "Loading..."
                  : accountError
                    ? "Unable to load account"
                    : !accountData
                      ? "No account data"
                      : accountData.remaining_runs <= 0
                        ? "No runs remaining"
                        : "Search Market"}
            </Button>
          </form>
        </Form>

        {/* Post-search status message */}
        {searchCompleted && accountData && (
          <Card className="mt-8 max-w-lg">
            <CardContent className="p-6">
              <div className="space-y-4">
                <p className="font-medium">
                  You have {accountData.remaining_runs} Market Spy{" "}
                  {accountData.remaining_runs === 1 ? "run" : "runs"} left{" "}
                  {accountData.subscription_status === "active"
                    ? "for this month"
                    : ""}{" "}
                  after this search.
                </p>

                <p className="text-sm text-muted-foreground">
                  You can now check on the status of your current search on the
                  Market Spy Reports page.{" "}
                  {accountData.remaining_runs > 0 &&
                    "You can also run another Market Spy search if needed."}
                </p>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    href="/my-comps"
                    className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                  >
                    Market Spy Reports
                  </Link>

                  {accountData.remaining_runs > 0 && (
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
  );
};

export default MarketSpyPage;
