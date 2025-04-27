
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useLocation, useNavigate } from "react-router-dom";
import { PaymentForm } from "@/components/PaymentForm";
import { StripeProvider } from "@/providers/StripeProvider";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CreditPackage {
  id: string;
  name: string;
  credits: number;
  price: number;
  description?: string;
}

const CheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedPackage, setSelectedPackage] = useState<CreditPackage | null>(null);
  
  // Available credit packages
  const creditPackages: CreditPackage[] = [
    {
      id: "starter",
      name: "Starter Package",
      credits: 100,
      price: 4900, // $49.00
      description: "100 premium credits with Starter features"
    },
    {
      id: "pro",
      name: "Professional Package",
      credits: 500,
      price: 9900, // $99.00
      description: "500 premium credits with Professional features"
    },
    {
      id: "enterprise",
      name: "Enterprise Package",
      credits: 2000,
      price: 24900, // $249.00
      description: "2000 premium credits with Enterprise features"
    }
  ];

  useEffect(() => {
    // Check if a package was selected from the subscription page
    const params = new URLSearchParams(location.search);
    const packageId = params.get("package");
    
    if (packageId) {
      const pkg = creditPackages.find(p => p.id === packageId);
      if (pkg) {
        setSelectedPackage(pkg);
      }
    } else {
      // Default to the Pro package if none selected
      setSelectedPackage(creditPackages.find(p => p.id === "pro") || creditPackages[0]);
    }
  }, [location.search]);

  const handlePackageSelect = (pkg: CreditPackage) => {
    setSelectedPackage(pkg);
  };

  const handlePaymentSuccess = () => {
    navigate("/dashboard/credits?status=success");
  };

  const handleCancel = () => {
    navigate(-1);
  };

  if (!selectedPackage) {
    return (
      <div className="flex items-center justify-center h-full">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)} 
          className="flex items-center text-muted-foreground"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <h1 className="text-3xl font-bold mt-4">Checkout</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1 space-y-6">
          <Card className="bg-muted/30">
            <CardHeader>
              <CardTitle>Selected Plan</CardTitle>
              <CardDescription>Choose your credit package</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {creditPackages.map((pkg) => (
                <div
                  key={pkg.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                    selectedPackage?.id === pkg.id
                      ? "border-brand-pink bg-brand-pink/10"
                      : "hover:border-muted-foreground"
                  }`}
                  onClick={() => handlePackageSelect(pkg)}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">{pkg.name}</h3>
                      <p className="text-sm text-muted-foreground">{pkg.credits} credits</p>
                    </div>
                    <p className="font-semibold">${(pkg.price / 100).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Payment Information</CardTitle>
              <CardDescription>Complete your purchase securely</CardDescription>
            </CardHeader>
            <CardContent>
              <StripeProvider>
                <PaymentForm 
                  amount={selectedPackage.price}
                  productName={`${selectedPackage.credits} Credits (${selectedPackage.name})`}
                  onSuccess={handlePaymentSuccess}
                  onCancel={handleCancel}
                />
              </StripeProvider>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
