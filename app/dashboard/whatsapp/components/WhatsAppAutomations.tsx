"use client";

import { useState } from "react";

/* ============= Types ============= */

export interface Automation {
  id: string;
  keyword: string;
  triggerType: string; // "Incoming message" or "Broadcast"
  message: string;
  useTemplate: boolean;
  status: "active" | "paused";
  dmsSent: number;
  clicks: number;
  createdAt: string;
}

interface Props {
  isConnected: boolean;
  automations: Automation[];
  onToggleStatus: (id: string) => void;
  onDelete: (id: string) => void;
  onCreate: (auto: Automation) => void;
}

/* ============= Icons ============= */

function PlusIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

function MoreVerticalIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="1" />
      <circle cx="12" cy="5" r="1" />
      <circle cx="12" cy="19" r="1" />
    </svg>
  );
}

function BoltIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

/* ============= Main Component ============= */

export default function WhatsAppAutomations({
  isConnected,
  automations,
  onToggleStatus,
  onDelete,
  onCreate,
}: Props) {
  const [filter, setFilter] = useState<"all" | "active" | "paused">("all");
  const [menuOpenId, setMenuOpenId] = useState<string | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Create form state
  const [newKeyword, setNewKeyword] = useState("");
  const [newTriggerType, setNewTriggerType] = useState("Incoming message");
  const [newMessage, setNewMessage] = useState("");
  const [newUseTemplate, setNewUseTemplate] = useState(true);

  const activeCount = automations.filter((a) => a.status === "active").length;
  const pausedCount = automations.filter((a) => a.status === "paused").length;
  const filtered = automations.filter(
    (a) => filter === "all" || a.status === filter
  );

  const handleToggle = (id: string) => {
    onToggleStatus(id);
    setMenuOpenId(null);
  };

  const handleDelete = (id: string) => {
    onDelete(id);
    setMenuOpenId(null);
  };

  const resetForm = () => {
    setNewKeyword("");
    setNewTriggerType("Incoming message");
    setNewMessage("");
    setNewUseTemplate(true);
  };

  const handleCreate = () => {
    if (!newKeyword.trim() || !newMessage.trim()) {
      alert("Please fill keyword and message");
      return;
    }

    const newAuto: Automation = {
      id: Date.now().toString(),
      keyword: newKeyword.toUpperCase().trim(),
      triggerType: newTriggerType,
      message: newMessage,
      useTemplate: newUseTemplate,
      status: "active",
      dmsSent: 0,
      clicks: 0,
      createdAt: "Just now",
    };

    onCreate(newAuto);
    resetForm();
    setShowCreateModal(false);
  };

  return (
    <section id="automations" className="scroll-mt-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-3 flex-wrap">
        <div>
          <h2 className="text-xl font-black text-gray-900">2. Automations</h2>
          <p className="text-sm text-gray-500">
            {automations.length > 0 ? (
              <>
                <span className="font-semibold" style={{ color: "#16a34a" }}>
                  {activeCount} active
                </span>
                {pausedCount > 0 && (
                  <>
                    {" · "}
                    <span>{pausedCount} paused</span>
                  </>
                )}
              </>
            ) : (
              "No automations yet"
            )}
          </p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          disabled={!isConnected}
          className={`inline-flex items-center gap-2 text-white px-4 py-2.5 rounded-full font-semibold text-sm transition-all shadow-md ${
            !isConnected
              ? "opacity-40 cursor-not-allowed"
              : "hover:shadow-lg hover:-translate-y-0.5"
          }`}
          style={{
            backgroundImage: "linear-gradient(135deg, #22c55e, #16a34a)",
          }}
        >
          <PlusIcon />
          Create Automation
        </button>
      </div>

      {/* Content */}
      {!isConnected ? (
        <div className="bg-white rounded-2xl p-8 border border-dashed border-gray-200 text-center">
          <p className="text-sm text-gray-500">
            Connect WhatsApp first to create automations 👆
          </p>
        </div>
      ) : automations.length === 0 ? (
        <div className="bg-white rounded-2xl p-10 border border-gray-100 text-center">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center text-white mx-auto mb-3 shadow-lg"
            style={{
              backgroundImage: "linear-gradient(135deg, #22c55e, #16a34a)",
            }}
          >
            <BoltIcon />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-1">
            No automations yet
          </h3>
          <p className="text-sm text-gray-500 mb-5">
            Create your first WhatsApp automation.
          </p>
          <button
            onClick={() => setShowCreateModal(true)}
            className="inline-flex items-center gap-2 text-white px-5 py-2.5 rounded-full font-semibold text-sm transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
            style={{
              backgroundImage: "linear-gradient(135deg, #22c55e, #16a34a)",
            }}
          >
            <PlusIcon />
            Create Your First Automation
          </button>
        </div>
      ) : (
        <>
          {/* Filter Tabs */}
          <div className="flex items-center gap-1 mb-4 border-b border-gray-200">
            {[
              { key: "all", label: "All", count: automations.length },
              { key: "active", label: "Active", count: activeCount },
              { key: "paused", label: "Paused", count: pausedCount },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setFilter(tab.key as any)}
                className={`px-3 py-2 text-sm font-semibold transition-all relative ${
                  filter === tab.key
                    ? "text-gray-900"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab.label}{" "}
                <span className="text-xs opacity-60">({tab.count})</span>
                {filter === tab.key && (
                  <span
                    className="absolute bottom-0 left-0 right-0 h-0.5 rounded-t"
                    style={{ backgroundColor: "#16a34a" }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Automations List */}
          <div className="space-y-3">
            {filtered.map((a) => {
              const isMenuOpen = menuOpenId === a.id;
              return (
                <div
                  key={a.id}
                  className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-all"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      {/* Status + Keyword */}
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <span
                          className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold"
                          style={{
                            backgroundColor:
                              a.status === "active"
                                ? "rgba(34, 197, 94, 0.1)"
                                : "rgba(107, 114, 128, 0.1)",
                            color:
                              a.status === "active" ? "#16a34a" : "#6b7280",
                          }}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              a.status === "active" ? "animate-pulse" : ""
                            }`}
                            style={{
                              backgroundColor:
                                a.status === "active" ? "#16a34a" : "#6b7280",
                            }}
                          />
                          {a.status === "active" ? "Active" : "Paused"}
                        </span>
                        <span className="text-xs text-gray-500">Keyword:</span>
                        <span
                          className="px-2 py-0.5 rounded-md text-xs font-bold tracking-wide"
                          style={{
                            backgroundColor: "rgba(34, 197, 94, 0.08)",
                            color: "#16a34a",
                          }}
                        >
                          {a.keyword}
                        </span>

                        {a.useTemplate && (
                          <span className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-blue-50 text-blue-700">
                            📋 Template
                          </span>
                        )}
                      </div>

                      <p className="text-sm text-gray-700 mb-1 line-clamp-1">
                        <span className="text-gray-500">Trigger:</span>{" "}
                        {a.triggerType}
                      </p>
                      <p className="text-sm text-gray-500 mb-3 line-clamp-1 italic">
                        Reply: "{a.message}"
                      </p>

                      <div className="flex items-center gap-3 text-xs text-gray-500 flex-wrap">
                        <span>
                          <strong className="text-gray-900">{a.dmsSent}</strong>{" "}
                          messages sent
                        </span>
                        <span className="text-gray-300">·</span>
                        <span>
                          <strong className="text-gray-900">{a.clicks}</strong>{" "}
                          clicks
                        </span>
                        <span className="text-gray-300">·</span>
                        <span>Created {a.createdAt}</span>
                      </div>
                    </div>

                    {/* Menu */}
                    <div className="relative flex-shrink-0">
                      <button
                        onClick={() =>
                          setMenuOpenId(isMenuOpen ? null : a.id)
                        }
                        className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center text-gray-600"
                      >
                        <MoreVerticalIcon />
                      </button>
                      {isMenuOpen && (
                        <>
                          <div
                            className="fixed inset-0 z-10"
                            onClick={() => setMenuOpenId(null)}
                          />
                          <div className="absolute right-0 top-10 z-20 w-44 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
                            <button
                              onClick={() => handleToggle(a.id)}
                              className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                            >
                              {a.status === "active" ? "⏸ Pause" : "▶ Activate"}
                            </button>
                            <button className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                              ✏️ Edit
                            </button>
                            <div className="border-t border-gray-100" />
                            <button
                              onClick={() => handleDelete(a.id)}
                              className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                            >
                              🗑️ Delete
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}

      {/* ============================================= */}
      {/* CREATE AUTOMATION MODAL                        */}
      {/* ============================================= */}
      {showCreateModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
          onClick={() => {
            resetForm();
            setShowCreateModal(false);
          }}
        >
          <div
            className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between rounded-t-2xl z-10">
              <div>
                <h3 className="text-lg font-black text-gray-900">
                  Create WhatsApp Automation
                </h3>
                <p className="text-xs text-gray-500">
                  Set up your WhatsApp auto-reply
                </p>
              </div>
              <button
                onClick={() => {
                  resetForm();
                  setShowCreateModal(false);
                }}
                className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center text-gray-600"
              >
                <CloseIcon />
              </button>
            </div>

            {/* Form */}
            <div className="p-6 space-y-5">
              {/* Keyword */}
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-1.5">
                  1️⃣ Trigger Keyword <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={newKeyword}
                  onChange={(e) => setNewKeyword(e.target.value)}
                  placeholder="e.g. HI, PRICE, DEMO"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all text-sm font-medium uppercase tracking-wide"
                />
              </div>

              {/* Trigger Type */}
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-1.5">
                  2️⃣ Trigger Type
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {["Incoming message", "Broadcast"].map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setNewTriggerType(type)}
                      className={`px-4 py-2.5 rounded-lg text-sm font-semibold transition-all border ${
                        newTriggerType === type
                          ? "text-white border-transparent shadow-md"
                          : "text-gray-700 bg-white border-gray-200 hover:bg-gray-50"
                      }`}
                      style={
                        newTriggerType === type
                          ? {
                              backgroundImage:
                                "linear-gradient(135deg, #22c55e, #16a34a)",
                            }
                          : {}
                      }
                    >
                      {type === "Incoming message" ? "📩" : "📢"} {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-1.5">
                  3️⃣ Reply Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Hi! Thanks for reaching out. Here's your info 👉 https://your-link.com"
                  rows={4}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all text-sm resize-none"
                />
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {[
                    { label: "🔗 Insert link", text: " https://your-link.com" },
                    { label: "👋 Greeting", text: "Hi! 👋 " },
                    { label: "🎉 Emoji", text: " 🎉" },
                  ].map((snippet, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setNewMessage((prev) => prev + snippet.text)}
                      className="text-[10px] font-medium px-2 py-1 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200 transition-all"
                    >
                      {snippet.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Template toggle */}
              <div className="flex items-start justify-between gap-3 p-4 rounded-xl bg-gray-50 border border-gray-100">
                <div className="flex-1">
                  <p className="text-sm font-bold text-gray-900 mb-0.5">
                    📋 Use WhatsApp Template
                  </p>
                  <p className="text-xs text-gray-500">
                    Pre-approved template ensures higher deliverability.
                  </p>
                </div>
                <button
                  onClick={() => setNewUseTemplate(!newUseTemplate)}
                  className={`relative w-11 h-6 rounded-full transition-all flex-shrink-0 ${
                    newUseTemplate ? "" : "bg-gray-300"
                  }`}
                  style={
                    newUseTemplate
                      ? {
                          backgroundImage:
                            "linear-gradient(135deg, #22c55e, #16a34a)",
                        }
                      : {}
                  }
                >
                  <span
                    className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-all ${
                      newUseTemplate ? "left-5" : "left-0.5"
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Footer */}
            <div className="sticky bottom-0 bg-white border-t border-gray-100 px-6 py-4 flex items-center justify-end gap-2 rounded-b-2xl">
              <button
                onClick={() => {
                  resetForm();
                  setShowCreateModal(false);
                }}
                className="px-4 py-2.5 rounded-full font-semibold text-sm text-gray-700 hover:bg-gray-50 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleCreate}
                className="inline-flex items-center gap-2 text-white px-5 py-2.5 rounded-full font-semibold text-sm transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
                style={{
                  backgroundImage: "linear-gradient(135deg, #22c55e, #16a34a)",
                }}
              >
                Create Automation
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}