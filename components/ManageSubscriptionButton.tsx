"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import LoadingOverlay from "@/components/LoadingOverlay";

export default function ManageSubscriptionButton() {
  const [loading, setLoading] = useState(false);

  const handleManageSubscription = async () => {
    try {
      setLoading(true);

      const response = await fetch("/api/stripe/customer-portal", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to access customer portal");
      }

      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error("No portal URL received");
      }
    } catch (error) {
      console.error("Customer portal error:", error);
      alert("Failed to access subscription management. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="">
      {loading && <LoadingOverlay />}
      <Button
        onClick={handleManageSubscription}
        disabled={loading}
        variant="outline"
      >
        {loading ? "Loading..." : "Manage Subscription"}
      </Button>
    </div>
  );
}