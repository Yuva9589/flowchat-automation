import { NextRequest, NextResponse } from "next/server";

/**
 * POST /api/admin/auth
 * Handles Admin Login via master credentials
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { username, password } = body;

    const adminUsername = process.env.ADMIN_USERNAME || "admin";
    const adminPassword = process.env.ADMIN_PASSWORD || "FlowchatAdmin2026!";

    if (username === adminUsername && password === adminPassword) {
      return NextResponse.json({
        success: true,
        token: "flowchat_admin_authenticated_session_2026",
        message: "Admin authentication successful",
      });
    }

    return NextResponse.json(
      { error: "Invalid admin username or password" },
      { status: 401 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Server error" },
      { status: 500 }
    );
  }
}