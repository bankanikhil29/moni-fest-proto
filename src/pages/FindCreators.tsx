import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Instagram, Youtube, MapPin, Shield, CheckCircle } from "lucide-react";
import Navigation from "@/components/Navigation";
import priyaImage from "@/assets/creator-priya.jpg";
import arjunImage from "@/assets/creator-arjun.jpg";
import kavyaImage from "@/assets/creator-kavya.jpg";
import rohitImage from "@/assets/creator-rohit.jpg";
import meeraImage from "@/assets/creator-meera.jpg";
import devImage from "@/assets/creator-dev.jpg";

const creators = [
  {
    id: 1,
    name: "Priya Sharma",
    handle: "@priyafashion",
    followers: "45K",
    location: "Mumbai, Maharashtra",
    categories: ["Fashion", "Lifestyle"],
    ratePerReel: "₹12,000",
    ratePerPost: "₹8,000",
    rating: 4.9,
    completedProjects: 127,
    isVerified: true,
    avatar: priyaImage,
    portfolio: ["https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=200&h=200&fit=crop"]
  },
  {
    id: 2,
    name: "Arjun Patel",
    handle: "@arjuntech",
    followers: "32K",
    location: "Bangalore, Karnataka", 
    categories: ["Tech", "Gaming"],
    ratePerReel: "₹15,000",
    ratePerPost: "₹9,500",
    rating: 4.8,
    completedProjects: 89,
    isVerified: true,
    avatar: arjunImage,
    portfolio: ["https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&h=200&fit=crop"]
  },
  {
    id: 3,
    name: "Kavya Singh",
    handle: "@kavyabeauty",
    followers: "38K",
    location: "Delhi, NCR",
    categories: ["Beauty", "Skincare"],
    ratePerReel: "₹12,800",
    ratePerPost: "₹7,600",
    rating: 4.9,
    completedProjects: 178,
    isVerified: true,
    avatar: kavyaImage,
    portfolio: ["https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=200&h=200&fit=crop"]
  },
  {
    id: 4,
    name: "Rohit Kumar",
    handle: "@rohitfitness",
    followers: "52K",
    location: "Pune, Maharashtra",
    categories: ["Fitness", "Health"],
    ratePerReel: "₹14,500",
    ratePerPost: "₹8,800",
    rating: 4.8,
    completedProjects: 203,
    isVerified: true,
    avatar: rohitImage,
    portfolio: ["https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=200&fit=crop"]
  },
  {
    id: 5,
    name: "Meera Iyer",
    handle: "@meeracooks",
    followers: "35K",
    location: "Chennai, Tamil Nadu",
    categories: ["Food", "Cooking"],
    ratePerReel: "₹11,200",
    ratePerPost: "₹6,800",
    rating: 4.8,
    completedProjects: 189,
    isVerified: true,
    avatar: meeraImage,
    portfolio: ["https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=200&h=200&fit=crop"]
  },
  {
    id: 6,
    name: "Dev Malhotra",
    handle: "@devtravels",
    followers: "41K",
    location: "Jaipur, Rajasthan",
    categories: ["Travel", "Photography"],
    ratePerReel: "₹13,600",
    ratePerPost: "₹8,400",
    rating: 4.7,
    completedProjects: 145,
    isVerified: true,
    avatar: devImage,
    portfolio: ["https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=200&fit=crop"]
  },
  {
    id: 7,
    name: "Nishka Gupta",
    handle: "@nishkafoodie",
    followers: "28K",
    location: "Hyderabad, Telangana",
    categories: ["Food", "Travel"],
    ratePerReel: "₹10,500",
    ratePerPost: "₹6,500",
    rating: 4.9,
    completedProjects: 156,
    isVerified: false,
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
    portfolio: ["https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=200&h=200&fit=crop"]
  },
  {
    id: 8,
    name: "Aarav Malhotra",
    handle: "@aaravmusic",
    followers: "29K",
    location: "Kolkata, West Bengal",
    categories: ["Music", "Entertainment"],
    ratePerReel: "₹12,400",
    ratePerPost: "₹7,200",
    rating: 4.6,
    completedProjects: 112,
    isVerified: false,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    portfolio: ["https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop"]
  }
];

export default function FindCreators() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-20">
        <section className="py-12 bg-gradient-to-br from-background to-secondary">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Find <span className="gradient-text">Creators</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Discover verified micro-creators ready to bring your brand vision to life
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {creators.map((creator) => (
                <div key={creator.id} className="relative group">
                  <Card className="card-soft hover:shadow-lg transition-all duration-300 cursor-pointer">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4 mb-4">
                        <img
                          src={creator.avatar}
                          alt={creator.name}
                          className="w-16 h-16 rounded-full object-cover"
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-lg">{creator.name}</h3>
                            {creator.isVerified && (
                              <div className="flex items-center gap-1 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded-full">
                                <Shield className="w-3 h-3 text-green-600" />
                                <CheckCircle className="w-3 h-3 text-green-600" />
                              </div>
                            )}
                          </div>
                          <p className="text-muted-foreground">{creator.handle}</p>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <MapPin className="w-4 h-4" />
                            {creator.location}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 mb-4">
                        <div className="flex items-center gap-1">
                          <Instagram className="w-4 h-4 text-accent" />
                          <span className="text-sm font-medium">{creator.followers}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-highlight fill-current" />
                          <span className="text-sm font-medium">{creator.rating}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {creator.completedProjects} projects
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {creator.categories.map((category) => (
                          <Badge key={category} variant="secondary">
                            {category}
                          </Badge>
                        ))}
                      </div>

                      <div className="bg-secondary rounded-lg p-3 mb-4">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Rate per Reel:</span>
                          <span className="font-semibold text-primary">{creator.ratePerReel}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Rate per Post:</span>
                          <span className="font-semibold text-primary">{creator.ratePerPost}</span>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button 
                          className="flex-1" 
                          variant="coral"
                          onClick={() => window.location.href = `/creator-profile/${creator.id}`}
                        >
                          Contact Creator
                        </Button>
                        <Button variant="outline" size="sm">
                          View Portfolio
                        </Button>
                      </div>
                    </CardContent>

                    {/* Hover Popup */}
                    <div className="absolute inset-0 bg-black/60 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none group-hover:pointer-events-auto">
                      <div className="bg-white rounded-lg p-4 shadow-xl transform scale-95 group-hover:scale-100 transition-transform duration-300">
                        <div className="text-center">
                          <h4 className="font-semibold text-lg mb-2 text-gray-900">
                            {creator.name}
                          </h4>
                          <p className="text-sm text-gray-600 mb-4">
                            Ready to collaborate?
                          </p>
                          <Button 
                            variant="coral"
                            onClick={() => window.location.href = `/creator-booking/${creator.id}`}
                            className="w-full"
                          >
                            Book Creator
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}