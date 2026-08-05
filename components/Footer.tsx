"use client";

/* ============= Social Icons ============= */

function InstagramIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
    </svg>
  );
}

function TwitterIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.063 2.063 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

/* ============= Footer Data ============= */

const columns = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "#features" },
      { label: "Pricing", href: "#pricing" },
      { label: "How It Works", href: "#how-it-works-section" },
      { label: "Reviews", href: "#reviews" },
      { label: "Roadmap", href: "#roadmap" },
    ],
  },
  {
    title: "Platforms",
    links: [
      { label: "Instagram Auto-DM", href: "#instagram" },
      { label: "Facebook Auto-DM", href: "#facebook" },
      { label: "WhatsApp Automation", href: "#whatsapp" },
      { label: "AI Rewriting", href: "#ai" },
      { label: "Analytics", href: "#analytics" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#about" },
      { label: "Blog", href: "#blog" },
      { label: "Careers", href: "#careers" },
      { label: "Contact", href: "#contact" },
      { label: "Press", href: "#press" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "#privacy" },
      { label: "Terms of Service", href: "#terms" },
      { label: "Cookie Policy", href: "#cookies" },
      { label: "Refund Policy", href: "#refunds" },
      { label: "Data Security", href: "#security" },
    ],
  },
];

const socials = [
  { Icon: InstagramIcon, href: "#instagram", label: "Instagram" },
  { Icon: FacebookIcon, href: "#facebook", label: "Facebook" },
  { Icon: TwitterIcon, href: "#twitter", label: "Twitter" },
  { Icon: YouTubeIcon, href: "#youtube", label: "YouTube" },
  { Icon: LinkedInIcon, href: "#linkedin", label: "LinkedIn" },
];

/* ============= Main Component ============= */

export default function Footer() {
  return (
    <footer
      className="relative px-6 pt-14 pb-8 overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #0a0f1e 0%, #050810 100%)",
      }}
    >
      {/* Subtle background glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full blur-3xl opacity-15 -z-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, #03856b, transparent 70%)",
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Main footer grid */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-10">
          {/* Brand column */}
          <div className="col-span-2">
            <div className="flex flex-col leading-none mb-3">
              <span className="text-2xl font-black tracking-tight text-white">
                Flow<span style={{ color: "#4ade80" }}>chat</span>
              </span>
              <span className="text-[10px] text-gray-500 font-medium tracking-wide mt-1">
                Your AI DM Automation
              </span>
            </div>

            <p className="text-sm text-gray-400 leading-relaxed mb-5 max-w-xs">
              Turn every Instagram, Facebook & WhatsApp comment into a customer.
              Built for creators with DM automation.
            </p>

            {/* Social icons */}
            <div className="flex gap-2">
              {socials.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-gray-400 hover:text-white transition-all hover:-translate-y-0.5"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-white font-bold text-sm mb-4 tracking-wide">
                {col.title}
              </h4>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-gray-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div
          className="h-px w-full mb-6"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)",
          }}
        />

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} Flowchat. All rights reserved. Made in
            India 🇮🇳
          </p>

          <div className="flex items-center gap-4 flex-wrap justify-center">
            <span className="text-[11px] text-gray-500">
              Built on Meta & WhatsApp Business APIs
            </span>
            <span
              className="inline-flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-1 rounded-full"
              style={{
                backgroundColor: "rgba(3, 133, 107, 0.15)",
                color: "#4ade80",
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full animate-pulse"
                style={{ backgroundColor: "#4ade80" }}
              />
              All systems operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}