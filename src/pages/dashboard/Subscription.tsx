
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate, useLocation } from "react-router-dom";
import { useCredits } from "@/contexts/CreditContext";
import { toast } from "sonner";
import { CurrentPlanCard } from "@/components/subscription/CurrentPlanCard";
import { BillingPeriodSelector } from "@/components/subscription/BillingPeriodSelector";
import { PlanFeatures } from "@/components/subscription/PlanFeatures";
import { PlanChangeConfirmation } from "@/components/subscription/PlanChangeConfirmation";

interface Plan {
  id: string;
  name: string;
  description: string;
  price: {
    monthly: number;
    yearly: number;
  };
  features: {
    text: string;
    included: boolean;
  }[];
  popular?: boolean;
  credits: number;
  valuePerCredit: number;
}

const SubscriptionPage = () => {
  const navigate = useNavigate();
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const { hasPremiumPlan } = useCredits();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const actionParam = searchParams.get('action');
  const planParam = searchParams.get('plan');

  useEffect(() => {
    if (planParam) {
      setSelectedPlan(planParam);
    }
    if (actionParam === 'cancel') {
      handleCancelSubscription();
    }
  }, [planParam, actionParam]);

  const currentPlan = {
    id: hasPremiumPlan ? "growth" : "free",
    name: hasPremiumPlan ? "Growth" : "Free",
    billing: "monthly",
    price: hasPremiumPlan ? 200 : 0,
    nextRenewal: "May 1, 2023"
  };

  const plans: Plan[] = [
    {
      id: "free",
      name: "Free",
      description: "Basic access for everyone",
      price: {
        monthly: 0,
        yearly: 0
      },
      features: [
        { text: "5 AI-Matchmaking searches per day", included: true },
        { text: "Basic creator profiles", included: true },
        { text: "Limited analytics", included: true },
        { text: "Community support", included: true },
        { text: "Basic search filters", included: true },
        { text: "Advanced analytics", included: false },
        { text: "Contract templates", included: false },
        { text: "Campaign management", included: false },
      ],
      credits: 5,
      valuePerCredit: 1.00
    },
    {
      id: "starter",
      name: "Starter",
      description: "Perfect for small brands starting with influencer marketing",
      price: {
        monthly: 100,
        yearly: 80
      },
      features: [
        { text: "100 Premium credits per month", included: true },
        { text: "Up to 3 active campaigns", included: true },
        { text: "Basic contract templates", included: true },
        { text: "Email support", included: true },
        { text: "Basic analytics dashboard", included: true },
        { text: "Advanced search filters", included: true },
        { text: "Campaign reporting", included: false },
        { text: "Team collaboration", included: false },
      ],
      credits: 100,
      valuePerCredit: 1.00
    },
    {
      id: "growth",
      name: "Growth",
      description: "For growing brands scaling their influencer programs",
      price: {
        monthly: 200,
        yearly: 160
      },
      features: [
        { text: "250 Premium credits per month", included: true },
        { text: "Up to 10 active campaigns", included: true },
        { text: "Advanced contract templates", included: true },
        { text: "Priority email support", included: true },
        { text: "Campaign performance tracking", included: true },
        { text: "Automated outreach tools", included: true },
        { text: "ROI analytics", included: true },
        { text: "Team collaboration", included: false },
      ],
      popular: true,
      credits: 250,
      valuePerCredit: 0.80
    },
    {
      id: "pro",
      name: "Pro",
      description: "For professional agencies and established brands",
      price: {
        monthly: 400,
        yearly: 320
      },
      features: [
        { text: "600 Premium credits per month", included: true },
        { text: "Unlimited active campaigns", included: true },
        { text: "Custom contract builder", included: true },
        { text: "24/7 priority support", included: true },
        { text: "Advanced campaign automation", included: true },
        { text: "Team collaboration tools", included: true },
        { text: "Custom reporting", included: true },
        { text: "API access", included: true },
      ],
      credits: 600,
      valuePerCredit: 0.67
    }
  ];

  const handlePlanChange = () => {
    if (selectedPlan) {
      const action = hasPremiumPlan ? 'changed' : 'selected';
      toast.success(`You've ${action} the ${plans.find(p => p.id === selectedPlan)?.name} plan!`, {
        description: "You'll be redirected to complete the payment process.",
      });
      navigate(`/dashboard/payment?plan=${selectedPlan}&billingPeriod=${billingPeriod}&currentPrice=${currentPlan.price}`);
    }
  };

  const handleCancelSubscription = () => {
    toast.success("Your subscription has been cancelled", {
      description: "Your subscription will remain active until the end of your billing period."
    });
    navigate('/dashboard/settings');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Subscription Plans</h1>
      </div>

      <CurrentPlanCard currentPlan={currentPlan} />

      <BillingPeriodSelector 
        value={billingPeriod}
        onValueChange={(value) => setBillingPeriod(value)}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {plans.map((plan) => (
          <Card 
            key={plan.id}
            className={`relative ${plan.id === currentPlan.id ? 'border-brand-pink' : ''} ${plan.popular ? 'border-brand-pink' : ''}`}
          >
            {plan.popular && plan.id !== currentPlan.id && (
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <Badge className="bg-brand-pink text-white">Most Popular</Badge>
              </div>
            )}
            {plan.id === currentPlan.id && (
              <div className="absolute top-0 right-0 transform translate-x-1/4 -translate-y-1/2">
                <Badge className="bg-brand-pink text-white">Current</Badge>
              </div>
            )}
            <CardHeader>
              <CardTitle>{plan.name}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
              <div className="mt-4">
                <div className="flex items-baseline">
                  <span className="text-3xl font-bold">
                    ${billingPeriod === 'monthly' ? plan.price.monthly : plan.price.yearly}
                  </span>
                  <span className="text-muted-foreground ml-2">/ month</span>
                </div>
                {billingPeriod === 'yearly' && plan.id !== 'free' && (
                  <p className="text-sm text-green-500 mt-1">
                    Save ${(plan.price.monthly * 12 - plan.price.yearly * 12).toFixed(0)} annually
                  </p>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {plan.id !== 'free' && (
                <div className="mb-4 p-2 bg-green-50 border border-green-100 rounded-md text-sm text-green-700 flex items-center justify-between">
                  <span>Value:</span>
                  <span className="font-medium">${plan.valuePerCredit.toFixed(2)} per credit</span>
                </div>
              )}
              <PlanFeatures 
                features={plan.features}
                credits={plan.credits}
                isFree={plan.id === 'free'}
              />
            </CardContent>
            <CardFooter>
              <Button
                className={`w-full ${plan.id === currentPlan.id ? 'bg-muted hover:bg-muted' : plan.id === 'free' ? '' : 'bg-brand-pink hover:bg-brand-pink/90'}`}
                disabled={plan.id === currentPlan.id || plan.id === 'free'}
                onClick={() => plan.id !== 'free' && setSelectedPlan(plan.id)}
                variant={plan.id === selectedPlan && plan.id !== currentPlan.id ? 'default' : 'outline'}
              >
                {plan.id === currentPlan.id ? 'Current Plan' : 
                 plan.id === 'free' ? 'Free Plan' :
                 plan.id === selectedPlan ? 'Selected' : 'Select Plan'}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {selectedPlan && selectedPlan !== currentPlan.id && selectedPlan !== 'free' && (
        <PlanChangeConfirmation
          currentPlan={currentPlan.name}
          selectedPlan={plans.find(p => p.id === selectedPlan)?.name || ''}
          currentBilling={currentPlan.billing}
          currentPrice={currentPlan.price}
          newPrice={plans.find(p => p.id === selectedPlan)?.price[billingPeriod] || 0}
          billingPeriod={billingPeriod}
          onCancel={() => setSelectedPlan(null)}
          onConfirm={handlePlanChange}
        />
      )}
    </div>
  );
};

export default SubscriptionPage;
