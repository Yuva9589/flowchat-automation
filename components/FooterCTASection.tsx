"use client";

import { useEffect, useState } from "react";

function ArrowRight() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

export default function FinalCTASection() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.15 }
    );
    const el = document.getElementById("final-cta-section");
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="final-cta-section"
      className="py-20 px-6 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #ffffff 0%, #f0fdf9 50%, #ecfeff 100%)",
      }}
    >
      {/* Background gradient blobs */}
      <div
        className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full blur-3xl opacity-20 -z-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, #8b5cf6, transparent 70%)",
        }}
      />
      <div
        className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full blur-3xl opacity-20 -z-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, #f97316, transparent 70%)",
        }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full blur-3xl opacity-15 -z-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, #03856b, transparent 70%)",
        }}
      />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Small tag */}
        <div
          className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-gray-200 shadow-sm mb-6 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <span
            className="w-2 h-2 rounded-full animate-pulse"
            style={{ backgroundColor: "#03856b" }}
          />
          <span className="text-xs font-semibold text-gray-700">
            Live in 2 minutes · No card needed
          </span>
        </div>

        {/* Massive Heading */}
        <h2
          className={`text-4xl md:text-6xl lg:text-7xl font-black text-gray-900 leading-[1.05] tracking-tight mb-4 transition-all duration-700 delay-100 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          Your next comment{" "}
          <br className="hidden md:block" />
          could be a{" "}
          <span
            style={{
              backgroundImage:
                "linear-gradient(135deg, #8b5cf6 0%, #ec4899 50%, #f97316 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            sale.
          </span>
        </h2>

        {/* Subtitle */}
        <p
          className={`text-lg md:text-xl text-gray-600 mb-8 max-w-xl mx-auto transition-all duration-700 delay-200 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          Set up your first auto-DM in the next two minutes. Free for 7 days,
          no card needed.
        </p>

        {/* CTA Button */}
        <div
          className={`transition-all duration-700 delay-300 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <a
            href="#signup"
            className="group inline-flex items-center gap-3 text-white px-10 py-5 rounded-full font-bold text-lg transition-all shadow-2xl hover:shadow-[0_20px_60px_-15px_rgba(3,133,107,0.5)] hover:-translate-y-1"
            style={{
              backgroundImage:
                "linear-gradient(135deg, #03856b, #04a085, #0ea5e9)",
              backgroundSize: "200% 200%",
              animation: "flowchat-shimmer 3s ease infinite",
            }}
          >
            Start free trial
            <span className="group-hover:translate-x-1 transition-transform">
              <ArrowRight />
            </span>
          </a>
        </div>

        {/* Trust line */}
        <p
          className={`mt-6 text-sm text-gray-500 transition-opacity duration-1000 delay-500 ${
            visible ? "opacity-100" : "opacity-0"
          }`}
        >
          Built on Instagram, Facebook & WhatsApp Business APIs · One-tap setup ·
          Cancel anytime
        </p>

        {/* Trust badges */}
        <div
          className={`flex flex-wrap items-center justify-center gap-4 mt-8 transition-all duration-1000 delay-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <TrustBadge label="🔒 Official Meta API" />
          <TrustBadge label="⚡ Under 4s delivery" />
          <TrustBadge label="🇮🇳 Hindi & Hinglish AI" />
          <TrustBadge label="✅ Cancel anytime" />
        </div>
      </div>

      <style jsx>{`
        @keyframes flowchat-shimmer {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
      `}</style>
    </section>
  );
}

function TrustBadge({ label }: { label: string }) {
  return (
    <span className="text-xs font-medium text-gray-700 bg-white/70 backdrop-blur-sm px-3 py-1.5 rounded-full border border-gray-200">
      {label}
    </span>
  );
}