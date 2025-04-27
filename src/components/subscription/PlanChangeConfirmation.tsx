
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
  return (
    <div className="flex justify-center mt-8">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Info className="h-5 w-5 mr-2" />
            Change Subscription
          </CardTitle>
          <CardDescription>
            You are about to change your subscription plan
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center p-4 bg-muted rounded-md">
            <div>
              <p className="font-medium">From: {currentPlan} ({currentBilling})</p>
              <p className="text-sm text-muted-foreground">
                To: {selectedPlan} ({billingPeriod})
              </p>
            </div>
            <div className="text-right">
              <p className="font-medium">
                New price: ${newPrice} / month
              </p>
              <p className="text-sm text-muted-foreground">
                Effective immediately
              </p>
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
            Proceed to Payment
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
