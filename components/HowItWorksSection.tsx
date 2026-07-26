"use client";

import { useEffect, useState } from "react";

/* ============= Custom Icons ============= */

function CommentIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}

function ShieldCheckIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <polyline points="9 12 11 14 15 10" />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  );
}

function ArrowFlow() {
  return (
    <svg width="32" height="20" viewBox="0 0 40 24" fill="none">
      <path
        d="M2 12h34m0 0l-6-6m6 6l-6 6"
        stroke="#03856b"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="4 3"
      />
    </svg>
  );
}

/* ============= Steps Data ============= */

const steps = [
  {
    number: "01",
    Icon: CommentIcon,
    title: "Someone drops your keyword",
    text: "On any post, reel, or story. You pick the trigger word.",
  },
  {
    number: "02",
    Icon: ShieldCheckIcon,
    title: "Flowchat checks the follow-gate",
    text: "It asks politely before sending. Grow followers + deliver in one move.",
  },
  {
    number: "03",
    Icon: SendIcon,
    title: "Your link lands in seconds",
    text: "Link, PDF, coupon — delivered 24/7 while you sleep.",
  },
];

/* ============= Main Component ============= */

export default function HowItWorksSection() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.15 }
    );
    const el = document.getElementById("how-it-works-section");
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="how-it-works-section"
      className="py-14 px-6 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #ffffff 0%, #f9fafb 100%)",
      }}
    >
      {/* Subtle brand glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] rounded-full blur-3xl opacity-10 -z-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, #03856b, transparent 70%)",
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Compact header block */}
        <div className="text-center mb-8">
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
            How Flowchat Works
          </span>

          <h2
            className={`text-3xl md:text-5xl font-black text-gray-900 leading-[1.1] tracking-tight transition-all duration-700 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            Comment in. DM out.{" "}
            <span
              style={{
                backgroundImage:
                  "linear-gradient(135deg, #8b5cf6 0%, #ec4899 50%, #f97316 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Automatically.
            </span>
          </h2>
        </div>

        {/* 3 Step Cards — compact */}
        <div className="grid md:grid-cols-3 gap-4 relative">
          {steps.map((s, i) => {
            const Icon = s.Icon;
            return (
              <div key={i} className="relative">
                {/* Card */}
                <div
                  className={`bg-white rounded-2xl p-5 shadow-md border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-500 h-full ${
                    visible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-6"
                  }`}
                  style={{ transitionDelay: `${200 + i * 120}ms` }}
                >
                  {/* Number + Icon (compact row) */}
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className="text-4xl font-black leading-none"
                      style={{
                        backgroundImage:
                          "linear-gradient(135deg, #03856b, #04a085)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                        opacity: 0.9,
                      }}
                    >
                      {s.number}
                    </span>

                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center text-white shadow-md"
                      style={{
                        backgroundImage:
                          "linear-gradient(135deg, #03856b, #04a085)",
                      }}
                    >
                      <Icon />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-base font-bold text-gray-900 mb-1.5 leading-snug">
                    {s.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 leading-relaxed text-sm">
                    {s.text}
                  </p>
                </div>

                {/* Connecting arrow (hidden on last card + mobile) */}
                {i < steps.length - 1 && (
                  <div
                    className={`hidden md:flex absolute top-1/2 -right-3 -translate-y-1/2 z-10 transition-all duration-500 ${
                      visible ? "opacity-100" : "opacity-0"
                    }`}
                    style={{ transitionDelay: `${500 + i * 120}ms` }}
                  >
                    <ArrowFlow />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Premium bottom tagline */}
        <div
          className={`text-center mt-10 transition-all duration-1000 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{ transitionDelay: "800ms" }}
        >
          {/* Divider decoration */}
          <div className="flex items-center justify-center gap-2 mb-4">
            <span
              className="h-px w-12"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(3, 133, 107, 0.4))",
              }}
            />
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: "#03856b" }}
            />
            <span
              className="h-px w-12"
              style={{
                background:
                  "linear-gradient(90deg, rgba(3, 133, 107, 0.4), transparent)",
              }}
            />
          </div>

          {/* Main tagline */}
          <p className="text-xl md:text-2xl font-black text-gray-900 tracking-tight leading-tight">
            While you sleep{" "}
            <span className="inline-block mx-2 opacity-40">·····</span>{" "}
            <span
              style={{
                backgroundImage:
                  "linear-gradient(135deg, #03856b, #04a085, #0ea5e9)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Working Flowchat.
            </span>
          </p>

          <p className="text-sm text-gray-500 mt-2">
            Three simple steps · Zero flow builders · Live in 2 minutes
          </p>
        </div>
      </div>
    </section>
  );
}