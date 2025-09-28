import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Shield, Star, Trophy, Gift, ArrowRight } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import Navigation from "@/components/Navigation";

const VerificationSuccess = () => {
  const [searchParams] = useSearchParams();
  const userType = searchParams.get('type') || 'influencer';

  const benefits = [
    {
      icon: <Shield className="h-6 w-6 text-green-600" />,
      title: "Verified Badge",
      description: "Display your verified status to build trust"
    },
    {
      icon: <Trophy className="h-6 w-6 text-yellow-600" />,
      title: "Priority Listing",
      description: "Get featured higher in search results"
    },
    {
      icon: <Star className="h-6 w-6 text-purple-600" />,
      title: "Premium Features",
      description: "Access to advanced collaboration tools"
    },
    {
      icon: <Gift className="h-6 w-6 text-pink-600" />,
      title: "Exclusive Campaigns",
      description: "Apply for verified-only opportunities"
    }
  ];

  const nextSteps = userType === 'brand' ? [
    "Create your first campaign",
    "Browse verified influencers",
    "Set up payment methods",
    "Start collaborating"
  ] : [
    "Complete your portfolio",
    "Browse brand opportunities", 
    "Set your availability",
    "Apply to campaigns"
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Success Animation */}
          <div className="mb-8">
            <div className="relative mx-auto w-32 h-32 mb-6">
              <div className="absolute inset-0 bg-accent/20 rounded-full animate-pulse verified-animation"></div>
              <div className="absolute inset-4 bg-accent/40 rounded-full animate-pulse delay-75 verified-animation"></div>
              <div className="absolute inset-8 bg-accent/60 rounded-full flex items-center justify-center verified-animation">
                <CheckCircle className="h-12 w-12 text-white animate-bounce" />
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              🎉 Congratulations!
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold text-accent mb-4">
              You're Now Verified!
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Your identity verification is complete. You now have access to all premium features and verified-only opportunities.
            </p>
          </div>

          {/* Verified Badge Showcase */}
          <Card className="mb-8 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-800">
            <CardContent className="pt-6">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 text-lg px-4 py-2">
                  <Shield className="w-4 h-4 mr-2" />
                  ✓ Verified {userType === 'brand' ? 'Brand' : 'Creator'}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                This badge will appear on your profile and in all listings
              </p>
            </CardContent>
          </Card>

          {/* Benefits Grid */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold mb-6">What You Get as a Verified {userType === 'brand' ? 'Brand' : 'Creator'}</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((benefit, index) => (
                <Card key={index} className="text-center hover:shadow-md transition-shadow">
                  <CardContent className="pt-6">
                    <div className="mb-4 flex justify-center">
                      {benefit.icon}
                    </div>
                    <h4 className="font-semibold mb-2">{benefit.title}</h4>
                    <p className="text-sm text-muted-foreground">{benefit.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Next Steps */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ArrowRight className="h-5 w-5" />
                Your Next Steps
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {nextSteps.map((step, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                    <div className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold">
                      {index + 1}
                    </div>
                    <span className="font-medium">{step}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to={userType === 'brand' ? '/brand-dashboard' : '/creator-dashboard'}>
              <Button size="lg" className="gap-2">
                <Trophy className="h-4 w-4" />
                Go to Dashboard
              </Button>
            </Link>
            <Link to={userType === 'brand' ? '/find-creators' : '/find-brands'}>
              <Button variant="outline" size="lg" className="gap-2">
                <Star className="h-4 w-4" />
                {userType === 'brand' ? 'Find Verified Creators' : 'Browse Opportunities'}
              </Button>
            </Link>
          </div>

          {/* Welcome Message */}
          <div className="mt-12 p-6 bg-primary/5 rounded-lg">
            <h4 className="text-xl font-semibold mb-2">Welcome to the Verified Community! 🚀</h4>
            <p className="text-muted-foreground">
              You're now part of an exclusive network of verified {userType === 'brand' ? 'brands' : 'creators'} on Moni-Fest. 
              Start building meaningful partnerships and grow your {userType === 'brand' ? 'brand' : 'creator'} journey with confidence.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerificationSuccess;