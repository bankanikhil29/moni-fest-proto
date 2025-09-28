import { FileText, UserCheck, CreditCard } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      icon: FileText,
      title: "Brands Post Briefs",
      description: "Create flexible campaigns with clear requirements and budget. Our templates preserve creative freedom while setting expectations.",
      number: "01"
    },
    {
      icon: UserCheck,
      title: "Creators Apply & Counter-Offer",
      description: "Browse verified opportunities, submit proposals, and negotiate terms that work for both parties.",
      number: "02"
    },
    {
      icon: CreditCard,
      title: "Escrow Secures Payment",
      description: "Funds are held in secure escrow until delivery milestones are met. No more chasing payments or broken promises.",
      number: "03"
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            How It Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Simple, transparent process that protects both creators and brands
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col md:flex-row items-center mb-16 last:mb-0">
              <div className="flex-shrink-0 mb-6 md:mb-0 md:mr-8">
                <div className="relative">
                  <div className="w-20 h-20 rounded-full hero-gradient flex items-center justify-center text-white font-bold text-xl">
                    {step.number}
                  </div>
                  <div className="absolute inset-0 w-20 h-20 rounded-full border-4 border-accent/20"></div>
                </div>
              </div>
              
              <div className="flex-1 text-center md:text-left">
                <div className="mb-4">
                  <step.icon className="h-8 w-8 text-accent mx-auto md:mx-0" />
                </div>
                <h3 className="text-2xl font-semibold mb-4">{step.title}</h3>
                <p className="text-muted-foreground text-lg">{step.description}</p>
              </div>
              
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute left-10 mt-32 w-0.5 h-16 bg-gradient-to-b from-accent to-highlight"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}