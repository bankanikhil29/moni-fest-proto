import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Calendar, MessageCircle, Eye, Download } from "lucide-react";
import Navigation from "@/components/Navigation";
import { useParams } from "react-router-dom";

const creatorData = {
  1: {
    name: "Sarah Chen",
    handle: "@sarahcreates",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face"
  }
};

export default function PaymentSuccess() {
  const { id } = useParams();
  const creator = creatorData[Number(id) as keyof typeof creatorData];

  if (!creator) {
    return <div>Creator not found</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-20">
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              {/* Success Animation */}
              <div className="mb-8">
                <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-12 h-12 text-green-600" />
                </div>
                <h1 className="text-3xl font-bold text-green-800 mb-2">Payment Successful!</h1>
                <p className="text-lg text-muted-foreground">
                  Your booking with {creator.name} has been confirmed
                </p>
              </div>

              {/* Creator Info */}
              <Card className="card-soft mb-8">
                <CardContent className="p-6">
                  <div className="flex items-center justify-center gap-4 mb-4">
                    <img
                      src={creator.avatar}
                      alt={creator.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <h2 className="text-xl font-semibold">{creator.name}</h2>
                      <p className="text-muted-foreground">{creator.handle}</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    You'll receive a confirmation email shortly with all the project details.
                  </p>
                </CardContent>
              </Card>

              {/* Next Steps */}
              <Card className="card-soft mb-8">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-6">What happens next?</h3>
                  <div className="space-y-4 text-left">
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-semibold">
                        1
                      </div>
                      <div>
                        <h4 className="font-semibold">Creator Notification</h4>
                        <p className="text-sm text-muted-foreground">
                          {creator.name} will be notified and will review your project details within 24 hours.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-semibold">
                        2
                      </div>
                      <div>
                        <h4 className="font-semibold">Project Discussion</h4>
                        <p className="text-sm text-muted-foreground">
                          The creator may reach out to discuss specific details and timeline.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-semibold">
                        3
                      </div>
                      <div>
                        <h4 className="font-semibold">Content Creation</h4>
                        <p className="text-sm text-muted-foreground">
                          Work begins on your content according to the agreed timeline.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-semibold">
                        4
                      </div>
                      <div>
                        <h4 className="font-semibold">Review & Approval</h4>
                        <p className="text-sm text-muted-foreground">
                          You'll review the final content and request any revisions before approval.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="grid md:grid-cols-2 gap-4 mb-8">
                <Button variant="coral" className="w-full">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Message {creator.name}
                </Button>
                <Button variant="outline" className="w-full">
                  <Eye className="w-4 h-4 mr-2" />
                  View Project Details
                </Button>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-8">
                <Button variant="outline" className="w-full">
                  <Calendar className="w-4 h-4 mr-2" />
                  Track Progress
                </Button>
                <Button variant="outline" className="w-full">
                  <Download className="w-4 h-4 mr-2" />
                  Download Receipt
                </Button>
              </div>

              {/* Support */}
              <Card className="card-soft border-blue-200 bg-blue-50/50">
                <CardContent className="p-4">
                  <h3 className="font-semibold text-blue-800 mb-2">Need Help?</h3>
                  <p className="text-sm text-blue-700 mb-3">
                    Our support team is here to help ensure your project goes smoothly.
                  </p>
                  <Button variant="outline" size="sm" className="border-blue-300 text-blue-800 hover:bg-blue-100">
                    Contact Support
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}