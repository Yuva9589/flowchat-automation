"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

function AdminVerifyContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const email = searchParams.get("email");

  const [verifying, setVerifying] = useState(true);
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (token) {
      verifyToken();
    } else {
      setVerifying(false);
      setError("Invalid or missing verification token.");
    }
  }, [token]);

  const verifyToken = async () => {
    try {
      const res = await fetch("/api/admin/whitelist/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Verification failed");

      setVerified(true);
    } catch (err: any) {
      setError(err.message || "Failed to verify admin access.");
    } finally {
      setVerifying(false);
    }
  };

  return (
    <div className="max-w-md w-full bg-gray-900 rounded-3xl p-8 border border-gray-800 shadow-2xl space-y-6 text-center">
      <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center text-2xl mx-auto border border-emerald-500/30">
        👑
      </div>

      <h1 className="text-2xl font-black text-white">
        Admin Gmail Verification
      </h1>

      {verifying ? (
        <p className="text-xs text-gray-400">
          Verifying admin authorization for <strong>{email || "Gmail"}</strong>...
        </p>
      ) : verified ? (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold">
            ✓ Admin Access Verified Successfully for {email}!
          </div>
          <p className="text-xs text-gray-400">
            You can now sign in with this Gmail address to access full Admin Control.
          </p>
          <Link
            href="/admin"
            className="block w-full py-3.5 rounded-xl bg-[#03856b] hover:bg-emerald-600 text-white font-bold text-xs shadow-lg transition-colors"
          >
            Open Admin Panel →
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-red-500/20 border border-red-500/40 text-red-300 text-xs font-semibold">
            ⚠️ {error}
          </div>
          <Link
            href="/"
            className="block w-full py-3 rounded-xl bg-gray-800 text-gray-300 font-bold text-xs hover:bg-gray-700"
          >
            ← Back to Home
          </Link>
        </div>
      )}
    </div>
  );
}

export default function AdminVerifyPage() {
  return (
    <main className="min-h-screen bg-gray-950 text-white flex items-center justify-center p-6">
      <Suspense fallback={<p className="text-xs text-gray-400">Loading verification...</p>}>
        <AdminVerifyContent />
      </Suspense>
    </main>
  );
}