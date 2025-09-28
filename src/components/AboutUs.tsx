import { Card, CardContent } from "@/components/ui/card";
import { Shield, Clock, Zap } from "lucide-react";
import brandCollabImage from "@/assets/brand-collaboration.jpg";

export default function AboutUs() {
  const values = [
    {
      icon: Shield,
      title: "Trust & Security",
      description: "Every payment is secured through escrow, ensuring creators get paid and brands get results."
    },
    {
      icon: Clock,
      title: "No More Waiting",
      description: "Say goodbye to 60-90 day payment cycles. Our streamlined process ensures faster, reliable payments."
    },
    {
      icon: Zap,
      title: "Quality Connections",
      description: "We verify every creator and brand to maintain the highest quality marketplace for collaborations."
    }
  ];

  return (
    <section id="about" className="py-20 bg-gradient-to-br from-background to-secondary">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              About <span className="gradient-text">MoniFest</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              We're revolutionizing the creator economy by solving the biggest pain point: payment delays. 
              MoniFest connects micro-creators with brands through a secure, escrow-protected platform that 
              guarantees timely payments and quality collaborations.
            </p>
            
            <div className="space-y-6">
              {values.map((value, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-accent to-highlight flex items-center justify-center flex-shrink-0">
                    <value.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">{value.title}</h3>
                    <p className="text-muted-foreground">{value.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative">
            <Card className="card-floating overflow-hidden">
              <CardContent className="p-0">
                <img 
                  src={brandCollabImage} 
                  alt="Modern brand collaboration workspace"
                  className="w-full h-auto"
                />
              </CardContent>
            </Card>
            
            {/* Stats overlay */}
            <div className="absolute -bottom-6 -left-6 bg-white rounded-lg p-4 card-soft">
              <div className="text-2xl font-bold text-primary">500+</div>
              <div className="text-sm text-muted-foreground">Active Creators</div>
            </div>
            <div className="absolute -top-6 -right-6 bg-white rounded-lg p-4 card-soft">
              <div className="text-2xl font-bold text-accent">100%</div>
              <div className="text-sm text-muted-foreground">Payment Rate</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}