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
  Info,
  ArrowRight
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { useCredits } from "@/contexts/CreditContext";
import { useAuth } from "@/contexts/AuthContext";

const Billing = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const navigate = useNavigate();
  const { hasPremiumPlan, premiumCredits } = useCredits();
  const { user } = useAuth();

  const handleUpgrade = () => {
    navigate("/dashboard/subscription");
  };

  const handleBuyCredits = () => {
    navigate("/dashboard/checkout");
  };

  // Mock data for billing plans
  const plans = [
    {
      id: "starter",
      name: "Starter",
      description: "Perfect for small brands just getting started with influencer marketing.",
      price: "$49",
      features: [
        "10 KOL searches per month",
        "5 outreach campaigns",
        "Basic analytics",
        "Email support"
      ],
      current: false
    },
    {
      id: "pro",
      name: "Pro",
      description: "For growing brands with active influencer marketing programs.",
      price: "$149",
      features: [
        "50 KOL searches per month",
        "Unlimited campaigns",
        "Advanced analytics & reporting",
        "Priority support",
        "Contract templates"
      ],
      current: true
    },
    {
      id: "enterprise",
      name: "Enterprise",
      description: "For established brands with extensive influencer partnerships.",
      price: "$499",
      features: [
        "Unlimited KOL searches",
        "Unlimited campaigns",
        "Custom analytics",
        "Dedicated account manager",
        "Custom contract creation",
        "API access"
      ],
      current: false
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
      amount: "$149.00",
      status: "Paid",
      description: "Pro Plan - Monthly"
    },
    {
      id: "INV-002",
      date: "Mar 1, 2023",
      amount: "$149.00",
      status: "Paid",
      description: "Pro Plan - Monthly"
    },
    {
      id: "INV-003",
      date: "Feb 1, 2023",
      amount: "$149.00",
      status: "Paid",
      description: "Pro Plan - Monthly"
    },
    {
      id: "INV-004",
      date: "Jan 1, 2023",
      amount: "$49.00",
      status: "Paid",
      description: "Starter Plan - Monthly"
    }
  ];

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
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 border rounded-lg">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-lg">
                      {hasPremiumPlan ? "Premium Plan" : "Free Plan"}
                    </h3>
                    {hasPremiumPlan && (
                      <Badge className="bg-green-500/10 text-green-500 hover:bg-green-500/20">
                        Active
                      </Badge>
                    )}
                  </div>
                  <p className="text-muted-foreground">
                    {hasPremiumPlan 
                      ? "Premium features and credits" 
                      : "Basic features with limited credits"}
                  </p>
                </div>
                <div className="flex flex-col xs:flex-row gap-2">
                  {!hasPremiumPlan && (
                    <Button 
                      onClick={handleUpgrade}
                      className="bg-brand-pink hover:bg-brand-pink/90"
                    >
                      Upgrade Plan <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  )}
                  <Button 
                    variant="outline" 
                    onClick={handleBuyCredits}
                  >
                    Buy Credits
                  </Button>
                </div>
              </div>

              <div className="border rounded-lg p-4 space-y-4">
                <h4 className="font-medium">Your credits usage</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Available credits</span>
                    <span>{premiumCredits} credits</span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full">
                    <div 
                      className="h-2 bg-brand-pink rounded-full" 
                      style={{ width: `${Math.min((premiumCredits / 1000) * 100, 100)}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              {user?.email && (
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-2">Billing information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        Receipt email
                      </p>
                      <p className="flex items-center gap-2">
                        {user.email}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payment" className="space-y-4">
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

        <TabsContent value="history" className="space-y-4">
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
