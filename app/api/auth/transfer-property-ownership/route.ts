import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/utils/supabase/server";

/**
 * Transfers property ownership from anonymous user to new permanent user
 * Called after user confirms their email
 */
export async function POST(request: NextRequest) {
  try {
    const { userId } = await request.json();

    if (!userId) {
      return NextResponse.json({ error: "User ID required" }, { status: 400 });
    }

    const supabase = createAdminClient();

    // Find pending conversion for this new user
    const { data: conversion, error: conversionError } = await supabase
      .from("pending_conversions")
      .select("*")
      .eq("new_user_id", userId)
      .is("converted_at", null)
      .single();

    if (conversionError) {
      if (conversionError.code === "PGRST116") {
        // No pending conversion found - that's OK, maybe they registered normally
        return NextResponse.json({
          success: true,
          message: "No property transfer needed",
        });
      }
      console.error("Error finding pending conversion:", conversionError);
      return NextResponse.json(
        { error: "Failed to find pending conversion" },
        { status: 500 }
      );
    }

    // Transfer Feedback Genius property ownership in str_properties
    const { error: updateError } = await supabase
      .from("str_properties")
      .update({ user_id: userId })
      .eq("user_id", conversion.anonymous_user_id);

    if (updateError) {
      console.error("Error transferring property ownership:", updateError);
      return NextResponse.json(
        { error: "Failed to transfer property ownership" },
        { status: 500 }
      );
    }

    // Mark conversion as complete
    const { error: markError } = await supabase
      .from("pending_conversions")
      .update({ converted_at: new Date().toISOString() })
      .eq("id", conversion.id);

    if (markError) {
      console.error("Error marking conversion complete:", markError);
    }

    console.log("Property ownership transferred:", {
      from: conversion.anonymous_user_id,
      to: userId,
      property_id: conversion.property_id,
    });

    return NextResponse.json({
      success: true,
      message: "Property ownership transferred successfully",
      propertyId: conversion.property_id,
    });
  } catch (error: any) {
    console.error("Error in transfer-property-ownership:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
