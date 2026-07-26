"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, CheckCheck, MessageCircle } from "lucide-react";

export default function WhatsAppSection() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.2 }
    );
    const el = document.getElementById("whatsapp-section");
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      className="py-24 px-6 overflow-hidden"
      style={{
        background:
          "linear-gradient(to bottom, #ffffff 0%, #f0fdf4 100%)",
      }}
    >
      <div
        id="whatsapp-section"
        className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center"
      >
        {/* LEFT — WhatsApp Chat Mockup */}
        <div
          className={`order-2 md:order-1 transition-all duration-700 ${
            visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
          }`}
        >
          <div className="rounded-3xl shadow-2xl overflow-hidden max-w-sm mx-auto border border-gray-100 bg-[#efeae2]">
            {/* WhatsApp Header */}
            <div
              className="text-white px-4 py-3 flex items-center gap-3"
              style={{ backgroundColor: "#075e54" }}
            >
              <ChevronLeft size={20} />
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, #22c55e, #16a34a)",
                }}
              >
                YB
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold">Your Brand</p>
                <p className="text-xs opacity-80">online</p>
              </div>
            </div>

            {/* Messages */}
            <div
              className="p-4 space-y-3 min-h-[380px]"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 20% 20%, #d1c7bd 1px, transparent 1px), radial-gradient(circle at 80% 80%, #d1c7bd 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }}
            >
              {/* User message */}
              <div
                className={`flex justify-end transition-all duration-500 ${
                  visible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
                style={{ transitionDelay: "300ms" }}
              >
                <div className="bg-white rounded-2xl rounded-tr-sm px-3 py-2 max-w-[75%] shadow-sm">
                  <p className="text-sm">Hi! Interested in the course 🙏</p>
                  <p className="text-[10px] text-gray-500 text-right mt-1 flex items-center justify-end gap-1">
                    10:24 AM <CheckCheck size={14} className="text-blue-500" />
                  </p>
                </div>
              </div>

              {/* Auto reply with card */}
              <div
                className={`flex justify-start transition-all duration-500 ${
                  visible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
                style={{ transitionDelay: "800ms" }}
              >
                <div className="bg-[#d9fdd3] rounded-2xl rounded-tl-sm px-3 py-2 max-w-[85%] shadow-sm">
                  <p className="text-sm">
                    Hey! 👋 Welcome to Your Brand. Here are the details:
                  </p>

                  {/* Product card */}
                  <div className="mt-2 bg-white/70 rounded-lg p-2.5 text-xs space-y-1">
                    <p className="font-semibold">📚 Full Course · ₹4,999</p>
                    <p>⏰ Lifetime access</p>
                    <p>🎁 Free bonus templates</p>
                  </div>

                  <p className="text-[10px] text-gray-500 text-right mt-1 flex items-center justify-end gap-1">
                    10:24 AM <CheckCheck size={14} className="text-blue-500" />
                  </p>
                </div>
              </div>

              {/* Interactive button */}
              <div
                className={`flex justify-start transition-all duration-500 ${
                  visible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
                style={{ transitionDelay: "1300ms" }}
              >
                <button
                  className="bg-[#d9fdd3] rounded-2xl px-4 py-2.5 shadow-sm hover:bg-[#c8f0c0] transition"
                  style={{ color: "#075e54" }}
                >
                  <span className="text-sm font-semibold">👉 Buy Now</span>
                </button>
              </div>

              {/* Powered by Flowchat */}
              <p
                className={`text-[10px] text-gray-500 text-center mt-3 transition-opacity duration-500 ${
                  visible ? "opacity-100" : "opacity-0"
                }`}
                style={{ transitionDelay: "1700ms" }}
              >
                Powered by Flowchat · Auto-reply
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT — Text + Features */}
        <div
          className={`order-1 md:order-2 transition-all duration-700 delay-200 ${
            visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
          }`}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 mb-5">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-lg"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, #22c55e, #16a34a)",
              }}
            >
              <MessageCircle size={22} />
            </div>
            <span
              className="text-sm font-semibold tracking-wide uppercase"
              style={{ color: "#16a34a" }}
            >
              WhatsApp Automation
            </span>
          </div>

          {/* Heading */}
          <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-6 leading-tight">
            WhatsApp replies,{" "}
            <span
              style={{
                backgroundImage:
                  "linear-gradient(135deg, #16a34a, #22c55e, #4ade80)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              while you sleep.
            </span>
          </h2>

          {/* Description */}
          <p className="text-lg text-gray-600 leading-relaxed mb-8">
            Auto-respond to WhatsApp messages with rich replies, product cards,
            buttons, and 24/7 AI chat. Turn WhatsApp into your #1 sales channel.
          </p>

          {/* Feature bullets */}
          <ul className="space-y-3">
            {[
              "Instant auto-replies with product cards",
              "Broadcast to unlimited contacts",
              "Interactive buttons & quick replies",
              "Official WhatsApp Business API — 100% safe",
            ].map((item, i) => (
              <li
                key={i}
                className={`flex items-start gap-3 transition-all duration-500 ${
                  visible
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-4"
                }`}
                style={{ transitionDelay: `${300 + i * 100}ms` }}
              >
                <span
                  className="mt-0.5 w-6 h-6 rounded-full flex items-center justify-center text-white flex-shrink-0 text-xs font-bold shadow-md"
                  style={{
                    backgroundImage:
                      "linear-gradient(135deg, #22c55e, #16a34a)",
                  }}
                >
                  ✓
                </span>
                <span className="text-base text-gray-700">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}