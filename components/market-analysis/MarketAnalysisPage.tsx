"use client";

import { useState } from "react";
import { useUserSession } from "@/lib/context/UserSessionProvider";
import axios from "axios";
import Image from "next/image";
import { Message } from "@/components/ui/message";
import MarketAnalysisForm from "./MarketAnalysisForm";
import SearchCompleteDialog from "./SearchCompleteDialog";
import { useMarketAnalysisAccount } from "./useMarketAnalysisAccount";

interface MarketAnalysisPageProps {
  productName: string; // "Market Spy" or "Market Scout"
  productType: 'market-spy' | 'market-scout'; // Backend identifier
  showRoomTypeSelect: boolean; // true for Market Spy, false for Market Scout
  fixedRoomType?: string; // "entire home" for Market Scout
  reportsPageUrl: string; // "/my-comps" or "/market-scout-reports"
  logoSrc: string; // Logo image path
  title: string; // Page title
  description: string; // Page description
}

export default function MarketAnalysisPage({
  productName,
  productType,
  showRoomTypeSelect,
  fixedRoomType = "entire home",
  reportsPageUrl,
  logoSrc,
  title,
  description,
}: MarketAnalysisPageProps) {
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { session, getAccessToken } = useUserSession();

  const {
    accountData,
    accountLoading,
    accountError,
    showSuccess,
    fetchAccountData,
    getUsageMessage,
  } = useMarketAnalysisAccount(productName);

  const handleRunAnother = () => {
    setDialogOpen(false);
  };

  const onSubmit = async (data: any) => {
    if (!accountData || !session?.id) {
      alert(
        "Unable to process request. Please refresh the page and try again."
      );
      return;
    }

    // Check if user has remaining runs
    if (accountData.remaining_runs <= 0) {
      alert(
        `You've used all your ${productName} runs. Please upgrade your plan or purchase more listings.`
      );
      return;
    }

    setLoading(true);

    try {
      // Get auth token
      const token = await getAccessToken();

      if (!token) {
        alert("Authentication failed. Please refresh the page and try again.");
        setLoading(false);
        return;
      }

      const authHeaders = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      // Increment usage
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
            `You've reached your ${productName} usage limit. Please upgrade your plan or purchase more listings.`
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
        room_type: showRoomTypeSelect ? data.roomType : fixedRoomType,
        bedrooms: data.bedrooms,
        length_of_stay: "1 night stay - tomorrow with 14 day window",
        profile_id: session.id,
        product_type: productType, // Pass product type to backend
      };

      const endpoint = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/marketspy/scrape`;

      const response = await axios.post(endpoint, requestData, {
        headers: authHeaders,
      });

      if (response.data) {
        // Refresh account data to show updated usage
        await fetchAccountData();

        // Mark search as completed and open dialog
        setDialogOpen(true);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert(`An error occurred while running ${productName}. Please try again.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[700px] py-6">
      <Image src={logoSrc} alt={productName} width={233} height={80} />

      <h1 className="text-3xl font-bold mt-6">{title}</h1>

      <div className="space-y-6 w-full mt-6">
        <p className="w-1/2">{description}</p>

        {/* Success Message from Checkout */}
        {showSuccess && (
          <div className="w-1/2">
            <Message variant="success">
              🎉 Payment successful! You can now use {productName} with your
              new plan.
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

        {/* Usage Message */}
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

        <MarketAnalysisForm
          onSubmit={onSubmit}
          loading={loading}
          accountLoading={accountLoading}
          accountError={accountError}
          accountData={accountData}
          dialogOpen={dialogOpen}
          showRoomTypeSelect={showRoomTypeSelect}
          fixedRoomType={fixedRoomType}
          productName={productName}
        />

        <SearchCompleteDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          remainingRuns={accountData?.remaining_runs || 0}
          subscriptionStatus={accountData?.subscription_status || null}
          onRunAnother={handleRunAnother}
          reportsPageUrl={reportsPageUrl}
          productName={productName}
        />
      </div>
    </div>
  );
}
