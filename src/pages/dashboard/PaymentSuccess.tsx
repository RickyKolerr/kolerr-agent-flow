
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileCheck, CreditCard } from "lucide-react";
import { toast } from "sonner";
import { useCredits } from "@/contexts/CreditContext";

const PaymentSuccessPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const planId = searchParams.get('plan');
  const { hasPremiumPlan } = useCredits();

  useEffect(() => {
    toast.success("Payment successful!", {
      description: "Your credits have been added to your account."
    });
  }, []);

  const plans = {
    starter: {
      name: "Starter",
      credits: 100
    },
    growth: {
      name: "Growth",
      credits: 500
    },
    pro: {
      name: "Pro",
      credits: 2000
    }
  };

  const selectedPlan = plans[planId as keyof typeof plans] || plans.growth;

  return (
    <div className="max-w-2xl mx-auto pt-8">
      <Card className="border-green-500">
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <FileCheck className="w-6 h-6 text-green-600" />
          </div>
          <CardTitle className="text-2xl text-green-600">Payment Successful!</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center space-y-2">
            <p className="text-lg">
              Thank you for your purchase of the {selectedPlan.name} plan
            </p>
            <p className="text-muted-foreground">
              {selectedPlan.credits} credits have been added to your account
            </p>
          </div>

          <div className="border rounded-lg p-4 bg-secondary/50">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span>Plan</span>
                <span className="font-medium">{selectedPlan.name}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Credits</span>
                <span className="font-medium">{selectedPlan.credits}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Status</span>
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Completed
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col space-y-3">
            <Button 
              onClick={() => navigate('/dashboard/credits')}
              className="bg-brand-pink hover:bg-brand-pink/90"
            >
              View My Credits
            </Button>
            <Button 
              variant="outline" 
              onClick={() => navigate('/dashboard')}
            >
              Return to Dashboard
            </Button>
          </div>

          <div className="text-center text-sm text-muted-foreground">
            <p>A receipt has been sent to your email address.</p>
            <p className="mt-1">
              Need help? <a href="/contact" className="text-brand-pink hover:underline">Contact support</a>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentSuccessPage;
