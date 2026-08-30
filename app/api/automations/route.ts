import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase";
import { getCurrentSupabaseUser } from "@/lib/syncUser";

/**
 * GET /api/automations — list user's AutoDM rules + recent DM logs
 * POST /api/automations — create a new AutoDM rule
 *
 * Rule: when someone comments {keyword} on any of your posts,
 *       automatically send {reply_message} as DM (or public reply).
 */
export async function GET() {
  const user = await getCurrentSupabaseUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const supabase = createServerSupabaseClient();

  const [rulesRes, logsRes] = await Promise.all([
    supabase
      .from("automations")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false }),
    supabase
      .from("dm_logs")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(20),
  ]);

  return NextResponse.json({
    automations: rulesRes.data || [],
    logs: logsRes.data || [],
  });
}

export async function POST(req: NextRequest) {
  const user = await getCurrentSupabaseUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const keyword = (body.keyword || "").toString().trim().toLowerCase();
  const replyType = body.reply_type === "comment" ? "comment" : "dm";
  const replyMessage = (body.reply_message || "").toString().trim();

  if (!keyword) {
    return NextResponse.json({ error: "Keyword is required" }, { status: 400 });
  }
  if (keyword.length > 50) {
    return NextResponse.json({ error: "Keyword max 50 characters" }, { status: 400 });
  }
  if (!replyMessage) {
    return NextResponse.json({ error: "Reply message is required" }, { status: 400 });
  }
  if (replyMessage.length > 500) {
    return NextResponse.json({ error: "Reply message max 500 characters" }, { status: 400 });
  }

  const supabase = createServerSupabaseClient();

  const { data, error } = await supabase
    .from("automations")
    .insert([
      {
        user_id: user.id,
        keyword,
        reply_type: replyType,
        reply_message: replyMessage,
        status: "active",
        dms_sent: 0,
        clicks: 0,
      },
    ])
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ automation: data });
}
