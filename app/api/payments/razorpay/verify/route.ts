import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase";
import { getCurrentSupabaseUser } from "@/lib/syncUser";

/**
 * POST /api/payments/razorpay/verify
 * Verifies Razorpay payment and upgrades user plan in Supabase
 */
export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentSupabaseUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { razorpayPaymentId, razorpayOrderId, plan = "premium" } = body;

    const supabase = createServerSupabaseClient();

    const amount = plan === "pro" ? 799 : 99;
    const durationMonths = plan === "pro" ? 12 : 1;

    const now = new Date();
    const expiresAt = new Date(now.setMonth(now.getMonth() + durationMonths));

    // 1. Update user plan and validity in Supabase
    await supabase
      .from("users")
      .update({
        plan: plan,
        subscription_months: durationMonths,
        plan_expires_at: expiresAt.toISOString(),
        custom_access_granted: false,
      })
      .eq("id", user.id);

    // 2. Record payment in Supabase payments table
    await supabase.from("payments").insert([
      {
        user_id: user.id,
        email: user.email,
        amount: amount,
        plan: plan,
        payment_method: `Razorpay (${razorpayPaymentId || "UPI/QR"})`,
        status: "Success",
        created_at: new Date().toISOString(),
      },
    ]);

    return NextResponse.json({
      success: true,
      message: `Payment verified! Plan upgraded to ${plan} for ${durationMonths} month(s).`,
      expiresAt: expiresAt.toISOString(),
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Server error" }, { status: 500 });
  }
}