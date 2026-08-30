/**
 * Instagram (Meta Graph API) helpers — 100% REAL API calls, no fake data.
 *
 * Uses "Facebook Login for Business" (config_id flow) — the CURRENT official way
 * to connect Instagram business accounts. (Instagram Basic Display API is dead
 * since Dec 2024 — that's why the old connect flow broke.)
 *
 * Flow:  /api/auth/instagram/login  ->  FB OAuth dialog  ->  /api/auth/instagram/callback
 *         exchange code -> long-lived token -> IG business account -> save to Supabase
 */

const GRAPH_VERSION = "v21.0";
const GRAPH_BASE = `https://graph.facebook.com/${GRAPH_VERSION}`;
const FB_DIALOG = "https://www.facebook.com/v21.0/dialog/oauth";

export function getMetaAppId() {
  return process.env.META_APP_ID || "";
}

export function getMetaAppSecret() {
  return process.env.META_APP_SECRET || "";
}

export function getMetaConfigId() {
  return process.env.META_CONFIG_ID || "";
}

/** OAuth redirect URI — MUST match the one registered in the Meta app */
export function getInstagramRedirectUri(reqUrl?: string) {
  const host =
    process.env.NEXT_PUBLIC_APP_URL ||
    (reqUrl ? new URL(reqUrl).origin : "https://earnwithads.in");
  return `${host}/api/auth/instagram/callback`;
}

/* ------------------------------------------------------------------ */
/* CSRF-safe state (HMAC signed with app secret)                        */
/* ------------------------------------------------------------------ */

export async function createOAuthState() {
  const random = crypto.randomUUID().replace(/-/g, "");
  const secret = getMetaAppSecret();
  if (!secret) return `unsigned_${random}`;

  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(random)
  );
  const hex = Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return `${random}.${hex}`;
}

export async function verifyOAuthState(state?: string | null) {
  if (!state) return false;
  const secret = getMetaAppSecret();
  if (!secret) return state.startsWith("unsigned_");

  const [random, hex] = state.split(".");
  if (!random || !hex) return false;

  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(random)
  );
  const expected = Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return expected === hex;
}

/* ------------------------------------------------------------------ */
/* Login URL                                                           */
/* ------------------------------------------------------------------ */

export function getInstagramLoginUrl(state: string, redirectUri: string) {
  const params = new URLSearchParams({
    client_id: getMetaAppId(),
    display_type: "popup",
    response_type: "code",
    redirect_uri: redirectUri,
    config_id: getMetaConfigId(),
    state,
    // extra login params: no password stored, official Meta dialog
    extras: '{"setup":{"channel":"IG_API_ONBOARDING"}}',
  });
  return `${FB_DIALOG}?${params.toString()}`;
}

/* ------------------------------------------------------------------ */
/* Token exchange                                                      */
/* ------------------------------------------------------------------ */

/** Short-lived code -> short-lived user token */
export async function exchangeCodeForToken(code: string, redirectUri: string) {
  const url = `${GRAPH_BASE}/oauth/access_token?${new URLSearchParams({
    client_id: getMetaAppId(),
    client_secret: getMetaAppSecret(),
    redirect_uri: redirectUri,
    code,
  })}`;
  const res = await fetch(url);
  const data = await res.json();
  if (!res.ok || !data.access_token) {
    throw new Error(
      `Meta token exchange failed: ${JSON.stringify(data?.error || data)}`
    );
  }
  return data.access_token as string;
}

/** Short-lived token -> long-lived token (valid ~60 days) */
export async function exchangeForLongLivedToken(shortToken: string) {
  const url = `${GRAPH_BASE}/oauth/access_token?${new URLSearchParams({
    grant_type: "fb_exchange_token",
    client_id: getMetaAppId(),
    client_secret: getMetaAppSecret(),
    fb_exchange_token: shortToken,
  })}`;
  const res = await fetch(url);
  const data = await res.json();
  if (!res.ok || !data.access_token) {
    throw new Error(
      `Meta long-lived token exchange failed: ${JSON.stringify(data?.error || data)}`
    );
  }
  return data.access_token as string;
}

/* ------------------------------------------------------------------ */
/* Instagram Business Account                                          */
/* ------------------------------------------------------------------ */

