import AccountForm from "@/app/(authenticated)/account/update/page";
import { MyAccountIcon } from "@/components/Icons";
import { createClient } from "@/utils/supabase/server";
import ManageSubscriptionButton from "@/components/ManageSubscriptionButton";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Message } from "@/components/ui/message";

const Account = async () => {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Get user profile with billing and subscription details
  const { data: profile } = await supabase
    .from("profiles")
    .select(
      `
      subscription_status,
      billing_type,
      current_tier,
      listings_purchased,
      purchase_date,
      market_spy_listings_limit,
      market_spy_listings_used,
      subscription_quantity
    `
    )
    .eq("id", user?.id)
    .single();

  const hasActiveSubscription = profile?.subscription_status === "active";
  const isSubscription = profile?.billing_type === "subscription";
  const isOneTime = profile?.billing_type === "one_time";

  return (
    <>
      <div className="min-h-[700px] pt-6">
        <h1 className="text-3xl font-bold">My Account</h1>

        <div className="md:w-[500px]">
          <AccountForm user={user} />

          {/* Billing Information Section */}
          <div className="mt-8 pt-8 border-t">
            <h2 className="text-xl font-semibold mb-4">Billing & Usage</h2>

            {/* Subscription Users */}

            {/* Subscription:12 market spy reportsUsed this month: 0/12 */}

            {hasActiveSubscription && isSubscription && (
              <div className="space-y-4">
                <Message variant="info">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">Active Subscription</h3>
                    <span className="text-sm capitalize">
                      {profile.current_tier || "Pro"} Plan
                    </span>
                  </div>
                  <pre>{JSON.stringify(profile, null, 2)}</pre>
                  <p className="text-sm mb-3">
                    {profile.market_spy_listings_limit} Market Spy reports
                  </p>
                  <div className="flex items-center justify-between text-sm">
                    <span>
                      Used this month: {profile.market_spy_listings_used || 0} /{" "}
                      {profile.market_spy_listings_limit || 0}
                    </span>
                  </div>
                </Message>

                <ManageSubscriptionButton />
              </div>
            )}

            {/* One-time Payment Users */}
            {isOneTime && (
              <div className="space-y-4">
                <Message variant="info">
                  {/* <pre>{JSON.stringify(profile, null, 2)}</pre> */}
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">One-time Purchase</h3>
                    <span className="text-sm capitalize">
                      {profile.current_tier || "Pro"} Plan
                    </span>
                  </div>
                  {profile.purchase_date && (
                    <p className="text-sm mb-3">
                      Purchased on{" "}
                      {new Date(profile.purchase_date).toLocaleDateString()}
                    </p>
                  )}
                  <div className="flex items-center justify-between text-sm mb-4">
                    <span>
                      Listings: {profile.market_spy_listings_used || 0} /{" "}
                      {profile.market_spy_listings_limit || 0} used
                    </span>
                  </div>
                </Message>

                <div className="flex gap-3 pt-6 pb-8">
                  <Link href="/pricing">
                    <Button variant="outline">Buy More Listings</Button>
                  </Link>

                  {(profile.market_spy_listings_used || 0) <
                    (profile.market_spy_listings_limit || 0) && (
                    <Link href="/market-spy">
                      <Button>
                        Use Listings (
                        {(profile.market_spy_listings_limit || 0) -
                          (profile.market_spy_listings_used || 0)}{" "}
                        remaining)
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            )}

            {/* Free Plan Users */}
            {!hasActiveSubscription && !isOneTime && (
              <div className="space-y-4">
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <h3 className="font-medium text-gray-800 mb-2">Free Plan</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Get access to STR Genius analysis for free. Upgrade to
                    unlock Market Spy features.
                  </p>
                </div>

                <Link href="/pricing">
                  <Button>Upgrade to Pro</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Account;
