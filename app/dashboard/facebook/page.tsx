"use client";

import { useState, useEffect } from "react";

import FacebookConnection from "./components/FacebookConnection";
import FacebookAutomations, {
  type Automation as ComponentAutomation,
} from "./components/FacebookAutomations";
import FacebookAnalytics from "./components/FacebookAnalytics";
import FacebookSettings from "./components/FacebookSettings";

function FacebookLogo({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
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
    postCaption: db.post_caption || "No post caption set",
    message: db.reply_message,
    followGate: db.follow_gate,
    status: db.status,
    dmsSent: db.dms_sent,
    clicks: db.clicks,
    createdAt: timeAgo(db.created_at),
    postUrl: db.post_url,
    postType: db.post_type,
    triggerScope: db.trigger_scope || "all",
  };
}

export default function FacebookDashboardPage() {
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [automations, setAutomations] = useState<ComponentAutomation[]>([]);
  const [loading, setLoading] = useState(true);

  const loadAutomations = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/automations?platform=facebook");
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
          platform: "facebook",
          keyword: newAuto.keyword,
          post_caption: newAuto.postCaption,
          reply_message: newAuto.message,
          follow_gate: newAuto.followGate,
          post_url: newAuto.postUrl || null,
          post_type: newAuto.postType || "all",
          trigger_scope: newAuto.triggerScope || "all",
        }),
      });

      if (!res.ok) throw new Error("Failed to create");
      const { automation: dbAuto } = await res.json();
      setAutomations((prev) => [dbToComponent(dbAuto), ...prev]);
    } catch (err) {
      console.error(err);
      alert("Failed to create Facebook automation");
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
              {!loading && automations.length > 0 && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-white/20 text-white backdrop-blur-md">
                  💾 {automations.length} saved
                </span>
              )}
            </div>
            <p className="text-white/90 text-sm">
              Auto-DM commenters on your Page posts, ads, and Reels — all in
              one place.
            </p>
          </div>
        </div>
      </div>

      <FacebookConnection
        isConnected={isConnected}
        isConnecting={isConnecting}
        onConnect={handleConnect}
        onDisconnect={handleDisconnect}
      />

      {loading ? (
        <div className="bg-white rounded-2xl p-10 border border-gray-100 text-center">
          <p className="text-sm text-gray-500">Loading Facebook automations...</p>
        </div>
      ) : (
        <FacebookAutomations
          isConnected={isConnected}
          automations={automations}
          onToggleStatus={handleToggleStatus}
          onDelete={handleDeleteAutomation}
          onCreate={handleCreateAutomation}
        />
      )}

      <FacebookAnalytics isConnected={isConnected} />

      <FacebookSettings
        isConnected={isConnected}
        onDisconnect={handleDisconnect}
        onDeleteAllAutomations={handleDeleteAllAutomations}
      />
    </div>
  );
}