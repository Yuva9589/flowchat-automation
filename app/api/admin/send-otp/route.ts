import { NextRequest, NextResponse } from "next/server";
import { getAllAdminCredentials } from "@/lib/adminWhitelist";
import { createServerSupabaseClient } from "@/lib/supabase";

/**
 * POST /api/admin/send-otp
 * Verifies Gmail + Password, then generates 6-Digit Verification OTP
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Gmail address and Password are required" },
        { status: 400 }
      );
    }

    const cleanEmail = email.toLowerCase().trim();
    const allAdmins = await getAllAdminCredentials();

    const matchingAdmin = allAdmins.find(
      (adm) => adm.email === cleanEmail && adm.status === "verified"
    );

    if (!matchingAdmin) {
      return NextResponse.json(
        { error: "Invalid Admin Gmail or account is not verified yet" },
        { status: 401 }
      );
    }

    // Verify Password
    if (matchingAdmin.password && matchingAdmin.password !== password) {
      return NextResponse.json(
        { error: "Invalid Password" },
        { status: 401 }
      );
    }

    // Generate 6-digit OTP code
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Store OTP temporarily in Supabase DB
    const supabase = createServerSupabaseClient();
    await supabase.from("payments").insert([
      {
        user_id: "00000000-0000-0000-0000-000000000000",
        email: cleanEmail,
        amount: 0,
        plan: "admin_login_otp",
        payment_method: `OTP: ${otp}`,
        status: "Pending Verification",
        created_at: new Date().toISOString(),
      },
    ]);

    return NextResponse.json({
      success: true,
      message: `Gmail & Password Verified! 6-Digit OTP Code generated for ${cleanEmail}.`,
      otp: otp,
      email: cleanEmail,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Server error" }, { status: 500 });
  }
}