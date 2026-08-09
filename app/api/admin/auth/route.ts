import { NextRequest, NextResponse } from "next/server";
import { getAllAdminCredentials } from "@/lib/adminWhitelist";
import { createServerSupabaseClient } from "@/lib/supabase";

/**
 * POST /api/admin/auth
 * Verifies 3-Factors: Gmail + Password + 6-Digit OTP Code
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password, otp } = body;

    if (!email || !password || !otp) {
      return NextResponse.json(
        { error: "Gmail, Password, and 6-Digit OTP are all required" },
        { status: 400 }
      );
    }

    const cleanEmail = email.toLowerCase().trim();
    const allAdmins = await getAllAdminCredentials();

    const matchingAdmin = allAdmins.find(
      (adm) => adm.email === cleanEmail && adm.status === "verified"
    );

    if (!matchingAdmin || matchingAdmin.password !== password) {
      return NextResponse.json(
        { error: "Invalid Admin Gmail or Password" },
        { status: 401 }
      );
    }

    // Verify OTP from Supabase DB
    const supabase = createServerSupabaseClient();
    const { data: otpRecords } = await supabase
      .from("payments")
      .select("*")
      .eq("email", cleanEmail)
      .eq("plan", "admin_login_otp")
      .order("created_at", { ascending: false })
      .limit(1);

    const latestOtp = otpRecords && otpRecords.length > 0 ? otpRecords[0] : null;

    if (!latestOtp || !latestOtp.payment_method.includes(otp.trim())) {
      return NextResponse.json(
        { error: "Invalid or expired 6-Digit OTP Code" },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      token: "flowchat_admin_authenticated_session_2026",
      message: "3-Factor Master Admin Login Successful!",
      adminEmail: cleanEmail,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Server error" },
      { status: 500 }
    );
  }
}