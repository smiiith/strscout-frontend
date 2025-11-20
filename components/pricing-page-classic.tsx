"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useUserSession } from "@/lib/context/UserSessionProvider";
import ProPlanSelector from "@/components/pro-plan-selector";
import { PLANS } from "@/app/types/plans";
import ExitSurvey from "@/components/exit-survey";
import { PricingHelpBanner } from "@/components/pricing-help-banner";
import { PricingHelpWidget } from "@/components/pricing-help-widget";

export default function PricingPageClassic() {
  const router = useRouter();
  const { session } = useUserSession();
  const planData = session?.profile?.plan;

  const isCurrentPlan = (planKey: string) => {
    return planData?.key === planKey;
  };

  return (
    <>
      <ExitSurvey pagePath="/pricing" />
      <PricingHelpWidget />
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Choose Your Plan</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Start with STR Genius for free, or upgrade to Pro Plan for powerful
            Market Spy features
          </p>
        </div>

        {/* Pricing Plans Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Free Plan Card */}
          <Card className="relative">
            <CardHeader>
              <div className="flex items-center gap-4 mb-4">
                <Image
                  src="/images/str-feedback-genius-logo-stacked.png"
                  alt="STR Feedback Genius"
                  width={200}
                  height={60}
                  quality={100}
                  className="w-auto h-[60px]"
                />
              </div>
              <CardTitle className="text-2xl">Free Plan</CardTitle>
              <div className="text-3xl font-bold">
                $0
                <span className="text-lg font-normal text-muted-foreground">
                  /month
                </span>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="font-semibold mb-3">✅ STR Genius Included:</h4>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Personalized feedback on your listing</li>
                  <li>• Hero photo analysis</li>
                  <li>• Headline optimization</li>
                  <li>• Description improvements</li>
                  <li>• Photo quality assessment</li>
                  <li>• Amenities review</li>
                  <li>• Interior design feedback</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-3 text-muted-foreground">
                  ❌ Not Included:
                </h4>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Market Spy competitive analysis</li>
                  <li>• Nearby competitor insights</li>
                  <li>• Occupancy data</li>
                </ul>
              </div>

              <div className="pt-4">
                {isCurrentPlan(PLANS.FREEMIUM) ? (
                  <Button variant="outline" disabled className="w-full">
                    Current Plan
                  </Button>
                ) : (
                  <Button
                    className="w-full"
                    onClick={() =>
                      router.push("/register?redirect_to=/pricing")
                    }
                  >
                    Sign Up Free Now
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Pro Plan Card with Fallback Selector */}
          <ProPlanSelector />
        </div>

        {/* Help Banner */}
        <div className="w-fit mx-auto my-8">
          <PricingHelpBanner />
        </div>

        {/* Feature Comparison Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center mb-8">
            Feature Comparison
          </h2>
          <Card className="max-w-4xl mx-auto">
            <CardContent className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">Feature</th>
                      <th className="text-center py-3 px-4">Free Plan</th>
                      <th className="text-center py-3 px-4">Pro Plan</th>
                    </tr>
                  </thead>
                  <tbody className="space-y-2">
                    <tr className="border-b">
                      <td className="py-3 px-4 font-medium">
                        Feedback Genius Analysis
                      </td>
                      <td className="text-center py-3 px-4">✅</td>
                      <td className="text-center py-3 px-4">✅</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4 font-medium">
                        Personalized Listing Feedback
                      </td>
                      <td className="text-center py-3 px-4">✅</td>
                      <td className="text-center py-3 px-4">✅</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4 font-medium">
                        Recommendations to Improve
                      </td>
                      <td className="text-center py-3 px-4">✅</td>
                      <td className="text-center py-3 px-4">✅</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4 font-medium">
                        Market Spy Access
                      </td>
                      <td className="text-center py-3 px-4">❌</td>
                      <td className="text-center py-3 px-4">✅</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4 font-medium">
                        Detailed Market Report
                      </td>
                      <td className="text-center py-3 px-4">❌</td>
                      <td className="text-center py-3 px-4">✅</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4 font-medium">
                        Competitor's Current Occupancy
                      </td>
                      <td className="text-center py-3 px-4">❌</td>
                      <td className="text-center py-3 px-4">✅</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4 font-medium">
                        Why Competitors Get Booked
                      </td>
                      <td className="text-center py-3 px-4">❌</td>
                      <td className="text-center py-3 px-4">✅</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4 font-medium">
                        Compare Your Listing with Top Performers
                      </td>
                      <td className="text-center py-3 px-4">❌</td>
                      <td className="text-center py-3 px-4">✅</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4 font-medium">
                        Summary with Action Steps
                      </td>
                      <td className="text-center py-3 px-4">❌</td>
                      <td className="text-center py-3 px-4">✅</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4 font-medium">
                        Market Scout Access
                      </td>
                      <td className="text-center py-3 px-4">❌</td>
                      <td className="text-center py-3 px-4">✅</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4 font-medium">
                        Neighborhood Comps
                      </td>
                      <td className="text-center py-3 px-4">❌</td>
                      <td className="text-center py-3 px-4">✅</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4 font-medium">
                        Detailed Report on Each Comp
                      </td>
                      <td className="text-center py-3 px-4">❌</td>
                      <td className="text-center py-3 px-4">✅</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4 font-medium">
                        Current Neighborhood Demand
                      </td>
                      <td className="text-center py-3 px-4">❌</td>
                      <td className="text-center py-3 px-4">✅</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4 font-medium">
                        Detailed Strength of Competition Report
                      </td>
                      <td className="text-center py-3 px-4">❌</td>
                      <td className="text-center py-3 px-4">✅</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4 font-medium">Support</td>
                      <td className="text-center py-3 px-4">Community</td>
                      <td className="text-center py-3 px-4">Priority</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
