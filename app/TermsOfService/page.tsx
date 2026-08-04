export default function TermsOfServicePage() {
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
          <h1 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight">Terms of Service</h1>
          <p className="text-sm text-gray-500 mt-1">Effective Date: August 5, 2026 | Domain: earnwithads.in</p>
        </div>

        {/* Content */}
        <div className="space-y-6 text-sm text-gray-700 leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-lg font-bold text-gray-900">Acceptance of Terms</h2>
            <p>
              By accessing or using <strong>Flowchat</strong> at <strong>earnwithads.in</strong>, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-gray-900">1. Description of Service</h2>
            <p>
              Flowchat provides an AI-powered automation platform designed to turn comments into direct messages on Instagram, Facebook, and WhatsApp. Users can set trigger keywords, configure auto-replies, and view performance analytics.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-gray-900">2. Compliance with Meta Platform Policies</h2>
            <p>
              Because Flowchat integrates with Instagram, Facebook, and WhatsApp APIs, you agree to comply fully with Meta&apos;s Platform Terms, Developer Policies, and Community Guidelines. Using Flowchat for spamming, harassment, or distribution of unauthorized content is strictly prohibited and will result in immediate account suspension.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-gray-900">3. User Accounts & Responsibilities</h2>
            <p>
              You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You must immediately notify Flowchat of any unauthorized use of your account.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-gray-900">4. Limitation of Liability</h2>
            <p>
              Flowchat is provided on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo; basis without warranties of any kind. We shall not be liable for any indirect, incidental, special, or consequential damages resulting from your use or inability to use the service, including changes or restrictions imposed by Meta APIs.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-gray-900">5. Modifications to Terms</h2>
            <p>
              We reserve the right to revise these terms of service at any time without notice. By continuing to use Flowchat, you agree to be bound by the then-current version of these terms.
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