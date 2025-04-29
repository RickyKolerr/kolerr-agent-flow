
import { Info, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useIsMobile } from "@/hooks/use-mobile";

interface PlanChangeConfirmationProps {
  currentPlan: string;
  selectedPlan: string;
  currentBilling: string;
  newPrice: number;
  billingPeriod: 'monthly' | 'yearly';
  onCancel: () => void;
  onConfirm: () => void;
  currentPlanPrice?: number; // Add optional currentPlanPrice
}

export const PlanChangeConfirmation = ({
  currentPlan,
  selectedPlan,
  currentBilling,
  newPrice,
  billingPeriod,
  onCancel,
  onConfirm,
  currentPlanPrice = 0, // Default to 0 if not provided
}: PlanChangeConfirmationProps) => {
  const isMobile = useIsMobile();
  
  // Calculate plan price difference logic
  const isNewUser = currentPlan === "Free";
  const isUpgrade = !isNewUser && newPrice > currentPlanPrice;
  const isDowngrade = !isNewUser && newPrice < currentPlanPrice;
  const planChangeType = isNewUser ? "Subscribe" : isUpgrade ? "Upgrade" : "Downgrade";
  const actionText = isNewUser ? "Start Subscription" : "Change Plan";
  
  // Calculate the difference amount for upgrade/downgrade
  const diffAmount = isNewUser ? newPrice : Math.abs(newPrice - currentPlanPrice);
  
  return (
    <div className="flex justify-center mt-8">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Info className="h-5 w-5 mr-2" />
            {planChangeType} Subscription
          </CardTitle>
          <CardDescription>
            You are about to {planChangeType.toLowerCase()} your subscription plan
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 bg-muted rounded-md gap-4">
            <div>
              <p className="font-medium">From: {currentPlan} ({currentBilling})</p>
              <p className="text-sm text-muted-foreground">
                To: {selectedPlan} ({billingPeriod})
              </p>
            </div>
            <div className={isMobile ? "" : "text-right"}>
              <p className="font-medium">
                {isNewUser ? (
                  <>New price: ${newPrice} / {billingPeriod}</>
                ) : isUpgrade ? (
                  <>Amount due today: ${diffAmount}</>
                ) : (
                  <>New price: ${newPrice} / {billingPeriod}</>
                )}
              </p>
              <p className="text-sm text-muted-foreground">
                {isNewUser || isUpgrade ? "Effective immediately" : "At next billing cycle"}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 p-3 bg-gray-50 border border-gray-200 rounded-md">
            <ShieldCheck className="h-5 w-5 text-green-600 flex-shrink-0" />
            <p className="text-sm text-gray-600">
              Payments are securely processed by Stripe. Your financial information is encrypted and never stored on our servers.
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="ghost" onClick={onCancel}>
            Cancel
          </Button>
          <Button 
            className="bg-brand-pink hover:bg-brand-pink/90"
            onClick={onConfirm}
          >
            {isUpgrade ? `Pay $${diffAmount} Now` : actionText}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
