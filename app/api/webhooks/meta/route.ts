import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase";
import { replyToComment, sendCommentDM } from "@/lib/instagram";

/**
 * /api/webhooks/meta
 * GET  — Meta webhook verification (hub.challenge)
 * POST — receives Instagram "comments" events, matches keywords,
 *        sends the auto-DM (or public reply), logs everything.
 */

export async function GET(req: NextRequest) {
  const params = req.nextUrl.searchParams;
  const mode = params.get("hub.mode");
  const token = params.get("hub.verify_token");
  const challenge = params.get("hub.challenge");

  const expected = process.env.META_WEBHOOK_VERIFY_TOKEN || "";

  if (mode === "subscribe" && expected && token === expected && challenge) {
    return new NextResponse(challenge, { status: 200 });
  }
  return NextResponse.json({ error: "Verification failed" }, { status: 403 });
}

interface WebhookChange {
  field?: string;
  value?: {
    id?: string; // comment id
    text?: string;
    from?: { id?: string; username?: string };
    media?: { id?: string; media_product_type?: string };
    parent_id?: string;
  };
}

export async function POST(req: NextRequest) {
  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  const entries: any[] = body?.entry || [];
  const supabase = createServerSupabaseClient();
  const processed: string[] = [];

  for (const entry of entries) {
    const igUserId = entry.id; // IG business account id
    const changes: WebhookChange[] = entry.changes || [];

    for (const change of changes) {
      // Only react to comment events
      if (change.field !== "comments") continue;
      const v = change.value || {};
      const commentId = v.id;
      const commentText = (v.text || "").trim();
      const commenter = v.from?.username || "";
      const mediaId = v.media?.id || "";

      // Ignore replies (parent_id set) — only top-level comments trigger
      if (!commentId || !commentText) continue;
      if (v.parent_id) continue;

      // 1. Find the owner of this IG account
      const { data: account } = await supabase
        .from("instagram_accounts")
        .select("user_id, access_token, ig_user_id")
        .eq("ig_user_id", igUserId)
        .maybeSingle();

      if (!account?.access_token) continue;

      // 2. Get active rules for that user
      const { data: rules } = await supabase
        .from("automations")
        .select("*")
        .eq("user_id", account.user_id)
        .eq("status", "active");

      const lowerText = commentText.toLowerCase();

      for (const rule of rules || []) {
        const keyword = (rule.keyword || "").toLowerCase();
        if (!keyword || !lowerText.includes(keyword)) continue;

        // 3. Dedupe — never DM the same comment twice for the same rule
        const { data: already } = await supabase
          .from("dm_logs")
          .select("id")
          .eq("comment_id", commentId)
          .eq("automation_id", rule.id)
          .maybeSingle();
        if (already) continue;

        const logRow: Record<string, any> = {
          automation_id: rule.id,
          user_id: account.user_id,
          comment_id: commentId,
          commenter_username: commenter,
          media_id: mediaId,
          comment_text: commentText,
          reply_sent: rule.reply_message,
          status: "failed",
          error: null,
        };

        // 4. Send the DM (or public reply) — REAL API call
        try {
          if (rule.reply_type === "comment") {
            await replyToComment(account.access_token, commentId, rule.reply_message);
          } else {
            await sendCommentDM(
              account.access_token,
              account.ig_user_id,
              commentId,
              rule.reply_message
            );
          }
          logRow.status = "sent";
        } catch (err: any) {
          logRow.error = String(err?.message || err).slice(0, 500);
        }

        await supabase.from("dm_logs").insert([logRow]);

        if (logRow.status === "sent") {
          await supabase.rpc("increment_dms_sent", {
            row_id: rule.id,
          });
          processed.push(commentId);
        }
      }
    }
  }

  return NextResponse.json({ success: true, processed });
}
