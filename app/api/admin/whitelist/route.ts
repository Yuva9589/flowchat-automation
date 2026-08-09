import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { createServerSupabaseClient } from "@/lib/supabase";
import {
  getAllAdminCredentials,
  addNewAdminAccount,
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
      isSuper: a.isSuper || false,
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
    const { success, token } = await addNewAdminAccount(
      cleanEmail,
      password,
      autoVerify
    );

    if (!success) {
      return NextResponse.json({ error: "Failed to add Admin account" }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: `✓ Admin Gmail ${cleanEmail} added to Whitelist!`,
      email: cleanEmail,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Server error" }, { status: 500 });
  }
}

/**
 * DELETE /api/admin/whitelist
 * Removes / Revokes an Admin Gmail from the Whitelist
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
        { error: "Cannot delete Master Super Admin account" },
        { status: 403 }
      );
    }

    const supabase = createServerSupabaseClient();

    // Delete from admin whitelist records
    await supabase
      .from("payments")
      .delete()
      .eq("email", cleanEmail)
      .in("plan", ["admin_whitelisted_account", "admin_whitelisted_email"]);

    return NextResponse.json({
      success: true,
      message: `✓ Admin authority for ${cleanEmail} removed successfully!`,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Server error" }, { status: 500 });
  }
}