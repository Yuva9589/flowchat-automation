import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <section className="pt-36 pb-20 px-6 bg-gradient-to-b from-emerald-50/50 to-white">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <span className="px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-100 text-[#03856b]">
            About Flowchat
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tight leading-tight">
            Building the Future of <br />
            <span
              style={{
                backgroundImage:
                  "linear-gradient(135deg, #8b5cf6 0%, #ec4899 50%, #f97316 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Social DM Automation
            </span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Flowchat was created with a single mission: to help creators, coaches, and businesses turn every comment on Instagram, Facebook, and WhatsApp into meaningful customer conversations — 100% automatically.
          </p>
        </div>
      </section>

      <section className="py-16 px-6 max-w-4xl mx-auto space-y-12">
        {/* Our Story */}
        <div className="bg-white rounded-3xl p-8 md:p-12 border border-gray-100 shadow-sm space-y-4">
          <h2 className="text-2xl font-black text-gray-900">Our Story</h2>
          <p className="text-gray-600 leading-relaxed">
            Founded in 2026, Flowchat started when a group of digital creators realized they were losing thousands of leads every week because they couldn&apos;t reply to Instagram and Facebook comments fast enough. Generic chatbot builders were too complex and easy to get flagged as spam.
          </p>
          <p className="text-gray-600 leading-relaxed">
            We built Flowchat directly on official Meta & WhatsApp Business APIs, combining smart keyword detection with AI message variations to deliver DMs in under 4 seconds while keeping user accounts 100% safe.
          </p>
        </div>

        {/* Core Values */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-[#03856b] font-bold text-xl">
              🔒
            </div>
            <h3 className="font-bold text-gray-900 text-lg">100% Meta Compliant</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              We exclusively use official Meta & WhatsApp Business APIs. No password sharing, no grey-area bots, zero account ban risk.
            </p>
          </div>

          <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center text-purple-600 font-bold text-xl">
              ⚡
            </div>
            <h3 className="font-bold text-gray-900 text-lg">Lightning Delivery</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              DMs land in under 4 seconds whether it&apos;s 2 PM or 3 AM. Your prospective leads never wait for links or offers.
            </p>
          </div>

          <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-pink-100 flex items-center justify-center text-pink-600 font-bold text-xl">
              🤖
            </div>
            <h3 className="font-bold text-gray-900 text-lg">Human AI Writing</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Our AI rewrites every reply in natural English, Hindi, and Hinglish so message variations never look repetitive or spammy.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="bg-gray-900 text-white rounded-3xl p-8 md:p-12 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <p className="text-3xl md:text-4xl font-black text-emerald-400">10,000+</p>
            <p className="text-xs text-gray-400 mt-1">Active Creators</p>
          </div>
          <div>
            <p className="text-3xl md:text-4xl font-black text-purple-400">1M+</p>
            <p className="text-xs text-gray-400 mt-1">DMs Delivered</p>
          </div>
          <div>
            <p className="text-3xl md:text-4xl font-black text-pink-400">&lt;4s</p>
            <p className="text-xs text-gray-400 mt-1">Avg Delivery Time</p>
          </div>
          <div>
            <p className="text-3xl md:text-4xl font-black text-orange-400">99.9%</p>
            <p className="text-xs text-gray-400 mt-1">Uptime SLA</p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}