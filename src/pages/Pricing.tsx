
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Info } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { useCredits } from "@/contexts/CreditContext";
import { CreditPackages } from "@/components/credits/CreditPackages";

const PricingPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const { freeCredits, hasPremiumPlan } = useCredits();
  
  // Check if user is a KOL
  const isKOL = user?.role === 'kol';
  
  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      description: "Basic access for everyone",
      features: [
        "AI Agent Bot Matchmaking (5 searches/day)",
        "Basic campaign browsing",
        "Limited analytics dashboard",
        "Community support",
        "Basic search filters"
      ],
      highlight: false,
      isEnterprise: false,
      isPremium: false,
      isFreeTier: true,
      creditValue: "$1.00 per credit"
    },
    {
      name: "Starter",
      price: "$100",
      period: "per month",
      description: "Perfect for small brands starting with influencer marketing",
      features: [
        "100 Premium AI Matchmaking credits",
        "Up to 3 active campaign slots",
        "Basic e-contracts via SignWell",
        "In-app chat communication",
        "Basic KOL performance tracking",
        "Email support"
      ],
      highlight: false,
      isEnterprise: false,
      isPremium: true,
      creditValue: "$1.00 per credit"
    },
    {
      name: "Growth",
      price: "$200",
      period: "per month",
      description: "For growing brands scaling their influencer programs",
      features: [
        "250 Premium AI Matchmaking credits",
        "Up to 10 active campaign slots",
        "Advanced e-contracts with templates",
        "Smart routing for creator matching",
        "Comprehensive campaign analytics",
        "Automated outreach tools",
        "Priority support"
      ],
      highlight: true,
      isEnterprise: false,
      isPremium: true,
      creditValue: "$0.80 per credit"
    },
    {
      name: "Pro",
      price: "$400",
      period: "per month",
      description: "For professional agencies and established brands",
      features: [
        "600 Premium AI Matchmaking credits",
        "Unlimited campaign slots",
        "Custom e-contract builder via SignWell",
        "Advanced KOL performance tracking",
        "Campaign automation & optimization",
        "Team collaboration tools",
        "24/7 priority support",
        "API access"
      ],
      highlight: false,
      isEnterprise: false,
      isPremium: true,
      creditValue: "$0.67 per credit"
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
        "Custom integrations with your tools",
        "SLA guarantees",
        "Onboarding & training",
        "Compliance & security features"
      ],
      highlight: false,
      isEnterprise: true,
      isPremium: true,
      creditValue: "$0.50 per credit"
    }
  ];

  const handlePlanSelection = (plan: string, isEnterprise: boolean) => {
    if (!isAuthenticated) {
      toast.info("Create an account to continue", {
        description: `Get started with our ${plan} plan.`,
        action: {
          label: "Sign up",
          onClick: () => navigate("/signup"),
        },
      });
      return;
    }

    if (isKOL) {
      toast.info("Credit packages only", {
        description: "As a creator, you can only purchase credit packages.",
      });
      // Scroll to credit packages section
      const creditPackagesSection = document.getElementById('credit-packages-section');
      if (creditPackagesSection) {
        creditPackagesSection.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }

    if (isEnterprise) {
      navigate("/contact");
    } else {
      navigate(`/dashboard/subscription?plan=${plan.toLowerCase()}`);
    }
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Choose Your Plan</h1>
        <p className="text-lg text-muted-foreground">
          Scale your influencer marketing with AI-powered matchmaking and comprehensive campaign management
        </p>
        
        {isAuthenticated && (
          <div className="mt-4 p-4 rounded-lg bg-brand-pink/10 inline-flex items-center gap-2">
            <Info className="h-5 w-5 text-brand-pink" />
            <span>You have {freeCredits} free searches remaining today</span>
          </div>
        )}

        {isAuthenticated && isKOL && (
          <div className="mt-4 p-4 rounded-lg bg-yellow-500/10 text-yellow-700 inline-flex items-center gap-2">
            <Info className="h-5 w-5" />
            <span>As a creator, you can only purchase credit packages</span>
          </div>
        )}
      </div>
      
      {/* Only show subscription plans section for brands or non-authenticated users */}
      {(!isAuthenticated || !isKOL) && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8 max-w-7xl mx-auto">
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
                {plan.isPremium && (
                  <div className="mb-4 p-2 bg-green-50 border border-green-100 rounded-md text-sm text-green-700 flex items-center justify-between">
                    <span>Value:</span>
                    <span className="font-medium">{plan.creditValue}</span>
                  </div>
                )}
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-brand-pink" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <CardFooter>
                  <Button
                    className={`w-full ${plan.highlight ? 'bg-brand-pink hover:bg-brand-pink/90' : ''}`}
                    variant={plan.highlight ? 'default' : 'outline'}
                    onClick={() => handlePlanSelection(plan.name, plan.isEnterprise)}
                    disabled={isKOL && !plan.isFreeTier}
                  >
                    {hasPremiumPlan ? 'Change Plan' : 'Get Started'}
                  </Button>
                </CardFooter>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <div id="credit-packages-section" className="mt-24 mb-16">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">One-Time Credit Packages</h2>
          <p className="text-lg text-muted-foreground">
            Need more flexibility? Purchase search credits without committing to a subscription.
            Credits expire in 60 days from purchase date.
          </p>
        </div>
        <CreditPackages />
      </div>

      <div className="mt-12 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">Common Questions</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-6 border rounded-lg">
            <h3 className="font-bold mb-2">What are free daily credits?</h3>
            <p className="text-muted-foreground">All users receive 5 free credits every day that reset at 7:00 AM. These credits can be used for AI matchmaking searches.</p>
          </div>
          <div className="p-6 border rounded-lg">
            <h3 className="font-bold mb-2">What are premium credits?</h3>
            <p className="text-muted-foreground">Premium credits are included with paid plans and give you access to advanced AI matchmaking, campaign management, and analytics features.</p>
          </div>
          <div className="p-6 border rounded-lg">
            <h3 className="font-bold mb-2">What is the SignWell e-contract feature?</h3>
            <p className="text-muted-foreground">Our platform integrates with SignWell to provide legally binding electronic contracts between brands and KOLs, making collaboration agreements secure and professional.</p>
          </div>
          <div className="p-6 border rounded-lg">
            <h3 className="font-bold mb-2">What is AI Agent Bot Matchmaking?</h3>
            <p className="text-muted-foreground">Our proprietary AI system analyzes brand requirements and KOL profiles to suggest the most compatible matches based on audience demographics, engagement rates, content quality, and past performance.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
