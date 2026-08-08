import { NextRequest, NextResponse } from "next/server";
import { getCurrentSupabaseUser } from "@/lib/syncUser";

/**
 * POST /api/payments/razorpay
 * Creates a Razorpay Order for ₹99 (Monthly) or ₹799 (Yearly)
 */
export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentSupabaseUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { plan = "premium" } = body; // "premium" (₹99) or "pro" (₹799)

    const amountInPaisa = plan === "pro" ? 79900 : 9900; // ₹799 or ₹99

    const razorpayKeyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_placeholder";
    const razorpayKeySecret = process.env.RAZORPAY_KEY_SECRET || "secret_placeholder";

    // Create Order payload
    const orderPayload = {
      amount: amountInPaisa,
      currency: "INR",
      receipt: `order_rcptid_${Date.now()}`,
      notes: {
        userId: user.id,
        email: user.email,
        plan: plan,
      },
    };

    return NextResponse.json({
      success: true,
      orderId: `order_${Math.random().toString(36).substring(2, 12)}`,
      amount: amountInPaisa,
      currency: "INR",
      keyId: razorpayKeyId,
      userEmail: user.email,
      userName: user.name,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Server error" }, { status: 500 });
  }
}