
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreditCard, Download, FileText, Clock, ArrowRight, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface Invoice {
  id: string;
  date: string;
  amount: number;
  status: 'paid' | 'pending' | 'overdue';
  description: string;
}

interface PaymentMethod {
  id: string;
  type: 'visa' | 'mastercard' | 'amex' | 'paypal';
  last4: string;
  expiry?: string;
  default: boolean;
}

const BillingPage = () => {
  const navigate = useNavigate();

  // Mock data
  const currentPlan = {
    name: "Professional",
    amount: 99,
    period: "monthly",
    credits: 500,
    renewalDate: "July 1, 2023",
  };

  const invoices: Invoice[] = [
    {
      id: "INV-2023-005",
      date: "2023-06-01",
      amount: 99,
      status: 'paid',
      description: "Professional Plan - Monthly"
    },
    {
      id: "INV-2023-004",
      date: "2023-05-01",
      amount: 99,
      status: 'paid',
      description: "Professional Plan - Monthly"
    },
    {
      id: "INV-2023-003",
      date: "2023-04-01",
      amount: 99,
      status: 'paid',
      description: "Professional Plan - Monthly"
    },
    {
      id: "INV-2023-002",
      date: "2023-03-01",
      amount: 75,
      status: 'paid',
      description: "Basic Plan - Monthly"
    },
    {
      id: "INV-2023-001",
      date: "2023-02-01",
      amount: 75,
      status: 'paid',
      description: "Basic Plan - Monthly"
    }
  ];

  const paymentMethods: PaymentMethod[] = [
    {
      id: "pm1",
      type: "visa",
      last4: "4242",
      expiry: "06/25",
      default: true
    },
    {
      id: "pm2",
      type: "mastercard",
      last4: "8888",
      expiry: "10/24",
      default: false
    },
    {
      id: "pm3",
      type: "paypal",
      last4: "",
      default: false
    }
  ];

  const handleViewPlan = () => {
    navigate("/dashboard/subscription");
  };

  const handleManagePayment = () => {
    navigate("/dashboard/payment");
  };

  const handleDownloadInvoice = (id: string) => {
    toast.success(`Downloading invoice ${id}...`);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusBadge = (status: Invoice['status']) => {
    switch(status) {
      case 'paid': return <Badge variant="outline" className="bg-green-500/10 text-green-500 hover:bg-green-500/20 border-green-500/20">Paid</Badge>;
      case 'pending': return <Badge variant="outline" className="bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20 border-yellow-500/20">Pending</Badge>;
      case 'overdue': return <Badge variant="outline" className="bg-red-500/10 text-red-500 hover:bg-red-500/20 border-red-500/20">Overdue</Badge>;
    }
  };

  const getCreditCardIcon = (type: PaymentMethod['type']) => {
    switch(type) {
      case 'visa': return <span className="text-blue-600 font-bold">VISA</span>;
      case 'mastercard': return <span className="text-orange-500 font-bold">MC</span>;
      case 'amex': return <span className="text-blue-800 font-bold">AMEX</span>;
      case 'paypal': return <span className="text-blue-700 font-bold">PP</span>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Billing & Payments</h1>
      </div>

      {/* Current Plan */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <FileText className="h-5 w-5 mr-2" />
            Current Subscription
          </CardTitle>
          <CardDescription>Your current plan and upcoming charges</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center border rounded-lg p-4">
            <div className="space-y-1">
              <div className="flex items-center">
                <h3 className="text-lg font-medium">{currentPlan.name} Plan</h3>
                <Badge variant="outline" className="ml-2 bg-brand-pink/10 text-brand-pink hover:bg-brand-pink/20 border-brand-pink/20">
                  {currentPlan.period.charAt(0).toUpperCase() + currentPlan.period.slice(1)}
                </Badge>
              </div>
              <p className="text-muted-foreground text-sm">
                ${currentPlan.amount} per month • {currentPlan.credits} Credits
              </p>
              <div className="flex items-center text-sm text-muted-foreground">
                <Clock className="h-3 w-3 mr-1" />
                <span>Renews on {currentPlan.renewalDate}</span>
              </div>
            </div>
            <div className="mt-4 md:mt-0 flex flex-col sm:flex-row gap-2">
              <Button
                variant="outline"
                onClick={handleManagePayment}
              >
                Manage Payment
              </Button>
              <Button
                className="bg-brand-pink hover:bg-brand-pink/90"
                onClick={handleViewPlan}
              >
                Change Plan
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Methods & Invoices */}
      <Tabs defaultValue="payment-methods">
        <TabsList>
          <TabsTrigger value="payment-methods">Payment Methods</TabsTrigger>
          <TabsTrigger value="invoices">Invoices</TabsTrigger>
        </TabsList>
        <TabsContent value="payment-methods" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CreditCard className="h-5 w-5 mr-2" />
                Payment Methods
              </CardTitle>
              <CardDescription>Manage your payment methods</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {paymentMethods.map((method) => (
                  <div key={method.id} className="flex justify-between items-center p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="h-10 w-16 bg-muted rounded flex items-center justify-center">
                        {getCreditCardIcon(method.type)}
                      </div>
                      <div>
                        <p className="font-medium">
                          {method.type === 'paypal' ? 'PayPal' : `${method.type.charAt(0).toUpperCase() + method.type.slice(1)} ending in ${method.last4}`}
                        </p>
                        {method.expiry && (
                          <p className="text-sm text-muted-foreground">Expires {method.expiry}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {method.default && (
                        <Badge variant="outline">Default</Badge>
                      )}
                      <Button variant="ghost" size="sm">
                        Edit
                      </Button>
                      {!method.default && (
                        <Button variant="ghost" size="sm">
                          Remove
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
                
                <Button 
                  onClick={() => navigate("/dashboard/payment")}
                  className="w-full bg-brand-pink hover:bg-brand-pink/90"
                >
                  <Plus className="mr-2 h-4 w-4" /> Add Payment Method
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="invoices" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="h-5 w-5 mr-2" />
                Invoice History
              </CardTitle>
              <CardDescription>View and download your past invoices</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Invoice</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {invoices.map((invoice) => (
                      <TableRow key={invoice.id}>
                        <TableCell className="font-medium">{invoice.id}</TableCell>
                        <TableCell>{formatDate(invoice.date)}</TableCell>
                        <TableCell>${invoice.amount.toFixed(2)}</TableCell>
                        <TableCell>{invoice.description}</TableCell>
                        <TableCell>{getStatusBadge(invoice.status)}</TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDownloadInvoice(invoice.id)}
                          >
                            <Download className="h-4 w-4 mr-1" /> Download
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Billing Address */}
      <Card>
        <CardHeader>
          <CardTitle>Billing Address</CardTitle>
          <CardDescription>Address used for invoice generation</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg p-4">
            <div className="space-y-1">
              <p className="font-medium">Alex Johnson</p>
              <p className="text-muted-foreground">Brand Innovations Inc.</p>
              <p className="text-muted-foreground">123 Business Ave, Suite 500</p>
              <p className="text-muted-foreground">New York, NY 10001</p>
              <p className="text-muted-foreground">United States</p>
            </div>
            <Button variant="outline" className="mt-4">
              Update Address
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BillingPage;
