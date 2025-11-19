import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { X, Building, Target, Users, Zap, Globe, IndianRupee } from "lucide-react";
import Navigation from "@/components/Navigation";
import { emailSchema, phoneINSchema, nameSchema } from "@/lib/validation";

const BrandProfileSetup = () => {
  const [formData, setFormData] = useState({
    companyInfo: {
      companyName: "",
      registrationNumber: "",
      website: "",
      industry: "",
      companySize: "",
      establishedYear: "",
      headquartersLocation: ""
    },
    contactInfo: {
      contactPersonName: "",
      designation: "",
      email: "",
      phone: "",
      preferredLanguage: "english"
    },
    brandDetails: {
      brandDescription: "",
      targetAudience: "",
      brandValues: "",
      previousCampaigns: "",
      socialMediaPresence: {
        instagram: "",
        facebook: "",
        twitter: "",
        linkedin: "",
        youtube: ""
      }
    },
    campaignPreferences: {
      campaignTypes: [] as string[],
      contentTypes: [] as string[],
      preferredNiches: [] as string[],
      budgetRange: "",
      campaignDuration: "",
      expectedDeliverables: ""
    }
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [selectedCampaignTypes, setSelectedCampaignTypes] = useState<string[]>([]);
  const [selectedContentTypes, setSelectedContentTypes] = useState<string[]>([]);
  const [selectedNiches, setSelectedNiches] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const industries = [
    "Technology & Software", "E-commerce & Retail", "Food & Beverage", "Fashion & Beauty",
    "Healthcare & Wellness", "Finance & Banking", "Education & E-learning", "Travel & Hospitality",
    "Automotive", "Real Estate", "Entertainment & Media", "Sports & Fitness",
    "Home & Garden", "Electronics", "Jewelry & Accessories", "Books & Publishing"
  ];

  const companySizes = [
    "Startup (1-10 employees)", "Small (11-50 employees)", "Medium (51-200 employees)",
    "Large (201-1000 employees)", "Enterprise (1000+ employees)"
  ];

  const campaignTypes = [
    "Product Launch", "Brand Awareness", "User Generated Content", "Product Reviews",
    "Seasonal Campaigns", "Event Promotion", "App Downloads", "Website Traffic",
    "Lead Generation", "Sales Conversion", "Brand Collaboration", "Giveaways & Contests"
  ];

  const contentTypes = [
    "Instagram Posts", "Instagram Stories", "Instagram Reels", "YouTube Videos",
    "YouTube Shorts", "Twitter Posts", "Blog Posts", "Live Streaming",
    "Unboxing Videos", "Tutorial Videos", "Product Photography", "Testimonial Videos"
  ];

  const niches = [
    "Fashion & Beauty", "Food & Travel", "Technology", "Fitness & Health",
    "Lifestyle", "Entertainment", "Education", "Business & Finance",
    "Parenting", "Gaming", "Art & Design", "Music", "Sports", "Home Decor"
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

  const toggleCampaignType = (type: string) => {
    setSelectedCampaignTypes(prev => 
      prev.includes(type) 
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  const toggleContentType = (type: string) => {
    setSelectedContentTypes(prev => 
      prev.includes(type) 
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  const toggleNiche = (niche: string) => {
    setSelectedNiches(prev => 
      prev.includes(niche) 
        ? prev.filter(n => n !== niche)
        : [...prev, niche]
    );
  };

  const nextStep = () => {
    // Lightweight validation on step 2 (contact info)
    if (currentStep === 2) {
      const newErrors: Record<string, string> = {};
      
      const emailResult = emailSchema.safeParse(formData.contactInfo.email);
      if (!emailResult.success) {
        newErrors['contactInfo.email'] = emailResult.error.errors[0]?.message || 'Invalid email';
      }
      
      if (formData.contactInfo.phone) {
        const phoneResult = phoneINSchema.safeParse(formData.contactInfo.phone);
        if (!phoneResult.success) {
          newErrors['contactInfo.phone'] = phoneResult.error.errors[0]?.message || 'Invalid phone';
        }
      }
      
      const nameResult = nameSchema.safeParse(formData.contactInfo.contactPersonName);
      if (!nameResult.success) {
        newErrors['contactInfo.contactPersonName'] = nameResult.error.errors[0]?.message || 'Required';
      }
      
      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }
      setErrors({});
    }
    setCurrentStep(prev => Math.min(prev + 1, 4));
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const renderCompanyInfo = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-primary/10 p-2 rounded-full">
          <Building className="h-5 w-5 text-primary" />
        </div>
        <h2 className="text-xl font-semibold">Company Information</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="companyName">Company Name *</Label>
          <Input
            id="companyName"
            value={formData.companyInfo.companyName}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              companyInfo: { ...prev.companyInfo, companyName: e.target.value }
            }))}
            placeholder="Enter your company name"
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="registrationNumber">Registration Number</Label>
          <Input
            id="registrationNumber"
            value={formData.companyInfo.registrationNumber}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              companyInfo: { ...prev.companyInfo, registrationNumber: e.target.value }
            }))}
            placeholder="CIN or Registration Number"
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="website">Company Website *</Label>
          <Input
            id="website"
            value={formData.companyInfo.website}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              companyInfo: { ...prev.companyInfo, website: e.target.value }
            }))}
            placeholder="https://www.yourcompany.com"
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="industry">Industry *</Label>
          <Select
            value={formData.companyInfo.industry}
            onValueChange={(value) => setFormData(prev => ({
              ...prev,
              companyInfo: { ...prev.companyInfo, industry: value }
            }))}
          >
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Select your industry" />
            </SelectTrigger>
            <SelectContent>
              {industries.map((industry) => (
                <SelectItem key={industry} value={industry}>
                  {industry}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="companySize">Company Size *</Label>
          <Select
            value={formData.companyInfo.companySize}
            onValueChange={(value) => setFormData(prev => ({
              ...prev,
              companyInfo: { ...prev.companyInfo, companySize: value }
            }))}
          >
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Select company size" />
            </SelectTrigger>
            <SelectContent>
              {companySizes.map((size) => (
                <SelectItem key={size} value={size}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="establishedYear">Established Year</Label>
          <Input
            id="establishedYear"
            type="number"
            value={formData.companyInfo.establishedYear}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              companyInfo: { ...prev.companyInfo, establishedYear: e.target.value }
            }))}
            placeholder="2020"
            className="mt-1"
            min="1800"
            max="2025"
          />
        </div>

        <div className="md:col-span-2">
          <Label htmlFor="headquartersLocation">Headquarters Location *</Label>
          <Input
            id="headquartersLocation"
            value={formData.companyInfo.headquartersLocation}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              companyInfo: { ...prev.companyInfo, headquartersLocation: e.target.value }
            }))}
            placeholder="Mumbai, Maharashtra, India"
            className="mt-1"
          />
        </div>
      </div>
    </div>
  );

  const renderContactInfo = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-primary/10 p-2 rounded-full">
          <Users className="h-5 w-5 text-primary" />
        </div>
        <h2 className="text-xl font-semibold">Contact Information</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="contactPersonName">Contact Person Name *</Label>
          <Input
            id="contactPersonName"
            value={formData.contactInfo.contactPersonName}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              contactInfo: { ...prev.contactInfo, contactPersonName: e.target.value }
            }))}
            placeholder="Full name of the main contact"
            className="mt-1"
          />
          {errors['contactInfo.contactPersonName'] && (
            <p className="text-sm text-destructive mt-1">{errors['contactInfo.contactPersonName']}</p>
          )}
        </div>

        <div>
          <Label htmlFor="designation">Designation *</Label>
          <Input
            id="designation"
            value={formData.contactInfo.designation}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              contactInfo: { ...prev.contactInfo, designation: e.target.value }
            }))}
            placeholder="Marketing Manager, CMO, etc."
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="email">Email Address *</Label>
          <Input
            id="email"
            type="email"
            value={formData.contactInfo.email}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              contactInfo: { ...prev.contactInfo, email: e.target.value }
            }))}
            placeholder="contact@yourcompany.com"
            className="mt-1"
          />
          {errors['contactInfo.email'] && (
            <p className="text-sm text-destructive mt-1">{errors['contactInfo.email']}</p>
          )}
        </div>

        <div>
          <Label htmlFor="phone">Phone Number *</Label>
          <Input
            id="phone"
            value={formData.contactInfo.phone}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              contactInfo: { ...prev.contactInfo, phone: e.target.value }
            }))}
            placeholder="+91 98765 43210"
            className="mt-1"
          />
          {errors['contactInfo.phone'] && (
            <p className="text-sm text-destructive mt-1">{errors['contactInfo.phone']}</p>
          )}
        </div>

        <div>
          <Label htmlFor="preferredLanguage">Preferred Communication Language *</Label>
          <Select
            value={formData.contactInfo.preferredLanguage}
            onValueChange={(value) => setFormData(prev => ({
              ...prev,
              contactInfo: { ...prev.contactInfo, preferredLanguage: value }
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
      </div>
    </div>
  );

  const renderBrandDetails = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-primary/10 p-2 rounded-full">
          <Globe className="h-5 w-5 text-primary" />
        </div>
        <h2 className="text-xl font-semibold">Brand Details</h2>
      </div>

      <div>
        <Label htmlFor="brandDescription">Brand Description *</Label>
        <Textarea
          id="brandDescription"
          value={formData.brandDetails.brandDescription}
          onChange={(e) => setFormData(prev => ({
            ...prev,
            brandDetails: { ...prev.brandDetails, brandDescription: e.target.value }
          }))}
          placeholder="Describe your brand, products/services, mission, and what makes you unique..."
          className="mt-1 min-h-[120px]"
          maxLength={1000}
        />
        <p className="text-xs text-muted-foreground mt-1">
          {formData.brandDetails.brandDescription.length}/1000 characters
        </p>
      </div>

      <div>
        <Label htmlFor="targetAudience">Target Audience *</Label>
        <Textarea
          id="targetAudience"
          value={formData.brandDetails.targetAudience}
          onChange={(e) => setFormData(prev => ({
            ...prev,
            brandDetails: { ...prev.brandDetails, targetAudience: e.target.value }
          }))}
          placeholder="Describe your target audience: age group, demographics, interests, location, etc."
          className="mt-1"
          maxLength={500}
        />
        <p className="text-xs text-muted-foreground mt-1">
          {formData.brandDetails.targetAudience.length}/500 characters
        </p>
      </div>

      <div>
        <Label htmlFor="brandValues">Brand Values & Message</Label>
        <Textarea
          id="brandValues"
          value={formData.brandDetails.brandValues}
          onChange={(e) => setFormData(prev => ({
            ...prev,
            brandDetails: { ...prev.brandDetails, brandValues: e.target.value }
          }))}
          placeholder="What values does your brand represent? What message do you want to convey?"
          className="mt-1"
          maxLength={400}
        />
        <p className="text-xs text-muted-foreground mt-1">
          {formData.brandDetails.brandValues.length}/400 characters
        </p>
      </div>

      <div>
        <Label htmlFor="previousCampaigns">Previous Marketing Experience</Label>
        <Textarea
          id="previousCampaigns"
          value={formData.brandDetails.previousCampaigns}
          onChange={(e) => setFormData(prev => ({
            ...prev,
            brandDetails: { ...prev.brandDetails, previousCampaigns: e.target.value }
          }))}
          placeholder="Tell us about your previous influencer marketing campaigns or digital marketing efforts..."
          className="mt-1"
          maxLength={500}
        />
        <p className="text-xs text-muted-foreground mt-1">
          {formData.brandDetails.previousCampaigns.length}/500 characters
        </p>
      </div>

      <div>
        <h3 className="font-semibold mb-3">Social Media Presence (Optional)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="brandInstagram">Instagram Handle</Label>
            <Input
              id="brandInstagram"
              value={formData.brandDetails.socialMediaPresence.instagram}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                brandDetails: {
                  ...prev.brandDetails,
                  socialMediaPresence: { ...prev.brandDetails.socialMediaPresence, instagram: e.target.value }
                }
              }))}
              placeholder="@yourbrand"
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="brandFacebook">Facebook Page</Label>
            <Input
              id="brandFacebook"
              value={formData.brandDetails.socialMediaPresence.facebook}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                brandDetails: {
                  ...prev.brandDetails,
                  socialMediaPresence: { ...prev.brandDetails.socialMediaPresence, facebook: e.target.value }
                }
              }))}
              placeholder="facebook.com/yourbrand"
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="brandTwitter">Twitter/X Handle</Label>
            <Input
              id="brandTwitter"
              value={formData.brandDetails.socialMediaPresence.twitter}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                brandDetails: {
                  ...prev.brandDetails,
                  socialMediaPresence: { ...prev.brandDetails.socialMediaPresence, twitter: e.target.value }
                }
              }))}
              placeholder="@yourbrand"
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="brandLinkedin">LinkedIn</Label>
            <Input
              id="brandLinkedin"
              value={formData.brandDetails.socialMediaPresence.linkedin}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                brandDetails: {
                  ...prev.brandDetails,
                  socialMediaPresence: { ...prev.brandDetails.socialMediaPresence, linkedin: e.target.value }
                }
              }))}
              placeholder="linkedin.com/company/yourbrand"
              className="mt-1"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderCampaignPreferences = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-primary/10 p-2 rounded-full">
          <Target className="h-5 w-5 text-primary" />
        </div>
        <h2 className="text-xl font-semibold">Campaign Preferences</h2>
      </div>

      <div>
        <Label className="text-base font-medium mb-3 block">Campaign Types *</Label>
        <p className="text-sm text-muted-foreground mb-3">What types of campaigns are you interested in?</p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {campaignTypes.map((type) => (
            <div key={type} className="flex items-center space-x-2">
              <Checkbox
                id={`campaign-${type}`}
                checked={selectedCampaignTypes.includes(type)}
                onCheckedChange={() => toggleCampaignType(type)}
              />
              <Label
                htmlFor={`campaign-${type}`}
                className="text-sm font-normal cursor-pointer"
              >
                {type}
              </Label>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap gap-2 mt-3">
          {selectedCampaignTypes.map((type) => (
            <Badge key={type} variant="secondary" className="gap-1">
              {type}
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => toggleCampaignType(type)}
              />
            </Badge>
          ))}
        </div>
      </div>

      <div>
        <Label className="text-base font-medium mb-3 block">Preferred Content Types *</Label>
        <p className="text-sm text-muted-foreground mb-3">What content formats work best for your brand?</p>
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

      <div>
        <Label className="text-base font-medium mb-3 block">Preferred Influencer Niches *</Label>
        <p className="text-sm text-muted-foreground mb-3">Which niches align with your brand?</p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {niches.map((niche) => (
            <div key={niche} className="flex items-center space-x-2">
              <Checkbox
                id={`niche-${niche}`}
                checked={selectedNiches.includes(niche)}
                onCheckedChange={() => toggleNiche(niche)}
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
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="budgetRange">Budget Range per Campaign (₹) *</Label>
          <Select
            value={formData.campaignPreferences.budgetRange}
            onValueChange={(value) => setFormData(prev => ({
              ...prev,
              campaignPreferences: { ...prev.campaignPreferences, budgetRange: value }
            }))}
          >
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Select budget range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5000-15000">₹5,000 - ₹15,000</SelectItem>
              <SelectItem value="15000-50000">₹15,000 - ₹50,000</SelectItem>
              <SelectItem value="50000-100000">₹50,000 - ₹1,00,000</SelectItem>
              <SelectItem value="100000-500000">₹1,00,000 - ₹5,00,000</SelectItem>
              <SelectItem value="500000+">₹5,00,000+</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="campaignDuration">Typical Campaign Duration</Label>
          <Select
            value={formData.campaignPreferences.campaignDuration}
            onValueChange={(value) => setFormData(prev => ({
              ...prev,
              campaignPreferences: { ...prev.campaignPreferences, campaignDuration: value }
            }))}
          >
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Select duration" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1-7">1-7 days</SelectItem>
              <SelectItem value="1-2-weeks">1-2 weeks</SelectItem>
              <SelectItem value="3-4-weeks">3-4 weeks</SelectItem>
              <SelectItem value="1-3-months">1-3 months</SelectItem>
              <SelectItem value="long-term">Long-term partnership</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label htmlFor="expectedDeliverables">Expected Deliverables</Label>
        <Textarea
          id="expectedDeliverables"
          value={formData.campaignPreferences.expectedDeliverables}
          onChange={(e) => setFormData(prev => ({
            ...prev,
            campaignPreferences: { ...prev.campaignPreferences, expectedDeliverables: e.target.value }
          }))}
          placeholder="Describe what you expect from influencers: number of posts, stories, usage rights, etc."
          className="mt-1"
          maxLength={400}
        />
        <p className="text-xs text-muted-foreground mt-1">
          {formData.campaignPreferences.expectedDeliverables.length}/400 characters
        </p>
      </div>

      <Card className="bg-muted/50">
        <CardContent className="pt-6">
          <h3 className="font-semibold mb-2 flex items-center gap-2">
            <IndianRupee className="h-4 w-4" />
            Budget Guidelines:
          </h3>
          <ul className="text-sm space-y-1 text-muted-foreground">
            <li>• Micro-influencer campaigns: ₹5,000-₹25,000</li>
            <li>• Mid-tier influencer campaigns: ₹25,000-₹75,000</li>
            <li>• Macro-influencer campaigns: ₹75,000-₹2,50,000</li>
            <li>• Celebrity campaigns: ₹2,50,000+</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return renderCompanyInfo();
      case 2:
        return renderContactInfo();
      case 3:
        return renderBrandDetails();
      case 4:
        return renderCampaignPreferences();
      default:
        return renderCompanyInfo();
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold mb-2">Create Your Brand Profile</h1>
            <p className="text-muted-foreground">
              Set up your brand profile to start collaborating with influencers
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
                      {step === 1 && "Company"}
                      {step === 2 && "Contact"}
                      {step === 3 && "Brand"}
                      {step === 4 && "Campaigns"}
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
                  window.location.href = '/document-verification?type=brand';
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

export default BrandProfileSetup;