import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import FeaturedProfiles from "@/components/FeaturedProfiles";
import SuccessStories from "@/components/SuccessStories";
import PaymentSection from "@/components/PaymentSection";
import ServicesSection from "@/components/ServicesSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const Index = () => {
  return (
    <div>
      <Header />
      <HeroSection />
      <AboutSection />
      <WhyChooseUs />
      <FeaturedProfiles />
      <SuccessStories />
      <PaymentSection />
      <ServicesSection />
      <ContactSection />
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Index;
