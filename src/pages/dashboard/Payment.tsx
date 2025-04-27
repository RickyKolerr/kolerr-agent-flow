
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { StripeProvider } from "@/providers/StripeProvider";
import { PaymentForm } from "@/components/PaymentForm";

const PaymentPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isProcessing, setIsProcessing] = useState(false);

  // Get plan details from location state or use default
  const selectedPlan = location.state?.plan || {
    name: "Professional",
    price: 99,
    period: "monthly",
    credits: 500
  };

  // Calculate amount in cents
  const amount = selectedPlan.price * 100;

  const handlePaymentSuccess = () => {
    navigate("/dashboard/billing");
  };

  const handleCancel = () => {
    navigate("/dashboard/subscription");
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Payment</h1>
      </div>

      {/* Payment summary */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Order Summary</CardTitle>
          <CardDescription>Review your subscription details</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center pb-4 border-b border-border">
            <div>
              <p className="font-medium">{selectedPlan.name} Plan ({selectedPlan.period})</p>
              <p className="text-sm text-muted-foreground">{selectedPlan.credits} credits per month</p>
            </div>
            <p className="font-medium">${selectedPlan.price}</p>
          </div>
          <div className="flex justify-between items-center py-4">
            <p>Subtotal</p>
            <p>${selectedPlan.price}</p>
          </div>
          <div className="flex justify-between items-center pt-4 border-t border-border text-lg">
            <p className="font-medium">Total</p>
            <p className="font-bold">${selectedPlan.price}</p>
          </div>
        </CardContent>
      </Card>

      {/* Payment form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Lock className="h-5 w-5 mr-2" />
            Payment Information
          </CardTitle>
          <CardDescription>Enter your payment details securely</CardDescription>
        </CardHeader>
        <CardContent>
          <StripeProvider>
            <PaymentForm 
              amount={amount}
              productName={`${selectedPlan.name} Plan (${selectedPlan.period})`}
              onSuccess={handlePaymentSuccess}
              onCancel={handleCancel}
            />
          </StripeProvider>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentPage;
