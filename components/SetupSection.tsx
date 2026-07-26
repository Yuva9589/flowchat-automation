"use client";

import { useEffect, useState } from "react";

/* ============= Icons ============= */

function LinkIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  );
}

function CursorIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z" />
      <path d="M13 13l6 6" />
    </svg>
  );
}

function RocketIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
      <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </svg>
  );
}

function ArrowRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

/* ============= Steps Data ============= */

const steps = [
  {
    number: "1",
    Icon: LinkIcon,
    title: "Connect your accounts",
    text: "One-tap login via official Meta & WhatsApp APIs. No passwords. No code. No Facebook page hassle.",
  },
  {
    number: "2",
    Icon: CursorIcon,
    title: "Pick a post & keyword",
    text: "Choose the post, set your trigger word (LINK, PRICE…), and write the DM you want sent.",
  },
  {
    number: "3",
    Icon: RocketIcon,
    title: "Go live",
    text: "That's it. Every matching comment now gets your DM automatically, 24/7 — even while you sleep.",
  },
];

/* ============= Main Component ============= */

export default function SetupSection() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.15 }
    );
    const el = document.getElementById("setup-section");
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="setup-section"
      className="py-8 px-6 relative overflow-hidden bg-white"
    >
      {/* Subtle background glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] rounded-full blur-3xl opacity-10 -z-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, #03856b, transparent 70%)",
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Layout — Header LEFT + Cards RIGHT (side-by-side compact) */}
        <div className="grid md:grid-cols-12 gap-6 items-center">
          {/* LEFT — Header + CTA (4 cols) */}
          <div className="md:col-span-4">
            <span
              className="inline-flex items-center gap-2 text-[10px] font-semibold tracking-[0.2em] uppercase px-2.5 py-1 rounded-full border mb-2.5"
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
              Setup
            </span>

            <h2
              className={`text-2xl md:text-4xl font-black text-gray-900 leading-[1.1] tracking-tight mb-2 transition-all duration-700 ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
            >
              Live in{" "}
              <span
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, #03856b, #04a085, #0ea5e9)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                two minutes.
              </span>
            </h2>

            <p
              className={`text-gray-500 text-sm mb-4 transition-all duration-700 delay-100 ${
                visible ? "opacity-100" : "opacity-0"
              }`}
            >
              No Facebook page. No code. No weekend project. 🙌
            </p>

            {/* CTA */}
            <div
              className={`transition-all duration-700 delay-300 ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <a
                href="#signup"
                className="group inline-flex items-center gap-2 text-white px-5 py-2.5 rounded-full font-semibold text-sm transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 hover:opacity-90"
                style={{
                  backgroundImage: "linear-gradient(135deg, #03856b, #04a085)",
                }}
              >
                Connect your accounts, it's free
                <span className="group-hover:translate-x-1 transition-transform">
                  <ArrowRight />
                </span>
              </a>
              <p className="text-[11px] text-gray-500 mt-2">
                7 days free · no credit card · cancel anytime
              </p>
            </div>
          </div>

          {/* RIGHT — 3 Step Cards (8 cols) */}
          <div className="md:col-span-8 grid md:grid-cols-3 gap-3">
            {steps.map((s, i) => {
              const Icon = s.Icon;
              return (
                <div
                  key={i}
                  className={`group relative bg-gradient-to-br from-white to-gray-50 rounded-xl p-4 border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-500 ${
                    visible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-6"
                  }`}
                  style={{ transitionDelay: `${200 + i * 120}ms` }}
                >
                  {/* Big number in background */}
                  <span
                    className="absolute top-1 right-3 text-4xl font-black leading-none pointer-events-none select-none"
                    style={{
                      color: "rgba(3, 133, 107, 0.08)",
                    }}
                  >
                    {s.number}
                  </span>

                  {/* Icon */}
                  <div
                    className="relative w-9 h-9 rounded-lg flex items-center justify-center text-white shadow-md mb-2.5 group-hover:scale-110 transition-transform duration-500"
                    style={{
                      backgroundImage:
                        "linear-gradient(135deg, #03856b, #04a085)",
                    }}
                  >
                    <Icon />
                  </div>

                  {/* Step label */}
                  <p
                    className="text-[10px] font-semibold tracking-widest uppercase mb-1"
                    style={{ color: "#03856b" }}
                  >
                    Step {s.number}
                  </p>

                  {/* Title */}
                  <h3 className="text-sm font-bold text-gray-900 mb-1.5 leading-snug">
                    {s.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 text-xs leading-relaxed">
                    {s.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}