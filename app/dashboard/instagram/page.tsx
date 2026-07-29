"use client";

import { useState } from "react";

/* ============= Section Components ============= */

import InstagramConnection from "./components/InstagramConnection";
import InstagramAutomations, {
  type Automation,
} from "./components/InstagramAutomations";
import InstagramAnalytics from "./components/InstagramAnalytics";
import InstagramSettings from "./components/InstagramSettings";

/* ============= Icons ============= */

function InstagramLogo({ size = 24 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

/* ============= Sample Data ============= */

const sampleAutomations: Automation[] = [
  {
    id: "1",
    keyword: "LINK",
    postCaption: "Drop LINK in comments for the free guide 👇",
    message: "Hey! Here's your free guide 👉 flowchat.link/guide",
    followGate: true,
    status: "active",
    dmsSent: 245,
    clicks: 189,
    createdAt: "2 days ago",
  },
  {
    id: "2",
    keyword: "PRICE",
    postCaption: "Comment PRICE for our course details",
    message: "Here's the pricing 👉 flowchat.link/course",
    followGate: true,
    status: "active",
    dmsSent: 132,
    clicks: 98,
    createdAt: "1 week ago",
  },
  {
    id: "3",
    keyword: "OFFER",
    postCaption: "Say OFFER for 30% off — today only! 🎁",
    message: "Boom! 30% off code: FLOW30 · Use here 👉 flowchat.link/offer",
    followGate: false,
    status: "paused",
    dmsSent: 89,
    clicks: 67,
    createdAt: "2 weeks ago",
  },
];

/* ============= Main Page ============= */

export default function InstagramDashboardPage() {
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [automations, setAutomations] =
    useState<Automation[]>(sampleAutomations);

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
      {/* Platform Banner */}
      <div
        className="rounded-2xl p-6 md:p-8 relative overflow-hidden"
        style={{
          backgroundImage:
            "linear-gradient(135deg, #8b5cf6 0%, #ec4899 50%, #f97316 100%)",
        }}
      >
        <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-white/10 blur-2xl" />

        <div className="relative flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white flex-shrink-0">
            <InstagramLogo size={28} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <h1 className="text-2xl md:text-3xl font-black text-white">
                Instagram
              </h1>
              {isConnected && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-white/20 text-white backdrop-blur-md">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  Live
                </span>
              )}
            </div>
            <p className="text-white/90 text-sm">
              Manage your Instagram automations, analytics, and settings — all
              in one place.
            </p>
          </div>
        </div>
      </div>

      {/* 4 Sections */}
      <InstagramConnection
        isConnected={isConnected}
        isConnecting={isConnecting}
        onConnect={handleConnect}
        onDisconnect={handleDisconnect}
      />

      <InstagramAutomations
        isConnected={isConnected}
        automations={automations}
        onToggleStatus={handleToggleStatus}
        onDelete={handleDeleteAutomation}
        onCreate={handleCreateAutomation}
      />

      <InstagramAnalytics isConnected={isConnected} />

      <InstagramSettings
        isConnected={isConnected}
        onDisconnect={handleDisconnect}
        onDeleteAllAutomations={handleDeleteAllAutomations}
      />
    </div>
  );
}