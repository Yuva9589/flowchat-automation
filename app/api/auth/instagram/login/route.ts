import { NextRequest, NextResponse } from "next/server";
import {
  createOAuthState,
  getInstagramLoginUrl,
  getInstagramRedirectUri,
  getMetaAppId,
  getMetaConfigId,
} from "@/lib/instagram";

/**
 * GET /api/auth/instagram/login
 * Step 1 of "Connect Instagram" — redirects the user to Meta's official
 * Facebook Login for Business dialog (no password shared with us).
 */
export async function GET(req: NextRequest) {
  const appId = getMetaAppId();
  const configId = getMetaConfigId();

  if (!appId || !configId) {
    return NextResponse.json(
      {
        error:
          "Meta app not configured. Set META_APP_ID and META_CONFIG_ID env vars.",
      },
      { status: 500 }
    );
  }

  const state = await createOAuthState();
  const redirectUri = getInstagramRedirectUri(req.url);
  const loginUrl = getInstagramLoginUrl(state, redirectUri);

  return NextResponse.redirect(loginUrl);
}
