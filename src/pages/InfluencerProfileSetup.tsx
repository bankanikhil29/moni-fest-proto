import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { X, Plus, Upload, User, Instagram, Youtube, Twitter, Camera, MapPin, Users, TrendingUp } from "lucide-react";
import Navigation from "@/components/Navigation";

const InfluencerProfileSetup = () => {
  const [formData, setFormData] = useState({
    personalInfo: {
      fullName: "",
      email: "",
      phone: "",
      dateOfBirth: "",
      gender: "",
      city: "",
      state: "",
      preferredLanguage: "english"
    },
    socialMedia: {
      instagram: { handle: "", followers: "", engagementRate: "" },
      youtube: { handle: "", subscribers: "", avgViews: "" },
      twitter: { handle: "", followers: "", engagementRate: "" }
    },
    contentDetails: {
      niches: [] as string[],
      contentTypes: [] as string[],
      audienceAge: "",
      audienceGender: "",
      audienceLocation: "",
      bio: "",
      achievements: ""
    },
    rates: {
      instagramPost: "",
      instagramStory: "",
      youtubeVideo: "",
      twitterPost: ""
    }
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [selectedNiches, setSelectedNiches] = useState<string[]>([]);
  const [selectedContentTypes, setSelectedContentTypes] = useState<string[]>([]);

  const niches = [
    "Fashion & Beauty", "Food & Travel", "Technology", "Fitness & Health",
    "Lifestyle", "Entertainment", "Education", "Business & Finance",
    "Parenting", "Gaming", "Art & Design", "Music", "Sports"
  ];

  const contentTypes = [
    "Photos", "Reels/Short Videos", "Stories", "Live Streams",
    "Long-form Videos", "Carousel Posts", "IGTV", "Tutorials",
    "Reviews", "Unboxing", "Behind-the-scenes"
  ];

  const languages = [
    { value: "english", label: "English" },
    { value: "hindi", label: "हिंदी (Hindi)" },
    { value: "bengali", label: "বাংলা (Bengali)" },
    { value: "telugu", label: "తెలుగు (Telugu)" },
    { value: "marathi", label: "मराठी (Marathi)" },
    { value: "tamil", label: "தமிழ் (Tamil)" },
    { value: "gujarati", label: "ગુજરાતી (Gujarati)" },
    { value: "kannada", label: "ಕನ್ನಡ (Kannada)" }
  ];

  const toggleNiche = (niche: string) => {
    setSelectedNiches(prev => 
      prev.includes(niche) 
        ? prev.filter(n => n !== niche)
        : [...prev, niche]
    );
  };

  const toggleContentType = (type: string) => {
    setSelectedContentTypes(prev => 
      prev.includes(type) 
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  const nextStep = () => {
    setCurrentStep(prev => Math.min(prev + 1, 4));
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const renderPersonalInfo = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-primary/10 p-2 rounded-full">
          <User className="h-5 w-5 text-primary" />
        </div>
        <h2 className="text-xl font-semibold">Personal Information</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="fullName">Full Name *</Label>
          <Input
            id="fullName"
            value={formData.personalInfo.fullName}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              personalInfo: { ...prev.personalInfo, fullName: e.target.value }
            }))}
            placeholder="Enter your full name"
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="email">Email Address *</Label>
          <Input
            id="email"
            type="email"
            value={formData.personalInfo.email}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              personalInfo: { ...prev.personalInfo, email: e.target.value }
            }))}
            placeholder="your.email@example.com"
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="phone">Phone Number *</Label>
          <Input
            id="phone"
            value={formData.personalInfo.phone}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              personalInfo: { ...prev.personalInfo, phone: e.target.value }
            }))}
            placeholder="+91 98765 43210"
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="dateOfBirth">Date of Birth *</Label>
          <Input
            id="dateOfBirth"
            type="date"
            value={formData.personalInfo.dateOfBirth}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              personalInfo: { ...prev.personalInfo, dateOfBirth: e.target.value }
            }))}
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="gender">Gender</Label>
          <Select
            value={formData.personalInfo.gender}
            onValueChange={(value) => setFormData(prev => ({
              ...prev,
              personalInfo: { ...prev.personalInfo, gender: value }
            }))}
          >
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
              <SelectItem value="other">Other</SelectItem>
              <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="preferredLanguage">Preferred Language *</Label>
          <Select
            value={formData.personalInfo.preferredLanguage}
            onValueChange={(value) => setFormData(prev => ({
              ...prev,
              personalInfo: { ...prev.personalInfo, preferredLanguage: value }
            }))}
          >
            <SelectTrigger className="mt-1">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {languages.map((lang) => (
                <SelectItem key={lang.value} value={lang.value}>
                  {lang.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="city">City *</Label>
          <Input
            id="city"
            value={formData.personalInfo.city}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              personalInfo: { ...prev.personalInfo, city: e.target.value }
            }))}
            placeholder="Enter your city"
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="state">State *</Label>
          <Input
            id="state"
            value={formData.personalInfo.state}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              personalInfo: { ...prev.personalInfo, state: e.target.value }
            }))}
            placeholder="Enter your state"
            className="mt-1"
          />
        </div>
      </div>
    </div>
  );

  const renderSocialMedia = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-primary/10 p-2 rounded-full">
          <Camera className="h-5 w-5 text-primary" />
        </div>
        <h2 className="text-xl font-semibold">Social Media Profiles</h2>
      </div>

      {/* Instagram */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Instagram className="h-5 w-5 text-pink-500" />
            Instagram
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="instagramHandle">Username/Handle *</Label>
            <Input
              id="instagramHandle"
              value={formData.socialMedia.instagram.handle}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                socialMedia: {
                  ...prev.socialMedia,
                  instagram: { ...prev.socialMedia.instagram, handle: e.target.value }
                }
              }))}
              placeholder="@yourusername"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="instagramFollowers">Followers Count *</Label>
            <Input
              id="instagramFollowers"
              type="number"
              value={formData.socialMedia.instagram.followers}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                socialMedia: {
                  ...prev.socialMedia,
                  instagram: { ...prev.socialMedia.instagram, followers: e.target.value }
                }
              }))}
              placeholder="10000"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="instagramEngagement">Engagement Rate (%)</Label>
            <Input
              id="instagramEngagement"
              value={formData.socialMedia.instagram.engagementRate}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                socialMedia: {
                  ...prev.socialMedia,
                  instagram: { ...prev.socialMedia.instagram, engagementRate: e.target.value }
                }
              }))}
              placeholder="3.5"
              className="mt-1"
            />
          </div>
        </CardContent>
      </Card>

      {/* YouTube */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Youtube className="h-5 w-5 text-red-500" />
            YouTube
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="youtubeHandle">Channel Name</Label>
            <Input
              id="youtubeHandle"
              value={formData.socialMedia.youtube.handle}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                socialMedia: {
                  ...prev.socialMedia,
                  youtube: { ...prev.socialMedia.youtube, handle: e.target.value }
                }
              }))}
              placeholder="Your Channel Name"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="youtubeSubscribers">Subscribers</Label>
            <Input
              id="youtubeSubscribers"
              type="number"
              value={formData.socialMedia.youtube.subscribers}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                socialMedia: {
                  ...prev.socialMedia,
                  youtube: { ...prev.socialMedia.youtube, subscribers: e.target.value }
                }
              }))}
              placeholder="5000"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="youtubeViews">Average Views</Label>
            <Input
              id="youtubeViews"
              type="number"
              value={formData.socialMedia.youtube.avgViews}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                socialMedia: {
                  ...prev.socialMedia,
                  youtube: { ...prev.socialMedia.youtube, avgViews: e.target.value }
                }
              }))}
              placeholder="1000"
              className="mt-1"
            />
          </div>
        </CardContent>
      </Card>

      {/* Twitter */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Twitter className="h-5 w-5 text-blue-400" />
            Twitter/X
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="twitterHandle">Username/Handle</Label>
            <Input
              id="twitterHandle"
              value={formData.socialMedia.twitter.handle}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                socialMedia: {
                  ...prev.socialMedia,
                  twitter: { ...prev.socialMedia.twitter, handle: e.target.value }
                }
              }))}
              placeholder="@yourusername"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="twitterFollowers">Followers</Label>
            <Input
              id="twitterFollowers"
              type="number"
              value={formData.socialMedia.twitter.followers}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                socialMedia: {
                  ...prev.socialMedia,
                  twitter: { ...prev.socialMedia.twitter, followers: e.target.value }
                }
              }))}
              placeholder="2000"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="twitterEngagement">Engagement Rate (%)</Label>
            <Input
              id="twitterEngagement"
              value={formData.socialMedia.twitter.engagementRate}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                socialMedia: {
                  ...prev.socialMedia,
                  twitter: { ...prev.socialMedia.twitter, engagementRate: e.target.value }
                }
              }))}
              placeholder="2.5"
              className="mt-1"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderContentDetails = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-primary/10 p-2 rounded-full">
          <TrendingUp className="h-5 w-5 text-primary" />
        </div>
        <h2 className="text-xl font-semibold">Content & Audience Details</h2>
      </div>

      <div>
        <Label className="text-base font-medium mb-3 block">Content Niches *</Label>
        <p className="text-sm text-muted-foreground mb-3">Select your areas of expertise (maximum 5)</p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {niches.map((niche) => (
            <div key={niche} className="flex items-center space-x-2">
              <Checkbox
                id={`niche-${niche}`}
                checked={selectedNiches.includes(niche)}
                onCheckedChange={() => toggleNiche(niche)}
                disabled={!selectedNiches.includes(niche) && selectedNiches.length >= 5}
              />
              <Label
                htmlFor={`niche-${niche}`}
                className="text-sm font-normal cursor-pointer"
              >
                {niche}
              </Label>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap gap-2 mt-3">
          {selectedNiches.map((niche) => (
            <Badge key={niche} variant="secondary" className="gap-1">
              {niche}
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => toggleNiche(niche)}
              />
            </Badge>
          ))}
        </div>
      </div>

      <div>
        <Label className="text-base font-medium mb-3 block">Content Types *</Label>
        <p className="text-sm text-muted-foreground mb-3">What type of content do you create?</p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {contentTypes.map((type) => (
            <div key={type} className="flex items-center space-x-2">
              <Checkbox
                id={`content-${type}`}
                checked={selectedContentTypes.includes(type)}
                onCheckedChange={() => toggleContentType(type)}
              />
              <Label
                htmlFor={`content-${type}`}
                className="text-sm font-normal cursor-pointer"
              >
                {type}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Label htmlFor="audienceAge">Primary Audience Age Group</Label>
          <Select
            value={formData.contentDetails.audienceAge}
            onValueChange={(value) => setFormData(prev => ({
              ...prev,
              contentDetails: { ...prev.contentDetails, audienceAge: value }
            }))}
          >
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Select age group" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="13-17">13-17 years</SelectItem>
              <SelectItem value="18-24">18-24 years</SelectItem>
              <SelectItem value="25-34">25-34 years</SelectItem>
              <SelectItem value="35-44">35-44 years</SelectItem>
              <SelectItem value="45+">45+ years</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="audienceGender">Audience Gender Split</Label>
          <Select
            value={formData.contentDetails.audienceGender}
            onValueChange={(value) => setFormData(prev => ({
              ...prev,
              contentDetails: { ...prev.contentDetails, audienceGender: value }
            }))}
          >
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Select gender split" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="mostly-male">Mostly Male (60%+)</SelectItem>
              <SelectItem value="mostly-female">Mostly Female (60%+)</SelectItem>
              <SelectItem value="balanced">Balanced (40-60%)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="audienceLocation">Primary Audience Location</Label>
          <Input
            id="audienceLocation"
            value={formData.contentDetails.audienceLocation}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              contentDetails: { ...prev.contentDetails, audienceLocation: e.target.value }
            }))}
            placeholder="e.g., Mumbai, India"
            className="mt-1"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="bio">Bio/Description *</Label>
        <Textarea
          id="bio"
          value={formData.contentDetails.bio}
          onChange={(e) => setFormData(prev => ({
            ...prev,
            contentDetails: { ...prev.contentDetails, bio: e.target.value }
          }))}
          placeholder="Tell us about yourself, your content style, and what makes you unique..."
          className="mt-1 min-h-[100px]"
          maxLength={500}
        />
        <p className="text-xs text-muted-foreground mt-1">
          {formData.contentDetails.bio.length}/500 characters
        </p>
      </div>

      <div>
        <Label htmlFor="achievements">Notable Achievements</Label>
        <Textarea
          id="achievements"
          value={formData.contentDetails.achievements}
          onChange={(e) => setFormData(prev => ({
            ...prev,
            contentDetails: { ...prev.contentDetails, achievements: e.target.value }
          }))}
          placeholder="Awards, recognitions, viral content, brand collaborations, etc."
          className="mt-1"
          maxLength={300}
        />
        <p className="text-xs text-muted-foreground mt-1">
          {formData.contentDetails.achievements.length}/300 characters
        </p>
      </div>
    </div>
  );

  const renderRates = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-primary/10 p-2 rounded-full">
          <TrendingUp className="h-5 w-5 text-primary" />
        </div>
        <h2 className="text-xl font-semibold">Your Rates</h2>
      </div>

      <p className="text-sm text-muted-foreground mb-4">
        Set your rates for different types of content. You can always update these later.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="instagramPost">Instagram Post Rate (₹)</Label>
          <Input
            id="instagramPost"
            type="number"
            value={formData.rates.instagramPost}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              rates: { ...prev.rates, instagramPost: e.target.value }
            }))}
            placeholder="5000"
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="instagramStory">Instagram Story Rate (₹)</Label>
          <Input
            id="instagramStory"
            type="number"
            value={formData.rates.instagramStory}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              rates: { ...prev.rates, instagramStory: e.target.value }
            }))}
            placeholder="2000"
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="youtubeVideo">YouTube Video Rate (₹)</Label>
          <Input
            id="youtubeVideo"
            type="number"
            value={formData.rates.youtubeVideo}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              rates: { ...prev.rates, youtubeVideo: e.target.value }
            }))}
            placeholder="15000"
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="twitterPost">Twitter/X Post Rate (₹)</Label>
          <Input
            id="twitterPost"
            type="number"
            value={formData.rates.twitterPost}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              rates: { ...prev.rates, twitterPost: e.target.value }
            }))}
            placeholder="1000"
            className="mt-1"
          />
        </div>
      </div>

      <Card className="bg-muted/50">
        <CardContent className="pt-6">
          <h3 className="font-semibold mb-2">Rate Guidelines:</h3>
          <ul className="text-sm space-y-1 text-muted-foreground">
            <li>• Micro-influencers (1K-10K): ₹500-₹2000 per post</li>
            <li>• Mid-tier influencers (10K-100K): ₹2000-₹10000 per post</li>
            <li>• Macro-influencers (100K+): ₹10000+ per post</li>
            <li>• Consider your engagement rate and niche when setting rates</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return renderPersonalInfo();
      case 2:
        return renderSocialMedia();
      case 3:
        return renderContentDetails();
      case 4:
        return renderRates();
      default:
        return renderPersonalInfo();
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold mb-2">Create Your Influencer Profile</h1>
            <p className="text-muted-foreground">
              Complete your profile to start connecting with brands
            </p>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-center mb-8 overflow-x-auto">
            <div className="flex items-center space-x-4 min-w-max px-4">
              {[1, 2, 3, 4].map((step) => (
                <div key={step} className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold
                      ${currentStep >= step
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                      }`}
                  >
                    {step}
                  </div>
                  <div className="ml-2 text-sm">
                    <div className={currentStep >= step ? "font-semibold" : "text-muted-foreground"}>
                      {step === 1 && "Personal"}
                      {step === 2 && "Social Media"}
                      {step === 3 && "Content"}
                      {step === 4 && "Rates"}
                    </div>
                  </div>
                  {step < 4 && (
                    <div
                      className={`w-8 h-0.5 mx-4
                        ${currentStep > step ? "bg-primary" : "bg-muted"}
                      `}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Form Content */}
          <Card className="mb-8">
            <CardContent className="p-6">
              {renderStepContent()}
            </CardContent>
          </Card>

          {/* Navigation Buttons */}
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1}
              className="flex items-center gap-2"
            >
              Previous
            </Button>
            <div className="text-sm text-muted-foreground">
              Step {currentStep} of 4
            </div>
            {currentStep < 4 ? (
              <Button
                onClick={nextStep}
                className="flex items-center gap-2"
              >
                Next
              </Button>
            ) : (
              <Button
                onClick={() => {
                  // Handle form submission
                  console.log("Form submitted:", formData);
                  // Redirect to verification
                  window.location.href = '/document-verification?type=influencer';
                }}
                className="flex items-center gap-2"
              >
                Complete Profile & Verify
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfluencerProfileSetup;