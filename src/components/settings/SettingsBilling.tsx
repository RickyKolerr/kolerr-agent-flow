
import { useNavigate } from "react-router-dom";
import { useCredits } from "@/contexts/CreditContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CreditCard, ChevronRight } from "lucide-react";

export const SettingsBilling = () => {
  const navigate = useNavigate();
  const { hasPremiumPlan, premiumCredits } = useCredits();

  return (
    <div className="space-y-6">
      {/* Current Plan Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Current Plan
          </CardTitle>
          <CardDescription>
            Your current subscription and credit usage
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-medium text-lg">
                {hasPremiumPlan ? 'Premium Plan' : 'Free Plan'}
              </h3>
              <p className="text-sm text-muted-foreground">
                {hasPremiumPlan 
                  ? `${premiumCredits} credits remaining`
                  : '5 free searches per day'}
              </p>
            </div>
            <Button 
              variant="outline"
              className="gap-2"
              onClick={() => navigate('/dashboard/subscription')}
            >
              View Plans
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Payment Methods */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Methods</CardTitle>
          <CardDescription>
            Manage your payment methods and billing information
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            variant="outline"
            className="w-full justify-start gap-4"
            onClick={() => navigate('/dashboard/payment')}
          >
            <CreditCard className="h-4 w-4" />
            Manage Payment Methods
            <ChevronRight className="h-4 w-4 ml-auto" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
