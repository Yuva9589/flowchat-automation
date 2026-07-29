"use client";

import { useState } from "react";

/* ============= Types ============= */

interface Props {
  isConnected: boolean;
  onDisconnect: () => void;
  onDeleteAllAutomations: () => void;
}

/* ============= Main Component ============= */

export default function InstagramSettings({
  isConnected,
  onDisconnect,
  onDeleteAllAutomations,
}: Props) {
  // Automation preferences
  const [aiRewriting, setAiRewriting] = useState(true);
  const [defaultFollowGate, setDefaultFollowGate] = useState(true);
  const [storyReplies, setStoryReplies] = useState(true);
  const [publicReplies, setPublicReplies] = useState(false);

  // Notifications
  const [emailNotif, setEmailNotif] = useState(true);
  const [weeklyReport, setWeeklyReport] = useState(true);

  // Language
  const [language, setLanguage] = useState<"en" | "hinglish" | "hindi">("en");

  // Disconnect confirmation modal
  const [showDisconnectConfirm, setShowDisconnectConfirm] = useState(false);

  const handleConfirmDisconnect = () => {
    onDisconnect();
    setShowDisconnectConfirm(false);
  };

  const handleDeleteAll = () => {
    if (
      confirm(
        "Are you sure? This will delete ALL Instagram automations permanently."
      )
    ) {
      onDeleteAllAutomations();
    }
  };

  return (
    <section id="settings" className="scroll-mt-6">
      {/* Header */}
      <div className="mb-3">
        <h2 className="text-xl font-black text-gray-900">4. Settings</h2>
        <p className="text-sm text-gray-500">
          Configure your Instagram automation preferences.
        </p>
      </div>

      {!isConnected ? (
        <div className="bg-white rounded-2xl p-8 border border-dashed border-gray-200 text-center">
          <p className="text-sm text-gray-500">
            Connect Instagram to access settings ⚙️
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {/* ================================== */}
          {/* Card 1 — Automation Preferences   */}
          {/* ================================== */}
          <div className="bg-white rounded-2xl p-5 md:p-6 border border-gray-100 shadow-sm">
            <div className="mb-4 pb-4 border-b border-gray-100">
              <h3 className="text-base font-bold text-gray-900 mb-1">
                🤖 Automation Preferences
              </h3>
              <p className="text-xs text-gray-500">
                Set default behavior for all new automations.
              </p>
            </div>

            <div className="space-y-4">
              {[
                {
                  label: "AI Message Rewriting",
                  desc: "Rewrite each DM uniquely to avoid spam detection.",
                  value: aiRewriting,
                  setter: setAiRewriting,
                  icon: "✨",
                },
                {
                  label: "Default Follow-Gate",
                  desc: "Ask users to follow before sending link (recommended).",
                  value: defaultFollowGate,
                  setter: setDefaultFollowGate,
                  icon: "🛡️",
                },
                {
                  label: "Story Reply Auto-Answer",
                  desc: "Auto-respond to story replies with polls & stickers.",
                  value: storyReplies,
                  setter: setStoryReplies,
                  icon: "📸",
                },
                {
                  label: "Public Comment Reply",
                  desc: "Reply publicly on the comment + send DM.",
                  value: publicReplies,
                  setter: setPublicReplies,
                  icon: "💬",
                },
              ].map((s, i) => (
                <div key={i} className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span>{s.icon}</span>
                      <p className="text-sm font-bold text-gray-900">
                        {s.label}
                      </p>
                    </div>
                    <p className="text-xs text-gray-500 ml-6">{s.desc}</p>
                  </div>
                  <button
                    onClick={() => s.setter(!s.value)}
                    className={`relative w-11 h-6 rounded-full transition-all flex-shrink-0 ${
                      s.value ? "" : "bg-gray-300"
                    }`}
                    style={
                      s.value
                        ? {
                            backgroundImage:
                              "linear-gradient(135deg, #03856b, #04a085)",
                          }
                        : {}
                    }
                  >
                    <span
                      className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-all ${
                        s.value ? "left-5" : "left-0.5"
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* ================================== */}
          {/* Card 2 — Reply Language           */}
          {/* ================================== */}
          <div className="bg-white rounded-2xl p-5 md:p-6 border border-gray-100 shadow-sm">
            <div className="mb-4 pb-4 border-b border-gray-100">
              <h3 className="text-base font-bold text-gray-900 mb-1">
                🌐 Reply Language
              </h3>
              <p className="text-xs text-gray-500">
                AI will generate replies in this language.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {[
                { key: "en", label: "English", flag: "🇬🇧" },
                { key: "hinglish", label: "Hinglish", flag: "🇮🇳" },
                { key: "hindi", label: "हिंदी", flag: "🇮🇳" },
              ].map((lang) => (
                <button
                  key={lang.key}
                  onClick={() => setLanguage(lang.key as any)}
                  className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-all border ${
                    language === lang.key
                      ? "text-white border-transparent shadow-md"
                      : "text-gray-700 bg-white border-gray-200 hover:bg-gray-50"
                  }`}
                  style={
                    language === lang.key
                      ? {
                          backgroundImage:
                            "linear-gradient(135deg, #03856b, #04a085)",
                        }
                      : {}
                  }
                >
                  <span className="mr-1.5">{lang.flag}</span>
                  {lang.label}
                </button>
              ))}
            </div>
          </div>

          {/* ================================== */}
          {/* Card 3 — Notifications            */}
          {/* ================================== */}
          <div className="bg-white rounded-2xl p-5 md:p-6 border border-gray-100 shadow-sm">
            <div className="mb-4 pb-4 border-b border-gray-100">
              <h3 className="text-base font-bold text-gray-900 mb-1">
                🔔 Notifications
              </h3>
              <p className="text-xs text-gray-500">
                Get email updates about your automations.
              </p>
            </div>

            <div className="space-y-4">
              {[
                {
                  label: "Email Notifications",
                  desc: "Get alerts when automations trigger.",
                  value: emailNotif,
                  setter: setEmailNotif,
                  icon: "📧",
                },
                {
                  label: "Weekly Performance Report",
                  desc: "Receive analytics summary every Monday.",
                  value: weeklyReport,
                  setter: setWeeklyReport,
                  icon: "📊",
                },
              ].map((s, i) => (
                <div key={i} className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span>{s.icon}</span>
                      <p className="text-sm font-bold text-gray-900">
                        {s.label}
                      </p>
                    </div>
                    <p className="text-xs text-gray-500 ml-6">{s.desc}</p>
                  </div>
                  <button
                    onClick={() => s.setter(!s.value)}
                    className={`relative w-11 h-6 rounded-full transition-all flex-shrink-0 ${
                      s.value ? "" : "bg-gray-300"
                    }`}
                    style={
                      s.value
                        ? {
                            backgroundImage:
                              "linear-gradient(135deg, #03856b, #04a085)",
                          }
                        : {}
                    }
                  >
                    <span
                      className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-all ${
                        s.value ? "left-5" : "left-0.5"
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* ================================== */}
          {/* Card 4 — Danger Zone              */}
          {/* ================================== */}
          <div className="bg-white rounded-2xl p-5 md:p-6 border-2 border-red-200 shadow-sm">
            <div className="mb-4 pb-4 border-b border-red-100">
              <h3 className="text-base font-bold text-red-600 mb-1">
                ⚠️ Danger Zone
              </h3>
              <p className="text-xs text-gray-500">
                Irreversible actions. Proceed with caution.
              </p>
            </div>

            <div className="space-y-3">
              {/* Disconnect */}
              <div className="flex items-start justify-between gap-3 flex-wrap">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-gray-900 mb-0.5">
                    Disconnect Instagram Account
                  </p>
                  <p className="text-xs text-gray-500">
                    All automations will stop. Data preserved for 30 days.
                  </p>
                </div>
                <button
                  onClick={() => setShowDisconnectConfirm(true)}
                  className="px-4 py-2 rounded-full font-semibold text-xs border border-red-200 text-red-600 hover:bg-red-50 transition-all"
                >
                  Disconnect
                </button>
              </div>

              {/* Delete all */}
              <div className="flex items-start justify-between gap-3 flex-wrap pt-3 border-t border-red-100">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-gray-900 mb-0.5">
                    Delete All Automations
                  </p>
                  <p className="text-xs text-gray-500">
                    Permanently delete all Instagram automations. This cannot
                    be undone.
                  </p>
                </div>
                <button
                  onClick={handleDeleteAll}
                  className="px-4 py-2 rounded-full font-semibold text-xs bg-red-600 text-white hover:bg-red-700 transition-all"
                >
                  Delete All
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================================== */}
      {/* Disconnect Confirmation Modal      */}
      {/* ================================== */}
      {showDisconnectConfirm && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
          onClick={() => setShowDisconnectConfirm(false)}
        >
          <div
            className="bg-white rounded-2xl w-full max-w-sm p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center mb-5">
              <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center text-3xl mx-auto mb-3">
                ⚠️
              </div>
              <h3 className="text-lg font-black text-gray-900 mb-1">
                Disconnect Instagram?
              </h3>
              <p className="text-sm text-gray-600">
                All your automations will stop working. You can reconnect
                anytime.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowDisconnectConfirm(false)}
                className="flex-1 px-4 py-2.5 rounded-full font-semibold text-sm text-gray-700 border border-gray-200 hover:bg-gray-50 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDisconnect}
                className="flex-1 px-4 py-2.5 rounded-full font-semibold text-sm bg-red-600 text-white hover:bg-red-700 transition-all"
              >
                Yes, Disconnect
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}