"use client";

import { useEffect, useState } from "react";

function ChevronDown({ open }: { open: boolean }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{
        transform: open ? "rotate(180deg)" : "rotate(0deg)",
        transition: "transform 0.3s ease",
      }}
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

/* ============= FAQ Data ============= */

const faqs = [
  {
    q: "Is this safe / allowed by Instagram, Facebook & WhatsApp?",
    a: "Yes, 100% safe. Flowchat runs entirely on official Meta API and WhatsApp Business API — the same ones approved for business messaging. No password sharing, no grey-area automation. Your accounts stay in good standing.",
  },
  {
    q: "Do I need a Facebook page or Business Manager?",
    a: "No. You connect your Instagram, Facebook, or WhatsApp directly in one tap. No Facebook page mandatory, no Business Manager setup, no code — just login and go.",
  },
  {
    q: "Will my DMs look spammy or repetitive?",
    a: "No. Flowchat's AI writes a fresh variation of every message so replies read naturally and human. Instagram never flags your account, and your followers never suspect a bot.",
  },
  {
    q: "What happens after the 7 days of free trial?",
    a: "You choose. Add a card to continue at ₹99/month (or ₹799/year for yearly), or do nothing and the trial simply ends. No surprise charges — the trial never asks for a card upfront.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Anytime, in just a couple of taps. No lock-in contracts, no cancellation fees. Cancel from your dashboard whenever you want.",
  },
  {
    q: "Do you support Hindi & Hinglish DMs?",
    a: "Yes! Flowchat's AI is trained to write natural Hindi and Hinglish replies — perfect for Indian creators, coaches, and small businesses whose audience speaks these languages.",
  },
];

/* ============= Main Component ============= */

export default function FAQSection() {
  const [visible, setVisible] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First one open by default

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.15 }
    );
    const el = document.getElementById("faq-section");
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <section
      id="faq-section"
      className="py-14 px-6 relative overflow-hidden bg-white"
    >
      {/* Subtle background pattern */}
      <div
        className="absolute inset-0 opacity-[0.4] -z-0"
        style={{
          backgroundImage:
            "radial-gradient(#e5e7eb 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="max-w-3xl mx-auto relative z-10">
        {/* Header */}
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
            Questions
          </span>

          <h2
            className={`text-3xl md:text-5xl font-black text-gray-900 leading-[1.1] tracking-tight mb-3 transition-all duration-700 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            Good to{" "}
            <span
              style={{
                backgroundImage:
                  "linear-gradient(135deg, #03856b, #04a085, #0ea5e9)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              know.
            </span>
          </h2>

          <p
            className={`text-gray-500 text-sm transition-all duration-700 delay-100 ${
              visible ? "opacity-100" : "opacity-0"
            }`}
          >
            Answers to what creators ask most. Still curious?{" "}
            <a
              href="#contact"
              className="font-semibold hover:underline"
              style={{ color: "#03856b" }}
            >
              Reach out
            </a>
            .
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className={`rounded-2xl border transition-all duration-500 ${
                  isOpen
                    ? "shadow-lg"
                    : "shadow-sm hover:shadow-md"
                } ${
                  visible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
                style={{
                  transitionDelay: `${200 + i * 80}ms`,
                  backgroundColor: isOpen ? "#f9fafb" : "#ffffff",
                  borderColor: isOpen
                    ? "rgba(3, 133, 107, 0.3)"
                    : "#e5e7eb",
                }}
              >
                {/* Question button */}
                <button
                  onClick={() => toggle(i)}
                  className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
                >
                  <span className="text-sm md:text-base font-bold text-gray-900 leading-snug">
                    {faq.q}
                  </span>
                  <span
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${
                      isOpen ? "text-white" : "text-gray-600 bg-gray-100"
                    }`}
                    style={
                      isOpen
                        ? {
                            backgroundImage:
                              "linear-gradient(135deg, #03856b, #04a085)",
                          }
                        : {}
                    }
                  >
                    <ChevronDown open={isOpen} />
                  </span>
                </button>

                {/* Answer (expandable) */}
                <div
                  className="overflow-hidden transition-all duration-500 ease-in-out"
                  style={{
                    maxHeight: isOpen ? "300px" : "0px",
                    opacity: isOpen ? 1 : 0,
                  }}
                >
                  <div className="px-5 pb-4 pt-0">
                    <div
                      className="h-px w-full mb-3"
                      style={{
                        background:
                          "linear-gradient(90deg, transparent, rgba(3,133,107,0.2), transparent)",
                      }}
                    />
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div
          className={`text-center mt-8 transition-opacity duration-1000 ${
            visible ? "opacity-100" : "opacity-0"
          }`}
          style={{ transitionDelay: "800ms" }}
        >
          <p className="text-sm text-gray-500 mb-3">
            Still have questions? We're one message away.
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-sm border-2 transition-all hover:-translate-y-0.5"
            style={{
              borderColor: "#03856b",
              color: "#03856b",
              backgroundColor: "rgba(3, 133, 107, 0.05)",
            }}
          >
            💬 Contact support
          </a>
        </div>
      </div>
    </section>
  );
}