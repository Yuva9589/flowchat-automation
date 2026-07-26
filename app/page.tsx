import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import InstagramCommentSection from "@/components/InstagramCommentSection";
import FollowGateSection from "@/components/FollowGateSection";
import InstantDeliverySection from "@/components/InstantDeliverySection";
import StoryReplySection from "@/components/StoryReplySection";
import FacebookSection from "@/components/FacebookSection";
import WhatsAppSection from "@/components/WhatsAppSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <InstagramCommentSection />
      <FollowGateSection />
      <InstantDeliverySection />
      <StoryReplySection />
      <FacebookSection />
      <WhatsAppSection />

      {/* Extra scroll space */}
      <div style={{ height: "50vh" }} />
    </main>
  );
}