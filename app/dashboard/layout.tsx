import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Zap } from "lucide-react";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import { syncClerkUserToSupabase } from "@/lib/syncUser";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const clerkUser = await currentUser();
  if (!clerkUser) redirect("/sign-in");

  // Ensure the user exists in Supabase (plan/trial data lives there)
  const dbUser = await syncClerkUserToSupabase();

  const createdAt = dbUser?.created_at ? new Date(dbUser.created_at) : new Date();
  const defaultTrialExpiry = new Date(createdAt.getTime() + 7 * 24 * 60 * 60 * 1000);
  const expiresAt = dbUser?.plan_expires_at
    ? new Date(dbUser.plan_expires_at)
    : defaultTrialExpiry;
  const plan = dbUser?.plan || (dbUser?.custom_access_granted ? "custom_free" : "free_trial");
  const daysRemaining = Math.ceil((expiresAt.getTime() - Date.now()) / 86400000);
  const isExpired = new Date() > expiresAt && plan !== "custom_free";

  const displayName = clerkUser.firstName || dbUser?.name || "Creator";

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardSidebar
        userName={displayName}
        isExpired={isExpired}
        daysRemaining={daysRemaining > 0 ? daysRemaining : 0}
      />

      {/* Main area */}
      <div className="md:pl-64 flex flex-col min-h-screen">
        {/* Trial banner */}
        {isExpired ? (
          <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-2.5 text-center text-xs md:text-sm font-semibold flex items-center justify-center gap-3 flex-wrap">
            <span className="inline-flex items-center gap-1.5">
              <Zap size={14} /> Your free trial has ended — upgrade to keep your
              automations running.
            </span>
            <Link
              href="/dashboard/billing"
              className="px-3 py-1 rounded-full bg-white text-amber-600 text-xs font-black hover:bg-amber-50 transition-colors"
            >
              Upgrade
            </Link>
          </div>
        ) : (
          <div className="bg-[#03856b]/95 text-white px-4 py-2.5 text-center text-xs md:text-sm font-semibold flex items-center justify-center gap-3 flex-wrap">
            <span className="inline-flex items-center gap-1.5">
              <Zap size={14} /> 7-day free trial — {daysRemaining > 0 ? daysRemaining : 0} days
              left. All features unlocked.
            </span>
            <Link
              href="/dashboard/billing"
              className="px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold hover:bg-white/30 transition-colors"
            >
              Upgrade
            </Link>
          </div>
        )}

        <main className="flex-1 p-4 md:p-8">{children}</main>
      </div>
    </div>
  );
}
