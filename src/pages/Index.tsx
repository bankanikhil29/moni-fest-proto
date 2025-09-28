import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Problems from "@/components/Problems";
import HowItWorks from "@/components/HowItWorks";
import Features from "@/components/Features";
import Testimonials from "@/components/Testimonials";
import TrustAndSafety from "@/components/TrustAndSafety";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <Hero />
        <Problems />
        <HowItWorks />
        <Features />
        <Testimonials />
        <TrustAndSafety />
        <CTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
