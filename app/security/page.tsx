import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function SecurityPage() {
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
              Data Security & Encryption
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Infrastructure & API Protection | Domain: earnwithads.in
            </p>
          </div>

          <div className="space-y-6 text-sm text-gray-700 leading-relaxed">
            <section className="space-y-2">
              <h2 className="text-lg font-bold text-gray-900">1. Official Meta & WhatsApp API Integration</h2>
              <p>
                Flowchat connects strictly through official Meta Graph APIs and WhatsApp Business APIs. We <strong>never store or request your Instagram/Facebook passwords</strong>. Authentication is handled via secure OAuth tokens.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-bold text-gray-900">2. Encryption in Transit & At Rest</h2>
              <p>
                All data transmitted between your browser, our servers, and Meta APIs is encrypted using <strong>256-bit SSL/TLS protocols (HTTPS)</strong>. Sensitive API access tokens are stored in Supabase with Row Level Security (RLS) and AES-256 encryption.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-bold text-gray-900">3. Continuous Monitoring & Incident Response</h2>
              <p>
                Our infrastructure is hosted on Vercel and Supabase with 99.9% uptime SLA and 24/7 automated threat monitoring. In case of any security vulnerability report, contact <strong>security@earnwithads.in</strong>.
              </p>
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