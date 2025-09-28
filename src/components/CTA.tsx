import { Button } from "@/components/ui/button";

export default function CTA() {
  return (
    <section className="py-20 hero-gradient text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Start Collaborating Today
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of creators and brands building successful partnerships 
            with guaranteed payments and verified quality.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="outline-white" size="lg" className="text-lg px-8" onClick={() => window.location.href = '/get-started'}>
              Get Started Today
            </Button>
            <Button variant="outline-white" size="lg" className="text-lg px-8" onClick={() => window.location.href = '/join-as-creator'}>
              Join as Creator
            </Button>
          </div>

          <div className="mt-12 grid grid-cols-3 gap-8 max-w-lg mx-auto">
            <div className="text-center">
              <div className="text-2xl font-bold">1,000+</div>
              <div className="text-sm opacity-75">Active Creators</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">$150</div>
              <div className="text-sm opacity-75">Avg. Gig Value</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">3 Days</div>
              <div className="text-sm opacity-75">Avg. Payment Time</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-20 h-20 rounded-full bg-white/10"></div>
      <div className="absolute bottom-10 right-10 w-32 h-32 rounded-full bg-white/5"></div>
      <div className="absolute top-1/2 left-1/4 w-4 h-4 rounded-full bg-white/20"></div>
    </section>
  );
}