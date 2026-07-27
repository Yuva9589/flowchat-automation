"use client";

import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <main
      className="min-h-screen flex items-center justify-center px-4 py-16 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #ffffff 0%, #f0fdf9 50%, #ecfeff 100%)",
      }}
    >
      {/* Background gradient blobs */}
      <div
        className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full blur-3xl opacity-20 -z-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, #03856b, transparent 70%)",
        }}
      />
      <div
        className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full blur-3xl opacity-20 -z-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, #0ea5e9, transparent 70%)",
        }}
      />

      <div className="w-full max-w-md relative z-10">
        {/* Flowchat Logo */}
        <div className="text-center mb-6">
          <a href="/" className="inline-flex flex-col leading-none">
            <span className="text-3xl font-black tracking-tight text-gray-900">
              Flow<span style={{ color: "#03856b" }}>chat</span>
            </span>
            <span className="text-[10px] text-gray-500 font-medium tracking-wide mt-1">
              Your AI DM Automation
            </span>
          </a>
          <p className="text-sm text-gray-500 mt-4">
            Welcome back! Log in to your automations
          </p>
        </div>

        {/* Clerk Sign In form */}
        <SignIn
          appearance={{
            elements: {
              rootBox: "w-full",
              card: "shadow-2xl border border-gray-100 rounded-2xl",
              headerTitle: "text-2xl font-black text-gray-900",
              headerSubtitle: "text-gray-500 text-sm",
              formButtonPrimary:
                "bg-[#03856b] hover:bg-[#04a085] normal-case font-semibold",
              footerActionLink: "text-[#03856b] hover:text-[#04a085] font-semibold",
              socialButtonsBlockButton:
                "border-gray-200 hover:bg-gray-50 normal-case",
            },
          }}
        />

        {/* Trust line */}
        <p className="text-center text-xs text-gray-500 mt-6">
          🔒 Secure login · Powered by Clerk
        </p>
      </div>
    </main>
  );
}