import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  CreditCard,
  Download,
  Plus,
  Receipt,
  ChevronDown,
  CheckCircle2,
  Info
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { useCredits } from "@/contexts/CreditContext";
import { toast } from "sonner";

const Billing = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const { hasPremiumPlan, premiumCredits } = useCredits();

  // Mock data for billing plans - matching with updated Pricing page
  const plans = [
    {
      id: "free",
      name: "Free",
      description: "Basic access for everyone",
      price: "$0",
      period: "forever",
      features: [
        "AI Agent Bot Matchmaking (5 searches/day)",
        "Basic campaign browsing",
        "Limited analytics dashboard",
        "Community support",
        "Basic search filters"
      ],
      current: !hasPremiumPlan,
      valuePerCredit: "$1.00"
    },
    {
      id: "starter",
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
      current: hasPremiumPlan && premiumCredits <= 100,
      valuePerCredit: "$1.00"
    },
    {
      id: "growth",
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
      current: hasPremiumPlan && premiumCredits > 100 && premiumCredits <= 250,
      popular: true,
      valuePerCredit: "$0.80"
    },
    {
      id: "pro",
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
      current: hasPremiumPlan && premiumCredits > 250,
      valuePerCredit: "$0.67"
    }
  ];

  // Mock data for payment methods
  const paymentMethods = [
    {
      id: 1,
      name: "Visa ending in 4242",
      expiry: "04/25",
      default: true
    },
    {
      id: 2,
      name: "Mastercard ending in 5555",
      expiry: "08/24",
      default: false
    }
  ];

  // Mock data for billing history
  const billingHistory = [
    {
      id: "INV-001",
      date: "Apr 1, 2023",
      amount: "$200.00",
      status: "Paid",
      description: "Growth Plan - Monthly"
    },
    {
      id: "INV-002",
      date: "Mar 1, 2023",
      amount: "$200.00",
      status: "Paid",
      description: "Growth Plan - Monthly"
    },
    {
      id: "INV-003",
      date: "Feb 1, 2023",
      amount: "$100.00",
      status: "Paid",
      description: "Starter Plan - Monthly"
    }
  ];

  const handleViewPlanDetails = () => {
    navigate("/dashboard/subscription");
  };

  const handleChangePlan = () => {
    navigate("/dashboard/subscription");
  };

  const handleCancelSubscription = () => {
    toast.info("Please contact customer support to cancel your subscription.");
  };

  const handleSelectPlan = (planId) => {
    navigate("/dashboard/subscription");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Billing & Subscription</h1>
        <p className="text-muted-foreground mt-2">
          Manage your subscription plan, payment methods, and billing history.
        </p>
      </div>

      <Tabs defaultValue="overview" className="space-y-4" onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="plans">Plans</TabsTrigger>
          <TabsTrigger value="payment">Payment Methods</TabsTrigger>
          <TabsTrigger value="history">Billing History</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Current Plan</CardTitle>
              <CardDescription>
                Your current subscription details and usage.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h3 className="font-semibold text-lg">
                    {hasPremiumPlan ? "Growth Plan" : "Free Plan"}
                  </h3>
                  <p className="text-muted-foreground">
                    {hasPremiumPlan ? "$200/month, billed monthly" : "Free forever"}
                  </p>
                </div>
                <div className="flex flex-col xs:flex-row gap-2">
                  <Button variant="outline" onClick={handleViewPlanDetails}>View Details</Button>
                  {hasPremiumPlan && (
                    <Button variant="outline" onClick={handleChangePlan}>Change Plan</Button>
                  )}
                  {hasPremiumPlan && (
                    <Button variant="outline" className="text-red-500 hover:text-red-700" onClick={handleCancelSubscription}>
                      Cancel Subscription
                    </Button>
                  )}
                </div>
              </div>

              <div className="border rounded-lg p-4 space-y-4">
                <h4 className="font-medium">Your usage this month</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">AI Matchmaking Credits</span>
                    <span>{hasPremiumPlan ? `${250 - premiumCredits} / 250 used` : `5 daily searches`}</span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full">
                    <div 
                      className="h-2 bg-brand-pink rounded-full" 
                      style={{ width: hasPremiumPlan ? `${((250 - premiumCredits) / 250) * 100}%` : "0%" }}
                    ></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Active campaign slots</span>
                    <span>{hasPremiumPlan ? "4 / 10" : "0 / 0"}</span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full">
                    <div className="h-2 bg-brand-pink rounded-full w-[40%]"></div>
                  </div>
                </div>
                {hasPremiumPlan && (
                  <div className="pt-2 flex items-center text-sm">
                    <Info className="h-4 w-4 mr-2 text-brand-pink" />
                    <span>You have {premiumCredits} premium credits remaining</span>
                  </div>
                )}
              </div>

              <div className="border rounded-lg p-4">
                <h4 className="font-medium mb-2">Billing information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Payment method
                    </p>
                    <p className="flex items-center gap-2">
                      <CreditCard className="h-4 w-4" /> 
                      {hasPremiumPlan ? "Visa ending in 4242" : "None"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Next billing date
                    </p>
                    <p>{hasPremiumPlan ? "May 1, 2023" : "N/A"}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="plans" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {plans.map((plan) => (
              <Card 
                key={plan.id} 
                className={`relative ${plan.current ? "border-brand-pink shadow-lg" : ""} ${plan.popular ? "border-brand-pink shadow-lg" : ""}`}
              >
                {plan.current && (
                  <div className="absolute top-0 right-0 transform translate-x-1/4 -translate-y-1/4">
                    <span className="bg-brand-pink text-white text-xs font-medium px-2 py-1 rounded-full">
                      Current
                    </span>
                  </div>
                )}
                {plan.popular && !plan.current && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/4">
                    <span className="bg-brand-pink text-white text-xs font-medium px-2 py-1 rounded-full">
                      Most Popular
                    </span>
                  </div>
                )}
                <CardHeader>
                  <CardTitle>{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <span className="text-3xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground">{plan.period}</span>
                  </div>

                  {plan.id !== 'free' && (
                    <div className="p-2 bg-green-50 border border-green-100 rounded-md text-sm text-green-700 flex items-center justify-between">
                      <span>Value:</span>
                      <span className="font-medium">{plan.valuePerCredit} per credit</span>
                    </div>
                  )}

                  <ul className="space-y-2">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className={`w-full ${plan.current ? "bg-brand-pink hover:bg-brand-pink/90" : ""}`}
                    variant={plan.current ? "default" : "outline"}
                    disabled={plan.current || plan.id === "free"}
                    onClick={() => handleSelectPlan(plan.id)}
                  >
                    {plan.current ? "Current Plan" : plan.id === "free" ? "Free Plan" : "Select Plan"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="payment">
          <Card>
            <CardHeader>
              <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-2">
                <div>
                  <CardTitle>Payment Methods</CardTitle>
                  <CardDescription>Manage your payment methods.</CardDescription>
                </div>
                <Button className="flex items-center gap-1">
                  <Plus className="h-4 w-4" /> Add Method
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {paymentMethods.map((method) => (
                <div 
                  key={method.id} 
                  className={`flex justify-between items-center p-4 border rounded-lg ${method.default ? "bg-secondary/50" : ""}`}
                >
                  <div className="flex items-center gap-3">
                    <CreditCard className="h-5 w-5" />
                    <div>
                      <p>{method.name}</p>
                      <p className="text-xs text-muted-foreground">Expires {method.expiry}</p>
                    </div>
                    {method.default && (
                      <span className="text-xs bg-secondary text-foreground px-2 py-0.5 rounded-full">
                        Default
                      </span>
                    )}
                  </div>
                  <Button variant="ghost" size="sm" className="h-8">
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Billing History</CardTitle>
              <CardDescription>View and download your invoices.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs uppercase bg-secondary">
                    <tr>
                      <th scope="col" className="px-4 py-3 rounded-l-lg">
                        Invoice
                      </th>
                      <th scope="col" className="px-4 py-3">
                        Date
                      </th>
                      <th scope="col" className="px-4 py-3">
                        Amount
                      </th>
                      <th scope="col" className="px-4 py-3">
                        Status
                      </th>
                      <th scope="col" className="px-4 py-3 rounded-r-lg">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {billingHistory.map((invoice) => (
                      <tr key={invoice.id} className="border-b">
                        <td className="px-4 py-3">
                          <div className="flex flex-col">
                            <span>{invoice.id}</span>
                            <span className="text-xs text-muted-foreground">{invoice.description}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3">{invoice.date}</td>
                        <td className="px-4 py-3">{invoice.amount}</td>
                        <td className="px-4 py-3">
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            {invoice.status}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="sm" className="h-8">
                              <Receipt className="h-4 w-4 mr-1" />
                              View
                            </Button>
                            <Button variant="ghost" size="sm" className="h-8">
                              <Download className="h-4 w-4 mr-1" />
                              PDF
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Billing;
