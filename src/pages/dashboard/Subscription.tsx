import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle2, AlertCircle, CreditCard, Info } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useCredits } from "@/contexts/CreditContext";

// Type for subscription plans
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
}

const SubscriptionPage = () => {
  const navigate = useNavigate();
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const { hasPremiumPlan, premiumCredits } = useCredits();

  // Current plan (using context data)
  const currentPlan = {
    id: hasPremiumPlan ? "growth" : "free",
    name: hasPremiumPlan ? "Growth" : "Free",
    billing: "monthly",
    nextRenewal: "May 1, 2023"
  };

  // Plans data - matching with Pricing page
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
      credits: 5
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
      credits: 100
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
        { text: "500 Premium credits per month", included: true },
        { text: "Up to 10 active campaigns", included: true },
        { text: "Advanced contract templates", included: true },
        { text: "Priority email support", included: true },
        { text: "Campaign performance tracking", included: true },
        { text: "Automated outreach tools", included: true },
        { text: "ROI analytics", included: true },
        { text: "Team collaboration", included: false },
      ],
      popular: true,
      credits: 500
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
        { text: "2000 Premium credits per month", included: true },
        { text: "Unlimited active campaigns", included: true },
        { text: "Custom contract builder", included: true },
        { text: "24/7 priority support", included: true },
        { text: "Advanced campaign automation", included: true },
        { text: "Team collaboration tools", included: true },
        { text: "Custom reporting", included: true },
        { text: "API access", included: true },
      ],
      credits: 2000
    }
  ];

  const handlePlanChange = () => {
    if (selectedPlan) {
      toast.success(`You've selected the ${plans.find(p => p.id === selectedPlan)?.name} plan!`);
      navigate("/dashboard/payment");
    }
  };

  const handleCancelSubscription = () => {
    toast.info("Please contact customer support to cancel your subscription.");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Subscription Plans</h1>
      </div>

      {/* Current subscription info */}
      <Card className="bg-muted/30">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div className="space-y-1">
              <div className="flex items-center">
                <h3 className="text-lg font-medium">Your Current Plan: {currentPlan.name}</h3>
                <Badge variant="outline" className="ml-2 bg-brand-pink/10 text-brand-pink border-brand-pink/20">
                  {currentPlan.billing.charAt(0).toUpperCase() + currentPlan.billing.slice(1)}
                </Badge>
              </div>
              {hasPremiumPlan ? (
                <p className="text-muted-foreground text-sm">
                  Next renewal: {currentPlan.nextRenewal} • {premiumCredits} premium credits remaining
                </p>
              ) : (
                <p className="text-muted-foreground text-sm">
                  Free tier • 5 daily searches • Resets at 7:00 AM daily
                </p>
              )}
            </div>
            {hasPremiumPlan && (
              <Button 
                variant="outline" 
                className="mt-4 md:mt-0"
                onClick={handleCancelSubscription}
              >
                Cancel Subscription
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Select billing period */}
      <div className="flex justify-center">
        <Tabs
          defaultValue="monthly"
          value={billingPeriod}
          onValueChange={(value) => setBillingPeriod(value as 'monthly' | 'yearly')}
          className="w-fit"
        >
          <TabsList className="grid w-[300px] grid-cols-2 mb-8">
            <TabsTrigger value="monthly">Monthly Billing</TabsTrigger>
            <TabsTrigger value="yearly">
              Yearly Billing
              <Badge className="ml-2 bg-green-500/10 text-green-500 hover:bg-green-500/20 border-green-500/20">
                Save 20%
              </Badge>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Plans */}
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
              <div className="space-y-2">
                {plan.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center">
                    {feature.included ? (
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                    ) : (
                      <AlertCircle className="h-5 w-5 text-muted-foreground mr-2" />
                    )}
                    <p className={feature.included ? '' : 'text-muted-foreground'}>
                      {feature.text}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 bg-muted rounded-md">
                <div className="flex items-center">
                  <CreditCard className="h-5 w-5 mr-2" />
                  <span className="font-medium">
                    {plan.id === 'free' ? `${plan.credits} daily free searches` : `${plan.credits} Premium credits monthly`}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  {plan.id === 'free' ? 'Resets every day at 7:00 AM' : 'Roll over up to 50% of unused credits'}
                </p>
              </div>
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

      {/* Proceed with plan change */}
      {selectedPlan && selectedPlan !== currentPlan.id && selectedPlan !== 'free' && (
        <div className="flex justify-center mt-8">
          <Card className="w-full max-w-2xl">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Info className="h-5 w-5 mr-2" />
                Change Subscription
              </CardTitle>
              <CardDescription>
                You are about to change your subscription plan
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center p-4 bg-muted rounded-md">
                <div>
                  <p className="font-medium">From: {currentPlan.name} ({currentPlan.billing})</p>
                  <p className="text-sm text-muted-foreground">
                    To: {plans.find(p => p.id === selectedPlan)?.name} ({billingPeriod})
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium">
                    New price: ${plans.find(p => p.id === selectedPlan)?.price[billingPeriod]} / month
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Effective immediately
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="ghost" onClick={() => setSelectedPlan(null)}>
                Cancel
              </Button>
              <Button 
                className="bg-brand-pink hover:bg-brand-pink/90"
                onClick={handlePlanChange}
              >
                Proceed to Payment
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  );
};

export default SubscriptionPage;
