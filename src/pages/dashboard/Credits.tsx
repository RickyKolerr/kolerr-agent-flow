
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
  Clock
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

// Credit transaction type definition
interface CreditTransaction {
  id: string;
  type: "usage" | "purchase" | "refund" | "adjustment";
  description: string;
  amount: number;
  balance: number;
  date: string;
}

const CreditsPage = () => {
  // Mock credit data
  const creditData = {
    available: 720,
    total: 1000,
    used: 280,
    expires: "July 31, 2023",
  };

  // Mock transaction data
  const transactions: CreditTransaction[] = [
    {
      id: "tx1",
      type: "usage",
      description: "Fashion KOL Campaign - 4 bookings",
      amount: -100,
      balance: 720,
      date: "2023-06-05"
    },
    {
      id: "tx2",
      type: "purchase",
      description: "Premium package credits purchase",
      amount: 500,
      balance: 820,
      date: "2023-05-28"
    },
    {
      id: "tx3",
      type: "usage",
      description: "Beauty products promotion - 3 bookings",
      amount: -75,
      balance: 320,
      date: "2023-05-15"
    },
    {
      id: "tx4",
      type: "adjustment",
      description: "Loyalty program bonus",
      amount: 50,
      balance: 395,
      date: "2023-04-30"
    },
    {
      id: "tx5",
      type: "usage",
      description: "Tech gadget review - 2 bookings",
      amount: -50,
      balance: 345,
      date: "2023-04-22"
    },
    {
      id: "tx6",
      type: "purchase",
      description: "Basic package credits purchase",
      amount: 200,
      balance: 395,
      date: "2023-04-10"
    },
    {
      id: "tx7",
      type: "refund",
      description: "Canceled booking refund",
      amount: 25,
      balance: 195,
      date: "2023-03-28"
    }
  ];

  const handleBuyCredits = () => {
    toast.success("Redirecting to credits purchase page...");
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
    }
  };

  const getTransactionIcon = (type: CreditTransaction['type']) => {
    switch(type) {
      case 'usage': return <Inbox className="h-4 w-4" />;
      case 'purchase': return <CreditCard className="h-4 w-4" />;
      case 'refund': return <ArrowRight className="h-4 w-4" />;
      case 'adjustment': return <Clock className="h-4 w-4" />;
    }
  };

  const getTransactionPrefix = (amount: number) => {
    return amount > 0 ? '+' : '';
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
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Available Credits</CardTitle>
            <CardDescription>Credits in your account</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col space-y-4">
              <div className="flex items-baseline space-x-2">
                <span className="text-4xl font-bold">{creditData.available}</span>
                <span className="text-muted-foreground">/ {creditData.total}</span>
              </div>
              
              <Progress value={(creditData.available / creditData.total) * 100} className="h-2" />
              
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Credits Used: {creditData.used}</span>
                <span className="text-muted-foreground">Expires: {creditData.expires}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Credit Consumption</CardTitle>
            <CardDescription>How credits are used</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
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
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Premium Campaign</span>
                    <span className="font-medium">200 credits</span>
                  </div>
                  <Progress value={90} max={100} className="h-1" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Transactions table */}
      <Card>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
          <CardDescription>Recent credit transactions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Transaction</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead className="text-right">Balance</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <div className={`rounded-full p-1 ${transaction.amount > 0 ? 'bg-green-500/10' : 'bg-gray-500/10'}`}>
                          {getTransactionIcon(transaction.type)}
                        </div>
                        <span className="font-medium capitalize">{transaction.type}</span>
                      </div>
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
        </CardContent>
      </Card>
    </div>
  );
};

export default CreditsPage;
