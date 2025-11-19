import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import CampaignsLayout from "@/components/CampaignsLayout";
import Navigation from "@/components/Navigation";
import { cn } from "@/lib/utils";
import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { creators, Creator } from "@/data/creators";
import { Star, Instagram, MapPin, CheckCircle, X, ChevronLeft, ChevronRight } from "lucide-react";
import { campaignBriefSchema } from "@/lib/validation";

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
}

const OBJECTIVES = [
  { value: "awareness", label: "Awareness" },
  { value: "engagement", label: "Engagement" },
  { value: "website-visits", label: "Website Visits" },
  { value: "leads", label: "Leads" },
  { value: "sales", label: "Sales" },
];

const BRIEF_MIN_LENGTH = 120;

export default function CreateCampaignWizardPage() {
  const [searchParams] = useSearchParams();
  const [currentStep, setCurrentStep] = useState(1);
  const creatorGridRef = useRef<HTMLDivElement>(null);
  
  const [wizardState, setWizardState] = useState<WizardState>(() => {
    // Load from localStorage
    const saved = localStorage.getItem("campaignWizardState");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return {
          creatorId: null,
          creatorSummary: null,
          objective: "awareness",
          brief: "",
        };
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
        };
      }
    }
    
    return {
      creatorId: null,
      creatorSummary: null,
      objective: "awareness",
      brief: "",
    };
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
  const briefValidation = campaignBriefSchema.safeParse(wizardState.brief);
  const isStep2Valid = wizardState.objective && briefValidation.success;

  const handleNext = () => {
    if (currentStep === 1 && !isStep1Valid) return;
    if (currentStep === 2 && !isStep2Valid) return;
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
