import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-creators.jpg";

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-background via-background to-secondary py-20 lg:py-32 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Where <span className="gradient-text">Micro Creators</span> Meet Brands —{" "}
              <span className="text-primary">and Get Paid on Time.</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl">
              A marketplace built for part-time and early-stage creators. Brands discover, 
              creators deliver — payments guaranteed through secure escrow.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button variant="coral" size="lg" className="text-lg px-8">
                Find Creators
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8">
                Join as a Creator
              </Button>
            </div>
            <div className="mt-8 flex items-center gap-6 justify-center lg:justify-start text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-accent rounded-full"></div>
                <span>Escrow Protected</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-highlight rounded-full"></div>
                <span>Verified Creators</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span>Guaranteed Payments</span>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="card-floating rounded-2xl overflow-hidden">
              <img 
                src={heroImage} 
                alt="Diverse micro-creators collaborating with brands"
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
              <div className="text-xs text-muted-foreground">$150 secured</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}