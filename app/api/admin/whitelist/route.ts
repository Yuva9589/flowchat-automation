import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import {
  getAllAdminCredentials,
  addNewAdminAccount,
  removeAdminAccount,
} from "@/lib/adminWhitelist";

const PROTECTED_SUPER_ADMIN = "ashishkushwaha1822@gmail.com";

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
      isSuper: a.email.toLowerCase().trim() === PROTECTED_SUPER_ADMIN,
    }));

    return NextResponse.json({ admins: formattedAdmins });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Server error" }, { status: 500 });
  }
}

/**
 * POST /api/admin/whitelist
 * Adds a new Admin Gmail to Whitelist
 */
export async function POST(req: NextRequest) {
  try {
    const clerkUser = await currentUser();
    if (!clerkUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { email, password = "FlowchatAdmin2026!", autoVerify = true } = body;

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Invalid Gmail address" }, { status: 400 });
    }

    const cleanEmail = email.toLowerCase().trim();

    const { success, token, error: addErr } = await addNewAdminAccount(
      cleanEmail,
      password,
      autoVerify
    );

    if (!success) {
      return NextResponse.json(
        { error: addErr || "Failed to add Admin Gmail" },
        { status: 500 }
      );
    }

    const verificationLink = `https://earnwithads.in/admin/verify?token=${token}&email=${encodeURIComponent(
      cleanEmail
    )}`;

    const updatedAdmins = await getAllAdminCredentials();

    return NextResponse.json({
      success: true,
      message: autoVerify
        ? `✓ Admin Gmail ${cleanEmail} verified and granted Full Admin Control!`
        : `Admin Gmail added! Verification link generated for ${cleanEmail}.`,
      verificationLink: verificationLink,
      token: token,
      email: cleanEmail,
      admins: updatedAdmins,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Server error" }, { status: 500 });
  }
}

/**
 * DELETE /api/admin/whitelist
 * Removes an Admin Gmail from Whitelist
 */
export async function DELETE(req: NextRequest) {
  try {
    const clerkUser = await currentUser();
    if (!clerkUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const cleanEmail = email.toLowerCase().trim();

    if (cleanEmail === PROTECTED_SUPER_ADMIN) {
      return NextResponse.json(
        { error: "Cannot delete Master Owner Super Admin account" },
        { status: 403 }
      );
    }

    await removeAdminAccount(cleanEmail);

    const updatedAdmins = await getAllAdminCredentials();

    return NextResponse.json({
      success: true,
      message: `✓ Admin authority for ${cleanEmail} removed permanently!`,
      admins: updatedAdmins,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Server error" }, { status: 500 });
  }
}