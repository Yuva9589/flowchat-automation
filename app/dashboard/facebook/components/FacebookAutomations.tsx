"use client";

import { useState } from "react";

/* ============= Types ============= */

export interface Automation {
  id: string;
  keyword: string;
  postCaption: string;
  message: string;
  followGate: boolean;
  status: "active" | "paused";
  dmsSent: number;
  clicks: number;
  createdAt: string;
  postUrl?: string | null;
  postType?: string | null;
  triggerScope?: string;
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

function LinkIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  );
}

function ExternalLinkIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

/* ============= Main Component ============= */

export default function FacebookAutomations({
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
  const [triggerScope, setTriggerScope] = useState<"specific" | "all">("specific");
  const [postUrl, setPostUrl] = useState("");
  const [newKeyword, setNewKeyword] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [newFollowGate, setNewFollowGate] = useState(true);

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
    setTriggerScope("specific");
    setPostUrl("");
    setNewKeyword("");
    setNewMessage("");
    setNewFollowGate(true);
  };

  const handleCreate = () => {
    if (!newKeyword.trim() || !newMessage.trim()) {
      alert("Please fill keyword and message");
      return;
    }

    if (triggerScope === "specific" && !postUrl.trim()) {
      alert("Please paste the Facebook post/ad URL");
      return;
    }

    const postCaption =
      triggerScope === "specific" && postUrl.trim()
        ? `📄 FB Post/Ad Link · ${postUrl.slice(0, 25)}...`
        : "🌐 Applies to all page posts";

    const newAuto: Automation = {
      id: Date.now().toString(),
      keyword: newKeyword.toUpperCase().trim(),
      postCaption,
      message: newMessage,
      followGate: newFollowGate,
      status: "active",
      dmsSent: 0,
      clicks: 0,
      createdAt: "Just now",
      postUrl: triggerScope === "specific" ? postUrl : null,
      postType: triggerScope === "specific" ? "facebook_post" : "all",
      triggerScope,
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
                <span className="font-semibold" style={{ color: "#2563eb" }}>
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
            backgroundImage: "linear-gradient(135deg, #2563eb, #3b82f6)",
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
            Connect Facebook first to create automations 👆
          </p>
        </div>
      ) : automations.length === 0 ? (
        <div className="bg-white rounded-2xl p-10 border border-gray-100 text-center">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center text-white mx-auto mb-3 shadow-lg"
            style={{
              backgroundImage: "linear-gradient(135deg, #2563eb, #3b82f6)",
            }}
          >
            <BoltIcon />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-1">
            No automations yet
          </h3>
          <p className="text-sm text-gray-500 mb-5">
            Create your first Facebook Page automation.
          </p>
          <button
            onClick={() => setShowCreateModal(true)}
            className="inline-flex items-center gap-2 text-white px-5 py-2.5 rounded-full font-semibold text-sm transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
            style={{
              backgroundImage: "linear-gradient(135deg, #2563eb, #3b82f6)",
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
                    style={{ backgroundColor: "#2563eb" }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Automations List */}
          <div className="space-y-3">
            {filtered.map((a) => {
              const isMenuOpen = menuOpenId === a.id;
              const isSpecific = a.triggerScope === "specific" && a.postUrl;

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
                                ? "rgba(37, 99, 235, 0.1)"
                                : "rgba(107, 114, 128, 0.1)",
                            color:
                              a.status === "active" ? "#2563eb" : "#6b7280",
                          }}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              a.status === "active" ? "animate-pulse" : ""
                            }`}
                            style={{
                              backgroundColor:
                                a.status === "active" ? "#2563eb" : "#6b7280",
                            }}
                          />
                          {a.status === "active" ? "Active" : "Paused"}
                        </span>
                        <span className="text-xs text-gray-500">Keyword:</span>
                        <span
                          className="px-2 py-0.5 rounded-md text-xs font-bold tracking-wide"
                          style={{
                            backgroundColor: "rgba(37, 99, 235, 0.08)",
                            color: "#2563eb",
                          }}
                        >
                          {a.keyword}
                        </span>

                        <span className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-blue-50 text-blue-700">
                          📄 Facebook Post
                        </span>

                        {a.followGate && (
                          <span className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-purple-50 text-purple-700">
                            🛡️ Follow-gate
                          </span>
                        )}
                      </div>

                      {isSpecific && (
                        <a
                          href={a.postUrl!}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 hover:underline mb-1 max-w-full"
                        >
                          <LinkIcon />
                          <span className="truncate">{a.postUrl}</span>
                          <ExternalLinkIcon />
                        </a>
                      )}

                      {!isSpecific && (
                        <p className="text-xs text-gray-500 mb-1">
                          🌐 Applies to <strong>all posts</strong> on your page
                        </p>
                      )}

                      <p className="text-sm text-gray-500 mb-3 line-clamp-1 italic">
                        Reply: "{a.message}"
                      </p>

                      <div className="flex items-center gap-3 text-xs text-gray-500 flex-wrap">
                        <span>
                          <strong className="text-gray-900">{a.dmsSent}</strong>{" "}
                          DMs sent
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
      {/* CREATE AUTOMATION MODAL (WITH POST SELECTOR)  */}
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
                  Create Facebook Automation
                </h3>
                <p className="text-xs text-gray-500">
                  Set up keyword auto-DM for Facebook Page
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
              {/* STEP 1: Which post? */}
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">
                  1️⃣ Which post/ad triggers this? <span className="text-red-500">*</span>
                </label>

                <div className="grid grid-cols-2 gap-2 mb-3">
                  <button
                    type="button"
                    onClick={() => setTriggerScope("specific")}
                    className={`p-3 rounded-xl border-2 text-left transition-all ${
                      triggerScope === "specific"
                        ? "border-blue-600 bg-blue-50/50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="text-lg mb-0.5">🎯</div>
                    <p className="text-xs font-bold text-gray-900">Specific post</p>
                    <p className="text-[10px] text-gray-500">Page post or ad link</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setTriggerScope("all")}
                    className={`p-3 rounded-xl border-2 text-left transition-all ${
                      triggerScope === "all"
                        ? "border-blue-600 bg-blue-50/50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="text-lg mb-0.5">🌐</div>
                    <p className="text-xs font-bold text-gray-900">All posts</p>
                    <p className="text-[10px] text-gray-500">Apply to everything</p>
                  </button>
                </div>

                {triggerScope === "specific" && (
                  <div>
                    <input
                      type="url"
                      value={postUrl}
                      onChange={(e) => setPostUrl(e.target.value)}
                      placeholder="https://www.facebook.com/permalink.php?story_fbid=..."
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
                    />
                    <p className="text-[11px] text-gray-500 mt-1">
                      Paste the Facebook post or ad link.
                    </p>
                  </div>
                )}
              </div>

              {/* STEP 2: Keyword */}
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-1.5">
                  2️⃣ Trigger Keyword <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={newKeyword}
                  onChange={(e) => setNewKeyword(e.target.value)}
                  placeholder="e.g. OFFER, INFO, DEMO"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm font-medium uppercase tracking-wide"
                />
              </div>

              {/* STEP 3: Message */}
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-1.5">
                  3️⃣ Messenger DM Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Hey! Here's your link 👉 https://your-link.com"
                  rows={4}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm resize-none"
                />
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {[
                    { label: "🔗 Insert link", text: " https://your-link.com" },
                    { label: "👋 Greeting", text: "Hey! 👋 " },
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

              {/* Follow-gate */}
              <div className="flex items-start justify-between gap-3 p-4 rounded-xl bg-gray-50 border border-gray-100">
                <div className="flex-1">
                  <p className="text-sm font-bold text-gray-900 mb-0.5">
                    🛡️ Follow-gate
                  </p>
                  <p className="text-xs text-gray-500">
                    Require page like before sending automated message.
                  </p>
                </div>
                <button
                  onClick={() => setNewFollowGate(!newFollowGate)}
                  className={`relative w-11 h-6 rounded-full transition-all flex-shrink-0 ${
                    newFollowGate ? "" : "bg-gray-300"
                  }`}
                  style={
                    newFollowGate
                      ? {
                          backgroundImage:
                            "linear-gradient(135deg, #2563eb, #3b82f6)",
                        }
                      : {}
                  }
                >
                  <span
                    className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-all ${
                      newFollowGate ? "left-5" : "left-0.5"
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
                  backgroundImage: "linear-gradient(135deg, #2563eb, #3b82f6)",
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