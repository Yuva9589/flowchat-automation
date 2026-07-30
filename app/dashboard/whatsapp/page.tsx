"use client";

import { useState } from "react";

/* ============= Section Components ============= */

import WhatsAppConnection from "./components/WhatsAppConnection";
import WhatsAppAutomations, {
  type Automation,
} from "./components/WhatsAppAutomations";
import WhatsAppAnalytics from "./components/WhatsAppAnalytics";
import WhatsAppSettings from "./components/WhatsAppSettings";

/* ============= Icons ============= */

function WhatsAppLogo({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}

/* ============= Sample Data ============= */

const sampleAutomations: Automation[] = [
  {
    id: "1",
    keyword: "HI",
    triggerType: "Incoming message",
    message: "Hi there! 👋 Welcome to Your Brand. How can I help you today?",
    useTemplate: true,
    status: "active",
    dmsSent: 512,
    clicks: 389,
    createdAt: "1 day ago",
  },
  {
    id: "2",
    keyword: "PRICE",
    triggerType: "Incoming message",
    message: "Here's our pricing PDF 👉 flowchat.link/pricing",
    useTemplate: true,
    status: "active",
    dmsSent: 289,
    clicks: 234,
    createdAt: "4 days ago",
  },
  {
    id: "3",
    keyword: "DEMO",
    triggerType: "Broadcast",
    message: "Book a free demo call 👉 flowchat.link/demo",
    useTemplate: false,
    status: "paused",
    dmsSent: 267,
    clicks: 198,
    createdAt: "1 week ago",
  },
];

/* ============= Main Page ============= */

export default function WhatsAppDashboardPage() {
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
      {/* PLATFORM BANNER — WhatsApp Green               */}
      {/* ============================================= */}
      <div
        className="rounded-2xl p-6 md:p-8 relative overflow-hidden"
        style={{
          backgroundImage:
            "linear-gradient(135deg, #22c55e, #16a34a, #15803d)",
        }}
      >
        <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-white/10 blur-2xl" />

        <div className="relative flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white flex-shrink-0">
            <WhatsAppLogo size={28} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <h1 className="text-2xl md:text-3xl font-black text-white">
                WhatsApp
              </h1>
              {isConnected && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-white/20 text-white backdrop-blur-md">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  Live
                </span>
              )}
            </div>
            <p className="text-white/90 text-sm">
              Auto-reply to messages with rich cards, templates, and broadcast —
              end-to-end encrypted.
            </p>
          </div>
        </div>
      </div>

      {/* ============================================= */}
      {/* SECTION 1 — Connection                         */}
      {/* ============================================= */}
      <WhatsAppConnection
        isConnected={isConnected}
        isConnecting={isConnecting}
        onConnect={handleConnect}
        onDisconnect={handleDisconnect}
      />

      {/* ============================================= */}
      {/* SECTION 2 — Automations                        */}
      {/* ============================================= */}
      <WhatsAppAutomations
        isConnected={isConnected}
        automations={automations}
        onToggleStatus={handleToggleStatus}
        onDelete={handleDeleteAutomation}
        onCreate={handleCreateAutomation}
      />

      {/* ============================================= */}
      {/* SECTION 3 — Analytics                          */}
      {/* ============================================= */}
      <WhatsAppAnalytics isConnected={isConnected} />

      {/* ============================================= */}
      {/* SECTION 4 — Settings                           */}
      {/* ============================================= */}
      <WhatsAppSettings
        isConnected={isConnected}
        onDisconnect={handleDisconnect}
        onDeleteAllAutomations={handleDeleteAllAutomations}
      />
    </div>
  );
}