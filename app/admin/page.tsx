"use client";

import { useState, useEffect } from "react";

/* ============= Admin User Interface Types ============= */

interface AdminUser {
  id: string;
  clerkUserId: string;
  email: string;
  name: string;
  avatarUrl?: string;
  createdAt: string;
  plan: "free_trial" | "premium" | "pro" | "custom_free";
  subscriptionMonths: number;
  customAccessGranted: boolean;
  expiresAt: string;
  isExpired: boolean;
  automationsCount: number;
  totalDmsSent: number;
}

interface PaymentLog {
  id: string;
  user_id: string;
  email?: string;
  amount: number;
  plan: string;
  payment_method: string;
  status: string;
  created_at: string;
}

export default function AdminDashboardPage() {
  /* ============= Auth State ============= */
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [usernameInput, setUsernameInput] = useState("admin");
  const [passwordInput, setPasswordInput] = useState("FlowchatAdmin2026!");
  const [loginError, setLoginError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  /* ============= Menu Tab State ============= */
  const [activeMenu, setActiveMenu] = useState<
    "users" | "analytics" | "payments" | "system"
  >("users");

  /* ============= Data State ============= */
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [payments, setPayments] = useState<PaymentLog[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  /* ============= Grant Free Access Modal State ============= */
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);
  const [grantMonths, setDurationMonths] = useState("12");
  const [isLifetime, setIsLifetime] = useState(false);
  const [granting, setGranting] = useState(false);

  /* Check session storage on mount */
  useEffect(() => {
    const savedToken = sessionStorage.getItem("flowchat_admin_token");
    if (savedToken) {
      setIsAuthenticated(true);
      loadAdminData();
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setLoginError("");

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: usernameInput,
          password: passwordInput,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Login failed");
      }

      sessionStorage.setItem("flowchat_admin_token", data.token);
      setIsAuthenticated(true);
      loadAdminData();
    } catch (err: any) {
      setLoginError(err.message || "Invalid credentials");
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("flowchat_admin_token");
    setIsAuthenticated(false);
  };

  const loadAdminData = async () => {
    setLoading(true);
    try {
      const [usersRes, paymentsRes] = await Promise.all([
        fetch("/api/admin/users"),
        fetch("/api/admin/payments"),
      ]);

      if (usersRes.ok) {
        const uData = await usersRes.json();
        setUsers(uData.users || []);
      }

      if (paymentsRes.ok) {
        const pData = await paymentsRes.json();
        setPayments(pData.payments || []);
      }
    } catch (err) {
      console.error("Admin data load error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleGrantAccessSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUser) return;

    setGranting(true);
    try {
      const res = await fetch("/api/admin/grant-access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          targetUserId: selectedUser.id,
          plan: "custom_free",
          durationMonths: grantMonths,
          isLifetime: isLifetime,
          revoke: false,
        }),
      });

      if (!res.ok) throw new Error("Failed to grant access");

      alert(`🎁 Free Access Granted to ${selectedUser.email}!`);
      setSelectedUser(null);
      loadAdminData();
    } catch (err: any) {
      alert(err.message || "Error granting access");
    } finally {
      setGranting(false);
    }
  };

  const handleRevokeAccess = async (user: AdminUser) => {
    if (!confirm(`Are you sure you want to revoke free access for ${user.email}?`)) {
      return;
    }

    try {
      const res = await fetch("/api/admin/grant-access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          targetUserId: user.id,
          revoke: true,
        }),
      });

      if (!res.ok) throw new Error("Failed to revoke access");

      alert(`Access revoked for ${user.email}`);
      loadAdminData();
    } catch (err: any) {
      alert(err.message || "Error revoking access");
    }
  };

  /* ============= Helper Calculations ============= */
  const filteredUsers = users.filter(
    (u) =>
      u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activeUsersCount = users.filter((u) => !u.isExpired || u.customAccessGranted).length;
  const inactiveUsersCount = users.length - activeUsersCount;
  const customFreeUsersCount = users.filter((u) => u.customAccessGranted).length;

  const totalRevenue = payments.reduce((acc, p) => acc + (p.amount || 0), 0);
  const monthlyRevenue = payments
    .filter((p) => {
      const pDate = new Date(p.created_at);
      const now = new Date();
      return pDate.getMonth() === now.getMonth() && pDate.getFullYear() === now.getFullYear();
    })
    .reduce((acc, p) => acc + (p.amount || 0), 0);

  /* =========================================================================
     SCREEN 1: LOGIN SCREEN (If Not Authenticated)
     ========================================================================= */
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-gray-800 rounded-3xl p-8 border border-gray-700 shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="inline-block px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2">
              Master Admin Control
            </div>
            <h1 className="text-3xl font-black text-white">Flowchat Admin</h1>
            <p className="text-xs text-gray-400">
              Enter your master admin credentials to access full control panel.
            </p>
          </div>

          {loginError && (
            <div className="p-3.5 rounded-xl bg-red-500/20 border border-red-500/30 text-red-300 text-xs text-center font-medium">
              {loginError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-300 mb-1.5">
                Admin Username
              </label>
              <input
                type="text"
                value={usernameInput}
                onChange={(e) => setUsernameInput(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl bg-gray-900 border border-gray-700 text-white text-sm focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-300 mb-1.5">
                Admin Password
              </label>
              <input
                type="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl bg-gray-900 border border-gray-700 text-white text-sm focus:outline-none focus:border-emerald-500"
              />
            </div>

            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full py-3.5 rounded-xl bg-[#03856b] hover:bg-emerald-600 text-white font-bold text-sm transition-colors shadow-lg"
            >
              {isLoggingIn ? "Authenticating..." : "Login to Admin Panel →"}
            </button>
          </form>

          <div className="pt-4 border-t border-gray-700/50 text-center text-[11px] text-gray-500">
            Domain: <strong>earnwithads.in</strong> | Flowchat Master Admin 2026
          </div>
        </div>
      </div>
    );
  }

  /* =========================================================================
     SCREEN 2: FULL ADMIN DASHBOARD (When Authenticated)
     ========================================================================= */
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 flex flex-col md:flex-row">
      {/* ============================================= */}
      {/* SIDEBAR NAVIGATION MENU                       */}
      {/* ============================================= */}
      <aside className="w-full md:w-64 bg-gray-900 border-r border-gray-800 p-6 flex flex-col justify-between flex-shrink-0">
        <div className="space-y-8">
          <div>
            <span className="text-2xl font-black text-white">
              Flow<span style={{ color: "#4ade80" }}>chat</span>
            </span>
            <p className="text-[10px] text-emerald-400 font-bold tracking-wider uppercase mt-0.5">
              👑 Master Admin Control
            </p>
          </div>

          <nav className="space-y-1.5">
            <button
              onClick={() => setActiveMenu("users")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all text-left ${
                activeMenu === "users"
                  ? "bg-[#03856b] text-white shadow-md"
                  : "text-gray-400 hover:bg-gray-800 hover:text-white"
              }`}
            >
              <span>👤</span> User Management & Gmails
            </button>

            <button
              onClick={() => setActiveMenu("analytics")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all text-left ${
                activeMenu === "analytics"
                  ? "bg-[#03856b] text-white shadow-md"
                  : "text-gray-400 hover:bg-gray-800 hover:text-white"
              }`}
            >
              <span>📊</span> Revenue & User Analytics
            </button>

            <button
              onClick={() => setActiveMenu("payments")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all text-left ${
                activeMenu === "payments"
                  ? "bg-[#03856b] text-white shadow-md"
                  : "text-gray-400 hover:bg-gray-800 hover:text-white"
              }`}
            >
              <span>💳</span> Payment History Logs
            </button>

            <button
              onClick={() => setActiveMenu("system")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all text-left ${
                activeMenu === "system"
                  ? "bg-[#03856b] text-white shadow-md"
                  : "text-gray-400 hover:bg-gray-800 hover:text-white"
              }`}
            >
              <span>⚙️</span> Webhook & System Status
            </button>
          </nav>
        </div>

        <div className="pt-6 border-t border-gray-800 space-y-3">
          <div className="text-[11px] text-gray-500">
            Logged in as <strong>Admin</strong>
          </div>
          <button
            onClick={handleLogout}
            className="w-full py-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-bold border border-red-500/20 transition-colors"
          >
            🔒 Logout Admin
          </button>
        </div>
      </aside>

      {/* ============================================= */}
      {/* MAIN ADMIN CONTENT AREA                       */}
      {/* ============================================= */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto space-y-8">
        {/* STATS OVERVIEW HEADER CARDS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gray-900 rounded-2xl p-5 border border-gray-800">
            <p className="text-xs text-gray-400 font-semibold mb-1">Total Users</p>
            <p className="text-3xl font-black text-white">{users.length}</p>
            <p className="text-[11px] text-emerald-400 mt-1">
              {activeUsersCount} Active · {inactiveUsersCount} Inactive
            </p>
          </div>

          <div className="bg-gray-900 rounded-2xl p-5 border border-gray-800">
            <p className="text-xs text-gray-400 font-semibold mb-1">
              Monthly Revenue
            </p>
            <p className="text-3xl font-black text-emerald-400">
              ₹{monthlyRevenue}
            </p>
            <p className="text-[11px] text-gray-400 mt-1">
              Total Revenue: ₹{totalRevenue}
            </p>
          </div>

          <div className="bg-gray-900 rounded-2xl p-5 border border-gray-800">
            <p className="text-xs text-gray-400 font-semibold mb-1">
              Free Access Granted
            </p>
            <p className="text-3xl font-black text-purple-400">
              {customFreeUsersCount}
            </p>
            <p className="text-[11px] text-gray-400 mt-1">Admin Approved Users</p>
          </div>

          <div className="bg-gray-900 rounded-2xl p-5 border border-gray-800">
            <p className="text-xs text-gray-400 font-semibold mb-1">
              Total DMs Sent
            </p>
            <p className="text-3xl font-black text-pink-400">
              {users.reduce((acc, u) => acc + (u.totalDmsSent || 0), 0)}
            </p>
            <p className="text-[11px] text-gray-400 mt-1">Across All Platforms</p>
          </div>
        </div>

        {/* =========================================================================
           MENU 1: USER MANAGEMENT & GMAILS
           ========================================================================= */}
        {activeMenu === "users" && (
          <section className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-black text-white">
                  User Management & Gmail List
                </h2>
                <p className="text-xs text-gray-400 mt-0.5">
                  View logged-in user Gmails, plan validity, and grant free automation access.
                </p>
              </div>

              {/* Search Bar */}
              <input
                type="text"
                placeholder="Search by Gmail or Name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="px-4 py-2.5 rounded-xl bg-gray-900 border border-gray-800 text-white text-xs focus:outline-none focus:border-emerald-500 w-full md:w-72"
              />
            </div>

            {loading ? (
              <div className="p-12 text-center text-gray-500 text-sm">
                Loading registered users...
              </div>
            ) : filteredUsers.length === 0 ? (
              <div className="bg-gray-900 rounded-2xl p-10 border border-gray-800 text-center text-gray-400 text-sm">
                No users found.
              </div>
            ) : (
              <div className="bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden shadow-xl">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-gray-300">
                    <thead className="bg-gray-800/80 text-gray-400 uppercase text-[10px] font-bold tracking-wider border-b border-gray-800">
                      <tr>
                        <th className="p-4">User & Gmail</th>
                        <th className="p-4">Current Plan</th>
                        <th className="p-4">Plan Validity</th>
                        <th className="p-4">Duration</th>
                        <th className="p-4">DMs Sent</th>
                        <th className="p-4 text-right">Admin Authority Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800/60">
                      {filteredUsers.map((user) => {
                        const daysLeft = Math.ceil(
                          (new Date(user.expiresAt).getTime() - Date.now()) /
                            (1000 * 60 * 60 * 24)
                        );

                        return (
                          <tr
                            key={user.id}
                            className="hover:bg-gray-800/40 transition-colors"
                          >
                            {/* User & Gmail */}
                            <td className="p-4">
                              <div className="flex items-center gap-3">
                                {user.avatarUrl ? (
                                  <img
                                    src={user.avatarUrl}
                                    alt={user.name}
                                    className="w-8 h-8 rounded-full border border-gray-700"
                                  />
                                ) : (
                                  <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center text-xs">
                                    {user.name[0] || "U"}
                                  </div>
                                )}
                                <div>
                                  <p className="font-bold text-white text-xs">
                                    {user.name}
                                  </p>
                                  <p className="text-[11px] text-emerald-400 font-mono">
                                    {user.email}
                                  </p>
                                </div>
                              </div>
                            </td>

                            {/* Current Plan */}
                            <td className="p-4">
                              {user.customAccessGranted ? (
                                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                                  🎁 Admin Free Access
                                </span>
                              ) : user.plan === "pro" ? (
                                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                                  ⭐ Pro (Yearly ₹799)
                                </span>
                              ) : user.plan === "premium" ? (
                                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30">
                                  💳 Premium (₹99/mo)
                                </span>
                              ) : (
                                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold bg-gray-800 text-gray-400 border border-gray-700">
                                  🆓 7-Day Trial
                                </span>
                              )}
                            </td>

                            {/* Plan Validity */}
                            <td className="p-4">
                              {user.customAccessGranted ? (
                                <span className="text-purple-300 font-bold text-[11px]">
                                  {user.subscriptionMonths >= 900
                                    ? "♾️ Lifetime Free"
                                    : `${daysLeft > 0 ? daysLeft : 0} days remaining`}
                                </span>
                              ) : user.isExpired ? (
                                <span className="text-red-400 font-bold text-[11px]">
                                  ⚠️ Expired
                                </span>
                              ) : (
                                <span className="text-emerald-400 font-bold text-[11px]">
                                  ✅ {daysLeft} days remaining
                                </span>
                              )}
                            </td>

                            {/* Subscription Duration */}
                            <td className="p-4 text-xs font-medium text-gray-300">
                              {user.customAccessGranted
                                ? user.subscriptionMonths >= 900
                                  ? "Lifetime"
                                  : `${user.subscriptionMonths} Months`
                                : user.plan === "pro"
                                ? "12 Months"
                                : "1 Month"}
                            </td>

                            {/* DMs Sent */}
                            <td className="p-4 font-mono text-white font-bold text-xs">
                              {user.totalDmsSent || 0} DMs
                            </td>

                            {/* Actions */}
                            <td className="p-4 text-right space-x-2">
                              <button
                                onClick={() => setSelectedUser(user)}
                                className="px-3 py-1.5 rounded-lg bg-[#03856b] hover:bg-emerald-600 text-white font-bold text-[11px] shadow-sm transition-colors"
                              >
                                🎁 Grant Free Access
                              </button>

                              {user.customAccessGranted && (
                                <button
                                  onClick={() => handleRevokeAccess(user)}
                                  className="px-2.5 py-1.5 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-300 font-bold text-[11px] border border-red-500/30 transition-colors"
                                >
                                  ⛔ Revoke
                                </button>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </section>
        )}

        {/* =========================================================================
           MENU 2: REVENUE & USER ANALYTICS
           ========================================================================= */}
        {activeMenu === "analytics" && (
          <section className="space-y-6">
            <div>
              <h2 className="text-2xl font-black text-white">
                Revenue & User Status Analytics
              </h2>
              <p className="text-xs text-gray-400 mt-0.5">
                Monthly & Yearly revenue breakdown, active vs non-active user split.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800 space-y-2">
                <h3 className="text-gray-400 text-xs font-bold uppercase">
                  Monthly Revenue (This Month)
                </h3>
                <p className="text-4xl font-black text-emerald-400">
                  ₹{monthlyRevenue}
                </p>
                <p className="text-xs text-gray-500">
                  Via UPI AutoPay & Stripe Subscriptions
                </p>
              </div>

              <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800 space-y-2">
                <h3 className="text-gray-400 text-xs font-bold uppercase">
                  Total Yearly Revenue
                </h3>
                <p className="text-4xl font-black text-purple-400">
                  ₹{totalRevenue}
                </p>
                <p className="text-xs text-gray-500">Cumulative Platform Revenue</p>
              </div>

              <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800 space-y-2">
                <h3 className="text-gray-400 text-xs font-bold uppercase">
                  Active vs Inactive Users
                </h3>
                <div className="flex items-center gap-4 pt-1">
                  <div>
                    <p className="text-2xl font-black text-emerald-400">
                      {activeUsersCount}
                    </p>
                    <p className="text-[10px] text-gray-400">Active</p>
                  </div>
                  <div className="text-gray-600">/</div>
                  <div>
                    <p className="text-2xl font-black text-red-400">
                      {inactiveUsersCount}
                    </p>
                    <p className="text-[10px] text-gray-400">Expired / Inactive</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* =========================================================================
           MENU 3: PAYMENT HISTORY LOGS
           ========================================================================= */}
        {activeMenu === "payments" && (
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-black text-white">Payment History Logs</h2>
                <p className="text-xs text-gray-400 mt-0.5">
                  Complete logs of subscription transactions & free access grants.
                </p>
              </div>
            </div>

            {payments.length === 0 ? (
              <div className="bg-gray-900 rounded-2xl p-10 border border-gray-800 text-center text-gray-400 text-sm">
                No payment transactions recorded yet.
              </div>
            ) : (
              <div className="bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden shadow-xl">
                <table className="w-full text-left text-xs text-gray-300">
                  <thead className="bg-gray-800/80 text-gray-400 uppercase text-[10px] font-bold tracking-wider border-b border-gray-800">
                    <tr>
                      <th className="p-4">User Gmail</th>
                      <th className="p-4">Amount</th>
                      <th className="p-4">Plan Type</th>
                      <th className="p-4">Payment Method</th>
                      <th className="p-4">Date</th>
                      <th className="p-4 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800/60">
                    {payments.map((p) => (
                      <tr key={p.id} className="hover:bg-gray-800/40">
                        <td className="p-4 font-mono text-emerald-400 font-bold">
                          {p.email || "User Transaction"}
                        </td>
                        <td className="p-4 font-bold text-white">₹{p.amount}</td>
                        <td className="p-4 text-gray-300 capitalize">{p.plan}</td>
                        <td className="p-4 text-gray-400">{p.payment_method}</td>
                        <td className="p-4 text-gray-400">
                          {new Date(p.created_at).toLocaleDateString()}
                        </td>
                        <td className="p-4 text-right">
                          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300">
                            {p.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        )}

        {/* =========================================================================
           MENU 4: WEBHOOK & SYSTEM STATUS
           ========================================================================= */}
        {activeMenu === "system" && (
          <section className="space-y-6">
            <div>
              <h2 className="text-2xl font-black text-white">
                Meta Webhook & System Status
              </h2>
              <p className="text-xs text-gray-400 mt-0.5">
                Check Meta Graph API Webhook endpoint & database connections.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800 space-y-3">
                <h3 className="font-bold text-white text-base">
                  🔗 Meta Webhook Endpoint
                </h3>
                <p className="text-xs text-gray-400 font-mono bg-gray-950 p-3 rounded-xl border border-gray-800">
                  https://earnwithads.in/api/webhooks/meta
                </p>
                <div className="flex items-center gap-2 text-xs text-emerald-400 font-bold">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Status: Active & Verified
                </div>
              </div>

              <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800 space-y-3">
                <h3 className="font-bold text-white text-base">
                  🗄️ Supabase Database Status
                </h3>
                <p className="text-xs text-gray-400">
                  Tables Connected: <code>users</code>, <code>automations</code>, <code>payments</code>
                </p>
                <div className="flex items-center gap-2 text-xs text-emerald-400 font-bold">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Status: RLS Secured & Active
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* =========================================================================
         GRANT FREE ACCESS MODAL (POPUUP)
         ========================================================================= */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 rounded-3xl max-w-md w-full p-6 md:p-8 border border-gray-800 shadow-2xl space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-black text-white">🎁 Grant Free Access</h3>
              <button
                onClick={() => setSelectedUser(null)}
                className="text-gray-400 hover:text-white font-bold text-lg"
              >
                ✕
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-gray-800/60 border border-gray-700/60 space-y-1">
              <p className="text-xs text-gray-400 font-semibold">Target User Gmail:</p>
              <p className="text-sm font-bold text-emerald-400 font-mono">
                {selectedUser.email}
              </p>
            </div>

            <form onSubmit={handleGrantAccessSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-300 mb-2">
                  Select Free Duration:
                </label>
                <select
                  value={isLifetime ? "lifetime" : grantMonths}
                  onChange={(e) => {
                    if (e.target.value === "lifetime") {
                      setIsLifetime(true);
                    } else {
                      setIsLifetime(false);
                      setDurationMonths(e.target.value);
                    }
                  }}
                  className="w-full px-4 py-3 rounded-xl bg-gray-950 border border-gray-700 text-white text-xs font-bold focus:outline-none focus:border-emerald-500"
                >
                  <option value="1">1 Month Free Access</option>
                  <option value="3">3 Months Free Access</option>
                  <option value="6">6 Months Free Access</option>
                  <option value="12">1 Year Free Access (12 Months)</option>
                  <option value="lifetime">♾️ Lifetime Unlimited Free Access</option>
                </select>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setSelectedUser(null)}
                  className="px-5 py-2.5 rounded-xl bg-gray-800 text-gray-300 text-xs font-bold hover:bg-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={granting}
                  className="px-6 py-2.5 rounded-xl bg-[#03856b] hover:bg-emerald-600 text-white text-xs font-bold shadow-lg"
                >
                  {granting ? "Granting..." : "Confirm & Grant Access →"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}