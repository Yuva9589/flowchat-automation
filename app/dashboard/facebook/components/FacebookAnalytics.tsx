"use client";

import { useState, useMemo } from "react";

/* ============= Types ============= */

interface Props {
  isConnected: boolean;
}

interface DayData {
  date: Date;
  day: string;
  dms: number;
  clicks: number;
}

/* ============= Icons ============= */

function CheckCircleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}

function TrendUpIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </svg>
  );
}

function ChevronDownIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

/* ============= Fake Data Generator ============= */

function generateAnalyticsData(): DayData[] {
  const data: DayData[] = [];
  const today = new Date();

  for (let i = 89; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const baseDMs = 25 + Math.floor(Math.random() * 60);
    const dms = baseDMs + Math.floor(Math.random() * 30);
    const clicks = Math.floor(dms * (0.6 + Math.random() * 0.3));

    data.push({
      date: d,
      day: d.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      dms,
      clicks,
    });
  }
  return data;
}

const topKeywords = [
  { keyword: "OFFER", dms: 189, percentage: 55 },
  { keyword: "INFO", dms: 76, percentage: 22 },
  { keyword: "DEMO", dms: 79, percentage: 23 },
];

const topPosts = [
  { caption: "Drop OFFER for 30% off — today only! 🎁", dms: 189, keyword: "OFFER" },
  { caption: "Comment INFO for full product details", dms: 76, keyword: "INFO" },
  { caption: "Say DEMO to book a free call 📞", dms: 79, keyword: "DEMO" },
];

/* ============= Main Component ============= */

