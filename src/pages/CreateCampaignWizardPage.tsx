import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import CampaignsLayout from "@/components/CampaignsLayout";
import Navigation from "@/components/Navigation";
import { cn } from "@/lib/utils";
import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { creators, Creator } from "@/data/creators";
import { Star, Instagram, MapPin, CheckCircle, X, ChevronLeft, ChevronRight, Upload, Link2, FileText, Video, Image as ImageIcon } from "lucide-react";
import { campaignBriefSchema } from "@/lib/validation";
import { useToast } from "@/hooks/use-toast";

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
  'Instagram Reels',
  'Instagram Posts',
  'LinkedIn UGC',
  'YouTube Shorts'
];

const BUDGET_PRESETS = [1000, 5000, 10000];

// Helper to format INR
const formatINR = (amount: number): string => {
  return `₹${amount.toLocaleString('en-IN')}`;
};

// Helper to validate URL (http/https only)
const isValidURL = (url: string): boolean => {
  if (!url.trim()) return false;
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
};

// Helper to validate file
const isValidFile = (file: File | null): boolean => {
  if (!file) return false;
  const validTypes = ['image/jpeg', 'image/png', 'video/mp4'];
  const maxSizeMB = 10;
  return validTypes.includes(file.type) && file.size <= maxSizeMB * 1024 * 1024;
};

