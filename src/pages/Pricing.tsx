
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const PricingPage = () => {
  const navigate = useNavigate();
  
  const plans = [
    {
      name: "Starter",
      price: "$100",
      period: "per month",
      description: "Perfect for small brands starting with influencer marketing",
      features: [
        "5 AI-Matchmaking searches per day",
        "Up to 3 active campaigns",
        "Basic contract templates",
        "Email support",
        "Basic analytics dashboard"
      ],
      highlight: false,
      isEnterprise: false
    },
    {
      name: "Growth",
      price: "$200",
      period: "per month",
      description: "For growing brands scaling their influencer programs",
      features: [
        "20 AI-Matchmaking searches per day",
        "Up to 10 active campaigns",
        "Advanced contract templates",
        "Priority email support",
        "Campaign performance tracking",
        "Automated outreach tools",
        "ROI analytics"
      ],
      highlight: true,
      isEnterprise: false
    },
    {
      name: "Pro",
      price: "$400",
      period: "per month",
      description: "For professional agencies and established brands",
      features: [
        "Unlimited AI-Matchmaking searches",
        "Unlimited active campaigns",
        "Custom contract builder",
        "24/7 priority support",
        "Advanced campaign automation",
        "Team collaboration tools",
        "Custom reporting",
        "API access"
      ],
      highlight: false,
      isEnterprise: false
    },
    {
      name: "Enterprise",
      price: "$1000+",
      period: "custom pricing",
      description: "Custom solutions for large organizations",
      features: [
        "Everything in Pro plan",
        "Dedicated account manager",
        "Custom AI model training",
        "White-label solution",
        "Custom integrations",
        "SLA guarantees",
        "Onboarding & training",
        "Compliance & security features"
      ],
      highlight: false,
      isEnterprise: true
    }
  ];

  const handlePlanSelection = (plan: string, isEnterprise: boolean) => {
    if (isEnterprise) {
      navigate("/contact");
    } else {
      navigate("/dashboard/payment");
    }
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Choose Your Plan</h1>
        <p className="text-lg text-muted-foreground">
          Scale your influencer marketing with AI-powered tools and comprehensive campaign management
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {plans.map((plan, index) => (
          <Card 
            key={index} 
            className={`relative ${plan.highlight ? 'border-brand-pink shadow-lg' : ''}`}
          >
            {plan.highlight && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <div className="bg-brand-pink text-white px-4 py-1 rounded-full text-sm font-medium">
                  Most Popular
                </div>
              </div>
            )}
            <CardHeader>
              <CardTitle className="text-2xl">{plan.name}</CardTitle>
              <div className="mt-4">
                <span className="text-4xl font-bold">{plan.price}</span>
                <span className="text-muted-foreground ml-2">{plan.period}</span>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                {plan.description}
              </p>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-brand-pink" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button 
                className={`w-full ${plan.highlight ? 'bg-brand-pink hover:bg-brand-pink/90' : ''}`}
                onClick={() => handlePlanSelection(plan.name, plan.isEnterprise)}
              >
                {plan.isEnterprise ? 'Contact Sales' : 'Get Started'}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-12 text-center text-sm text-muted-foreground">
        <p>All plans include our core features. Prices shown are in USD and billed monthly.</p>
        <p className="mt-2">Need help choosing? <button onClick={() => navigate("/contact")} className="text-brand-pink underline">Contact our sales team</button></p>
      </div>
    </div>
  );
};

export default PricingPage;
