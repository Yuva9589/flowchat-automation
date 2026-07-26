"use client";

import { useEffect, useState } from "react";

function SparkleIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" />
    </svg>
  );
}

const keywords = ["LINK", "PRICE", "GUIDE", "OFFER"];

const messages = [
  "Here you go, enjoy! 🎉 flowchat.link/a",
  "Just sent it over, grab it 👇 flowchat.link/a",
  "All yours 💫 flowchat.link/a",
  "Boom! 🚀 flowchat.link/a — enjoy!",
];

export default function AIRewriteSection() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.15 }
    );
    const el = document.getElementById("ai-rewrite-section");
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="ai-rewrite-section"
      className="py-8 px-6 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #0a0f1e 0%, #111827 50%, #0a0f1e 100%)",
      }}
    >
      {/* Background glows */}
      <div
        className="absolute top-0 left-1/4 w-[300px] h-[300px] rounded-full blur-3xl opacity-20 -z-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, #03856b, transparent 70%)",
        }}
      />
      <div
        className="absolute bottom-0 right-1/4 w-[300px] h-[300px] rounded-full blur-3xl opacity-15 -z-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, #8b5cf6, transparent 70%)",
        }}
      />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] -z-0"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Grid layout — Header LEFT, content RIGHT (compact side-by-side) */}
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* LEFT — Header */}
          <div>
            <span
              className="inline-flex items-center gap-2 text-[10px] font-semibold tracking-[0.2em] uppercase px-3 py-1 rounded-full border mb-3"
              style={{
                backgroundColor: "rgba(3, 133, 107, 0.15)",
                borderColor: "rgba(3, 133, 107, 0.35)",
                color: "#4ade80",
              }}
            >
              <SparkleIcon />
              Smart by Default
            </span>

            <h2
              className={`text-2xl md:text-4xl font-black text-white leading-[1.1] tracking-tight mb-2 transition-all duration-700 ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
            >
              Different words.{" "}
              <span
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, #8b5cf6 0%, #ec4899 50%, #f97316 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Different flows.
              </span>
            </h2>

            <p
              className={`text-gray-400 text-sm mb-4 transition-all duration-700 delay-100 ${
                visible ? "opacity-100" : "opacity-0"
              }`}
            >
              Keyword triggers route each reply. AI rewrites every message so it
              reads human — never spam. Your account stays safe.
            </p>

            <p
              className={`text-xs text-gray-500 transition-opacity duration-1000 ${
                visible ? "opacity-100" : "opacity-0"
              }`}
              style={{ transitionDelay: "1400ms" }}
            >
              Every DM unique.{" "}
              <span className="text-white font-semibold">Zero spam flags.</span>{" "}
              Account stays safe.
            </p>
          </div>

          {/* RIGHT — Keywords + Messages stack */}
          <div className="space-y-3">
            {/* Keywords Card */}
            <div
              className={`rounded-xl p-3.5 backdrop-blur-xl border transition-all duration-700 delay-200 ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
              style={{
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)",
                borderColor: "rgba(255,255,255,0.1)",
              }}
            >
              <div className="flex items-center justify-between mb-2.5">
                <div className="flex items-center gap-2">
                  <div
                    className="w-1.5 h-1.5 rounded-full animate-pulse"
                    style={{ backgroundColor: "#4ade80" }}
                  />
                  <p className="text-[11px] text-gray-400 font-medium">
                    Flowchat · automations
                  </p>
                </div>
                <p
                  className="text-[10px] font-semibold"
                  style={{ color: "#4ade80" }}
                >
                  4 keywords live
                </p>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {keywords.map((kw, i) => (
                  <span
                    key={kw}
                    className={`px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wide transition-all duration-500 ${
                      visible
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-2"
                    }`}
                    style={{
                      transitionDelay: `${400 + i * 80}ms`,
                      backgroundColor: "rgba(3, 133, 107, 0.2)",
                      border: "1px solid rgba(3, 133, 107, 0.4)",
                      color: "#4ade80",
                    }}
                  >
                    {kw}
                  </span>
                ))}
              </div>
            </div>

            {/* Rewritten messages */}
            <div>
              <p
                className={`text-[11px] text-gray-400 mb-2 font-medium transition-opacity duration-500 ${
                  visible ? "opacity-100" : "opacity-0"
                }`}
                style={{ transitionDelay: "700ms" }}
              >
                ✨ AI rewrites every reply — same meaning, different words:
              </p>

              <div className="space-y-1.5">
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`text-white rounded-xl px-3 py-2 text-xs shadow-md transition-all duration-500 ${
                      visible
                        ? "opacity-100 translate-x-0"
                        : "opacity-0 -translate-x-4"
                    }`}
                    style={{
                      transitionDelay: `${800 + i * 120}ms`,
                      backgroundColor: "#03856b",
                      maxWidth: "92%",
                      marginLeft: i % 2 === 0 ? "0" : "auto",
                    }}
                  >
                    {msg}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}