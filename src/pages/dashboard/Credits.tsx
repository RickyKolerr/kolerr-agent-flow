
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CreditCard, Search, Clock, Calendar } from "lucide-react";
import { toast } from "sonner";
import { useCredits } from "@/contexts/CreditContext";
import { useAuth } from "@/contexts/AuthContext";
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

  // Mock transaction data for demonstration
  const transactions: CreditTransaction[] = [
    {
      id: "tx1",
      type: "reset",
      description: "Daily free searches reset",
      amount: 5,
      balance: 5,
      date: new Date().toISOString(),
      creditType: "free"
    },
    {
      id: "tx2",
      type: "usage",
      description: "TikTok creator search - Tech niche",
      amount: -1,
      balance: 4,
      date: new Date().toISOString(),
      creditType: "free"
    },
    {
      id: "tx3",
      type: "purchase",
      description: "Premium plan subscription",
      amount: 500,
      balance: 500,
      date: "2024-04-01",
      creditType: "premium"
    }
  ];

  const handleBuyCredits = () => {
    navigate("/pricing");
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getTransactionIcon = (type: CreditTransaction['type']) => {
    switch(type) {
      case 'usage': return <Search className="h-4 w-4" />;
      case 'purchase': return <CreditCard className="h-4 w-4" />;
      case 'reset': return <Calendar className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const getTransactionColor = (type: CreditTransaction['type']) => {
    switch(type) {
      case 'usage': return 'text-red-500';
      case 'purchase': return 'text-green-500';
      case 'refund': return 'text-green-500';
      default: return 'text-blue-500';
    }
  };

  const filteredTransactions = (creditType: "free" | "premium" | "all") => {
    if (creditType === "all") return transactions;
    return transactions.filter(tx => tx.creditType === creditType);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Search Credits</h1>
        <Button 
          className="bg-brand-pink hover:bg-brand-pink/90"
          onClick={handleBuyCredits}
        >
          <CreditCard className="mr-2 h-4 w-4" />
          Get More Credits
        </Button>
      </div>

      {/* Credit summary cards */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Daily Free Credits card */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center">
              <Calendar className="mr-2 h-5 w-5 text-brand-pink" />
              Free Daily Searches
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
              <Search className="mr-2 h-5 w-5 text-brand-pink" />
              Premium Searches
            </CardTitle>
            <CardDescription>
              {hasPremiumPlan ? "From your subscription plan" : "Upgrade to get premium searches"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col space-y-4">
              {hasPremiumPlan ? (
                <>
                  <div className="flex items-baseline space-x-2">
                    <span className="text-4xl font-bold">{premiumCredits}</span>
                    <span className="text-muted-foreground"> searches remaining</span>
                  </div>
                  
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Premium Plan Active</span>
                    <span>Renews Monthly</span>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center h-[120px]">
                  <p className="text-center text-muted-foreground mb-4">
                    Get unlimited premium searches with a subscription
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
      </div>

      {/* Search Credit Usage */}
      <Card>
        <CardHeader>
          <CardTitle>Search Credit Usage</CardTitle>
          <CardDescription>How credits are used for different search types</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Basic Creator Search</span>
                  <span className="font-medium">1 credit</span>
                </div>
                <Progress value={20} className="h-1" />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Advanced Analytics</span>
                  <span className="font-medium">2 credits</span>
                </div>
                <Progress value={40} className="h-1" />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Niche Analysis</span>
                  <span className="font-medium">3 credits</span>
                </div>
                <Progress value={60} className="h-1" />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Audience Insights</span>
                  <span className="font-medium">5 credits</span>
                </div>
                <Progress value={100} className="h-1" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Transactions table with tabs */}
      <Card>
        <CardHeader>
          <CardTitle>Search History</CardTitle>
          <CardDescription>View your search credit transactions</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="space-y-4">
            <TabsList>
              <TabsTrigger value="all">All Credits</TabsTrigger>
              <TabsTrigger value="free">Free Credits</TabsTrigger>
              <TabsTrigger value="premium">Premium Credits</TabsTrigger>
            </TabsList>
            
            {["all", "free", "premium"].map((tabValue) => (
              <TabsContent key={tabValue} value={tabValue}>
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
                              <div className={`rounded-full p-1 ${
                                transaction.amount > 0 ? 'bg-green-500/10' : 'bg-gray-500/10'
                              }`}>
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
                          <TableCell>{transaction.description}</TableCell>
                          <TableCell>{formatDate(transaction.date)}</TableCell>
                          <TableCell className={`text-right ${getTransactionColor(transaction.type)}`}>
                            {transaction.amount > 0 ? '+' : ''}{transaction.amount}
                          </TableCell>
                          <TableCell className="text-right font-medium">
                            {transaction.balance}
                          </TableCell>
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
