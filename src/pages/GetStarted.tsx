import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { UserPlus, Building, Users } from "lucide-react";
import Navigation from "@/components/Navigation";
import { Link } from "react-router-dom";

const userTypes = [
  {
    icon: UserPlus,
    title: "Creator",
    description: "Join as a content creator and start collaborating with brands",
    features: [
      "Get paid through secure escrow",
      "Access to verified brand campaigns",
      "Set your own rates",
      "Build your portfolio"
    ],
    ctaText: "Join as Creator",
    ctaLink: "/join-as-creator",
    gradient: "from-accent to-highlight"
  },
  {
    icon: Building,
    title: "Brand",
    description: "Find and collaborate with micro-creators for your campaigns",
    features: [
      "Access to verified creators",
      "Secure payment system",
      "Campaign management tools",
      "Performance tracking"
    ],
    ctaText: "Start as Brand",
    ctaLink: "/brand-dashboard",
    gradient: "from-primary to-accent"
  },
  {
    icon: Users,
    title: "Brand Manager",
    description: "Manage multiple brand campaigns and creator relationships",
    features: [
      "Multi-brand management",
      "Advanced analytics",
      "Team collaboration tools",
      "Priority support"
    ],
    ctaText: "Manager Access",
    ctaLink: "/manager-dashboard",
    gradient: "from-highlight to-primary"
  }
];

export default function GetStarted() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-20">
        <section className="py-12 bg-gradient-to-br from-background to-secondary">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Get <span className="gradient-text">Started</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Choose your path and join the future of creator-brand collaborations
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {userTypes.map((type, index) => (
                <Card key={index} className="card-soft hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <CardContent className="p-8 text-center">
                    <div className={`w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br ${type.gradient} flex items-center justify-center`}>
                      <type.icon className="w-8 h-8 text-white" />
                    </div>
                    
                    <h3 className="text-2xl font-bold mb-4">{type.title}</h3>
                    <p className="text-muted-foreground mb-6">{type.description}</p>
                    
                    <ul className="space-y-3 mb-8">
                      {type.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center text-sm">
                          <div className="w-2 h-2 bg-accent rounded-full mr-3"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                    
                    <Link to={type.ctaLink}>
                      <Button className="w-full" variant="coral" size="lg">
                        {type.ctaText}
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-16">
              <h2 className="text-2xl font-bold mb-4">Not sure which option is right for you?</h2>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Our team is here to help you choose the best path for your goals. 
                Get personalized recommendations based on your needs.
              </p>
              <Button variant="outline" size="lg">
                Schedule a Call
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}