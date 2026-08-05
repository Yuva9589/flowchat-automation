"use client";

import { useEffect, useState } from "react";
import { ThumbsUp, MessageSquare, Share2 } from "lucide-react";

/* Custom Facebook Logo */
function FacebookLogo({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
    </svg>
  );
}

export default function FacebookSection() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.2 }
    );
    const el = document.getElementById("facebook-section");
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="platforms"
      className="py-24 px-6 overflow-hidden"
      style={{
        background:
          "linear-gradient(to bottom, #eff6ff 0%, #ffffff 100%)",
      }}
    >
      <div
        id="facebook-section"
        className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center"
      >
        {/* LEFT — Text + Features */}
        <div
          className={`transition-all duration-700 ${
            visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
          }`}
        >
          {/* Small badge */}
          <div className="inline-flex items-center gap-2 mb-5">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-lg"
              style={{
                backgroundImage: "linear-gradient(135deg, #2563eb, #3b82f6)",
              }}
            >
              <FacebookLogo size={22} />
            </div>
            <span
              className="text-sm font-semibold tracking-wide uppercase"
              style={{ color: "#2563eb" }}
            >
              Facebook Automation
            </span>
          </div>

          {/* Heading */}
          <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-6 leading-tight">
            Facebook pages,{" "}
            <span
              style={{
                backgroundImage:
                  "linear-gradient(135deg, #2563eb, #3b82f6, #60a5fa)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              with DM automation too.
            </span>
          </h2>

          {/* Description */}
          <p className="text-lg text-gray-600 leading-relaxed mb-8">
            Auto-reply to comments on your Facebook page posts, ads & reels.
            Convert every commenter into a Messenger lead — instantly.
          </p>

          {/* Feature bullets */}
          <ul className="space-y-3">
            {[
              "Auto-DM commenters on any FB post or ad",
              "Messenger sequences with buttons & quick replies",
              "Works with Facebook Groups too",
              "Official Meta Business API — 100% safe",
            ].map((item, i) => (
              <li
                key={i}
                className={`flex items-start gap-3 transition-all duration-500 ${
                  visible
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-4"
                }`}
                style={{ transitionDelay: `${300 + i * 100}ms` }}
              >
                <span
                  className="mt-0.5 w-6 h-6 rounded-full flex items-center justify-center text-white flex-shrink-0 text-xs font-bold shadow-md"
                  style={{
                    backgroundImage:
                      "linear-gradient(135deg, #2563eb, #3b82f6)",
                  }}
                >
                  ✓
                </span>
                <span className="text-base text-gray-700">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* RIGHT — Facebook Post Mockup */}
        <div
          className={`transition-all duration-700 delay-200 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden max-w-sm mx-auto border border-gray-100">
            {/* FB Post Header */}
            <div className="flex items-center gap-3 px-4 py-3">
              <div
                className="w-11 h-11 rounded-full flex items-center justify-center text-white font-bold shadow-md"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, #2563eb, #3b82f6)",
                }}
              >
                YB
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold">Your Brand</p>
                <p className="text-xs text-gray-500">Sponsored · 🌍</p>
              </div>
            </div>

            <p className="px-4 pb-3 text-sm">
              🔥 Drop{" "}
              <span className="font-bold" style={{ color: "#2563eb" }}>
                "OFFER"
              </span>{" "}
              below and we'll send you 30% off — instantly!
            </p>

            {/* Post image */}
            <div
              className="aspect-video flex items-center justify-center"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, #3b82f6, #22d3ee)",
              }}
            >
              <span className="text-7xl">🎁</span>
            </div>

            {/* Reactions */}
            <div className="px-4 py-2 border-b border-gray-100 flex items-center justify-between text-xs text-gray-500">
              <span>👍❤️😮 1.2K</span>
              <span>487 comments</span>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-around py-2 border-b border-gray-100 text-gray-600 text-sm font-medium">
              <button className="flex items-center gap-1.5 hover:text-blue-600">
                <ThumbsUp size={16} /> Like
              </button>
              <button className="flex items-center gap-1.5 hover:text-blue-600">
                <MessageSquare size={16} /> Comment
              </button>
              <button className="flex items-center gap-1.5 hover:text-blue-600">
                <Share2 size={16} /> Share
              </button>
            </div>

            {/* Comment + auto-reply flow */}
            <div className="p-3 space-y-2">
              {/* User comment */}
              <div
                className={`flex gap-2 transition-all duration-500 ${
                  visible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
                style={{ transitionDelay: "600ms" }}
              >
                <div
                  className="w-8 h-8 rounded-full flex-shrink-0"
                  style={{
                    backgroundImage: "linear-gradient(135deg, #a855f7, #ec4899)",
                  }}
                />
                <div className="bg-gray-100 rounded-2xl px-3 py-2 flex-1">
                  <p className="text-xs font-semibold">Priya Sharma</p>
                  <p className="text-sm">OFFER 🙌</p>
                </div>
              </div>

              {/* Flowchat auto reply indicator */}
              <div
                className={`ml-10 flex items-center gap-2 rounded-xl px-3 py-2 border transition-all duration-500 ${
                  visible ? "opacity-100 scale-100" : "opacity-0 scale-90"
                }`}
                style={{
                  backgroundColor: "#dbeafe",
                  borderColor: "#93c5fd",
                  transitionDelay: "1100ms",
                }}
              >
                <div
                  className="w-2 h-2 rounded-full animate-pulse"
                  style={{ backgroundColor: "#2563eb" }}
                />
                <p
                  className="text-xs font-semibold"
                  style={{ color: "#1e40af" }}
                >
                  Flowchat sent Messenger DM · 2s
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}