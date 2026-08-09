import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

/* =========================================================================
   ✏️ EDIT YOUR COOKIE POLICY TEXT HERE (NO CODING REQUIRED)
   ========================================================================= */

const cookieData = {
  title: "Cookie Policy",
  domainNote: "Meta Platforms Compliance | Domain: earnwithads.in",
  contactEmail: "ashishkushwaha1822@gmail.com",
  contactPhone: "+91 9589001822",

  sections: [
    {
      title: "1. What Are Cookies?",
      text: "Cookies are small text files stored on your browser or device when you visit earnwithads.in. They allow us to recognize your session, keep you logged into your dashboard, and deliver a smooth user experience.",
    },
    {
      title: "2. Cookies We Use",
      cookiesList: [
        {
          name: "Strictly Essential Cookies (Clerk Auth)",
          desc: "Essential for keeping you securely logged in to your Flowchat dashboard and securing your user session.",
        },
        {
          name: "Performance & Analytics Cookies",
          desc: "Help us understand how visitors interact with earnwithads.in, measure load times, and improve dashboard performance.",
        },
        {
          name: "Functional Cookies",
          desc: "Remember your UI settings (such as active platform view: Instagram, Facebook, or WhatsApp).",
        },
      ],
    },
    {
      title: "3. Managing Your Cookies & Support",
      text: "You can manage or disable cookies at any time through your web browser settings. For questions regarding our cookie policy, contact us:\n\nEmail: ashishkushwaha1822@gmail.com\nPhone / Mobile: +91 9589001822",
    },
  ],
};

/* =========================================================================
   ⚠️ DO NOT EDIT BELOW UNLESS YOU WANT TO CHANGE THE PAGE DESIGN
   ========================================================================= */

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
              {cookieData.title}
            </h1>
            <p className="text-sm text-gray-500 mt-1">{cookieData.domainNote}</p>
          </div>

          <div className="space-y-6 text-sm text-gray-700 leading-relaxed">
            {cookieData.sections.map((sec, idx) => (
              <section key={idx} className="space-y-2">
                <h2 className="text-lg font-bold text-gray-900">{sec.title}</h2>
                {sec.text && <p className="whitespace-pre-line">{sec.text}</p>}
                {sec.cookiesList && (
                  <ul className="space-y-3">
                    {sec.cookiesList.map((c, i) => (
                      <li
                        key={i}
                        className="p-4 bg-gray-50 rounded-2xl border border-gray-100"
                      >
                        <strong className="text-gray-900 font-bold block mb-1">
                          {c.name}
                        </strong>
                        {c.desc}
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
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