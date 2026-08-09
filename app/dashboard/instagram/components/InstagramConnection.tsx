"use client";

import { useState, useEffect } from "react";

/* ============= Types ============= */

export interface InstagramAccount {
  handle: string;
  name: string;
  followers: string;
  connectedAt: string;
  status: string;
}

interface Props {
  isConnected: boolean;
  isConnecting: boolean;
  account: InstagramAccount;
  onConnectAccount: (account: InstagramAccount) => void;
  onDisconnect: () => void;
}

/* ============= Icons ============= */

function InstagramLogo({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function CheckCircleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
    </svg>
  );
}

/* ============= Main Component ============= */

export default function InstagramConnection({
  isConnected,
  isConnecting,
  account,
  onConnectAccount,
  onDisconnect,
}: Props) {
  const [showModal, setShowModal] = useState(false);
  const [inputHandle, setInputHandle] = useState(account.handle || "@your.brand");
  const [inputName, setInputName] = useState(account.name || "Instagram Account");
  const [inputFollowers, setInputFollowers] = useState(account.followers || "12.4K");

  useEffect(() => {
    if (account.handle) {
      setInputHandle(account.handle);
      setInputName(account.name);
      setInputFollowers(account.followers);
    }
  }, [account]);

  const handleSaveManualAccount = (e: React.FormEvent) => {
    e.preventDefault();
    let cleanHandle = inputHandle.trim();
    if (!cleanHandle.startsWith("@")) {
      cleanHandle = "@" + cleanHandle;
    }

    const newAcc: InstagramAccount = {
      handle: cleanHandle,
      name: inputName.trim() || cleanHandle.replace("@", ""),
      followers: inputFollowers.trim() || "1.2K",
      connectedAt: "Just now",
      status: "Active",
    };

    onConnectAccount(newAcc);
    setShowModal(false);
  };

  const handleMetaOAuth = () => {
    const appId = "1594051438990227";
    const redirectUri = encodeURIComponent("https://earnwithads.in/dashboard/instagram");
    const scope = encodeURIComponent(
      "instagram_basic,instagram_manage_comments,instagram_manage_messages,pages_show_list,pages_read_engagement"
    );
    const oauthUrl = `https://www.facebook.com/v18.0/dialog/oauth?client_id=${appId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}`;
    window.location.href = oauthUrl;
  };

  return (
    <section id="connection" className="scroll-mt-6">
      {/* Section header */}
      <div className="mb-3">
        <h2 className="text-xl font-black text-gray-900">1. Connection</h2>
        <p className="text-sm text-gray-500">
          Connect your Instagram Business account to start automating comments & DMs.
        </p>
      </div>

      {/* Connection Card */}
      <div
        className={`bg-white rounded-2xl p-5 md:p-6 border transition-all ${
          isConnected
            ? "border-[#03856b]/30 shadow-md"
            : "border-gray-100 shadow-sm"
        }`}
      >
        <div className="flex items-start gap-4 flex-wrap md:flex-nowrap">
          {/* Icon */}
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-md flex-shrink-0"
            style={{
              backgroundImage:
                "linear-gradient(135deg, #8b5cf6 0%, #ec4899 50%, #f97316 100%)",
            }}
          >
            <InstagramLogo size={24} />
          </div>

          {/* Text */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <h3 className="text-base font-bold text-gray-900">
                Instagram Business Account
              </h3>
              {isConnected && (
                <span
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold"
                  style={{
                    backgroundColor: "rgba(3, 133, 107, 0.1)",
                    color: "#03856b",
                  }}
                >
                  <CheckCircleIcon />
                  Connected ({account.handle})
                </span>
              )}
            </div>
            <p className="text-sm text-gray-600 mb-3">
              {isConnected
                ? `Connected to ${account.handle}. Automations are active 24/7.`
                : "Connect your Instagram Professional account via Meta Login or enter your Tester handle."}
            </p>

            {/* Feature pills */}
            <div className="flex flex-wrap gap-1.5">
              {[
                "Comment-to-DM",
                "Follow-gate",
                "Story replies",
                "AI variations",
              ].map((feat) => (
                <span
                  key={feat}
                  className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-gray-100 text-gray-600"
                >
                  {feat}
                </span>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="w-full md:w-auto md:ml-4 flex-shrink-0 flex flex-col gap-2">
            {isConnecting ? (
              <button
                disabled
                className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full font-semibold text-sm text-white opacity-70 cursor-not-allowed"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, #03856b, #04a085)",
                }}
              >
                <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    className="opacity-25"
                  />
                  <path
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    className="opacity-75"
                  />
                </svg>
                Connecting...
              </button>
            ) : isConnected ? (
              <div className="flex gap-2">
                <button
                  onClick={() => setShowModal(true)}
                  className="px-4 py-2 rounded-full font-semibold text-xs border border-gray-200 text-gray-700 hover:bg-gray-50 transition-all"
                >
                  ✏️ Edit Handle
                </button>
                <button
                  onClick={onDisconnect}
                  className="px-4 py-2 rounded-full font-semibold text-xs bg-rose-50 text-rose-600 border border-rose-100 hover:bg-rose-100 transition-all"
                >
                  Disconnect
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowModal(true)}
                className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full font-semibold text-sm text-white transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, #03856b, #04a085)",
                }}
              >
                Connect Instagram →
              </button>
            )}
          </div>
        </div>

        {/* Connected details */}
        {isConnected && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Connected Account", value: account.handle },
                { label: "Followers", value: account.followers },
                { label: "Status", value: account.status || "Active", color: "#03856b" },
                { label: "Connected", value: account.connectedAt || "Just now" },
              ].map((s, i) => (
                <div key={i}>
                  <p className="text-[11px] text-gray-500 uppercase tracking-wider font-semibold mb-0.5">
                    {s.label}
                  </p>
                  <p
                    className="text-sm font-bold"
                    style={{ color: s.color || "#111827" }}
                  >
                    {s.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Safety note */}
        <div className="mt-4 pt-4 border-t border-gray-100 flex items-start gap-2 text-xs text-gray-600">
          <span className="mt-0.5" style={{ color: "#03856b" }}>
            <ShieldIcon />
          </span>
          <p>
            <span className="font-semibold text-gray-900">
              100% safe & official Meta API.
            </span>{" "}
            Flowchat uses Meta's Graph API — approved for Instagram messaging. We never ask for passwords.
          </p>
        </div>
      </div>

      {/* Connection Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 md:p-8 max-w-lg w-full shadow-2xl space-y-6 relative border border-gray-100">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 flex items-center justify-center text-sm font-bold"
            >
              ✕
            </button>

            <div className="space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-500 via-pink-500 to-amber-500 text-white flex items-center justify-center text-2xl shadow-md">
                📸
              </div>
              <h3 className="text-2xl font-black text-gray-900">
                Connect Instagram Account
              </h3>
              <p className="text-sm text-gray-500">
                Choose how you want to connect your Instagram Professional or Tester account to Flowchat.
              </p>
            </div>

            {/* Option 1: Meta OAuth */}
            <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
                Option 1: Official Meta / Facebook Login
              </span>
              <button
                type="button"
                onClick={handleMetaOAuth}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#1877F2] text-white font-bold text-sm hover:bg-blue-600 transition-colors shadow-md"
              >
                <FacebookIcon />
                Continue with Facebook / Meta Login
              </button>
            </div>

            <div className="flex items-center gap-3">
              <div className="h-px bg-gray-200 flex-1" />
              <span className="text-xs text-gray-400 font-bold uppercase">OR</span>
              <div className="h-px bg-gray-200 flex-1" />
            </div>

            {/* Option 2: Enter Tester Account Handle */}
            <form onSubmit={handleSaveManualAccount} className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-400 block">
                Option 2: Connect Your Tester Instagram Handle
              </span>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700">
                  Instagram Username / Handle <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="@ashish_kushwaha"
                  value={inputHandle}
                  onChange={(e) => setInputHandle(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#03856b] focus:ring-2 focus:ring-[#03856b]/20 outline-none text-sm font-semibold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700">Display Name</label>
                  <input
                    type="text"
                    placeholder="Ashish Kushwaha"
                    value={inputName}
                    onChange={(e) => setInputName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700">Followers Count</label>
                  <input
                    type="text"
                    placeholder="12.4K"
                    value={inputFollowers}
                    onChange={(e) => setInputFollowers(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl text-white font-bold text-sm shadow-lg hover:opacity-90 transition-opacity"
                style={{
                  backgroundImage: "linear-gradient(135deg, #03856b, #04a085)",
                }}
              >
                ✅ Save & Connect Account
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
