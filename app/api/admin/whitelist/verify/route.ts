import { NextRequest, NextResponse } from "next/server";
import { verifyAdminEmailToken } from "@/lib/adminWhitelist";

/**
 * POST /api/admin/whitelist/verify
 * Verifies an Admin Gmail token when verification link is clicked
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { token } = body;

    if (!token) {
      return NextResponse.json({ error: "Missing token" }, { status: 400 });
    }

    const verified = await verifyAdminEmailToken(token);

    if (!verified) {
      return NextResponse.json(
        { error: "Invalid or expired verification link" },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Admin Gmail verified and activated successfully!",
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Server error" },
      { status: 500 }
    );
  }
}