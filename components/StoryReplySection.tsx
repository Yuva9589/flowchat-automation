"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, Zap } from "lucide-react";

export default function StoryReplySection() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.2 }
    );
    const el = document.getElementById("story-reply-section");
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-24 px-6 bg-white overflow-hidden">
      <div
        id="story-reply-section"
        className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center"
      >
        {/* LEFT — Story Reply Chat Mockup */}
        <div
          className={`order-2 md:order-1 transition-all duration-700 ${
            visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
          }`}
        >
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden max-w-sm mx-auto border border-gray-100">
            {/* Chat Header */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-100">
              <ChevronLeft size={22} className="text-gray-500" />
              <div
                className="w-9 h-9 rounded-full"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, #fb923c, #f472b6)",
                }}
              />
              <div>
                <p className="text-sm font-semibold">jordan.fit</p>
                <p className="text-xs text-gray-500">Active 2m ago</p>
              </div>
            </div>

            {/* Messages */}
            <div className="p-4 space-y-3 min-h-[320px]">
              <p
                className={`text-xs text-gray-500 text-center transition-opacity duration-500 ${
                  visible ? "opacity-100" : "opacity-0"
                }`}
                style={{ transitionDelay: "200ms" }}
              >
                Replied to your story · 📸
              </p>

              {/* Story reply from user */}
              <div
                className={`flex justify-end transition-all duration-500 ${
                  visible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
                style={{ transitionDelay: "400ms" }}
              >
                <div className="max-w-[75%]">
                  {/* Story preview thumbnail */}
                  <div
                    className="rounded-xl overflow-hidden mb-1 border-l-4 border-orange-400"
                    style={{
                      backgroundImage:
                        "linear-gradient(135deg, #fdba74, #f472b6)",
                    }}
                  >
                    <div className="p-2 flex items-center gap-2">
                      <span className="text-2xl">📸</span>
                      <div className="text-xs text-white">
                        <p className="opacity-80">Your story</p>
                        <p className="font-semibold">🔥 Special offer!</p>
                      </div>
                    </div>
                  </div>
                  {/* User's message */}
                  <div className="bg-gray-100 rounded-2xl rounded-tr-sm px-4 py-2">
                    <p className="text-sm">yes!! send me the details 😍</p>
                  </div>
                </div>
              </div>

              {/* Bot auto-reply */}
              <div
                className={`flex justify-start transition-all duration-700 ${
                  visible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
                style={{ transitionDelay: "1000ms" }}
              >
                <div
                  className="rounded-2xl rounded-tl-sm px-4 py-2 max-w-[85%] text-white shadow-lg"
                  style={{ backgroundColor: "#03856b" }}
                >
                  <p className="text-sm">
                    On its way 👉{" "}
                    <span className="underline">flowchat.link/offer</span>
                  </p>
                </div>
              </div>

              {/* Auto-answered indicator */}
              <div
                className={`flex justify-end items-center gap-1 transition-opacity duration-500 ${
                  visible ? "opacity-100" : "opacity-0"
                }`}
                style={{ transitionDelay: "1500ms" }}
              >
                <span
                  className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full"
                  style={{
                    backgroundColor: "#03856b15",
                    color: "#03856b",
                  }}
                >
                  <Zap size={12} />
                  Answered automatically · 4s
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT — Text */}
        <div
          className={`order-1 md:order-2 transition-all duration-700 delay-200 ${
            visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
          }`}
        >
          <span
            className="text-sm font-semibold tracking-wide uppercase"
            style={{ color: "#03856b" }}
          >
            Not just comments
          </span>
          <h2 className="text-4xl md:text-6xl font-black text-gray-900 mt-3 mb-6 leading-tight">
            Story replies,{" "}
            <span
              style={{
                backgroundImage:
                  "linear-gradient(135deg, #8b5cf6 0%, #ec4899 50%, #f97316 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              handled too.
            </span>
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed mb-8">
            Run a poll or a "DM me" sticker — every reply gets answered
            automatically. No more missed leads while you sleep.
          </p>

          {/* Bullet points */}
          <ul className="space-y-3">
            {[
              "Auto-answer every story reply instantly",
              "Works with polls, DM stickers & questions",
              "Send links, offers, PDFs — anything",
            ].map((item, i) => (
              <li
                key={i}
                className="flex items-start gap-3 text-gray-700"
              >
                <span
                  className="mt-1 w-5 h-5 rounded-full flex items-center justify-center text-white flex-shrink-0"
                  style={{ backgroundColor: "#03856b" }}
                >
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>
                <span className="text-base">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}