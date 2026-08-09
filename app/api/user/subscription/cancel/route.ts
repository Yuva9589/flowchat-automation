import { NextRequest, NextResponse } from "next/server";
import { getCurrentSupabaseUser } from "@/lib/syncUser";
import { createServerSupabaseClient } from "@/lib/supabase";

/**
 * POST /api/user/subscription/cancel
 * Cancels / Stops the user's active subscription
 */
export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentSupabaseUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const supabase = createServerSupabaseClient();

    // 1. Update user plan to expired/cancelled in Supabase DB
    const { data: updatedUser, error } = await supabase
      .from("users")
      .update({
        plan: "free_trial",
        custom_access_granted: false,
        plan_expires_at: new Date().toISOString(), // Immediately expires or stops renewal
      })
      .eq("id", user.id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // 2. Log cancellation event in payments table
    try {
      await supabase.from("payments").insert([
        {
          user_id: user.id,
          email: user.email,
          amount: 0,
          plan: "Subscription Cancelled",
          payment_method: "User Requested Cancellation",
          status: "Cancelled",
          created_at: new Date().toISOString(),
        },
      ]);
    } catch (e) {
      // Optional fallback
    }

    return NextResponse.json({
      success: true,
      message: "Your subscription has been stopped and cancelled successfully.",
      user: updatedUser,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Server error" }, { status: 500 });
  }
}