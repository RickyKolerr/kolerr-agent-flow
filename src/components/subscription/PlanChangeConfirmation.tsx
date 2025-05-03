
import { Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface PlanChangeConfirmationProps {
  currentPlan: string;
  selectedPlan: string;
  currentBilling: string;
  currentPrice: number;
  newPrice: number;
  billingPeriod: 'monthly' | 'yearly';
  onCancel: () => void;
  onConfirm: () => void;
}

export const PlanChangeConfirmation = ({
  currentPlan,
  selectedPlan,
  currentBilling,
  currentPrice,
  newPrice,
  billingPeriod,
  onCancel,
  onConfirm,
}: PlanChangeConfirmationProps) => {
  // Calculate plan price difference and determine change type
  const isNewUser = currentPlan === "Free";
  const isUpgrade = newPrice > currentPrice;
  const isDowngrade = newPrice < currentPrice && !isNewUser;
  
  // Determine the right action text and messaging
  const planChangeType = isNewUser ? "Subscribe" : isUpgrade ? "Upgrade" : "Downgrade";
  const actionText = isNewUser ? "Start Subscription" : "Change Plan";
  
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
          <div className="flex justify-between items-center p-4 bg-muted rounded-md">
            <div>
              <p className="font-medium">From: {currentPlan} ({currentBilling})</p>
              <p className="text-sm text-muted-foreground">
                To: {selectedPlan} ({billingPeriod})
              </p>
            </div>
            <div className="text-right">
              {isNewUser && (
                <p className="font-medium">New price: ${newPrice} / month</p>
              )}
              {isUpgrade && !isNewUser && (
                <p className="font-medium">New price: ${newPrice} / month</p>
              )}
              {isDowngrade && (
                <p className="font-medium">New price: ${newPrice} / month</p>
              )}
            </div>
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
            {actionText}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
