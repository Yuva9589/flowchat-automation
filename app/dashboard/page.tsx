import { UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";

export default async function DashboardPage() {
  const user = await currentUser();

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-8 bg-white rounded-2xl px-6 py-4 shadow-sm border border-gray-100">
          <a href="/" className="flex flex-col leading-none">
            <span className="text-2xl font-black tracking-tight text-gray-900">
              Flow<span style={{ color: "#03856b" }}>chat</span>
            </span>
            <span className="text-[10px] text-gray-500 font-medium tracking-wide mt-0.5">
              Dashboard
            </span>
          </a>

          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-600 hidden md:inline">
              {user?.emailAddresses[0]?.emailAddress}
            </span>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10",
                },
              }}
            />
          </div>
        </div>

        {/* Welcome */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
          <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-2">
            Welcome,{" "}
            <span style={{ color: "#03856b" }}>
              {user?.firstName || "Creator"}!
            </span>{" "}
            👋
          </h1>
          <p className="text-gray-600 text-lg mb-6">
            You're all set. Let's build your first automation.
          </p>

          <div className="grid md:grid-cols-3 gap-4 mt-8">
            {[
              { title: "🎯 Connect Instagram", desc: "One-tap login via Meta API" },
              { title: "📘 Connect Facebook", desc: "Auto-DM your FB page comments" },
              { title: "💬 Connect WhatsApp", desc: "Business API for auto-replies" },
            ].map((card) => (
              <div
                key={card.title}
                className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-5 border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer"
              >
                <h3 className="font-bold text-gray-900 mb-1">{card.title}</h3>
                <p className="text-sm text-gray-600">{card.desc}</p>
              </div>
            ))}
          </div>

          <p className="text-sm text-gray-500 mt-8 text-center">
            🚧 Full dashboard coming in next step — automations, analytics, settings, etc.
          </p>
        </div>
      </div>
    </main>
  );
}