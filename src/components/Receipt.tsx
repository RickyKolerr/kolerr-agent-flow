
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Receipt as ReceiptIcon } from "lucide-react";

interface ReceiptProps {
  receiptNumber: string;
  date: string;
  amount: number;
  planName: string;
  credits: number;
  onDownload?: () => void;
}

export const Receipt = ({
  receiptNumber,
  date,
  amount,
  planName,
  credits,
  onDownload
}: ReceiptProps) => {
  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="border-b">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl flex items-center gap-2">
            <ReceiptIcon className="h-5 w-5" />
            Receipt #{receiptNumber}
          </CardTitle>
          {onDownload && (
            <Button variant="outline" onClick={onDownload} size="sm">
              Download PDF
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-6 pt-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-medium">Date</h3>
            <p className="text-muted-foreground">{date}</p>
          </div>
          <div className="text-right">
            <h3 className="font-medium">Amount</h3>
            <p className="text-2xl font-bold">${amount.toFixed(2)}</p>
          </div>
        </div>

        <div className="border-t border-b py-4 space-y-3">
          <div className="flex justify-between">
            <span>{planName} Plan</span>
            <span>${amount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-muted-foreground">
            <span>Credits Included</span>
            <span>{credits} credits</span>
          </div>
          <div className="flex justify-between font-medium pt-2 border-t">
            <span>Total</span>
            <span>${amount.toFixed(2)}</span>
          </div>
        </div>

        <div className="text-sm text-muted-foreground">
          <p>Payment processed by Stripe</p>
          <p className="mt-1">This is a digital receipt. No signature is required.</p>
        </div>
      </CardContent>
    </Card>
  );
};
