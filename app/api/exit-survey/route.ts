import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const body = await request.json();

    const { page_path, selected_option, other_text } = body;

    if (!page_path || !selected_option) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Get user session if logged in (optional)
    const { data: { user } } = await supabase.auth.getUser();

    // Insert survey response
    const { error } = await supabase.from("exit_survey_responses").insert({
      user_id: user?.id || null,
      page_path,
      selected_option,
      other_text: other_text || null,
      user_agent: request.headers.get("user-agent") || null,
    });

    if (error) {
      console.error("Error inserting survey response:", error);
      return NextResponse.json(
        { error: "Failed to save response" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error processing exit survey:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
