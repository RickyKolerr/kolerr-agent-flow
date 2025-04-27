
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const PricingPage = () => {
  const plans = [
    {
      name: "Starter",
      price: "$99",
      description: "Perfect for small businesses",
      features: ["5 active campaigns", "Basic analytics", "Email support"]
    },
    {
      name: "Professional",
      price: "$299",
      description: "For growing businesses",
      features: ["Unlimited campaigns", "Advanced analytics", "Priority support"]
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "For large organizations",
      features: ["Custom solutions", "Dedicated manager", "24/7 support"]
    }
  ];

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-4xl font-bold text-center mb-12">Simple, Transparent Pricing</h1>
      <div className="grid md:grid-cols-3 gap-8">
        {plans.map((plan, index) => (
          <Card key={index} className="relative">
            <CardHeader>
              <CardTitle>{plan.name}</CardTitle>
              <div className="text-3xl font-bold">{plan.price}</div>
              <p className="text-sm text-muted-foreground">{plan.description}</p>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 mb-6">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center text-sm">
                    <span className="mr-2">✓</span> {feature}
                  </li>
                ))}
              </ul>
              <Button className="w-full">Get Started</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PricingPage;
