import { Card, CardContent } from "@/components/ui/card";
import CampaignsLayout from "@/components/CampaignsLayout";
import Navigation from "@/components/Navigation";
import { cn } from "@/lib/utils";

const steps = [
  { id: 1, name: "Creator" },
  { id: 2, name: "Brief" },
  { id: 3, name: "Content" },
  { id: 4, name: "Budget" },
  { id: 5, name: "Targeting" },
  { id: 6, name: "Review" },
];

export default function CreateCampaignWizardPage() {
  const currentStep = 1;

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
          <Card>
            <CardContent className="py-12">
              <div className="text-center text-muted-foreground">
                <p className="text-lg">Wizard step content goes here</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </CampaignsLayout>
    </>
  );
}
