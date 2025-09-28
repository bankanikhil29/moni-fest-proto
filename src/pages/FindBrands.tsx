import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building, DollarSign, Calendar, Users } from "lucide-react";
import Navigation from "@/components/Navigation";

const brands = [
  {
    id: 1,
    name: "EcoStyle",
    industry: "Sustainable Fashion",
    campaignTitle: "Summer Eco Collection",
    budget: "₹200,000 - ₹500,000",
    deadline: "2024-02-15",
    lookingFor: ["Fashion Creators", "Lifestyle Influencers"],
    requirements: "10K+ followers, sustainable content focus",
    deliverables: ["3 Instagram Reels", "2 Story Posts", "1 Feed Post"],
    logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop",
    description: "Looking for creators who are passionate about sustainable fashion to showcase our new eco-friendly summer collection."
  },
  {
    id: 2,
    name: "TechFlow",
    industry: "Technology",
    campaignTitle: "Smart Home Innovation",
    budget: "₹300,000 - ₹800,000",
    deadline: "2024-02-20",
    lookingFor: ["Tech Reviewers", "Lifestyle Creators"],
    requirements: "20K+ followers, tech-focused content",
    deliverables: ["5 Instagram Reels", "3 YouTube Shorts", "2 Feed Posts"],
    logo: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=100&h=100&fit=crop",
    description: "Seeking tech-savvy creators to demonstrate our innovative smart home products and their real-world applications."
  },
  {
    id: 3,
    name: "FreshBites",
    industry: "Food & Beverage",
    campaignTitle: "Healthy Snack Challenge",
    budget: "₹150,000 - ₹300,000",
    deadline: "2024-02-10",
    lookingFor: ["Food Bloggers", "Health & Wellness"],
    requirements: "15K+ followers, health-focused content",
    deliverables: ["4 Instagram Reels", "6 Story Posts", "1 IGTV"],
    logo: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=100&h=100&fit=crop",
    description: "Partner with health-conscious creators to promote our new line of organic, nutrient-packed snacks."
  },
  {
    id: 4,
    name: "GlowBeauty",
    industry: "Beauty & Cosmetics",
    campaignTitle: "Radiant Skin Campaign",
    budget: "₹250,000 - ₹600,000",
    deadline: "2024-02-25",
    lookingFor: ["Beauty Influencers", "Skincare Enthusiasts"],
    requirements: "25K+ followers, beauty-focused content",
    deliverables: ["4 Instagram Reels", "3 TikTok Videos", "2 Feed Posts"],
    logo: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=100&h=100&fit=crop",
    description: "Partner with beauty creators to showcase our new skincare line that promotes natural, radiant skin."
  },
  {
    id: 5,
    name: "FitLife Pro",
    industry: "Health & Fitness",
    campaignTitle: "30-Day Transformation",
    budget: "₹350,000 - ₹750,000",
    deadline: "2024-03-01",
    lookingFor: ["Fitness Trainers", "Health Coaches"],
    requirements: "30K+ followers, fitness-focused content",
    deliverables: ["6 Instagram Reels", "4 YouTube Videos", "3 Feed Posts"],
    logo: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=100&h=100&fit=crop",
    description: "Seeking fitness creators to document real transformations using our comprehensive workout and nutrition program."
  },
  {
    id: 6,
    name: "WanderLust Travel",
    industry: "Travel & Tourism",
    campaignTitle: "Hidden Gems Discovery",
    budget: "₹400,000 - ₹900,000",
    deadline: "2024-02-28",
    lookingFor: ["Travel Bloggers", "Adventure Creators"],
    requirements: "35K+ followers, travel content, passport ready",
    deliverables: ["8 Instagram Reels", "5 YouTube Videos", "4 Feed Posts"],
    logo: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=100&h=100&fit=crop",
    description: "Looking for travel creators to explore and showcase hidden destinations around the world with our travel packages."
  },
  {
    id: 7,
    name: "PetPal",
    industry: "Pet Care",
    campaignTitle: "Happy Pets, Happy Lives",
    budget: "₹180,000 - ₹400,000",
    deadline: "2024-02-18",
    lookingFor: ["Pet Influencers", "Animal Lovers"],
    requirements: "20K+ followers, pet content, own pets",
    deliverables: ["5 Instagram Reels", "3 TikTok Videos", "2 Feed Posts"],
    logo: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=100&h=100&fit=crop",
    description: "Partner with pet-loving creators to showcase our premium pet care products and demonstrate happy, healthy pets."
  },
  {
    id: 8,
    name: "HomeDecor Plus",
    industry: "Home & Lifestyle",
    campaignTitle: "Cozy Home Makeover",
    budget: "₹220,000 - ₹550,000",
    deadline: "2024-03-05",
    lookingFor: ["Home Decorators", "DIY Creators"],
    requirements: "18K+ followers, home decor content",
    deliverables: ["4 Instagram Reels", "2 YouTube Tutorials", "3 Feed Posts"],
    logo: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=100&h=100&fit=crop",
    description: "Collaborate with home decor enthusiasts to transform spaces using our furniture and decor collections."
  }
];

export default function FindBrands() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-20">
        <section className="py-12 bg-gradient-to-br from-background to-secondary">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Brand <span className="gradient-text">Opportunities</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Discover brands looking for creators like you. Browse campaigns and apply to collaborate.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {brands.map((brand) => (
                <Card key={brand.id} className="card-soft hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <img
                        src={brand.logo}
                        alt={brand.name}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div>
                        <h3 className="font-semibold text-lg">{brand.name}</h3>
                        <p className="text-muted-foreground text-sm">{brand.industry}</p>
                      </div>
                    </div>

                    <h4 className="font-semibold text-primary mb-2">{brand.campaignTitle}</h4>
                    <p className="text-sm text-muted-foreground mb-4">{brand.description}</p>

                    <div className="space-y-3 mb-4">
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-accent" />
                        <span className="text-sm">Budget: <span className="font-medium">{brand.budget}</span></span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-highlight" />
                        <span className="text-sm">Deadline: <span className="font-medium">{brand.deadline}</span></span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-primary" />
                        <span className="text-sm font-medium">Requirements:</span>
                      </div>
                      <p className="text-sm text-muted-foreground ml-6">{brand.requirements}</p>
                    </div>

                    <div className="mb-4">
                      <p className="text-sm font-medium mb-2">Looking for:</p>
                      <div className="flex flex-wrap gap-2">
                        {brand.lookingFor.map((type) => (
                          <Badge key={type} variant="secondary">
                            {type}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="bg-secondary rounded-lg p-3 mb-4">
                      <p className="text-sm font-medium mb-2">Deliverables:</p>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {brand.deliverables.map((deliverable, index) => (
                          <li key={index}>• {deliverable}</li>
                        ))}
                      </ul>
                    </div>

                    <Button className="w-full" variant="coral">
                      Apply for Campaign
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}