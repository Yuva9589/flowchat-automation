import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

/* =========================================================================
   ✏️ EDIT YOUR TERMS OF SERVICE TEXT HERE (NO CODING REQUIRED)
   Aapko niche sirf double quotes "..." ke andar apna simple text badalna hai.
   ========================================================================= */

const termsData = {
  title: "Terms of Service",
  effectiveDate: "August 2026",
  domain: "earnwithads.in",

  sections: [
    {
      title: "1. Agreement to Terms",
      text: "By accessing or using Flowchat ('earnwithads.in'), you agree to be bound by these Terms of Service and all applicable Meta & WhatsApp API Policies.",
    },
    {
      title: "2. Service Description",
      text: "Flowchat provides an AI-powered automation platform designed to turn comments into direct messages on Instagram, Facebook, and WhatsApp. Users can set trigger keywords, configure auto-replies, and view performance analytics.",
    },
    {
      title: "3. Platform Compliance & User Conduct",
      text: "Because Flowchat integrates with Instagram, Facebook, and WhatsApp APIs, you agree to comply fully with Meta's Platform Terms and Developer Policies. Using Flowchat for spamming, harassment, or unauthorized bulk messaging is strictly prohibited.",
    },
    {
      title: "4. Billing & Subscriptions",
      text: "Flowchat offers a 7-day free trial. Paid subscriptions (₹99/month or ₹799/year) are billed via UPI AutoPay or Stripe. You can cancel your subscription at any time from your dashboard with zero cancellation fees.",
    },
    {
      title: "5. Support Contact",
      text: "If you have any questions regarding these Terms, please contact us at support@earnwithads.in.",
    },
  ],
};

/* =========================================================================
   ⚠️ DO NOT EDIT BELOW UNLESS YOU WANT TO CHANGE THE PAGE DESIGN
   ========================================================================= */

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <div className="pt-36 pb-16 px-6">
        <div className="max-w-3xl mx-auto bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100 space-y-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl font-black text-gray-900">
                Flow<span style={{ color: "#03856b" }}>chat</span>
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight">
              {termsData.title}
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Last Updated: {termsData.effectiveDate} | Domain: {termsData.domain}
            </p>
          </div>

          <div className="space-y-6 text-sm text-gray-700 leading-relaxed">
            {termsData.sections.map((sec, idx) => (
              <section key={idx} className="space-y-2">
                <h2 className="text-lg font-bold text-gray-900">{sec.title}</h2>
                <p>{sec.text}</p>
              </section>
            ))}
          </div>

          <div className="pt-6 border-t border-gray-100 flex items-center justify-between">
            <a
              href="/"
              className="text-xs font-semibold text-[#03856b] hover:underline"
            >
              ← Back to Home
            </a>
            <span className="text-xs text-gray-400">© 2026 Flowchat</span>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}