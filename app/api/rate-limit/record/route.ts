import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function POST(request: NextRequest) {
  try {
    const { userId } = await request.json();

    // Get client IP address
    const forwarded = request.headers.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(",")[0] : request.ip || "unknown";

    const supabase = await createClient();

    // Record this assessment
    const { error } = await supabase.from("anonymous_usage").insert({
      user_id: userId,
      ip_address: ip,
      created_at: new Date().toISOString(),
    });

    if (error) {
      console.error("Error recording usage:", error);
      return NextResponse.json(
        { error: "Failed to record usage" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Usage recorded",
    });
  } catch (error) {
    console.error("Error in rate-limit record:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
