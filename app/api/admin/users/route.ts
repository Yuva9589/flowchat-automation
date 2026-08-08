import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase";
import { getCurrentSupabaseUser } from "@/lib/syncUser";

/**
 * GET /api/admin/users
 * Returns list of all registered users with their subscription status & stats
 */
export async function GET(req: NextRequest) {
  try {
    const currentUser = await getCurrentSupabaseUser();
    if (!currentUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const supabase = createServerSupabaseClient();

    // Fetch all users
    const { data: users, error: usersError } = await supabase
      .from("users")
      .select("*")
      .order("created_at", { ascending: false });

    if (usersError) {
      console.error("Error fetching users:", usersError);
      return NextResponse.json({ error: usersError.message }, { status: 500 });
    }

    // Fetch all automations to compute user stats
    const { data: automations } = await supabase.from("automations").select("*");

    const automationsByUser: Record<string, { count: number; dmsSent: number }> = {};

    (automations || []).forEach((auto: any) => {
      const uid = auto.user_id;
      if (!automationsByUser[uid]) {
        automationsByUser[uid] = { count: 0, dmsSent: 0 };
      }
      automationsByUser[uid].count += 1;
      automationsByUser[uid].dmsSent += auto.dms_sent || 0;
    });

    // Format users for Admin Dashboard
    const formattedUsers = (users || []).map((u: any) => {
      const stats = automationsByUser[u.id] || { count: 0, dmsSent: 0 };
      const createdAt = u.created_at ? new Date(u.created_at) : new Date();

      // Default plan calculations if not set in DB
      const plan = u.plan || (u.custom_access_granted ? "custom_free" : "free_trial");
      
      // Calculate trial / plan expiry date (default 7 days trial from signup if no plan_expires_at)
      const defaultTrialExpiry = new Date(createdAt.getTime() + 7 * 24 * 60 * 60 * 1000);
      const expiresAt = u.plan_expires_at
        ? new Date(u.plan_expires_at)
        : defaultTrialExpiry;

      const isExpired = new Date() > expiresAt && plan !== "custom_free";

      return {
        id: u.id,
        clerkUserId: u.clerk_user_id,
        email: u.email || "No email",
        name: u.name || "User",
        avatarUrl: u.avatar_url,
        createdAt: u.created_at,
        plan: plan,
        subscriptionMonths: u.subscription_months || (plan === "pro" ? 12 : 1),
        customAccessGranted: u.custom_access_granted || false,
        expiresAt: expiresAt.toISOString(),
        isExpired: isExpired,
        automationsCount: stats.count,
        totalDmsSent: stats.dmsSent,
      };
    });

    return NextResponse.json({ users: formattedUsers });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Server error" }, { status: 500 });
  }
}