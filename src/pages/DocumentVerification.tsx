import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Upload, FileText, Camera, Shield, CheckCircle, AlertCircle, Eye } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import Navigation from "@/components/Navigation";

const DocumentVerification = () => {
  const [searchParams] = useSearchParams();
  const userTypeParam = searchParams.get('type');
  const userType = (userTypeParam === 'brand' || userTypeParam === 'influencer') ? userTypeParam : 'influencer';
  
  const [verificationData, setVerificationData] = useState({
    documentType: "",
    documentNumber: "",
    fullName: "",
    dateOfBirth: "",
    address: "",
    frontImage: null as File | null,
    backImage: null as File | null,
    selfieImage: null as File | null
  });

  const [uploadStatus, setUploadStatus] = useState<{[key: string]: string}>({});
  const [currentStep, setCurrentStep] = useState(1);

  const handleFileUpload = (type: 'front' | 'back' | 'selfie', file: File) => {
    setVerificationData(prev => ({
      ...prev,
      [`${type}Image`]: file
    }));
    setUploadStatus(prev => ({
      ...prev,
      [type]: 'uploaded'
    }));
  };

  const renderFileUploadCard = (
    type: 'front' | 'back' | 'selfie',
    title: string,
    description: string,
    icon: React.ReactNode
  ) => (
    <Card className="border-2 border-dashed border-muted-foreground/25 hover:border-primary/50 transition-colors">
      <CardContent className="p-6 text-center">
        <div className="mb-4">
          {icon}
        </div>
        <h3 className="font-semibold mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground mb-4">{description}</p>
        
        {uploadStatus[type] === 'uploaded' ? (
          <div className="flex items-center justify-center gap-2 text-green-600">
            <CheckCircle className="h-4 w-4" />
            <span className="text-sm font-medium">Uploaded</span>
          </div>
        ) : (
          <div>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleFileUpload(type, file);
              }}
              className="hidden"
              id={`${type}-upload`}
            />
            <Label htmlFor={`${type}-upload`} className="cursor-pointer">
              <Button variant="outline" size="sm" className="gap-2">
                <Upload className="h-4 w-4" />
                Upload Image
              </Button>
            </Label>
          </div>
        )}
      </CardContent>
    </Card>
  );

  const renderDocumentDetails = () => (
    <div className="space-y-6">
      <div>
        <Label htmlFor="documentType">Document Type *</Label>
        <Select
          value={verificationData.documentType}
          onValueChange={(value) => setVerificationData(prev => ({
            ...prev,
            documentType: value
          }))}
        >
          <SelectTrigger className="mt-1">
            <SelectValue placeholder="Select document type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="aadhaar">Aadhaar Card</SelectItem>
            <SelectItem value="pan">PAN Card</SelectItem>
            <SelectItem value="passport">Passport</SelectItem>
            <SelectItem value="driving-license">Driving License</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="documentNumber">
          {verificationData.documentType === 'aadhaar' && 'Aadhaar Number'}
          {verificationData.documentType === 'pan' && 'PAN Number'}
          {verificationData.documentType === 'passport' && 'Passport Number'}
          {verificationData.documentType === 'driving-license' && 'License Number'}
          {!verificationData.documentType && 'Document Number'} *
        </Label>
        <Input
          id="documentNumber"
          value={verificationData.documentNumber}
          onChange={(e) => setVerificationData(prev => ({
            ...prev,
            documentNumber: e.target.value
          }))}
          placeholder={
            verificationData.documentType === 'aadhaar' ? '1234 5678 9012' :
            verificationData.documentType === 'pan' ? 'ABCDE1234F' :
            'Enter document number'
          }
          className="mt-1"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="fullName">Full Name (as per document) *</Label>
          <Input
            id="fullName"
            value={verificationData.fullName}
            onChange={(e) => setVerificationData(prev => ({
              ...prev,
              fullName: e.target.value
            }))}
            placeholder="Full name"
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="dateOfBirth">Date of Birth *</Label>
          <Input
            id="dateOfBirth"
            type="date"
            value={verificationData.dateOfBirth}
            onChange={(e) => setVerificationData(prev => ({
              ...prev,
              dateOfBirth: e.target.value
            }))}
            className="mt-1"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="address">Address (as per document)</Label>
        <Input
          id="address"
          value={verificationData.address}
          onChange={(e) => setVerificationData(prev => ({
            ...prev,
            address: e.target.value
          }))}
          placeholder="Complete address"
          className="mt-1"
        />
      </div>
    </div>
  );

  const renderDocumentUpload = () => (
    <div className="space-y-6">
      <Alert>
        <Shield className="h-4 w-4" />
        <AlertDescription>
          Your documents are encrypted and stored securely. We use bank-level security to protect your personal information.
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {renderFileUploadCard(
          'front',
          'Document Front',
          'Upload clear image of document front side',
          <FileText className="h-8 w-8 text-primary mx-auto" />
        )}
        
        {(verificationData.documentType === 'aadhaar' || verificationData.documentType === 'driving-license') && 
          renderFileUploadCard(
            'back',
            'Document Back',
            'Upload clear image of document back side',
            <FileText className="h-8 w-8 text-primary mx-auto" />
          )
        }
      </div>

      {renderFileUploadCard(
        'selfie',
        'Live Selfie',
        'Take a clear selfie holding your document',
        <Camera className="h-8 w-8 text-primary mx-auto" />
      )}

      <div className="bg-muted/50 p-4 rounded-lg">
        <h4 className="font-semibold mb-2 flex items-center gap-2">
          <Eye className="h-4 w-4" />
          Document Guidelines:
        </h4>
        <ul className="text-sm space-y-1 text-muted-foreground">
          <li>• Ensure all text is clearly visible and not blurred</li>
          <li>• No shadows or glare on the document</li>
          <li>• Document should be flat and well-lit</li>
          <li>• Your face should be clearly visible in the selfie</li>
          <li>• Hold the document next to your face in the selfie</li>
        </ul>
      </div>
    </div>
  );

  const nextStep = () => {
    setCurrentStep(prev => Math.min(prev + 1, 3));
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const canProceedToNext = () => {
    if (currentStep === 1) {
      return verificationData.documentType && verificationData.documentNumber && 
             verificationData.fullName && verificationData.dateOfBirth;
    }
    if (currentStep === 2) {
      // Allow proceeding without document uploads - documents are optional
      return true;
    }
    return false;
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return renderDocumentDetails();
      case 2:
        return renderDocumentUpload();
      case 3:
        return (
          <div className="text-center space-y-6">
            <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-full w-20 h-20 mx-auto flex items-center justify-center">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Documents Submitted Successfully!</h3>
              <p className="text-muted-foreground">
                Your documents have been submitted for verification. You'll receive an email with the next steps.
              </p>
            </div>
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                <strong>Next Step:</strong> You'll receive a video call verification link within 24 hours to complete your identity verification.
              </AlertDescription>
            </Alert>
            <Link to={`/video-verification?type=${userType}`}>
              <Button size="lg">
                Continue to Video Verification
              </Button>
            </Link>
          </div>
        );
      default:
        return renderDocumentDetails();
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 text-center">
            <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-3xl font-bold mb-2">Identity Verification</h1>
            <p className="text-muted-foreground">
              Verify your identity to build trust with {userType === 'brand' ? 'influencers' : 'brands'} and unlock all features
            </p>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-center mb-8 overflow-x-auto">
            <div className="flex items-center space-x-4 min-w-max px-4">
              {[1, 2, 3].map((step) => (
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
                      {step === 1 && "Details"}
                      {step === 2 && "Upload"}
                      {step === 3 && "Complete"}
                    </div>
                  </div>
                  {step < 3 && (
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
            <CardHeader>
              <CardTitle>
                {currentStep === 1 && "Document Information"}
                {currentStep === 2 && "Upload Documents"}
                {currentStep === 3 && "Verification Complete"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {renderCurrentStep()}
            </CardContent>
          </Card>

          {/* Navigation Buttons */}
          {currentStep < 3 && (
            <div className="flex justify-between">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
              >
                Previous
              </Button>
              <div className="text-sm text-muted-foreground">
                Step {currentStep} of 3
              </div>
              <Button
                onClick={currentStep === 2 ? () => {
                  // Submit documents
                  console.log("Submitting documents:", verificationData);
                  setCurrentStep(3);
                } : nextStep}
                disabled={!canProceedToNext()}
              >
                {currentStep === 2 ? 'Submit Documents' : 'Next'}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DocumentVerification;