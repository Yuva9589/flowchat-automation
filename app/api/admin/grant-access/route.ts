import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { createServerSupabaseClient } from "@/lib/supabase";

const ADMIN_EMAILS = [
  "ashishkushwaha1822@gmail.com",
  process.env.ADMIN_EMAIL?.toLowerCase().trim() || "",
].filter(Boolean);

/**
 * POST /api/admin/grant-access
 * Grants free access, upgrades plan, or revokes access
 * Protected: Master Admin Only
 */
export async function POST(req: NextRequest) {
  try {
    const clerkUser = await currentUser();
    if (!clerkUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userEmail = clerkUser.emailAddresses[0]?.emailAddress?.toLowerCase().trim();
    const isAdmin = ADMIN_EMAILS.some((email) => email === userEmail);

    if (!isAdmin) {
      return NextResponse.json(
        { error: "Forbidden: Master Admin Access Only" },
        { status: 403 }
      );
    }

    const body = await req.json();
    const {
      targetUserId,
      plan = "custom_free",
      durationMonths = 12,
      isLifetime = false,
      revoke = false,
    } = body;

    if (!targetUserId) {
      return NextResponse.json({ error: "Missing targetUserId" }, { status: 400 });
    }

    const supabase = createServerSupabaseClient();

    let updateData: any = {};

    if (revoke) {
      updateData = {
        plan: "free_trial",
        custom_access_granted: false,
        subscription_months: 0,
        plan_expires_at: new Date().toISOString(),
      };
    } else {
      const now = new Date();
      let expiresAt: Date;

      if (isLifetime) {
        expiresAt = new Date(now.getFullYear() + 50, now.getMonth(), now.getDate());
      } else {
        expiresAt = new Date(now.setMonth(now.getMonth() + Number(durationMonths)));
      }

      updateData = {
        plan: plan,
        custom_access_granted: true,
        subscription_months: isLifetime ? 999 : Number(durationMonths),
        plan_expires_at: expiresAt.toISOString(),
      };

      // Record transaction
      await supabase.from("payments").insert([
        {
          user_id: targetUserId,
          amount: 0,
          plan: plan,
          payment_method: isLifetime ? "Admin Grant (Lifetime)" : `Admin Grant (${durationMonths} Months)`,
          status: "Free Grant",
          created_at: new Date().toISOString(),
        },
      ]);
    }

    const { data: updatedUser, error } = await supabase
      .from("users")
      .update(updateData)
      .eq("id", targetUserId)
      .select()
      .single();

    if (error) {
      console.error("Error updating user access:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      message: revoke ? "Access revoked successfully" : "Custom free access granted successfully!",
      user: updatedUser,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Server error" }, { status: 500 });
  }
}