export default function CreateCampaignWizardPage() {
  const [searchParams] = useSearchParams();
  const [currentStep, setCurrentStep] = useState(1);
  const creatorGridRef = useRef<HTMLDivElement>(null);
  const uploadInputRef = useRef<HTMLInputElement>(null);
  const linkInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewURL, setPreviewURL] = useState<string>("");
  
  const [wizardState, setWizardState] = useState<WizardState>(() => {
    // Load from localStorage with safe parsing
    const saved = localStorage.getItem("campaignWizardState");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return {
          ...parsed,
          // Ensure all new fields have defaults
          contentType: parsed.contentType || 'upload',
          contentFilePreview: parsed.contentFilePreview || '',
          contentLink: parsed.contentLink || '',
          budgetINR: parsed.budgetINR || 1000,
          audiencePreset: parsed.audiencePreset || 'India',
          platforms: parsed.platforms || []
        };
      } catch {
        // Fallback to defaults on parse error
      }
    }
    
    // Check for URL parameter
    const creatorIdParam = searchParams.get("creatorId");
    if (creatorIdParam) {
      const creatorId = parseInt(creatorIdParam);
      const creator = creators.find(c => c.id === creatorId);
      if (creator) {
        return {
          creatorId: creator.id,
          creatorSummary: {
            name: creator.name,
            avatar: creator.avatar,
            followers: creator.followers,
            categories: creator.categories,
          },
          objective: "awareness",
          brief: "",
          contentType: 'upload' as const,
          contentFilePreview: '',
          contentLink: '',
          budgetINR: 1000,
          audiencePreset: 'India' as const,
          platforms: []
        };
      }
    }
    
    return {
      creatorId: null,
      creatorSummary: null,
      objective: "awareness",
      brief: "",
      contentType: 'upload' as const,
      contentFilePreview: '',
      contentLink: '',
      budgetINR: 1000,
      audiencePreset: 'India' as const,
      platforms: []
    };
  });

  // Persist to localStorage with truncation safety
  useEffect(() => {
    try {
      const stateToPersist = {
        ...wizardState,
        // Truncate long fields before saving
        brief: wizardState.brief.slice(0, 1000),
        contentLink: wizardState.contentLink.slice(0, 500)
      };
      localStorage.setItem("campaignWizardState", JSON.stringify(stateToPersist));
    } catch (err) {
      console.error("Failed to save to localStorage:", err);
    }
  }, [wizardState]);

  // Cleanup preview URL on unmount or when file changes
  useEffect(() => {
    return () => {
      if (previewURL) {
        URL.revokeObjectURL(previewURL);
      }
    };
  }, [previewURL]);

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
  const briefValidation = campaignBriefSchema.safeParse(wizardState.brief);
  const isStep2Valid = wizardState.objective && briefValidation.success;
  
  // Step 3 validation: must have either uploaded file or valid link
  const isStep3Valid = 
    (wizardState.contentType === 'upload' && selectedFile && isValidFile(selectedFile)) ||
    (wizardState.contentType === 'link' && isValidURL(wizardState.contentLink));
  
  // Step 4 validation: budget >= 1000
  const isStep4Valid = 
    wizardState.budgetINR >= 1000 && 
    !isNaN(wizardState.budgetINR) && 
    isFinite(wizardState.budgetINR);
  
  // Step 5 validation: at least one platform selected
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
                        !briefValidation.success
                          ? "text-destructive"
                          : "text-muted-foreground"
                      )}
                    >
                      {wizardState.brief.length} / {BRIEF_MIN_LENGTH}
                    </span>
                  </div>
                  {!briefValidation.success && wizardState.brief.length > 0 && (
                    <p className="text-sm text-destructive">
                      {briefValidation.error.errors[0]?.message}
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
              <p className="text-muted-foreground">Upload a file or link to existing UGC</p>
            </div>

            <Card>
              <CardContent className="pt-6 space-y-6">
                {/* Content Type Radio */}
                <div className="space-y-3">
                  <Label className="text-base font-semibold">Content Type *</Label>
                  <RadioGroup
                    value={wizardState.contentType}
                    onValueChange={(value: 'upload' | 'link') => {
                      setWizardState({ ...wizardState, contentType: value });
                      // Auto-focus the relevant input
                      setTimeout(() => {
                        if (value === 'upload') {
                          uploadInputRef.current?.focus();
                        } else {
                          linkInputRef.current?.focus();
                        }
                      }, 100);
                    }}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="upload" id="upload" />
                      <Label htmlFor="upload" className="font-normal cursor-pointer">
                        Upload file
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="link" id="link" />
                      <Label htmlFor="link" className="font-normal cursor-pointer">
                        Link to existing UGC
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Upload Mode */}
                {wizardState.contentType === 'upload' && (
                  <div className="space-y-3">
                    <Label htmlFor="file-upload" className="text-base font-semibold">
                      Upload File *
                    </Label>
                    <div className="space-y-3">
                      <Input
                        ref={uploadInputRef}
                        id="file-upload"
                        type="file"
                        accept="image/jpeg,image/png,video/mp4"
                        onChange={(e) => {
                          const file = e.target.files?.[0] || null;
                          if (file) {
                            // Revoke previous preview URL
                            if (previewURL) {
                              URL.revokeObjectURL(previewURL);
                            }
                            
                            if (!isValidFile(file)) {
                              setSelectedFile(null);
                              setPreviewURL("");
                              setWizardState({ ...wizardState, contentFilePreview: "" });
                              return;
                            }
                            
                            setSelectedFile(file);
                            const url = URL.createObjectURL(file);
                            setPreviewURL(url);
                            setWizardState({ 
                              ...wizardState, 
                              contentFilePreview: file.name 
                            });
                          } else {
                            setSelectedFile(null);
                            setPreviewURL("");
                            setWizardState({ ...wizardState, contentFilePreview: "" });
                          }
                        }}
                        className="cursor-pointer"
                        aria-invalid={!!selectedFile && !isValidFile(selectedFile)}
                      />
                      <p className="text-sm text-muted-foreground">
                        Accepted: JPEG, PNG, MP4 (max 10 MB)
                      </p>
                      
                      {/* File validation error */}
                      {selectedFile && !isValidFile(selectedFile) && (
                        <p className="text-sm text-destructive">
                          Invalid file. Please upload JPEG, PNG, or MP4 under 10 MB.
                        </p>
                      )}
                      
                      {/* Preview */}
                      {previewURL && selectedFile && isValidFile(selectedFile) && (
                        <div className="border border-border rounded-lg p-4 space-y-2">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            {selectedFile.type.startsWith('image/') ? (
                              <ImageIcon className="h-4 w-4" />
                            ) : (
                              <Video className="h-4 w-4" />
                            )}
                            <span className="font-medium">{selectedFile.name}</span>
                            <span>({(selectedFile.size / (1024 * 1024)).toFixed(2)} MB)</span>
                          </div>
                          {selectedFile.type.startsWith('image/') ? (
                            <img 
                              src={previewURL} 
                              alt="Preview" 
                              className="max-w-full h-auto max-h-64 rounded object-contain bg-muted"
                            />
                          ) : (
                            <video 
                              src={previewURL} 
                              controls 
                              className="max-w-full h-auto max-h-64 rounded"
                            />
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Link Mode */}
                {wizardState.contentType === 'link' && (
                  <div className="space-y-3">
                    <Label htmlFor="content-link" className="text-base font-semibold">
                      Content URL *
                    </Label>
                    <Input
                      ref={linkInputRef}
                      id="content-link"
                      type="url"
                      placeholder="https://example.com/post"
                      value={wizardState.contentLink}
                      onChange={(e) => {
                        const value = e.target.value.trim().slice(0, 500);
                        setWizardState({ ...wizardState, contentLink: value });
                      }}
                      aria-invalid={!!wizardState.contentLink && !isValidURL(wizardState.contentLink)}
                    />
                    <p className="text-sm text-muted-foreground">
                      Paste a public URL to an existing post or asset
                    </p>
                    
                    {/* Link validation error */}
                    {wizardState.contentLink && !isValidURL(wizardState.contentLink) && (
                      <p className="text-sm text-destructive">
                        Please provide a valid public URL (http:// or https://)
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
              <h2 className="text-2xl font-bold text-foreground mb-2">Budget</h2>
              <p className="text-muted-foreground">Set your campaign budget in INR</p>
            </div>

            <Card>
              <CardContent className="pt-6 space-y-6">
                {/* Budget Input */}
                <div className="space-y-3">
                  <Label htmlFor="budget" className="text-base font-semibold">
                    Budget (INR) *
                  </Label>
                  <Input
                    id="budget"
                    type="number"
                    min="1000"
                    max="1000000"
                    value={wizardState.budgetINR || ''}
                    onChange={(e) => {
                      const value = parseInt(e.target.value) || 0;
                      const clamped = Math.min(Math.max(value, 0), 1000000);
                      setWizardState({ ...wizardState, budgetINR: clamped });
                    }}
                    placeholder="Enter amount"
                    aria-invalid={!isStep4Valid}
                  />
                  <p className="text-sm text-muted-foreground">
                    Min ₹1,000 recommended
                  </p>
                  
                  {/* Budget validation error */}
                  {wizardState.budgetINR > 0 && !isStep4Valid && (
                    <p className="text-sm text-destructive">
                      Budget must be at least ₹1,000
                    </p>
                  )}
                </div>

                {/* Quick Presets */}
                <div className="space-y-3">
                  <Label className="text-base font-semibold">Quick Presets</Label>
                  <div className="flex gap-3 flex-wrap">
                    {BUDGET_PRESETS.map((preset) => (
                      <Button
                        key={preset}
                        type="button"
                        variant="outline"
                        onClick={() => setWizardState({ ...wizardState, budgetINR: preset })}
                        className={cn(
                          wizardState.budgetINR === preset && "bg-primary/10 border-primary"
                        )}
                      >
                        {formatINR(preset)}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Budget Readout */}
                {isStep4Valid && (
                  <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                    <p className="text-sm text-muted-foreground mb-1">Campaign Budget</p>
                    <p className="text-2xl font-bold text-foreground">
                      {formatINR(wizardState.budgetINR)}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        );

      case 5:
        return (
          <div className="max-w-2xl mx-auto space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">Targeting</h2>
              <p className="text-muted-foreground">Select audience and platforms</p>
            </div>

            <Card>
              <CardContent className="pt-6 space-y-6">
                {/* Audience Preset */}
                <div className="space-y-3">
                  <Label htmlFor="audience" className="text-base font-semibold">
                    Audience Preset *
                  </Label>
                  <Select
                    value={wizardState.audiencePreset}
                    onValueChange={(value: 'India' | 'Metros' | 'Custom (coming soon)') =>
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
                    Choose your target audience location
                  </p>
                </div>

                {/* Platforms */}
                <div className="space-y-3">
                  <Label className="text-base font-semibold">Platforms * (select at least 1)</Label>
                  <div className="space-y-3">
                    {PLATFORM_OPTIONS.map((platform) => (
                      <div key={platform} className="flex items-center space-x-2">
                        <Checkbox
                          id={platform}
                          checked={wizardState.platforms.includes(platform)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setWizardState({
                                ...wizardState,
                                platforms: [...wizardState.platforms, platform]
                              });
                            } else {
                              setWizardState({
                                ...wizardState,
                                platforms: wizardState.platforms.filter(p => p !== platform)
                              });
                            }
                          }}
                        />
                        <Label 
                          htmlFor={platform} 
                          className="font-normal cursor-pointer"
                        >
                          {platform}
                        </Label>
                      </div>
                    ))}
                  </div>
                  
                  {/* Platform validation error */}
                  {!isStep5Valid && (
                    <p className="text-sm text-destructive">
                      Please select at least one platform
                    </p>
                  )}
                </div>

                {/* Selected Summary */}
                {isStep5Valid && (
                  <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 space-y-2">
                    <p className="text-sm font-semibold text-foreground">Selected Platforms</p>
                    <div className="flex gap-2 flex-wrap">
                      {wizardState.platforms.map((platform) => (
                        <Badge key={platform} variant="secondary">
                          {platform}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        );

      case 6:
        return (
          <div className="max-w-3xl mx-auto space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">Review Campaign</h2>
              <p className="text-muted-foreground">Review all details before launching</p>
            </div>

            <Card>
              <CardContent className="pt-6 space-y-6">
                {/* Creator */}
                {wizardState.creatorSummary && (
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-foreground">Creator</h3>
                    <div className="flex items-center gap-3 bg-muted/50 p-3 rounded-lg">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={wizardState.creatorSummary.avatar} alt={wizardState.creatorSummary.name} />
                        <AvatarFallback>{wizardState.creatorSummary.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold text-foreground">{wizardState.creatorSummary.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {wizardState.creatorSummary.followers} followers • {wizardState.creatorSummary.categories.join(", ")}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Objective & Brief */}
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-foreground">Campaign Objective</h3>
                  <p className="text-foreground bg-muted/50 p-3 rounded-lg capitalize">
                    {wizardState.objective.replace('-', ' ')}
                  </p>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-foreground">Creative Brief</h3>
                  <p className="text-foreground bg-muted/50 p-3 rounded-lg whitespace-pre-wrap">
                    {wizardState.brief}
                  </p>
                </div>

                {/* Content */}
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-foreground">Content Source</h3>
                  <div className="bg-muted/50 p-3 rounded-lg">
                    {wizardState.contentType === 'upload' ? (
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <span className="text-foreground">Upload: {wizardState.contentFilePreview || 'File selected'}</span>
                      </div>
                    ) : (
                      <div className="flex items-start gap-2">
                        <Link2 className="h-4 w-4 text-muted-foreground mt-0.5" />
                        <span className="text-foreground break-all">Link: {wizardState.contentLink}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Budget */}
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-foreground">Budget</h3>
                  <p className="text-2xl font-bold text-primary bg-muted/50 p-3 rounded-lg">
                    {formatINR(wizardState.budgetINR)}
                  </p>
                </div>

                {/* Targeting */}
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-foreground">Targeting</h3>
                  <div className="bg-muted/50 p-3 rounded-lg space-y-2">
                    <p className="text-foreground">
                      <span className="font-medium">Audience:</span> {wizardState.audiencePreset}
                    </p>
                    <div>
                      <p className="font-medium text-foreground mb-2">Platforms:</p>
                      <div className="flex gap-2 flex-wrap">
                        {wizardState.platforms.map((platform) => (
                          <Badge key={platform} variant="secondary">
                            {platform}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Launch Button */}
                <Button
                  className="w-full"
                  size="lg"
                  onClick={() => {
                    console.log("Campaign Launch Data:", wizardState);
                    toast({
                      title: "Campaign Captured!",
                      description: "Campaign data logged to console. No backend yet.",
                    });
                  }}
                >
                  Launch Campaign
                </Button>
              </CardContent>
            </Card>
          </div>
        );

      default:
        return null;
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
