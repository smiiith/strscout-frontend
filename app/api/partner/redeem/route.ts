import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/utils/supabase/server";

/**
 * POST /api/partner/redeem
 *
 * Called after the partner has signed in anonymously on the /partner/[token] page.
 * Atomically claims the partner token and upgrades the anonymous profile to partner access.
 *
 * Body: { token: string, userId: string }
 */
export async function POST(request: NextRequest) {
  try {
    const { token, userId } = await request.json();

    if (!token || !userId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const supabaseAdmin = createAdminClient();

    // Verify the userId is a real, anonymous Supabase user
    const { data: userData, error: userError } =
      await supabaseAdmin.auth.admin.getUserById(userId);

    if (userError || !userData?.user) {
      return NextResponse.json(
        { error: "Invalid user" },
        { status: 401 }
      );
    }

    // Confirm the user is anonymous (not a real account trying to abuse partner tokens)
    if (!userData.user.is_anonymous) {
      return NextResponse.json(
        { error: "Partner tokens can only be redeemed by new sessions" },
        { status: 403 }
      );
    }

    // Atomically claim the token — WHERE redeemed_at IS NULL prevents double-redemption
    const { data: claimedTokens, error: claimError } = await supabaseAdmin
      .from("partner_tokens")
      .update({
        redeemed_at: new Date().toISOString(),
        redeemed_by_user_id: userId,
      })
      .eq("token", token)
      .is("redeemed_at", null)
      .select("id, runs_granted");

    if (claimError) {
      console.error("Error claiming partner token:", claimError);
      return NextResponse.json(
        { error: "Failed to claim token" },
        { status: 500 }
      );
    }

    if (!claimedTokens || claimedTokens.length === 0) {
      // Token was already redeemed between page load and button click
      return NextResponse.json(
        { error: "This link has already been used" },
        { status: 409 }
      );
    }

    const runsGranted = claimedTokens[0].runs_granted;

    // Upgrade the anonymous user's profile to partner access
    const { error: profileError } = await supabaseAdmin
      .from("profiles")
      .update({
        is_partner_user: true,
        market_spy_listings_limit: runsGranted,
        market_spy_listings_used: 0,
      })
      .eq("id", userId);

    if (profileError) {
      console.error("Error updating partner profile:", profileError);
      // Token is claimed but profile failed — attempt rollback
      await supabaseAdmin
        .from("partner_tokens")
        .update({ redeemed_at: null, redeemed_by_user_id: null })
        .eq("token", token);
      return NextResponse.json(
        { error: "Failed to provision access" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, runsGranted });
  } catch (error: any) {
    console.error("Error in partner redeem:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
