import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";

export default async function DashboardHomePage() {
  const user = await currentUser();

  const stats = [
    { label: "DMs Sent", value: "0", change: "+0 this week", color: "#03856b" },
    { label: "Link Clicks", value: "0", change: "+0 this week", color: "#8b5cf6" },
    { label: "New Followers", value: "0", change: "+0 this week", color: "#f97316" },
    { label: "Conversion", value: "0%", change: "Start automating", color: "#ec4899" },
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
          Let's turn your comments into customers. Set up your first automation
          in 2 minutes.
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
              className="text-3xl font-black leading-none"
              style={{ color: s.color }}
            >
              {s.value}
            </p>
            <p className="text-xs text-gray-500 mt-2">{s.change}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <Link
            href="/dashboard/connections"
            className="group bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all"
          >
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center text-white mb-3 shadow-md"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, #8b5cf6, #ec4899, #f97316)",
              }}
            >
              🎯
            </div>
            <h3 className="font-bold text-gray-900 mb-1">
              Connect Instagram
            </h3>
            <p className="text-sm text-gray-500">
              One-tap login via official Meta API
            </p>
          </Link>

          <Link
            href="/dashboard/connections"
            className="group bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all"
          >
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center text-white mb-3 shadow-md text-lg"
              style={{
                backgroundImage: "linear-gradient(135deg, #2563eb, #3b82f6)",
              }}
            >
              f
            </div>
            <h3 className="font-bold text-gray-900 mb-1">
              Connect Facebook
            </h3>
            <p className="text-sm text-gray-500">
              Auto-DM your page comments
            </p>
          </Link>

          <Link
            href="/dashboard/connections"
            className="group bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all"
          >
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center text-white mb-3 shadow-md"
              style={{
                backgroundImage: "linear-gradient(135deg, #22c55e, #16a34a)",
              }}
            >
              💬
            </div>
            <h3 className="font-bold text-gray-900 mb-1">
              Connect WhatsApp
            </h3>
            <p className="text-sm text-gray-500">
              Business API auto-replies
            </p>
          </Link>
        </div>
      </div>

      {/* Get started card */}
      <div
        className="rounded-2xl p-6 md:p-8 relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #f0fdf9 0%, #ecfeff 50%, #f0fdf4 100%)",
          border: "1px solid rgba(3, 133, 107, 0.15)",
        }}
      >
        <div className="grid md:grid-cols-[1fr_auto] gap-4 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-3"
              style={{
                backgroundColor: "rgba(3, 133, 107, 0.1)",
                color: "#03856b",
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full animate-pulse"
                style={{ backgroundColor: "#03856b" }}
              />
              Get Started
            </div>
            <h3 className="text-xl md:text-2xl font-black text-gray-900 mb-2">
              Create your first automation
            </h3>
            <p className="text-gray-600 text-sm mb-4 md:mb-0">
              Set a keyword, pick a post, and start auto-replying to your comments in seconds.
            </p>
          </div>

          <Link
            href="/dashboard/automations/new"
            className="inline-flex items-center gap-2 text-white px-6 py-3 rounded-full font-semibold text-sm transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 whitespace-nowrap"
            style={{
              backgroundImage: "linear-gradient(135deg, #03856b, #04a085)",
            }}
          >
            Create Automation →
          </Link>
        </div>
      </div>
    </div>
  );
}