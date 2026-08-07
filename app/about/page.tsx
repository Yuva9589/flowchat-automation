import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

/* =========================================================================
   ✏️ EDIT YOUR TEXT HERE (NO CODING REQUIRED)
   Aapko niche sirf double quotes "..." ke andar apna simple text badalna hai.
   ========================================================================= */

const aboutData = {
  // Hero Badge & Title
  badge: "The Flowchat Manifesto",
  title: "Why We Built Flowchat",
  subtitle:
    "At Flowchat, we help creators, coaches, and businesses grow by simplifying social DM automation — turning every comment into a customer.",

  // Story Paragraphs (Manychat style)
  sections: [
    {
      heading: "Every Creator Has a Unique Story to Tell",
      text: "Whether you are selling a course, coaching students, offering a service, or running an online brand — your content is your passion.",
    },
    {
      heading: "Business Owners & Creators Know Their Craft",
      text: "But you shouldn't have to spend 6 hours every day manually replying 'DM sent' or sending link after link in Instagram and Facebook comments.",
    },
    {
      heading: "Speed & Automation Matter",
      text: "When someone drops a comment like 'LINK' or 'PRICE' on your Reel or Story, they want it instantly. If they wait 2 hours, they forget. Flowchat delivers your DMs in under 4 seconds — 24/7, even while you sleep.",
    },
    {
      heading: "100% Safe & Official Meta APIs",
      text: "We built Flowchat directly on official Meta and WhatsApp Business APIs. No password sharing, no risky grey-area bots — 100% account safety guaranteed.",
    },
  ],

  // Flowchat by the Numbers (Manychat style)
  statsTitle: "Flowchat by the Numbers",
  stats: [
    {
      number: "10,000+",
      title: "Creators & Businesses",
      description: "Over 10,000 creators chose Flowchat to grow their sales.",
    },
    {
      number: "1M+",
      title: "DMs Delivered",
      description: "Over one million automated conversations delivered seamlessly.",
    },
    {
      number: "<4s",
      title: "Delivery Speed",
      description: "Avg response delivery time across Instagram, Facebook & WhatsApp.",
    },
    {
      number: "#1",
      title: "DM Automation Engine",
      description: "Built for creators, coaches, e-commerce, and agencies in India.",
    },
  ],

  // Bottom CTA
  ctaTitle: "Try Flowchat for Free Today",
  ctaSubtitle:
    "Transform your social comments into sales, leads, and new followers in under 2 minutes.",
  ctaButtonText: "Start 7-Day Free Trial",
  ctaButtonUrl: "/#signup",
};

/* =========================================================================
   ⚠️ DO NOT EDIT BELOW UNLESS YOU WANT TO CHANGE THE PAGE DESIGN
   ========================================================================= */

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-36 pb-20 px-6 bg-gradient-to-b from-emerald-50/60 via-white to-white text-center">
        <div className="max-w-4xl mx-auto space-y-6">
          <span className="px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-100 text-[#03856b]">
            {aboutData.badge}
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tight leading-tight">
            {aboutData.title}
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            {aboutData.subtitle}
          </p>
        </div>
      </section>

      {/* Story / Manifesto Sections (Manychat style) */}
      <section className="py-12 px-6 max-w-3xl mx-auto space-y-12">
        {aboutData.sections.map((sec, idx) => (
          <div
            key={idx}
            className="p-8 rounded-3xl bg-white border border-gray-100 shadow-sm space-y-3 hover:border-emerald-200 transition-colors"
          >
            <h2 className="text-2xl font-black text-gray-900 leading-snug">
              {sec.heading}
            </h2>
            <p className="text-base text-gray-600 leading-relaxed">{sec.text}</p>
          </div>
        ))}
      </section>

      {/* Stats Section (Manychat style) */}
      <section className="py-16 px-6 bg-gray-900 text-white my-12">
        <div className="max-w-5xl mx-auto space-y-12">
          <h2 className="text-3xl md:text-4xl font-black text-center tracking-tight">
            {aboutData.statsTitle}
          </h2>

          <div className="grid md:grid-cols-4 gap-6">
            {aboutData.stats.map((st, i) => (
              <div
                key={i}
                className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 space-y-2"
              >
                <p className="text-3xl md:text-4xl font-black text-[#4ade80]">
                  {st.number}
                </p>
                <p className="text-base font-bold text-white">{st.title}</p>
                <p className="text-xs text-gray-400 leading-relaxed">
                  {st.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-6 text-center bg-white">
        <div className="max-w-2xl mx-auto space-y-6">
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight">
            {aboutData.ctaTitle}
          </h2>
          <p className="text-gray-600 text-base">{aboutData.ctaSubtitle}</p>
          <a
            href={aboutData.ctaButtonUrl}
            className="inline-block px-8 py-4 rounded-full bg-[#03856b] text-white font-bold text-base shadow-xl hover:opacity-90 transition-opacity"
          >
            {aboutData.ctaButtonText} →
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
}