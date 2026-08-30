"use client";

import { useEffect, useState } from "react";
import {
  CreditCard,
  Crown,
  Loader2,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";

interface Me {
  plan: string;
  customAccessGranted: boolean;
  subscriptionMonths: number;
  expiresAt: string;
  daysRemaining: number;
  isExpired: boolean;
}

interface PaymentLog {
  id: string;
  amount: number;
  plan: string;
  payment_method: string;
  status: string;
  created_at: string;
}

export default function BillingPage() {
  const [me, setMe] = useState<Me | null>(null);
  const [payments, setPayments] = useState<PaymentLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [flash, setFlash] = useState<string | null>(null);

  const load = async () => {
    try {
      const [meRes, payRes] = await Promise.all([
        fetch("/api/user/me"),
        fetch("/api/admin/payments"),
      ]);
      if (meRes.ok) {
        const d = await meRes.json();
        setMe(d.user);
      }
      if (payRes.ok) {
        const d = await payRes.json();
        setPayments(d.payments || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const upgrade = async (plan: "premium" | "pro") => {
    setBusy(true);
    setFlash(null);
    try {
      const res = await fetch("/api/payments/razorpay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan }),
      });
      const data = await res.json();
      if (!res.ok || !data.orderId) {
        throw new Error(data.error || "Could not start payment");
      }

      // Load Razorpay checkout script
      await new Promise<void>((resolve, reject) => {
        const s = document.createElement("script");
        s.src = "https://checkout.razorpay.com/v1/checkout.js";
        s.onload = () => resolve();
        s.onerror = () => reject(new Error("Could not load Razorpay"));
        document.body.appendChild(s);
      });

      const rzp = new (window as any).Razorpay({
        key: data.keyId,
        amount: data.amount,
        currency: data.currency,
        name: "Flowchat",
        description: plan === "pro" ? "Pro — 12 Months" : "Premium — 1 Month",
        order_id: data.orderId,
        prefill: { email: data.userEmail, name: data.userName },
        theme: { color: "#03856b" },
        handler: async (response: any) => {
          await fetch("/api/payments/razorpay/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(response),
          });
          setFlash("✅ Payment received! Refreshing your plan…");
          setTimeout(load, 1500);
        },
      });
      rzp.open();
    } catch (err: any) {
      setFlash("⚠️ " + (err.message || "Payment failed"));
    } finally {
      setBusy(false);
    }
  };

  const cancelSubscription = async () => {
    if (!confirm("Stop your subscription? You keep access until the current period ends."))
      return;
    setBusy(true);
    try {
      const res = await fetch("/api/user/subscription/cancel", { method: "POST" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed");
      setFlash("✅ Subscription stopped.");
      load();
    } catch (err: any) {
      setFlash("⚠️ " + (err.message || "Failed"));
    } finally {
      setBusy(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <Loader2 className="animate-spin text-[#03856b]" size={28} />
      </div>
    );
  }

  const planLabel = me?.customAccessGranted
    ? "Custom Access (Admin granted)"
    : me?.plan === "pro"
    ? "Pro — 12 Months"
    : me?.plan === "premium"
    ? "Premium — 1 Month"
    : "7-Day Free Trial";

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {flash && (
        <div className="px-4 py-3 rounded-xl text-sm font-semibold bg-sky-50 text-sky-700 border border-sky-200">
          {flash}
        </div>
      )}

      {/* Current plan */}
      <div
        className="rounded-3xl p-6 md:p-8 text-white relative overflow-hidden shadow-xl"
        style={{
          backgroundImage: "linear-gradient(135deg, #03856b, #04a085, #0ea5e9)",
        }}
      >
        <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full bg-white/10 blur-3xl" />
        <div className="relative flex flex-wrap items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-xs font-bold uppercase tracking-wider">
              <Crown size={13} /> Current plan
            </div>
            <h1 className="text-2xl font-black mt-3">{planLabel}</h1>
            <p className="text-sm text-white/80 mt-1">
              {me?.isExpired
                ? "⚠️ Expired — automations are paused. Upgrade to resume."
                : `Valid till ${new Date(me?.expiresAt || Date.now()).toLocaleDateString(
                    "en-IN",
                    { day: "numeric", month: "long", year: "numeric" }
                  )} · ${me?.daysRemaining ?? 0} days left`}
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => upgrade("premium")}
              disabled={busy}
              className="px-6 py-3 rounded-full bg-white text-[#03856b] font-black text-sm shadow-lg hover:shadow-2xl hover:-translate-y-0.5 transition-all disabled:opacity-50"
            >
              {busy ? <Loader2 className="animate-spin" size={16} /> : "Upgrade ₹99/mo"}
            </button>
            <button
              onClick={() => upgrade("pro")}
              disabled={busy}
              className="px-6 py-3 rounded-full bg-gray-900 text-white font-black text-sm shadow-lg hover:shadow-2xl hover:-translate-y-0.5 transition-all disabled:opacity-50"
            >
              {busy ? <Loader2 className="animate-spin" size={16} /> : "Pro ₹799/yr"}
            </button>
          </div>
        </div>
      </div>

      {/* What you get */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
        <div className="flex items-center gap-2 mb-4">
          <CreditCard size={18} style={{ color: "#03856b" }} />
          <h2 className="font-black text-gray-900">Included in your plan</h2>
        </div>
        <div className="grid sm:grid-cols-2 gap-3 text-sm">
          {[
            "Unlimited AutoDM rules",
            "DM + comment replies",
            "24/7 comment monitoring",
            "Real-time activity log",
            "Multiple keywords per rule",
            "Cancel anytime",
          ].map((f) => (
            <div key={f} className="flex items-center gap-2 text-gray-600">
              <CheckCircle2 size={15} style={{ color: "#03856b" }} />
              {f}
            </div>
          ))}
        </div>
        <button
          onClick={cancelSubscription}
          disabled={busy}
          className="mt-6 px-5 py-2.5 rounded-xl border border-red-200 text-red-600 text-xs font-bold hover:bg-red-50 disabled:opacity-50"
        >
          Stop / Cancel Subscription
        </button>
      </div>

      {/* Payment history */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="font-black text-gray-900 text-sm">Payment history</h2>
        </div>
        {payments.length === 0 ? (
          <div className="p-10 text-center text-sm text-gray-400">
            No payments yet — you&apos;re on the free trial.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-gray-700">
              <thead className="bg-gray-50 text-gray-500 uppercase text-[10px] font-bold tracking-wider border-b border-gray-100">
                <tr>
                  <th className="p-4">Date</th>
                  <th className="p-4">Plan</th>
                  <th className="p-4">Amount</th>
                  <th className="p-4">Method</th>
                  <th className="p-4 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {payments.map((p) => (
                  <tr key={p.id} className="hover:bg-gray-50">
                    <td className="p-4 font-medium text-gray-900">
                      {new Date(p.created_at).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td className="p-4 font-bold capitalize">{p.plan}</td>
                    <td className="p-4 font-black text-[#03856b]">₹{p.amount}</td>
                    <td className="p-4 text-gray-600">{p.payment_method}</td>
                    <td className="p-4 text-right">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          p.status === "Cancelled"
                            ? "bg-red-100 text-red-600"
                            : "bg-emerald-100 text-[#03856b]"
                        }`}
                      >
                        {p.status === "Cancelled" ? (
                          <AlertTriangle size={10} />
                        ) : (
                          <CheckCircle2 size={10} />
                        )}
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
    </div>
  );
}
