import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { createServerSupabaseClient } from "@/lib/supabase";
import {
  exchangeCodeForToken,
  exchangeForLongLivedToken,
  getInstagramBusinessAccount,
  getInstagramRedirectUri,
  subscribeToComments,
  verifyOAuthState,
} from "@/lib/instagram";

/**
 * GET /api/auth/instagram/callback
 * Step 2 of "Connect Instagram" — Meta redirects back here with a code.
 * We exchange it for real tokens, fetch the real Instagram business account,
 * save everything to Supabase, and subscribe the app to comment webhooks.
 */
export async function GET(req: NextRequest) {
  const params = req.nextUrl.searchParams;
  const code = params.get("code");
  const state = params.get("state");
  const errorReason = params.get("error_reason") || params.get("error");
  const errorDesc = params.get("error_description");

  const redirectWith = (qs: string) =>
    NextResponse.redirect(new URL(`/dashboard/automation?${qs}`, req.url));

  // 1. User cancelled or Meta rejected
  if (!code) {
    console.error("Instagram OAuth error:", errorReason, errorDesc);
    return redirectWith(
      `error=${encodeURIComponent(errorDesc || errorReason || "oauth_cancelled")}`
    );
  }

  // 2. CSRF check
  if (!(await verifyOAuthState(state))) {
    return redirectWith(`error=${encodeURIComponent("Invalid state (CSRF check failed)")}`);
  }

  // 3. Must be logged in
  const clerkUser = await currentUser();
  if (!clerkUser) {
    return redirectWith(`error=${encodeURIComponent("Please sign in first")}`);
  }

  try {
    const redirectUri = getInstagramRedirectUri(req.url);

    // 4. code -> user token -> long-lived token
    const userToken = await exchangeCodeForToken(code, redirectUri);
    const longLivedToken = await exchangeForLongLivedToken(userToken);

    // 5. Get the real Instagram business account the user picked in the dialog
    const ig = await getInstagramBusinessAccount(longLivedToken);

    // 6. Save / update in Supabase
    const supabase = createServerSupabaseClient();

    // ensure the Clerk user exists in Supabase first
    const { data: dbUser } = await supabase
      .from("users")
      .select("id")
      .eq("clerk_user_id", clerkUser.id)
      .single();

    if (!dbUser) {
      const { data: newUser } = await supabase
        .from("users")
        .insert([
          {
            clerk_user_id: clerkUser.id,
            email: clerkUser.emailAddresses[0]?.emailAddress || "",
            name: `${clerkUser.firstName || ""} ${clerkUser.lastName || ""}`.trim() || "User",
            avatar_url: clerkUser.imageUrl || null,
          },
        ])
        .select("id")
        .single();
      if (!newUser) {
        return redirectWith(`error=${encodeURIComponent("Could not sync user to database")}`);
      }
    }

    const userId = dbUser?.id;
    if (!userId) {
      return redirectWith(`error=${encodeURIComponent("Could not find user in database")}`);
    }

    const expiresAt = new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString();

    const { error: upsertError } = await supabase.from("instagram_accounts").upsert(
      [
        {
          user_id: userId,
          ig_user_id: ig.igUserId,
          page_id: ig.pageId,
          username: ig.username,
          name: ig.name,
          followers_count: ig.followersCount,
          profile_pic_url: ig.profilePicUrl,
          biography: ig.biography,
          access_token: ig.pageToken,
          token_expires_at: expiresAt,
          status: "active",
          connected_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ],
      { onConflict: "user_id" }
    );

    if (upsertError) {
      console.error("Supabase IG save error:", upsertError);
      return redirectWith(`error=${encodeURIComponent("Database error: " + upsertError.message)}`);
    }

    // 7. Subscribe app to comment webhooks for this IG account (best-effort)
    try {
      await subscribeToComments(ig.pageToken, ig.igUserId);
    } catch (subErr: any) {
      console.error("Webhook subscribe error (non-fatal):", subErr?.message);
    }

    // 8. Success -> back to AutoDM page
    return redirectWith(
      `connected=true&handle=${encodeURIComponent("@" + ig.username)}`
    );
  } catch (err: any) {
    console.error("Instagram connect error:", err);
    return redirectWith(`error=${encodeURIComponent(err?.message || "Connect failed")}`);
  }
}
