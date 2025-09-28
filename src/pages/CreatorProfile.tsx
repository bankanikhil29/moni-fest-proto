import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Instagram, Youtube, MapPin, Calendar, DollarSign, CheckCircle, Users, Camera, TrendingUp, ArrowLeft } from "lucide-react";
import Navigation from "@/components/Navigation";
import { useParams } from "react-router-dom";

const creatorData = {
  1: {
    name: "Akarsh Sharma",
    handle: "@akarshcreates",
    followers: "45K",
    location: "Mumbai, Maharashtra",
    categories: ["Fashion", "Lifestyle"],
    ratePerReel: "₹12,000",
    ratePerPost: "₹8,000",
    rating: 4.9,
    completedProjects: 127,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
    portfolio: [
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=400&fit=crop"
    ],
    bio: "Fashion enthusiast and lifestyle creator passionate about sustainable fashion and authentic storytelling. I love collaborating with brands that share my values of quality and sustainability.",
    engagement: "8.2%",
    avgViews: "12.5K",
    responseTime: "2 hours",
    languages: ["English", "Hindi"],
    deliveryTime: "3-5 days",
    revisions: "2 free revisions",
    platforms: ["Instagram", "TikTok", "YouTube"]
  }
};

export default function CreatorProfile() {
  const { id } = useParams();
  const creator = creatorData[Number(id) as keyof typeof creatorData];

  if (!creator) {
    return <div>Creator not found</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-12 bg-gradient-to-br from-background to-secondary">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => window.history.back()}
                className="mb-6"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Find Creators
              </Button>

              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="flex-shrink-0">
                  <img
                    src={creator.avatar}
                    alt={creator.name}
                    className="w-32 h-32 rounded-full object-cover shadow-lg"
                  />
                </div>
                
                <div className="flex-1">
                  <h1 className="text-4xl font-bold mb-2">{creator.name}</h1>
                  <p className="text-xl text-accent mb-4">{creator.handle}</p>
                  
                  <div className="flex items-center gap-6 mb-6">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-muted-foreground" />
                      <span className="text-muted-foreground">{creator.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-5 h-5 text-accent" />
                      <span className="font-semibold">{creator.followers} followers</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Star className="w-5 h-5 text-highlight fill-current" />
                      <span className="font-semibold">{creator.rating}</span>
                    </div>
                  </div>

                  <p className="text-muted-foreground mb-6 leading-relaxed">{creator.bio}</p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {creator.categories.map((category) => (
                      <Badge key={category} variant="secondary" className="px-3 py-1">
                        {category}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-8 border-b">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <TrendingUp className="w-8 h-8 text-primary mx-auto mb-2" />
                  <div className="font-bold text-lg">{creator.engagement}</div>
                  <div className="text-sm text-muted-foreground">Engagement Rate</div>
                </div>
                <div className="text-center">
                  <Camera className="w-8 h-8 text-primary mx-auto mb-2" />
                  <div className="font-bold text-lg">{creator.avgViews}</div>
                  <div className="text-sm text-muted-foreground">Avg Views</div>
                </div>
                <div className="text-center">
                  <CheckCircle className="w-8 h-8 text-primary mx-auto mb-2" />
                  <div className="font-bold text-lg">{creator.completedProjects}</div>
                  <div className="text-sm text-muted-foreground">Projects Done</div>
                </div>
                <div className="text-center">
                  <Calendar className="w-8 h-8 text-primary mx-auto mb-2" />
                  <div className="font-bold text-lg">{creator.responseTime}</div>
                  <div className="text-sm text-muted-foreground">Response Time</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing & Portfolio */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12">
                {/* Pricing */}
                <div>
                  <h2 className="text-3xl font-bold mb-6">Pricing & Services</h2>
                  
                  <Card className="card-soft mb-6">
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-lg">Instagram Reel</span>
                          <span className="text-2xl font-bold text-primary">{creator.ratePerReel}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-lg">Instagram Post</span>
                          <span className="text-2xl font-bold text-primary">{creator.ratePerPost}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="card-soft">
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-lg mb-4">Additional Info</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Delivery Time:</span>
                          <span className="font-medium">{creator.deliveryTime}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Revisions:</span>
                          <span className="font-medium">{creator.revisions}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Languages:</span>
                          <span className="font-medium">{creator.languages.join(", ")}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Platforms:</span>
                          <span className="font-medium">{creator.platforms.join(", ")}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Portfolio */}
                <div>
                  <h2 className="text-3xl font-bold mb-6">Portfolio</h2>
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    {creator.portfolio.map((image, index) => (
                      <div key={index} className="aspect-square rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                        <img
                          src={image}
                          alt={`Portfolio ${index + 1}`}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    ))}
                  </div>

                  <div className="sticky top-24">
                    <Card className="card-soft border-primary/20">
                      <CardContent className="p-6">
                        <h3 className="text-xl font-semibold mb-4">Ready to collaborate?</h3>
                        <p className="text-muted-foreground mb-6">Let's discuss your project and create amazing content together!</p>
                        <Button 
                          className="w-full mb-3" 
                          variant="coral"
                          onClick={() => window.location.href = `/creator-booking/${id}`}
                        >
                          <DollarSign className="w-4 h-4 mr-2" />
                          Book Creator
                        </Button>
                        <Button variant="outline" className="w-full">
                          Send Message
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}