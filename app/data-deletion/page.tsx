import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

/* =========================================================================
   ✏️ EDIT YOUR DATA DELETION INSTRUCTIONS TEXT HERE (NO CODING REQUIRED)
   ========================================================================= */

const dataDeletionData = {
  title: "Data Deletion Instructions",
  subtitle: "Compliance Document for Meta Platforms & User Rights | Domain: earnwithads.in",

  introHeading: "Your Right to Complete Data Erasure",
  introText:
    "In full compliance with Meta Platform Terms, Meta Developer Policy (Section 3.a Data Protection), GDPR, and CCPA regulations, Flowchat provides all users with the absolute right to request the complete deletion of their account data, Meta Page tokens, Instagram credentials, and automation history at any time.",

  methodsHeading: "3 Easy Methods to Delete Your Data & Revoke Access:",
  methods: [
    {
      step: "Method 1",
      title: "Self-Service Deletion via Flowchat Dashboard (Instant)",
      description:
        "1. Log into your dashboard at earnwithads.in/dashboard.\n2. Navigate to Settings for Instagram, Facebook, or WhatsApp.\n3. Click 'Disconnect Account & Purge All Automations'.\n4. Your connected Page tokens, keyword rules, and DM logs are permanently erased from our Supabase database within 5 seconds.",
    },
    {
      step: "Method 2",
      title: "Revoke Access via Meta Settings (Facebook / Instagram)",
      description:
        "1. Log into your Facebook or Instagram account.\n2. Go to Settings & Privacy → Settings → Apps and Websites.\n3. Locate 'Flowchat' and click 'Remove'.\n4. Upon receiving Meta's Deletion Webhook Callback, our system automatically revokes, purges, and deletes all associated access tokens within 24 hours.",
    },
    {
      step: "Method 3",
      title: "Direct Email / Phone Request (24-Hour SLA)",
      description:
        "Contact us directly via Email at ashishkushwaha1822@gmail.com or Mobile at +91 9589001822 with the subject line 'DATA DELETION REQUEST'. Include your registered email address. Our Data Protection Team will manually purge all account records and send you an official Data Deletion Confirmation Certificate within 24-48 business hours.",
    },
  ],

  retentionHeading: "Data Retention & Automatic Purge Schedule",
  retentionText:
    "Once a deletion request is executed or an account is deleted, all stored access tokens, DM templates, and lead analytics are permanently purged from both our active database servers and secure backups within 48 hours. No residual user data is retained.",
};

/* =========================================================================
   ⚠️ DO NOT EDIT BELOW UNLESS YOU WANT TO CHANGE THE PAGE DESIGN
   ========================================================================= */

export default function DataDeletionPage() {
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
              {dataDeletionData.title}
            </h1>
            <p className="text-xs text-gray-500 mt-2 font-medium">
              {dataDeletionData.subtitle}
            </p>
          </div>

          <div className="space-y-8 text-sm text-gray-700 leading-relaxed">
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-gray-900 tracking-tight">
                {dataDeletionData.introHeading}
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {dataDeletionData.introText}
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-bold text-gray-900 tracking-tight">
                {dataDeletionData.methodsHeading}
              </h2>

              <div className="space-y-4">
                {dataDeletionData.methods.map((m, idx) => (
                  <div
                    key={idx}
                    className="p-6 rounded-2xl bg-gray-50 border border-gray-100 space-y-2"
                  >
                    <span className="px-3 py-1 rounded-full bg-emerald-100 text-[#03856b] text-[10px] font-bold uppercase tracking-wider">
                      {m.step}
                    </span>
                    <h3 className="font-bold text-gray-900 text-base">
                      {m.title}
                    </h3>
                    <p className="text-xs text-gray-600 whitespace-pre-line leading-relaxed">
                      {m.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-gray-900 tracking-tight">
                {dataDeletionData.retentionHeading}
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {dataDeletionData.retentionText}
              </p>
            </section>
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