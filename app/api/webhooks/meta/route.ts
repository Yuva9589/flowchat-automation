import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase";

/**
 * GET /api/webhooks/meta
 * Meta Webhook Verification Endpoint
 * Used by Meta / Facebook Developer Dashboard to verify webhook URL.
 */
export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const mode = searchParams.get("hub.mode");
  const token = searchParams.get("hub.verify_token");
  const challenge = searchParams.get("hub.challenge");

  const verifyToken = process.env.META_WEBHOOK_VERIFY_TOKEN || "flowchat_webhook_secret_2026";

  if (mode === "subscribe" && token === verifyToken) {
    console.log("Meta Webhook Verified Successfully!");
    return new NextResponse(challenge, { status: 200 });
  }

  return NextResponse.json({ error: "Forbidden: Invalid verify token" }, { status: 403 });
}

/**
 * POST /api/webhooks/meta
 * Meta Webhook Event Handler
 * Receives Instagram comments, Facebook comments & WhatsApp messages in real-time.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (body.object === "instagram" || body.object === "page") {
      const entries = body.entry || [];

      for (const entry of entries) {
        const changes = entry.changes || [];
        for (const change of changes) {
          if (change.field === "comments") {
            const commentValue = change.value;
            const commentText = commentValue?.text || "";
            const commentId = commentValue?.id;
            const mediaId = commentValue?.media?.id;

            if (commentText) {
              const supabase = createServerSupabaseClient();
              const words = commentText.toUpperCase().split(/\s+/);

              // Find matching active automation in Supabase
              const { data: automations } = await supabase
                .from("automations")
                .select("*")
                .eq("status", "active")
                .in("keyword", words);

              if (automations && automations.length > 0) {
                const matchedAuto = automations[0];
                console.log(`Matched automation rule for keyword "${matchedAuto.keyword}"`);

                // Increment dms_sent count in Supabase
                await supabase
                  .from("automations")
                  .update({ dms_sent: (matchedAuto.dms_sent || 0) + 1 })
                  .eq("id", matchedAuto.id);
              }
            }
          }
        }
      }
    }

    return NextResponse.json({ status: "EVENT_RECEIVED" }, { status: 200 });
  } catch (err: any) {
    console.error("Webhook processing error:", err);
    return NextResponse.json({ status: "EVENT_RECEIVED" }, { status: 200 });
  }
}