export interface InstagramAccountInfo {
  igUserId: string;
  pageId: string;
  pageToken: string;
  username: string;
  name: string;
  followersCount: number;
  profilePicUrl: string;
  biography: string;
}

/** From a user token: pages -> Instagram business account (what user picked in dialog) */
export async function getInstagramBusinessAccount(
  userToken: string
): Promise<InstagramAccountInfo> {
  const url = `${GRAPH_BASE}/me/accounts?${new URLSearchParams({
    fields:
      "id,name,access_token,instagram_business_account{id,username,name,followers_count,profile_pic,biography}",
    access_token: userToken,
  })}`;
  const res = await fetch(url);
  const data = await res.json();

  if (!res.ok) {
    throw new Error(`Meta pages fetch failed: ${JSON.stringify(data?.error || data)}`);
  }

  const pages = data?.data || [];
  for (const page of pages) {
    const ig = page.instagram_business_account;
    if (ig && ig.id) {
      return {
        igUserId: ig.id,
        pageId: page.id,
        pageToken: page.access_token,
        username: ig.username || "",
        name: ig.name || page.name || "",
        followersCount: ig.followers_count || 0,
        profilePicUrl: ig.profile_pic || "",
        biography: ig.biography || "",
      };
    }
  }

  throw new Error(
    "No Instagram business account found on your Facebook pages. " +
      "Convert your Instagram account to a Professional (Business/Creator) account " +
      "and link it to a Facebook Page, then try again."
  );
}

/** Refresh account info (username/followers change over time) */
export async function refreshInstagramInfo(
  pageToken: string,
  igUserId: string
) {
  const url = `${GRAPH_BASE}/${igUserId}?${new URLSearchParams({
    fields: "id,username,name,followers_count,profile_pic,biography",
    access_token: pageToken,
  })}`;
  const res = await fetch(url);
  const data = await res.json();
  if (!res.ok) {
    throw new Error(`IG account fetch failed: ${JSON.stringify(data?.error || data)}`);
  }
  return data;
}

/* ------------------------------------------------------------------ */
/* AutoDM actions                                                      */
/* ------------------------------------------------------------------ */

/**
 * Send a DM to someone who commented on your post.
 * IG Messaging API: recipient = the comment that triggered it.
 * Permission needed: instagram_business_manage_messages
 */
export async function sendCommentDM(
  pageToken: string,
  igUserId: string,
  commentId: string,
  message: string
) {
  const url = `${GRAPH_BASE}/${igUserId}/messages`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      recipient: { comment_id: commentId },
      message: { text: message },
      access_token: pageToken,
    }),
  });
  const data = await res.json();
  if (!res.ok || data?.error) {
    throw new Error(JSON.stringify(data?.error || data));
  }
  return data;
}

/**
 * Reply publicly on a comment.
 * Permission needed: instagram_business_manage_comments
 */
export async function replyToComment(
  pageToken: string,
  commentId: string,
  message: string
) {
  const url = `${GRAPH_BASE}/${commentId}/replies`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message, access_token: pageToken }),
  });
  const data = await res.json();
  if (!res.ok || data?.error) {
    throw new Error(JSON.stringify(data?.error || data));
  }
  return data;
}

/**
 * Subscribe the app to "comments" webhook events for this IG account.
 * Permission needed: instagram_business_manage_comments
 */
export async function subscribeToComments(pageToken: string, igUserId: string) {
  const url = `${GRAPH_BASE}/${igUserId}/subscribed_apps?${new URLSearchParams({
    subscribed_fields: "comments",
    access_token: pageToken,
  })}`;
  const res = await fetch(url, { method: "POST" });
  const data = await res.json();
  // {success: true} on success
  return data;
}

/** Unsubscribe the app (called on disconnect) */
export async function unsubscribeFromComments(
  pageToken: string,
  igUserId: string
) {
  const url = `${GRAPH_BASE}/${igUserId}/subscribed_apps?${new URLSearchParams({
    subscribed_fields: "comments",
    access_token: pageToken,
  })}`;
  const res = await fetch(url, { method: "DELETE" });
  return await res.json();
}
