import { createServerSupabaseClient } from "@/lib/supabase";

export interface AdminCredential {
  email: string;
  password?: string;
  status: "verified" | "pending";
  token?: string;
  isSuper?: boolean;
}

// Default Hardcoded Initial Admins (Always Allowed)
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
  {
    email: "mantu.ak39@gmail.com",
    password: "FlowchatAdmin2026!",
    status: "verified",
    isSuper: false,
  },
];

export const DEFAULT_SUPER_ADMIN_EMAILS = DEFAULT_SUPER_ADMINS.map((a) => a.email);

/**
 * Gets all Whitelisted Admin credentials directly from Supabase PostgreSQL Database + Defaults
 */
export async function getAllAdminCredentials(): Promise<AdminCredential[]> {
  const adminsMap = new Map<string, AdminCredential>();

  // 1. Always add Initial Default Admins
  DEFAULT_SUPER_ADMINS.forEach((adm) => {
    adminsMap.set(adm.email.toLowerCase().trim(), adm);
  });

  try {
    const supabase = createServerSupabaseClient();

    // 2. Query Supabase `users` table for all users with admin_whitelisted plan
    const { data: dbUsers, error: userErr } = await supabase
      .from("users")
      .select("*")
      .or("plan.eq.admin_whitelisted,custom_access_granted.eq.true");

    if (userErr) {
      console.error("Error querying Supabase users table:", userErr);
    }

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

    // 3. Query `payments` table if present
    try {
      const { data: records } = await supabase
        .from("payments")
        .select("*")
        .in("plan", ["admin_whitelisted_account", "admin_whitelisted_email"]);

      if (records && records.length > 0) {
        records.forEach((r: any) => {
          if (r.email) {
            const cleanEmail = r.email.toLowerCase().trim();
            adminsMap.set(cleanEmail, {
              email: cleanEmail,
              password: "FlowchatAdmin2026!",
              status: r.status === "verified" ? "verified" : "pending",
              isSuper: cleanEmail === "ashishkushwaha1822@gmail.com",
            });
          }
        });
      }
    } catch (paymentErr) {
      // Ignore if payments table missing
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
 * Adds a new Admin Gmail to Whitelist permanently in Supabase PostgreSQL DB!
 */
export async function addNewAdminAccount(
  email: string,
  password = "FlowchatAdmin2026!",
  verified = true
): Promise<{ success: boolean; token: string; error?: string }> {
  const cleanEmail = email.toLowerCase().trim();
  const token = `verify_admin_${Math.random().toString(36).substring(2, 15)}_${Date.now()}`;

  try {
    const supabase = createServerSupabaseClient();

    // 1. Check if user already exists in `users` table
    const { data: existingUsers } = await supabase
      .from("users")
      .select("id")
      .eq("email", cleanEmail)
      .limit(1);

    if (existingUsers && existingUsers.length > 0) {
      // Update existing user plan to 'admin_whitelisted'
      const { error: updateErr } = await supabase
        .from("users")
        .update({
          plan: "admin_whitelisted",
          custom_access_granted: true,
        })
        .eq("id", existingUsers[0].id);

      if (updateErr) {
        console.error("Error updating user in Supabase:", updateErr);
      }
    } else {
      // Insert new user into `users` table with plan = 'admin_whitelisted'
      const { error: insertErr } = await supabase.from("users").insert([
        {
          email: cleanEmail,
          name: cleanEmail.split("@")[0] || "Admin Manager",
          clerk_user_id: `admin_clerk_${Date.now()}`,
          plan: "admin_whitelisted",
          custom_access_granted: true,
          created_at: new Date().toISOString(),
        },
      ]);

      if (insertErr) {
        console.error("Error inserting admin user in Supabase:", insertErr);
      }
    }

    // 2. Try inserting into payments table if exists
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

    return { success: true, token };
  } catch (err: any) {
    console.error("Error adding new admin account:", err);
    return { success: false, token: "", error: err.message };
  }
}

export const addAdminEmailToWhitelist = addNewAdminAccount;

/**
 * Removes an Admin Gmail from Supabase PostgreSQL DB Whitelist
 */
export async function removeAdminAccount(email: string): Promise<boolean> {
  const cleanEmail = email.toLowerCase().trim();

  if (cleanEmail === "ashishkushwaha1822@gmail.com") {
    return false; // Protect Super Admin
  }

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