import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

export interface AccountData {
  id: string;
  billing_type: string | null;
  subscription_status: string | null;
  market_spy_listings_used: number;
  market_spy_listings_limit: number;
  current_tier: string | null;
  listings_purchased: number | null;
  remaining_runs: number;
}

export function useMarketAnalysisAccount(productName: string) {
  const [accountData, setAccountData] = useState<AccountData | null>(null);
  const [accountLoading, setAccountLoading] = useState(true);
  const [accountError, setAccountError] = useState<string | null>(null);
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
        return `You have ${remainingRuns} ${productName} ${remainingRuns === 1 ? "run" : "runs"} remaining this month.`;
      } else if (isOneTime) {
        return `You have ${remainingRuns} ${productName} ${remainingRuns === 1 ? "run" : "runs"} remaining.`;
      }
    } else {
      if (hasActiveSubscription) {
        return `You've used all your ${productName} runs for this month. Your usage will reset at the start of your next billing cycle.`;
      } else if (isOneTime) {
        return `You've used all your ${productName} runs. Purchase more listings to continue using ${productName}.`;
      } else {
        return `Upgrade your plan to start using ${productName}.`;
      }
    }

    return null;
  };

  return {
    accountData,
    accountLoading,
    accountError,
    showSuccess,
    fetchAccountData,
    getUsageMessage,
  };
}
