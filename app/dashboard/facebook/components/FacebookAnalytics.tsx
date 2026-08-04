"use client";

import { useState } from "react";

/* ============= Types ============= */

export interface Automation {
  id: string;
  keyword: string;
  postCaption: string;
  message: string;
  followGate: boolean;
  status: "active" | "paused";
  dmsSent: number;
  clicks: number;
  createdAt: string;
  postUrl?: string | null;
  postType?: string | null;
  triggerScope?: string;
}

interface Props {
  isConnected: boolean;
  automations: Automation[];
  onToggleStatus: (id: string) => void;
  onDelete: (id: string) => void;
  onCreate: (auto: Automation) => void;
}

/* ============= Icons ============= */

function PlusIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

function MoreVerticalIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="1" />
      <circle cx="12" cy="5" r="1" />
      <circle cx="12" cy="19" r="1" />
    </svg>
  );
}

function BoltIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
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

/* ============= Main Component ============= */

export default function FacebookAnalytics({ isConnected }: Props) {
  return (
    <section id="analytics" className="scroll-mt-6">
      <div className="flex items-start justify-between gap-4 mb-3 flex-wrap">
        <div>
          <h2 className="text-xl font-black text-gray-900">3. Analytics</h2>
          <p className="text-sm text-gray-500">
            Real-time performance of your Facebook automations.
          </p>
        </div>
      </div>

      {!isConnected ? (
        <div className="bg-white rounded-2xl p-8 border border-dashed border-gray-200 text-center">
          <p className="text-sm text-gray-500">
            Connect Facebook to see real analytics 📊
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl p-8 border border-gray-100 text-center">
          <p className="text-sm font-semibold text-gray-800 mb-1">
            No analytics data yet
          </p>
          <p className="text-xs text-gray-500">
            Analytics will appear here once your Facebook automations start receiving comments and sending DMs.
          </p>
        </div>
      )}
    </section>
  );
}