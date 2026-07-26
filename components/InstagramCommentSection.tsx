"use client";

import { useEffect, useState } from "react";
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal } from "lucide-react";

export default function InstagramCommentSection() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.2 }
    );
    const el = document.getElementById("ig-comment-section");
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="features"
      className="py-24 px-6 bg-gray-50 overflow-hidden"
    >
      <div
        id="ig-comment-section"
        className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center"
      >
        {/* Left — Text */}
        <div
          className={`transition-all duration-700 ${
            visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
          }`}
        >
          <span
            className="text-sm font-semibold tracking-wide uppercase"
            style={{ color: "#03856b" }}
          >
            Step One
          </span>
          <h2 className="text-4xl md:text-6xl font-black text-gray-900 mt-3 mb-6 leading-tight">
            It starts with a{" "}
            <span
              style={{
                backgroundImage:
                  "linear-gradient(135deg, #8b5cf6 0%, #ec4899 50%, #f97316 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              comment.
            </span>
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Someone drops your keyword on a post, reel, or story. That's the
            trigger. Flowchat instantly picks it up — 24/7, without you lifting
            a finger.
          </p>
        </div>

        {/* Right — Instagram Mockup */}
        <div
          className={`relative transition-all duration-700 delay-200 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden max-w-sm mx-auto border border-gray-100">
            {/* Post Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-full p-0.5"
                  style={{
                    backgroundImage:
                      "linear-gradient(135deg, #8b5cf6 0%, #ec4899 50%, #f97316 100%)",
                  }}
                >
                  <div className="w-full h-full bg-white rounded-full flex items-center justify-center text-xs font-bold">
                    YB
                  </div>
                </div>
                <div>
                  <p className="text-sm font-semibold">your.brand</p>
                  <p className="text-xs text-gray-500">Original audio</p>
                </div>
              </div>
              <MoreHorizontal size={20} className="text-gray-600" />
            </div>

            {/* Post Image */}
            <div
              className="aspect-square flex items-center justify-center"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, #c084fc, #f472b6, #fb923c)",
              }}
            >
              <span className="text-7xl">📣</span>
            </div>

            {/* Actions */}
            <div className="px-4 py-3">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-4">
                  <Heart size={24} className="text-gray-900" />
                  <MessageCircle size={24} className="text-gray-900" />
                  <Send size={24} className="text-gray-900" />
                </div>
                <Bookmark size={24} className="text-gray-900" />
              </div>
              <p className="text-sm font-semibold mb-1">2,847 likes</p>
              <p className="text-sm">
                <span className="font-semibold">your.brand</span> Comment{" "}
                <span className="font-bold" style={{ color: "#03856b" }}>
                  "LINK"
                </span>{" "}
                and I'll send you the guide 👇
              </p>
              <p className="text-xs text-gray-500 mt-2">View all 312 comments</p>

              {/* Live comment appearing */}
              <div className="mt-3 pt-3 border-t border-gray-100 flex items-center gap-2 animate-pulse">
                <div
                  className="w-6 h-6 rounded-full"
                  style={{
                    backgroundImage: "linear-gradient(135deg, #f472b6, #a855f7)",
                  }}
                />
                <p className="text-sm">
                  <span className="font-semibold">maya.creates</span> LINK 🙌
                </p>
                <span className="text-xs text-gray-400 ml-auto">2h</span>
              </div>
            </div>
          </div>

          {/* Floating badge */}
          <div
            className="absolute -top-4 -right-4 text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg animate-bounce"
            style={{ backgroundColor: "#03856b" }}
          >
            🎯 Keyword detected!
          </div>
        </div>
      </div>
    </section>
  );
}