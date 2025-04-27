
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ArrowRight } from "lucide-react";

interface PaymentSuccessProps {
  title?: string;
  description?: string;
  redirectPath?: string;
  redirectText?: string;
}

export const PaymentSuccess = ({ 
  title = "Payment Successful!", 
  description = "Your payment has been processed successfully.",
  redirectPath = "/dashboard/billing",
  redirectText = "View Billing Details"
}: PaymentSuccessProps) => {
  const navigate = useNavigate();

  useEffect(() => {
    // Auto-redirect after 5 seconds
    const timeout = setTimeout(() => {
      navigate(redirectPath);
    }, 5000);

    return () => clearTimeout(timeout);
  }, [navigate, redirectPath]);

  return (
    <div className="max-w-md mx-auto mt-8">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-center mb-4">
            <div className="rounded-full bg-green-100 p-3">
              <CheckCircle2 className="h-8 w-8 text-green-600" />
            </div>
          </div>
          <CardTitle className="text-center">{title}</CardTitle>
          <CardDescription className="text-center">{description}</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center">
          <Button 
            onClick={() => navigate(redirectPath)}
            className="bg-brand-pink hover:bg-brand-pink/90"
          >
            {redirectText} <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
