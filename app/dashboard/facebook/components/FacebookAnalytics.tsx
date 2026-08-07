"use client";

interface Props {
  isConnected: boolean;
}

export default function FacebookAnalytics({ isConnected }: Props) {
  return (
    <section id="analytics" className="scroll-mt-6">
      <div className="flex items-start justify-between gap-4 mb-3 flex-wrap">
        <div>
          <h2 className="text-xl font-black text-gray-900">3. Analytics</h2>
          <p className="text-sm text-gray-500">
            Real-time performance of your Facebook automations.
          </p>
        </div>
      </div>

      {!isConnected ? (
        <div className="bg-white rounded-2xl p-8 border border-dashed border-gray-200 text-center">
          <p className="text-sm text-gray-500">
            Connect Facebook to see real analytics 📊
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl p-8 border border-gray-100 text-center">
          <p className="text-sm font-semibold text-gray-800 mb-1">
            No analytics data yet
          </p>
          <p className="text-xs text-gray-500">
            Analytics will appear here once your Facebook automations start receiving comments and sending DMs.
          </p>
        </div>
      )}
    </section>
  );
}