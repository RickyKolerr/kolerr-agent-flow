
import { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useCredits } from "@/contexts/CreditContext";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

interface PaymentFormProps {
  amount: number;
  productName: string;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export const PaymentForm = ({ amount, productName, onSuccess, onCancel }: PaymentFormProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      return;
    }

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      return;
    }

    setIsProcessing(true);
    setPaymentError(null);

    try {
      // In a real application, you would create a payment intent on your server
      // This is just a demonstration of the client-side UI flow
      
      // Simulate a network request
      await new Promise(resolve => setTimeout(resolve, 1500));

      // For demo purposes, we'll just simulate a successful payment 80% of the time
      const success = Math.random() > 0.2;

      if (success) {
        toast.success("Payment successful!", {
          description: `You've purchased ${productName}`,
        });
        if (onSuccess) {
          onSuccess();
        } else {
          navigate("/dashboard/credits");
        }
      } else {
        setPaymentError("Payment failed. Please try again or use a different card.");
        toast.error("Payment failed", {
          description: "Please try again or use a different payment method.",
        });
      }
    } catch (error) {
      setPaymentError(error instanceof Error ? error.message : "An unknown error occurred");
      toast.error("Payment processing error", {
        description: error instanceof Error ? error.message : "An unknown error occurred",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <label htmlFor="card-element" className="block text-sm font-medium">
          Credit or debit card
        </label>
        <div className="border rounded-md p-3">
          <CardElement
            id="card-element"
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#424770',
                  '::placeholder': {
                    color: '#aab7c4',
                  },
                },
                invalid: {
                  color: '#9e2146',
                },
              },
            }}
          />
        </div>
        {paymentError && (
          <p className="text-sm text-red-500 mt-1">{paymentError}</p>
        )}
      </div>

      <div className="flex flex-col space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">
            Amount to be charged
          </span>
          <span className="font-medium">
            ${(amount / 100).toFixed(2)}
          </span>
        </div>
        
        {user?.email && (
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              Receipt email
            </span>
            <span className="font-medium">
              {user.email}
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
        {onCancel && (
          <Button 
            type="button" 
            variant="outline" 
            onClick={onCancel}
            disabled={isProcessing}
          >
            Cancel
          </Button>
        )}
        <Button 
          type="submit" 
          disabled={!stripe || isProcessing}
          className="bg-brand-pink hover:bg-brand-pink/90"
        >
          {isProcessing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            `Pay $${(amount / 100).toFixed(2)}`
          )}
        </Button>
      </div>
      
      <div className="mt-4 text-center text-xs text-muted-foreground">
        <p>Your payment information is secure. We use SSL encryption.</p>
        <p className="mt-1">By making this purchase you agree to our <a href="/terms" className="underline hover:text-primary">Terms of Service</a>.</p>
      </div>
    </form>
  );
};
