import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

/* =========================================================================
   ✏️ EDIT YOUR PRIVACY POLICY TEXT HERE (NO CODING REQUIRED)
   Aapko niche sirf double quotes "..." ke andar apna simple text badalna hai.
   ========================================================================= */

const privacyData = {
  title: "Privacy Policy",
  effectiveDate: "August 2026",
  domain: "earnwithads.in",

  introHeading: "Introduction",
  introText:
    "Welcome to Flowchat ('earnwithads.in'). We respect your privacy and are committed to protecting your personal data. This privacy policy informs you how we collect, use, and safeguard your information when you visit our website and use our AI-powered DM automation services for Instagram, Facebook, and WhatsApp.",

  sections: [
    {
      title: "1. Information We Collect",
      items: [
        "Account Information: Name, email address, and profile details processed securely via Clerk authentication.",
        "Meta & WhatsApp API Credentials: Connected Facebook Pages, Instagram Business accounts, and WhatsApp Business API tokens required to perform automated replies on your behalf.",
        "Automation Rules: Trigger keywords, custom reply messages, post URLs, and performance analytics stored securely in Supabase.",
      ],
    },
    {
      title: "2. How We Use Your Information",
      items: [
        "To operate and deliver Flowchat's comment-to-DM automation services across Instagram, Facebook, and WhatsApp.",
        "To authenticate your identity and maintain secure dashboard sessions.",
        "To analyze automation performance and improve system uptime.",
      ],
    },
    {
      title: "3. Data Sharing & Disclosure",
      items: [
        "We do NOT sell, trade, or rent your personal data to third parties.",
        "Data is shared with Meta Platforms (Instagram/Facebook/WhatsApp) solely as required to execute automated direct messages triggered by your account settings.",
        "All data transmissions are encrypted using industry-standard SSL/TLS protocols.",
      ],
    },
    {
      title: "4. Data Security & Retention",
      items: [
        "We NEVER store your Instagram or Facebook account passwords.",
        "Access tokens are securely stored in our encrypted Supabase database with Row Level Security (RLS).",
        "You may revoke Flowchat's permissions at any time from your Meta account settings or dashboard.",
      ],
    },
  ],

  contactHeading: "5. Contact Us",
  contactEmail: "support@earnwithads.in",
};

/* =========================================================================
   ⚠️ DO NOT EDIT BELOW UNLESS YOU WANT TO CHANGE THE PAGE DESIGN
   ========================================================================= */

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <div className="pt-36 pb-16 px-6">
        <div className="max-w-3xl mx-auto bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100 space-y-8">
          {/* Header */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl font-black text-gray-900">
                Flow<span style={{ color: "#03856b" }}>chat</span>
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight">
              {privacyData.title}
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Effective Date: {privacyData.effectiveDate} | Domain: {privacyData.domain}
            </p>
          </div>

          {/* Content */}
          <div className="space-y-6 text-sm text-gray-700 leading-relaxed">
            <section className="space-y-2">
              <h2 className="text-lg font-bold text-gray-900">
                {privacyData.introHeading}
              </h2>
              <p>{privacyData.introText}</p>
            </section>

            {privacyData.sections.map((sec, idx) => (
              <section key={idx} className="space-y-2">
                <h2 className="text-lg font-bold text-gray-900">{sec.title}</h2>
                <ul className="list-disc pl-5 space-y-1.5">
                  {sec.items.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </section>
            ))}

            <section className="space-y-2">
              <h2 className="text-lg font-bold text-gray-900">
                {privacyData.contactHeading}
              </h2>
              <p>
                If you have any questions or concerns regarding this Privacy Policy or your data, please contact us at:
                <br />
                <strong>Email:</strong> {privacyData.contactEmail}
              </p>
            </section>
          </div>

          {/* Footer Link */}
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