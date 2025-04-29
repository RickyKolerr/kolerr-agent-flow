
import { useNavigate } from "react-router-dom";
import { useCredits } from "@/contexts/CreditContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard, ChevronRight, Settings } from "lucide-react";
import { toast } from "sonner";

export const SettingsBilling = () => {
  const navigate = useNavigate();
  const { hasPremiumPlan, premiumCredits } = useCredits();

  const handleSubscriptionAction = (action: 'cancel') => {
    toast.info("Cancelling your subscription...", {
      description: "Your subscription will remain active until the end of your billing period."
    });
    navigate('/dashboard/subscription?action=cancel');
  };

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
          <div className="space-y-4">
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
            
            <div className="flex flex-col gap-2">
              {hasPremiumPlan ? (
                <>
                  <Button 
                    variant="outline"
                    onClick={() => navigate('/dashboard/subscription')}
                    className="justify-between"
                  >
                    <span>Change Plan</span>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => handleSubscriptionAction('cancel')}
                    className="text-red-500 hover:text-red-600 hover:bg-red-50 justify-between"
                  >
                    <span>Cancel Subscription</span>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </>
              ) : (
                <Button 
                  variant="outline"
                  onClick={() => navigate('/dashboard/subscription')}
                  className="justify-between"
                >
                  <span>Upgrade to Premium</span>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              )}
            </div>
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

      {/* Billing Preferences */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Billing Preferences
          </CardTitle>
          <CardDescription>
            Configure your billing notifications and preferences
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            variant="outline"
            className="w-full justify-start gap-4"
            onClick={() => navigate('/dashboard/settings/billing/preferences')}
          >
            <Settings className="h-4 w-4" />
            Manage Billing Preferences
            <ChevronRight className="h-4 w-4 ml-auto" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
