"use client";

import { useEffect, useState } from "react";

function StarIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

function QuoteIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" opacity="0.2">
      <path d="M9.983 3v7.391c0 5.704-3.731 9.57-8.983 10.609l-.995-2.151c2.432-.917 3.995-3.638 3.995-5.849h-4v-10h9.983zm14.017 0v7.391c0 5.704-3.748 9.571-9 10.609l-.996-2.151c2.433-.917 3.996-3.638 3.996-5.849h-3.983v-10h9.983z" />
    </svg>
  );
}

/* ============= Testimonials Data ============= */

const featured = {
  name: "Ashish_k",
  handle: "Founder, Flowchat",
  text: "We push a huge amount of traffic through our links, over a million clicks and counting. The engine behind them just works — fast, reliable, and effortless to run. One of the smoothest tools in our stack.",
  stat: "1M+",
  statLabel: "link clicks driven",
  gradient: "linear-gradient(135deg, #03856b, #04a085, #0ea5e9)",
};

const creators = [
  {
    name: "Omkar Gunjal",
    handle: "@omkargunjal",
    text: "Set it up once and it just runs. Every 'PRICE' comment gets a DM while I sleep. Wish I'd found Flowchat sooner.",
    gradient: "linear-gradient(135deg, #8b5cf6, #ec4899)",
  },
  {
    name: "Avik",
    handle: "@avik",
    text: "Genuinely loving this app. Got premium today and it already feels worth every rupee.",
    gradient: "linear-gradient(135deg, #f97316, #fbbf24)",
  },
  {
    name: "Giftin Wilson",
    handle: "@giftin_fitness",
    text: "Auto-DM doubled my course sales in a month. I sleep, Flowchat sells. Simple as that.",
    gradient: "linear-gradient(135deg, #06b6d4, #22d3ee)",
  },
  {
    name: "Priya Sharma",
    handle: "@priya.coach",
    text: "The follow-gate is genius. My follower count jumped 40% in 2 weeks.",
    gradient: "linear-gradient(135deg, #ef4444, #f472b6)",
  },
  {
    name: "Rahul Vermma",
    handle: "@rahul.astro",
    text: "500+ DMs daily used to break me. Now Flowchat does it in Hindi + Hinglish. Life changed.",
    gradient: "linear-gradient(135deg, #6366f1, #818cf8)",
  },
  {
    name: "Neha Kapoor",
    handle: "@nehakapoor.fit",
    text: "Simplest tool I've ever set up. From 'link please' comments to actual sales overnight.",
    gradient: "linear-gradient(135deg, #10b981, #34d399)",
  },
];

/* ============= Main Component ============= */

export default function TestimonialsSection() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 }
    );
    const el = document.getElementById("testimonials-section");
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="testimonials-section"
      className="py-10 px-6 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #0a0f1e 0%, #111827 50%, #0a0f1e 100%)",
      }}
    >
      {/* Background glows */}
      <div
        className="absolute top-0 left-1/4 w-[400px] h-[300px] rounded-full blur-3xl opacity-20 -z-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, #03856b, transparent 70%)",
        }}
      />
      <div
        className="absolute bottom-0 right-1/4 w-[400px] h-[300px] rounded-full blur-3xl opacity-15 -z-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, #8b5cf6, transparent 70%)",
        }}
      />

      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.03] -z-0"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header — compact */}
        <div className="text-center mb-6">
          <span
            className="inline-flex items-center gap-2 text-[10px] font-semibold tracking-[0.2em] uppercase px-2.5 py-1 rounded-full border mb-2"
            style={{
              backgroundColor: "rgba(3, 133, 107, 0.15)",
              borderColor: "rgba(3, 133, 107, 0.35)",
              color: "#4ade80",
            }}
          >
            <span
              className="w-1 h-1 rounded-full animate-pulse"
              style={{ backgroundColor: "#4ade80" }}
            />
            Loved by Creators
          </span>

          <h2
            className={`text-2xl md:text-4xl font-black text-white leading-[1.1] tracking-tight mb-2 transition-all duration-700 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            Real creators.{" "}
            <span
              style={{
                backgroundImage:
                  "linear-gradient(135deg, #8b5cf6 0%, #ec4899 50%, #f97316 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Real results.
            </span>
          </h2>

          <p
            className={`text-gray-400 text-sm transition-all duration-700 delay-100 ${
              visible ? "opacity-100" : "opacity-0"
            }`}
          >
            Over 10,000 creators and businesses trust Flowchat every day.
          </p>
        </div>

        {/* Featured Testimonial (Ashish_k) — compact */}
        <div
          className={`relative rounded-2xl p-5 md:p-6 mb-4 shadow-2xl overflow-hidden backdrop-blur-xl transition-all duration-700 delay-200 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)",
            border: "1px solid rgba(3, 133, 107, 0.3)",
          }}
        >
          {/* Quote icon in corner */}
          <div
            className="absolute top-4 right-4"
            style={{ color: "#4ade80" }}
          >
            <QuoteIcon />
          </div>

          <div className="grid md:grid-cols-3 gap-4 md:gap-6 items-center">
            {/* Left — Quote + name (2 cols) */}
            <div className="md:col-span-2">
              {/* Stars */}
              <div className="flex gap-0.5 mb-2 text-yellow-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <StarIcon key={i} />
                ))}
              </div>

              {/* Quote */}
              <p className="text-sm md:text-base font-medium text-white leading-relaxed mb-3">
                "{featured.text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-2.5">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-base shadow-md"
                  style={{ backgroundImage: featured.gradient }}
                >
                  {featured.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="font-bold text-white text-sm">
                    {featured.name}
                  </p>
                  <p className="text-xs text-gray-400">{featured.handle}</p>
                </div>
              </div>
            </div>

            {/* Right — Stat (1 col) */}
            <div
              className="text-center md:text-left md:border-l md:pl-6"
              style={{ borderColor: "rgba(255, 255, 255, 0.1)" }}
            >
              <p
                className="text-4xl md:text-5xl font-black leading-none mb-1"
                style={{
                  backgroundImage: featured.gradient,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {featured.stat}
              </p>
              <p className="text-xs text-gray-400 font-medium">
                {featured.statLabel}
              </p>
            </div>
          </div>
        </div>

        {/* Creator Grid — 3 cols compact */}
        <div className="grid md:grid-cols-3 gap-3">
          {creators.slice(0, 6).map((c, i) => (
            <div
              key={c.name}
              className={`rounded-xl p-4 backdrop-blur-xl border transition-all duration-500 hover:-translate-y-1 hover:border-white/20 ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
              style={{
                transitionDelay: `${400 + i * 80}ms`,
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
                borderColor: "rgba(255,255,255,0.08)",
              }}
            >
              {/* Stars */}
              <div className="flex gap-0.5 mb-2 text-yellow-400">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <StarIcon key={idx} />
                ))}
              </div>

              {/* Quote */}
              <p className="text-xs text-gray-300 leading-relaxed mb-3">
                "{c.text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-2">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs shadow-sm"
                  style={{ backgroundImage: c.gradient }}
                >
                  {c.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="font-bold text-white text-xs">{c.name}</p>
                  <p className="text-[10px] text-gray-400">{c.handle}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <p
          className={`text-center text-[11px] text-gray-500 mt-6 transition-opacity duration-1000 ${
            visible ? "opacity-100" : "opacity-0"
          }`}
          style={{ transitionDelay: "1000ms" }}
        >
          Testimonials from verified Flowchat users · Featured used with permission
        </p>
      </div>
    </section>
  );
}