"use client";

import { useState, useEffect } from "react";

import WhatsAppConnection from "./components/WhatsAppConnection";
import WhatsAppAutomations, {
  type Automation as ComponentAutomation,
} from "./components/WhatsAppAutomations";
import WhatsAppAnalytics from "./components/WhatsAppAnalytics";
import WhatsAppSettings from "./components/WhatsAppSettings";

function WhatsAppLogo({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347" />
    </svg>
  );
}

interface DBAutomation {
  id: string;
  user_id: string;
  platform: string;
  keyword: string;
  post_caption: string | null;
  reply_message: string;
  follow_gate: boolean;
  use_template?: boolean;
  status: "active" | "paused";
  dms_sent: number;
  clicks: number;
  created_at: string;
  post_url: string | null;
  post_type: string | null;
  trigger_scope: string;
}

function timeAgo(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins} min ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
  if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
  return `${Math.floor(diffDays / 7)} week${diffDays >= 14 ? "s" : ""} ago`;
}

function dbToComponent(db: DBAutomation): ComponentAutomation {
  return {
    id: db.id,
    keyword: db.keyword,
    triggerType: db.post_type || "Incoming message",
    message: db.reply_message,
    useTemplate: db.use_template ?? true,
    status: db.status,
    dmsSent: db.dms_sent,
    clicks: db.clicks,
    createdAt: timeAgo(db.created_at),
  };
}

export default function WhatsAppDashboardPage() {
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [automations, setAutomations] = useState<ComponentAutomation[]>([]);
  const [loading, setLoading] = useState(true);

  const loadAutomations = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/automations?platform=whatsapp");
      if (!res.ok) throw new Error("Failed to load automations");
      const { automations: dbAutos } = await res.json();
      setAutomations((dbAutos || []).map(dbToComponent));
    } catch (err) {
      console.error("Load error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAutomations();
  }, []);

  const handleConnect = async () => {
    setIsConnecting(true);
    await new Promise((r) => setTimeout(r, 1500));
    setIsConnected(true);
    setIsConnecting(false);
  };

  const handleDisconnect = () => {
    setIsConnected(false);
  };

  const handleToggleStatus = async (id: string) => {
    const current = automations.find((a) => a.id === id);
    if (!current) return;
    const newStatus = current.status === "active" ? "paused" : "active";

    setAutomations((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: newStatus } : a))
    );

    try {
      const res = await fetch(`/api/automations/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!res.ok) throw new Error("Failed to update");
    } catch (err) {
      console.error(err);
      loadAutomations();
    }
  };

  const handleDeleteAutomation = async (id: string) => {
    setAutomations((prev) => prev.filter((a) => a.id !== id));
    try {
      const res = await fetch(`/api/automations/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete");
    } catch (err) {
      console.error(err);
      loadAutomations();
    }
  };

  const handleCreateAutomation = async (newAuto: ComponentAutomation) => {
    try {
      const res = await fetch("/api/automations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          platform: "whatsapp",
          keyword: newAuto.keyword,
          post_caption: newAuto.triggerType,
          reply_message: newAuto.message,
          use_template: newAuto.useTemplate,
          follow_gate: false,
          post_type: newAuto.triggerType,
        }),
      });

      if (!res.ok) throw new Error("Failed to create");
      const { automation: dbAuto } = await res.json();
      setAutomations((prev) => [dbToComponent(dbAuto), ...prev]);
    } catch (err) {
      console.error(err);
      alert("Failed to create WhatsApp automation");
    }
  };

  const handleDeleteAllAutomations = async () => {
    const ids = automations.map((a) => a.id);
    setAutomations([]);
    try {
      await Promise.all(
        ids.map((id) => fetch(`/api/automations/${id}`, { method: "DELETE" }))
      );
    } catch (err) {
      console.error(err);
      loadAutomations();
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div
        className="rounded-2xl p-6 md:p-8 relative overflow-hidden"
        style={{
          backgroundImage: "linear-gradient(135deg, #22c55e, #16a34a)",
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
              {!loading && automations.length > 0 && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-white/20 text-white backdrop-blur-md">
                  💾 {automations.length} saved
                </span>
              )}
            </div>
            <p className="text-white/90 text-sm">
              WhatsApp Business API auto-replies, product cards, and instant chat.
            </p>
          </div>
        </div>
      </div>

      <WhatsAppConnection
        isConnected={isConnected}
        isConnecting={isConnecting}
        onConnect={handleConnect}
        onDisconnect={handleDisconnect}
      />

      {loading ? (
        <div className="bg-white rounded-2xl p-10 border border-gray-100 text-center">
          <p className="text-sm text-gray-500">Loading WhatsApp automations...</p>
        </div>
      ) : (
        <WhatsAppAutomations
          isConnected={isConnected}
          automations={automations}
          onToggleStatus={handleToggleStatus}
          onDelete={handleDeleteAutomation}
          onCreate={handleCreateAutomation}
        />
      )}

      <WhatsAppAnalytics isConnected={isConnected} />

      <WhatsAppSettings
        isConnected={isConnected}
        onDisconnect={handleDisconnect}
        onDeleteAllAutomations={handleDeleteAllAutomations}
      />
    </div>
  );
}