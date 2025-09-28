import { ShieldCheck, UserCheck2, Scale } from "lucide-react";

export default function TrustAndSafety() {
  const trustFeatures = [
    {
      icon: ShieldCheck,
      title: "Escrow-Backed Payments",
      description: "All payments held in secure escrow until delivery milestones are met. Your money is protected."
    },
    {
      icon: UserCheck2,
      title: "Verified Profiles",
      description: "KYC verification for all users. Social media authentication and engagement analysis to prevent fraud."
    },
    {
      icon: Scale,
      title: "Simple Dispute Resolution",
      description: "Fair, transparent process for handling disagreements. Most disputes resolved within 48 hours."
    }
  ];

  return (
    <section className="py-20 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Trust & Safety First
          </h2>
          <p className="text-lg opacity-90 max-w-2xl mx-auto">
            Built-in protections ensure fair, secure collaborations for everyone
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {trustFeatures.map((feature, index) => (
            <div key={index} className="text-center">
              <div className="mb-6">
                <div className="w-16 h-16 mx-auto rounded-full bg-white/10 flex items-center justify-center">
                  <feature.icon className="h-8 w-8 text-highlight" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
              <p className="opacity-90">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-8 text-sm opacity-75">
            <div>256-bit SSL Encryption</div>
            <div>•</div>
            <div>SOC 2 Compliant</div>
            <div>•</div>
            <div>GDPR Ready</div>
          </div>
        </div>
      </div>
    </section>
  );
}