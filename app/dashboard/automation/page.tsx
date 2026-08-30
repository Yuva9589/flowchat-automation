"use client";

import { useCallback, useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  MessageCircle,
  Plus,
  Trash2,
  Power,
  Loader2,
  CheckCircle2,
  XCircle,
  AlertTriangle,
} from "lucide-react";
import InstagramIcon from "@/components/dashboard/InstagramIcon";

/* ================= Types ================= */

interface IGAccount {
  id: string;
  ig_user_id: string;
  username: string;
  name: string;
  followers_count: number;
  profile_pic_url: string;
  status: string;
  connected_at: string;
}

interface Automation {
  id: string;
  keyword: string;
  reply_type: "dm" | "comment";
  reply_message: string;
  status: "active" | "paused";
  dms_sent: number;
  clicks: number;
  created_at: string;
}

interface DmLog {
  id: string;
  commenter_username: string;
  comment_text: string;
  reply_sent: string;
  status: string;
  error: string | null;
  created_at: string;
}

/* ================= Page ================= */

function AutomationContent() {
  const searchParams = useSearchParams();

  const [account, setAccount] = useState<IGAccount | null>(null);
  const [automations, setAutomations] = useState<Automation[]>([]);
  const [logs, setLogs] = useState<DmLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [connecting, setConnecting] = useState(false);

  // Rule form
  const [keyword, setKeyword] = useState("");
  const [replyType, setReplyType] = useState<"dm" | "comment">("dm");
  const [replyMessage, setReplyMessage] = useState("");
  const [saving, setSaving] = useState(false);

  const [flash, setFlash] = useState<{ ok: boolean; text: string } | null>(null);

  const notify = (ok: boolean, text: string) => {
    setFlash({ ok, text });
    setTimeout(() => setFlash(null), 6000);
  };

  // OAuth callback params (connected=true / error=...)
  const connected = searchParams.get("connected");
  const oauthError = searchParams.get("error");
  const handle = searchParams.get("handle");

  const loadData = useCallback(async () => {
    try {
      const [accRes, autoRes] = await Promise.all([
        fetch("/api/instagram/account"),
        fetch("/api/automations"),
      ]);
      if (accRes.ok) {
        const d = await accRes.json();
        setAccount(d.account || null);
      }
      if (autoRes.ok) {
        const d = await autoRes.json();
        setAutomations(d.automations || []);
        setLogs(d.logs || []);
      }
    } catch (err) {
      console.error("Load error:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  useEffect(() => {
    if (connected === "true") {
      notify(true, `Instagram connected${handle ? ` as ${handle}` : ""}! 🎉`);
    }
    if (oauthError) {
      notify(false, oauthError);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connected, oauthError]);

  /* ---------- Actions ---------- */

  const handleDisconnect = async () => {
    if (!confirm("Disconnect Instagram? Your rules stay saved but AutoDM will pause."))
      return;
    setBusyId("disconnect");
    try {
      const res = await fetch("/api/instagram/account", { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed");
      setAccount(null);
      notify(true, "Instagram disconnected.");
    } catch (err: any) {
      notify(false, err.message || "Disconnect failed");
    } finally {
      setBusyId(null);
    }
  };

  const handleCreateRule = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!keyword.trim() || !replyMessage.trim()) {
      notify(false, "Keyword and reply message are required.");
      return;
    }
    setSaving(true);
    try {
      const res = await fetch("/api/automations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          keyword: keyword.trim(),
          reply_type: replyType,
          reply_message: replyMessage.trim(),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to create rule");
      setAutomations((prev) => [data.automation, ...prev]);
      setKeyword("");
      setReplyMessage("");
      notify(true, `Rule created! Comment "${keyword.trim()}" → auto-${replyType.toUpperCase()}.`);
    } catch (err: any) {
      notify(false, err.message || "Failed to create rule");
    } finally {
      setSaving(false);
    }
  };

  const handleToggle = async (rule: Automation) => {
    setBusyId(rule.id);
    try {
      const res = await fetch(`/api/automations/${rule.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: rule.status === "active" ? "paused" : "active",
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed");
      setAutomations((prev) =>
        prev.map((r) => (r.id === rule.id ? data.automation : r))
      );
    } catch (err: any) {
      notify(false, err.message || "Toggle failed");
    } finally {
      setBusyId(null);
    }
  };

  const handleDelete = async (rule: Automation) => {
    if (!confirm(`Delete rule "${rule.keyword}"?`)) return;
    setBusyId(rule.id);
    try {
      const res = await fetch(`/api/automations/${rule.id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete");
      setAutomations((prev) => prev.filter((r) => r.id !== rule.id));
      notify(true, "Rule deleted.");
    } catch (err: any) {
      notify(false, err.message || "Delete failed");
    } finally {
      setBusyId(null);
    }
  };

  const handleRefresh = async () => {
    setBusyId("refresh");
    await loadData();
    setBusyId(null);
    notify(true, "Refreshed.");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <Loader2 className="animate-spin text-[#03856b]" size={28} />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Flash message */}
      {flash && (
        <div
          className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold ${
            flash.ok
              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
              : "bg-red-50 text-red-700 border border-red-200"
          }`}
        >
          {flash.ok ? <CheckCircle2 size={16} /> : <AlertTriangle size={16} />}
          {flash.text}
        </div>
      )}

      {/* ===== CONNECT SECTION ===== */}
      {!account ? (
        <div
          className="rounded-3xl p-8 md:p-12 text-white relative overflow-hidden shadow-xl"
          style={{
            backgroundImage:
              "linear-gradient(120deg, #4f46e5 0%, #8b5cf6 35%, #ec4899 70%, #f97316 100%)",
          }}
        >
          <div className="absolute -top-10 -right-10 w-56 h-56 rounded-full bg-white/10 blur-3xl" />
          <div className="relative max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-xs font-bold uppercase tracking-wider">
              <InstagramIcon size={14} /> Step 1 of 2
            </div>
            <h1 className="text-2xl md:text-3xl font-black mt-4 leading-snug">
              Connect your Instagram account
            </h1>
            <p className="text-sm text-white/85 mt-2 leading-relaxed">
              One tap with Instagram&apos;s official login. No password, no Facebook
              page, no code. Takes about 10 seconds. Your account must be a
              <b> Professional (Business/Creator)</b> account linked to a Facebook Page.
            </p>
            <a
              href="/api/auth/instagram/login"
              onClick={() => setConnecting(true)}
              className="inline-flex items-center gap-2 bg-white text-gray-900 px-6 py-3.5 rounded-full font-black text-sm shadow-lg hover:shadow-2xl hover:-translate-y-0.5 transition-all mt-6"
            >
              {connecting ? (
                <Loader2 className="animate-spin" size={18} />
              ) : (
                <InstagramIcon size={18} color="#ec4899" />
              )}
              Connect Instagram
            </a>
            <div className="flex flex-wrap gap-4 mt-6 text-[11px] text-white/75">
              <span className="inline-flex items-center gap-1">
                <CheckCircle2 size={13} /> Official Meta login
              </span>
              <span className="inline-flex items-center gap-1">
                <CheckCircle2 size={13} /> We never see your password
              </span>
              <span className="inline-flex items-center gap-1">
                <CheckCircle2 size={13} /> Disconnect anytime
              </span>
            </div>
          </div>
        </div>
      ) : (
        /* ===== CONNECTED ACCOUNT CARD ===== */
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            {account.profile_pic_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={account.profile_pic_url}
                alt={account.username}
                className="w-16 h-16 rounded-full border-4 border-pink-100 object-cover"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#8b5cf6] to-[#ec4899] flex items-center justify-center text-white text-xl font-black">
                @
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="text-lg font-black text-gray-900">
                {account.username}{" "}
                <span className="inline-flex items-center gap-1 ml-1 align-middle px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase">
                  <CheckCircle2 size={11} /> Connected
                </span>
              </p>
              <p className="text-sm text-gray-500">
                {account.followers_count?.toLocaleString("en-IN") || 0} followers · connected{" "}
                {new Date(account.connected_at).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleRefresh}
                className="px-4 py-2 rounded-xl border border-gray-200 text-xs font-bold text-gray-600 hover:bg-gray-50"
              >
                Refresh
              </button>
              <button
                onClick={handleDisconnect}
                disabled={busyId === "disconnect"}
                className="px-4 py-2 rounded-xl border border-red-200 text-red-600 text-xs font-bold hover:bg-red-50"
              >
                Disconnect
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===== CREATE RULE ===== */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
        <div className="flex items-center gap-2 mb-1">
          <MessageCircle size={18} style={{ color: "#03856b" }} />
          <h2 className="font-black text-gray-900">Create AutoDM rule</h2>
        </div>
        <p className="text-xs text-gray-500 mb-5">
          When someone comments your keyword on any post, Flowchat sends your message
          automatically — 24/7.
        </p>

        <form onSubmit={handleCreateRule} className="grid md:grid-cols-12 gap-3">
          <div className="md:col-span-3">
            <label className="text-[11px] font-black text-gray-500 uppercase tracking-wide">
              Trigger keyword
            </label>
            <input
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="e.g. PRICE"
              className="mt-1.5 w-full px-4 py-3 rounded-xl border border-gray-200 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#03856b]/30 focus:border-[#03856b]"
            />
          </div>
          <div className="md:col-span-2">
            <label className="text-[11px] font-black text-gray-500 uppercase tracking-wide">
              Reply as
            </label>
            <select
              value={replyType}
              onChange={(e) => setReplyType(e.target.value as "dm" | "comment")}
              className="mt-1.5 w-full px-3 py-3 rounded-xl border border-gray-200 text-sm font-semibold bg-white focus:outline-none focus:ring-2 focus:ring-[#03856b]/30"
            >
              <option value="dm">💬 DM (private)</option>
              <option value="comment">💭 Comment reply</option>
            </select>
          </div>
          <div className="md:col-span-5">
            <label className="text-[11px] font-black text-gray-500 uppercase tracking-wide">
              Reply message
            </label>
            <input
              value={replyMessage}
              onChange={(e) => setReplyMessage(e.target.value)}
              placeholder="Hey! Thanks for your interest — check your DMs 🎉"
              className="mt-1.5 w-full px-4 py-3 rounded-xl border border-gray-200 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#03856b]/30 focus:border-[#03856b]"
            />
          </div>
          <div className="md:col-span-2 flex items-end">
            <button
              type="submit"
              disabled={saving || !account}
              className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl bg-[#03856b] text-white text-sm font-black hover:bg-[#04a085] disabled:opacity-40 transition-colors"
            >
              {saving ? <Loader2 className="animate-spin" size={16} /> : <Plus size={16} />}
              Add rule
            </button>
          </div>
        </form>
        {!account && (
          <p className="mt-3 text-[11px] text-amber-600 font-semibold">
            ⚠️ Connect Instagram first to activate rules.
          </p>
        )}
      </div>

      {/* ===== RULES LIST ===== */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="font-black text-gray-900 text-sm">
            Your rules ({automations.length})
          </h2>
        </div>
        {automations.length === 0 ? (
          <div className="p-10 text-center text-sm text-gray-400">
            No rules yet. Create your first rule above ☝️
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            {automations.map((rule) => (
              <div key={rule.id} className="px-6 py-4 flex items-center gap-4 flex-wrap">
                <button
                  onClick={() => handleToggle(rule)}
                  disabled={busyId === rule.id}
                  title={rule.status === "active" ? "Pause rule" : "Activate rule"}
                  className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors ${
                    rule.status === "active"
                      ? "bg-emerald-50 text-emerald-600 hover:bg-emerald-100"
                      : "bg-gray-100 text-gray-400 hover:bg-gray-200"
                  }`}
                >
                  <Power size={15} />
                </button>

                <div className="flex-1 min-w-[220px]">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-2.5 py-1 rounded-lg bg-gray-900 text-white text-xs font-black">
                      {rule.keyword}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase ${
                        rule.reply_type === "dm"
                          ? "bg-purple-50 text-purple-600"
                          : "bg-sky-50 text-sky-600"
                      }`}
                    >
                      {rule.reply_type === "dm" ? "DM" : "Comment reply"}
                    </span>
                    <span
                      className={`text-[10px] font-black uppercase ${
                        rule.status === "active" ? "text-emerald-600" : "text-gray-400"
                      }`}
                    >
                      {rule.status}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1.5 truncate">
                    → {rule.reply_message}
                  </p>
                </div>

                <div className="text-right shrink-0">
                  <p className="text-lg font-black text-[#03856b]">{rule.dms_sent}</p>
                  <p className="text-[10px] text-gray-400 uppercase font-bold">DMs sent</p>
                </div>

                <button
                  onClick={() => handleDelete(rule)}
                  disabled={busyId === rule.id}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-300 hover:text-red-500 hover:bg-red-50 transition-colors"
                  title="Delete rule"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ===== ACTIVITY LOG ===== */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="font-black text-gray-900 text-sm">Activity log</h2>
        </div>
        {logs.length === 0 ? (
          <div className="p-10 text-center text-sm text-gray-400">
            No DM activity yet — when someone comments your keyword, it will appear here
            instantly.
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            {logs.map((log) => (
              <div key={log.id} className="px-6 py-3.5 flex items-center gap-3 text-sm">
                {log.status === "sent" ? (
                  <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
                ) : (
                  <XCircle size={16} className="text-red-400 shrink-0" />
                )}
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-gray-900 text-xs">
                    @{log.commenter_username || "unknown"}{" "}
                    <span className="font-normal text-gray-400">
                      commented “{log.comment_text?.slice(0, 40)}
                      {log.comment_text?.length > 40 ? "…" : ""}”
                    </span>
                  </p>
                  <p className="text-[11px] text-gray-500 truncate">
                    {log.status === "sent"
                      ? `Sent: ${log.reply_sent}`
                      : `Failed: ${log.error || "unknown error"}`}
                  </p>
                </div>
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

export default function AutomationPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center py-24">
          <Loader2 className="animate-spin text-[#03856b]" size={28} />
        </div>
      }
    >
      <AutomationContent />
    </Suspense>
  );
}
