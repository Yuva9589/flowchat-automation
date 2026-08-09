import { NextRequest, NextResponse } from "next/server";
import {
  getAllAdminCredentials,
  addNewAdminAccount,
} from "@/lib/adminWhitelist";

/**
 * GET /api/admin/whitelist
 * Returns all Whitelisted Admin Gmail accounts
 */
export async function GET() {
  try {
    const admins = await getAllAdminCredentials();
    const formattedAdmins = admins.map((a) => ({
      email: a.email,
      password: a.password || "••••••••",
      status: a.status,
      token: a.token || "",
      isSuper: a.isSuper || false,
    }));

    return NextResponse.json({ admins: formattedAdmins });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Server error" }, { status: 500 });
  }
}

/**
 * POST /api/admin/whitelist
 * Adds a new Admin Gmail + Custom Password + Verification Link
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password = "FlowchatAdmin2026!", autoVerify = true } = body;

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Invalid Gmail address" }, { status: 400 });
    }

    if (!password || password.length < 6) {
      return NextResponse.json(
        { error: "Custom password must be at least 6 characters" },
        { status: 400 }
      );
    }

    const cleanEmail = email.toLowerCase().trim();
    const { success, token } = await addNewAdminAccount(
      cleanEmail,
      password,
      autoVerify
    );

    if (!success) {
      return NextResponse.json({ error: "Failed to add Admin account" }, { status: 500 });
    }

    const verificationLink = `https://earnwithads.in/admin/verify?token=${token}&email=${encodeURIComponent(
      cleanEmail
    )}`;

    return NextResponse.json({
      success: true,
      message: autoVerify
        ? `✓ Admin Gmail ${cleanEmail} verified with custom password!`
        : `Admin Gmail added! Verification link generated for ${cleanEmail}.`,
      verificationLink: verificationLink,
      token: token,
      email: cleanEmail,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Server error" }, { status: 500 });
  }
}