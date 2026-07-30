import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase";
import { getCurrentSupabaseUser } from "@/lib/syncUser";

/**
 * GET /api/automations?platform=instagram
 * Fetch all automations for the logged-in user
 * Optional: filter by platform
 */
export async function GET(req: NextRequest) {
  try {
    // Get current user
    const user = await getCurrentSupabaseUser();
    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Get platform filter from URL query
    const platform = req.nextUrl.searchParams.get("platform");

    // Query database
    const supabase = createServerSupabaseClient();
    let query = supabase
      .from("automations")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (platform) {
      query = query.eq("platform", platform);
    }

    const { data, error } = await query;

    if (error) {
      console.error("Error fetching automations:", error);
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ automations: data || [] });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Server error" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/automations
 * Create a new automation
 * Body: { platform, keyword, post_caption, reply_message, follow_gate }
 */
export async function POST(req: NextRequest) {
  try {
    // Get current user
    const user = await getCurrentSupabaseUser();
    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const {
      platform,
      keyword,
      post_caption,
      reply_message,
      follow_gate = true,
      use_template = true,
    } = body;

    // Validation
    if (!platform || !keyword || !reply_message) {
      return NextResponse.json(
        { error: "Missing required fields: platform, keyword, reply_message" },
        { status: 400 }
      );
    }

    // Insert into database
    const supabase = createServerSupabaseClient();
    const { data, error } = await supabase
      .from("automations")
      .insert([
        {
          user_id: user.id,
          platform,
          keyword: keyword.toUpperCase().trim(),
          post_caption: post_caption || null,
          reply_message,
          follow_gate,
          use_template,
          status: "active",
          dms_sent: 0,
          clicks: 0,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("Error creating automation:", error);
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ automation: data });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Server error" },
      { status: 500 }
    );
  }
}