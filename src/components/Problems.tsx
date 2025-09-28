import { Clock, AlertTriangle, FileX } from "lucide-react";

export default function Problems() {
  const problems = [
    {
      icon: Clock,
      title: "Delayed Payments",
      description: "Creators wait weeks or months for payment, with some never receiving what they're owed.",
      audience: "Creators"
    },
    {
      icon: AlertTriangle,
      title: "Fake Metrics",
      description: "Brands struggle with boosted engagement and inflated follower counts, leading to mistrust.",
      audience: "Brands"
    },
    {
      icon: FileX,
      title: "Rigid Briefs",
      description: "Inflexible campaign requirements that consume extra time and stifle creativity.",
      audience: "Both"
    }
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            The Problems We Solve
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Current influencer marketing is broken for both creators and brands. 
            Here's what we're fixing.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {problems.map((problem, index) => (
            <div key={index} className="text-center">
              <div className="mb-6">
                <div className="w-16 h-16 mx-auto rounded-full bg-accent/10 flex items-center justify-center">
                  <problem.icon className="h-8 w-8 text-accent" />
                </div>
              </div>
              <div className="mb-2">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary mb-3">
                  {problem.audience}
                </span>
              </div>
              <h3 className="text-xl font-semibold mb-4">{problem.title}</h3>
              <p className="text-muted-foreground">{problem.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}