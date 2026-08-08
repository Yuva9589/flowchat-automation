import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import { syncClerkUserToSupabase, getCurrentSupabaseUser } from "@/lib/syncUser";
import { createServerSupabaseClient } from "@/lib/supabase";

export default async function DashboardHomePage() {
  const user = await currentUser();

  // Auto-sync Clerk user to Supabase on every dashboard visit
  const dbUser = await syncClerkUserToSupabase();

  let totalDmsSent = 0;
  let totalClicks = 0;
  let activeRulesCount = 0;

  if (dbUser) {
    try {
      const supabase = createServerSupabaseClient();
      const { data: automations } = await supabase
        .from("automations")
        .select("*")
        .eq("user_id", dbUser.id);

      (automations || []).forEach((a: any) => {
        totalDmsSent += a.dms_sent || 0;
        totalClicks += a.clicks || 0;
        if (a.status === "active") {
          activeRulesCount += 1;
        }
      });
    } catch (err) {
      console.error("Dashboard stats error:", err);
    }
  }

  const stats = [
    { label: "DMs Sent", value: totalDmsSent.toString(), change: "Total Automations Sent", color: "#03856b" },
    { label: "Link Clicks", value: totalClicks.toString(), change: "Total Link Clicks", color: "#8b5cf6" },
    { label: "Active Rules", value: activeRulesCount.toString(), change: "Active Automation Rules", color: "#f97316" },
    { label: "Plan Status", value: dbUser?.custom_access_granted ? "Custom Free" : dbUser?.plan || "7-Day Trial", change: "Active Subscription", color: "#ec4899" },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      {/* Welcome */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-2">
          Welcome,{" "}
          <span style={{ color: "#03856b" }}>
            {user?.firstName || "Creator"}!
          </span>{" "}
          👋
        </h1>
        <p className="text-gray-600 text-base">
          Let's turn your comments into customers. Pick a platform to get started.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {stats.map((s, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-all"
          >
            <p className="text-xs text-gray-500 font-medium mb-2">{s.label}</p>
            <p
              className="text-3xl font-black leading-none capitalize"
              style={{ color: s.color }}
            >
              {s.value}
            </p>
            <p className="text-xs text-gray-500 mt-2">{s.change}</p>
          </div>
        ))}
      </div>

      {/* Platform Cards */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Your Platforms</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <Link
            href="/dashboard/instagram"
            className="group bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all"
          >
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center text-white mb-3 shadow-md"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, #8b5cf6, #ec4899, #f97316)",
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </div>
            <h3 className="font-bold text-gray-900 mb-1">Instagram</h3>
            <p className="text-sm text-gray-500">
              Auto-DM commenters & story replies
            </p>
          </Link>

          <Link
            href="/dashboard/facebook"
            className="group bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all"
          >
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center text-white mb-3 shadow-md"
              style={{
                backgroundImage: "linear-gradient(135deg, #2563eb, #3b82f6)",
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
              </svg>
            </div>
            <h3 className="font-bold text-gray-900 mb-1">Facebook</h3>
            <p className="text-sm text-gray-500">
              Auto-DM page post commenters
            </p>
          </Link>

          <Link
            href="/dashboard/whatsapp"
            className="group bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all"
          >
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center text-white mb-3 shadow-md"
              style={{
                backgroundImage: "linear-gradient(135deg, #22c55e, #16a34a)",
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347" />
              </svg>
            </div>
            <h3 className="font-bold text-gray-900 mb-1">WhatsApp</h3>
            <p className="text-sm text-gray-500">Business API auto-replies</p>
          </Link>
        </div>
      </div>
    </div>
  );
}