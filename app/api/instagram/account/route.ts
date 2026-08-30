import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase";
import { getCurrentSupabaseUser } from "@/lib/syncUser";
import { unsubscribeFromComments } from "@/lib/instagram";

/**
 * GET /api/instagram/account — current user's connected IG account
 * DELETE /api/instagram/account — disconnect (remove tokens from DB)
 */
export async function GET() {
  const user = await getCurrentSupabaseUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const supabase = createServerSupabaseClient();
  const { data, error } = await supabase
    .from("instagram_accounts")
    .select(
      "id, ig_user_id, page_id, username, name, followers_count, profile_pic_url, biography, status, connected_at"
    )
    .eq("user_id", user.id)
    .maybeSingle();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ account: data || null });
}

export async function DELETE() {
  const user = await getCurrentSupabaseUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const supabase = createServerSupabaseClient();

  const { data: account } = await supabase
    .from("instagram_accounts")
    .select("ig_user_id, access_token")
    .eq("user_id", user.id)
    .maybeSingle();

  if (account?.access_token && account?.ig_user_id) {
    try {
      await unsubscribeFromComments(account.access_token, account.ig_user_id);
    } catch (e: any) {
      console.error("Webhook unsubscribe error (non-fatal):", e?.message);
    }
  }

  const { error } = await supabase
    .from("instagram_accounts")
    .delete()
    .eq("user_id", user.id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
