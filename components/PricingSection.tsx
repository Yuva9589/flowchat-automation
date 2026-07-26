"use client";

import { useEffect, useState } from "react";

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function ArrowRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

/* ============= Plans Data ============= */

const plans = [
  {
    name: "Free",
    tagline: "7 days trial",
    price: "₹0",
    priceUnit: "for 7 days",
    description: "All Social Account full Automation. Upgrade anytime to keep everything running after your trial.",
    features: [
      "Unlimited comment-to-DM & story replies",
      "AI replies (Hindi & Hinglish)",
      "Link-in-bio, products, courses & bookings",
      "Smart links & lead capture",
      "Contacts, email campaigns & analytics",
    ],
    cta: "Start free trial",
    ctaHref: "#signup",
    highlight: false,
    badge: null,
  },
  {
    name: "Premium",
    tagline: "Monthly plan",
    price: "₹99",
    priceUnit: "/month",
    description: "Everything in Free, forever. Cancel anytime. UPI AutoPay supported.",
    features: [
      "Unlimited comment & story-reply automations",
      "Auto-DM with Hindi / Hinglish replies",
      "Link-in-bio, smart links & paywalls",
      "Email campaigns & analytics",
      "Priority customer support",
    ],
    cta: "Subscribe · ₹99/month",
    ctaHref: "#subscribe-monthly",
    highlight: true,
    badge: "MOST POPULAR",
    footerNote: "₹99/month via UPI AutoPay · Cancel anytime",
    altLinks: [
      { label: "One-time ₹99 for a month", href: "#one-time-monthly" },
      { label: "Outside India? Pay with Stripe", href: "#stripe" },
    ],
  },
  {
    name: "Pro",
    tagline: "Yearly plan",
    price: "₹799",
    priceUnit: "/year",
    description: "Save 33% with yearly billing. All Premium features + priority perks.",
    features: [
      "Everything in Premium plan",
      "Auto-DM with Hindi / Hinglish replies",
      "Link-in-bio, smart links & paywalls",
      "Email campaigns & analytics",
      "Save ~₹389 vs monthly",
    ],
    cta: "Subscribe · ₹799/year",
    ctaHref: "#subscribe-yearly",
    highlight: false,
    badge: "BEST VALUE",
    footerNote: "₹799/year via UPI AutoPay · Cancel anytime",
    altLinks: [
      { label: "One-time ₹799 for a year", href: "#one-time-yearly" },
      { label: "Outside India? Pay with Stripe", href: "#stripe" },
    ],
  },
];

/* ============= Main Component ============= */

export default function PricingSection() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.15 }
    );
    const el = document.getElementById("pricing-section");
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="pricing-section"
      className="py-16 px-6 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #ffffff 0%, #f9fafb 100%)",
      }}
    >
      {/* Background glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full blur-3xl opacity-10 -z-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, #03856b, transparent 70%)",
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-10">
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
            Pricing
          </span>

          <h2
            className={`text-3xl md:text-5xl font-black text-gray-900 leading-[1.1] tracking-tight mb-3 transition-all duration-700 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            Start with{" "}
            <span
              style={{
                backgroundImage:
                  "linear-gradient(135deg, #03856b, #04a085, #0ea5e9)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              7 days free.
            </span>
          </h2>

          <p
            className={`text-gray-500 max-w-lg mx-auto transition-all duration-700 delay-100 ${
              visible ? "opacity-100" : "opacity-0"
            }`}
          >
            Try everything first. Add a card only if you love it.
          </p>
        </div>

        {/* 3 Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-5">
          {plans.map((plan, i) => (
            <div
              key={plan.name}
              className={`relative rounded-3xl p-6 transition-all duration-700 ${
                plan.highlight
                  ? "shadow-2xl md:-translate-y-2 md:scale-[1.02]"
                  : "shadow-md hover:shadow-xl hover:-translate-y-1"
              } ${
                visible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{
                transitionDelay: `${200 + i * 150}ms`,
                background: plan.highlight
                  ? "linear-gradient(180deg, #ffffff 0%, #f0fdf9 100%)"
                  : "#ffffff",
                border: plan.highlight
                  ? "2px solid #03856b"
                  : "1px solid #e5e7eb",
              }}
            >
              {/* Badge */}
              {plan.badge && (
                <div
                  className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest text-white shadow-lg"
                  style={{
                    backgroundImage: plan.highlight
                      ? "linear-gradient(135deg, #03856b, #04a085)"
                      : "linear-gradient(135deg, #8b5cf6, #ec4899)",
                  }}
                >
                  {plan.badge}
                </div>
              )}

              {/* Plan name + tagline */}
              <div className="mb-4">
                <h3 className="text-xl font-black text-gray-900">
                  {plan.name}
                </h3>
                <p className="text-xs text-gray-500 font-medium mt-0.5">
                  {plan.tagline}
                </p>
              </div>

              {/* Price */}
              <div className="mb-4 flex items-baseline gap-1">
                <span
                  className="text-4xl md:text-5xl font-black leading-none"
                  style={
                    plan.highlight
                      ? {
                          backgroundImage:
                            "linear-gradient(135deg, #03856b, #04a085)",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          backgroundClip: "text",
                        }
                      : { color: "#111827" }
                  }
                >
                  {plan.price}
                </span>
                <span className="text-sm text-gray-500 font-medium">
                  {plan.priceUnit}
                </span>
              </div>

              {/* Description */}
              <p className="text-sm text-gray-600 leading-relaxed mb-5">
                {plan.description}
              </p>

              {/* Features */}
              <ul className="space-y-2.5 mb-6">
                {plan.features.map((feat, j) => (
                  <li key={j} className="flex items-start gap-2.5">
                    <span
                      className="mt-0.5 w-5 h-5 rounded-full flex items-center justify-center text-white flex-shrink-0"
                      style={{
                        backgroundImage:
                          "linear-gradient(135deg, #03856b, #04a085)",
                      }}
                    >
                      <CheckIcon />
                    </span>
                    <span className="text-sm text-gray-700 leading-snug">
                      {feat}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <a
                href={plan.ctaHref}
                className={`group flex items-center justify-center gap-2 w-full py-3 rounded-full font-semibold text-sm transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 ${
                  plan.highlight
                    ? "text-white"
                    : "bg-gray-900 text-white hover:bg-gray-800"
                }`}
                style={
                  plan.highlight
                    ? {
                        backgroundImage:
                          "linear-gradient(135deg, #03856b, #04a085)",
                      }
                    : {}
                }
              >
                {plan.cta}
                <span className="group-hover:translate-x-1 transition-transform">
                  <ArrowRight />
                </span>
              </a>

              {/* Footer note */}
              {plan.footerNote && (
                <p className="text-[11px] text-gray-500 text-center mt-3">
                  {plan.footerNote}
                </p>
              )}

              {/* Alternative payment links */}
              {plan.altLinks && (
                <div className="mt-3 space-y-1 text-center">
                  {plan.altLinks.map((link, k) => (
                    <a
                      key={k}
                      href={link.href}
                      className="block text-[11px] text-gray-500 hover:text-[#03856b] transition-colors"
                    >
                      {link.label} →
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom trust line */}
        <p
          className={`text-center text-sm text-gray-500 mt-8 transition-opacity duration-1000 ${
            visible ? "opacity-100" : "opacity-0"
          }`}
          style={{ transitionDelay: "800ms" }}
        >
          🔒 Secure UPI AutoPay & Stripe · Cancel anytime · No hidden fees
        </p>
      </div>
    </section>
  );
}