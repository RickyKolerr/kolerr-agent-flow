
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

interface PlanChangeConfirmationProps {
  currentPlan: string;
  selectedPlan: string;
  currentBilling: string;
  newPrice: number;
  billingPeriod: 'monthly' | 'yearly';
  onCancel: () => void;
  onConfirm: () => void;
}

export const PlanChangeConfirmation = ({
  currentPlan,
  selectedPlan,
  currentBilling,
  newPrice,
  billingPeriod,
  onCancel,
  onConfirm,
}: PlanChangeConfirmationProps) => {
  // Calculate plan price difference logic
  const isNewUser = currentPlan === "Free";
  const planChangeType = isNewUser ? "Subscribe" : newPrice > 0 ? "Upgrade" : "Downgrade";
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
              <p className="font-medium">
                {isNewUser || newPrice > 0 ? (
                  <>New price: ${newPrice} / month</>
                ) : (
                  <>New price will apply at next billing cycle</>
                )}
              </p>
              <p className="text-sm text-muted-foreground">
                {isNewUser || newPrice > 0 ? "Effective immediately" : "No charge today"}
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
            {newPrice > 0 ? `Proceed to Payment` : actionText}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
