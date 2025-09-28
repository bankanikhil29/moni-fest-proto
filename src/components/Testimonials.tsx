export default function Testimonials() {
  const testimonials = [
    {
      quote: "Finally, a place where I don't worry about payments. The escrow system gives me peace of mind to focus on creating great content.",
      author: "Sarah Chen",
      role: "Fashion Creator",
      avatar: "SC",
      type: "creator"
    },
    {
      quote: "We cut our influencer search time by 70%. The verification system means no more fake metrics, and the standardized briefs save hours.",
      author: "Marcus Rodriguez",
      role: "Brand Manager at StyleCo",
      avatar: "MR",
      type: "brand"
    },
    {
      quote: "The milestone-based payments are game-changing. I get paid as I deliver, not months later. My income is finally predictable.",
      author: "Alex Kim",
      role: "Tech Reviewer",
      avatar: "AK",
      type: "creator"
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Trusted by Creators and Brands
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            See what our community says about their experience
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-card rounded-xl p-6 card-soft">
              <div className="mb-6">
                <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                  testimonial.type === 'creator' 
                    ? 'bg-accent/10 text-accent' 
                    : 'bg-primary/10 text-primary'
                }`}>
                  {testimonial.type === 'creator' ? 'Creator' : 'Brand'}
                </div>
              </div>
              
              <blockquote className="text-muted-foreground mb-6 italic">
                "{testimonial.quote}"
              </blockquote>
              
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent to-highlight flex items-center justify-center text-white font-semibold text-sm mr-3">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-semibold text-sm">{testimonial.author}</div>
                  <div className="text-xs text-muted-foreground">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}