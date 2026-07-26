"use client";

import { useEffect, useState } from "react";
import { Zap, Clock, Check, ChevronLeft, CheckCheck } from "lucide-react";

export default function InstantDeliverySection() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.2 }
    );
    const el = document.getElementById("instant-delivery-section");
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-24 px-6 bg-gray-50 overflow-hidden">
      <div
        id="instant-delivery-section"
        className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center"
      >
        {/* LEFT — Text */}
        <div
          className={`transition-all duration-700 ${
            visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
          }`}
        >
          <span
            className="text-sm font-semibold tracking-wide uppercase"
            style={{ color: "#03856b" }}
          >
            Instant
          </span>
          <h2 className="text-4xl md:text-6xl font-black text-gray-900 mt-3 mb-6 leading-tight">
            Your link,{" "}
            <span
              style={{
                backgroundImage:
                  "linear-gradient(135deg, #8b5cf6 0%, #ec4899 50%, #f97316 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              delivered.
            </span>
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed mb-8">
            In seconds. At 3pm or 3am. You never lift a finger.
            Flowchat runs 24/7 so your leads never wait.
          </p>

          {/* Feature pills */}
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-3 bg-white px-5 py-3 rounded-2xl shadow-sm border border-gray-100">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-white"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, #03856b, #04a085)",
                }}
              >
                <Zap size={20} />
              </div>
              <div>
                <p className="text-xs text-gray-500">Avg delivery</p>
                <p className="font-bold text-gray-900">under 4 seconds</p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-white px-5 py-3 rounded-2xl shadow-sm border border-gray-100">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-white"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, #03856b, #04a085)",
                }}
              >
                <Clock size={20} />
              </div>
              <div>
                <p className="text-xs text-gray-500">Uptime</p>
                <p className="font-bold text-gray-900">24/7 · always on</p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT — Chat Mockup */}
        <div
          className={`transition-all duration-700 delay-200 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
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

            {/* Messages */}
            <div className="p-4 space-y-3 min-h-[340px]">
              {/* User */}
              <div
                className={`flex justify-end transition-all duration-500 ${
                  visible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
                style={{ transitionDelay: "200ms" }}
              >
                <div className="bg-gray-100 rounded-2xl rounded-tr-sm px-4 py-2 max-w-[75%]">
                  <p className="text-sm">LINK 🙌</p>
                </div>
              </div>

              {/* Bot ask follow */}
              <div
                className={`flex justify-start transition-all duration-500 ${
                  visible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
                style={{ transitionDelay: "500ms" }}
              >
                <div
                  className="rounded-2xl rounded-tl-sm px-4 py-2 max-w-[80%] text-white"
                  style={{ backgroundColor: "#03856b" }}
                >
                  <p className="text-sm">
                    Are you following me? Tap yes and it's all yours 💜
                  </p>
                </div>
              </div>

              {/* Yes */}
              <div
                className={`flex justify-end transition-all duration-500 ${
                  visible ? "opacity-100 scale-100" : "opacity-0 scale-90"
                }`}
                style={{ transitionDelay: "900ms" }}
              >
                <div
                  className="border-2 rounded-full px-4 py-2 flex items-center gap-1.5 bg-white"
                  style={{ borderColor: "#03856b", color: "#03856b" }}
                >
                  <Check size={14} strokeWidth={3} />
                  <p className="text-sm font-semibold">Yes, I'm following</p>
                </div>
              </div>

              {/* Delivery */}
              <div
                className={`flex justify-start transition-all duration-700 ${
                  visible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
                style={{ transitionDelay: "1400ms" }}
              >
                <div
                  className="rounded-2xl rounded-tl-sm px-4 py-2 max-w-[85%] text-white shadow-lg"
                  style={{ backgroundColor: "#03856b" }}
                >
                  <p className="text-sm">
                    Amazing, here's your guide 👉{" "}
                    <span className="underline">flowchat.link/vip</span>
                  </p>
                </div>
              </div>

              {/* Seen indicator */}
              <div
                className={`text-right text-xs text-gray-400 flex items-center justify-end gap-1 transition-opacity duration-500 ${
                  visible ? "opacity-100" : "opacity-0"
                }`}
                style={{ transitionDelay: "1800ms" }}
              >
                Seen · delivered in 3s
                <CheckCheck size={14} className="text-blue-500" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}