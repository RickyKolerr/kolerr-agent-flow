
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useCredits } from "@/contexts/CreditContext";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

interface CurrentPlanProps {
  currentPlan: {
    id: string;
    name: string;
    billing: string;
    nextRenewal: string;
  };
}

export const CurrentPlanCard = ({ currentPlan }: CurrentPlanProps) => {
  const navigate = useNavigate();
  const { hasPremiumPlan, premiumCredits } = useCredits();

  const handleCancelSubscription = () => {
    toast.success("Your subscription has been cancelled", {
      description: "Your subscription will remain active until the end of your billing period."
    });
    navigate('/dashboard/settings');
  };

  return (
    <Card className="bg-muted/30">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div className="space-y-1">
            <div className="flex items-center">
              <h3 className="text-lg font-medium">Your Current Plan: {currentPlan.name}</h3>
              <Badge variant="outline" className="ml-2 bg-brand-pink/10 text-brand-pink border-brand-pink/20">
                {currentPlan.billing.charAt(0).toUpperCase() + currentPlan.billing.slice(1)}
              </Badge>
            </div>
            {hasPremiumPlan ? (
              <p className="text-muted-foreground text-sm">
                Next renewal: {currentPlan.nextRenewal} • {premiumCredits} premium credits remaining
              </p>
            ) : (
              <p className="text-muted-foreground text-sm">
                Free tier • 5 daily searches • Resets at 7:00 AM daily
              </p>
            )}
          </div>
          {hasPremiumPlan && (
            <Button 
              variant="outline" 
              className="mt-4 md:mt-0"
              onClick={handleCancelSubscription}
            >
              Cancel Subscription
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
