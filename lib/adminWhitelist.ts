import { createServerSupabaseClient } from "@/lib/supabase";

export interface AdminCredential {
  email: string;
  password?: string;
  status: "verified" | "pending";
  token?: string;
  isSuper?: boolean;
}

// Master Super Admin Owner
export const DEFAULT_SUPER_ADMINS: AdminCredential[] = [
  {
    email: "ashishkushwaha1822@gmail.com",
    password: "FlowchatAdmin2026!",
    status: "verified",
    isSuper: true,
  },
];

export const DEFAULT_SUPER_ADMIN_EMAILS = DEFAULT_SUPER_ADMINS.map((a) => a.email);

/**
 * Gets all Whitelisted Admin credentials from Supabase DB + Master Defaults
 */
export async function getAllAdminCredentials(): Promise<AdminCredential[]> {
  const adminsMap = new Map<string, AdminCredential>();

  // Add Master Owner Super Admin
  DEFAULT_SUPER_ADMINS.forEach((adm) => {
    adminsMap.set(adm.email.toLowerCase().trim(), adm);
  });

  try {
    const supabase = createServerSupabaseClient();

    // Query 1: Check users table for users with custom admin plan
    const { data: dbUsers } = await supabase
      .from("users")
      .select("*")
      .eq("plan", "admin_whitelisted");

    if (dbUsers && dbUsers.length > 0) {
      dbUsers.forEach((u: any) => {
        if (u.email) {
          const cleanEmail = u.email.toLowerCase().trim();
          adminsMap.set(cleanEmail, {
            email: cleanEmail,
            password: "FlowchatAdmin2026!",
            status: "verified",
            isSuper: cleanEmail === "ashishkushwaha1822@gmail.com",
          });
        }
      });
    }

    // Query 2: Check payments table for admin whitelisted records
    const { data: records, error } = await supabase
      .from("payments")
      .select("*")
      .in("plan", ["admin_whitelisted_account", "admin_whitelisted_email"]);

    if (error) {
      console.error("Error fetching whitelist records from DB:", error);
    }

    if (records && records.length > 0) {
      records.forEach((r: any) => {
        if (r.email) {
          const cleanEmail = r.email.toLowerCase().trim();
          let password = "FlowchatAdmin2026!";
          let token = "";

          if (r.payment_method) {
            const passMatch = r.payment_method.match(/Pass:\s*([^|]+)/);
            if (passMatch) password = passMatch[1].trim();

            const tokenMatch = r.payment_method.match(/Token:\s*(.+)/);
            if (tokenMatch) token = tokenMatch[1].trim();
          }

          adminsMap.set(cleanEmail, {
            email: cleanEmail,
            password: password,
            status: r.status === "verified" ? "verified" : "pending",
            token: token,
            isSuper: cleanEmail === "ashishkushwaha1822@gmail.com",
          });
        }
      });
    }
  } catch (err) {
    console.error("Error in getAllAdminCredentials:", err);
  }

  return Array.from(adminsMap.values());
}

/**
 * Helper to get list of verified Whitelisted Admin Emails
 */
export async function getWhitelistedAdminEmails(): Promise<string[]> {
  const allAdmins = await getAllAdminCredentials();
  return allAdmins
    .filter((a) => a.status === "verified")
    .map((a) => a.email.toLowerCase().trim());
}

/**
 * Adds a new Admin Gmail + Custom Password to Whitelist in Supabase DB
 */
export async function addNewAdminAccount(
  email: string,
  password = "FlowchatAdmin2026!",
  verified = true,
  currentAdminUserId?: string
): Promise<{ success: boolean; token: string; error?: string }> {
  const cleanEmail = email.toLowerCase().trim();
  const token = `verify_admin_${Math.random().toString(36).substring(2, 15)}_${Date.now()}`;
  const methodString = `Pass: ${password} | Token: ${token}`;

  try {
    const supabase = createServerSupabaseClient();

    // Find if user already exists in `users` table
    const { data: existingUsers } = await supabase
      .from("users")
      .select("id")
      .eq("email", cleanEmail)
      .limit(1);

    const targetUserId =
      existingUsers && existingUsers.length > 0
        ? existingUsers[0].id
        : currentAdminUserId || null;

    // 1. If user exists in users table, update plan to 'admin_whitelisted'
    if (existingUsers && existingUsers.length > 0) {
      await supabase
        .from("users")
        .update({
          plan: "admin_whitelisted",
          custom_access_granted: true,
        })
        .eq("id", existingUsers[0].id);
    }

    // 2. Remove old whitelist payment records for this email
    await supabase
      .from("payments")
      .delete()
      .eq("email", cleanEmail)
      .in("plan", ["admin_whitelisted_account", "admin_whitelisted_email"]);

    // 3. Insert whitelist record in payments table
    const insertPayload: any = {
      email: cleanEmail,
      amount: 0,
      plan: "admin_whitelisted_account",
      payment_method: methodString,
      status: verified ? "verified" : "pending",
      created_at: new Date().toISOString(),
    };

    if (targetUserId) {
      insertPayload.user_id = targetUserId;
    }

    const { error: insertErr } = await supabase
      .from("payments")
      .insert([insertPayload]);

    if (insertErr) {
      console.error("Error inserting admin record in Supabase:", insertErr);

      // Try inserting without user_id if foreign key fails
      delete insertPayload.user_id;
      const { error: retryErr } = await supabase
        .from("payments")
        .insert([insertPayload]);

      if (retryErr) {
        console.error("Retry insert error:", retryErr);
        return { success: false, token: "", error: retryErr.message };
      }
    }

    return { success: true, token };
  } catch (err: any) {
    console.error("Error adding new admin account:", err);
    return { success: false, token: "", error: err.message };
  }
}

export const addAdminEmailToWhitelist = addNewAdminAccount;

/**
 * Verifies pending admin token
 */
export async function verifyAdminAccountToken(token: string): Promise<boolean> {
  try {
    const supabase = createServerSupabaseClient();
    const { data, error } = await supabase
      .from("payments")
      .update({ status: "verified" })
      .eq("plan", "admin_whitelisted_account")
      .like("payment_method", `%Token: ${token}%`)
      .select();

    return !error && data && data.length > 0;
  } catch (err) {
    console.error("Error verifying admin token:", err);
    return false;
  }
}

export const verifyAdminEmailToken = verifyAdminAccountToken;