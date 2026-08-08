import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { createServerSupabaseClient } from "@/lib/supabase";

const ADMIN_EMAILS = [
  "ashishkushwaha1822@gmail.com",
  process.env.ADMIN_EMAIL?.toLowerCase().trim() || "",
].filter(Boolean);

/**
 * GET /api/admin/payments
 * Fetches all payment transactions
 */
export async function GET(req: NextRequest) {
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

    const supabase = createServerSupabaseClient();

    const { data: payments, error } = await supabase
      .from("payments")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      return NextResponse.json({ payments: [] });
    }

    return NextResponse.json({ payments: payments || [] });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Server error" }, { status: 500 });
  }
}

/**
 * POST /api/admin/payments
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
    const { userId, amount, plan, paymentMethod = "UPI AutoPay", status = "Success" } = body;

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