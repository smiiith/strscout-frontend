import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

// Rate limit: 2 assessments per IP per day for anonymous users
const RATE_LIMIT = 2;
const RATE_LIMIT_WINDOW_HOURS = 24;

export async function POST(request: NextRequest) {
  try {
    const { userId } = await request.json();

    // Get client IP address
    const forwarded = request.headers.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(",")[0] : request.ip || "unknown";

    const supabase = await createClient();

    // Check how many assessments this IP has run in the last 24 hours
    const cutoffTime = new Date();
    cutoffTime.setHours(cutoffTime.getHours() - RATE_LIMIT_WINDOW_HOURS);

    const { data: recentAssessments, error } = await supabase
      .from("anonymous_usage")
      .select("id")
      .eq("ip_address", ip)
      .gte("created_at", cutoffTime.toISOString());

    if (error) {
      console.error("Error checking rate limit:", error);
      return NextResponse.json(
        { error: "Failed to check rate limit" },
        { status: 500 }
      );
    }

    const assessmentCount = recentAssessments?.length || 0;
    const allowed = assessmentCount < RATE_LIMIT;

    return NextResponse.json({
      allowed,
      assessmentCount,
      limit: RATE_LIMIT,
      remaining: Math.max(0, RATE_LIMIT - assessmentCount),
    });
  } catch (error) {
    console.error("Error in rate-limit check:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
