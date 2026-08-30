"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { useUser, UserButton } from "@clerk/nextjs";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isSignedIn, isLoaded } = useUser();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { name: "Features", href: "#features" },
    { name: "Platforms", href: "#platforms" },
    { name: "Pricing", href: "#pricing-section" },
    { name: "Reviews", href: "#testimonials-section" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 backdrop-blur-xl border-b border-gray-200/50 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex flex-col leading-none">
          <span className="text-2xl font-black tracking-tight text-gray-900">
            Flow<span style={{ color: "#03856b" }}>chat</span>
          </span>
          <span className="text-[10px] text-gray-500 font-medium tracking-wide mt-0.5">
            Your AI DM Automation
          </span>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-gray-700 hover:text-[#03856b] transition-colors"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Right side — Auth */}
        <div className="hidden md:flex items-center gap-3">
          {!isLoaded ? (
            /* Loading placeholder to avoid layout shift */
            <div className="w-40 h-10" />
          ) : isSignedIn ? (
            /* Logged IN state */
            <>
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "w-9 h-9",
                  },
                }}
              />
            </>
          ) : (
            /* Logged OUT state */
            <>
              <a
                href="/sign-in"
                className="text-sm font-medium text-gray-700 hover:text-[#03856b] transition-colors"
              >
                Log in
              </a>
              <a
                href="/sign-up"
                style={{ backgroundColor: "#03856b" }}
                className="text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 hover:opacity-90"
              >
                Get Started Free
              </a>
            </>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-gray-900"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-6 py-4 space-y-3">
          {links.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block text-gray-700 font-medium py-2"
            >
              {link.name}
            </a>
          ))}

          {!isLoaded ? null : isSignedIn ? null : (
            <>
              <a
                href="/sign-in"
                className="block text-gray-700 font-medium py-2"
              >
                Log in
              </a>
              <a
                href="/sign-up"
                style={{ backgroundColor: "#03856b" }}
                className="block text-white text-center px-5 py-3 rounded-full font-semibold mt-3"
              >
                Get Started Free
              </a>
            </>
          )}
        </div>
      )}
    </nav>
  );
}