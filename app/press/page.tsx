import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function PressPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <section className="pt-36 pb-16 px-6 bg-gradient-to-b from-purple-50/50 to-white text-center">
        <div className="max-w-3xl mx-auto space-y-4">
          <span className="px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-purple-100 text-purple-700">
            Press & Media
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">
            Flowchat Press & Media Kit
          </h1>
          <p className="text-gray-600 text-base">
            Resources, logos, brand guidelines, and official announcements for journalists, creators, and partners.
          </p>
        </div>
      </section>

      <section className="py-12 px-6 max-w-4xl mx-auto space-y-8">
        <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm space-y-4">
          <h2 className="text-2xl font-black text-gray-900">About Flowchat</h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            Flowchat (earnwithads.in) is an AI-powered comment-to-DM automation engine designed specifically for creators, coaches, and digital brands across Instagram, Facebook, and WhatsApp. Running on official Meta APIs, Flowchat processes millions of comment triggers with under 4-second delivery and 99.9% uptime.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 space-y-3">
            <h3 className="font-bold text-gray-900 text-lg">📁 Brand Assets & Logos</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Download high-resolution Flowchat logos in SVG, PNG, and vector formats for light and dark backgrounds.
            </p>
            <a
              href="mailto:press@earnwithads.in?subject=Media%20Kit%20Request"
              className="inline-block text-xs font-bold text-[#03856b] underline"
            >
              Request Brand Assets →
            </a>
          </div>

          <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 space-y-3">
            <h3 className="font-bold text-gray-900 text-lg">📰 Press Inquiries</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              For interview requests, executive quotes, or data insights on creator monetization and DM automation:
            </p>
            <a
              href="mailto:press@earnwithads.in"
              className="inline-block text-xs font-bold text-[#03856b] underline"
            >
              press@earnwithads.in →
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}