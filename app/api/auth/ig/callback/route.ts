import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase";

/**
 * GET /api/auth/ig/callback
 * Handles Direct Instagram OAuth 2.0 Authorization Callback
 */
export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const code = searchParams.get("code");
  const error = searchParams.get("error");
  const errorDescription = searchParams.get("error_description");

  if (error || !code) {
    console.error("Instagram OAuth Error:", error, errorDescription);
    return NextResponse.redirect(
      new URL("/dashboard/instagram?error=" + encodeURIComponent(error || "oauth_failed"), req.url)
    );
  }

  const appId = process.env.INSTAGRAM_APP_ID || "1578162103938474";
  const appSecret = process.env.INSTAGRAM_APP_SECRET || "";
  const redirectUri = "https://earnwithads.in/api/auth/ig/callback";

  let realHandle = "";
  let realName = "";
  let realFollowers = "10K";
  let token = "";

  try {
    if (appSecret) {
      const formData = new URLSearchParams();
      formData.append("client_id", appId);
      formData.append("client_secret", appSecret);
      formData.append("grant_type", "authorization_code");
      formData.append("redirect_uri", redirectUri);
      formData.append("code", code);

      const tokenRes = await fetch("https://api.instagram.com/oauth/access_token", {
        method: "POST",
        body: formData,
      });

      const tokenData = await tokenRes.json();
      token = tokenData.access_token || "";

      if (token) {
        const userRes = await fetch(
          `https://graph.instagram.com/v18.0/me?fields=id,username,name,account_type,media_count&access_token=${token}`
        );
        const userData = await userRes.json();
        if (userData.username) {
          realHandle = "@" + userData.username;
          realName = userData.name || userData.username;
        }
      }
    }
  } catch (err) {
    console.error("Instagram token exchange error:", err);
  }

  // Save to Supabase DB if real handle was fetched
  if (realHandle) {
    try {
      const supabase = createServerSupabaseClient();
      await supabase.from("instagram_accounts").upsert([
        {
          username: realHandle,
          name: realName,
          followers_count: realFollowers,
          access_token: token || "token_saved",
          status: "active",
          updated_at: new Date().toISOString(),
        },
      ]);
    } catch (dbErr) {
      console.error("Supabase IG Account Save Error:", dbErr);
    }
  }

  const redirectUrl = new URL("/dashboard/instagram", req.url);
  redirectUrl.searchParams.set("connected", "true");
  if (realHandle) {
    redirectUrl.searchParams.set("handle", realHandle);
    redirectUrl.searchParams.set("name", realName);
    redirectUrl.searchParams.set("followers", realFollowers);
  } else {
    // If token exchange needs handle input, open handle input modal
    redirectUrl.searchParams.set("action", "enter_handle");
  }

  return NextResponse.redirect(redirectUrl);
}
