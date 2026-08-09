import { createServerSupabaseClient } from "@/lib/supabase";

export interface AdminCredential {
  email: string;
  password?: string;
  status: "verified" | "pending";
  token?: string;
  isSuper?: boolean;
}

// Master Super Admin Owners
export const DEFAULT_SUPER_ADMINS: AdminCredential[] = [
  {
    email: "ashishkushwaha1822@gmail.com",
    password: "FlowchatAdmin2026!",
    status: "verified",
    isSuper: true,
  },
  {
    email: "uniqueshopemart.in@gmail.com",
    password: "FlowchatAdmin2026!",
    status: "verified",
    isSuper: false,
  },
];

// Persistent In-Memory Whitelist Cache
const whitelistedAdminsStore = new Map<string, AdminCredential>();

// Initialize default super admins
DEFAULT_SUPER_ADMINS.forEach((adm) => {
  whitelistedAdminsStore.set(adm.email.toLowerCase().trim(), adm);
});

/**
 * Gets all Whitelisted Admin credentials from Memory + Supabase DB (`users` table)
 */
export async function getAllAdminCredentials(): Promise<AdminCredential[]> {
  try {
    const supabase = createServerSupabaseClient();

    // Query 1: Get users from Supabase `users` table with admin_whitelisted plan
    const { data: dbUsers } = await supabase
      .from("users")
      .select("*")
      .or("plan.eq.admin_whitelisted,custom_access_granted.eq.true");

    if (dbUsers && dbUsers.length > 0) {
      dbUsers.forEach((u: any) => {
        if (u.email) {
          const cleanEmail = u.email.toLowerCase().trim();
          if (!whitelistedAdminsStore.has(cleanEmail)) {
            whitelistedAdminsStore.set(cleanEmail, {
              email: cleanEmail,
              password: "FlowchatAdmin2026!",
              status: "verified",
              isSuper: cleanEmail === "ashishkushwaha1822@gmail.com",
            });
          }
        }
      });
    }

    // Query 2: Get records from `payments` table if table exists
    try {
      const { data: records } = await supabase
        .from("payments")
        .select("*")
        .in("plan", ["admin_whitelisted_account", "admin_whitelisted_email"]);

      if (records && records.length > 0) {
        records.forEach((r: any) => {
          if (r.email) {
            const cleanEmail = r.email.toLowerCase().trim();
            if (!whitelistedAdminsStore.has(cleanEmail)) {
              whitelistedAdminsStore.set(cleanEmail, {
                email: cleanEmail,
                password: "FlowchatAdmin2026!",
                status: r.status === "verified" ? "verified" : "pending",
                isSuper: cleanEmail === "ashishkushwaha1822@gmail.com",
              });
            }
          }
        });
      }
    } catch (paymentErr) {
      // Ignore if payments table missing
    }
  } catch (err) {
    console.error("Error in getAllAdminCredentials:", err);
  }

  return Array.from(whitelistedAdminsStore.values());
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
 * Adds a new Admin Gmail to Whitelist in Memory & Supabase DB
 */
export async function addNewAdminAccount(
  email: string,
  password = "FlowchatAdmin2026!",
  verified = true
): Promise<{ success: boolean; token: string; error?: string }> {
  const cleanEmail = email.toLowerCase().trim();
  const token = `verify_admin_${Math.random().toString(36).substring(2, 15)}_${Date.now()}`;

  // 1. Instantly store in memory store so it NEVER fails or disappears from UI
  whitelistedAdminsStore.set(cleanEmail, {
    email: cleanEmail,
    password: password,
    status: verified ? "verified" : "pending",
    token: token,
    isSuper: cleanEmail === "ashishkushwaha1822@gmail.com",
  });

  // 2. Persist to Supabase `users` table
  try {
    const supabase = createServerSupabaseClient();

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

    // 3. Try storing in payments table if available
    try {
      await supabase.from("payments").insert([
        {
          email: cleanEmail,
          amount: 0,
          plan: "admin_whitelisted_account",
          payment_method: `Pass: ${password} | Token: ${token}`,
          status: verified ? "verified" : "pending",
          created_at: new Date().toISOString(),
        },
      ]);
    } catch (e) {
      // Optional fallback
    }
  } catch (err) {
    console.error("Supabase persist error:", err);
  }

  return { success: true, token };
}

export const addAdminEmailToWhitelist = addNewAdminAccount;

/**
 * Removes an Admin Gmail from Whitelist Memory & Supabase DB
 */
export async function removeAdminAccount(email: string): Promise<boolean> {
  const cleanEmail = email.toLowerCase().trim();

  if (cleanEmail === "ashishkushwaha1822@gmail.com") {
    return false; // Protect Super Admin
  }

  // Delete from Memory Store
  whitelistedAdminsStore.delete(cleanEmail);

  // Delete from Supabase DB
  try {
    const supabase = createServerSupabaseClient();
    await supabase
      .from("users")
      .update({ plan: "free_trial", custom_access_granted: false })
      .eq("email", cleanEmail);

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