
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CreditCard, Timer } from "lucide-react";

interface PaymentConfirmationProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  planName: string;
  credits?: number;
  amount: number;
  isProcessing: boolean;
  isSubscription?: boolean;
  expirationDate?: string;
  billingPeriod?: 'monthly' | 'yearly';
}

export const PaymentConfirmation = ({
  open,
  onClose,
  onConfirm,
  planName,
  credits,
  amount,
  isProcessing,
  isSubscription = false,
  expirationDate,
  billingPeriod = 'monthly'
}: PaymentConfirmationProps) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Confirm Purchase</DialogTitle>
          <DialogDescription>
            Please review your purchase details before proceeding to payment.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="border rounded-lg p-4 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Package</span>
              <span className="font-medium">{planName}</span>
            </div>
            {credits && (
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Credits</span>
                <span className="font-medium">{credits}</span>
              </div>
            )}
            {isSubscription && billingPeriod && (
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Billing Period</span>
                <span className="font-medium capitalize">{billingPeriod}</span>
              </div>
            )}
            {expirationDate && !isSubscription && (
              <div className="flex justify-between items-center text-yellow-600">
                <span className="flex items-center">
                  <Timer className="h-4 w-4 mr-1" />
                  Expires on
                </span>
                <span className="font-medium">{expirationDate}</span>
              </div>
            )}
            <div className="flex justify-between items-center pt-2 border-t">
              <span className="font-medium">Total Amount</span>
              <span className="font-bold">${amount}{isSubscription ? `/${billingPeriod === 'yearly' ? 'year' : 'month'}` : ''}</span>
            </div>
          </div>
        </div>
        <DialogFooter className="flex space-x-2 sm:space-x-0">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            onClick={onConfirm}
            disabled={isProcessing}
            className="bg-brand-pink hover:bg-brand-pink/90"
          >
            <CreditCard className="mr-2 h-4 w-4" />
            {isProcessing ? "Processing..." : `Proceed to Payment`}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
