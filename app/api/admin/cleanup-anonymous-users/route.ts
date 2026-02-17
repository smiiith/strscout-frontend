import { NextRequest, NextResponse } from "next/server";
import { createAdminClient, createClient } from "@/utils/supabase/server";

/**
 * Admin-only endpoint to clean up old anonymous users
 * Should be called via cron job or manually
 */
export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();

    // Verify admin access
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check if user is admin
    const { data: profile } = await supabase
      .from("profiles")
      .select("is_admin")
      .eq("id", session.user.id)
      .single();

    if (!profile?.is_admin) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { daysOld } = await request.json();
    const days = daysOld || 7; // Default to 7 days

    // Call cleanup function to mark users and delete associated data
    const { data: cleanupResult, error: cleanupError } = await supabase.rpc(
      "cleanup_old_anonymous_users",
      { days_old: days }
    );

    if (cleanupError) {
      console.error("Error running cleanup function:", cleanupError);
      return NextResponse.json(
        { error: "Cleanup function failed" },
        { status: 500 }
      );
    }

    // Get users marked for deletion
    const { data: usersToDelete, error: fetchError } = await supabase
      .from("users_to_delete")
      .select("user_id");

    if (fetchError) {
      console.error("Error fetching users to delete:", fetchError);
      return NextResponse.json(
        { error: "Failed to fetch users for deletion" },
        { status: 500 }
      );
    }

    // Delete users from auth.users using admin client
    const supabaseAdmin = createAdminClient();
    let deletedCount = 0;
    const errors = [];

    for (const user of usersToDelete || []) {
      try {
        const { error: deleteError } =
          await supabaseAdmin.auth.admin.deleteUser(user.user_id);

        if (deleteError) {
          console.error(`Error deleting user ${user.user_id}:`, deleteError);
          errors.push({ userId: user.user_id, error: deleteError.message });
        } else {
          deletedCount++;

          // Remove from tracking table after successful deletion
          await supabase
            .from("users_to_delete")
            .delete()
            .eq("user_id", user.user_id);
        }
      } catch (error: any) {
        console.error(`Exception deleting user ${user.user_id}:`, error);
        errors.push({ userId: user.user_id, error: error.message });
      }
    }

    return NextResponse.json({
      success: true,
      markedForDeletion: cleanupResult[0]?.deleted_users || 0,
      deletedFromAuth: deletedCount,
      deletedListings: cleanupResult[0]?.deleted_listings || 0,
      deletedUsageRecords: cleanupResult[0]?.deleted_usage_records || 0,
      errors: errors.length > 0 ? errors : undefined,
    });
  } catch (error: any) {
    console.error("Error in cleanup-anonymous-users:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * GET endpoint to preview what would be deleted (dry run)
 */
export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();

    // Verify admin access
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("is_admin")
      .eq("id", session.user.id)
      .single();

    if (!profile?.is_admin) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const url = new URL(request.url);
    const daysOld = parseInt(url.searchParams.get("days") || "7");
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - daysOld);

    // Preview: Count anonymous users that would be deleted
    const { count: anonymousCount } = await supabase
      .from("auth.users")
      .select("*", { count: "exact", head: true })
      .eq("is_anonymous", true)
      .lt("created_at", cutoffDate.toISOString());

    // Count associated listings
    const { data: anonymousUsers } = await supabase
      .from("auth.users")
      .select("id")
      .eq("is_anonymous", true)
      .lt("created_at", cutoffDate.toISOString());

    const userIds = anonymousUsers?.map((u: any) => u.id) || [];

    const { count: listingsCount } = await supabase
      .from("listings")
      .select("*", { count: "exact", head: true })
      .in("user_id", userIds);

    return NextResponse.json({
      preview: true,
      daysOld,
      cutoffDate: cutoffDate.toISOString(),
      anonymousUsers: anonymousCount || 0,
      associatedListings: listingsCount || 0,
      message: `Would delete ${anonymousCount || 0} anonymous users older than ${daysOld} days`,
    });
  } catch (error: any) {
    console.error("Error in cleanup preview:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
