"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useUserSession } from "@/lib/context/UserSessionProvider";
import { PLANS } from "@/app/types/plans";
import ExitSurvey from "@/components/exit-survey";
import { PricingHelpBanner } from "@/components/pricing-help-banner";
import { PricingHelpWidget } from "@/components/pricing-help-widget";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StripeCheckoutButton from "@/components/stripe-checkout-button";
import {
  calculatePrice,
  getOneTimePriceId,
  getSubscriptionPriceId,
  getPerListingRate,
  type BillingType,
} from "@/lib/pricing";
import { Badge } from "@/components/ui/badge";
import posthog from "posthog-js";

export default function PricingPageNew() {
  const router = useRouter();
  const { session } = useUserSession();
  const planData = session?.profile?.plan;

  // Pro plan state
  const [listingCount, setListingCount] = useState(1);
  const [billingType, setBillingType] = useState<BillingType>("subscription");

  const totalPrice = calculatePrice(listingCount, billingType);
  const perListingRate = getPerListingRate(listingCount, billingType);
  const altPerListingRate = getPerListingRate(
    listingCount,
    billingType === "subscription" ? "one_time" : "subscription"
  );
  const isPromoActive = process.env.NEXT_PUBLIC_PROMO_ACTIVE === "true";

  const isCurrentPlan = (planKey: string) => {
    return planData?.key === planKey;
  };

  const trackBuyClick = () => {
    posthog.capture("clicked_buy_market_spy", {
      billing_type: billingType,
      listing_count: listingCount,
      total_price: totalPrice,
    });
  };

  return (
    <>
      <ExitSurvey pagePath="/pricing" />
      <PricingHelpWidget />

      <div className="container mx-auto px-4 py-8 md:py-12">
        {/* Page Header - Outcome focused */}
        <div className="text-center mb-8 md:mb-16 max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
            Stop Guessing. Start Booking.
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground">
            Join hosts who&apos;ve optimized their listings and outperformed
            their competition
          </p>

          {/* Social proof */}
          <div className="flex items-center justify-center gap-2 mt-6 text-sm text-muted-foreground">
            <span>Featured on</span>
            <Image
              src="/images/affiliates/inndirectly-logo-02.png"
              alt="Inndirectly"
              width={120}
              height={32}
              className="h-8 w-auto opacity-70"
            />
          </div>
        </div>

        {/* Pricing Plans Grid - More whitespace, smaller cards */}
        {/* Pro plan first on mobile (order-first), Free plan first on desktop (md:order-first) */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
          {/* Free Plan Card - Simplified */}
          <Card className="relative bg-card order-last md:order-first">
            <CardHeader className="pb-4">
              <h3 className="text-xl font-bold">Free Plan</h3>
              <p className="text-sm text-muted-foreground font-medium">
                Perfect for optimizing your current listing
              </p>
              <div className="mt-4">
                <span className="text-5xl md:text-6xl font-bold">$0</span>
                <span className="text-lg text-muted-foreground ml-2">
                  forever
                </span>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Key benefits only */}
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-green-500 mt-0.5">✓</span>
                  <span>AI-powered listing analysis</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 mt-0.5">✓</span>
                  <span>Photo & description feedback</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 mt-0.5">✓</span>
                  <span>Actionable improvement tips</span>
                </li>
                <li className="flex items-start gap-3 text-muted-foreground">
                  <span className="mt-0.5">✗</span>
                  <span>No competitor insights</span>
                </li>
              </ul>

              <div className="pt-2">
                {isCurrentPlan(PLANS.FREEMIUM) ? (
                  <Button variant="outline" disabled className="w-full h-12">
                    Current Plan
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    className="w-full h-12 text-base"
                    onClick={() =>
                      router.push(
                        "/register?redirect_to=/feedback-genius/analyze"
                      )
                    }
                  >
                    Start Free
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Pro Plan Card - Highlighted */}
          <Card className="relative border-2 border-primary shadow-lg">
            {/* Most Popular Badge */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <Badge className="bg-primary text-primary-foreground px-4 py-1 text-sm font-semibold shadow-md">
                Recommended
              </Badge>
            </div>

            {/* Black Friday Badge */}
            {isPromoActive && (
              <div className="absolute -top-4 -right-4 z-10 text-center">
                <Image
                  src="/images/50-percent-off-holiday-special.svg"
                  alt="50% Off Holiday Special"
                  width={100}
                  height={100}
                  quality={100}
                  className="w-[80px] md:w-[100px] h-auto"
                />
              </div>
            )}

            <CardHeader className="pb-4 pt-6">
              <h3 className="text-xl font-bold">Pro Plan</h3>

              <p className="text-sm text-muted-foreground font-medium">
                For hosts ready to outperform their competition
              </p>
              <div className="mt-4">
                <span className="text-5xl md:text-6xl font-bold">
                  $
                  {perListingRate % 1 === 0
                    ? perListingRate.toFixed(0)
                    : perListingRate.toFixed(2)}
                </span>
                <span className="text-lg text-muted-foreground ml-1">
                  {billingType === "subscription"
                    ? "per listing/mo"
                    : "per listing"}
                </span>
                <p className="text-sm text-muted-foreground mt-1">
                  {billingType === "subscription" ? (
                    <>
                      or{" "}
                      <button
                        onClick={() => setBillingType("one_time")}
                        className="underline hover:text-foreground"
                      >
                        $
                        {altPerListingRate % 1 === 0
                          ? altPerListingRate.toFixed(0)
                          : altPerListingRate.toFixed(2)}{" "}
                        one-time
                      </button>
                    </>
                  ) : (
                    <>
                      or{" "}
                      <button
                        onClick={() => setBillingType("subscription")}
                        className="underline hover:text-foreground"
                      >
                        $
                        {altPerListingRate % 1 === 0
                          ? altPerListingRate.toFixed(0)
                          : altPerListingRate.toFixed(2)}
                        /mo
                      </button>
                    </>
                  )}
                </p>
              </div>
            </CardHeader>
            <CardContent className="space-y-5">
              {/* Key benefits only */}
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-green-500 mt-0.5">✓</span>
                  <span>
                    <strong>Everything in Free</strong>, plus:
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 mt-0.5">✓</span>
                  <span>See competitor occupancy rates</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 mt-0.5">✓</span>
                  <span>Learn why top listings get booked</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 mt-0.5">✓</span>
                  <span>Get actionable steps to outperform</span>
                </li>
              </ul>

              {/* Compact billing selector */}
              <div className="space-y-3 pt-2">
                <Tabs
                  value={billingType}
                  onValueChange={(value) =>
                    setBillingType(value as BillingType)
                  }
                  className="w-full"
                >
                  <TabsList className="grid w-full grid-cols-2 h-10 bg-muted/80">
                    <TabsTrigger
                      value="subscription"
                      className="text-sm font-medium data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                    >
                      Monthly
                    </TabsTrigger>
                    <TabsTrigger
                      value="one_time"
                      className="text-sm font-medium data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                    >
                      One-Time
                    </TabsTrigger>
                  </TabsList>
                </Tabs>

                <div className="flex items-center justify-between">
                  <label className="text-sm">Listings:</label>
                  <Select
                    value={listingCount.toString()}
                    onValueChange={(value) => setListingCount(Number(value))}
                  >
                    <SelectTrigger className="w-28 h-9">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 20 }, (_, i) => i + 1).map(
                        (num) => (
                          <SelectItem key={num} value={num.toString()}>
                            {num} listing{num > 1 ? "s" : ""}
                          </SelectItem>
                        )
                      )}
                    </SelectContent>
                  </Select>
                </div>

                {/* Price summary - simplified */}
                <div className="bg-primary/5 p-3 rounded-lg">
                  <div className="flex justify-between items-center text-lg font-bold">
                    <span>Total:</span>
                    <span>
                      ${totalPrice.toFixed(2)}
                      {billingType === "subscription" ? "/mo" : ""}
                    </span>
                  </div>
                  {listingCount > 1 && (
                    <p className="text-xs text-muted-foreground mt-1">
                      ${perListingRate.toFixed(2)} per listing
                    </p>
                  )}
                </div>

                {/* Promo Code Banner */}
                {process.env.NEXT_PUBLIC_PROMO_CODE && (
                  <div className="bg-success/10 border border-success/20 rounded-lg p-3 text-center">
                    <p className="text-sm font-semibold text-success mb-1">
                      50% Off Sale!
                    </p>
                    <p className="text-xs text-muted-foreground mb-2">
                      Use code at checkout:
                    </p>
                    <div className="bg-background border-2 border-dashed border-success/40 rounded px-3 py-2 font-mono font-bold text-base text-success">
                      {process.env.NEXT_PUBLIC_PROMO_CODE}
                    </div>
                  </div>
                )}
              </div>

              {/* CTA Button */}
              <div className="space-y-2">
                {session ? (
                  billingType === "subscription" ? (
                    <div onClick={trackBuyClick}>
                      <StripeCheckoutButton
                        priceId={getSubscriptionPriceId()}
                        quantity={listingCount}
                        buttonText="Get Started Now"
                        successUrl="/market-spy/analyze?success=true"
                        cancelUrl="/pricing"
                        className="w-full h-12 text-base font-semibold"
                        mode="subscription"
                      />
                    </div>
                  ) : listingCount <= 10 ? (
                    <div onClick={trackBuyClick}>
                      <StripeCheckoutButton
                        priceId={getOneTimePriceId(listingCount)!}
                        quantity={1}
                        buttonText="Get Started Now"
                        successUrl="/market-spy/analyze?success=true"
                        cancelUrl="/pricing"
                        className="w-full h-12 text-base font-semibold"
                        mode="payment"
                      />
                    </div>
                  ) : (
                    <Button
                      className="w-full h-12 text-base"
                      onClick={() => {
                        trackBuyClick();
                        window.location.href = "mailto:support@strsage.com";
                      }}
                    >
                      Contact for Custom Pricing
                    </Button>
                  )
                ) : (
                  <Button
                    className="w-full h-12 text-base font-semibold"
                    onClick={() => {
                      trackBuyClick();
                      router.push("/register?redirect_to=/pricing");
                    }}
                  >
                    Get Started Now
                  </Button>
                )}
                {billingType === "subscription" && (
                  <p className="text-xs text-center text-muted-foreground">
                    Cancel anytime
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Testimonials */}
        <div className="max-w-4xl mx-auto mt-12 md:mt-24 mb-12">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="border-t-2 border-primary p-6 bg-background">
              <p className="text-sm md:text-base italic mb-3">
                &quot;I found the Feedback Genius was really really good! I used
                the recommendation to update my listing description.&quot;
              </p>
              <p className="text-sm font-medium text-muted-foreground">
                — Michelle, Superhost from Washington
              </p>
            </div>
            <div className="border-t-2 border-primary p-6 bg-background">
              <p className="text-sm md:text-base italic mb-3">
                &quot;I found it easy! 15 minutes.&quot;
              </p>
              <p className="text-sm font-medium text-muted-foreground">
                — Brian, Superhost from Texas
              </p>
            </div>
          </div>
        </div>

        {/* Feature Comparison */}
        <div className="max-w-4xl mx-auto mt-8">
          <h2 className="text-2xl font-bold text-center mb-6">
            Compare Features
          </h2>
          <Card>
            <CardContent className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2 px-2 md:py-3 md:px-4">
                        Feature
                      </th>
                      <th className="text-center py-2 px-2 md:py-3 md:px-4">
                        Free
                      </th>
                      <th className="text-center py-2 px-2 md:py-3 md:px-4">
                        Pro
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-2 px-2 md:py-3 md:px-4 text-sm md:text-base">
                        Feedback Genius Analysis
                      </td>
                      <td className="text-center py-2 px-2 md:py-3 md:px-4">
                        ✅
                      </td>
                      <td className="text-center py-2 px-2 md:py-3 md:px-4">
                        ✅
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 px-2 md:py-3 md:px-4 text-sm md:text-base">
                        Personalized Listing Feedback
                      </td>
                      <td className="text-center py-2 px-2 md:py-3 md:px-4">
                        ✅
                      </td>
                      <td className="text-center py-2 px-2 md:py-3 md:px-4">
                        ✅
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 px-2 md:py-3 md:px-4 text-sm md:text-base">
                        Photo Quality Assessment
                      </td>
                      <td className="text-center py-2 px-2 md:py-3 md:px-4">
                        ✅
                      </td>
                      <td className="text-center py-2 px-2 md:py-3 md:px-4">
                        ✅
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 px-2 md:py-3 md:px-4 text-sm md:text-base">
                        Recommendations to Improve
                      </td>
                      <td className="text-center py-2 px-2 md:py-3 md:px-4">
                        ✅
                      </td>
                      <td className="text-center py-2 px-2 md:py-3 md:px-4">
                        ✅
                      </td>
                    </tr>
                    <tr className="border-b bg-muted/50">
                      <td className="py-2 px-2 md:py-3 md:px-4 font-medium text-sm md:text-base">
                        Market Spy Access
                      </td>
                      <td className="text-center py-2 px-2 md:py-3 md:px-4 text-muted-foreground">
                        —
                      </td>
                      <td className="text-center py-2 px-2 md:py-3 md:px-4">
                        ✅
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 px-2 md:py-3 md:px-4 text-sm md:text-base">
                        Detailed Market Report
                      </td>
                      <td className="text-center py-2 px-2 md:py-3 md:px-4 text-muted-foreground">
                        —
                      </td>
                      <td className="text-center py-2 px-2 md:py-3 md:px-4">
                        ✅
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 px-2 md:py-3 md:px-4 text-sm md:text-base">
                        Competitor&apos;s Current Occupancy
                      </td>
                      <td className="text-center py-2 px-2 md:py-3 md:px-4 text-muted-foreground">
                        —
                      </td>
                      <td className="text-center py-2 px-2 md:py-3 md:px-4">
                        ✅
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 px-2 md:py-3 md:px-4 text-sm md:text-base">
                        Compare Your Listing with Top Performers
                      </td>
                      <td className="text-center py-2 px-2 md:py-3 md:px-4 text-muted-foreground">
                        —
                      </td>
                      <td className="text-center py-2 px-2 md:py-3 md:px-4">
                        ✅
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 px-2 md:py-3 md:px-4 text-sm md:text-base">
                        Current Neighborhood Demand
                      </td>
                      <td className="text-center py-2 px-2 md:py-3 md:px-4 text-muted-foreground">
                        —
                      </td>
                      <td className="text-center py-2 px-2 md:py-3 md:px-4">
                        ✅
                      </td>
                    </tr>
                    <tr className="hidden md:table-row">
                      <td className="py-2 px-2 md:py-3 md:px-4 text-sm md:text-base">
                        Support
                      </td>
                      <td className="text-center py-2 px-2 md:py-3 md:px-4">
                        Community
                      </td>
                      <td className="text-center py-2 px-2 md:py-3 md:px-4">
                        Priority
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Help Banner */}
        <div className="w-fit mx-auto my-8">
          <PricingHelpBanner />
        </div>
      </div>
    </>
  );
}
