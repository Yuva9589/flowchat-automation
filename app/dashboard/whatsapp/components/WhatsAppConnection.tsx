"use client";

/* ============= Types ============= */

interface Props {
  isConnected: boolean;
  isConnecting: boolean;
  onConnect: () => void;
  onDisconnect: () => void;
}

/* ============= Icons ============= */

function WhatsAppLogo({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
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

export default function WhatsAppConnection({
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
          Connect your WhatsApp Business number to start automating.
        </p>
      </div>

      {/* Connection Card */}
      <div
        className={`bg-white rounded-2xl p-5 md:p-6 border transition-all ${
          isConnected
            ? "border-green-500/30 shadow-md"
            : "border-gray-100 shadow-sm"
        }`}
      >
        <div className="flex items-start gap-4 flex-wrap md:flex-nowrap">
          {/* Icon */}
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-md flex-shrink-0"
            style={{
              backgroundImage: "linear-gradient(135deg, #22c55e, #16a34a)",
            }}
          >
            <WhatsAppLogo size={24} />
          </div>

          {/* Text */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <h3 className="text-base font-bold text-gray-900">
                WhatsApp Business Account
              </h3>
              {isConnected && (
                <span
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold"
                  style={{
                    backgroundColor: "rgba(34, 197, 94, 0.1)",
                    color: "#16a34a",
                  }}
                >
                  <CheckCircleIcon />
                  Connected
                </span>
              )}
            </div>
            <p className="text-sm text-gray-600 mb-3">
              {isConnected
                ? "Your WhatsApp is connected. Auto-replies running 24/7."
                : "Connect your WhatsApp Business number via official Meta API. End-to-end encrypted."}
            </p>

            {/* Feature pills */}
            <div className="flex flex-wrap gap-1.5">
              {[
                "Keyword auto-reply",
                "Rich product cards",
                "Interactive buttons",
                "Broadcast messaging",
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
                  backgroundImage: "linear-gradient(135deg, #22c55e, #16a34a)",
                }}
              >
                <svg
                  className="animate-spin w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                >
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
                  backgroundImage: "linear-gradient(135deg, #22c55e, #16a34a)",
                }}
              >
                Connect WhatsApp →
              </button>
            )}
          </div>
        </div>

        {/* Connected details */}
        {isConnected && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Phone", value: "+91 98765 43210" },
                { label: "Business", value: "Your Brand" },
                { label: "Status", value: "Active", color: "#16a34a" },
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
          <span className="mt-0.5" style={{ color: "#16a34a" }}>
            <ShieldIcon />
          </span>
          <p>
            <span className="font-semibold text-gray-900">
              End-to-end encrypted.
            </span>{" "}
            Flowchat uses the official WhatsApp Business API. Messages are
            encrypted and comply with WhatsApp policies.
          </p>
        </div>
      </div>
    </section>
  );
}