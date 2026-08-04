export default function PrivacyPolicyPage() {
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
          <h1 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight">Privacy Policy</h1>
          <p className="text-sm text-gray-500 mt-1">Effective Date: August 5, 2026 | Domain: earnwithads.in</p>
        </div>

        {/* Content */}
        <div className="space-y-6 text-sm text-gray-700 leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-lg font-bold text-gray-900">Introduction</h2>
            <p>
              Welcome to <strong>Flowchat</strong> (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;). We respect your privacy and are committed to protecting your personal data. This privacy policy informs you how we collect, use, and safeguard your information when you visit our website at <strong>earnwithads.in</strong> and use our AI-powered DM automation services for Instagram, Facebook, and WhatsApp.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-gray-900">1. Information We Collect</h2>
            <p>To provide automated messaging and comment responses, we collect:</p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li><strong>Account Information:</strong> Name, email address, and authentication identifiers processed securely via Clerk.</li>
              <li><strong>Meta Business & Platform Data:</strong> Connected Facebook Pages, Instagram Business accounts, and WhatsApp Business API credentials / access tokens required to perform automated replies on your behalf.</li>
              <li><strong>Automation Content:</strong> Keywords, custom DM replies, post URLs, and performance analytics (DMs sent, click-through counts) stored securely in Supabase.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-gray-900">2. How We Use Your Information</h2>
            <p>We use the collected data strictly for the following purposes:</p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>To operate and deliver Flowchat&apos;s comment-to-DM automation services across Instagram, Facebook, and WhatsApp.</li>
              <li>To authenticate your identity and maintain secure dashboard sessions.</li>
              <li>To analyze automation performance and improve system reliability.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-gray-900">3. Data Sharing & Disclosure</h2>
            <p>
              We do not sell, trade, or rent your personal data to third parties. Data is shared with Meta Platforms (Instagram/Facebook/WhatsApp) solely as required to execute automated direct messages and comment replies triggered by your account configurations. All data transmissions are encrypted using industry-standard SSL/TLS protocols.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-gray-900">4. Data Security & Retention</h2>
            <p>
              We implement robust security measures to protect your information. We <strong>never store your Instagram or Facebook account passwords</strong>. Access tokens are securely stored in our encrypted Supabase database. You may revoke Flowchat&apos;s access at any time from your Meta account settings or via your Flowchat dashboard.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-gray-900">5. Contact Us</h2>
            <p>
              If you have any questions or concerns regarding this Privacy Policy or your data, please contact us at:
              <br />
              <strong>Email:</strong> support@earnwithads.in
            </p>
          </section>
        </div>

        {/* Footer Link */}
        <div className="pt-6 border-t border-gray-100 flex items-center justify-between">
          <a href="/" className="text-xs font-semibold text-[#03856b] hover:underline">
            ← Back to Home
          </a>
          <span className="text-xs text-gray-400">© 2026 Flowchat</span>
        </div>

      </div>
    </div>
  );
}