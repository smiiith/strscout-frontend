import { NextRequest, NextResponse } from "next/server";
import { createAdminClient, createClient } from "@/utils/supabase/server";

async function verifyAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return { user: null, error: "Unauthorized", status: 401 };
  }

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("is_admin")
    .eq("id", user.id)
    .single();

  if (profileError || !profile?.is_admin) {
    return { user: null, error: "Forbidden - Admin access required", status: 403 };
  }

  return { user, error: null, status: 200 };
}

/**
 * GET /api/admin/partner-tokens
 * List all partner tokens ordered by created_at desc.
 */
export async function GET() {
  try {
    const auth = await verifyAdmin();
    if (auth.error) {
      return NextResponse.json({ error: auth.error }, { status: auth.status });
    }

    const supabaseAdmin = createAdminClient();
    const { data: tokens, error } = await supabaseAdmin
      .from("partner_tokens")
      .select(
        "id, token, partner_name, notes, runs_granted, redeemed_at, redeemed_by_user_id, created_at, expires_at"
      )
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching partner tokens:", error);
      return NextResponse.json(
        { error: "Failed to fetch tokens" },
        { status: 500 }
      );
    }

    return NextResponse.json({ tokens });
  } catch (error: any) {
    console.error("Error in GET /api/admin/partner-tokens:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/admin/partner-tokens
 * Create a new partner token.
 * Body: { partner_name: string, notes?: string }
 */
export async function POST(request: NextRequest) {
  try {
    const auth = await verifyAdmin();
    if (auth.error) {
      return NextResponse.json({ error: auth.error }, { status: auth.status });
    }

    const { partner_name, notes } = await request.json();

    if (!partner_name?.trim()) {
      return NextResponse.json(
        { error: "partner_name is required" },
        { status: 400 }
      );
    }

    const supabaseAdmin = createAdminClient();
    const { data: token, error } = await supabaseAdmin
      .from("partner_tokens")
      .insert({
        partner_name: partner_name.trim(),
        notes: notes?.trim() || null,
        runs_granted: 1,
      })
      .select(
        "id, token, partner_name, notes, runs_granted, created_at, expires_at"
      )
      .single();

    if (error) {
      console.error("Error creating partner token:", error);
      return NextResponse.json(
        { error: "Failed to create token" },
        { status: 500 }
      );
    }

    return NextResponse.json({ token }, { status: 201 });
  } catch (error: any) {
    console.error("Error in POST /api/admin/partner-tokens:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/admin/partner-tokens?id=[id]
 * Revoke (delete) an unredeemed partner token.
 */
export async function DELETE(request: NextRequest) {
  try {
    const auth = await verifyAdmin();
    if (auth.error) {
      return NextResponse.json({ error: auth.error }, { status: auth.status });
    }

    const url = new URL(request.url);
    const id = url.searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Token id is required" },
        { status: 400 }
      );
    }

    const supabaseAdmin = createAdminClient();

    // Only allow deleting unredeemed tokens
    const { data: existing } = await supabaseAdmin
      .from("partner_tokens")
      .select("id, redeemed_at")
      .eq("id", id)
      .single();

    if (!existing) {
      return NextResponse.json({ error: "Token not found" }, { status: 404 });
    }

    if (existing.redeemed_at) {
      return NextResponse.json(
        { error: "Cannot revoke a token that has already been redeemed" },
        { status: 409 }
      );
    }

    const { error } = await supabaseAdmin
      .from("partner_tokens")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Error deleting partner token:", error);
      return NextResponse.json(
        { error: "Failed to delete token" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Error in DELETE /api/admin/partner-tokens:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
