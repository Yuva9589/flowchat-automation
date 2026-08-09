"use client";

import { useState, useEffect } from "react";

import InstagramConnection, { type InstagramAccount } from "./components/InstagramConnection";
import InstagramAutomations, {
  type Automation as ComponentAutomation,
} from "./components/InstagramAutomations";
import InstagramAnalytics from "./components/InstagramAnalytics";
import InstagramSettings from "./components/InstagramSettings";

function InstagramLogo({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
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

export default function InstagramDashboardPage() {
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [account, setAccount] = useState<InstagramAccount>({
    handle: "@ashish_kushwaha",
    name: "Ashish Kushwaha",
    followers: "12.4K",
    connectedAt: "Just now",
    status: "Active",
  });

  const [automations, setAutomations] = useState<ComponentAutomation[]>([]);
  const [loading, setLoading] = useState(true);

  // Load saved Instagram connection from localStorage or OAuth code
  useEffect(() => {
    try {
      const saved = localStorage.getItem("flowchat_instagram_account");
      if (saved) {
        const parsed = JSON.parse(saved);
        setAccount(parsed);
        setIsConnected(true);
      }

      // Check if coming back from Meta OAuth redirect
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.has("code")) {
        const oauthAccount: InstagramAccount = {
          handle: "@meta_connected_creator",
          name: "Meta Verified Instagram Account",
          followers: "25.8K",
          connectedAt: "Just now",
          status: "Active",
        };
        setAccount(oauthAccount);
        setIsConnected(true);
        localStorage.setItem("flowchat_instagram_account", JSON.stringify(oauthAccount));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const loadAutomations = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/automations?platform=instagram");
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

  const handleConnectAccount = (newAcc: InstagramAccount) => {
    setIsConnecting(true);
    setTimeout(() => {
      setAccount(newAcc);
      setIsConnected(true);
      setIsConnecting(false);
      try {
        localStorage.setItem("flowchat_instagram_account", JSON.stringify(newAcc));
      } catch (e) {
        console.error(e);
      }
    }, 600);
  };

  const handleDisconnect = () => {
    setIsConnected(false);
    try {
      localStorage.removeItem("flowchat_instagram_account");
    } catch (e) {
      console.error(e);
    }
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
          platform: "instagram",
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
      alert("Failed to create automation");
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
          backgroundImage: "linear-gradient(135deg, #8b5cf6 0%, #ec4899 50%, #f97316 100%)",
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
              <h1 className="text-2xl md:text-3xl font-black text-white">Instagram</h1>
              {isConnected && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-white/20 text-white backdrop-blur-md">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Live ({account.handle})
                </span>
              )}
              {!loading && automations.length > 0 && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-white/20 text-white backdrop-blur-md">
                  💾 {automations.length} saved
                </span>
              )}
            </div>
            <p className="text-white/90 text-sm">
              Manage your Instagram automations, analytics, and settings — all in one place.
            </p>
          </div>
        </div>
      </div>

      <InstagramConnection
        isConnected={isConnected}
        isConnecting={isConnecting}
        account={account}
        onConnectAccount={handleConnectAccount}
        onDisconnect={handleDisconnect}
      />

      {loading ? (
        <div className="bg-white rounded-2xl p-10 border border-gray-100 text-center">
          <div className="inline-flex items-center gap-2 text-gray-500">
            <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" />
              <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" className="opacity-75" />
            </svg>
            <span className="text-sm">Loading your automations...</span>
          </div>
        </div>
      ) : (
        <InstagramAutomations
          isConnected={isConnected}
          automations={automations}
          onToggleStatus={handleToggleStatus}
          onDelete={handleDeleteAutomation}
          onCreate={handleCreateAutomation}
        />
      )}

      <InstagramAnalytics isConnected={isConnected} />

      <InstagramSettings
        isConnected={isConnected}
        onDisconnect={handleDisconnect}
        onDeleteAllAutomations={handleDeleteAllAutomations}
      />
    </div>
  );
}
