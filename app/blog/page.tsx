import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const articles = [
  {
    title: "How to Double Instagram Course Sales Using Comment-to-DM Rules",
    category: "Instagram Growth",
    date: "August 2026",
    readTime: "5 min read",
    summary:
      "Learn how fitness coaches and educators use trigger keywords like 'LINK' and 'INFO' to automatically deliver checkout links to commenters in under 4 seconds.",
  },
  {
    title: "Why Follow-Gate is the Ultimate Strategy for Viral Account Growth",
    category: "Strategy",
    date: "August 2026",
    readTime: "4 min read",
    summary:
      "Automatically checking if a user follows you before sending a free guide or template turns every link request into a new follower seamlessly.",
  },
  {
    title: "Facebook Page Ads Automation: Convert Every Commenter into a Messenger Lead",
    category: "Facebook Ads",
    date: "July 2026",
    readTime: "6 min read",
    summary:
      "Stop wasting ad spend on manual replies. Discover how automated Facebook Messenger replies lower cost-per-lead by over 60%.",
  },
  {
    title: "Setting Up WhatsApp Business API Auto-Replies in 2 Minutes",
    category: "WhatsApp",
    date: "July 2026",
    readTime: "4 min read",
    summary:
      "A complete step-by-step guide to connecting official WhatsApp Business API for automated customer support, broadcast messages, and interactive buttons.",
  },
];

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <section className="pt-36 pb-16 px-6 bg-gradient-to-b from-purple-50/50 to-white text-center">
        <div className="max-w-3xl mx-auto space-y-4">
          <span className="px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-purple-100 text-purple-700">
            Flowchat Blog
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">
            DM Automation Insights & Strategies
          </h1>
          <p className="text-gray-600 text-base">
            Expert guides, tutorials, and case studies to help you turn social comments into revenue.
          </p>
        </div>
      </section>

      <section className="py-12 px-6 max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8">
          {articles.map((art, idx) => (
            <article
              key={idx}
              className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-xs font-semibold text-gray-500">
                  <span className="px-3 py-1 rounded-full bg-emerald-50 text-[#03856b]">
                    {art.category}
                  </span>
                  <span>{art.date}</span>
                  <span>•</span>
                  <span>{art.readTime}</span>
                </div>
                <h2 className="text-xl font-bold text-gray-900 hover:text-[#03856b] transition-colors leading-snug">
                  {art.title}
                </h2>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {art.summary}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-gray-100 flex items-center justify-between">
                <span className="text-xs font-bold text-[#03856b]">
                  Read full article →
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}