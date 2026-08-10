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
  const [copied, setCopied] = useState(false);

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

  const redirectUriStr = "https://earnwithads.in/api/auth/ig/callback";

  const handleInstagramDirectOAuth = () => {
    // Exact Instagram App ID from Meta Developer Console (Flowchat-IG)
    const instagramAppId = "1578162103938474";
    const redirectUri = encodeURIComponent(redirectUriStr);
    const scope = encodeURIComponent(
      "instagram_business_basic,instagram_business_manage_messages,instagram_business_manage_comments"
    );

    // Direct Instagram OAuth Login Dialog (instagram.com)
    const instagramOAuthUrl = `https://www.instagram.com/oauth/authorize/third_party/?client_id=${instagramAppId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}&enable_fb_login=1`;
    window.location.href = instagramOAuthUrl;
  };

  const handleCopyUri = () => {
    navigator.clipboard.writeText(redirectUriStr);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
                1. Connect Instagram Account
              </h2>
              <p className="text-xs text-gray-500">
                Sign in directly on Instagram.com to grant comment-to-DM permissions.
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
                  Instagram Account Connected & Active
                </span>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-[#03856b]">
                ✓ Instagram Graph API Verified
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
          /* DIRECT INSTAGRAM OAUTH & HANDLE CONNECT VIEW */
          <div className="space-y-6">
            {/* Meta Redirect URI Notice Box */}
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs space-y-2">
              <div className="flex items-center justify-between font-bold">
                <span>⚠️ Meta Developer Console Notice: Valid OAuth Redirect URI</span>
                <button
                  type="button"
                  onClick={handleCopyUri}
                  className="px-3 py-1 rounded-lg bg-amber-200 hover:bg-amber-300 font-bold text-[11px] text-amber-950 transition-colors"
                >
                  {copied ? "✓ Copied!" : "📋 Copy Redirect URI"}
                </button>
              </div>
              <p className="text-amber-800 leading-relaxed">
                Meta OAuth login ke liye is URL ko Meta Developer Portal par <b>"Valid OAuth Redirect URIs"</b> me paste karein:
              </p>
              <code className="block p-2 rounded-xl bg-amber-100/80 font-mono text-[11px] text-amber-950 break-all select-all font-bold">
                {redirectUriStr}
              </code>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Left Method: Direct Instagram.com Login */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-100 space-y-4 flex flex-col justify-between">
                <div className="space-y-2">
                  <span className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase bg-purple-100 text-purple-800 tracking-wider">
                    Method 1: Direct Instagram.com Login
                  </span>
                  <h3 className="text-lg font-black text-gray-900">
                    Connect via Instagram Login
                  </h3>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Opens official <b>Instagram.com</b> authorization page where user logs in with their Instagram ID & Password and grants permission.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleInstagramDirectOAuth}
                  className="w-full py-4 px-4 rounded-xl text-white font-black text-base shadow-lg hover:opacity-90 transition-all flex items-center justify-center gap-2"
                  style={{
                    backgroundImage: "linear-gradient(135deg, #8b5cf6, #ec4899, #f97316)",
                  }}
                >
                  <InstagramLogo size={22} />
                  📸 Log In & Connect Instagram
                </button>
              </div>

              {/* Right Method: Direct Handle Sync */}
              <form onSubmit={handleManualSubmit} className="p-6 rounded-2xl bg-gray-50/80 border border-gray-200 space-y-4">
                <div className="space-y-1">
                  <span className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase bg-gray-200 text-gray-700 tracking-wider">
                    Method 2: Quick Instagram Handle Connect
                  </span>
                  <h3 className="text-lg font-black text-gray-900">
                    Enter Instagram Username (@handle)
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
                  {isConnecting ? "Connecting..." : "🚀 Save & Connect Handle"}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
