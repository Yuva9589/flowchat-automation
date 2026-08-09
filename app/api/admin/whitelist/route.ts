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
      isSuper: a.email.toLowerCase().trim() === PROTECTED_SUPER_ADMIN,
    }));

    return NextResponse.json({ admins: formattedAdmins });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Server error" }, { status: 500 });
  }
}

/**
 * POST /api/admin/whitelist
 * Adds a new Admin Gmail to Whitelist in Supabase DB
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

    // Get admin user_id if available
    const supabase = createServerSupabaseClient();
    const { data: dbAdminUser } = await supabase
      .from("users")
      .select("id")
      .eq("clerk_user_id", clerkUser.id)
      .single();

    const currentAdminUserId = dbAdminUser?.id;

    const { success, token, error: addErr } = await addNewAdminAccount(
      cleanEmail,
      password,
      autoVerify,
      currentAdminUserId
    );

    if (!success) {
      return NextResponse.json(
        { error: addErr || "Failed to insert Admin record into Supabase DB" },
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
 * Permanently removes an Admin Gmail from Supabase DB Whitelist
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

    const supabase = createServerSupabaseClient();

    // Reset user plan in users table
    await supabase
      .from("users")
      .update({ plan: "free_trial", custom_access_granted: false })
      .eq("email", cleanEmail);

    // Delete from Supabase DB payments/whitelist table
    await supabase.from("payments").delete().eq("email", cleanEmail);

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