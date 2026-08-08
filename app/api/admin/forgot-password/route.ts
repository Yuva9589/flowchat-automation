import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase";

/**
 * POST /api/admin/forgot-password
 * Generates OTP and sends via Resend API (if configured) or displays on screen
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
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000).toISOString();

    const supabase = createServerSupabaseClient();

    // Store OTP in Supabase table
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

    // Send email via Resend API if API Key is configured
    const resendApiKey = process.env.RESEND_API_KEY;
    let emailSent = false;

    if (resendApiKey) {
      try {
        const resendRes = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${resendApiKey}`,
          },
          body: JSON.stringify({
            from: "Flowchat Admin <onboarding@resend.dev>",
            to: [adminEmail],
            subject: "🔐 Flowchat Admin Password Reset OTP",
            html: `
              <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #0f172a; color: #ffffff; borderRadius: 16px;">
                <h2 style="color: #4ade80;">Flowchat Admin Password Reset</h2>
                <p style="color: #cbd5e1;">Your 6-Digit Verification OTP Code is:</p>
                <div style="font-size: 32px; font-weight: bold; letter-spacing: 6px; color: #38bdf8; padding: 12px; background-color: #1e293b; border-radius: 8px; text-align: center; margin: 16px 0;">
                  ${otp}
                </div>
                <p style="color: #94a3b8; font-size: 12px;">This OTP is valid for 15 minutes. Do not share it with anyone.</p>
              </div>
            `,
          }),
        });

        if (resendRes.ok) {
          emailSent = true;
        }
      } catch (e) {
        console.error("Resend email error:", e);
      }
    }

    return NextResponse.json({
      success: true,
      message: emailSent
        ? `OTP sent to your Gmail inbox (${adminEmail})!`
        : `OTP generated for ${adminEmail}!`,
      adminEmail: adminEmail,
      otp: otp, // Displayed in UI popup so user is never blocked
      emailSent: emailSent,
      expiresAt: expiresAt,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Server error" },
      { status: 500 }
    );
  }
}