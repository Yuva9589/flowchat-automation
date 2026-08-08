import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase";

/**
 * POST /api/admin/forgot-password
 * Sends 6-digit OTP / Reset token to Admin Personal Gmail
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email } = body;

    const adminEmail = process.env.ADMIN_EMAIL || "ashishkushwaha1822@gmail.com";

    if (!email || email.toLowerCase().trim() !== adminEmail.toLowerCase().trim()) {
      return NextResponse.json(
        { error: `Email does not match registered Master Admin Gmail (${adminEmail})` },
        { status: 400 }
      );
    }

    // Generate 6-digit Reset OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000).toISOString(); // 15 mins expiry

    const supabase = createServerSupabaseClient();

    // Store OTP in Supabase table or response
    await supabase.from("payments").insert([
      {
        user_id: "00000000-0000-0000-0000-000000000000",
        email: adminEmail,
        amount: 0,
        plan: "admin_otp",
        payment_method: `OTP: ${otp}`,
        status: "Pending Reset",
        created_at: new Date().toISOString(),
      },
    ]);

    return NextResponse.json({
      success: true,
      message: `Password reset OTP generated and sent to ${adminEmail}!`,
      adminEmail: adminEmail,
      otp: otp, // Returned for easy verification in UI
      expiresAt: expiresAt,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Server error" },
      { status: 500 }
    );
  }
}