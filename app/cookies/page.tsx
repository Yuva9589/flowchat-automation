import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function CookiePolicyPage() {
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
              Cookie Policy
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Meta Platforms Compliance | Domain: earnwithads.in
            </p>
          </div>

          <div className="space-y-6 text-sm text-gray-700 leading-relaxed">
            <section className="space-y-2">
              <h2 className="text-lg font-bold text-gray-900">1. What Are Cookies?</h2>
              <p>
                Cookies are small text files stored on your browser or device when you visit <strong>earnwithads.in</strong>. They allow us to recognize your session, keep you logged into your dashboard, and deliver a smooth user experience.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-bold text-gray-900">2. Cookies We Use</h2>
              <ul className="space-y-3">
                <li className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                  <strong className="text-gray-900 font-bold block mb-1">Strictly Essential Cookies (Clerk Authentication)</strong>
                  Essential for keeping you securely logged in to your Flowchat dashboard and securing your user session.
                </li>
                <li className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                  <strong className="text-gray-900 font-bold block mb-1">Performance & Analytics Cookies</strong>
                  Help us understand how visitors interact with earnwithads.in, measure load times, and improve dashboard performance.
                </li>
                <li className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                  <strong className="text-gray-900 font-bold block mb-1">Functional Cookies</strong>
                  Remember your UI settings (such as active platform view: Instagram, Facebook, or WhatsApp).
                </li>
              </ul>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-bold text-gray-900">3. Managing Your Cookies</h2>
              <p>
                You can manage or disable cookies at any time through your web browser settings. Please note that disabling essential cookies may prevent you from logging into your Flowchat dashboard.
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