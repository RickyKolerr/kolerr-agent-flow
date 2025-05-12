
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreditCard, Lock, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { useNavigate, useLocation } from "react-router-dom";
import { useCredits } from "@/contexts/CreditContext";

const PaymentPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isProcessing, setIsProcessing] = useState(false);
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

  const handleCheckout = () => {
    setIsProcessing(true);
    
    // In a real implementation, this would call your backend to create a Stripe checkout session
    toast.loading("Preparing checkout with Stripe...");
    
    // Simulate API call delay
    setTimeout(() => {
      // Mock redirect to Stripe checkout page
      toast.success("Redirecting to Stripe checkout...");
      
      // In production, you would call your backend API, which would return a Stripe checkout URL
      const mockStripeCheckoutUrl = `https://checkout.stripe.com/c/pay/cs_test_${Math.random().toString(36).substring(2, 15)}`;
      
      // Redirect to Stripe checkout
      window.open(mockStripeCheckoutUrl, "_blank");
      
      // Navigate to success page after a delay (simulating successful payment)
      setTimeout(() => {
        navigate(`/dashboard/payment/success/subscription?plan=${selectedPlanId}`);
      }, 1000);
      
      setIsProcessing(false);
    }, 1500);
  };

  return (
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
            Payment with Stripe
          </CardTitle>
          <CardDescription>Secure payment processing by Stripe</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-4 bg-gray-50 border rounded-md">
            <div className="flex items-center text-sm gap-2">
              <ShieldCheck className="h-5 w-5 text-green-600" />
              <span className="font-medium">Secure Payment Processing</span>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              You'll be redirected to Stripe's secure payment page to complete your transaction. 
              Stripe is a PCI-DSS Level 1 certified payment processor ensuring your payment information is handled securely.
            </p>
          </div>
          
          <div className="text-sm text-muted-foreground flex items-center">
            <Lock className="h-4 w-4 mr-1" />
            <span>Your payment is protected with industry-standard SSL encryption.</span>
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
            type="button"
            className="bg-brand-pink hover:bg-brand-pink/90"
            disabled={isProcessing || (isDowngrade && amountDue === 0)}
            onClick={handleCheckout}
          >
            {isProcessing ? "Processing..." : 
              isDowngrade ? "Confirm Plan Change" : 
              `Proceed to Stripe Checkout`}
          </Button>
        </CardFooter>
      </Card>

      <div className="mt-6 text-center text-sm text-muted-foreground">
        By proceeding with payment, you agree to our <a href="/terms" className="underline">Terms of Service</a> and <a href="/privacy" className="underline">Privacy Policy</a>.
      </div>
    </div>
  );
};

export default PaymentPage;
