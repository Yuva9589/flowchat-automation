import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

/* =========================================================================
   ✏️ EDIT YOUR TEXT HERE (NO CODING REQUIRED)
   Aapko niche sirf double quotes "..." ke andar apna simple text badalna hai.
   ========================================================================= */

const aboutData = {
  // Hero Badge & Title
  badge: "About Flowchat",
  title: "Automating Social DM Conversations",
  subtitle:
    "Automating social DM conversations so creators can focus on their content and business growth.",

  // Official Company & Founder Details
  companyName: "Flowchat",
  founderName: "Ashish Kushwaha",
  foundedYear: "2026",
  location:
    "Word No.10 Basti Road Devendra Nagar, District Panna, Madhya Pradesh, India",
  domain: "earnwithads.in",
  contactEmail: "ashishkushwaha1822@gmail.com",
  contactPhone: "+91 9589001822",

  // Mission Statement / Tagline
  missionTitle: "Our Mission",
  missionStatement:
    "Automating social DM conversations so creators can focus on their content and business growth.",

  // Target Audience / Who We Serve
  audienceTitle: "Who We Serve",
  audienceSubtitle:
    "Flowchat is purpose-built for high-growth digital creators, brands, and service businesses in India.",
  audiences: [
    {
      title: "Indian Creators",
      description:
        "Monetize your Instagram Reels & Facebook posts instantly by turning viral comments into direct sales links.",
      icon: "🎨",
    },
    {
      title: "Coaches & Educators",
      description:
        "Automatically send course details, webinar signups, and downloadable PDFs directly into student DMs.",
      icon: "🎓",
    },
    {
      title: "Instagram Sellers",
      description:
        "Instantly reply to comment queries like 'Price?' or 'Details?' with catalog links and checkout options.",
      icon: "🛍️",
    },
    {
      title: "Small Business Owners",
      description:
        "Capture customer leads 24/7 without spending extra hours on manual response management.",
      icon: "🏢",
    },
    {
      title: "Fitness Trainers",
      description: "Send fitness plans, trial passes, and booking links automatically when followers comment.",
      icon: "💪",
    },
    {
      title: "E-commerce Stores",
      description:
        "Deliver personalized promo codes, product recommendations, and cart recovery DMs effortlessly.",
      icon: "🛒",
    },
  ],

  // Story & Pillars (Manychat Style)
  storyTitle: "Why We Built Flowchat",
  storySections: [
    {
      heading: "Creators Should Focus on Content, Not Copy-Pasting Links",
      text: "As a creator or business owner, your talent is creating valuable content and products. Spending hours every day replying 'DM sent' or copying links manually steals time from growing your business.",
    },
    {
      heading: "Instant Gratification Boosts Conversion",
      text: "When a customer asks for a link in the comments, waiting even 10 minutes leads to drop-offs. Flowchat delivers your response in under 4 seconds — capturing purchase intent at its absolute peak.",
    },
    {
      heading: "100% Meta Compliant & Account Safe",
      text: "Flowchat connects via official Meta Graph APIs and WhatsApp Business APIs. No risky password sharing, no grey-hat bots, and total security for your brand's account.",
    },
  ],

  // Stats Section (Manychat Style)
  statsTitle: "Flowchat by the Numbers",
  stats: [
    {
      number: "2026",
      title: "Founded Year",
      description: "Launched to revolutionize social DM marketing in India.",
    },
    {
      number: "<4s",
      title: "Delivery Speed",
      description: "Average response speed across Instagram, Facebook & WhatsApp.",
    },
    {
      number: "10,000+",
      title: "Targeted Growth",
      description: "Helping creators & sellers automate millions of customer touchpoints.",
    },
    {
      number: "100%",
      title: "Official Meta APIs",
      description: "Fully compliant with Meta & WhatsApp policies.",
    },
  ],

  // Bottom CTA
  ctaTitle: "Ready to Automate Your Social DMs?",
  ctaSubtitle:
    "Join creators, coaches, and brands across India scaling their social sales on autopilot.",
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
      <section className="pt-36 pb-16 px-6 bg-gradient-to-b from-emerald-50/70 via-white to-white text-center">
        <div className="max-w-4xl mx-auto space-y-6">
          <span className="px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-100 text-[#03856b]">
            {aboutData.badge}
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tight leading-tight">
            {aboutData.title}
          </h1>
          <p className="text-lg md:text-2xl text-emerald-900 font-semibold max-w-3xl mx-auto leading-relaxed bg-emerald-50/80 p-6 rounded-2xl border border-emerald-100">
            &ldquo;{aboutData.subtitle}&rdquo;
          </p>
        </div>
      </section>

      {/* Official Company & Founder Info Card */}
      <section className="py-8 px-6 max-w-5xl mx-auto">
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 md:p-12 text-white shadow-xl space-y-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-700 pb-6 gap-4">
            <div>
              <span className="text-emerald-400 font-bold text-xs uppercase tracking-widest">
                Official Company Overview
              </span>
              <h2 className="text-3xl font-black text-white mt-1">
                {aboutData.companyName}
              </h2>
            </div>
            <span className="px-4 py-2 rounded-xl bg-emerald-500/20 text-emerald-300 font-bold text-sm border border-emerald-500/30">
              Founded in {aboutData.foundedYear}
            </span>
          </div>

          <div className="grid md:grid-cols-2 gap-8 text-sm">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-lg shrink-0">
                  👤
                </div>
                <div>
                  <p className="text-gray-400 text-xs font-medium">Founder & Owner</p>
                  <p className="text-lg font-bold text-white">{aboutData.founderName}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-lg shrink-0">
                  📍
                </div>
                <div>
                  <p className="text-gray-400 text-xs font-medium">Operating Location</p>
                  <p className="text-sm font-semibold text-gray-200 leading-snug">
                    {aboutData.location}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-lg shrink-0">
                  ✉️
                </div>
                <div>
                  <p className="text-gray-400 text-xs font-medium">Official Contact Email</p>
                  <a
                    href={`mailto:${aboutData.contactEmail}`}
                    className="text-base font-bold text-emerald-400 hover:underline"
                  >
                    {aboutData.contactEmail}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-lg shrink-0">
                  📞
                </div>
                <div>
                  <p className="text-gray-400 text-xs font-medium">Customer Support Phone</p>
                  <a
                    href={`tel:${aboutData.contactPhone.replace(/\s+/g, "")}`}
                    className="text-base font-bold text-emerald-400 hover:underline"
                  >
                    {aboutData.contactPhone}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Target Audience / Who We Serve */}
      <section className="py-16 px-6 max-w-6xl mx-auto space-y-10">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-100 text-[#03856b]">
            Target Audience
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight">
            {aboutData.audienceTitle}
          </h2>
          <p className="text-gray-600 text-base">{aboutData.audienceSubtitle}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {aboutData.audiences.map((aud, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md hover:border-emerald-200 transition-all space-y-3"
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-2xl flex items-center justify-center">
                {aud.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900">{aud.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {aud.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Story / Manifesto Sections (Manychat style) */}
      <section className="py-12 px-6 max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-3">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight">
            {aboutData.storyTitle}
          </h2>
        </div>

        <div className="space-y-6">
          {aboutData.storySections.map((sec, idx) => (
            <div
              key={idx}
              className="p-8 rounded-3xl bg-white border border-gray-100 shadow-sm space-y-3 hover:border-emerald-200 transition-colors"
            >
              <h3 className="text-2xl font-bold text-gray-900 leading-snug">
                {sec.heading}
              </h3>
              <p className="text-base text-gray-600 leading-relaxed">
                {sec.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Section (Manychat style) */}
      <section className="py-16 px-6 bg-gray-900 text-white my-12">
        <div className="max-w-5xl mx-auto space-y-12">
          <h2 className="text-3xl md:text-4xl font-black text-center tracking-tight">
            {aboutData.statsTitle}
          </h2>

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {aboutData.stats.map((st, i) => (
              <div
                key={i}
                className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 space-y-2 text-center md:text-left"
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
