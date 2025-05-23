
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, CreditCard, Timer } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCredits } from "@/contexts/CreditContext";
import { PaymentConfirmation } from "@/components/PaymentConfirmation";
import { formatExpirationDate, getExpirationDate } from "@/hooks/useSearchCredits";

interface CreditPackage {
  id: string;
  name: string;
  credits: number;
  price: number;
  description: string;
  popular?: boolean;
  valuePerCredit?: number;
}

const creditPackages: CreditPackage[] = [
  {
    id: "basic-pack",
    name: "Basic Pack",
    credits: 20,
    price: 20,
    valuePerCredit: 1.00,
    description: "Perfect for trying out our premium features"
  },
  {
    id: "standard-pack",
    name: "Standard Pack",
    credits: 60,
    price: 50,
    valuePerCredit: 0.83,
    description: "Great value for occasional users",
    popular: true
  },
  {
    id: "premium-pack",
    name: "Premium Pack",
    credits: 130,
    price: 100,
    valuePerCredit: 0.77,
    description: "Ideal for regular campaign creators"
  },
  {
    id: "pro-pack",
    name: "Pro Pack",
    credits: 300,
    price: 200,
    valuePerCredit: 0.67,
    description: "Best value for power users and agencies"
  }
];

export function CreditPackages() {
  const navigate = useNavigate();
  const { premiumCredits, hasPremiumPlan } = useCredits();
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    // Clear selection when navigating to the page
    setSelectedPackage(null);
  }, []);

  const handleSelectPackage = (packageId: string) => {
    setSelectedPackage(packageId);
  };

  const handlePurchase = () => {
    if (!selectedPackage) return;
    setShowPaymentDialog(true);
  };

  const handleConfirmPayment = () => {
    setIsProcessing(true);
    // Simulate Stripe redirect
    setTimeout(() => {
      setIsProcessing(false);
      setShowPaymentDialog(false);
      // In a real implementation, this would redirect to Stripe checkout
      navigate(`/dashboard/payment?type=credits&package=${selectedPackage}`);
    }, 1000);
  };

  const getRecommendedPackage = () => {
    if (premiumCredits < 20) {
      return "standard-pack"; // Recommend standard for users with low credits
    } else if (premiumCredits < 100) {
      return "premium-pack"; // Recommend premium for users with medium credits
    } else {
      return "pro-pack"; // Recommend pro for users with high credits
    }
  };

  // Get the selected package details for the payment confirmation
  const selectedPackageDetails = selectedPackage ? 
    creditPackages.find(pkg => pkg.id === selectedPackage) : 
    null;

  return (
    <>
      <div className="mb-4">
        {hasPremiumPlan && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <h3 className="font-medium text-green-700 flex items-center">
              <Package className="h-5 w-5 mr-2" />
              Subscription Savings
            </h3>
            <p className="text-sm text-green-600 mt-1">
              As a subscriber, you already get the best per-credit value. One-time packages are great for extra needs beyond your monthly allocation.
            </p>
          </div>
        )}
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {creditPackages.map((pkg) => {
          const isSelected = selectedPackage === pkg.id;
          const isRecommended = !selectedPackage && pkg.id === getRecommendedPackage();

          return (
            <Card 
              key={pkg.id}
              className={`relative cursor-pointer transition-all ${
                isSelected ? 'border-brand-pink shadow-lg ring-2 ring-brand-pink' : 
                isRecommended ? 'border-brand-pink shadow-md' : 
                pkg.popular ? 'border-brand-pink/40' : ''
              }`}
              onClick={() => handleSelectPackage(pkg.id)}
            >
              {pkg.popular && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="bg-brand-pink text-white text-xs font-medium px-2 py-1 rounded-full">
                    Best Value
                  </div>
                </div>
              )}
              {isRecommended && !isSelected && (
                <div className="absolute top-0 right-0 transform translate-x-1/3 -translate-y-1/3">
                  <div className="bg-green-500 text-white text-xs font-medium px-2 py-1 rounded-full">
                    Recommended
                  </div>
                </div>
              )}
              <CardHeader>
                <CardTitle>{pkg.name}</CardTitle>
                <CardDescription>{pkg.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <span className="text-3xl font-bold">${pkg.price}</span>
                  <span className="text-muted-foreground ml-2">one-time</span>
                </div>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Package className="h-4 w-4" />
                    <span>{pkg.credits} search credits</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CreditCard className="h-4 w-4" />
                    <span>${pkg.valuePerCredit?.toFixed(2)}/credit</span>
                  </div>
                  <div className="flex items-center gap-2 text-yellow-600">
                    <Timer className="h-4 w-4" />
                    <span>Credits expire in 60 days</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
      
      {selectedPackage && (
        <div className="mt-6 flex justify-center">
          <Button 
            className="w-full max-w-md bg-brand-pink hover:bg-brand-pink/90"
            onClick={handlePurchase}
          >
            Purchase Selected Package
          </Button>
        </div>
      )}

      {/* Payment Confirmation Dialog */}
      {selectedPackageDetails && (
        <PaymentConfirmation
          open={showPaymentDialog}
          onClose={() => setShowPaymentDialog(false)}
          onConfirm={handleConfirmPayment}
          planName={selectedPackageDetails.name}
          credits={selectedPackageDetails.credits}
          amount={selectedPackageDetails.price}
          isProcessing={isProcessing}
          expirationDate={formatExpirationDate(getExpirationDate())}
        />
      )}
    </>
  );
}
