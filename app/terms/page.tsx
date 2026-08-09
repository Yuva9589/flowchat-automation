import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

/* =========================================================================
   ✏️ EDIT YOUR TERMS OF SERVICE TEXT HERE (NO CODING REQUIRED)
   Aapko niche sirf double quotes "..." ke andar apna simple text badalna hai.
   ========================================================================= */

const termsData = {
  title: "Terms of Service",
  lastUpdated: "August 2026",
  domain: "earnwithads.in",
  companyName: "Flowchat Inc.",

  sections: [
    {
      heading: "1. Agreement & Acceptance of Terms",
      text: "By registering for, accessing, or using Flowchat ('earnwithads.in', 'the Platform', 'we', 'us'), you enter into a legally binding agreement to be bound by these Terms of Service, our Privacy Policy, and all applicable Meta & WhatsApp Developer Policies. If you do not agree to these terms, you must not access or use our services.",
    },
    {
      heading: "2. Service Description & Meta API Integration",
      text: "Flowchat provides an AI-powered automated messaging and comment-reply platform for Instagram, Facebook, and WhatsApp. Users configure trigger keywords (e.g. 'LINK', 'PRICE'), custom reply templates, and follow-gate verification. Flowchat operates exclusively through official Meta Graph APIs and WhatsApp Business APIs. We never store or ask for your social media account passwords.",
    },
    {
      heading: "3. Compliance with Meta Platform Terms & Anti-Spam Guidelines",
      text: "Because Flowchat integrates directly with Meta APIs, you agree to comply fully with Meta's Platform Terms, Developer Policies, and Community Standards. You explicitly agree NOT to use Flowchat for: (a) sending unsolicited bulk spam or unauthorized advertisements; (b) harassing, misleading, or defrauding social media users; (c) distributing hate speech, explicit adult material, or illegal products; (d) attempting to circumvent Meta API rate limits.",
    },
    {
      heading: "4. Subscription Plans, Billing & Cancellation Policy",
      text: "Flowchat provides a 7-day free trial with full access to all automation tools. Paid subscriptions (₹99/month for Premium, ₹799/year for Pro) are billed via Razorpay (UPI, QR, Cards) or Stripe. As stated across our platform, you may CANCEL OR STOP YOUR SUBSCRIPTION AT ANY TIME directly from your Flowchat dashboard with zero cancellation fees or lock-in contracts.",
    },
    {
      heading: "5. Account Security & User Responsibilities",
      text: "You are responsible for maintaining the confidentiality of your Clerk login credentials and for all automation activities executed through your connected Instagram, Facebook, or WhatsApp accounts. You must notify us immediately at support@earnwithads.in of any unauthorized access.",
    },
    {
      heading: "6. Intellectual Property & Brand Rights",
      text: "All software, trademarks, logos, UI designs, and underlying code powering Flowchat on earnwithads.in are the exclusive property of Flowchat Inc. Instagram, Facebook, Messenger, and WhatsApp are registered trademarks of Meta Platforms, Inc.",
    },
    {
      heading: "7. Limitation of Liability & Service Availability",
      text: "Flowchat maintains a 99.9% uptime SLA. However, we are not liable for temporary service interruptions or delayed DM deliveries caused by Meta API outages, third-party network downtime, or user account suspensions resulting from user violations of Meta Community Standards.",
    },
    {
      heading: "8. Contact & Legal Support",
      text: "For questions, billing inquiries, or legal notices regarding these Terms, please contact our Legal Team at support@earnwithads.in or legal@earnwithads.in.",
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

      <div className="pt-36 pb-20 px-6">
        <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 md:p-14 shadow-sm border border-gray-100 space-y-10">
          {/* Header */}
          <div className="border-b border-gray-100 pb-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl font-black text-gray-900">
                Flow<span style={{ color: "#03856b" }}>chat</span>
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight">
              {termsData.title}
            </h1>
            <p className="text-xs text-gray-500 mt-2 font-medium">
              Official Terms & Conditions | Last Updated: {termsData.lastUpdated} | Domain: {termsData.domain}
            </p>
          </div>

          {/* Sections */}
          <div className="space-y-8 text-sm text-gray-700 leading-relaxed">
            {termsData.sections.map((sec, idx) => (
              <section key={idx} className="space-y-3">
                <h2 className="text-xl font-bold text-gray-900 tracking-tight">
                  {sec.heading}
                </h2>
                <p className="text-gray-600 leading-relaxed">{sec.text}</p>
              </section>
            ))}
          </div>

          {/* Footer Link */}
          <div className="pt-8 border-t border-gray-100 flex items-center justify-between">
            <a
              href="/"
              className="text-xs font-semibold text-[#03856b] hover:underline"
            >
              ← Back to Flowchat Home
            </a>
            <span className="text-xs text-gray-400">© 2026 Flowchat. All rights reserved.</span>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}