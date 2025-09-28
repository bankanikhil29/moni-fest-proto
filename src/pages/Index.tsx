import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import AboutUs from "@/components/AboutUs";
import Problems from "@/components/Problems";
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
        <AboutUs />
        <Problems />
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
