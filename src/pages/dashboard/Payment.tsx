
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CreditCard, Lock, ShieldCheck, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { useNavigate, useLocation } from "react-router-dom";
import { useCredits } from "@/contexts/CreditContext";
import { PaymentConfirmation } from "@/components/PaymentConfirmation";

const PaymentPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isProcessing, setIsProcessing] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const { hasPremiumPlan } = useCredits();
  
  const searchParams = new URLSearchParams(location.search);
  const selectedPlanId = searchParams.get('plan') || (hasPremiumPlan ? "growth" : "starter");
  const currentPriceParam = searchParams.get('currentPrice');
  const currentPrice = currentPriceParam ? parseInt(currentPriceParam, 10) : (hasPremiumPlan ? 200 : 0);

  const plans = {
    starter: {
      name: "Starter",
      price: 100,
      period: "monthly",
      credits: 100
    },
    growth: {
      name: "Growth",
      price: 200,
      period: "monthly",
      credits: 500
    },
    pro: {
      name: "Pro",
      price: 400,
      period: "monthly",
      credits: 2000
    }
  };

  const selectedPlan = plans[selectedPlanId] || plans.growth;
  
  // Calculate the amount due (difference between plans for upgrades, 0 for downgrades)
  const calculateAmountDue = () => {
    const selectedPrice = selectedPlan.price;
    if (selectedPrice > currentPrice) {
      // Upgrade: charge the difference immediately
      return selectedPrice - currentPrice;
    } else {
      // Downgrade or same plan: no immediate charge
      return 0;
    }
  };

  const amountDue = calculateAmountDue();
  const isUpgrade = selectedPlan.price > currentPrice;
  const isDowngrade = selectedPlan.price < currentPrice && currentPrice > 0;
  const isNewSubscription = currentPrice === 0 && selectedPlan.price > 0;

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => (currentYear + i).toString());
  const months = [
    "01", "02", "03", "04", "05", "06", 
    "07", "08", "09", "10", "11", "12"
  ];

  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryMonth, setExpiryMonth] = useState("");
  const [expiryYear, setExpiryYear] = useState("");
  const [cvv, setCvv] = useState("");
  const [saveCard, setSaveCard] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!cardName || !cardNumber || !expiryMonth || !expiryYear || !cvv) {
      toast.error("Please fill in all fields");
      return;
    }
    
    setShowConfirmation(true);
  };

  const handleConfirmPayment = () => {
    setShowConfirmation(false);
    setIsProcessing(true);
    
    setTimeout(() => {
      setIsProcessing(false);
      navigate(`/dashboard/payment/success/subscription?plan=${selectedPlanId}`);
    }, 2000);
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];

    for (let i = 0; i < match.length; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(" ");
    } else {
      return value;
    }
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatCardNumber(e.target.value);
    setCardNumber(formattedValue);
  };

  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    if (value.length <= 4) {
      setCvv(value);
    }
  };

  return (
    <>
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold tracking-tight">Payment</h1>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
            <CardDescription>Review your subscription details</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center pb-4 border-b border-border">
              <div>
                <p className="font-medium">{selectedPlan.name} Plan ({selectedPlan.period})</p>
                <p className="text-sm text-muted-foreground">{selectedPlan.credits} search credits per month</p>
              </div>
              <p className="font-medium">${selectedPlan.price}</p>
            </div>
            
            {hasPremiumPlan && (
              <div className="flex justify-between items-center py-4 border-b border-border">
                <div>
                  <p className="font-medium">Current Plan</p>
                  <p className="text-sm text-muted-foreground">Your existing subscription</p>
                </div>
                <p className="font-medium">-${currentPrice}</p>
              </div>
            )}
            
            <div className="flex justify-between items-center py-4">
              <p>Subtotal</p>
              <p>${amountDue}</p>
            </div>
            
            <div className="flex justify-between items-center pt-4 border-t border-border text-lg">
              <p className="font-medium">Total</p>
              <p className="font-bold">${amountDue}</p>
            </div>
            
            {isUpgrade && (
              <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-md">
                <p className="text-sm text-green-700">
                  You're upgrading your plan. You'll be charged the difference of ${amountDue} now.
                  Your new monthly rate of ${selectedPlan.price} will apply starting from your next billing cycle.
                </p>
              </div>
            )}
            
            {isDowngrade && (
              <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
                <p className="text-sm text-blue-700">
                  You're downgrading your plan. No charges today. Your new rate of ${selectedPlan.price}/month will
                  apply starting from your next billing cycle.
                </p>
              </div>
            )}

            {isNewSubscription && (
              <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-md">
                <p className="text-sm text-green-700">
                  You're subscribing to the {selectedPlan.name} plan at ${selectedPlan.price}/month. 
                  Your subscription will begin immediately after payment.
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <CreditCard className="h-5 w-5 mr-2" />
              Payment Information
            </CardTitle>
            <CardDescription>Enter your payment details securely</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="cardName">Cardholder Name</Label>
                  <Input
                    id="cardName"
                    placeholder="Name as it appears on card"
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <div className="relative">
                    <Input
                      id="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      value={cardNumber}
                      onChange={handleCardNumberChange}
                      maxLength={19}
                      required
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      <div className="flex items-center space-x-1">
                        <div className="h-6 w-9 rounded bg-gray-200 flex items-center justify-center">
                          <span className="text-[10px] font-bold text-gray-600">VISA</span>
                        </div>
                        <div className="h-6 w-9 rounded bg-gray-200 flex items-center justify-center">
                          <span className="text-[10px] font-bold text-gray-600">MC</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Expiry Date</Label>
                    <div className="flex gap-2">
                      <Select value={expiryMonth} onValueChange={setExpiryMonth}>
                        <SelectTrigger>
                          <SelectValue placeholder="MM" />
                        </SelectTrigger>
                        <SelectContent>
                          {months.map((month) => (
                            <SelectItem key={month} value={month}>{month}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Select value={expiryYear} onValueChange={setExpiryYear}>
                        <SelectTrigger>
                          <SelectValue placeholder="YYYY" />
                        </SelectTrigger>
                        <SelectContent>
                          {years.map((year) => (
                            <SelectItem key={year} value={year}>{year}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cvv">CVV</Label>
                    <Input
                      id="cvv"
                      placeholder="123"
                      value={cvv}
                      onChange={handleCvvChange}
                      maxLength={4}
                      required
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2 pt-2">
                  <Checkbox id="saveCard" checked={saveCard} onCheckedChange={(checked) => setSaveCard(!!checked)} />
                  <Label htmlFor="saveCard" className="text-sm cursor-pointer">
                    Save card for future payments
                  </Label>
                </div>
              </div>

              <div className="pt-4 space-y-4">
                <div className="p-4 bg-gray-50 border rounded-md">
                  <div className="flex items-center text-sm gap-2">
                    <ShieldCheck className="h-5 w-5 text-green-600" />
                    <span className="font-medium">Secure Payment Processing</span>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Your payment information is encrypted and securely processed by Stripe, a PCI-DSS Level 1 certified payment processor.
                    Kolerr never stores your full card details.
                  </p>
                </div>
                
                <div className="text-sm text-muted-foreground flex items-center">
                  <Lock className="h-4 w-4 mr-1" />
                  <span>Your payment is protected with industry-standard SSL encryption.</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                type="button"
                variant="ghost"
                onClick={() => navigate("/dashboard/subscription")}
              >
                Back
              </Button>
              <Button
                type="submit"
                className="bg-brand-pink hover:bg-brand-pink/90"
                disabled={isProcessing || (isDowngrade && amountDue === 0)}
              >
                {isProcessing ? "Processing..." : 
                  isDowngrade ? "Confirm Plan Change" : 
                  `Pay $${amountDue}`}
              </Button>
            </CardFooter>
          </form>
        </Card>

        <div className="mt-6 text-center text-sm text-muted-foreground">
          By proceeding with payment, you agree to our <a href="/terms" className="underline">Terms of Service</a> and <a href="/privacy" className="underline">Privacy Policy</a>.
        </div>
      </div>

      <PaymentConfirmation
        open={showConfirmation}
        onClose={() => setShowConfirmation(false)}
        onConfirm={handleConfirmPayment}
        planName={selectedPlan.name}
        credits={selectedPlan.credits}
        amount={amountDue}
        isProcessing={isProcessing}
      />
    </>
  );
};

export default PaymentPage;
