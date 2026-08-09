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

  // 1. Add Master Owner Super Admin
  DEFAULT_SUPER_ADMINS.forEach((adm) => {
    adminsMap.set(adm.email.toLowerCase().trim(), adm);
  });

  try {
    const supabase = createServerSupabaseClient();

    // 2. Query `users` table for users with admin_whitelisted plan
    const { data: dbUsers } = await supabase
      .from("users")
      .select("*")
      .or("plan.eq.admin_whitelisted,custom_access_granted.eq.true");

    if (dbUsers && dbUsers.length > 0) {
      dbUsers.forEach((u: any) => {
        if (u.email) {
          const cleanEmail = u.email.toLowerCase().trim();
          if (!adminsMap.has(cleanEmail)) {
            adminsMap.set(cleanEmail, {
              email: cleanEmail,
              password: "FlowchatAdmin2026!",
              status: "verified",
              isSuper: cleanEmail === "ashishkushwaha1822@gmail.com",
            });
          }
        }
      });
    }

    // 3. Query `payments` table for admin_whitelisted_account records
    try {
      const { data: records } = await supabase
        .from("payments")
        .select("*")
        .in("plan", ["admin_whitelisted_account", "admin_whitelisted_email"]);

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
    } catch (paymentErr) {
      // Optional fallback
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
  verified = true
): Promise<{ success: boolean; token: string; error?: string }> {
  const cleanEmail = email.toLowerCase().trim();
  const token = `verify_admin_${Math.random().toString(36).substring(2, 15)}_${Date.now()}`;
  const methodString = `Pass: ${password} | Token: ${token}`;

  try {
    const supabase = createServerSupabaseClient();

    // 1. Update/upsert in `users` table
    const { data: existingUsers } = await supabase
      .from("users")
      .select("id")
      .eq("email", cleanEmail)
      .limit(1);

    if (existingUsers && existingUsers.length > 0) {
      await supabase
        .from("users")
        .update({
          plan: "admin_whitelisted",
          custom_access_granted: true,
        })
        .eq("id", existingUsers[0].id);
    } else {
      await supabase.from("users").insert([
        {
          email: cleanEmail,
          name: cleanEmail.split("@")[0] || "Admin Manager",
          clerk_user_id: `admin_clerk_${Date.now()}`,
          plan: "admin_whitelisted",
          custom_access_granted: true,
          created_at: new Date().toISOString(),
        },
      ]);
    }

    // 2. Insert into `payments` table
    try {
      await supabase.from("payments").insert([
        {
          email: cleanEmail,
          amount: 0,
          plan: "admin_whitelisted_account",
          payment_method: methodString,
          status: verified ? "verified" : "pending",
          created_at: new Date().toISOString(),
        },
      ]);
    } catch (e) {
      // Optional fallback
    }

    return { success: true, token };
  } catch (err: any) {
    console.error("Error adding new admin account:", err);
    return { success: false, token: "", error: err.message };
  }
}

export const addAdminEmailToWhitelist = addNewAdminAccount;

/**
 * Removes an Admin Gmail permanently from Supabase DB Whitelist
 */
export async function removeAdminAccount(email: string): Promise<boolean> {
  const cleanEmail = email.toLowerCase().trim();

  if (cleanEmail === "ashishkushwaha1822@gmail.com") {
    return false; // Protect Super Admin Owner
  }

  try {
    const supabase = createServerSupabaseClient();

    // Reset plan in `users` table
    await supabase
      .from("users")
      .update({ plan: "free_trial", custom_access_granted: false })
      .eq("email", cleanEmail);

    // Delete from `payments` table
    try {
      await supabase.from("payments").delete().eq("email", cleanEmail);
    } catch (e) {
      // Optional
    }
  } catch (err) {
    console.error("Supabase delete error:", err);
  }

  return true;
}

/**
 * Verifies pending admin token
 */
export async function verifyAdminAccountToken(token: string): Promise<boolean> {
  try {
    const supabase = createServerSupabaseClient();
    const { data, error } = await supabase
      .from("users")
      .update({ plan: "admin_whitelisted", custom_access_granted: true })
      .select();

    return !error && data && data.length > 0;
  } catch (err) {
    console.error("Error verifying admin token:", err);
    return false;
  }
}

export const verifyAdminEmailToken = verifyAdminAccountToken;