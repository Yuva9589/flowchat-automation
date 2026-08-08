import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase";

/**
 * POST /api/admin/auth
 * Authenticates Admin via Username/Personal Gmail & Password
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { username, password } = body;

    const defaultEmail = process.env.ADMIN_EMAIL || "ashishkushwaha1822@gmail.com";
    const defaultUser = process.env.ADMIN_USERNAME || "admin";
    const defaultPass = process.env.ADMIN_PASSWORD || "FlowchatAdmin2026!";

    const inputUser = username?.toLowerCase().trim() || "";

    // 1. Check default hardcoded/env credentials
    let isValid =
      (inputUser === defaultUser.toLowerCase() || inputUser === defaultEmail.toLowerCase()) &&
      password === defaultPass;

    // 2. Check updated custom credentials from Supabase DB
    if (!isValid) {
      try {
        const supabase = createServerSupabaseClient();
        const { data: records } = await supabase
          .from("payments")
          .select("*")
          .eq("plan", "admin_credentials")
          .order("created_at", { ascending: false })
          .limit(1);

        if (records && records.length > 0) {
          const credsStr = records[0].payment_method || "";
          // Format: "User: username | Pass: password"
          if (credsStr.includes(`Pass: ${password}`)) {
            isValid = true;
          }
        }
      } catch (err) {
        console.error("Custom creds check error:", err);
      }
    }

    if (isValid) {
      return NextResponse.json({
        success: true,
        token: "flowchat_admin_authenticated_session_2026",
        message: "Master Admin authentication successful",
        adminEmail: defaultEmail,
      });
    }

    return NextResponse.json(
      { error: "Invalid Admin Username/Gmail or Password" },
      { status: 401 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Server error" },
      { status: 500 }
    );
  }
}