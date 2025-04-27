
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Info } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { useCredits } from "@/contexts/CreditContext";

const PricingPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { freeCredits } = useCredits();
  
  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      description: "Basic access for everyone",
      features: [
        "5 AI-powered searches per day",
        "Basic creator profiles",
        "Limited analytics",
        "Community support",
        "Basic search filters"
      ],
      highlight: false,
      isEnterprise: false,
      isPremium: false,
      isFreeTier: true,
      id: "free"
    },
    {
      name: "Starter",
      price: "$100",
      period: "per month",
      description: "Perfect for small brands starting with influencer marketing",
      features: [
        "100 Search credits per month",
        "Up to 3 active campaigns",
        "Basic contract templates",
        "Email support",
        "Basic analytics dashboard",
        "Advanced search filters"
      ],
      highlight: false,
      isEnterprise: false,
      isPremium: true,
      id: "starter"
    },
    {
      name: "Growth",
      price: "$200",
      period: "per month",
      description: "For growing brands scaling their influencer programs",
      features: [
        "500 Search credits per month",
        "Up to 10 active campaigns",
        "Advanced contract templates",
        "Priority email support",
        "Campaign performance tracking",
        "Automated outreach tools",
        "ROI analytics"
      ],
      highlight: true,
      isEnterprise: false,
      isPremium: true,
      id: "pro"
    },
    {
      name: "Pro",
      price: "$400",
      period: "per month",
      description: "For professional agencies and established brands",
      features: [
        "2000 Search credits per month",
        "Unlimited active campaigns",
        "Custom contract builder",
        "24/7 priority support",
        "Advanced campaign automation",
        "Team collaboration tools",
        "Custom reporting",
        "API access"
      ],
      highlight: false,
      isEnterprise: false,
      isPremium: true,
      id: "enterprise"
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
      isEnterprise: true,
      isPremium: true,
      id: "custom"
    }
  ];

  const handlePlanSelection = (planId: string, isEnterprise: boolean) => {
    if (!isAuthenticated) {
      // Redirect to signup if not authenticated
      toast.info("Create an account to continue", {
        description: `Get started with our ${planId} plan.`,
        action: {
          label: "Sign up",
          onClick: () => navigate("/signup"),
        },
      });
      return;
    }

    if (isEnterprise) {
      navigate("/contact");
    } else if (planId === "free") {
      toast.info("You're already on the free plan");
    } else {
      // Redirect to subscription page with the selected plan
      navigate(`/dashboard/subscription?plan=${planId}`);
    }
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Choose Your Plan</h1>
        <p className="text-lg text-muted-foreground">
          Scale your influencer marketing with AI-powered tools and comprehensive campaign management
        </p>
        
        {isAuthenticated && (
          <div className="mt-4 p-4 rounded-lg bg-brand-pink/10 inline-flex items-center gap-2">
            <Info className="h-5 w-5 text-brand-pink" />
            <span>You have {freeCredits} free searches remaining today</span>
          </div>
        )}
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8 max-w-7xl mx-auto">
        {plans.map((plan, index) => (
          <Card 
            key={index} 
            className={`relative ${plan.highlight ? 'border-brand-pink shadow-lg' : ''} ${plan.isFreeTier ? 'lg:col-span-1' : ''}`}
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
                className={`w-full ${plan.highlight ? 'bg-brand-pink hover:bg-brand-pink/90' : plan.isFreeTier ? 'bg-secondary text-foreground hover:bg-secondary/90' : ''}`}
                onClick={() => !plan.isFreeTier && handlePlanSelection(plan.name, plan.isEnterprise)}
                variant={plan.isFreeTier ? "secondary" : "default"}
                disabled={plan.isFreeTier}
              >
                {plan.isFreeTier ? 'Current Free Tier' : plan.isEnterprise ? 'Contact Sales' : 'Get Started'}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-12 text-center text-sm text-muted-foreground">
        <p>All plans include our core features. Premium plans are billed monthly.</p>
        <p className="mt-2">Need help choosing? <button onClick={() => navigate("/contact")} className="text-brand-pink underline">Contact our sales team</button></p>
      </div>
      
      <div className="mt-12 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">Common Questions</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-6 border rounded-lg">
            <h3 className="font-bold mb-2">What are free daily credits?</h3>
            <p className="text-muted-foreground">All users receive 5 free credits every day that reset at 7:00 AM. These credits can be used for basic searches.</p>
          </div>
          <div className="p-6 border rounded-lg">
            <h3 className="font-bold mb-2">What are premium credits?</h3>
            <p className="text-muted-foreground">Premium credits are included with paid plans and can be used for advanced features like campaign management and detailed analytics.</p>
          </div>
          <div className="p-6 border rounded-lg">
            <h3 className="font-bold mb-2">Do unused credits expire?</h3>
            <p className="text-muted-foreground">Free daily credits reset each day at 7:00 AM. Premium credits roll over month to month, up to 50% of your monthly allocation.</p>
          </div>
          <div className="p-6 border rounded-lg">
            <h3 className="font-bold mb-2">Can I upgrade anytime?</h3>
            <p className="text-muted-foreground">Yes! You can upgrade to a premium plan at any time to get immediate access to additional features and credits.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
