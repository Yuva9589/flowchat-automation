import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import InstagramCommentSection from "@/components/InstagramCommentSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <InstagramCommentSection />

      {/* Extra space taaki scroll test ho sake */}
      <div style={{ height: "50vh" }} />
    </main>
  );
}