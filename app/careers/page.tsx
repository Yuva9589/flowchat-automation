import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function CareersPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <section className="pt-36 pb-16 px-6 bg-gradient-to-b from-emerald-50/50 to-white text-center">
        <div className="max-w-3xl mx-auto space-y-4">
          <span className="px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-100 text-[#03856b]">
            Join Our Team
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">
            Help Us Automate Conversations Worldwide
          </h1>
          <p className="text-gray-600 text-base">
            We are building high-performance AI tools for creators and businesses across Instagram, Facebook, and WhatsApp.
          </p>
        </div>
      </section>

      <section className="py-12 px-6 max-w-4xl mx-auto space-y-12">
        {/* Open Positions */}
        <div className="space-y-6">
          <h2 className="text-2xl font-black text-gray-900">Open Positions</h2>

          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h3 className="font-bold text-gray-900 text-lg">
                Senior Full Stack Engineer (Next.js & Node)
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                Full-Time · Remote (India / Worldwide) · Tech Team
              </p>
            </div>
            <a
              href="mailto:careers@earnwithads.in?subject=Application:%20Full%20Stack%20Engineer"
              className="px-5 py-2.5 rounded-full bg-[#03856b] text-white text-xs font-bold text-center hover:opacity-90 transition-opacity"
            >
              Apply Now
            </a>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h3 className="font-bold text-gray-900 text-lg">
                Meta & WhatsApp Integration Specialist
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                Full-Time · Remote · Engineering
              </p>
            </div>
            <a
              href="mailto:careers@earnwithads.in?subject=Application:%20Integration%20Specialist"
              className="px-5 py-2.5 rounded-full bg-[#03856b] text-white text-xs font-bold text-center hover:opacity-90 transition-opacity"
            >
              Apply Now
            </a>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h3 className="font-bold text-gray-900 text-lg">
                Technical Customer Support Engineer
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                Full-Time · Remote · Customer Success
              </p>
            </div>
            <a
              href="mailto:careers@earnwithads.in?subject=Application:%20Support%20Engineer"
              className="px-5 py-2.5 rounded-full bg-[#03856b] text-white text-xs font-bold text-center hover:opacity-90 transition-opacity"
            >
              Apply Now
            </a>
          </div>
        </div>

        {/* Benefits */}
        <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100 space-y-4">
          <h2 className="text-xl font-bold text-gray-900">Why Work With Us?</h2>
          <ul className="grid md:grid-cols-2 gap-3 text-xs text-gray-700">
            <li className="flex items-center gap-2">
              <span className="text-[#03856b]">✓</span> 100% Remote-first work culture
            </li>
            <li className="flex items-center gap-2">
              <span className="text-[#03856b]">✓</span> Competitive salary & equity options
            </li>
            <li className="flex items-center gap-2">
              <span className="text-[#03856b]">✓</span> Flexible working hours & unlimited PTO
            </li>
            <li className="flex items-center gap-2">
              <span className="text-[#03856b]">✓</span> Learning budget for courses & events
            </li>
          </ul>
        </div>
      </section>

      <Footer />
    </main>
  );
}