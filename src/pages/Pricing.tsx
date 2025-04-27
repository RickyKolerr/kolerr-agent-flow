
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const PricingPage = () => {
  const plans = [
    {
      name: "Starter",
      price: "$99",
      period: "per month",
      description: "Perfect for small businesses and individual creators",
      features: [
        "Up to 10 active campaigns",
        "Basic analytics dashboard",
        "Email support within 24h",
        "Creator discovery tools",
        "Basic contract templates",
        "Payment processing"
      ],
      highlight: false
    },
    {
      name: "Professional",
      price: "$299",
      period: "per month",
      description: "Ideal for growing agencies and brands",
      features: [
        "Unlimited campaigns",
        "Advanced analytics & reporting",
        "Priority support",
        "AI-powered creator matching",
        "Custom contract templates",
        "Multi-user access",
        "Campaign automation tools",
        "ROI tracking"
      ],
      highlight: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "tailored pricing",
      description: "For large organizations and agencies",
      features: [
        "Everything in Professional",
        "Dedicated account manager",
        "24/7 premium support",
        "Custom API integration",
        "White-label solutions",
        "Advanced security features",
        "Custom analytics",
        "Unlimited users"
      ],
      highlight: false
    }
  ];

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h1>
        <p className="text-lg text-muted-foreground">
          Choose the perfect plan for your influencer marketing needs
        </p>
      </div>
      
      <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {plans.map((plan, index) => (
          <Card 
            key={index} 
            className={`relative ${plan.highlight ? 'border-brand-pink shadow-lg' : ''}`}
          >
            {plan.highlight && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-brand-pink text-white px-4 py-1 rounded-full text-sm">
                Most Popular
              </div>
            )}
            <CardHeader>
              <CardTitle className="text-2xl">{plan.name}</CardTitle>
              <div className="mt-4">
                <span className="text-4xl font-bold">{plan.price}</span>
                <span className="text-muted-foreground ml-2">{plan.period}</span>
              </div>
              <p className="text-sm text-muted-foreground mt-2">{plan.description}</p>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center text-sm">
                    <Check className="w-5 h-5 text-brand-pink mr-2 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button 
                className={`w-full ${plan.highlight ? 'bg-brand-pink hover:bg-brand-pink/90' : ''}`}
              >
                Get Started
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PricingPage;
