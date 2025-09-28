import { Search, FileEdit, Shield, Star, BarChart3 } from "lucide-react";

export default function Features() {
  const features = [
    {
      icon: Search,
      title: "Smart Discovery",
      description: "Find creators by niche, audience demographics, engagement rates, and location. Our verification system ensures authentic metrics."
    },
    {
      icon: FileEdit,
      title: "Flexible Briefs",
      description: "Standardized templates that preserve creative control. Easy revision flows and clear milestone tracking."
    },
    {
      icon: Shield,
      title: "Escrow Payments",
      description: "Funds held securely until delivery. Automated releases based on milestones. Simple dispute resolution."
    },
    {
      icon: Star,
      title: "Ratings & Reviews",
      description: "Two-way feedback system builds trust. Verified reviews from completed collaborations help future matching."
    },
    {
      icon: BarChart3,
      title: "Analytics Dashboard",
      description: "Track campaign performance, payment history, and collaboration metrics. Data-driven insights for better results."
    }
  ];

  return (
    <section id="features" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Powerful Features for Both Sides
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to discover, collaborate, and get paid reliably
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-card rounded-xl p-6 card-soft hover:card-floating transition-all duration-300">
              <div className="mb-4">
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                  <feature.icon className="h-6 w-6 text-accent" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}