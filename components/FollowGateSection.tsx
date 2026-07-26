"use client";

import { useEffect, useState } from "react";
import { Check, ChevronLeft } from "lucide-react";

export default function FollowGateSection() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.2 }
    );
    const el = document.getElementById("follow-gate-section");
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-24 px-6 bg-white overflow-hidden">
      <div
        id="follow-gate-section"
        className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center"
      >
        {/* LEFT — Chat Mockup */}
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
                    "linear-gradient(135deg, #f472b6, #a855f7)",
                }}
              />
              <div>
                <p className="text-sm font-semibold">maya.creates</p>
                <p className="text-xs text-green-500">Active now</p>
              </div>
            </div>

            {/* Messages Area */}
            <div className="p-4 space-y-3 min-h-[300px]">
              {/* Incoming user comment */}
              <div
                className={`flex justify-end transition-all duration-500 ${
                  visible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
                style={{ transitionDelay: "300ms" }}
              >
                <div className="bg-gray-100 rounded-2xl rounded-tr-sm px-4 py-2 max-w-[75%]">
                  <p className="text-sm">LINK 🙌</p>
                </div>
              </div>

              {/* Bot reply — follow gate */}
              <div
                className={`flex justify-start transition-all duration-500 ${
                  visible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
                style={{ transitionDelay: "700ms" }}
              >
                <div
                  className="rounded-2xl rounded-tl-sm px-4 py-2 max-w-[80%] text-white"
                  style={{ backgroundColor: "#03856b" }}
                >
                  <p className="text-sm">
                    Hey! Quick one, are you following me? Tap yes and it's all
                    yours 💜
                  </p>
                </div>
              </div>

              {/* User confirms following */}
              <div
                className={`flex justify-end transition-all duration-500 ${
                  visible
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-90"
                }`}
                style={{ transitionDelay: "1200ms" }}
              >
                <div
                  className="border-2 rounded-full px-4 py-2 flex items-center gap-1.5 bg-white"
                  style={{ borderColor: "#03856b", color: "#03856b" }}
                >
                  <Check size={14} strokeWidth={3} />
                  <p className="text-sm font-semibold">Yes, I'm following</p>
                </div>
              </div>

              {/* Typing indicator */}
              <div
                className={`flex justify-start transition-all duration-500 ${
                  visible ? "opacity-100" : "opacity-0"
                }`}
                style={{ transitionDelay: "1700ms" }}
              >
                <div className="bg-gray-100 rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-1">
                  <span
                    className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                    style={{ animationDelay: "0ms" }}
                  />
                  <span
                    className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                    style={{ animationDelay: "150ms" }}
                  />
                  <span
                    className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                    style={{ animationDelay: "300ms" }}
                  />
                </div>
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
            The Follow-Gate
          </span>
          <h2 className="text-4xl md:text-6xl font-black text-gray-900 mt-3 mb-6 leading-tight">
            Flowchat asks if they{" "}
            <span
              style={{
                backgroundImage:
                  "linear-gradient(135deg, #8b5cf6 0%, #ec4899 50%, #f97316 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              follow you,
            </span>{" "}
            first.
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed mb-6">
            Turn every link request into a new follower. It checks in real time
            before it sends. More followers, more sales, zero effort.
          </p>

          {/* Mini stats */}
          <div className="flex flex-wrap gap-6 mt-8">
            <div>
              <p
                className="text-3xl font-black"
                style={{ color: "#03856b" }}
              >
                3x
              </p>
              <p className="text-sm text-gray-500">more followers</p>
            </div>
            <div>
              <p
                className="text-3xl font-black"
                style={{ color: "#03856b" }}
              >
                100%
              </p>
              <p className="text-sm text-gray-500">real-time check</p>
            </div>
            <div>
              <p
                className="text-3xl font-black"
                style={{ color: "#03856b" }}
              >
                0s
              </p>
              <p className="text-sm text-gray-500">delay</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}