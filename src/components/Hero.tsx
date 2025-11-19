import { Button } from "@/components/ui/button";
import heroImage from "@/assets/creators-workspace.jpg";
import monifestLogo from "@/assets/monifest-logo.png";
import { CheckCircle } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative brand-gradient py-20 lg:py-32 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div className="text-center lg:text-left">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-white">
              Manifest Your <span className="text-white font-extrabold">Influencer</span> & <span className="text-white font-extrabold">Brand Deals</span> Into Reality
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-2xl text-center lg:text-left">
              Brands discover, creators deliver — payments guaranteed through secure escrow.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button size="lg" className="text-lg px-8 bg-white text-primary hover:bg-white/90" onClick={() => window.location.href = '/find-creators'}>
                Find Creators
              </Button>
              <Button size="lg" className="text-lg px-8 bg-white text-primary hover:bg-white/90" onClick={() => window.location.href = '/find-brands'}>
                Find Brands
              </Button>
              <Button variant="outline-white" size="lg" className="text-lg px-8" onClick={() => window.location.href = '/join-as-creator'}>
                Join as a Creator
              </Button>
            </div>
            <div className="mt-8 flex items-center gap-6 justify-center lg:justify-start text-sm text-white/90">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                <span>Escrow Protected</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                <span>Verified Creators</span>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="card-floating rounded-2xl overflow-hidden">
              <img 
                src={heroImage} 
                alt="Modern creators workspace with diverse creators"
                className="w-full h-auto"
              />
            </div>
            {/* Floating elements */}
            <div className="absolute top-4 left-4 bg-white rounded-lg p-3 card-soft">
              <div className="flex items-center gap-2 text-sm font-medium text-primary">
                <div className="w-3 h-3 bg-accent rounded-full"></div>
                Escrow Active
              </div>
            </div>
            <div className="absolute bottom-4 right-4 bg-white rounded-lg p-3 card-soft">
              <div className="text-sm font-medium text-primary">Payment in 3 days</div>
              <div className="text-xs text-muted-foreground">₹ 15,000.00 secured</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}