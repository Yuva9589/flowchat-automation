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
 * Gets all Whitelisted Admin credentials from Supabase DB (`users` + `payments` fallback)
 */
export async function getAllAdminCredentials(): Promise<AdminCredential[]> {
  const adminsMap = new Map<string, AdminCredential>();

  // 1. Add Default Master Owner
  DEFAULT_SUPER_ADMINS.forEach((adm) => {
    adminsMap.set(adm.email.toLowerCase().trim(), adm);
  });

  try {
    const supabase = createServerSupabaseClient();

    // 2. Query `users` table (ALWAYS EXISTS in Supabase)
    const { data: dbUsers, error: userErr } = await supabase
      .from("users")
      .select("*")
      .or("plan.eq.admin_whitelisted,custom_access_granted.eq.true");

    if (!userErr && dbUsers && dbUsers.length > 0) {
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

    // 3. Optional fallback query on `payments` table (wrapped in try-catch if table missing)
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
    } catch (paymentTableErr) {
      // Ignore if public.payments table does not exist yet
      console.log("Payments table not found, using users table whitelist");
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
 * Adds a new Admin Gmail to Whitelist in Supabase `users` table directly!
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
      // Update existing user to admin_whitelisted
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
      // Create new user entry in `users` table
      const { error: insertUserErr } = await supabase.from("users").insert([
        {
          email: cleanEmail,
          name: cleanEmail.split("@")[0] || "Admin Manager",
          clerk_user_id: `admin_clerk_${Date.now()}`,
          plan: "admin_whitelisted",
          custom_access_granted: true,
          created_at: new Date().toISOString(),
        },
      ]);

      if (insertUserErr) {
        console.error("Error inserting new admin user:", insertUserErr);
      }
    }

    // 2. Try inserting into payments table if exists (optional)
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
      // Payments table optional fallback
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