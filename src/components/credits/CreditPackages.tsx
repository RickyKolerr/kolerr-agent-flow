
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, CreditCard } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface CreditPackage {
  id: string;
  name: string;
  credits: number;
  price: number;
  description: string;
  popular?: boolean;
}

const creditPackages: CreditPackage[] = [
  {
    id: "basic-pack",
    name: "Basic Pack",
    credits: 20,
    price: 20,
    description: "Perfect for trying out our premium features"
  },
  {
    id: "standard-pack",
    name: "Standard Pack",
    credits: 60,
    price: 50,
    description: "Great value for occasional users",
    popular: true
  },
  {
    id: "premium-pack",
    name: "Premium Pack",
    credits: 130,
    price: 100,
    description: "Ideal for regular campaign creators"
  },
  {
    id: "pro-pack",
    name: "Pro Pack",
    credits: 300,
    price: 200,
    description: "Best value for power users and agencies"
  }
];

export function CreditPackages() {
  const navigate = useNavigate();

  const handlePurchase = (packageId: string) => {
    navigate(`/dashboard/payment?type=credits&package=${packageId}`);
  };

  return (
    <Card className="border-none shadow-none">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Package className="h-5 w-5 text-brand-pink" />
          Search Credit Packages
        </CardTitle>
        <CardDescription>
          Purchase additional search credits without a subscription
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {creditPackages.map((pkg) => (
            <Card 
              key={pkg.id}
              className={`relative ${pkg.popular ? 'border-brand-pink shadow-lg' : ''}`}
            >
              {pkg.popular && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="bg-brand-pink text-white text-xs font-medium px-2 py-1 rounded-full">
                    Best Value
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
                    <span>Credits never expire</span>
                  </div>
                </div>
                <Button 
                  className="w-full bg-brand-pink hover:bg-brand-pink/90"
                  onClick={() => handlePurchase(pkg.id)}
                >
                  Purchase Credits
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
