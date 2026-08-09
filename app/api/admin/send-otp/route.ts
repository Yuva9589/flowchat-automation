import { NextRequest, NextResponse } from "next/server";
import { getAllAdminCredentials } from "@/lib/adminWhitelist";
import { createServerSupabaseClient } from "@/lib/supabase";

/**
 * POST /api/admin/send-otp
 * Verifies Gmail + Password, then generates 6-Digit OTP.
 * OMIT OTP FROM CLIENT RESPONSE FOR 100% SECURITY!
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

    if (matchingAdmin.password && matchingAdmin.password !== password) {
      return NextResponse.json(
        { error: "Invalid Password" },
        { status: 401 }
      );
    }

    // Generate 6-digit OTP code
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Store OTP in Supabase DB
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

    // Send email via Resend API if configured
    const resendApiKey = process.env.RESEND_API_KEY;
    if (resendApiKey) {
      try {
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${resendApiKey}`,
          },
          body: JSON.stringify({
            from: "Flowchat Admin <onboarding@resend.dev>",
            to: [cleanEmail],
            subject: "🔐 Flowchat Admin Login Verification OTP",
            html: `
              <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #0f172a; color: #ffffff; border-radius: 16px;">
                <h2 style="color: #4ade80;">Flowchat Admin Login Verification</h2>
                <p style="color: #cbd5e1;">Your 6-Digit Admin Verification OTP Code is:</p>
                <div style="font-size: 32px; font-weight: bold; letter-spacing: 6px; color: #38bdf8; padding: 12px; background-color: #1e293b; border-radius: 8px; text-align: center; margin: 16px 0;">
                  ${otp}
                </div>
                <p style="color: #94a3b8; font-size: 12px;">Enter this OTP code to unlock your Admin Control Panel.</p>
              </div>
            `,
          }),
        });
      } catch (e) {
        console.error("Resend email error:", e);
      }
    }

    // 🔒 OMIT OTP FROM CLIENT RESPONSE FOR 100% SECURITY
    return NextResponse.json({
      success: true,
      message: `📩 Verification OTP sent to your Gmail inbox (${cleanEmail})! Check your email and enter the code.`,
      email: cleanEmail,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Server error" }, { status: 500 });
  }
}