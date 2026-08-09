import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

/* =========================================================================
   ✏️ EDIT YOUR PRIVACY POLICY TEXT HERE (NO CODING REQUIRED)
   Aapko niche sirf double quotes "..." ke andar apna simple text badalna hai.
   ========================================================================= */

const privacyData = {
  title: "Privacy Policy",
  lastUpdated: "August 2026",
  companyName: "Flowchat Inc. (earnwithads.in)",
  domain: "earnwithads.in",
  contactEmail: "support@earnwithads.in",
  dpoEmail: "privacy@earnwithads.in",

  sections: [
    {
      heading: "1. Overview & Meta Developer Policy Compliance",
      content:
        "Welcome to Flowchat ('earnwithads.in', 'we', 'our', or 'us'). Flowchat is an AI-powered social direct message (DM) automation engine that integrates with official Meta Graph APIs (Instagram & Facebook) and WhatsApp Business APIs. This Privacy Policy explains in detail how we collect, process, store, encrypt, and delete personal data when you or your social media subscribers interact with our platform.",
      subContent:
        "Flowchat complies fully with Meta Platform Terms, Meta Developer Policies (including Section 3.a Data Protection and Section 4.b User Data Usage), the General Data Protection Regulation (GDPR), the California Consumer Privacy Act (CCPA/CPRA), and applicable Indian IT Act regulations.",
    },
    {
      heading: "2. Information We Collect & Meta API Data Permissions",
      content:
        "In order to execute automated comment-to-DM flows, story replies, and keyword triggers across Instagram, Facebook, and WhatsApp, we collect and process the following categories of data:",
      bullets: [
        "A. Account & Profile Data: Your name, email address, profile avatar, and authentication credentials managed securely via Clerk Authentication.",
        "B. Meta Platform Access Tokens: OAuth access tokens, Page Access Tokens, and Instagram Business Account Identifiers issued by Meta. We NEVER request, access, or store your Instagram or Facebook account passwords.",
        "C. Comment & Interaction Data: Public comments, story replies, post URLs, reel captions, and keyword trigger words ('LINK', 'PRICE', 'INFO') dropped on your connected Meta accounts.",
        "D. Direct Message Content: Automation reply templates, custom links, coupon codes, and automated DM delivery timestamps.",
        "E. Subscriber & Lead Metrics: Anonymized counts of DMs sent, link click-through rates, and follow-gate verification statuses.",
        "F. Technical & Usage Logs: IP addresses, browser user-agent strings, device identifiers, and HTTP request logs processed for system security and fraud prevention.",
      ],
    },
    {
      heading: "3. How We Use Your Data & Purpose Limitation",
      content:
        "We process collected data strictly for limited and explicit operational purposes necessary to deliver our DM automation service:",
      bullets: [
        "To monitor public comments and story interactions on your connected Instagram & Facebook accounts via Meta Webhooks.",
        "To deliver automated Direct Messages containing your requested links, PDFs, or offer codes in under 4 seconds.",
        "To verify whether a commenter follows your account before delivering a link ('Follow-Gate' feature).",
        "To rewrite DM replies dynamically using AI variations, preventing message duplication and spam flags.",
        "To display real-time conversion analytics and subscription validity in your Flowchat dashboard.",
        "To process subscription payments via Razorpay & Stripe and maintain transaction history.",
      ],
    },
    {
      heading: "4. Data Storage, Encryption & Security Standards",
      content:
        "We implement enterprise-grade technical and organizational security measures to protect your data:",
      bullets: [
        "Encryption in Transit: All data transferred between your browser, Flowchat servers, and Meta Graph APIs is encrypted using TLS 1.3 / HTTPS encryption.",
        "Encryption at Rest: Sensitive Meta access tokens and user data are encrypted in our Supabase PostgreSQL database using AES-256-GCM encryption with Row Level Security (RLS) policies.",
        "Zero-Password Policy: We do NOT store or ask for your social media account passwords under any circumstances.",
        "Infrastructure Security: Hosted on Vercel and Supabase with 99.9% uptime SLA, DDoS mitigation, and 24/7 automated vulnerability scanning.",
      ],
    },
    {
      heading: "5. Authorized Subprocessors & Third-Party Sharing",
      content:
        "We do NOT sell, rent, trade, or monetize your personal data. Data is shared exclusively with our vetted subprocessors to operate the service:",
      bullets: [
        "Meta Platforms Inc. (Instagram, Facebook, Messenger, WhatsApp) — To send DMs and receive comment webhooks.",
        "Supabase Inc. — Encrypted PostgreSQL database hosting.",
        "Clerk Inc. — User authentication and session management.",
        "Vercel Inc. — Serverless cloud hosting and global edge network.",
        "Razorpay Software Pvt. Ltd. & Stripe Inc. — Payment gateway processing.",
      ],
    },
    {
      heading: "6. Data Retention & Automatic Purge Policy",
      content:
        "We retain personal data and Meta tokens only for as long as your account remains active. Upon account cancellation or explicit data deletion request:",
      bullets: [
        "All associated Meta access tokens, keywords, DM templates, and analytics are permanently purged from our active Supabase database within 48 hours.",
        "Inactive accounts with zero activity for 12 consecutive months are automatically flagged and purged in compliance with global data protection laws.",
      ],
    },
    {
      heading: "7. User Rights & Data Deletion Rights (GDPR / CCPA / Meta)",
      content:
        "You have full control over your data. You may exercise any of the following rights at any time:",
      bullets: [
        "Right to Access: Request a copy of all personal data held about your account.",
        "Right to Erasure / Data Deletion: Request complete erasure of your account and Meta tokens via earnwithads.in/data-deletion or by emailing support@earnwithads.in.",
        "Right to Revoke Permissions: Revoke Flowchat's permissions directly from your Facebook/Instagram Business settings under 'Apps and Websites'. Once revoked, our system automatically revokes and purges your connection tokens.",
      ],
    },
    {
      heading: "8. Contact Information & Data Protection Officer (DPO)",
      content:
        "If you have any questions, privacy concerns, or data deletion requests regarding this Privacy Policy, please contact our Data Protection Team:",
      contactDetails: [
        "Domain: earnwithads.in (Flowchat Platform)",
        "Support Email: support@earnwithads.in",
        "Privacy & DPO Email: privacy@earnwithads.in",
        "SLA Response Time: Within 24-48 business hours",
      ],
    },
  ],
};

