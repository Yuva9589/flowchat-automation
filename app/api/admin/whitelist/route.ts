import { NextRequest, NextResponse } from "next/server";
import { currentUser, createClerkClient } from "@clerk/nextjs/server";
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
 * Creates Admin Account in Clerk & Whitelists in Supabase DB!
 */
export async function POST(req: NextRequest) {
  try {
    const clerkUser = await currentUser();
    if (!clerkUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { email, password = "FlowchatAdmin2026!" } = body;

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Invalid Gmail address" }, { status: 400 });
    }

    if (!password || password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters" },
        { status: 400 }
      );
    }

    const cleanEmail = email.toLowerCase().trim();

    // 1. Create User in Clerk directly (if secret key available)
    let clerkAccountCreated = false;
    const clerkSecretKey = process.env.CLERK_SECRET_KEY;

    if (clerkSecretKey) {
      try {
        const clerkClient = createClerkClient({ secretKey: clerkSecretKey });
        await clerkClient.users.createUser({
          emailAddress: [cleanEmail],
          password: password,
        });
        clerkAccountCreated = true;
      } catch (clerkErr: any) {
        console.log("Clerk user creation note:", clerkErr?.message || clerkErr);
        // If user already exists in Clerk, that's fine too!
      }
    }

    // 2. Add to Whitelist in Supabase DB
    const { success, token, error: addErr } = await addNewAdminAccount(
      cleanEmail,
      password,
      true
    );

    if (!success) {
      return NextResponse.json(
        { error: addErr || "Failed to add Admin Gmail into Supabase DB" },
        { status: 500 }
      );
    }

    const updatedAdmins = await getAllAdminCredentials();

    return NextResponse.json({
      success: true,
      message: `✓ Admin Account created for ${cleanEmail}! They can now log in with their Password.`,
      email: cleanEmail,
      password: password,
      clerkCreated: clerkAccountCreated,
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

    try {
      await supabase.from("payments").delete().eq("email", cleanEmail);
    } catch (e) {
      // Optional
    }

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