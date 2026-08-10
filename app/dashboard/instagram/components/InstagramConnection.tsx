"use client";

import { useState, useEffect } from "react";

export interface InstagramAccount {
  handle: string;
  name: string;
  followers: string;
  connectedAt: string;
  status: string;
  access_token?: string;
}

interface Props {
  isConnected: boolean;
  isConnecting: boolean;
  account: InstagramAccount;
  onConnectAccount: (account: InstagramAccount) => void;
  onDisconnect: () => void;
}

function InstagramLogo({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
    </svg>
  );
}

export default function InstagramConnection({
  isConnected,
  isConnecting,
  account,
  onConnectAccount,
  onDisconnect,
}: Props) {
  const [handleInput, setHandleInput] = useState(account.handle || "");
  const [nameInput, setNameInput] = useState(account.name || "");
  const [followersInput, setFollowersInput] = useState(account.followers || "");
  const [isEditing, setIsEditing] = useState(!isConnected);

  useEffect(() => {
    if (isConnected && account.handle) {
      setHandleInput(account.handle);
      setNameInput(account.name);
      setFollowersInput(account.followers);
      setIsEditing(false);
    } else {
      setIsEditing(true);
    }
  }, [isConnected, account]);

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!handleInput.trim()) return;

    let cleanHandle = handleInput.trim();
    if (!cleanHandle.startsWith("@")) {
      cleanHandle = "@" + cleanHandle;
    }

    const newAcc: InstagramAccount = {
      handle: cleanHandle,
      name: nameInput.trim() || cleanHandle.replace("@", ""),
      followers: followersInput.trim() || "10K",
      connectedAt: "Just now",
      status: "Active",
    };

    onConnectAccount(newAcc);
    setIsEditing(false);
  };

  const handleMetaOAuth = () => {
    const appId = "1594051438990227";
    const redirectUri = encodeURIComponent("https://earnwithads.in/api/auth/instagram/callback");
    const scope = encodeURIComponent(
      "instagram_basic,instagram_manage_comments,instagram_manage_messages,pages_show_list,pages_read_engagement"
    );
    const oauthUrl = `https://www.facebook.com/v18.0/dialog/oauth?client_id=${appId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}`;
    window.location.href = oauthUrl;
  };

  return (
    <section id="connection" className="scroll-mt-6">
      <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-xl space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-4 border-b border-gray-100 pb-5">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600 via-pink-500 to-amber-500 text-white flex items-center justify-center shadow-md">
              <InstagramLogo />
            </div>
            <div>
              <h2 className="text-xl font-black text-gray-900">
                1. Connect Instagram Professional Account
              </h2>
              <p className="text-xs text-gray-500">
                Connect via Official Meta Sign-In or Enter your Instagram handle to sync automations.
              </p>
            </div>
          </div>

          {isConnected && !isEditing && (
            <div className="flex gap-2">
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-gray-100 text-gray-700 hover:bg-gray-200 transition-all"
              >
                ✏️ Change Account
              </button>
              <button
                onClick={onDisconnect}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-rose-50 text-rose-600 border border-rose-200 hover:bg-rose-100 transition-all"
              >
                🔌 Disconnect
              </button>
            </div>
          )}
        </div>

        {/* CONNECTED STATE VIEW */}
        {isConnected && !isEditing ? (
          <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-50/80 via-teal-50/50 to-white border border-emerald-200 space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-emerald-500 animate-ping" />
                <span className="text-sm font-black text-emerald-900">
                  Account Live & Connected
                </span>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-[#03856b]">
                ✓ Meta Graph API Active
              </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2">
              <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                <p className="text-[10px] font-bold text-gray-400 uppercase">Instagram Handle</p>
                <p className="text-base font-black text-gray-900 truncate">{account.handle}</p>
              </div>
              <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                <p className="text-[10px] font-bold text-gray-400 uppercase">Account Name</p>
                <p className="text-base font-black text-gray-900 truncate">{account.name}</p>
              </div>
              <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                <p className="text-[10px] font-bold text-gray-400 uppercase">Followers Count</p>
                <p className="text-base font-black text-emerald-600 truncate">{account.followers}</p>
              </div>
              <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                <p className="text-[10px] font-bold text-gray-400 uppercase">Status</p>
                <p className="text-base font-black text-emerald-600">🟢 Active 24/7</p>
              </div>
            </div>
          </div>
        ) : (
          /* DISCONNECTED / EDITING FORM VIEW (TechNerve AI Style) */
          <div className="grid md:grid-cols-2 gap-6">
            {/* Left Method: Meta Sign-In */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-50/80 to-indigo-50/50 border border-blue-100 space-y-4 flex flex-col justify-between">
              <div className="space-y-2">
                <span className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase bg-blue-100 text-blue-800 tracking-wider">
                  Method 1: Meta Official Login
                </span>
                <h3 className="text-lg font-black text-gray-900">
                  Sign in with Facebook / Meta
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Connect directly using Meta’s official Graph API OAuth dialog. Automatically syncs your Instagram Business account & pages.
                </p>
              </div>

              <button
                type="button"
                onClick={handleMetaOAuth}
                className="w-full py-3.5 px-4 rounded-xl bg-[#1877F2] text-white font-black text-sm hover:bg-blue-600 transition-all shadow-md flex items-center justify-center gap-2"
              >
                <FacebookIcon />
                Continue with Facebook / Meta Login
              </button>
            </div>

            {/* Right Method: Direct Handle Sync */}
            <form onSubmit={handleManualSubmit} className="p-6 rounded-2xl bg-gray-50/80 border border-gray-200 space-y-4">
              <div className="space-y-1">
                <span className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase bg-gray-200 text-gray-700 tracking-wider">
                  Method 2: Quick Handle Sync
                </span>
                <h3 className="text-lg font-black text-gray-900">
                  Enter Your Instagram Username
                </h3>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="text-xs font-bold text-gray-700">
                    Instagram Handle <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="@ashish_kushwaha"
                    value={handleInput}
                    onChange={(e) => setHandleInput(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 font-bold text-gray-900 text-sm focus:border-[#03856b] focus:ring-2 focus:ring-[#03856b]/20 outline-none bg-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-gray-700">Account Name</label>
                    <input
                      type="text"
                      placeholder="Ashish Kushwaha"
                      value={nameInput}
                      onChange={(e) => setNameInput(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs font-semibold bg-white"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-700">Followers</label>
                    <input
                      type="text"
                      placeholder="12.4K"
                      value={followersInput}
                      onChange={(e) => setFollowersInput(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs font-semibold bg-white"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={isConnecting}
                className="w-full py-3.5 rounded-xl text-white font-black text-sm shadow-md hover:opacity-90 transition-opacity"
                style={{
                  backgroundImage: "linear-gradient(135deg, #03856b, #04a085)",
                }}
              >
                {isConnecting ? "Connecting..." : "🚀 Save & Connect Account"}
              </button>
            </form>
          </div>
        )}
      </div>
    </section>
  );
}
