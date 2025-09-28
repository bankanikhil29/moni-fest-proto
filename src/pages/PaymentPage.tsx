import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, CreditCard, Shield, Lock, CheckCircle, AlertCircle, Calendar, DollarSign } from "lucide-react";
import Navigation from "@/components/Navigation";
import { useParams, useSearchParams } from "react-router-dom";
import { useState } from "react";

const creatorData = {
  1: {
    name: "Sarah Chen",
    handle: "@sarahcreates",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face"
  }
};

export default function PaymentPage() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const creator = creatorData[Number(id) as keyof typeof creatorData];
  const amount = searchParams.get('amount') || '0';
  const services = searchParams.get('services')?.split(',') || [];
  
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    cvc: '',
    name: '',
    country: '',
    zip: ''
  });

  if (!creator) {
    return <div>Creator not found</div>;
  }

  const handlePayment = () => {
    // Simulate payment processing
    setTimeout(() => {
      window.location.href = `/payment-success/${id}`;
    }, 2000);
  };

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
                  Back to Booking
                </Button>
                <div>
                  <h1 className="text-2xl font-bold">Secure Payment</h1>
                  <p className="text-muted-foreground">Complete your booking with {creator.name}</p>
                </div>
              </div>

              <div className="grid lg:grid-cols-3 gap-8">
                {/* Payment Form */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Payment Method */}
                  <Card className="card-soft">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <CreditCard className="w-5 h-5 text-primary" />
                        Payment Method
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-3 gap-4 mb-6">
                        <button
                          className={`p-4 border rounded-lg text-center transition-colors ${
                            paymentMethod === 'card' 
                              ? 'border-primary bg-primary/5' 
                              : 'border-border hover:border-primary/50'
                          }`}
                          onClick={() => setPaymentMethod('card')}
                        >
                          <CreditCard className="w-6 h-6 mx-auto mb-2" />
                          <span className="text-sm font-medium">Card</span>
                        </button>
                        <button
                          className={`p-4 border rounded-lg text-center transition-colors ${
                            paymentMethod === 'paypal' 
                              ? 'border-primary bg-primary/5' 
                              : 'border-border hover:border-primary/50'
                          }`}
                          onClick={() => setPaymentMethod('paypal')}
                        >
                          <div className="w-6 h-6 mx-auto mb-2 bg-blue-600 rounded text-white text-xs flex items-center justify-center">PP</div>
                          <span className="text-sm font-medium">PayPal</span>
                        </button>
                        <button
                          className={`p-4 border rounded-lg text-center transition-colors ${
                            paymentMethod === 'crypto' 
                              ? 'border-primary bg-primary/5' 
                              : 'border-border hover:border-primary/50'
                          }`}
                          onClick={() => setPaymentMethod('crypto')}
                        >
                          <div className="w-6 h-6 mx-auto mb-2 bg-orange-500 rounded text-white text-xs flex items-center justify-center">₿</div>
                          <span className="text-sm font-medium">Crypto</span>
                        </button>
                      </div>

                      {paymentMethod === 'card' && (
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="card-number">Card Number</Label>
                            <Input 
                              id="card-number"
                              placeholder="1234 5678 9012 3456"
                              value={cardDetails.number}
                              onChange={(e) => setCardDetails(prev => ({ ...prev, number: e.target.value }))}
                            />
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="expiry">Expiry Date</Label>
                              <Input 
                                id="expiry"
                                placeholder="MM/YY"
                                value={cardDetails.expiry}
                                onChange={(e) => setCardDetails(prev => ({ ...prev, expiry: e.target.value }))}
                              />
                            </div>
                            <div>
                              <Label htmlFor="cvc">CVC</Label>
                              <Input 
                                id="cvc"
                                placeholder="123"
                                value={cardDetails.cvc}
                                onChange={(e) => setCardDetails(prev => ({ ...prev, cvc: e.target.value }))}
                              />
                            </div>
                          </div>

                          <div>
                            <Label htmlFor="cardholder-name">Cardholder Name</Label>
                            <Input 
                              id="cardholder-name"
                              placeholder="John Doe"
                              value={cardDetails.name}
                              onChange={(e) => setCardDetails(prev => ({ ...prev, name: e.target.value }))}
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="country">Country</Label>
                              <Select onValueChange={(value) => setCardDetails(prev => ({ ...prev, country: value }))}>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select country" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="us">United States</SelectItem>
                                  <SelectItem value="ca">Canada</SelectItem>
                                  <SelectItem value="uk">United Kingdom</SelectItem>
                                  <SelectItem value="de">Germany</SelectItem>
                                  <SelectItem value="fr">France</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div>
                              <Label htmlFor="zip">ZIP Code</Label>
                              <Input 
                                id="zip"
                                placeholder="12345"
                                value={cardDetails.zip}
                                onChange={(e) => setCardDetails(prev => ({ ...prev, zip: e.target.value }))}
                              />
                            </div>
                          </div>
                        </div>
                      )}

                      {paymentMethod === 'paypal' && (
                        <div className="text-center py-8">
                          <div className="w-16 h-16 bg-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                            <span className="text-white font-bold text-lg">PP</span>
                          </div>
                          <p className="text-muted-foreground">You'll be redirected to PayPal to complete your payment securely.</p>
                        </div>
                      )}

                      {paymentMethod === 'crypto' && (
                        <div className="text-center py-8">
                          <div className="w-16 h-16 bg-orange-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                            <span className="text-white font-bold text-lg">₿</span>
                          </div>
                          <p className="text-muted-foreground">Choose from Bitcoin, Ethereum, or other supported cryptocurrencies.</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {/* Security Notice */}
                  <Card className="card-soft border-green-200 bg-green-50/50">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <Shield className="w-5 h-5 text-green-600 mt-0.5" />
                        <div>
                          <h3 className="font-semibold text-green-800 mb-2">Your payment is protected</h3>
                          <ul className="text-sm text-green-700 space-y-1">
                            <li className="flex items-center gap-2">
                              <Lock className="w-3 h-3" />
                              256-bit SSL encryption
                            </li>
                            <li className="flex items-center gap-2">
                              <Shield className="w-3 h-3" />
                              Secure escrow service
                            </li>
                            <li className="flex items-center gap-2">
                              <CheckCircle className="w-3 h-3" />
                              Full refund protection
                            </li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Order Summary */}
                <div className="space-y-6">
                  <Card className="card-soft sticky top-24">
                    <CardHeader>
                      <CardTitle>Order Summary</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-3 mb-4 pb-4 border-b">
                        <img
                          src={creator.avatar}
                          alt={creator.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div>
                          <h3 className="font-semibold">{creator.name}</h3>
                          <p className="text-sm text-muted-foreground">{creator.handle}</p>
                        </div>
                      </div>

                      <div className="space-y-3 mb-4">
                        <h4 className="font-medium">Selected Services:</h4>
                        {services.map((service, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                            <span className="text-sm">{service}</span>
                          </div>
                        ))}
                      </div>

                      <div className="border-t pt-4 text-2xl font-bold text-primary text-center">
                        Total: ${amount}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Important Notice */}
                  <Card className="card-soft border-amber-200 bg-amber-50/50">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5" />
                        <div>
                          <h3 className="font-semibold text-amber-800 mb-1">Important</h3>
                          <p className="text-sm text-amber-700">
                            Payment will be held in escrow until project completion. 
                            You can request revisions before approving final delivery.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Button 
                    className="w-full" 
                    variant="coral" 
                    size="lg"
                    onClick={handlePayment}
                  >
                    <Lock className="w-4 h-4 mr-2" />
                    Complete Secure Payment
                  </Button>

                  <p className="text-xs text-muted-foreground text-center">
                    By completing this payment, you agree to our Terms of Service and Privacy Policy.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}