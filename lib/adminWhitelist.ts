import { createServerSupabaseClient } from "@/lib/supabase";

export const DEFAULT_SUPER_ADMIN_EMAILS = [
  "ashishkushwaha1822@gmail.com",
  "uniqueshopemart.in@gmail.com",
];

/**
 * Gets all authorized Whitelisted Admin Emails from Supabase DB + Defaults
 */
export async function getWhitelistedAdminEmails(): Promise<string[]> {
  const emails = new Set<string>(
    DEFAULT_SUPER_ADMIN_EMAILS.map((e) => e.toLowerCase().trim())
  );

  if (process.env.ADMIN_EMAIL) {
    emails.add(process.env.ADMIN_EMAIL.toLowerCase().trim());
  }

  try {
    const supabase = createServerSupabaseClient();
    const { data: records } = await supabase
      .from("payments")
      .select("*")
      .eq("plan", "admin_whitelisted_email")
      .eq("status", "verified");

    if (records && records.length > 0) {
      records.forEach((r: any) => {
        if (r.email) {
          emails.add(r.email.toLowerCase().trim());
        }
      });
    }
  } catch (err) {
    console.error("Error fetching whitelisted admin emails:", err);
  }

  return Array.from(emails);
}

/**
 * Adds a new Admin Gmail to Whitelist
 */
export async function addAdminEmailToWhitelist(
  email: string,
  verified = false
): Promise<{ success: boolean; token: string }> {
  const cleanEmail = email.toLowerCase().trim();
  const token = `verify_admin_${Math.random().toString(36).substring(2, 15)}_${Date.now()}`;

  try {
    const supabase = createServerSupabaseClient();
    await supabase.from("payments").insert([
      {
        user_id: "00000000-0000-0000-0000-000000000000",
        email: cleanEmail,
        amount: 0,
        plan: "admin_whitelisted_email",
        payment_method: token,
        status: verified ? "verified" : "pending",
        created_at: new Date().toISOString(),
      },
    ]);

    return { success: true, token };
  } catch (err) {
    console.error("Error adding admin email:", err);
    return { success: false, token: "" };
  }
}

/**
 * Verifies a pending Admin Gmail by verification token
 */
export async function verifyAdminEmailToken(token: string): Promise<boolean> {
  try {
    const supabase = createServerSupabaseClient();
    const { data, error } = await supabase
      .from("payments")
      .update({ status: "verified" })
      .eq("plan", "admin_whitelisted_email")
      .eq("payment_method", token)
      .select();

    return !error && data && data.length > 0;
  } catch (err) {
    console.error("Error verifying admin token:", err);
    return false;
  }
}