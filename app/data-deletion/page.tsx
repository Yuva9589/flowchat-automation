export default function DataDeletionPage() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 py-16 px-6">
      <div className="max-w-3xl mx-auto bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100 space-y-8">
        {/* Header */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl font-black text-gray-900">
              Flow<span style={{ color: "#03856b" }}>chat</span>
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight">
            Data Deletion Instructions
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Compliance Policy for Meta Platforms | Domain: earnwithads.in
          </p>
        </div>

        {/* Content */}
        <div className="space-y-6 text-sm text-gray-700 leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-lg font-bold text-gray-900">
              Your Right to Data Deletion
            </h2>
            <p>
              In accordance with Meta Platform policies and data privacy regulations, you have the right to request the deletion of any data associated with your <strong>Flowchat</strong> account.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-gray-900">
              How to Remove Your Data & Revoke Access:
            </h2>

            <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 space-y-1">
              <h3 className="font-bold text-gray-900 text-sm">
                Method 1: From your Flowchat Dashboard
              </h3>
              <p className="text-xs text-gray-600">
                Log in to your dashboard at{" "}
                <a
                  href="/dashboard"
                  className="text-[#03856b] underline font-semibold"
                >
                  earnwithads.in/dashboard
                </a>
                , go to settings for Instagram, Facebook, or WhatsApp, and click{" "}
                <strong>&ldquo;Disconnect & Delete All Automations&rdquo;</strong>.
                This instantly and permanently deletes all your keywords,
                automations, and tokens from our Supabase database.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 space-y-1">
              <h3 className="font-bold text-gray-900 text-sm">
                Method 2: From Facebook / Instagram Settings
              </h3>
              <p className="text-xs text-gray-600">
                You can remove Flowchat&apos;s permissions directly from your
                Facebook or Instagram account settings under{" "}
                <strong>Apps and Websites</strong>. Once removed, our system
                automatically revokes and purges your connection tokens.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 space-y-1">
              <h3 className="font-bold text-gray-900 text-sm">
                Method 3: By Email Request
              </h3>
              <p className="text-xs text-gray-600">
                Send an email to <strong>support@earnwithads.in</strong> with your
                registered email address and account username requesting complete data
                erasure. We process all data deletion requests within 48 hours.
              </p>
            </div>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-gray-900">
              Data Retention Policy
            </h2>
            <p>
              Upon receiving a deletion request, all personal data, access tokens,
              and automation history are completely purged from our active databases
              and secure backups within 48 hours.
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
  );
}