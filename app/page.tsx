import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <Hero />

      {/* Extra space taaki scroll test ho sake */}
      <div style={{ height: "100vh" }} />
    </main>
  );
}