export default function FacebookAnalytics({ isConnected }: Props) {
  const allAnalyticsData = useMemo(() => generateAnalyticsData(), []);

  const [dateRange, setDateRange] = useState<
    "7d" | "14d" | "30d" | "90d" | "custom"
  >("7d");
  const [dateOpen, setDateOpen] = useState(false);
  const [customStart, setCustomStart] = useState("");
  const [customEnd, setCustomEnd] = useState("");
  const [showCustomPicker, setShowCustomPicker] = useState(false);

  const getFilteredData = () => {
    if (dateRange === "custom" && customStart && customEnd) {
      const start = new Date(customStart);
      const end = new Date(customEnd);
      end.setHours(23, 59, 59);
      return allAnalyticsData.filter((d) => d.date >= start && d.date <= end);
    }
    const days =
      dateRange === "7d"
        ? 7
        : dateRange === "14d"
        ? 14
        : dateRange === "30d"
        ? 30
        : 90;
    return allAnalyticsData.slice(-days);
  };

  const chartData = getFilteredData();

  const getRangeLabel = () => {
    if (dateRange === "custom" && customStart && customEnd) {
      const s = new Date(customStart).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
      const e = new Date(customEnd).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
      return `${s} - ${e}`;
    }
    const labels: Record<string, string> = {
      "7d": "Last 7 days",
      "14d": "Last 14 days",
      "30d": "Last 30 days",
      "90d": "Last 90 days",
    };
    return labels[dateRange] || "Select range";
  };

  const applyCustomRange = () => {
    if (!customStart || !customEnd) {
      alert("Please select both start and end dates");
      return;
    }
    if (new Date(customStart) > new Date(customEnd)) {
      alert("Start date must be before end date");
      return;
    }
    setDateRange("custom");
    setShowCustomPicker(false);
    setDateOpen(false);
  };

  const totalDMs = chartData.reduce((sum, d) => sum + d.dms, 0);
  const totalClicks = chartData.reduce((sum, d) => sum + d.clicks, 0);
  const maxDM =
    chartData.length > 0 ? Math.max(...chartData.map((d) => d.dms)) : 1;

  const analyticsStats = [
    {
      label: "DMs Sent",
      value: totalDMs.toLocaleString(),
      change: "+15%",
      color: "#2563eb",
    },
    {
      label: "Link Clicks",
      value: totalClicks.toLocaleString(),
      change: "+22%",
      color: "#8b5cf6",
    },
    {
      label: "Delivery Rate",
      value: "82%",
      change: "+5%",
      color: "#f97316",
    },
    {
      label: "Avg Speed",
      value: "2.8s",
      change: "-0.5s",
      color: "#ec4899",
    },
  ];

  return (
    <section id="analytics" className="scroll-mt-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-3 flex-wrap">
        <div>
          <h2 className="text-xl font-black text-gray-900">3. Analytics</h2>
          <p className="text-sm text-gray-500">
            Overview of your Facebook automation performance.
          </p>
        </div>

        {/* Date range dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              setDateOpen(!dateOpen);
              setShowCustomPicker(false);
            }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 bg-white text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-all"
          >
            📅 {getRangeLabel()}
            <ChevronDownIcon />
          </button>

          {dateOpen && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => {
                  setDateOpen(false);
                  setShowCustomPicker(false);
                }}
              />
              <div className="absolute right-0 top-11 z-20 w-72 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden">
                {!showCustomPicker ? (
                  <>
                    <div className="px-4 py-2.5 border-b border-gray-100">
                      <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">
                        Quick Select
                      </p>
                    </div>
                    {[
                      { key: "7d", label: "Last 7 days" },
                      { key: "14d", label: "Last 14 days" },
                      { key: "30d", label: "Last 30 days" },
                      { key: "90d", label: "Last 90 days" },
                    ].map((opt) => (
                      <button
                        key={opt.key}
                        onClick={() => {
                          setDateRange(opt.key as any);
                          setDateOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2.5 text-sm transition-colors flex items-center justify-between ${
                          dateRange === opt.key
                            ? "font-bold bg-blue-50"
                            : "text-gray-700 hover:bg-gray-50"
                        }`}
                        style={dateRange === opt.key ? { color: "#2563eb" } : {}}
                      >
                        {opt.label}
                        {dateRange === opt.key && (
                          <span style={{ color: "#2563eb" }}>
                            <CheckCircleIcon />
                          </span>
                        )}
                      </button>
                    ))}
                    <div className="border-t border-gray-100" />
                    <button
                      onClick={() => setShowCustomPicker(true)}
                      className={`w-full text-left px-4 py-2.5 text-sm transition-colors flex items-center gap-2 ${
                        dateRange === "custom"
                          ? "font-bold bg-blue-50"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                      style={dateRange === "custom" ? { color: "#2563eb" } : {}}
                    >
                      <span>🎯</span>
                      <span className="flex-1">Custom range...</span>
                      {dateRange === "custom" && (
                        <span style={{ color: "#2563eb" }}>
                          <CheckCircleIcon />
                        </span>
                      )}
                    </button>
                  </>
                ) : (
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-4">
                      <p className="text-sm font-bold text-gray-900">
                        Custom Range
                      </p>
                      <button
                        onClick={() => setShowCustomPicker(false)}
                        className="text-xs text-gray-500 hover:text-gray-700 font-semibold"
                      >
                        ← Back
                      </button>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <label className="block text-[11px] font-semibold text-gray-700 mb-1 uppercase tracking-wider">
                          Start Date
                        </label>
                        <input
                          type="date"
                          value={customStart}
                          onChange={(e) => setCustomStart(e.target.value)}
                          max={new Date().toISOString().split("T")[0]}
                          className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-gray-700 mb-1 uppercase tracking-wider">
                          End Date
                        </label>
                        <input
                          type="date"
                          value={customEnd}
                          onChange={(e) => setCustomEnd(e.target.value)}
                          max={new Date().toISOString().split("T")[0]}
                          className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
                        />
                      </div>
                    </div>

                    <div className="mt-4 flex items-center gap-2">
                      <button
                        onClick={() => {
                          setCustomStart("");
                          setCustomEnd("");
                        }}
                        className="flex-1 px-3 py-2 rounded-lg text-xs font-semibold text-gray-700 border border-gray-200 hover:bg-gray-50 transition-all"
                      >
                        Clear
                      </button>
                      <button
                        onClick={applyCustomRange}
                        className="flex-1 px-3 py-2 rounded-lg text-xs font-semibold text-white transition-all shadow-md hover:shadow-lg"
                        style={{
                          backgroundImage:
                            "linear-gradient(135deg, #2563eb, #3b82f6)",
                        }}
                      >
                        Apply
                      </button>
                    </div>

                    <p className="text-[10px] text-gray-400 mt-3 text-center">
                      📊 Data available for last 90 days
                    </p>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Content */}
      {!isConnected ? (
        <div className="bg-white rounded-2xl p-8 border border-dashed border-gray-200 text-center">
          <p className="text-sm text-gray-500">
            Connect Facebook to see analytics 📊
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {analyticsStats.map((s, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-all"
              >
                <p className="text-[11px] text-gray-500 font-medium mb-1.5 uppercase tracking-wider">
                  {s.label}
                </p>
                <div className="flex items-baseline gap-2">
                  <p
                    className="text-2xl md:text-3xl font-black leading-none"
                    style={{ color: s.color }}
                  >
                    {s.value}
                  </p>
                  <span
                    className="inline-flex items-center gap-0.5 text-[10px] font-semibold px-1.5 py-0.5 rounded"
                    style={{
                      backgroundColor:
                        s.change.startsWith("-") && s.label !== "Avg Speed"
                          ? "rgba(239, 68, 68, 0.1)"
                          : "rgba(37, 99, 235, 0.1)",
                      color:
                        s.change.startsWith("-") && s.label !== "Avg Speed"
                          ? "#ef4444"
                          : "#2563eb",
                    }}
                  >
                    <TrendUpIcon />
                    {s.change}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Chart Card */}
          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
              <div>
                <h3 className="text-sm font-bold text-gray-900">DMs Sent</h3>
                <p className="text-[11px] text-gray-500">
                  {chartData.length} days · {getRangeLabel()}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{
                      backgroundImage:
                        "linear-gradient(135deg, #2563eb, #3b82f6)",
                    }}
                  />
                  <span className="text-[11px] text-gray-600 font-medium">
                    DMs
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{
                      backgroundImage:
                        "linear-gradient(135deg, #8b5cf6, #a855f7)",
                    }}
                  />
                  <span className="text-[11px] text-gray-600 font-medium">
                    Clicks
                  </span>
                </div>
              </div>
            </div>

            {/* Bar chart (scrollable) */}
            <div className="relative h-56 overflow-x-auto overflow-y-hidden pb-1">
              <div
                className="flex items-end justify-between h-full"
                style={{
                  gap: chartData.length > 15 ? "6px" : "12px",
                  minWidth:
                    chartData.length > 15
                      ? `${chartData.length * 40}px`
                      : "100%",
                }}
              >
                {chartData.map((d, i) => {
                  const dmHeight = (d.dms / maxDM) * 100;
                  const clickHeight = (d.clicks / maxDM) * 100;
                  const showLabel =
                    chartData.length <= 10 ||
                    i === 0 ||
                    i === chartData.length - 1 ||
                    i % Math.ceil(chartData.length / 10) === 0;

                  return (
                    <div
                      key={i}
                      className="flex-1 flex flex-col items-center gap-2 group h-full min-w-[24px]"
                    >
                      <div className="w-full flex items-end justify-center gap-0.5 h-full">
                        {/* DM bar */}
                        <div className="flex-1 relative flex flex-col justify-end">
                          <div
                            className="w-full rounded-t-md transition-all group-hover:opacity-80"
                            style={{
                              height: `${dmHeight}%`,
                              backgroundImage:
                                "linear-gradient(180deg, #3b82f6, #2563eb)",
                              minHeight: "3px",
                            }}
                          />
                          <div className="absolute -top-9 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                            <span className="text-[10px] font-bold text-white bg-gray-900 px-2 py-1 rounded whitespace-nowrap shadow-lg">
                              {d.dms} DMs · {d.day}
                            </span>
                          </div>
                        </div>
                        {/* Click bar */}
                        <div className="flex-1 relative flex flex-col justify-end">
                          <div
                            className="w-full rounded-t-md transition-all group-hover:opacity-80"
                            style={{
                              height: `${clickHeight}%`,
                              backgroundImage:
                                "linear-gradient(180deg, #a855f7, #8b5cf6)",
                              minHeight: "3px",
                            }}
                          />
                        </div>
                      </div>
                      {showLabel ? (
                        <span className="text-[9px] text-gray-500 font-medium whitespace-nowrap">
                          {d.day}
                        </span>
                      ) : (
                        <span className="text-[9px] opacity-0">·</span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {chartData.length > 15 && (
              <p className="text-[10px] text-gray-400 text-center mt-2">
                ← Scroll to see all {chartData.length} days →
              </p>
            )}
          </div>

          {/* Top Keywords + Top Posts */}
          <div className="grid md:grid-cols-2 gap-4">
            {/* Top Keywords */}
            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-gray-900">
                  🔑 Top Keywords
                </h3>
                <span className="text-[11px] text-gray-500">By DMs</span>
              </div>
              <div className="space-y-3">
                {topKeywords.map((k, i) => (
                  <div key={i}>
                    <div className="flex items-center justify-between mb-1">
                      <span
                        className="px-2 py-0.5 rounded-md text-xs font-bold tracking-wide"
                        style={{
                          backgroundColor: "rgba(37, 99, 235, 0.08)",
                          color: "#2563eb",
                        }}
                      >
                        {k.keyword}
                      </span>
                      <span className="text-sm font-bold text-gray-900">
                        {k.dms}
                      </span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-gray-100 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{
                          width: `${k.percentage}%`,
                          backgroundImage:
                            "linear-gradient(90deg, #2563eb, #3b82f6)",
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Posts */}
            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-gray-900">
                  🔥 Top Posts
                </h3>
                <span className="text-[11px] text-gray-500">By DMs</span>
              </div>
              <div className="space-y-3">
                {topPosts.map((p, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span
                      className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                      style={{
                        backgroundImage:
                          i === 0
                            ? "linear-gradient(135deg, #fbbf24, #f97316)"
                            : "linear-gradient(135deg, #94a3b8, #64748b)",
                      }}
                    >
                      {i + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-900 truncate mb-0.5">
                        {p.caption}
                      </p>
                      <div className="flex items-center gap-2 text-[11px] text-gray-500">
                        <span
                          className="px-1.5 py-0.5 rounded text-[10px] font-bold"
                          style={{
                            backgroundColor: "rgba(37, 99, 235, 0.08)",
                            color: "#2563eb",
                          }}
                        >
                          {p.keyword}
                        </span>
                        <span>·</span>
                        <span>
                          <strong className="text-gray-900">{p.dms}</strong>{" "}
                          DMs
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}