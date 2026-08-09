"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

/* ============= Icons ============= */

function HomeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}

function BillingIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
      <line x1="1" y1="10" x2="23" y2="10" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

/* ============= Nav Items (Platform-based) ============= */

const navItems = [
  { name: "Home", href: "/dashboard", Icon: HomeIcon, gradient: null },
  {
    name: "Instagram",
    href: "/dashboard/instagram",
    Icon: InstagramIcon,
    gradient: "linear-gradient(135deg, #8b5cf6 0%, #ec4899 50%, #f97316 100%)",
  },
  {
    name: "Facebook",
    href: "/dashboard/facebook",
    Icon: FacebookIcon,
    gradient: "linear-gradient(135deg, #2563eb, #3b82f6)",
  },
  {
    name: "WhatsApp",
    href: "/dashboard/whatsapp",
    Icon: WhatsAppIcon,
    gradient: "linear-gradient(135deg, #22c55e, #16a34a)",
  },
];

/* ============= Main Sidebar ============= */

export default function DashboardSidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {/* Mobile toggle button */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="md:hidden fixed top-4 left-4 z-50 w-10 h-10 bg-white border border-gray-200 rounded-lg flex items-center justify-center shadow-md"
      >
        {mobileOpen ? <CloseIcon /> : <MenuIcon />}
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/30 z-40"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen w-64 bg-white border-r border-gray-200 z-40 transition-transform duration-300 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="h-full flex flex-col">
          {/* Logo */}
          <Link
            href="/"
            className="flex flex-col leading-none p-6 border-b border-gray-100"
          >
            <span className="text-2xl font-black tracking-tight text-gray-900">
              Flow<span style={{ color: "#03856b" }}>chat</span>
            </span>
            <span className="text-[10px] text-gray-500 font-medium tracking-wide mt-0.5">
              Your AI DM Automation
            </span>
          </Link>

          {/* Nav items */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {/* Section 1: Overview */}
            <p className="text-[10px] font-semibold text-gray-400 tracking-widest uppercase px-3 mb-2">
              Overview
            </p>
            <Link
              href="/dashboard"
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                pathname === "/dashboard"
                  ? "text-white shadow-sm"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
              style={
                pathname === "/dashboard"
                  ? {
                      backgroundImage:
                        "linear-gradient(135deg, #03856b, #04a085)",
                    }
                  : {}
              }
            >
              <span
                className={
                  pathname === "/dashboard" ? "text-white" : "text-gray-500"
                }
              >
                <HomeIcon />
              </span>
              Home
            </Link>

            {/* Section 2: Platforms */}
            <p className="text-[10px] font-semibold text-gray-400 tracking-widest uppercase px-3 mb-2 mt-6">
              Platforms
            </p>

            {navItems.slice(1).map((item) => {
              const isActive = pathname.startsWith(item.href);

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all group ${
                    isActive
                      ? "text-white shadow-md"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                  style={
                    isActive && item.gradient
                      ? { backgroundImage: item.gradient }
                      : {}
                  }
                >
                  {/* Platform icon with colored circle */}
                  <span
                    className={`w-6 h-6 rounded-md flex items-center justify-center transition-all ${
                      isActive ? "bg-white/20 text-white" : "text-white"
                    }`}
                    style={
                      !isActive && item.gradient
                        ? { backgroundImage: item.gradient }
                        : {}
                    }
                  >
                    <div className="scale-75">
                      <item.Icon />
                    </div>
                  </span>
                  {item.name}
                </Link>
              );
            })}

            {/* Section 3: Billing & Account */}
            <p className="text-[10px] font-semibold text-gray-400 tracking-widest uppercase px-3 mb-2 mt-6">
              Billing & Account
            </p>

            <Link
              href="/dashboard/billing"
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                pathname === "/dashboard/billing"
                  ? "bg-[#03856b] text-white shadow-sm"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              <span className={pathname === "/dashboard/billing" ? "text-white" : "text-gray-500"}>
                <BillingIcon />
              </span>
              Payment Information
            </Link>
          </nav>

          {/* Upgrade Card */}
          <div className="p-4">
            <div
              className="rounded-xl p-4 relative overflow-hidden"
              style={{
                background:
                  "linear-gradient(135deg, #03856b, #04a085, #0ea5e9)",
              }}
            >
              <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full bg-white/10 blur-2xl" />

              <div className="relative">
                <div className="flex items-center gap-2 mb-2">
                  <BillingIcon />
                  <span className="text-white font-bold text-sm">
                    Upgrade to Pro
                  </span>
                </div>
                <p className="text-white/90 text-xs mb-3">
                  Unlock unlimited automations & premium features.
                </p>
                <Link
                  href="/dashboard/billing"
                  className="block w-full text-center bg-white text-[#03856b] text-xs font-semibold py-2 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Manage Subscription →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}