import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase";
import { getCurrentSupabaseUser } from "@/lib/syncUser";

/**
 * GET /api/admin/payments
 * Fetches all payment transactions and subscription history
 */
export async function GET(req: NextRequest) {
  try {
    const adminUser = await getCurrentSupabaseUser();
    if (!adminUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const supabase = createServerSupabaseClient();

    const { data: payments, error } = await supabase
      .from("payments")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      // If table doesn't exist yet, return sample empty list
      return NextResponse.json({ payments: [] });
    }

    return NextResponse.json({ payments: payments || [] });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Server error" }, { status: 500 });
  }
}

/**
 * POST /api/admin/payments
 * Manually record a payment or transaction
 */
export async function POST(req: NextRequest) {
  try {
    const adminUser = await getCurrentSupabaseUser();
    if (!adminUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { userId, email, amount, plan, paymentMethod = "UPI AutoPay", status = "Success" } = body;

    const supabase = createServerSupabaseClient();

    const { data: payment, error } = await supabase
      .from("payments")
      .insert([
        {
          user_id: userId,
          amount: Number(amount),
          plan: plan,
          payment_method: paymentMethod,
          status: status,
          created_at: new Date().toISOString(),
        },
      ])
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ payment });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Server error" }, { status: 500 });
  }
}