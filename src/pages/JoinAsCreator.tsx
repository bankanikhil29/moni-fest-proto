import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import Navigation from "@/components/Navigation";
import { useState } from "react";

export default function JoinAsCreator() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    instagramHandle: "",
    tiktokHandle: "",
    youtubeChannel: "",
    followersCount: "",
    contentCategories: [],
    bio: "",
    portfolioLinks: "",
    ratePerReel: "",
    ratePerPost: "",
    location: ""
  });

  const categories = [
    "Fashion", "Beauty", "Lifestyle", "Food", "Travel", "Tech", "Gaming", 
    "Fitness", "Health", "Business", "Education", "Entertainment"
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-20">
        <section className="py-12">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Join as a <span className="gradient-text">Creator</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Start your journey with brands that value your creativity and pay on time.
              </p>
            </div>

            <Card className="card-soft">
              <CardHeader>
                <CardTitle>Creator Application</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="fullName">Full Name *</Label>
                    <Input 
                      id="fullName" 
                      placeholder="Enter your full name"
                      value={formData.fullName}
                      onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input 
                      id="phone" 
                      placeholder="+1 (555) 123-4567"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input 
                      id="location" 
                      placeholder="City, State"
                      value={formData.location}
                      onChange={(e) => setFormData({...formData, location: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Social Media Profiles</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="instagram">Instagram Handle *</Label>
                      <Input 
                        id="instagram" 
                        placeholder="@yourusername"
                        value={formData.instagramHandle}
                        onChange={(e) => setFormData({...formData, instagramHandle: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="followers">Instagram Followers</Label>
                      <Select onValueChange={(value) => setFormData({...formData, followersCount: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select follower range" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1k-5k">1K - 5K</SelectItem>
                          <SelectItem value="5k-10k">5K - 10K</SelectItem>
                          <SelectItem value="10k-25k">10K - 25K</SelectItem>
                          <SelectItem value="25k-50k">25K - 50K</SelectItem>
                          <SelectItem value="50k-100k">50K - 100K</SelectItem>
                          <SelectItem value="100k+">100K+</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="tiktok">TikTok Handle</Label>
                      <Input 
                        id="tiktok" 
                        placeholder="@yourusername"
                        value={formData.tiktokHandle}
                        onChange={(e) => setFormData({...formData, tiktokHandle: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="youtube">YouTube Channel</Label>
                      <Input 
                        id="youtube" 
                        placeholder="Channel Name or URL"
                        value={formData.youtubeChannel}
                        onChange={(e) => setFormData({...formData, youtubeChannel: e.target.value})}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <Label>Content Categories *</Label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-2">
                    {categories.map((category) => (
                      <div key={category} className="flex items-center space-x-2">
                        <Checkbox id={category} />
                        <Label htmlFor={category} className="text-sm">{category}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Label htmlFor="bio">Bio & Experience</Label>
                  <Textarea 
                    id="bio" 
                    placeholder="Tell us about yourself, your content style, and experience with brand collaborations..."
                    rows={4}
                    value={formData.bio}
                    onChange={(e) => setFormData({...formData, bio: e.target.value})}
                  />
                </div>

                <div>
                  <Label htmlFor="portfolio">Portfolio Links</Label>
                  <Textarea 
                    id="portfolio" 
                    placeholder="Paste links to your best content (Instagram posts, TikToks, YouTube videos, etc.)"
                    rows={3}
                    value={formData.portfolioLinks}
                    onChange={(e) => setFormData({...formData, portfolioLinks: e.target.value})}
                  />
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Pricing</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="ratePerReel">Rate per Instagram Reel</Label>
                      <Input 
                        id="ratePerReel" 
                        placeholder="$150"
                        value={formData.ratePerReel}
                        onChange={(e) => setFormData({...formData, ratePerReel: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="ratePerPost">Rate per Instagram Post</Label>
                      <Input 
                        id="ratePerPost" 
                        placeholder="$100"
                        value={formData.ratePerPost}
                        onChange={(e) => setFormData({...formData, ratePerPost: e.target.value})}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox id="terms" />
                  <Label htmlFor="terms" className="text-sm">
                    I agree to the Terms of Service and Privacy Policy
                  </Label>
                </div>

                <Button className="w-full" variant="coral" size="lg">
                  Submit Application
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
    </div>
  );
}