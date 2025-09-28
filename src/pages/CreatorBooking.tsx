import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Calendar, DollarSign, Shield, CheckCircle, Clock, FileText } from "lucide-react";
import Navigation from "@/components/Navigation";
import { useParams } from "react-router-dom";
import { useState } from "react";

const creatorData = {
  1: {
    name: "Sarah Chen",
    handle: "@sarahcreates",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
    services: [
      { name: "Instagram Reel", price: 150, description: "15-30 second engaging reel with trending audio" },
      { name: "Instagram Post", price: 100, description: "High-quality photo post with caption" },
      { name: "Story Series", price: 75, description: "3-5 Instagram stories showcasing your product" },
      { name: "YouTube Integration", price: 200, description: "Product placement in YouTube video" }
    ]
  }
};

export default function CreatorBooking() {
  const { id } = useParams();
  const creator = creatorData[Number(id) as keyof typeof creatorData];
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [projectDetails, setProjectDetails] = useState({
    projectTitle: "",
    projectDescription: "",
    timeline: "",
    additionalRequirements: ""
  });

  if (!creator) {
    return <div>Creator not found</div>;
  }

  const handleServiceToggle = (serviceName: string) => {
    setSelectedServices(prev => 
      prev.includes(serviceName) 
        ? prev.filter(s => s !== serviceName)
        : [...prev, serviceName]
    );
  };

  const getTotalPrice = () => {
    return creator.services
      .filter(service => selectedServices.includes(service.name))
      .reduce((total, service) => total + service.price, 0);
  };

  const platformFee = Math.round(getTotalPrice() * 0.05); // 5% platform fee
  const escrowFee = Math.round(getTotalPrice() * 0.025); // 2.5% escrow fee
  const totalAmount = getTotalPrice() + platformFee + escrowFee;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-20">
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {/* Header */}
              <div className="flex items-center gap-4 mb-8">
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => window.history.back()}
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Profile
                </Button>
                <div className="flex items-center gap-3">
                  <img
                    src={creator.avatar}
                    alt={creator.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h1 className="text-2xl font-bold">Book {creator.name}</h1>
                    <p className="text-muted-foreground">{creator.handle}</p>
                  </div>
                </div>
              </div>

              <div className="grid lg:grid-cols-3 gap-8">
                {/* Booking Form */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Service Selection */}
                  <Card className="card-soft">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-primary" />
                        Select Services
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {creator.services.map((service, index) => (
                          <div key={index} className="border rounded-lg p-4 hover:border-primary/50 transition-colors">
                            <div className="flex items-start gap-3">
                              <Checkbox 
                                checked={selectedServices.includes(service.name)}
                                onCheckedChange={() => handleServiceToggle(service.name)}
                                className="mt-1"
                              />
                              <div className="flex-1">
                                <div className="flex justify-between items-start mb-2">
                                  <h3 className="font-semibold">{service.name}</h3>
                                  <span className="text-lg font-bold text-primary">${service.price}</span>
                                </div>
                                <p className="text-sm text-muted-foreground">{service.description}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Project Details */}
                  <Card className="card-soft">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <FileText className="w-5 h-5 text-primary" />
                        Project Details
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label htmlFor="project-title">Project Title</Label>
                        <Input 
                          id="project-title"
                          placeholder="e.g., Summer Fashion Collection Launch"
                          value={projectDetails.projectTitle}
                          onChange={(e) => setProjectDetails(prev => ({ ...prev, projectTitle: e.target.value }))}
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="project-description">Project Description</Label>
                        <Textarea 
                          id="project-description"
                          placeholder="Describe your project, brand message, target audience, and any specific requirements..."
                          rows={4}
                          value={projectDetails.projectDescription}
                          onChange={(e) => setProjectDetails(prev => ({ ...prev, projectDescription: e.target.value }))}
                        />
                      </div>

                      <div>
                        <Label htmlFor="timeline">Preferred Timeline</Label>
                        <Select onValueChange={(value) => setProjectDetails(prev => ({ ...prev, timeline: value }))}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select timeline" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="asap">ASAP (Rush order +20%)</SelectItem>
                            <SelectItem value="1-week">Within 1 week</SelectItem>
                            <SelectItem value="2-weeks">Within 2 weeks</SelectItem>
                            <SelectItem value="1-month">Within 1 month</SelectItem>
                            <SelectItem value="flexible">Flexible</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="additional-requirements">Additional Requirements</Label>
                        <Textarea 
                          id="additional-requirements"
                          placeholder="Any specific hashtags, mentions, style preferences, or deliverables..."
                          rows={3}
                          value={projectDetails.additionalRequirements}
                          onChange={(e) => setProjectDetails(prev => ({ ...prev, additionalRequirements: e.target.value }))}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Order Summary */}
                <div className="space-y-6">
                  <Card className="card-soft sticky top-24">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <DollarSign className="w-5 h-5 text-primary" />
                        Order Summary
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {selectedServices.length === 0 ? (
                          <p className="text-muted-foreground text-center py-4">
                            Select services to see pricing
                          </p>
                        ) : (
                          <>
                            {creator.services
                              .filter(service => selectedServices.includes(service.name))
                              .map((service, index) => (
                                <div key={index} className="flex justify-between">
                                  <span className="text-sm">{service.name}</span>
                                  <span className="font-medium">${service.price}</span>
                                </div>
                              ))}
                            
                            <div className="border-t pt-4 space-y-2">
                              <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Subtotal</span>
                                <span>${getTotalPrice()}</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Platform Fee (5%)</span>
                                <span>${platformFee}</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Escrow Fee (2.5%)</span>
                                <span>${escrowFee}</span>
                              </div>
                              <div className="border-t pt-2 flex justify-between font-bold text-lg">
                                <span>Total</span>
                                <span className="text-primary">${totalAmount}</span>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Escrow Info */}
                  <Card className="card-soft border-green-200 bg-green-50/50">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <Shield className="w-5 h-5 text-green-600 mt-0.5" />
                        <div>
                          <h3 className="font-semibold text-green-800 mb-1">Secure Escrow Payment</h3>
                          <p className="text-sm text-green-700">
                            Your payment is held securely until project completion. 
                            Funds are released to the creator only after you approve the work.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Process Timeline */}
                  <Card className="card-soft">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Clock className="w-5 h-5 text-primary" />
                        What happens next?
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-start gap-3">
                          <div className="w-6 h-6 rounded-full bg-primary text-white text-xs flex items-center justify-center mt-0.5">1</div>
                          <div>
                            <h4 className="font-medium">Payment & Escrow</h4>
                            <p className="text-sm text-muted-foreground">Secure payment held in escrow</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-6 h-6 rounded-full bg-primary text-white text-xs flex items-center justify-center mt-0.5">2</div>
                          <div>
                            <h4 className="font-medium">Creator Acceptance</h4>
                            <p className="text-sm text-muted-foreground">Creator reviews and accepts project</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-6 h-6 rounded-full bg-primary text-white text-xs flex items-center justify-center mt-0.5">3</div>
                          <div>
                            <h4 className="font-medium">Content Creation</h4>
                            <p className="text-sm text-muted-foreground">Creator produces your content</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-6 h-6 rounded-full bg-primary text-white text-xs flex items-center justify-center mt-0.5">4</div>
                          <div>
                            <h4 className="font-medium">Review & Release</h4>
                            <p className="text-sm text-muted-foreground">You approve and payment is released</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Button 
                    className="w-full" 
                    variant="coral" 
                    size="lg"
                    disabled={selectedServices.length === 0}
                    onClick={() => window.location.href = `/payment/${id}?amount=${totalAmount}&services=${selectedServices.join(',')}`}
                  >
                    <DollarSign className="w-4 h-4 mr-2" />
                    Proceed to Payment (${totalAmount})
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}