"use client";

import { useEffect, useState } from "react";

function CheckIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

/* ============= Comparison Rows ============= */

const rows = [
  {
    label: "Setup time",
    flowchat: { text: "2 minutes", positive: true },
    other: { text: "A whole weekend", positive: false },
  },
  {
    label: "Facebook page required",
    flowchat: { text: "No, one-tap login", positive: true },
    other: { text: "Yes, mandatory", positive: false },
  },
  {
    label: "Learning curve",
    flowchat: { text: "Zero — just click", positive: true },
    other: { text: "Flow-builder maze", positive: false },
  },
  {
    label: "Platforms supported",
    flowchat: { text: "Instagram + Facebook + WhatsApp", positive: true },
    other: { text: "One of many channels", positive: false },
  },
  {
    label: "Free trial",
    flowchat: { text: "7 days · no card", positive: true },
    other: { text: "Card often required", positive: false },
  },
  {
    label: "AI message variations",
    flowchat: { text: "Built-in — never spammy", positive: true },
    other: { text: "Manual writing", positive: false },
  },
  {
    label: "Pricing",
    flowchat: { text: "₹99/month · Cancel anytime", positive: true },
    other: { text: "$15–$99/month", positive: false },
  },
];

/* ============= Main Component ============= */

export default function ComparisonSection() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 }
    );
    const el = document.getElementById("comparison-section");
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="comparison-section"
      className="py-8 px-6 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #f9fafb 0%, #ffffff 100%)",
      }}
    >
      {/* Background glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] rounded-full blur-3xl opacity-10 -z-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, #03856b, transparent 70%)",
        }}
      />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header — compact */}
        <div className="text-center mb-5">
          <span
            className="inline-flex items-center gap-2 text-[10px] font-semibold tracking-[0.2em] uppercase px-2.5 py-1 rounded-full border mb-2"
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
            Flowchat vs Others
          </span>

          <h2
            className={`text-2xl md:text-4xl font-black text-gray-900 leading-[1.1] tracking-tight mb-1.5 transition-all duration-700 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            Everything you loved.{" "}
            <span
              style={{
                backgroundImage:
                  "linear-gradient(135deg, #8b5cf6 0%, #ec4899 50%, #f97316 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              None of the complexity.
            </span>
          </h2>

          <p
            className={`text-gray-500 text-sm transition-all duration-700 delay-100 ${
              visible ? "opacity-100" : "opacity-0"
            }`}
          >
            See how Flowchat stacks up against traditional chatbot builders.
          </p>
        </div>

        {/* Comparison Table — compact */}
        <div
          className={`bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden transition-all duration-700 delay-200 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Table Header */}
          <div className="grid grid-cols-[1.3fr_1fr_1fr] md:grid-cols-[1.5fr_1fr_1fr]">
            <div className="p-2.5 md:p-3 bg-gray-50 border-b border-gray-100"></div>

            {/* Flowchat column header */}
            <div
              className="p-2.5 md:p-3 text-center border-b border-gray-100 relative"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, #03856b, #04a085)",
              }}
            >
              <p className="text-white text-sm md:text-base font-black tracking-tight">
                Flow<span className="opacity-80">chat</span>
              </p>
              <p className="text-white/80 text-[9px] font-medium tracking-widest uppercase">
                ★ Recommended
              </p>
            </div>

            {/* Other column header */}
            <div className="p-2.5 md:p-3 text-center border-b border-gray-100 bg-gray-100">
              <p className="text-gray-700 text-sm md:text-base font-bold">
                Chatbot Builders
              </p>
              <p className="text-gray-500 text-[9px] font-medium tracking-widest uppercase">
                Traditional
              </p>
            </div>
          </div>

          {/* Table Rows — compact */}
          {rows.map((row, i) => (
            <div
              key={i}
              className={`grid grid-cols-[1.3fr_1fr_1fr] md:grid-cols-[1.5fr_1fr_1fr] transition-all duration-500 ${
                i % 2 === 0 ? "bg-white" : "bg-gray-50"
              } ${
                visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
              }`}
              style={{ transitionDelay: `${300 + i * 60}ms` }}
            >
              {/* Row label */}
              <div className="px-3 py-2 md:px-4 md:py-2.5 border-b border-gray-100 flex items-center">
                <span className="text-xs md:text-sm font-semibold text-gray-800">
                  {row.label}
                </span>
              </div>

              {/* Flowchat value */}
              <div
                className="px-3 py-2 md:px-4 md:py-2.5 text-center border-b border-gray-100 flex items-center justify-center gap-1.5"
                style={{ backgroundColor: "rgba(3, 133, 107, 0.04)" }}
              >
                <span
                  className="w-4 h-4 rounded-full flex items-center justify-center text-white flex-shrink-0"
                  style={{
                    backgroundImage:
                      "linear-gradient(135deg, #03856b, #04a085)",
                  }}
                >
                  <CheckIcon />
                </span>
                <span
                  className="text-[11px] md:text-xs font-semibold"
                  style={{ color: "#03856b" }}
                >
                  {row.flowchat.text}
                </span>
              </div>

              {/* Other value */}
              <div className="px-3 py-2 md:px-4 md:py-2.5 text-center border-b border-gray-100 flex items-center justify-center gap-1.5">
                <span
                  className="w-4 h-4 rounded-full flex items-center justify-center text-white flex-shrink-0"
                  style={{ backgroundColor: "#9ca3af" }}
                >
                  <XIcon />
                </span>
                <span className="text-[11px] md:text-xs text-gray-500 font-medium">
                  {row.other.text}
                </span>
              </div>
            </div>
          ))}

          {/* Footer row with CTA */}
          <div
            className="px-4 py-3 md:px-5 md:py-3.5 text-center"
            style={{
              backgroundImage:
                "linear-gradient(135deg, rgba(3, 133, 107, 0.05), rgba(4, 160, 133, 0.03))",
            }}
          >
            <p className="text-xs text-gray-600 mb-2">
              The choice is obvious.
            </p>
            <a
              href="#signup"
              className="inline-flex items-center gap-2 text-white px-5 py-2 rounded-full font-semibold text-xs transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, #03856b, #04a085)",
              }}
            >
              Start free with Flowchat →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}