import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { createServerSupabaseClient } from "@/lib/supabase";
import {
  getWhitelistedAdminEmails,
  addAdminEmailToWhitelist,
  DEFAULT_SUPER_ADMIN_EMAILS,
} from "@/lib/adminWhitelist";

/**
 * GET /api/admin/whitelist
 * Returns all Whitelisted Admin Gmails with verification statuses
 */
export async function GET(req: NextRequest) {
  try {
    const clerkUser = await currentUser();
    if (!clerkUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userEmail = clerkUser.emailAddresses[0]?.emailAddress?.toLowerCase().trim();
    const authorizedEmails = await getWhitelistedAdminEmails();

    if (!authorizedEmails.includes(userEmail)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const supabase = createServerSupabaseClient();
    const { data: dbRecords } = await supabase
      .from("payments")
      .select("*")
      .eq("plan", "admin_whitelisted_email");

    const adminsMap = new Map<string, { email: string; status: string; token: string; isSuper: boolean }>();

    // Add Default Super Admins
    DEFAULT_SUPER_ADMIN_EMAILS.forEach((email) => {
      adminsMap.set(email.toLowerCase(), {
        email: email.toLowerCase(),
        status: "verified",
        token: "super_admin",
        isSuper: true,
      });
    });

    // Add DB Whitelisted Admins
    (dbRecords || []).forEach((r: any) => {
      if (r.email) {
        adminsMap.set(r.email.toLowerCase(), {
          email: r.email.toLowerCase(),
          status: r.status || "pending",
          token: r.payment_method || "",
          isSuper: DEFAULT_SUPER_ADMIN_EMAILS.includes(r.email.toLowerCase()),
        });
      }
    });

    return NextResponse.json({ admins: Array.from(adminsMap.values()) });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Server error" }, { status: 500 });
  }
}

/**
 * POST /api/admin/whitelist
 * Adds a new Admin Gmail and generates a Verification Link
 */
export async function POST(req: NextRequest) {
  try {
    const clerkUser = await currentUser();
    if (!clerkUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userEmail = clerkUser.emailAddresses[0]?.emailAddress?.toLowerCase().trim();
    const authorizedEmails = await getWhitelistedAdminEmails();

    if (!authorizedEmails.includes(userEmail)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await req.json();
    const { email, autoVerify = false } = body;

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Invalid Gmail address" }, { status: 400 });
    }

    const cleanEmail = email.toLowerCase().trim();
    const { success, token } = await addAdminEmailToWhitelist(cleanEmail, autoVerify);

    if (!success) {
      return NextResponse.json({ error: "Failed to add Admin Gmail" }, { status: 500 });
    }

    const verificationLink = `https://earnwithads.in/admin/verify?token=${token}&email=${encodeURIComponent(
      cleanEmail
    )}`;

    return NextResponse.json({
      success: true,
      message: autoVerify
        ? `Gmail ${cleanEmail} verified and granted Admin Access!`
        : `Admin Gmail added! Verification link generated for ${cleanEmail}.`,
      verificationLink: verificationLink,
      token: token,
      email: cleanEmail,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Server error" }, { status: 500 });
  }
}