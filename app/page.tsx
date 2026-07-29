import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import InstagramCommentSection from "@/components/InstagramCommentSection";
import FollowGateSection from "@/components/FollowGateSection";
import InstantDeliverySection from "@/components/InstantDeliverySection";
import StoryReplySection from "@/components/StoryReplySection";
import FacebookSection from "@/components/FacebookSection";
import WhatsAppSection from "@/components/WhatsAppSection";
import SetupSection from "@/components/SetupSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import FeaturesGridSection from "@/components/FeaturesGridSection";
import AIRewriteSection from "@/components/AIRewriteSection";
import StatsSection from "@/components/StatsSection";
import ComparisonSection from "@/components/ComparisonSection";
import PricingSection from "@/components/PricingSection";
import FAQSection from "@/components/FAQSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import CTASection from "@/components/FooterCTASection";
import Footer from "@/components/Footer";

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
      <SetupSection />
      <HowItWorksSection />
      <FeaturesGridSection />
      <AIRewriteSection />
      <StatsSection />
      <ComparisonSection />
      <PricingSection />
      <FAQSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </main>
  );
}