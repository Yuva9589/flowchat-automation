"use client";

/* ============= Types ============= */

interface Props {
  isConnected: boolean;
  isConnecting: boolean;
  onConnect: () => void;
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

/* ============= Main Component ============= */

export default function InstagramConnection({
  isConnected,
  isConnecting,
  onConnect,
  onDisconnect,
}: Props) {
  return (
    <section id="connection" className="scroll-mt-6">
      {/* Section header */}
      <div className="mb-3">
        <h2 className="text-xl font-black text-gray-900">1. Connection</h2>
        <p className="text-sm text-gray-500">
          Connect your Instagram Business account to get started.
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
                  Connected
                </span>
              )}
            </div>
            <p className="text-sm text-gray-600 mb-3">
              {isConnected
                ? "Your Instagram is connected. Automations are running 24/7."
                : "One-tap secure login via official Meta API. No password sharing."}
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

          {/* Button */}
          <div className="w-full md:w-auto md:ml-4 flex-shrink-0">
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
              <button
                onClick={onDisconnect}
                className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full font-semibold text-sm border border-gray-200 text-gray-700 hover:bg-gray-50 transition-all"
              >
                Disconnect
              </button>
            ) : (
              <button
                onClick={onConnect}
                className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full font-semibold text-sm text-white transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
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
                { label: "Account", value: "@your.brand" },
                { label: "Followers", value: "12.4K" },
                { label: "Status", value: "Active", color: "#03856b" },
                { label: "Connected", value: "Just now" },
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
              100% safe & official.
            </span>{" "}
            Flowchat uses Meta's Graph API — approved for business messaging. We
            never store passwords.
          </p>
        </div>
      </div>
    </section>
  );
}