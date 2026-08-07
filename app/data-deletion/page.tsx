import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

/* =========================================================================
   ✏️ EDIT YOUR DATA DELETION INSTRUCTIONS TEXT HERE (NO CODING REQUIRED)
   Aapko niche sirf double quotes "..." ke andar apna simple text badalna hai.
   ========================================================================= */

const dataDeletionData = {
  title: "Data Deletion Instructions",
  complianceNote: "Compliance Policy for Meta Platforms | Domain: earnwithads.in",

  introHeading: "Your Right to Data Deletion",
  introText:
    "In accordance with Meta Platform policies and data privacy regulations, you have the right to request the deletion of any data associated with your Flowchat account at any time.",

  methodsHeading: "How to Remove Your Data & Revoke Access:",
  methods: [
    {
      title: "Method 1: From your Flowchat Dashboard",
      description:
        "Log in to your dashboard at earnwithads.in/dashboard, go to settings for Instagram, Facebook, or WhatsApp, and click 'Disconnect & Delete All Automations'. This instantly and permanently deletes all your keywords, automations, and tokens from our Supabase database.",
    },
    {
      title: "Method 2: From Facebook / Instagram Settings",
      description:
        "You can remove Flowchat's permissions directly from your Facebook or Instagram account settings under Apps and Websites. Once removed, our system automatically revokes and purges your connection tokens.",
    },
    {
      title: "Method 3: By Email Request",
      description:
        "Send an email to support@earnwithads.in with your registered email address and account username requesting complete data erasure. We process all data deletion requests within 48 hours.",
    },
  ],

  retentionHeading: "Data Retention Policy",
  retentionText:
    "Upon receiving a deletion request, all personal data, access tokens, and automation history are completely purged from our active databases and secure backups within 48 hours.",
};

/* =========================================================================
   ⚠️ DO NOT EDIT BELOW UNLESS YOU WANT TO CHANGE THE PAGE DESIGN
   ========================================================================= */

export default function DataDeletionPage() {
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
              {dataDeletionData.title}
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              {dataDeletionData.complianceNote}
            </p>
          </div>

          <div className="space-y-6 text-sm text-gray-700 leading-relaxed">
            <section className="space-y-2">
              <h2 className="text-lg font-bold text-gray-900">
                {dataDeletionData.introHeading}
              </h2>
              <p>{dataDeletionData.introText}</p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-gray-900">
                {dataDeletionData.methodsHeading}
              </h2>

              {dataDeletionData.methods.map((m, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-gray-50 border border-gray-100 space-y-1"
                >
                  <h3 className="font-bold text-gray-900 text-sm">{m.title}</h3>
                  <p className="text-xs text-gray-600">{m.description}</p>
                </div>
              ))}
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-bold text-gray-900">
                {dataDeletionData.retentionHeading}
              </h2>
              <p>{dataDeletionData.retentionText}</p>
            </section>
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