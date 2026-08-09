import { createServerSupabaseClient } from "@/lib/supabase";

export interface AdminCredential {
  email: string;
  password?: string;
  status: "verified" | "pending";
  token?: string;
  isSuper?: boolean;
}

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
    isSuper: true,
  },
];

export const DEFAULT_SUPER_ADMIN_EMAILS = DEFAULT_SUPER_ADMINS.map((a) => a.email);

/**
 * Gets all Whitelisted Admin credentials from Supabase DB + Defaults
 */
export async function getAllAdminCredentials(): Promise<AdminCredential[]> {
  const adminsMap = new Map<string, AdminCredential>();

  DEFAULT_SUPER_ADMINS.forEach((adm) => {
    adminsMap.set(adm.email.toLowerCase().trim(), adm);
  });

  try {
    const supabase = createServerSupabaseClient();
    const { data: records } = await supabase
      .from("payments")
      .select("*")
      .eq("plan", "admin_whitelisted_account");

    if (records && records.length > 0) {
      records.forEach((r: any) => {
        if (r.email) {
          let password = "FlowchatAdmin2026!";
          let token = "";

          if (r.payment_method) {
            const passMatch = r.payment_method.match(/Pass:\s*([^|]+)/);
            if (passMatch) password = passMatch[1].trim();

            const tokenMatch = r.payment_method.match(/Token:\s*(.+)/);
            if (tokenMatch) token = tokenMatch[1].trim();
          }

          adminsMap.set(r.email.toLowerCase().trim(), {
            email: r.email.toLowerCase().trim(),
            password: password,
            status: r.status === "verified" ? "verified" : "pending",
            token: token,
            isSuper: false,
          });
        }
      });
    }
  } catch (err) {
    console.error("Error fetching admin credentials:", err);
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
 * Adds a new Admin Gmail + Custom Password to Whitelist
 */
export async function addNewAdminAccount(
  email: string,
  password = "FlowchatAdmin2026!",
  verified = true
): Promise<{ success: boolean; token: string }> {
  const cleanEmail = email.toLowerCase().trim();
  const token = `verify_admin_${Math.random().toString(36).substring(2, 15)}_${Date.now()}`;
  const methodString = `Pass: ${password} | Token: ${token}`;

  try {
    const supabase = createServerSupabaseClient();
    await supabase.from("payments").insert([
      {
        user_id: "00000000-0000-0000-0000-000000000000",
        email: cleanEmail,
        amount: 0,
        plan: "admin_whitelisted_account",
        payment_method: methodString,
        status: verified ? "verified" : "pending",
        created_at: new Date().toISOString(),
      },
    ]);

    return { success: true, token };
  } catch (err) {
    console.error("Error adding new admin account:", err);
    return { success: false, token: "" };
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