"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import {
  LayoutDashboard,
  MessageCircle,
  CreditCard,
} from "lucide-react";
import InstagramIcon from "@/components/dashboard/InstagramIcon";

const MENU = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "AutoDM", href: "/dashboard/automation", icon: MessageCircle },
  { label: "Billing", href: "/dashboard/billing", icon: CreditCard },
];

interface SidebarProps {
  userName?: string;
  isExpired?: boolean;
  daysRemaining?: number;
}

export default function DashboardSidebar({
  userName,
  isExpired,
  daysRemaining,
}: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* ===== Desktop sidebar ===== */}
      <aside className="hidden md:flex fixed inset-y-0 left-0 w-64 flex-col bg-white border-r border-gray-100 z-40">
        {/* Logo */}
        <div className="px-6 py-6">
          <Link href="/" className="inline-flex flex-col leading-none">
            <span className="text-2xl font-black tracking-tight text-gray-900">
              Flow<span style={{ color: "#03856b" }}>chat</span>
            </span>
            <span className="text-[10px] text-gray-400 font-medium tracking-wide mt-1">
              AI DM AUTOMATION
            </span>
          </Link>
        </div>

        {/* Menu */}
        <nav className="flex-1 px-3 space-y-1 overflow-y-auto">
          {MENU.map((item) => {
            const active =
              item.href === "/dashboard"
                ? pathname === "/dashboard"
                : pathname.startsWith(item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                  active
                    ? "bg-[#03856b] text-white shadow-md shadow-[#03856b]/20"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <Icon size={18} strokeWidth={2.2} />
                {item.label}
                {item.label === "AutoDM" && (
                  <span
                    className={`ml-auto text-[9px] font-black px-2 py-0.5 rounded-full ${
                      active ? "bg-white/20 text-white" : "bg-[#03856b]/10 text-[#03856b]"
                    }`}
                  >
                    NEW
                  </span>
                )}
              </Link>
            );
          })}

          {/* Instagram connection status */}
          <div className="mt-4 p-4 rounded-xl bg-gradient-to-br from-[#8b5cf6] via-[#ec4899] to-[#f97316] text-white">
            <div className="flex items-center gap-2">
              <InstagramIcon size={16} />
              <p className="text-xs font-black uppercase tracking-wide">
                AutoDM Engine
              </p>
            </div>
            <p className="text-[11px] text-white/80 mt-1.5 leading-relaxed">
              Comment keyword → automatic DM. Runs 24/7 on Meta&apos;s official API.
            </p>
          </div>
        </nav>

        {/* User */}
        <div className="p-4 border-t border-gray-100">
          <div className="flex items-center gap-3">
            <UserButton
              appearance={{ elements: { avatarBox: "w-9 h-9" } }}
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-gray-900 truncate">
                {userName || "Creator"}
              </p>
              <p className="text-[11px] text-gray-400 truncate">
                {isExpired ? "Trial expired" : `${daysRemaining ?? 0} days left`}
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* ===== Mobile top bar ===== */}
      <div className="md:hidden sticky top-0 z-40 bg-white border-b border-gray-100 px-4 py-3">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-xl font-black text-gray-900">
            Flow<span style={{ color: "#03856b" }}>chat</span>
          </Link>
          <UserButton appearance={{ elements: { avatarBox: "w-8 h-8" } }} />
        </div>
        <nav className="flex gap-2 mt-3 overflow-x-auto pb-1">
          {MENU.map((item) => {
            const active =
              item.href === "/dashboard"
                ? pathname === "/dashboard"
                : pathname.startsWith(item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap ${
                  active
                    ? "bg-[#03856b] text-white"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                <Icon size={14} />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </>
  );
}
