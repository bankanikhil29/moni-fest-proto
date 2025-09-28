import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Video, Phone, CheckCircle, Calendar, Clock, User, Shield, Camera, Mic, MicOff, VideoOff } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import Navigation from "@/components/Navigation";

const VideoVerification = () => {
  const [searchParams] = useSearchParams();
  const userType = searchParams.get('type') || 'influencer';
  
  const [callStatus, setCallStatus] = useState<'waiting' | 'connecting' | 'connected' | 'completed'>('waiting');
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isMicOn, setIsMicOn] = useState(true);
  const [verificationSteps, setVerificationSteps] = useState([
    { step: "Document Review", completed: false, current: false },
    { step: "Identity Confirmation", completed: false, current: false },
    { step: "Live Photo Verification", completed: false, current: false },
    { step: "Final Approval", completed: false, current: false }
  ]);

  const scheduledCall = {
    date: "Today",
    time: "3:00 PM - 3:15 PM",
    verifierName: "Priya Sharma",
    verifierRole: "Identity Verification Specialist"
  };

  useEffect(() => {
    // Simulate call progression
    if (callStatus === 'connecting') {
      const timer = setTimeout(() => {
        setCallStatus('connected');
        // Start verification steps
        updateVerificationStep(0);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [callStatus]);

  const updateVerificationStep = (stepIndex: number) => {
    setVerificationSteps(prev => prev.map((step, index) => ({
      ...step,
      completed: index < stepIndex,
      current: index === stepIndex
    })));
  };

  const startVideoCall = () => {
    setCallStatus('connecting');
  };

  const completeVerification = () => {
    setCallStatus('completed');
    setVerificationSteps(prev => prev.map(step => ({ ...step, completed: true, current: false })));
  };

  const renderWaitingScreen = () => (
    <div className="text-center space-y-6">
      <div className="bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto">
        <Video className="h-10 w-10 text-primary" />
      </div>
      
      <div>
        <h2 className="text-2xl font-bold mb-2">Video Verification Scheduled</h2>
        <p className="text-muted-foreground">
          Your documents have been reviewed. Please join the video call for final identity verification.
        </p>
      </div>

      <Card className="max-w-md mx-auto">
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-primary" />
              <div className="text-left">
                <div className="font-semibold">{scheduledCall.date}</div>
                <div className="text-sm text-muted-foreground">{scheduledCall.time}</div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <User className="h-5 w-5 text-primary" />
              <div className="text-left">
                <div className="font-semibold">{scheduledCall.verifierName}</div>
                <div className="text-sm text-muted-foreground">{scheduledCall.verifierRole}</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Alert>
        <Shield className="h-4 w-4" />
        <AlertDescription>
          <strong>Preparation Tips:</strong>
          <ul className="list-disc list-inside mt-2 text-sm">
            <li>Have your original documents ready</li>
            <li>Ensure good lighting and stable internet</li>
            <li>Find a quiet space for the call</li>
            <li>The verification will take 5-10 minutes</li>
          </ul>
        </AlertDescription>
      </Alert>

      <Button onClick={startVideoCall} size="lg" className="gap-2">
        <Video className="h-4 w-4" />
        Join Video Call
      </Button>
    </div>
  );

  const renderVideoCall = () => (
    <div className="space-y-6">
      {/* Video Call Interface */}
      <div className="relative bg-black rounded-lg overflow-hidden aspect-video max-w-2xl mx-auto">
        {callStatus === 'connecting' ? (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-900 text-white">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
              <p>Connecting to verifier...</p>
            </div>
          </div>
        ) : (
          <div className="relative h-full">
            {/* Verifier Video (main) */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <div className="text-center text-white">
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2">
                  <User className="h-10 w-10" />
                </div>
                <p className="font-semibold">{scheduledCall.verifierName}</p>
                <Badge variant="secondary" className="mt-2">Moni-Fest Verifier</Badge>
              </div>
            </div>
            
            {/* Your Video (picture-in-picture) */}
            <div className="absolute bottom-4 right-4 w-32 h-24 bg-gray-800 rounded-lg border-2 border-white/20 overflow-hidden">
              {isVideoOn ? (
                <div className="w-full h-full bg-gradient-to-br from-green-500 to-teal-600 flex items-center justify-center">
                  <User className="h-8 w-8 text-white" />
                </div>
              ) : (
                <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                  <VideoOff className="h-6 w-6 text-white/60" />
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Call Controls */}
      <div className="flex justify-center gap-4">
        <Button
          variant={isMicOn ? "default" : "destructive"}
          size="lg"
          onClick={() => setIsMicOn(!isMicOn)}
          className="gap-2"
        >
          {isMicOn ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
          {isMicOn ? 'Mute' : 'Unmute'}
        </Button>
        
        <Button
          variant={isVideoOn ? "default" : "destructive"}
          size="lg"
          onClick={() => setIsVideoOn(!isVideoOn)}
          className="gap-2"
        >
          {isVideoOn ? <Camera className="h-4 w-4" /> : <VideoOff className="h-4 w-4" />}
          {isVideoOn ? 'Turn Off Video' : 'Turn On Video'}
        </Button>
        
        <Button
          variant="destructive"
          size="lg"
          onClick={() => setCallStatus('waiting')}
          className="gap-2"
        >
          <Phone className="h-4 w-4" />
          End Call
        </Button>
      </div>

      {/* Verification Steps Progress */}
      {callStatus === 'connected' && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Verification Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {verificationSteps.map((step, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-semibold
                    ${step.completed ? 'bg-green-500 text-white' : 
                      step.current ? 'bg-primary text-primary-foreground' : 
                      'bg-muted text-muted-foreground'}`}
                  >
                    {step.completed ? <CheckCircle className="h-4 w-4" /> : index + 1}
                  </div>
                  <span className={`font-medium ${step.current ? 'text-primary' : step.completed ? 'text-green-600' : 'text-muted-foreground'}`}>
                    {step.step}
                  </span>
                  {step.current && (
                    <Badge variant="secondary" className="ml-auto">In Progress</Badge>
                  )}
                </div>
              ))}
            </div>
            
            {callStatus === 'connected' && (
              <div className="mt-6 text-center">
                <Button onClick={completeVerification}>
                  Complete Verification (Demo)
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );

  const renderCompletedScreen = () => (
    <div className="text-center space-y-6">
      <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-full w-24 h-24 mx-auto flex items-center justify-center">
        <CheckCircle className="h-12 w-12 text-green-600" />
      </div>
      
      <div>
        <h2 className="text-2xl font-bold mb-2 text-green-600">Verification Successful!</h2>
        <p className="text-muted-foreground">
          Your identity has been verified successfully. Your profile now has a verified badge.
        </p>
      </div>

      <Card className="max-w-md mx-auto bg-green-50/50 dark:bg-green-900/10">
        <CardContent className="pt-6">
          <div className="flex items-center justify-center gap-2 text-green-600 mb-4">
            <Shield className="h-5 w-5" />
            <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
              ✓ Verified Profile
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">
            You can now access all platform features and {userType === 'brand' ? 'connect with verified influencers' : 'apply for brand campaigns'}.
          </p>
        </CardContent>
      </Card>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to={`/verification-success?type=${userType}`}>
              <Button size="lg">
                Complete Verification
              </Button>
            </Link>
            <Link to={userType === 'brand' ? '/brand-dashboard' : '/creator-dashboard'}>
              <Button variant="outline" size="lg">
                Go to Dashboard
              </Button>
            </Link>
          </div>
    </div>
  );

  const renderCurrentView = () => {
    switch (callStatus) {
      case 'waiting':
        return renderWaitingScreen();
      case 'connecting':
      case 'connected':
        return renderVideoCall();
      case 'completed':
        return renderCompletedScreen();
      default:
        return renderWaitingScreen();
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold mb-2">Video Identity Verification</h1>
            <p className="text-muted-foreground">
              Complete your verification with a quick video call
            </p>
          </div>

          <Card>
            <CardContent className="p-6">
              {renderCurrentView()}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default VideoVerification;