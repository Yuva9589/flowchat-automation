import { createServerSupabaseClient } from "@/lib/supabase";
import { currentUser } from "@clerk/nextjs/server";

/**
 * Syncs the currently logged-in Clerk user to Supabase database.
 * - Creates user if doesn't exist
 * - Updates user info if changed
 * - Returns the Supabase user record
 * 
 * Use this in server components / API routes.
 */
export async function syncClerkUserToSupabase() {
  const clerkUser = await currentUser();

  if (!clerkUser) {
    return null;
  }

  const supabase = createServerSupabaseClient();

  const userData = {
    clerk_user_id: clerkUser.id,
    email: clerkUser.emailAddresses[0]?.emailAddress || "",
    name: `${clerkUser.firstName || ""} ${clerkUser.lastName || ""}`.trim() || "User",
    avatar_url: clerkUser.imageUrl || null,
  };

  // Check if user already exists in Supabase
  const { data: existingUser } = await supabase
    .from("users")
    .select("*")
    .eq("clerk_user_id", clerkUser.id)
    .single();

  if (existingUser) {
    // User exists — update if needed
    const { data: updatedUser } = await supabase
      .from("users")
      .update({
        email: userData.email,
        name: userData.name,
        avatar_url: userData.avatar_url,
      })
      .eq("clerk_user_id", clerkUser.id)
      .select()
      .single();

    return updatedUser;
  } else {
    // User doesn't exist — create new
    const { data: newUser, error } = await supabase
      .from("users")
      .insert([userData])
      .select()
      .single();

    if (error) {
      console.error("Error creating user in Supabase:", error);
      return null;
    }

    return newUser;
  }
}

/**
 * Get the Supabase user for the currently logged-in Clerk user.
 * Returns null if not logged in.
 */
export async function getCurrentSupabaseUser() {
  const clerkUser = await currentUser();
  if (!clerkUser) return null;

  const supabase = createServerSupabaseClient();

  const { data } = await supabase
    .from("users")
    .select("*")
    .eq("clerk_user_id", clerkUser.id)
    .single();

  return data;
}