import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function RefundPolicyPage() {
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
              Refund & Cancellation Policy
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Payment Terms & Subscription Policy | Domain: earnwithads.in
            </p>
          </div>

          <div className="space-y-6 text-sm text-gray-700 leading-relaxed">
            <section className="space-y-2">
              <h2 className="text-lg font-bold text-gray-900">1. 7-Day Free Trial</h2>
              <p>
                Flowchat provides a <strong>7-day free trial</strong> with full access to all Instagram, Facebook, and WhatsApp DM automations. No credit card or payment details are required to start your free trial.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-bold text-gray-900">2. Cancellation Policy</h2>
              <p>
                You can cancel your Flowchat subscription (₹99/month or ₹799/year) at any time from your dashboard in just a couple of clicks. There are no cancellation fees, hidden charges, or lock-in contracts.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-bold text-gray-900">3. Money-Back Guarantee & Refund Requests</h2>
              <p>
                We offer a <strong>7-day money-back guarantee</strong> on all paid plans. If you are unsatisfied with Flowchat within 7 days of your payment, send an email to <strong>support@earnwithads.in</strong> requesting a refund.
              </p>
              <p>
                Refunds are processed to your original payment method (UPI / Bank / Card) within 3-5 business days.
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