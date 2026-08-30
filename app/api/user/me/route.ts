import { NextResponse } from "next/server";
import { getCurrentSupabaseUser } from "@/lib/syncUser";

/**
 * GET /api/user/me — current user + plan/trial info (for dashboard UI)
 */
export async function GET() {
  const user = await getCurrentSupabaseUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const createdAt = user.created_at ? new Date(user.created_at) : new Date();
  const defaultTrialExpiry = new Date(createdAt.getTime() + 7 * 24 * 60 * 60 * 1000);
  const expiresAt = user.plan_expires_at
    ? new Date(user.plan_expires_at)
    : defaultTrialExpiry;
  const plan = user.plan || (user.custom_access_granted ? "custom_free" : "free_trial");
  const daysRemaining = Math.ceil((expiresAt.getTime() - Date.now()) / 86400000);
  const isExpired = new Date() > expiresAt && plan !== "custom_free";

  return NextResponse.json({
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      avatarUrl: user.avatar_url,
      plan,
      customAccessGranted: !!user.custom_access_granted,
      subscriptionMonths: user.subscription_months || 0,
      expiresAt: expiresAt.toISOString(),
      daysRemaining: daysRemaining > 0 ? daysRemaining : 0,
      isExpired,
      createdAt: user.created_at,
    },
  });
}
