import Link from "next/link";
import { redirect } from "next/navigation";
import {
  MessageCircle,
  Link2,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import InstagramIcon from "@/components/dashboard/InstagramIcon";
import { createServerSupabaseClient } from "@/lib/supabase";
import { syncClerkUserToSupabase } from "@/lib/syncUser";

export const dynamic = "force-dynamic";

export default async function DashboardHomePage() {
  const dbUser = await syncClerkUserToSupabase();
  if (!dbUser) redirect("/sign-in");

  const supabase = createServerSupabaseClient();

  // Real stats from DB
  const [accountRes, automationsRes, logsRes] = await Promise.all([
    supabase
      .from("instagram_accounts")
      .select("id, username, profile_pic_url")
      .eq("user_id", dbUser.id)
      .maybeSingle(),
    supabase.from("automations").select("status, dms_sent, clicks").eq("user_id", dbUser.id),
    supabase
      .from("dm_logs")
      .select("commenter_username, reply_sent, status, created_at")
      .eq("user_id", dbUser.id)
      .order("created_at", { ascending: false })
      .limit(5),
  ]);

  const automations = automationsRes.data || [];
  const totalDms = automations.reduce((s, a) => s + (a.dms_sent || 0), 0);
  const totalClicks = automations.reduce((s, a) => s + (a.clicks || 0), 0);
  const activeRules = automations.filter((a) => a.status === "active").length;
  const connected = accountRes.data || null;
  const recentLogs = logsRes.data || [];

  const stats = [
    { label: "DMs Sent", value: totalDms, color: "#03856b" },
    { label: "Link Clicks", value: totalClicks, color: "#8b5cf6" },
    { label: "Active Rules", value: activeRules, color: "#f97316" },
    {
      label: "Instagram",
      value: connected ? "Connected" : "Not Linked",
      color: connected ? "#ec4899" : "#9ca3af",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Welcome */}
      <div>
        <h1 className="text-2xl md:text-3xl font-black text-gray-900">
          Welcome back, {dbUser.name || "Creator"} 👋
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Here&apos;s what&apos;s moving across your studio.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm"
          >
            <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide">
              {s.label}
            </p>
            <p className="text-2xl md:text-3xl font-black mt-2" style={{ color: s.color }}>
              {s.value}
            </p>
          </div>
        ))}
      </div>

      {/* Connect Instagram card (primary) */}
      {!connected ? (
        <div
          className="rounded-3xl p-6 md:p-10 text-white relative overflow-hidden shadow-xl"
          style={{
            backgroundImage:
              "linear-gradient(120deg, #4f46e5 0%, #8b5cf6 35%, #ec4899 70%, #f97316 100%)",
          }}
        >
          <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-white/10 blur-3xl" />
          <div className="relative flex flex-col md:flex-row md:items-center gap-6 md:justify-between">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-xs font-bold uppercase tracking-wider">
                <InstagramIcon size={14} /> Official Instagram Login
              </div>
              <h2 className="text-xl md:text-2xl font-black mt-4 leading-snug">
                Connect Instagram to send your first auto-DM
              </h2>
              <p className="text-sm text-white/85 mt-2 leading-relaxed">
                One tap with Instagram&apos;s official login. No password, no code. Your
                account stays 100% secure — we only get permission to read comments
                and reply. Takes about 10 seconds.
              </p>
            </div>
            <a
              href="/api/auth/instagram/login"
              className="shrink-0 inline-flex items-center gap-2 bg-white text-gray-900 px-6 py-3.5 rounded-full font-black text-sm shadow-lg hover:shadow-2xl hover:-translate-y-0.5 transition-all"
            >
              <InstagramIcon size={18} color="#ec4899" />
              Connect Instagram
            </a>
          </div>
        </div>
      ) : (
        /* Connected state */
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm flex flex-col md:flex-row md:items-center gap-5">
          {connected.profile_pic_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={connected.profile_pic_url}
              alt={connected.username || "IG"}
              className="w-16 h-16 rounded-full border-4 border-pink-100 object-cover"
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#8b5cf6] to-[#ec4899] flex items-center justify-center text-white text-xl font-black">
              @
            </div>
          )}
          <div className="flex-1">
            <p className="flex items-center gap-2 text-sm font-black text-gray-900">
              <CheckCircle2 size={16} style={{ color: "#03856b" }} />
              {connected.username || "Instagram"} connected
            </p>
            <p className="text-xs text-gray-500 mt-1">
              AutoDM is watching your comments 24/7.
            </p>
          </div>
          <Link
            href="/dashboard/automation"
            className="inline-flex items-center gap-2 bg-[#03856b] text-white px-5 py-2.5 rounded-full text-sm font-bold hover:bg-[#04a085] transition-colors"
          >
            Manage AutoDM <ArrowRight size={16} />
          </Link>
        </div>
      )}

      {/* Setup cards */}
      <div>
        <h2 className="text-lg font-black text-gray-900 mb-4">Set up your studio</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <Link
            href="/dashboard/automation"
            className="group bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all"
          >
            <div className="w-11 h-11 rounded-xl bg-[#03856b]/10 text-[#03856b] flex items-center justify-center mb-4">
              <MessageCircle size={20} />
            </div>
            <h3 className="font-black text-gray-900">Set up AutoDM</h3>
            <p className="text-sm text-gray-500 mt-1">
              Reply to comments automatically with keyword rules.
            </p>
            <span className="inline-flex items-center gap-1 text-xs font-black text-[#03856b] mt-4 group-hover:gap-2 transition-all">
              Open <ArrowRight size={14} />
            </span>
          </Link>

          <Link
            href={connected ? "/dashboard/automation" : "/api/auth/instagram/login"}
            className="group bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all"
          >
            <div className="w-11 h-11 rounded-xl bg-pink-50 text-pink-500 flex items-center justify-center mb-4">
              <InstagramIcon size={20} />
            </div>
            <h3 className="font-black text-gray-900">Connect Instagram</h3>
            <p className="text-sm text-gray-500 mt-1">
              Official login — no password, no Facebook page needed.
            </p>
            <span className="inline-flex items-center gap-1 text-xs font-black text-pink-500 mt-4 group-hover:gap-2 transition-all">
              {connected ? "Connected ✓" : "Connect now"} <ArrowRight size={14} />
            </span>
          </Link>

          <Link
            href="/dashboard/billing"
            className="group bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all"
          >
            <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center mb-4">
              <Link2 size={20} />
            </div>
            <h3 className="font-black text-gray-900">Your plan</h3>
            <p className="text-sm text-gray-500 mt-1">
              Trial status, upgrade and payment history.
            </p>
            <span className="inline-flex items-center gap-1 text-xs font-black text-amber-500 mt-4 group-hover:gap-2 transition-all">
              Manage <ArrowRight size={14} />
            </span>
          </Link>
        </div>
      </div>

      {/* Recent activity */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h3 className="font-black text-gray-900 text-sm">Recent AutoDM activity</h3>
          <Link
            href="/dashboard/automation"
            className="text-xs font-bold text-[#03856b] hover:underline"
          >
            View all →
          </Link>
        </div>
        {recentLogs.length === 0 ? (
          <div className="p-10 text-center text-sm text-gray-400">
            No activity yet. Connect Instagram and create your first keyword rule —
            your sent DMs will show up here.
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            {recentLogs.map((log: any) => (
              <div key={log.id} className="px-6 py-3.5 flex items-center gap-4 text-sm">
                <span
                  className={`w-2 h-2 rounded-full shrink-0 ${
                    log.status === "sent" ? "bg-emerald-500" : "bg-red-400"
                  }`}
                />
                <span className="font-bold text-gray-900">
                  @{log.commenter_username || "unknown"}
                </span>
                <span className="text-gray-500 truncate flex-1">
                  → {log.reply_sent}
                </span>
                <span className="text-[11px] text-gray-400 shrink-0">
                  {new Date(log.created_at).toLocaleString("en-IN", {
                    day: "numeric",
                    month: "short",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
