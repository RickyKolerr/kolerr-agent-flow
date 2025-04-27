import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  ArrowRight,
  CreditCard,
  Download,
  Inbox,
  Plus,
  Clock,
  Calendar
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";
import { useCredits } from "@/contexts/CreditContext";
import { useAuth } from "@/contexts/AuthContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";

// Credit transaction type definition
interface CreditTransaction {
  id: string;
  type: "usage" | "purchase" | "refund" | "adjustment" | "reset";
  description: string;
  amount: number;
  balance: number;
  date: string;
  creditType: "free" | "premium";
}

const CreditsPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const { freeCredits, premiumCredits, totalCredits, timeUntilReset, hasPremiumPlan } = useCredits();
  const { user } = useAuth();
  
  // Get the premium plan credit allocation
  const getPremiumCreditAllocation = () => {
    const plan = user?.subscription?.plan;
    if (plan === "pro") return 500;
    if (plan === "growth") return 200;
    if (plan === "enterprise") return 2000;
    return 0;
  };
  
  // Mock credit data
  const creditData = {
    available: premiumCredits,
    total: hasPremiumPlan ? getPremiumCreditAllocation() : 0,
    used: hasPremiumPlan ? (getPremiumCreditAllocation() - premiumCredits) : 0,
    expires: "End of billing period",
  };

  // Mock transaction data
  const transactions: CreditTransaction[] = [
    {
      id: "tx1",
      type: "reset",
      description: "Daily free credits reset",
      amount: 5,
      balance: 5,
      date: new Date().toISOString(),
      creditType: "free"
    },
    {
      id: "tx2",
      type: "usage",
      description: "Fashion KOL Campaign - 4 bookings",
      amount: -100,
      balance: 720,
      date: "2023-06-05",
      creditType: "premium"
    },
    {
      id: "tx3",
      type: "purchase",
      description: "Premium package credits purchase",
      amount: 500,
      balance: 820,
      date: "2023-05-28",
      creditType: "premium"
    },
    {
      id: "tx4",
      type: "usage",
      description: "Beauty products promotion - 3 bookings",
      amount: -75,
      balance: 320,
      date: "2023-05-15",
      creditType: "premium"
    },
    {
      id: "tx5",
      type: "usage",
      description: "Daily search - Tech niche",
      amount: -1,
      balance: 4,
      date: "2023-05-15",
      creditType: "free"
    },
    {
      id: "tx6",
      type: "adjustment",
      description: "Loyalty program bonus",
      amount: 50,
      balance: 395,
      date: "2023-04-30",
      creditType: "premium"
    }
  ];

  const handleBuyCredits = () => {
    navigate("/pricing");
  };

  const handleDownloadStatement = () => {
    toast.success("Downloading credit statement...");
  };

  // Helper functions
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getTransactionColor = (type: CreditTransaction['type']) => {
    switch(type) {
      case 'usage': return 'text-red-500';
      case 'purchase': return 'text-green-500';
      case 'refund': return 'text-green-500';
      case 'adjustment': return 'text-blue-500';
      case 'reset': return 'text-green-500';
    }
  };

  const getTransactionIcon = (type: CreditTransaction['type']) => {
    switch(type) {
      case 'usage': return <Inbox className="h-4 w-4" />;
      case 'purchase': return <CreditCard className="h-4 w-4" />;
      case 'refund': return <ArrowRight className="h-4 w-4" />;
      case 'adjustment': return <Clock className="h-4 w-4" />;
      case 'reset': return <Calendar className="h-4 w-4" />;
    }
  };

  const getTransactionPrefix = (amount: number) => {
    return amount > 0 ? '+' : '';
  };

  const filteredTransactions = (creditType: "free" | "premium" | "all") => {
    if (creditType === "all") return transactions;
    return transactions.filter(tx => tx.creditType === creditType);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Credits</h1>
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            onClick={handleDownloadStatement}
          >
            <Download className="mr-2 h-4 w-4" /> Statement
          </Button>
          <Button 
            className="bg-brand-pink hover:bg-brand-pink/90"
            onClick={handleBuyCredits}
          >
            <Plus className="mr-2 h-4 w-4" /> Buy Credits
          </Button>
        </div>
      </div>

      {/* Credit summary cards */}
      <div className="grid gap-4 md:grid-cols-3">
        {/* Daily Free Credits card */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center">
              <Calendar className="mr-2 h-5 w-5 text-brand-pink" />
              Free Daily Credits
            </CardTitle>
            <CardDescription>Resets daily at 7:00 AM</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col space-y-4">
              <div className="flex items-baseline space-x-2">
                <span className="text-4xl font-bold">{freeCredits}</span>
                <span className="text-muted-foreground">/ 5</span>
              </div>
              
              <Progress value={(freeCredits / 5) * 100} className="h-2" />
              
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">
                  Used: {5 - freeCredits}
                </span>
                <span className="text-muted-foreground">
                  Resets in: {timeUntilReset}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Premium Credits card */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center">
              <CreditCard className="mr-2 h-5 w-5 text-brand-pink" />
              Premium Credits
            </CardTitle>
            <CardDescription>
              {hasPremiumPlan ? "From your subscription plan" : "Upgrade to get premium credits"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col space-y-4">
              {hasPremiumPlan ? (
                <>
                  <div className="flex items-baseline space-x-2">
                    <span className="text-4xl font-bold">{premiumCredits}</span>
                    <span className="text-muted-foreground">/ {creditData.total}</span>
                  </div>
                  
                  <Progress value={(premiumCredits / creditData.total) * 100} className="h-2" />
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      Credits Used: {creditData.used}
                    </span>
                    <span className="text-muted-foreground">
                      Premium Plan
                    </span>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center h-[120px]">
                  <p className="text-center text-muted-foreground mb-4">
                    Upgrade to a premium plan to get additional credits
                  </p>
                  <Button 
                    className="bg-brand-pink hover:bg-brand-pink/90"
                    onClick={() => navigate("/pricing")}
                  >
                    View Plans
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Credit Consumption card */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Credit Consumption</CardTitle>
            <CardDescription>How credits are used</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Standard Search</span>
                    <span className="font-medium">1 credit</span>
                  </div>
                  <Progress value={20} max={100} className="h-1" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Standard Booking</span>
                    <span className="font-medium">25 credits</span>
                  </div>
                  <Progress value={25} max={100} className="h-1" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Premium Booking</span>
                    <span className="font-medium">50 credits</span>
                  </div>
                  <Progress value={50} max={100} className="h-1" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Standard Campaign</span>
                    <span className="font-medium">100 credits</span>
                  </div>
                  <Progress value={70} max={100} className="h-1" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Transactions table with tabs */}
      <Card>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
          <CardDescription>View your credit transactions</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="space-y-4">
            <TabsList>
              <TabsTrigger value="all">All Credits</TabsTrigger>
              <TabsTrigger value="free">Free Credits</TabsTrigger>
              <TabsTrigger value="premium">Premium Credits</TabsTrigger>
            </TabsList>
            
            {["all", "free", "premium"].map((tabValue) => (
              <TabsContent key={tabValue} value={tabValue} className="space-y-4">
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Transaction</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                        <TableHead className="text-right">Balance</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredTransactions(tabValue as any).map((transaction) => (
                        <TableRow key={transaction.id}>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <div className={`rounded-full p-1 ${transaction.amount > 0 ? 'bg-green-500/10' : 'bg-gray-500/10'}`}>
                                {getTransactionIcon(transaction.type)}
                              </div>
                              <span className="font-medium capitalize">{transaction.type}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              transaction.creditType === "free" 
                                ? "bg-blue-500/10 text-blue-500" 
                                : "bg-purple-500/10 text-purple-500"
                            }`}>
                              {transaction.creditType === "free" ? "Free" : "Premium"}
                            </span>
                          </TableCell>
                          <TableCell className="max-w-[200px] truncate">{transaction.description}</TableCell>
                          <TableCell>{formatDate(transaction.date)}</TableCell>
                          <TableCell className={`text-right ${getTransactionColor(transaction.type)}`}>
                            {getTransactionPrefix(transaction.amount)}{transaction.amount}
                          </TableCell>
                          <TableCell className="text-right font-medium">{transaction.balance}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreditsPage;
