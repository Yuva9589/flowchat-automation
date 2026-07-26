"use client";

import { useEffect, useState } from "react";

const categories = [
  "Creators",
  "Coaches",
  "Astrologers",
  "Fitness Trainers",
  "Digital Sellers",
  "Small Brands",
  "Podcasters",
  "Educators",
  "Ecom Stores",
  "Consultants",
];

export default function StatsSection() {
  const [visible, setVisible] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.3 }
    );
    const el = document.getElementById("stats-section");
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Animated counter (0 → 1,000,000)
  useEffect(() => {
    if (!visible) return;
    const target = 1000000;
    const duration = 2000;
    const step = 30;
    const increment = target / (duration / step);
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      setCount(Math.floor(current));
    }, step);
    return () => clearInterval(timer);
  }, [visible]);

  return (
    <section
      id="stats-section"
      className="py-12 px-6 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #f9fafb 0%, #ffffff 100%)",
      }}
    >
      {/* Background glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full blur-3xl opacity-10 -z-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, #03856b, transparent 70%)",
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Main stat + label */}
        <div className="text-center mb-6">
          <div
            className={`transition-all duration-1000 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <p
              className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-2 leading-none"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, #03856b 0%, #04a085 50%, #0ea5e9 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {count.toLocaleString()}+
            </p>
            <p className="text-base md:text-lg text-gray-600 font-medium">
              DMs delivered for creators on{" "}
              <span
                className="font-bold"
                style={{ color: "#03856b" }}
              >
                Flowchat
              </span>
            </p>
          </div>
        </div>

        {/* Scrolling categories */}
        <div
          className={`relative overflow-hidden transition-opacity duration-1000 delay-300 ${
            visible ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Left fade */}
          <div
            className="absolute left-0 top-0 bottom-0 w-16 z-10 pointer-events-none"
            style={{
              background:
                "linear-gradient(90deg, #ffffff, transparent)",
            }}
          />
          {/* Right fade */}
          <div
            className="absolute right-0 top-0 bottom-0 w-16 z-10 pointer-events-none"
            style={{
              background:
                "linear-gradient(90deg, transparent, #ffffff)",
            }}
          />

          {/* Marquee track */}
          <div
            className="flex gap-3 py-2"
            style={{
              animation: "flowchat-marquee 30s linear infinite",
              width: "max-content",
            }}
          >
            {[...categories, ...categories, ...categories].map((cat, i) => (
              <span
                key={i}
                className="px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap"
                style={{
                  backgroundColor: "rgba(3, 133, 107, 0.06)",
                  border: "1px solid rgba(3, 133, 107, 0.15)",
                  color: "#03856b",
                }}
              >
                {cat}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom mini stats row */}
        <div
          className={`grid grid-cols-3 gap-4 mt-8 max-w-2xl mx-auto transition-all duration-1000 delay-500 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <div className="text-center">
            <p
              className="text-2xl md:text-3xl font-black"
              style={{ color: "#03856b" }}
            >
              4.9★
            </p>
            <p className="text-xs text-gray-500 mt-1">Creator rating</p>
          </div>
          <div className="text-center border-x border-gray-200">
            <p
              className="text-2xl md:text-3xl font-black"
              style={{ color: "#03856b" }}
            >
              99.9%
            </p>
            <p className="text-xs text-gray-500 mt-1">Uptime</p>
          </div>
          <div className="text-center">
            <p
              className="text-2xl md:text-3xl font-black"
              style={{ color: "#03856b" }}
            >
              &lt;4s
            </p>
            <p className="text-xs text-gray-500 mt-1">Avg delivery</p>
          </div>
        </div>
      </div>

      {/* Marquee keyframes */}
      <style jsx>{`
        @keyframes flowchat-marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-33.333%);
          }
        }
      `}</style>
    </section>
  );
}