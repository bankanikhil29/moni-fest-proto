import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building, DollarSign, Calendar, Users, Shield, CheckCircle } from "lucide-react";
import Navigation from "@/components/Navigation";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const brands = [
  {
    id: 1,
    name: "EcoStyle",
    industry: "Fashion",
    campaignTitle: "Summer Eco Collection",
    budget: "₹200,000 - ₹500,000",
    budgetMin: 200000,
    deadline: "2024-02-15",
    lookingFor: ["Fashion Creators", "Lifestyle Influencers"],
    requirements: "10K+ followers, sustainable content focus",
    deliverables: ["3 Instagram Reels", "2 Story Posts", "1 Feed Post"],
    isVerified: true,
    logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop",
    description: "Looking for creators who are passionate about sustainable fashion to showcase our new eco-friendly summer collection."
  },
  {
    id: 2,
    name: "TechFlow",
    industry: "Tech",
    campaignTitle: "Smart Home Innovation",
    budget: "₹300,000 - ₹800,000",
    budgetMin: 300000,
    deadline: "2024-02-20",
    lookingFor: ["Tech Reviewers", "Lifestyle Creators"],
    requirements: "20K+ followers, tech-focused content",
    deliverables: ["5 Instagram Reels", "3 YouTube Shorts", "2 Feed Posts"],
    isVerified: true,
    logo: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=100&h=100&fit=crop",
    description: "Seeking tech-savvy creators to demonstrate our innovative smart home products and their real-world applications."
  },
  {
    id: 3,
    name: "FreshBites",
    industry: "Food",
    campaignTitle: "Healthy Snack Challenge",
    budget: "₹150,000 - ₹300,000",
    budgetMin: 150000,
    deadline: "2024-02-10",
    lookingFor: ["Food Bloggers", "Health & Wellness"],
    requirements: "15K+ followers, health-focused content",
    deliverables: ["4 Instagram Reels", "6 Story Posts", "1 IGTV"],
    isVerified: false,
    logo: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=100&h=100&fit=crop",
    description: "Partner with health-conscious creators to promote our new line of organic, nutrient-packed snacks."
  },
  {
    id: 4,
    name: "GlowBeauty",
    industry: "Beauty",
    campaignTitle: "Radiant Skin Campaign",
    budget: "₹250,000 - ₹600,000",
    budgetMin: 250000,
    deadline: "2024-02-25",
    lookingFor: ["Beauty Influencers", "Skincare Enthusiasts"],
    requirements: "25K+ followers, beauty-focused content",
    deliverables: ["4 Instagram Reels", "3 TikTok Videos", "2 Feed Posts"],
    isVerified: true,
    logo: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=100&h=100&fit=crop",
    description: "Partner with beauty creators to showcase our new skincare line that promotes natural, radiant skin."
  },
  {
    id: 5,
    name: "FitLife Pro",
    industry: "Fitness",
    campaignTitle: "30-Day Transformation",
    budget: "₹350,000 - ₹750,000",
    budgetMin: 350000,
    deadline: "2024-03-01",
    lookingFor: ["Fitness Trainers", "Health Coaches"],
    requirements: "30K+ followers, fitness-focused content",
    deliverables: ["6 Instagram Reels", "4 YouTube Videos", "3 Feed Posts"],
    isVerified: true,
    logo: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=100&h=100&fit=crop",
    description: "Seeking fitness creators to document real transformations using our comprehensive workout and nutrition program."
  },
  {
    id: 6,
    name: "WanderLust Travel",
    industry: "Travel",
    campaignTitle: "Hidden Gems Discovery",
    budget: "₹400,000 - ₹900,000",
    budgetMin: 400000,
    deadline: "2024-02-28",
    lookingFor: ["Travel Bloggers", "Adventure Creators"],
    requirements: "35K+ followers, travel content, passport ready",
    deliverables: ["8 Instagram Reels", "5 YouTube Videos", "4 Feed Posts"],
    isVerified: true,
    logo: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=100&h=100&fit=crop",
    description: "Looking for travel creators to explore and showcase hidden destinations around the world with our travel packages."
  },
  {
    id: 7,
    name: "PetPal",
    industry: "Pet Care",
    campaignTitle: "Happy Pets Campaign",
    budget: "₹180,000 - ₹400,000",
    budgetMin: 180000,
    deadline: "2024-02-18",
    lookingFor: ["Pet Influencers", "Animal Lovers"],
    requirements: "20K+ followers, pet content, own pets",
    deliverables: ["5 Instagram Reels", "3 TikTok Videos", "2 Feed Posts"],
    isVerified: true,
    logo: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=100&h=100&fit=crop",
    description: "Partner with pet-loving creators to showcase our premium pet care products and demonstrate happy, healthy pets."
  },
  {
    id: 8,
    name: "HomeDecor Plus",
    industry: "Lifestyle",
    campaignTitle: "Cozy Home Makeover",
    budget: "₹220,000 - ₹550,000",
    budgetMin: 220000,
    deadline: "2024-03-05",
    lookingFor: ["Home Decorators", "DIY Creators"],
    requirements: "18K+ followers, home decor content",
    deliverables: ["4 Instagram Reels", "2 YouTube Tutorials", "3 Feed Posts"],
    isVerified: true,
    logo: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=100&h=100&fit=crop",
    description: "Collaborate with home decor enthusiasts to transform spaces using our furniture and decor collections."
  },
  {
    id: 9,
    name: "AquaPure",
    industry: "Health",
    campaignTitle: "Hydration Revolution",
    budget: "₹280,000 - ₹650,000",
    budgetMin: 280000,
    deadline: "2024-02-22",
    lookingFor: ["Health Coaches", "Fitness Influencers"],
    requirements: "25K+ followers, wellness content",
    deliverables: ["5 Instagram Reels", "4 Story Series", "3 Feed Posts"],
    isVerified: true,
    logo: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=100&h=100&fit=crop",
    description: "Promote smart water bottles and hydration tracking technology with health-focused creators."
  },
  {
    id: 10,
    name: "StyleHub",
    industry: "Fashion",
    campaignTitle: "Urban Streetwear Launch",
    budget: "₹320,000 - ₹700,000",
    budgetMin: 320000,
    deadline: "2024-03-10",
    lookingFor: ["Fashion Influencers", "Streetwear Enthusiasts"],
    requirements: "30K+ followers, fashion content",
    deliverables: ["6 Instagram Reels", "4 TikTok Videos", "3 Feed Posts"],
    isVerified: true,
    logo: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=100&h=100&fit=crop",
    description: "Launch our new streetwear collection with urban fashion creators who understand contemporary style trends."
  },
  {
    id: 11,
    name: "NutriVita",
    industry: "Food",
    campaignTitle: "Plant-Based Revolution",
    budget: "₹190,000 - ₹450,000",
    budgetMin: 190000,
    deadline: "2024-02-28",
    lookingFor: ["Food Creators", "Vegan Influencers"],
    requirements: "15K+ followers, plant-based content",
    deliverables: ["5 Instagram Reels", "3 Recipe Videos", "2 Feed Posts"],
    isVerified: false,
    logo: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=100&h=100&fit=crop",
    description: "Showcase our plant-based meal prep kits with creators passionate about sustainable nutrition."
  },
  {
    id: 12,
    name: "GamerZone",
    industry: "Tech",
    campaignTitle: "Next-Gen Gaming Setup",
    budget: "₹450,000 - ₹1,000,000",
    budgetMin: 450000,
    deadline: "2024-03-15",
    lookingFor: ["Gaming Creators", "Tech Reviewers"],
    requirements: "40K+ followers, gaming content",
    deliverables: ["8 Instagram Reels", "6 YouTube Videos", "4 Twitch Streams"],
    isVerified: true,
    logo: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=100&h=100&fit=crop",
    description: "Partner with gaming creators to showcase our premium gaming accessories and setup solutions."
  },
  {
    id: 13,
    name: "EcoTravel",
    industry: "Travel",
    campaignTitle: "Sustainable Tourism Campaign",
    budget: "₹380,000 - ₹850,000",
    budgetMin: 380000,
    deadline: "2024-03-20",
    lookingFor: ["Travel Creators", "Eco Activists"],
    requirements: "35K+ followers, sustainable travel focus",
    deliverables: ["7 Instagram Reels", "5 YouTube Vlogs", "4 Blog Posts"],
    isVerified: true,
    logo: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=100&h=100&fit=crop",
    description: "Promote eco-friendly travel experiences and sustainable tourism practices with conscious creators."
  },
  {
    id: 14,
    name: "MindfulLiving",
    industry: "Lifestyle",
    campaignTitle: "Wellness & Mindfulness",
    budget: "₹210,000 - ₹480,000",
    budgetMin: 210000,
    deadline: "2024-02-25",
    lookingFor: ["Wellness Coaches", "Lifestyle Creators"],
    requirements: "20K+ followers, wellness content",
    deliverables: ["5 Instagram Reels", "4 IGTV Sessions", "3 Feed Posts"],
    isVerified: true,
    logo: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=100&h=100&fit=crop",
    description: "Collaborate with mindfulness experts to promote our meditation app and wellness products."
  },
  {
    id: 15,
    name: "LuxeCosmetics",
    industry: "Beauty",
    campaignTitle: "Premium Makeup Line Launch",
    budget: "₹500,000 - ₹1,200,000",
    budgetMin: 500000,
    deadline: "2024-03-25",
    lookingFor: ["Beauty Gurus", "Makeup Artists"],
    requirements: "50K+ followers, professional makeup content",
    deliverables: ["8 Instagram Reels", "6 YouTube Tutorials", "5 Feed Posts"],
    isVerified: true,
    logo: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=100&h=100&fit=crop",
    description: "Launch our luxury cosmetics line with top-tier beauty creators who can showcase professional-grade products."
  }
];

