import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import CampaignsLayout from "@/components/CampaignsLayout";
import Navigation from "@/components/Navigation";
import { cn, formatINR } from "@/lib/utils";
import { useState, useEffect, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { creators, Creator } from "@/data/creators";
import { Star, Instagram, MapPin, CheckCircle, X, ChevronLeft, ChevronRight, Upload, Link as LinkIcon, IndianRupee, Target, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useCampaigns } from "@/contexts/CampaignStore";
import { validateContentFile, sanitizeFilename, createSafePreviewUrl } from "@/lib/file-validation";

const steps = [
  { id: 1, name: "Creator" },
  { id: 2, name: "Brief" },
  { id: 3, name: "Content" },
  { id: 4, name: "Budget" },
  { id: 5, name: "Targeting" },
  { id: 6, name: "Review" },
];

interface WizardState {
  creatorId: number | null;
  creatorSummary: {
    name: string;
    avatar: string;
    followers: string;
    categories: string[];
  } | null;
  objective: string;
  brief: string;
  contentType: 'upload' | 'link';
  contentFilePreview: string;
  contentLink: string;
  budgetINR: number;
  audiencePreset: 'India' | 'Metros' | 'Custom (coming soon)';
  platforms: string[];
}

const OBJECTIVES = [
  { value: "awareness", label: "Awareness" },
  { value: "engagement", label: "Engagement" },
  { value: "website-visits", label: "Website Visits" },
  { value: "leads", label: "Leads" },
  { value: "sales", label: "Sales" },
];

const BRIEF_MIN_LENGTH = 120;
const PLATFORM_OPTIONS = [
  "Instagram Reels",
  "Instagram Posts", 
  "LinkedIn UGC",
  "YouTube Shorts"
];

export default function CreateCampaignWizardPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const creatorGridRef = useRef<HTMLDivElement>(null);
  const contentUploadRef = useRef<HTMLInputElement>(null);
  const contentLinkRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const { addCampaign } = useCampaigns();
  
  const [wizardState, setWizardState] = useState<WizardState>(() => {
    const defaultState: WizardState = {
      creatorId: null,
      creatorSummary: null,
      objective: "awareness",
      brief: "",
      contentType: 'upload',
      contentFilePreview: "",
      contentLink: "",
      budgetINR: 0,
      audiencePreset: 'India',
      platforms: [],
    };

    // Load from localStorage and merge with defaults
    const saved = localStorage.getItem("campaignWizardState");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return { ...defaultState, ...parsed };
      } catch {
        return defaultState;
      }
    }
    
    // Check for URL parameter
    const creatorIdParam = searchParams.get("creatorId");
    if (creatorIdParam) {
      const creatorId = parseInt(creatorIdParam);
      const creator = creators.find(c => c.id === creatorId);
      if (creator) {
        return {
          ...defaultState,
          creatorId: creator.id,
          creatorSummary: {
            name: creator.name,
            avatar: creator.avatar,
            followers: creator.followers,
            categories: creator.categories,
          },
        };
      }
    }
    
    return defaultState;
  });

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem("campaignWizardState", JSON.stringify(wizardState));
  }, [wizardState]);

  const handleSelectCreator = (creator: Creator) => {
    setWizardState({
      ...wizardState,
      creatorId: creator.id,
      creatorSummary: {
        name: creator.name,
        avatar: creator.avatar,
        followers: creator.followers,
        categories: creator.categories,
      },
    });
  };

  const handleChangeCreator = () => {
    creatorGridRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const isStep1Valid = wizardState.creatorId !== null;
  const isStep2Valid = 
    wizardState.objective && 
    wizardState.brief.length >= BRIEF_MIN_LENGTH;
  const isStep3Valid = 
    (wizardState.contentType === 'upload' && wizardState.contentFilePreview) ||
    (wizardState.contentType === 'link' && wizardState.contentLink.trim().length > 0);
  const isStep4Valid = wizardState.budgetINR >= 1000;
  const isStep5Valid = wizardState.platforms.length > 0;

  const handleNext = () => {
    if (currentStep === 1 && !isStep1Valid) return;
    if (currentStep === 2 && !isStep2Valid) return;
    if (currentStep === 3 && !isStep3Valid) return;
    if (currentStep === 4 && !isStep4Valid) return;
    if (currentStep === 5 && !isStep5Valid) return;
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Validate file
    const validation = validateContentFile(file);
    if (!validation.isValid) {
      toast({
        title: "Invalid File",
        description: validation.error,
        variant: "destructive",
      });
      return;
    }

    // Sanitize filename
    const sanitizedFile = new File([file], sanitizeFilename(file.name), {
      type: file.type,
    });

    // Create safe preview URL
    const url = createSafePreviewUrl(sanitizedFile);
    if (!url) {
      toast({
        title: "Error",
        description: "Failed to create file preview.",
        variant: "destructive",
      });
      return;
    }

    setWizardState({ 
      ...wizardState, 
      contentFilePreview: file.type.startsWith('image/') || file.type.startsWith('video/') 
        ? url 
        : sanitizedFile.name 
    });
    
    toast({
      title: "File Uploaded",
      description: "Content file uploaded successfully.",
    });
  };

  const handleLaunchCampaign = () => {
    if (!wizardState.creatorSummary) return;

    const campaignId = addCampaign({
      creator: {
        id: String(wizardState.creatorId || 0),
        name: wizardState.creatorSummary.name,
        avatar: wizardState.creatorSummary.avatar,
        handle: `@${wizardState.creatorSummary.name.toLowerCase().replace(/\s+/g, '')}`,
      },
      objective: wizardState.objective,
      brief: wizardState.brief,
      contentType: wizardState.contentType,
      contentRef: wizardState.contentType === 'upload' ? wizardState.contentFilePreview : wizardState.contentLink,
      budgetINR: wizardState.budgetINR,
      audiencePreset: wizardState.audiencePreset,
      platforms: wizardState.platforms,
    });

    // Reset wizard state
    localStorage.removeItem("campaignWizardState");
    
    toast({
      title: "Campaign launched",
      description: "Your campaign is now active.",
    });

    navigate(`/campaigns/${campaignId}`);
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            {/* Selected Creator Chip */}
            {wizardState.creatorSummary && (
              <Card className="bg-primary/5 border-primary/20">
                <CardContent className="py-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={wizardState.creatorSummary.avatar} alt={wizardState.creatorSummary.name} />
                      <AvatarFallback>{wizardState.creatorSummary.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-foreground">{wizardState.creatorSummary.name}</h3>
                        <CheckCircle className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Instagram className="h-3 w-3" />
                        <span>{wizardState.creatorSummary.followers} followers</span>
                        <span>•</span>
                        <span>{wizardState.creatorSummary.categories.join(", ")}</span>
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleChangeCreator}
                    className="text-primary hover:text-primary"
                  >
                    Change
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Creator Grid */}
            <div ref={creatorGridRef}>
              <h2 className="text-2xl font-bold text-foreground mb-4">
                {wizardState.creatorId ? "Select a different creator" : "Select a creator"}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {creators.map((creator) => (
                  <Card
                    key={creator.id}
                    className={cn(
                      "hover:shadow-lg transition-all cursor-pointer",
                      wizardState.creatorId === creator.id && "ring-2 ring-primary shadow-lg"
                    )}
                    tabIndex={0}
                    role="button"
                    aria-pressed={wizardState.creatorId === creator.id}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        handleSelectCreator(creator);
                      }
                    }}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4 mb-4">
                        <Avatar className="h-16 w-16">
                          <AvatarImage src={creator.avatar} alt={creator.name} />
                          <AvatarFallback>{creator.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-foreground">{creator.name}</h3>
                            {creator.isVerified && (
                              <CheckCircle className="h-4 w-4 text-primary" />
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">{creator.handle}</p>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                            <MapPin className="h-3 w-3" />
                            <span>{creator.location}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 mb-3">
                        <Instagram className="h-4 w-4 text-muted-foreground" />
                        <span className="font-semibold text-foreground">{creator.followers}</span>
                        <span className="text-sm text-muted-foreground">followers</span>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {creator.categories.map((category) => (
                          <Badge key={category} variant="secondary">
                            {category}
                          </Badge>
                        ))}
                      </div>

                      <div className="space-y-2 mb-4 pb-4 border-b">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Reel Rate:</span>
                          <span className="font-semibold text-foreground">{creator.ratePerReel}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Post Rate:</span>
                          <span className="font-semibold text-foreground">{creator.ratePerPost}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-semibold text-foreground">{creator.rating}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {creator.completedProjects} projects
                        </span>
                      </div>

                      <Button
                        onClick={() => handleSelectCreator(creator)}
                        className="w-full"
                        variant={wizardState.creatorId === creator.id ? "default" : "outline"}
                      >
                        {wizardState.creatorId === creator.id ? "Selected" : "Select Creator"}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="max-w-2xl mx-auto space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">Campaign Objective & Brief</h2>
              <p className="text-muted-foreground">Define your campaign goals and creative brief</p>
            </div>

            <Card>
              <CardContent className="pt-6 space-y-6">
                {/* Objective */}
                <div className="space-y-2">
                  <Label htmlFor="objective" className="text-base font-semibold">
                    Campaign Objective *
                  </Label>
                  <Select
                    value={wizardState.objective}
                    onValueChange={(value) => 
                      setWizardState({ ...wizardState, objective: value })
                    }
                  >
                    <SelectTrigger id="objective">
                      <SelectValue placeholder="Select objective" />
                    </SelectTrigger>
                    <SelectContent>
                      {OBJECTIVES.map((obj) => (
                        <SelectItem key={obj.value} value={obj.value}>
                          {obj.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-muted-foreground">
                    Choose the primary goal for this campaign
                  </p>
                </div>

                {/* Brief */}
                <div className="space-y-2">
                  <Label htmlFor="brief" className="text-base font-semibold">
                    Creative Brief *
                  </Label>
                  <Textarea
                    id="brief"
                    value={wizardState.brief}
                    onChange={(e) => 
                      setWizardState({ ...wizardState, brief: e.target.value })
                    }
                    placeholder="Describe your product, key message, call-to-action, and any constraints or requirements for the creator..."
                    className="min-h-[200px] resize-none"
                  />
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-muted-foreground">
                      Provide details about the product, message, CTA, and any constraints
                    </p>
                    <span
                      className={cn(
                        "text-sm font-medium",
                        wizardState.brief.length < BRIEF_MIN_LENGTH
                          ? "text-destructive"
                          : "text-muted-foreground"
                      )}
                    >
                      {wizardState.brief.length} / {BRIEF_MIN_LENGTH}
                    </span>
                  </div>
                  {wizardState.brief.length > 0 && wizardState.brief.length < BRIEF_MIN_LENGTH && (
                    <p className="text-sm text-destructive">
                      Brief must be at least {BRIEF_MIN_LENGTH} characters
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 3:
        return (
          <div className="max-w-2xl mx-auto space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">Content Source</h2>
              <p className="text-muted-foreground">Provide reference content for the campaign</p>
            </div>

            <Card>
              <CardContent className="pt-6 space-y-6">
                {/* Content Type Radio */}
                <div className="space-y-3">
                  <Label className="text-base font-semibold">Content Type *</Label>
                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => {
                        setWizardState({ ...wizardState, contentType: 'upload', contentLink: '' });
                        setTimeout(() => contentUploadRef.current?.focus(), 100);
                      }}
                      className={cn(
                        "flex-1 p-4 rounded-lg border-2 transition-all text-left",
                        wizardState.contentType === 'upload'
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <Upload className="h-5 w-5" />
                        <div>
                          <div className="font-semibold">Upload</div>
                          <div className="text-sm text-muted-foreground">Upload a file</div>
                        </div>
                      </div>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setWizardState({ ...wizardState, contentType: 'link', contentFilePreview: '' });
                        setTimeout(() => contentLinkRef.current?.focus(), 100);
                      }}
                      className={cn(
                        "flex-1 p-4 rounded-lg border-2 transition-all text-left",
                        wizardState.contentType === 'link'
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <LinkIcon className="h-5 w-5" />
                        <div>
                          <div className="font-semibold">Link</div>
                          <div className="text-sm text-muted-foreground">Link to existing UGC</div>
                        </div>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Upload Input */}
                {wizardState.contentType === 'upload' && (
                  <div className="space-y-2">
                    <Label htmlFor="content-file">Upload File</Label>
                    <input
                      ref={contentUploadRef}
                      id="content-file"
                      type="file"
                      accept="image/*,video/*"
                      onChange={handleFileUpload}
                      className="block w-full text-sm text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
                    />
                    {wizardState.contentFilePreview && (
                      <div className="mt-4 p-4 border rounded-lg bg-muted/30">
                        {wizardState.contentFilePreview.startsWith('blob:') ? (
                          <div className="flex items-center gap-3">
                            <CheckCircle className="h-5 w-5 text-primary" />
                            <span className="text-sm">Preview: {wizardState.contentFilePreview.substring(0, 50)}...</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-3">
                            <CheckCircle className="h-5 w-5 text-primary" />
                            <span className="text-sm">{wizardState.contentFilePreview}</span>
                          </div>
                        )}
                      </div>
                    )}
                    {!isStep3Valid && wizardState.contentType === 'upload' && (
                      <p className="text-sm text-destructive" role="alert" aria-live="polite">
                        Please add a file
                      </p>
                    )}
                  </div>
                )}

                {/* Link Input */}
                {wizardState.contentType === 'link' && (
                  <div className="space-y-2">
                    <Label htmlFor="content-link">Content Link</Label>
                    <input
                      ref={contentLinkRef}
                      id="content-link"
                      type="url"
                      value={wizardState.contentLink}
                      onChange={(e) => 
                        setWizardState({ ...wizardState, contentLink: e.target.value })
                      }
                      placeholder="Paste a public URL to an existing post or asset"
                      className={cn(
                        "flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
                        !isStep3Valid && wizardState.contentType === 'link' ? "border-destructive" : "border-input"
                      )}
                      aria-invalid={!isStep3Valid && wizardState.contentType === 'link'}
                    />
                    <p className="text-sm text-muted-foreground">
                      Paste a public URL to an existing post or asset
                    </p>
                    {!isStep3Valid && wizardState.contentType === 'link' && (
                      <p className="text-sm text-destructive" role="alert" aria-live="polite">
                        Please add a link
                      </p>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        );

      case 4:
        return (
          <div className="max-w-2xl mx-auto space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">Campaign Budget</h2>
              <p className="text-muted-foreground">Set your budget for this campaign</p>
            </div>

            <Card>
              <CardContent className="pt-6 space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="budget" className="text-base font-semibold">
                    Budget (INR) *
                  </Label>
                  <div className="relative">
                    <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                      id="budget"
                      type="number"
                      min="1000"
                      step="100"
                      value={wizardState.budgetINR || ''}
                      onChange={(e) => 
                        setWizardState({ ...wizardState, budgetINR: parseInt(e.target.value) || 0 })
                      }
                      placeholder="Enter amount"
                      className={cn(
                        "flex h-12 w-full rounded-md border bg-background pl-10 pr-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
                        !isStep4Valid ? "border-destructive" : "border-input"
                      )}
                      aria-invalid={!isStep4Valid}
                    />
                  </div>
                  {wizardState.budgetINR > 0 && (
                    <p className="text-sm text-muted-foreground">
                      Budget: {formatINR(wizardState.budgetINR)}
                    </p>
                  )}
                  <p className="text-sm text-muted-foreground">
                    Min ₹1,000 recommended
                  </p>
                  {!isStep4Valid && wizardState.budgetINR > 0 && (
                    <p className="text-sm text-destructive" role="alert" aria-live="polite">
                      Budget must be at least ₹1,000
                    </p>
                  )}
                </div>

                {/* Quick Presets */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Quick Presets</Label>
                  <div className="flex gap-3">
                    {[1000, 5000, 10000].map((amount) => (
                      <Button
                        key={amount}
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => setWizardState({ ...wizardState, budgetINR: amount })}
                        className={cn(
                          wizardState.budgetINR === amount && "border-primary bg-primary/5"
                        )}
                      >
                        {formatINR(amount)}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 5:
        return (
          <div className="max-w-2xl mx-auto space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">Targeting</h2>
              <p className="text-muted-foreground">Define your audience and platform preferences</p>
            </div>

            <Card>
              <CardContent className="pt-6 space-y-6">
                {/* Audience Preset */}
                <div className="space-y-2">
                  <Label htmlFor="audience" className="text-base font-semibold flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Audience
                  </Label>
                  <Select
                    value={wizardState.audiencePreset}
                    onValueChange={(value: any) => 
                      setWizardState({ ...wizardState, audiencePreset: value })
                    }
                  >
                    <SelectTrigger id="audience">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="India">India</SelectItem>
                      <SelectItem value="Metros">Metros</SelectItem>
                      <SelectItem value="Custom (coming soon)" disabled>
                        Custom (coming soon)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-muted-foreground">
                    Select your target audience region
                  </p>
                </div>

                {/* Platforms */}
                <div className="space-y-3">
                  <Label className="text-base font-semibold flex items-center gap-2">
                    <Target className="h-4 w-4" />
                    Platforms *
                  </Label>
                  <div className="grid grid-cols-2 gap-3">
                    {PLATFORM_OPTIONS.map((platform) => (
                      <button
                        key={platform}
                        type="button"
                        onClick={() => {
                          const isSelected = wizardState.platforms.includes(platform);
                          setWizardState({
                            ...wizardState,
                            platforms: isSelected
                              ? wizardState.platforms.filter(p => p !== platform)
                              : [...wizardState.platforms, platform]
                          });
                        }}
                        className={cn(
                          "p-3 rounded-lg border-2 text-sm font-medium transition-all text-left",
                          wizardState.platforms.includes(platform)
                            ? "border-primary bg-primary/5 text-primary"
                            : "border-border hover:border-primary/50"
                        )}
                      >
                        {platform}
                      </button>
                    ))}
                  </div>
                  {!isStep5Valid && (
                    <p className="text-sm text-destructive" role="alert" aria-live="polite">
                      Please select at least one platform
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 6:
        return (
          <div className="max-w-3xl mx-auto space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">Review Campaign</h2>
              <p className="text-muted-foreground">Review your campaign details before launching</p>
            </div>

            <div className="space-y-4">
              {/* Creator */}
              {wizardState.creatorSummary && (
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="font-semibold text-lg mb-3">Creator</h3>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={wizardState.creatorSummary.avatar} alt={wizardState.creatorSummary.name} />
                        <AvatarFallback>{wizardState.creatorSummary.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">{wizardState.creatorSummary.name}</span>
                          <CheckCircle className="h-4 w-4 text-primary" />
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {wizardState.creatorSummary.followers} followers • {wizardState.creatorSummary.categories.join(", ")}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Brief */}
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-semibold text-lg mb-3">Campaign Brief</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Objective:</span>
                      <span className="font-medium capitalize">{wizardState.objective}</span>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground">Brief:</span>
                      <p className="text-sm mt-1 p-3 bg-muted/30 rounded-md">{wizardState.brief}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Content */}
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-semibold text-lg mb-3">Content</h3>
                  {wizardState.contentType === 'upload' && wizardState.contentFilePreview && (
                    <div className="flex items-center gap-2 text-sm">
                      <Upload className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Upload:</span>
                      <span className="font-medium">{wizardState.contentFilePreview.startsWith('blob:') ? 'File uploaded' : wizardState.contentFilePreview}</span>
                    </div>
                  )}
                  {wizardState.contentType === 'link' && wizardState.contentLink && (
                    <div className="flex items-center gap-2 text-sm">
                      <LinkIcon className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Link:</span>
                      <a href={wizardState.contentLink} target="_blank" rel="noopener noreferrer" className="font-medium text-primary hover:underline break-all">
                        {wizardState.contentLink}
                      </a>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Budget */}
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-semibold text-lg mb-3">Budget</h3>
                  <div className="flex items-center gap-2">
                    <IndianRupee className="h-5 w-5 text-muted-foreground" />
                    <span className="text-2xl font-bold text-foreground">{formatINR(wizardState.budgetINR)}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Targeting */}
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-semibold text-lg mb-3">Targeting</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Audience:</span>
                      <span className="font-medium">{wizardState.audiencePreset}</span>
                    </div>
                    <div className="flex items-start gap-2 text-sm">
                      <Target className="h-4 w-4 text-muted-foreground mt-0.5" />
                      <span className="text-muted-foreground">Platforms:</span>
                      <span className="font-medium">{wizardState.platforms.join(", ")}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Launch Button */}
              <Card className="bg-primary/5 border-primary/20">
                <CardContent className="pt-6">
                  <Button 
                    onClick={handleLaunchCampaign}
                    size="lg" 
                    className="w-full"
                  >
                    Launch Campaign
                  </Button>
                  <p className="text-xs text-center text-muted-foreground mt-3">
                    No backend connected yet — this will log the campaign state
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      default:
        return (
          <Card>
            <CardContent className="py-12">
              <div className="text-center text-muted-foreground">
                <p className="text-lg">Step {currentStep} content coming soon</p>
              </div>
            </CardContent>
          </Card>
        );
    }
  };

  return (
    <>
      <Navigation />
      <CampaignsLayout>
        <div className="space-y-6">
          {/* Header */}
          <h1 className="text-4xl font-bold text-foreground">Create Campaign</h1>

          {/* Stepper */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                {steps.map((step, index) => (
                  <div key={step.id} className="flex items-center flex-1">
                    <div className="flex flex-col items-center">
                      <div
                        className={cn(
                          "w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-colors",
                          currentStep === step.id
                            ? "bg-primary text-primary-foreground"
                            : currentStep > step.id
                            ? "bg-primary/20 text-primary"
                            : "bg-muted text-muted-foreground"
                        )}
                      >
                        {step.id}
                      </div>
                      <span
                        className={cn(
                          "mt-2 text-sm font-medium transition-colors",
                          currentStep === step.id
                            ? "text-primary"
                            : "text-muted-foreground"
                        )}
                      >
                        {step.name}
                      </span>
                    </div>
                    {index < steps.length - 1 && (
                      <div
                        className={cn(
                          "h-0.5 flex-1 mx-4 transition-colors",
                          currentStep > step.id ? "bg-primary" : "bg-muted"
                        )}
                      />
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Wizard Content */}
          {renderStepContent()}

          {/* Navigation Buttons */}
          <Card>
            <CardContent className="py-6 flex justify-between">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={currentStep === 1}
              >
                <ChevronLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <Button
                onClick={handleNext}
                disabled={
                  (currentStep === 1 && !isStep1Valid) ||
                  (currentStep === 2 && !isStep2Valid) ||
                  (currentStep === 3 && !isStep3Valid) ||
                  (currentStep === 4 && !isStep4Valid) ||
                  (currentStep === 5 && !isStep5Valid) ||
                  currentStep === steps.length
                }
              >
                {currentStep === steps.length ? "Complete" : "Next"}
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </CampaignsLayout>
    </>
  );
}
