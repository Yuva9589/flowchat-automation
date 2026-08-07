"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1000);
  };

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <section className="pt-36 pb-16 px-6 bg-gradient-to-b from-emerald-50/50 to-white text-center">
        <div className="max-w-3xl mx-auto space-y-4">
          <span className="px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-100 text-[#03856b]">
            Get In Touch
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">
            We&apos;re Here to Help
          </h1>
          <p className="text-gray-600 text-base">
            Have a question about Flowchat, Meta API setup, or billing? Drop us a message below or email us directly.
          </p>
        </div>
      </section>

      <section className="py-12 px-6 max-w-4xl mx-auto grid md:grid-cols-2 gap-12">
        {/* Contact Information */}
        <div className="space-y-6">
          <h2 className="text-2xl font-black text-gray-900">Contact Information</h2>

          <div className="p-6 rounded-2xl bg-gray-50 border border-gray-100 space-y-2">
            <h3 className="font-bold text-gray-900 text-sm">📧 Email Support</h3>
            <p className="text-xs text-gray-600">
              For general inquiries, setup help, or billing:
            </p>
            <a
              href="mailto:support@earnwithads.in"
              className="text-sm font-bold text-[#03856b] hover:underline block"
            >
              support@earnwithads.in
            </a>
          </div>

          <div className="p-6 rounded-2xl bg-gray-50 border border-gray-100 space-y-2">
            <h3 className="font-bold text-gray-900 text-sm">⏱️ Support Hours & SLA</h3>
            <p className="text-xs text-gray-600">
              Our team responds to all support tickets within <strong>24 hours</strong> (Monday to Saturday, 9 AM – 7 PM IST).
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-gray-50 border border-gray-100 space-y-2">
            <h3 className="font-bold text-gray-900 text-sm">🏢 Official Domain & Platform</h3>
            <p className="text-xs text-gray-600">
              Flowchat Platform | Official Domain: <strong>earnwithads.in</strong>
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
          {submitted ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-[#03856b] flex items-center justify-center text-3xl mx-auto">
                ✓
              </div>
              <h3 className="text-2xl font-black text-gray-900">Message Sent!</h3>
              <p className="text-xs text-gray-600">
                Thank you for reaching out. Our support team will get back to you at your email address within 24 hours.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="text-xs font-bold text-[#03856b] underline"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h3 className="text-xl font-bold text-gray-900">Send Us a Message</h3>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="Rahul Verma"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#03856b]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="rahul@example.com"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#03856b]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  required
                  placeholder="Instagram DM Setup Question"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#03856b]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="How can we help you today?"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#03856b]"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-full bg-[#03856b] text-white font-bold text-sm hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
              >
                {loading ? "Sending..." : "Submit Message →"}
              </button>
            </form>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}