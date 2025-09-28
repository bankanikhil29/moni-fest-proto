import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Users, Building, Star, Zap, Shield, Globe, Heart, TrendingUp, Camera, Target, Handshake } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";

const UserTypeSelection = () => {
  const userTypes = [
    {
      id: "influencer",
      title: "Join as Influencer",
      subtitle: "Micro-Influencer",
      description: "Connect with brands and monetize your social media presence",
      icon: <Camera className="h-8 w-8 text-primary" />,
      gradient: "bg-gradient-to-br from-pink-500/10 to-purple-500/10 border-pink-200/50",
      features: [
        { icon: <Star className="h-4 w-4" />, text: "Get paid for collaborations" },
        { icon: <TrendingUp className="h-4 w-4" />, text: "Grow your audience" },
        { icon: <Shield className="h-4 w-4" />, text: "Secure payment protection" },
        { icon: <Globe className="h-4 w-4" />, text: "Work with global brands" }
      ],
      cta: "Start Creating",
      link: "/influencer-setup",
      badge: "Most Popular",
      badgeColor: "bg-pink-500 text-white"
    },
    {
      id: "brand",
      title: "Join as Brand",
      subtitle: "Business Account",
      description: "Find authentic micro-influencers to grow your brand reach",
      icon: <Building className="h-8 w-8 text-blue-600" />,
      gradient: "bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-200/50",
      features: [
        { icon: <Users className="h-4 w-4" />, text: "Access verified influencers" },
        { icon: <Target className="h-4 w-4" />, text: "Targeted campaigns" },
        { icon: <Zap className="h-4 w-4" />, text: "Quick campaign setup" },
        { icon: <Handshake className="h-4 w-4" />, text: "Transparent pricing" }
      ],
      cta: "Find Influencers",
      link: "/brand-setup",
      badge: "",
      badgeColor: ""
    }
  ];

  const stats = [
    { number: "10K+", label: "Active Influencers", icon: <Users className="h-5 w-5 text-primary" /> },
    { number: "500+", label: "Verified Brands", icon: <Building className="h-5 w-5 text-primary" /> },
    { number: "₹2Cr+", label: "Payments Processed", icon: <TrendingUp className="h-5 w-5 text-primary" /> },
    { number: "25+", label: "Indian Cities", icon: <Globe className="h-5 w-5 text-primary" /> }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="mb-8">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-primary via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Join India's Premier
            </h1>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
              Influencer Marketplace
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Connect authentic micro-influencers with forward-thinking brands. 
              Build meaningful partnerships that drive real results.
            </p>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center border-primary/20 bg-white/50 backdrop-blur">
                <CardContent className="pt-6 pb-4">
                  <div className="flex justify-center mb-2">
                    {stat.icon}
                  </div>
                  <div className="text-2xl font-bold text-primary mb-1">{stat.number}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* User Type Selection */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Choose Your Path</h2>
            <p className="text-lg text-muted-foreground">
              Select your account type to get started with personalized features
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {userTypes.map((type) => (
              <Card key={type.id} className={`relative overflow-hidden ${type.gradient} hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2`}>
                {type.badge && (
                  <div className="absolute top-4 right-4">
                    <Badge className={type.badgeColor}>
                      {type.badge}
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-white/80 rounded-full shadow-sm">
                      {type.icon}
                    </div>
                    <div>
                      <CardTitle className="text-2xl font-bold">{type.title}</CardTitle>
                      <p className="text-muted-foreground font-medium">{type.subtitle}</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    {type.description}
                  </p>
                </CardHeader>

                <CardContent className="pt-0">
                  <div className="space-y-3 mb-6">
                    {type.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="text-primary">
                          {feature.icon}
                        </div>
                        <span className="text-sm font-medium">{feature.text}</span>
                      </div>
                    ))}
                  </div>

                  <Link to={type.link} className="block">
                    <Button 
                      className="w-full group text-base py-6"
                      size="lg"
                    >
                      {type.cta}
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Moni-Fest?</h2>
          <p className="text-lg text-muted-foreground mb-12">
            Built specifically for the Indian market with local insights and preferences
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure Payments</h3>
              <p className="text-muted-foreground">
                Escrow protection ensures safe transactions for both parties
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Authentic Connections</h3>
              <p className="text-muted-foreground">
                Verified profiles and genuine engagement metrics
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Local Focus</h3>
              <p className="text-muted-foreground">
                Designed for Indian creators with multilingual support
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-primary/10 via-purple-500/10 to-pink-500/10">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join thousands of creators and brands already growing together on Moni-Fest
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/influencer-setup">
              <Button size="lg" className="w-full sm:w-auto">
                Join as Influencer
              </Button>
            </Link>
            <Link to="/brand-setup">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Join as Brand
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default UserTypeSelection;