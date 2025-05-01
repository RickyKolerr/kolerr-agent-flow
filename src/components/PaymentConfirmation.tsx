
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CreditCard, Package } from "lucide-react";

interface PaymentConfirmationProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  planName: string;
  credits: number;
  amount: number;
  isProcessing: boolean;
}

export const PaymentConfirmation = ({
  open,
  onClose,
  onConfirm,
  planName,
  credits,
  amount,
  isProcessing
}: PaymentConfirmationProps) => {
  // Calculate the value per credit
  const valuePerCredit = amount / credits;
  const savings = credits > amount ? Math.round((1 - (amount / credits)) * 100) : 0;
  
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Confirm Purchase</DialogTitle>
          <DialogDescription>
            Please review your purchase details before proceeding.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="border rounded-lg p-4 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Package</span>
              <span className="font-medium">{planName}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Credits</span>
              <span className="font-medium">{credits}</span>
            </div>
            {savings > 0 && (
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Value per credit</span>
                <span className="font-medium text-green-500">${valuePerCredit.toFixed(2)} <span className="text-xs">({savings}% savings)</span></span>
              </div>
            )}
            <div className="flex justify-between items-center pt-2 border-t">
              <span className="font-medium">Total Amount</span>
              <span className="font-bold">${amount}</span>
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
            {isProcessing ? "Processing..." : `Pay $${amount}`}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
