import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase";

/**
 * POST /api/admin/reset-password
 * Verifies OTP code and sets new custom Admin Password
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, otp, newPassword, newUsername } = body;

    const adminEmail = process.env.ADMIN_EMAIL || "ashishkushwaha1822@gmail.com";

    if (!email || email.toLowerCase().trim() !== adminEmail.toLowerCase().trim()) {
      return NextResponse.json({ error: "Invalid admin email address" }, { status: 400 });
    }

    if (!newPassword || newPassword.length < 6) {
      return NextResponse.json(
        { error: "New password must be at least 6 characters long" },
        { status: 400 }
      );
    }

    const supabase = createServerSupabaseClient();

    // Verify OTP from DB
    const { data: records } = await supabase
      .from("payments")
      .select("*")
      .eq("email", adminEmail)
      .eq("plan", "admin_otp")
      .order("created_at", { ascending: false })
      .limit(1);

    const latestOtpRecord = records && records.length > 0 ? records[0] : null;

    if (!latestOtpRecord || !latestOtpRecord.payment_method.includes(otp)) {
      return NextResponse.json({ error: "Invalid or expired OTP code" }, { status: 400 });
    }

    // Save custom admin credentials in Supabase settings
    await supabase.from("payments").insert([
      {
        user_id: "00000000-0000-0000-0000-000000000000",
        email: adminEmail,
        amount: 0,
        plan: "admin_credentials",
        payment_method: `User: ${newUsername || "admin"} | Pass: ${newPassword}`,
        status: "Updated",
        created_at: new Date().toISOString(),
      },
    ]);

    return NextResponse.json({
      success: true,
      message: "Admin credentials & password reset successfully! You can now login with your new password.",
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Server error" },
      { status: 500 }
    );
  }
}