/* =========================================================================
   ⚠️ DO NOT EDIT BELOW UNLESS YOU WANT TO CHANGE THE PAGE DESIGN
   ========================================================================= */

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <div className="pt-36 pb-20 px-6">
        <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 md:p-14 shadow-sm border border-gray-100 space-y-10">
          {/* Header */}
          <div className="border-b border-gray-100 pb-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl font-black text-gray-900">
                Flow<span style={{ color: "#03856b" }}>chat</span>
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight">
              {privacyData.title}
            </h1>
            <p className="text-xs text-gray-500 mt-2 font-medium">
              Official Compliance Document | Last Updated: {privacyData.lastUpdated} | Domain: {privacyData.domain}
            </p>
          </div>

          {/* Content Sections */}
          <div className="space-y-8 text-sm text-gray-700 leading-relaxed">
            {privacyData.sections.map((sec, idx) => (
              <section key={idx} className="space-y-3">
                <h2 className="text-xl font-bold text-gray-900 tracking-tight">
                  {sec.heading}
                </h2>
                <p className="text-gray-600 leading-relaxed">{sec.content}</p>

                {sec.subContent && (
                  <p className="text-xs text-gray-500 bg-gray-50 p-4 rounded-2xl border border-gray-100 italic">
                    {sec.subContent}
                  </p>
                )}

                {sec.bullets && (
                  <ul className="space-y-2 bg-gray-50/50 p-5 rounded-2xl border border-gray-100/80 text-xs text-gray-700">
                    {sec.bullets.map((b, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-[#03856b] font-bold mt-0.5">•</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {sec.contactDetails && (
                  <div className="p-5 rounded-2xl bg-emerald-50/50 border border-emerald-100 space-y-1 text-xs text-gray-800">
                    {sec.contactDetails.map((cd, i) => (
                      <p key={i} className="font-medium">{cd}</p>
                    ))}
                  </div>
                )}
              </section>
            ))}
          </div>

          {/* Footer Link */}
          <div className="pt-8 border-t border-gray-100 flex items-center justify-between">
            <a
              href="/"
              className="text-xs font-semibold text-[#03856b] hover:underline"
            >
              ← Back to Flowchat Home
            </a>
            <span className="text-xs text-gray-400">© 2026 Flowchat. All rights reserved.</span>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}