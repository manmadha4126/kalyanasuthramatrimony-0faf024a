import { useEffect } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SaptapadiSection from "@/components/SaptapadiSection";
import BringingTogetherSection from "@/components/BringingTogetherSection";
import FeaturedProfiles from "@/components/FeaturedProfiles";
import SuccessStories from "@/components/SuccessStories";
import OurFeaturesSection from "@/components/OurFeaturesSection";
import PaymentSection from "@/components/PaymentSection";
import FindMatchCTA from "@/components/FindMatchCTA";
import ServicesSection from "@/components/ServicesSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import AIChatBot from "@/components/AIChatBot";

const Index = () => {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href^="#"]');
      if (anchor) {
        e.preventDefault();
        const id = anchor.getAttribute("href")?.slice(1);
        if (id) {
          const el = document.getElementById(id);
          el?.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return (
    <div className="scroll-smooth">
      <Header />
      <div style={{ height: "80px", background: "hsl(0, 0%, 0%)" }} />
      <HeroSection />
      <AboutSection />
      <SaptapadiSection />
      <BringingTogetherSection />
      <FeaturedProfiles />
      <SuccessStories />
      <OurFeaturesSection />
      <PaymentSection />
      <FindMatchCTA />
      <ServicesSection />
      <ContactSection />
      <Footer />
      <WhatsAppButton />
      <AIChatBot />
    </div>
  );
};

export default Index;
