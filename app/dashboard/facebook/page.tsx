"use client";

import { useState } from "react";

/* ============= Section Components ============= */

import FacebookConnection from "./components/FacebookConnection";
import FacebookAutomations, {
  type Automation,
} from "./components/FacebookAutomations";
import FacebookAnalytics from "./components/FacebookAnalytics";
import FacebookSettings from "./components/FacebookSettings";

/* ============= Icons ============= */

function FacebookLogo({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
    </svg>
  );
}

/* ============= Sample Data ============= */

const sampleAutomations: Automation[] = [
  {
    id: "1",
    keyword: "OFFER",
    postCaption: "Drop OFFER for 30% off — today only! 🎁",
    message: "Boom! 30% off code: FB30 · Grab it 👉 flowchat.link/offer",
    followGate: true,
    status: "active",
    dmsSent: 189,
    clicks: 142,
    createdAt: "3 days ago",
  },
  {
    id: "2",
    keyword: "INFO",
    postCaption: "Comment INFO for full product details",
    message: "Here are the details 👉 flowchat.link/info",
    followGate: true,
    status: "active",
    dmsSent: 76,
    clicks: 58,
    createdAt: "1 week ago",
  },
  {
    id: "3",
    keyword: "DEMO",
    postCaption: "Say DEMO to book a free call 📞",
    message: "Awesome! Book your slot 👉 flowchat.link/demo",
    followGate: false,
    status: "paused",
    dmsSent: 79,
    clicks: 61,
    createdAt: "2 weeks ago",
  },
];

/* ============= Main Page ============= */

export default function FacebookDashboardPage() {
  // 🔗 Connection state (shared across sections)
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);

  // ⚡ Automations state (shared across sections)
  const [automations, setAutomations] =
    useState<Automation[]>(sampleAutomations);

  /* ============= Handlers ============= */

  const handleConnect = async () => {
    setIsConnecting(true);
    await new Promise((r) => setTimeout(r, 1500));
    setIsConnected(true);
    setIsConnecting(false);
  };

  const handleDisconnect = () => {
    setIsConnected(false);
  };

  const handleToggleStatus = (id: string) => {
    setAutomations((prev) =>
      prev.map((a) =>
        a.id === id
          ? { ...a, status: a.status === "active" ? "paused" : "active" }
          : a
      )
    );
  };

  const handleDeleteAutomation = (id: string) => {
    setAutomations((prev) => prev.filter((a) => a.id !== id));
  };

  const handleCreateAutomation = (newAuto: Automation) => {
    setAutomations((prev) => [newAuto, ...prev]);
  };

  const handleDeleteAllAutomations = () => {
    setAutomations([]);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* ============================================= */}
      {/* PLATFORM BANNER — Facebook Blue                */}
      {/* ============================================= */}
      <div
        className="rounded-2xl p-6 md:p-8 relative overflow-hidden"
        style={{
          backgroundImage: "linear-gradient(135deg, #2563eb, #3b82f6, #60a5fa)",
        }}
      >
        <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-white/10 blur-2xl" />

        <div className="relative flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white flex-shrink-0">
            <FacebookLogo size={28} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <h1 className="text-2xl md:text-3xl font-black text-white">
                Facebook
              </h1>
              {isConnected && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-white/20 text-white backdrop-blur-md">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  Live
                </span>
              )}
            </div>
            <p className="text-white/90 text-sm">
              Auto-DM commenters on your Page posts, ads, and Groups — all in
              one place.
            </p>
          </div>
        </div>
      </div>

      {/* ============================================= */}
      {/* SECTION 1 — Connection                         */}
      {/* ============================================= */}
      <FacebookConnection
        isConnected={isConnected}
        isConnecting={isConnecting}
        onConnect={handleConnect}
        onDisconnect={handleDisconnect}
      />

      {/* ============================================= */}
      {/* SECTION 2 — Automations                        */}
      {/* ============================================= */}
      <FacebookAutomations
        isConnected={isConnected}
        automations={automations}
        onToggleStatus={handleToggleStatus}
        onDelete={handleDeleteAutomation}
        onCreate={handleCreateAutomation}
      />

      {/* ============================================= */}
      {/* SECTION 3 — Analytics                          */}
      {/* ============================================= */}
      <FacebookAnalytics isConnected={isConnected} />

      {/* ============================================= */}
      {/* SECTION 4 — Settings                           */}
      {/* ============================================= */}
      <FacebookSettings
        isConnected={isConnected}
        onDisconnect={handleDisconnect}
        onDeleteAllAutomations={handleDeleteAllAutomations}
      />
    </div>
  );
}