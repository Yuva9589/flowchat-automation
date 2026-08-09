"use client";

import { useState, useEffect } from "react";

interface PaymentLog {
  id: string;
  amount: number;
  plan: string;
  payment_method: string;
  status: string;
  created_at: string;
}

interface UserSubscription {
  plan: string;
  customAccessGranted: boolean;
  subscriptionMonths: number;
  expiresAt: string;
  daysRemaining: number;
  isExpired: boolean;
}

export default function PaymentInformationPage() {
  const [subscription, setSubscription] = useState<UserSubscription>({
    plan: "free_trial",
    customAccessGranted: false,
    subscriptionMonths: 1,
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    daysRemaining: 7,
    isExpired: false,
  });

  const [paymentHistory, setPaymentHistory] = useState<PaymentLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [cancelling, setCancelling] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);

  useEffect(() => {
    loadPaymentData();
  }, []);

  const loadPaymentData = async () => {
    setLoading(true);
    try {
      const [userRes, paymentsRes] = await Promise.all([
        fetch("/api/automations?platform=instagram"), // Triggers user sync & info
        fetch("/api/admin/payments"), // Get payments log
      ]);

      if (userRes.ok) {
        // Fetch current user details from API
        const userResData = await fetch("/api/admin/users");
        if (userResData.ok) {
          const uData = await userResData.json();
          // Find current user stats
          if (uData.users && uData.users.length > 0) {
            const me = uData.users[0]; // Currently logged in
            const daysLeft = Math.ceil(
              (new Date(me.expiresAt).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
            );

            setSubscription({
              plan: me.plan,
              customAccessGranted: me.customAccessGranted,
              subscriptionMonths: me.subscriptionMonths,
              expiresAt: me.expiresAt,
              daysRemaining: daysLeft > 0 ? daysLeft : 0,
              isExpired: me.isExpired,
            });
          }
        }
      }

      if (paymentsRes.ok) {
        const pData = await paymentsRes.json();
        setPaymentHistory(pData.payments || []);
      }
    } catch (err) {
      console.error("Payment info load error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelSubscription = async () => {
    setCancelling(true);
    try {
      const res = await fetch("/api/user/subscription/cancel", {
        method: "POST",
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to cancel subscription");

      alert("✓ Your subscription has been stopped and cancelled successfully!");
      setShowCancelModal(false);
      loadPaymentData();
    } catch (err: any) {
      alert(err.message || "Error cancelling subscription");
    } finally {
      setCancelling(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header Banner */}
      <div
        className="rounded-2xl p-6 md:p-8 relative overflow-hidden"
        style={{
          backgroundImage: "linear-gradient(135deg, #03856b, #04a085, #0ea5e9)",
        }}
      >
        <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full bg-white/10 blur-3xl" />

        <div className="relative flex items-center justify-between gap-4 flex-wrap">
          <div>
            <span className="inline-block px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold uppercase tracking-wider mb-2">
              Payment & Subscription Manager
            </span>
            <h1 className="text-2xl md:text-3xl font-black text-white">
              Payment Information
            </h1>
            <p className="text-white/90 text-sm mt-1">
              Manage your active subscription plan, validity, renewal dates, and payment history.
            </p>
          </div>
        </div>
      </div>

      {/* SECTION 1: ACTIVE PLAN & VALIDITY STATUS */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-4 border-b border-gray-100 pb-6">
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
              Current Active Plan
            </p>
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-black text-gray-900 capitalize">
                {subscription.customAccessGranted
                  ? "🎁 Admin Free Access"
                  : subscription.plan === "pro"
                  ? "⭐ Pro Plan (Yearly)"
                  : subscription.plan === "premium"
                  ? "💳 Premium Plan (Monthly)"
                  : "🆓 7-Day Free Trial"}
              </h2>

              <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-[#03856b]">
                {subscription.isExpired ? "⚠️ Expired" : "✅ Active"}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 flex-wrap">
            <button
              onClick={() => setShowCancelModal(true)}
              className="px-4 py-2.5 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 text-xs font-bold transition-colors"
            >
              🛑 Stop / Cancel Subscription
            </button>
          </div>
        </div>

        {/* Plan Validity Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-5 rounded-2xl bg-gray-50 border border-gray-100 space-y-1">
            <p className="text-xs font-bold text-gray-500 uppercase">
              Remaining Validity
            </p>
            <p className="text-2xl font-black text-[#03856b]">
              {subscription.customAccessGranted && subscription.subscriptionMonths >= 900
                ? "♾️ Lifetime Unlimited"
                : `${subscription.daysRemaining} Days Left`}
            </p>
            <p className="text-[11px] text-gray-400">Full Automation Access Active</p>
          </div>

          <div className="p-5 rounded-2xl bg-gray-50 border border-gray-100 space-y-1">
            <p className="text-xs font-bold text-gray-500 uppercase">
              Expiration Date
            </p>
            <p className="text-xl font-bold text-gray-900">
              {new Date(subscription.expiresAt).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
            <p className="text-[11px] text-gray-400">Plan renewal/expiry date</p>
          </div>

          <div className="p-5 rounded-2xl bg-gray-50 border border-gray-100 space-y-1">
            <p className="text-xs font-bold text-gray-500 uppercase">
              Subscription Duration
            </p>
            <p className="text-xl font-bold text-gray-900">
              {subscription.customAccessGranted
                ? "Custom Admin Granted"
                : subscription.plan === "pro"
                ? "12 Months (Yearly)"
                : "1 Month (Monthly)"}
            </p>
            <p className="text-[11px] text-gray-400">Cancel anytime policy active</p>
          </div>
        </div>
      </div>

      {/* SECTION 2: PAYMENT HISTORY LOGS TABLE */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm space-y-6">
        <div>
          <h2 className="text-xl font-black text-gray-900">
            Payment & Subscription History
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Real-time record of all your past transactions and subscription charges.
          </p>
        </div>

        {loading ? (
          <div className="p-8 text-center text-gray-500 text-sm">
            Loading payment history...
          </div>
        ) : paymentHistory.length === 0 ? (
          <div className="p-8 rounded-2xl bg-gray-50 border border-dashed border-gray-200 text-center text-gray-500 text-xs">
            No past paid transactions. You are currently on the 7-day free trial.
          </div>
        ) : (
          <div className="rounded-2xl border border-gray-100 overflow-hidden">
            <table className="w-full text-left text-xs text-gray-700">
              <thead className="bg-gray-50 text-gray-500 uppercase text-[10px] font-bold tracking-wider border-b border-gray-100">
                <tr>
                  <th className="p-4">Date</th>
                  <th className="p-4">Plan Name</th>
                  <th className="p-4">Amount</th>
                  <th className="p-4">Payment Method</th>
                  <th className="p-4 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {paymentHistory.map((p) => (
                  <tr key={p.id} className="hover:bg-gray-50">
                    <td className="p-4 font-medium text-gray-900">
                      {new Date(p.created_at).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td className="p-4 font-bold text-gray-900 capitalize">
                      {p.plan}
                    </td>
                    <td className="p-4 font-black text-[#03856b]">₹{p.amount}</td>
                    <td className="p-4 text-gray-600">{p.payment_method}</td>
                    <td className="p-4 text-right">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          p.status === "Cancelled"
                            ? "bg-red-100 text-red-600"
                            : "bg-emerald-100 text-[#03856b]"
                        }`}
                      >
                        {p.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* STOP / CANCEL SUBSCRIPTION MODAL */}
      {showCancelModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 md:p-8 border border-gray-100 shadow-2xl space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-black text-gray-900">
                Cancel / Stop Subscription?
              </h3>
              <button
                onClick={() => setShowCancelModal(false)}
                className="text-gray-400 hover:text-gray-600 font-bold text-lg"
              >
                ✕
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-amber-50 border border-yellow-200 text-xs text-amber-800 space-y-1">
              <p className="font-bold">⚠️ Cancellation Policy:</p>
              <p>
                Stopping your subscription will cancel any future automatic renewals. You can continue using Flowchat until your current remaining validity expires.
              </p>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowCancelModal(false)}
                className="px-5 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold"
              >
                Keep Active Plan
              </button>
              <button
                type="button"
                onClick={handleCancelSubscription}
                disabled={cancelling}
                className="px-6 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-md"
              >
                {cancelling ? "Processing..." : "Confirm & Stop Subscription"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}