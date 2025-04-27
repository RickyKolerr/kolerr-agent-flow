
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";

interface PaymentSuccessProps {
  title?: string;
  description?: string;
  redirectPath?: string;
  redirectText?: string;
}

const PaymentSuccess = ({
  title = "Payment Successful!",
  description = "Your payment has been processed successfully.",
  redirectPath = "/dashboard/billing",
  redirectText = "Return to Billing"
}: PaymentSuccessProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [countdown, setCountdown] = useState(5);

  // Auto-redirect after countdown
  useEffect(() => {
    const timer = setTimeout(() => {
      if (countdown > 1) {
        setCountdown(countdown - 1);
      } else {
        navigate(redirectPath);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown, navigate, redirectPath]);

  // Extract any URL parameters (can be used for session_id or transaction details)
  const queryParams = new URLSearchParams(location.search);

  return (
    <div className="max-w-md mx-auto my-12">
      <Card className="border-green-500 shadow-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <CheckCircle2 className="h-10 w-10 text-green-500" />
          </div>
          <CardTitle className="text-2xl">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          {queryParams.get("session_id") && (
            <p className="text-sm text-muted-foreground">
              Transaction ID: {queryParams.get("session_id")}
            </p>
          )}
          <p className="mt-6 text-muted-foreground">
            You will be redirected in {countdown} seconds...
          </p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button 
            onClick={() => navigate(redirectPath)} 
            className="bg-brand-pink hover:bg-brand-pink/90"
          >
            {redirectText}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default PaymentSuccess;
