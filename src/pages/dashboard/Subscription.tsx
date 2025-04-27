
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle2, AlertCircle, CreditCard, Info } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

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
  const [selectedPlan, setSelectedPlan] = useState<string | null>("pro");

  // Current plan (mock data)
  const currentPlan = {
    id: "pro",
    name: "Professional",
    billing: "monthly",
    nextRenewal: "July 1, 2023"
  };

  // Plans data
  const plans: Plan[] = [
    {
      id: "starter",
      name: "Starter",
      description: "Perfect for individuals and small projects",
      price: {
        monthly: 49,
        yearly: 39
      },
      features: [
        { text: "100 Credits per month", included: true },
        { text: "5 Active campaigns", included: true },
        { text: "10 KOL searches per day", included: true },
        { text: "Basic analytics", included: true },
        { text: "Email support", included: true },
        { text: "Contract templates", included: false },
        { text: "Campaign reporting", included: false },
        { text: "Priority booking slots", included: false },
      ],
      credits: 100
    },
    {
      id: "pro",
      name: "Professional",
      description: "For growing businesses and marketing teams",
      price: {
        monthly: 99,
        yearly: 79
      },
      features: [
        { text: "500 Credits per month", included: true },
        { text: "15 Active campaigns", included: true },
        { text: "Unlimited KOL searches", included: true },
        { text: "Advanced analytics", included: true },
        { text: "Priority email support", included: true },
        { text: "Contract templates", included: true },
        { text: "Campaign reporting", included: true },
        { text: "Priority booking slots", included: false },
      ],
      popular: true,
      credits: 500
    },
    {
      id: "enterprise",
      name: "Enterprise",
      description: "For large organizations with extensive needs",
      price: {
        monthly: 249,
        yearly: 199
      },
      features: [
        { text: "2000 Credits per month", included: true },
        { text: "Unlimited campaigns", included: true },
        { text: "Unlimited KOL searches", included: true },
        { text: "Custom analytics dashboard", included: true },
        { text: "Dedicated account manager", included: true },
        { text: "Custom contract templates", included: true },
        { text: "Advanced campaign reporting", included: true },
        { text: "Priority booking slots", included: true },
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
              <p className="text-muted-foreground text-sm">
                Next renewal: {currentPlan.nextRenewal}
              </p>
            </div>
            <Button 
              variant="outline" 
              className="mt-4 md:mt-0"
              onClick={handleCancelSubscription}
            >
              Cancel Subscription
            </Button>
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <Card 
            key={plan.id}
            className={`relative ${plan.popular ? 'border-brand-pink' : ''}`}
          >
            {plan.popular && (
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <Badge className="bg-brand-pink text-white">Most Popular</Badge>
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
                {billingPeriod === 'yearly' && (
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
                  <span className="font-medium">{plan.credits} Credits monthly</span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Roll over up to 50% of unused credits
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className={`w-full ${plan.id === currentPlan.id ? 'bg-muted hover:bg-muted' : 'bg-brand-pink hover:bg-brand-pink/90'}`}
                disabled={plan.id === currentPlan.id}
                onClick={() => setSelectedPlan(plan.id)}
                variant={plan.id === selectedPlan ? 'default' : 'outline'}
              >
                {plan.id === currentPlan.id ? 'Current Plan' : plan.id === selectedPlan ? 'Selected' : 'Select Plan'}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Proceed with plan change */}
      {selectedPlan && selectedPlan !== currentPlan.id && (
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
