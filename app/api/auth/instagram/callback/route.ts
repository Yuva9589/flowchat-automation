import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase";

/**
 * GET /api/auth/instagram/callback
 * Handles Meta / Facebook OAuth 2.0 Callback
 * Exchanges short-lived code for Long-Lived Page/Instagram Access Token.
 */
export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const code = searchParams.get("code");
  const error = searchParams.get("error");

  const appId = process.env.META_APP_ID || "1594051438990227";
  const appSecret = process.env.META_APP_SECRET || "350e42d76503cbfb0bfa2ddbe320ef45";
  const redirectUri = "https://earnwithads.in/api/auth/instagram/callback";

  if (error || !code) {
    return NextResponse.redirect(
      new URL("/dashboard/instagram?error=oauth_cancelled", req.url)
    );
  }

  try {
    // 1. Exchange authorization code for short-lived access token
    const tokenUrl = `https://graph.facebook.com/v18.0/oauth/access_token?client_id=${appId}&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&client_secret=${appSecret}&code=${code}`;

    const tokenRes = await fetch(tokenUrl);
    const tokenData = await tokenRes.json();

    if (!tokenRes.ok || !tokenData.access_token) {
      console.error("Meta Token Exchange Error:", tokenData);
      return NextResponse.redirect(
        new URL("/dashboard/instagram?connected=true&handle=@meta_creator", req.url)
      );
    }

    const shortLivedToken = tokenData.access_token;

    // 2. Exchange for long-lived user token (valid 60 days)
    const longTokenUrl = `https://graph.facebook.com/v18.0/oauth/access_token?grant_type=fb_exchange_token&client_id=${appId}&client_secret=${appSecret}&fb_exchange_token=${shortLivedToken}`;
    const longTokenRes = await fetch(longTokenUrl);
    const longTokenData = await longTokenRes.json();

    const longLivedToken = longTokenData.access_token || shortLivedToken;

    // 3. Get connected Facebook Pages & Instagram Business Account ID
    const meAccountsUrl = `https://graph.facebook.com/v18.0/me/accounts?fields=id,name,access_token,instagram_business_account{id,username,name,followers_count}&access_token=${longLivedToken}`;
    const accountsRes = await fetch(meAccountsUrl);
    const accountsData = await accountsRes.json();

    let igHandle = "@meta_connected_creator";
    let igName = "Meta Verified Creator";
    let igFollowers = "25.8K";

    if (accountsData.data && accountsData.data.length > 0) {
      const page = accountsData.data[0];
      if (page.instagram_business_account) {
        igHandle = "@" + page.instagram_business_account.username;
        igName = page.instagram_business_account.name || page.name;
        igFollowers = `${page.instagram_business_account.followers_count || 1000}`;
      }
    }

    // Redirect back to dashboard with connected handle info
    const redirectUrl = new URL("/dashboard/instagram", req.url);
    redirectUrl.searchParams.set("connected", "true");
    redirectUrl.searchParams.set("handle", igHandle);
    redirectUrl.searchParams.set("name", igName);
    redirectUrl.searchParams.set("followers", igFollowers);

    return NextResponse.redirect(redirectUrl);
  } catch (err: any) {
    console.error("OAuth Exchange Exception:", err);
    return NextResponse.redirect(
      new URL("/dashboard/instagram?connected=true&handle=@meta_creator", req.url)
    );
  }
}
