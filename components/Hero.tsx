"use client";

import { useEffect, useState } from "react";
import { ArrowRight, MessageCircle } from "lucide-react";

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <section className="relative pt-36 pb-24 px-6 overflow-hidden">
      {/* Background gradient blobs */}
      <div className="absolute top-20 left-1/4 w-96 h-96 bg-purple-300/30 rounded-full blur-3xl -z-10" />
      <div className="absolute top-40 right-1/4 w-96 h-96 bg-pink-300/30 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-orange-200/30 rounded-full blur-3xl -z-10" />

      <div className="max-w-6xl mx-auto text-center">
        {/* Badge */}
        <div
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 shadow-sm mb-8 transition-all duration-700 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <span
            className="w-2 h-2 rounded-full animate-pulse"
            style={{ backgroundColor: "#03856b" }}
          />
          <span className="text-sm font-medium text-gray-700">
            Powered by AI · Official APIs
          </span>
        </div>

        {/* Headline */}
        <h1
          className={`text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-gray-900 leading-[1.05] mb-6 transition-all duration-700 delay-100 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          Instagram, Facebook & <br />
          WhatsApp,{" "}
          <span
            style={{
              backgroundImage:
                "linear-gradient(135deg, #8b5cf6 0%, #ec4899 50%, #f97316 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            DM Automation.
          </span>
        </h1>

        {/* Subtitle */}
        <p
          className={`text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-10 transition-all duration-700 delay-200 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          Meet <strong className="text-gray-900">Flowchat</strong> — the
          AI-powered comment-to-DM engine built for creators & businesses. Turn
          every comment into a customer, automatically.
        </p>

        {/* CTAs */}
        <div
          className={`flex flex-col sm:flex-row items-center justify-center gap-4 mb-8 transition-all duration-700 delay-300 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <a
            href="#signup"
            style={{ backgroundColor: "#03856b" }}
            className="group inline-flex items-center gap-2 text-white px-8 py-4 rounded-full font-semibold text-base transition-all shadow-xl hover:shadow-2xl hover:-translate-y-0.5 hover:opacity-90"
          >
            Create your free account
            <ArrowRight
              size={18}
              className="group-hover:translate-x-1 transition-transform"
            />
          </a>
          <a
            href="#demo"
            className="inline-flex items-center gap-2 bg-white hover:bg-gray-50 text-gray-900 px-8 py-4 rounded-full font-semibold text-base border border-gray-200 transition-all hover:-translate-y-0.5"
          >
            Watch demo
          </a>
        </div>

        <p
          className={`text-sm text-gray-500 mb-14 transition-all duration-700 delay-400 ${
            mounted ? "opacity-100" : "opacity-0"
          }`}
        >
          7 days free · no card required · official Meta APIs
        </p>

        {/* Platform badges */}
        <div
          className={`flex flex-wrap items-center justify-center gap-4 transition-all duration-700 delay-500 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <PlatformBadge
            icon={<InstagramIcon />}
            name="Instagram"
            gradient="linear-gradient(135deg, #8b5cf6 0%, #ec4899 50%, #f97316 100%)"
          />
          <PlatformBadge
            icon={<FacebookIcon />}
            name="Facebook"
            gradient="linear-gradient(135deg, #2563eb, #3b82f6)"
          />
          <PlatformBadge
            icon={<MessageCircle size={20} />}
            name="WhatsApp"
            gradient="linear-gradient(135deg, #22c55e, #16a34a)"
          />
        </div>
      </div>
    </section>
  );
}

function PlatformBadge({
  icon,
  name,
  gradient,
}: {
  icon: React.ReactNode;
  name: string;
  gradient: string;
}) {
  return (
    <div className="flex items-center gap-2 px-5 py-2.5 bg-white rounded-full shadow-md border border-gray-100">
      <div
        className="w-8 h-8 rounded-full flex items-center justify-center text-white"
        style={{ backgroundImage: gradient }}
      >
        {icon}
      </div>
      <span className="font-semibold text-gray-900">{name}</span>
    </div>
  );
}

/* Custom Instagram SVG */
function InstagramIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

/* Custom Facebook SVG */
function FacebookIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
    </svg>
  );
}