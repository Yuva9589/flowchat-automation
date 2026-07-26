import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Test content — abhi placeholder */}
      <div className="pt-32 px-6 max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900">
          🎉 Navbar test — upar dekh!
        </h1>
        <p className="text-gray-600 mt-4">
          Neeche scroll karo aur navbar dekho — wo blur + white ho jayega.
        </p>
        <div style={{ height: "200vh" }} />
      </div>
    </main>
  );
}