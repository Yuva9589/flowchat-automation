"use client";

import { useEffect, useState } from "react";

/* ============= Custom SVG Icons ============= */

function ShieldIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <polyline points="9 12 11 14 15 10" />
    </svg>
  );
}

function SparklesIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" />
    </svg>
  );
}

function CameraIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
      <circle cx="12" cy="13" r="4" />
    </svg>
  );
}

function ChatIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}

function KeyIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
    </svg>
  );
}

function FileIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
    </svg>
  );
}

function StoreIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}

function ChartIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  );
}

/* ============= Features Data ============= */

const features = [
  {
    Icon: ShieldIcon,
    title: "Follow-Gate",
    text: "Ask if they follow before delivering. Every request becomes a follower.",
    gradient: "linear-gradient(135deg, #03856b, #04a085)",
  },
  {
    Icon: SparklesIcon,
    title: "AI Variations",
    text: "Every DM is rewritten uniquely. Never looks spammy, keeps you safe.",
    gradient: "linear-gradient(135deg, #8b5cf6, #a855f7)",
  },
  {
    Icon: CameraIcon,
    title: "Story Auto-Reply",
    text: "Poll or DM sticker replies answered instantly, 24/7.",
    gradient: "linear-gradient(135deg, #ec4899, #f472b6)",
  },
  {
    Icon: ChatIcon,
    title: "Public Comment Reply",
    text: "Reply publicly + slide into their DMs at the same time.",
    gradient: "linear-gradient(135deg, #f97316, #fb923c)",
  },
  {
    Icon: KeyIcon,
    title: "Keyword Triggers",
    text: "\"LINK\", \"PRICE\", \"OFFER\" — each keyword fires its own flow.",
    gradient: "linear-gradient(135deg, #06b6d4, #22d3ee)",
  },
  {
    Icon: FileIcon,
    title: "Auto-PDF",
    text: "Turn long messages into clean downloadable PDFs your fans can keep.",
    gradient: "linear-gradient(135deg, #ef4444, #f87171)",
  },
  {
    Icon: StoreIcon,
    title: "Link-in-Bio Store",
    text: "Sell straight from your bio with a page that matches your brand.",
    gradient: "linear-gradient(135deg, #6366f1, #818cf8)",
  },
  {
    Icon: ChartIcon,
    title: "Analytics",
    text: "See opens, replies, clicks — know exactly what's converting.",
    gradient: "linear-gradient(135deg, #eab308, #facc15)",
  },
];

/* ============= Main Component ============= */

export default function FeaturesGridSection() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 }
    );
    const el = document.getElementById("features-grid-section");
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="features-grid-section"
      className="py-16 px-6 relative overflow-hidden bg-white"
    >
      {/* Subtle background pattern */}
      <div
        className="absolute inset-0 opacity-[0.4] -z-0"
        style={{
          backgroundImage:
            "radial-gradient(#e5e7eb 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Compact header */}
        <div className="text-center mb-10">
          <span
            className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.2em] uppercase px-3 py-1 rounded-full border mb-3"
            style={{
              backgroundColor: "rgba(3, 133, 107, 0.08)",
              borderColor: "rgba(3, 133, 107, 0.2)",
              color: "#03856b",
            }}
          >
            <span
              className="w-1 h-1 rounded-full"
              style={{ backgroundColor: "#03856b" }}
            />
            Everything You Need
          </span>

          <h2
            className={`text-3xl md:text-5xl font-black text-gray-900 leading-[1.1] tracking-tight mb-3 transition-all duration-700 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            More than auto-DM.{" "}
            <span
              style={{
                backgroundImage:
                  "linear-gradient(135deg, #8b5cf6 0%, #ec4899 50%, #f97316 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              A whole toolkit.
            </span>
          </h2>

          <p
            className={`text-gray-500 max-w-xl mx-auto transition-all duration-700 delay-100 ${
              visible ? "opacity-100" : "opacity-0"
            }`}
          >
            Built for how Instagram, Facebook & WhatsApp actually work — not
            bolted on from a generic chatbot.
          </p>
        </div>

        {/* Features Grid — 4 cols on desktop, 2 on tablet, 1 on mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((f, i) => {
            const Icon = f.Icon;
            return (
              <div
                key={i}
                className={`group relative bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 ${
                  visible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-6"
                }`}
                style={{ transitionDelay: `${100 + i * 60}ms` }}
              >
                {/* Icon with glow */}
                <div className="relative mb-3 inline-block">
                  <div
                    className="absolute inset-0 rounded-xl blur-md opacity-30 group-hover:opacity-60 transition-opacity"
                    style={{ background: f.gradient }}
                  />
                  <div
                    className="relative w-11 h-11 rounded-xl flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform duration-500"
                    style={{ background: f.gradient }}
                  >
                    <Icon />
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-base font-bold text-gray-900 mb-1.5 leading-snug">
                  {f.title}
                </h3>

                {/* Description */}
                <p className="text-gray-500 text-sm leading-relaxed">
                  {f.text}
                </p>

                {/* Bottom accent line on hover */}
                <div
                  className="absolute bottom-0 left-5 right-5 h-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: f.gradient }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}