export default function FindBrands() {
  const [industryFilter, setIndustryFilter] = useState<string>("all");
  const [budgetFilter, setBudgetFilter] = useState<string>("all");

  const filteredBrands = brands.filter(brand => {
    const matchesIndustry = 
      industryFilter === "all" ||
      brand.industry.toLowerCase() === industryFilter.toLowerCase();
    
    const matchesBudget = 
      budgetFilter === "all" ||
      (budgetFilter === "under200k" && brand.budgetMin < 200000) ||
      (budgetFilter === "200k-400k" && brand.budgetMin >= 200000 && brand.budgetMin < 400000) ||
      (budgetFilter === "400k-700k" && brand.budgetMin >= 400000 && brand.budgetMin < 700000) ||
      (budgetFilter === "700k+" && brand.budgetMin >= 700000);

    return matchesIndustry && matchesBudget;
  });

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

            <div className="flex flex-wrap gap-4 mb-8 justify-center">
              <div className="w-full sm:w-auto">
                <Select value={industryFilter} onValueChange={setIndustryFilter}>
                  <SelectTrigger className="w-full sm:w-[200px]">
                    <SelectValue placeholder="Industry" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Industries</SelectItem>
                    <SelectItem value="fashion">Fashion</SelectItem>
                    <SelectItem value="beauty">Beauty</SelectItem>
                    <SelectItem value="fitness">Fitness</SelectItem>
                    <SelectItem value="food">Food</SelectItem>
                    <SelectItem value="travel">Travel</SelectItem>
                    <SelectItem value="tech">Tech</SelectItem>
                    <SelectItem value="lifestyle">Lifestyle</SelectItem>
                    <SelectItem value="health">Health</SelectItem>
                    <SelectItem value="pet care">Pet Care</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="w-full sm:w-auto">
                <Select value={budgetFilter} onValueChange={setBudgetFilter}>
                  <SelectTrigger className="w-full sm:w-[200px]">
                    <SelectValue placeholder="Budget Range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Budgets</SelectItem>
                    <SelectItem value="under200k">&lt;₹2L</SelectItem>
                    <SelectItem value="200k-400k">₹2L-₹4L</SelectItem>
                    <SelectItem value="400k-700k">₹4L-₹7L</SelectItem>
                    <SelectItem value="700k+">₹7L+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBrands.map((brand) => (
                <Card key={brand.id} className="card-soft hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <img
                        src={brand.logo}
                        alt={brand.name}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-lg">{brand.name}</h3>
                          {brand.isVerified && (
                            <div className="flex items-center gap-1 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded-full">
                              <Shield className="w-3 h-3 text-green-600" />
                              <CheckCircle className="w-3 h-3 text-green-600" />
                            </div>
                          )}
                        </div>
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
                      <p className="text-xs text-muted-foreground ml-6">{brand.requirements}</p>
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

                    <div className="mb-4">
                      <p className="text-sm font-medium mb-2">Deliverables:</p>
                      <ul className="text-xs text-muted-foreground space-y-1 ml-4">
                        {brand.deliverables.map((deliverable) => (
                          <li key={deliverable} className="list-disc">{deliverable}</li>
                        ))}
                      </ul>
                    </div>

                    <Button className="w-full">
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
