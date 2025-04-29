import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Search, FileText, Download, Eye, Clock, CheckCircle2, 
  AlertCircle, DollarSign, Calendar, BarChart4, FileCheck
} from "lucide-react";
import { toast } from "sonner";
import { Contract } from "@/types/contract";
import { SigningService } from "@/services/SigningService";
import { useUserAccess } from "@/hooks/useUserAccess";
import { Separator } from "@/components/ui/separator";

const KOLContractsPage = () => {
  const navigate = useNavigate();
  const { user } = useUserAccess();
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [analyticsData, setAnalyticsData] = useState<any>(null);

  useEffect(() => {
    const fetchContracts = async () => {
      setIsLoading(true);
      try {
        // In a real app, we would use the actual KOL ID from auth context
        const kolId = user?.id || 'kol1';
        const contracts = await SigningService.getKOLContracts(kolId);
        setContracts(contracts);
        
        // Also fetch analytics
        const analytics = await SigningService.getKOLContractAnalytics(kolId);
        setAnalyticsData(analytics);
      } catch (error) {
        console.error("Error fetching contracts:", error);
        toast.error("Failed to load contracts");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchContracts();
  }, [user]);

  // Filter contracts based on search and active tab
  const filteredContracts = contracts
    .filter(contract => 
      contract.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (contract.brand?.name && contract.brand.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (contract.campaign && contract.campaign.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    .filter(contract => {
      if (activeTab === "all") return true;
      if (activeTab === "pending") return contract.status === "sent" && (!contract.kolStatus || contract.kolStatus === "pending" || contract.kolStatus === "viewed");
      if (activeTab === "signed") return contract.status === "signed";
      if (activeTab === "completed" && contract.earnings) return contract.status === "signed" && contract.earnings.status === "paid";
      return contract.status === activeTab;
    });

  const handleViewContract = (id: string) => {
    navigate(`/dashboard/contracts/${id}`);
    
    // In a real app, this would mark the contract as viewed by the KOL
    const contract = contracts.find(c => c.id === id);
    if (contract && contract.kolStatus === 'pending') {
      SigningService.kolViewContract(id).then((updatedContract) => {
        setContracts(contracts.map(c => c.id === id ? updatedContract : c));
      });
    }
  };

  const handleSignContract = (id: string) => {
    const contract = contracts.find(c => c.id === id);
    if (!contract?.signwellData?.signLink) return;
    
    // In a real app, this would open SignWell's signing page
    window.open(contract.signwellData.signLink, "_blank");
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A";
    
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusBadge = (status: Contract['status'], kolStatus?: string) => {
    if (status === 'sent' && kolStatus === 'pending') {
      return (
        <Badge variant="outline" className="bg-blue-500/10 text-blue-500 hover:bg-blue-500/20 border-blue-500/20">
          New Contract
        </Badge>
      );
    }
    
    if (status === 'sent' && kolStatus === 'viewed') {
      return (
        <Badge variant="outline" className="bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20 border-yellow-500/20">
          <Clock className="h-4 w-4 mr-1" /> Action Required
        </Badge>
      );
    }
    
    switch (status) {
      case 'draft':
        return (
          <Badge variant="outline" className="bg-gray-500/10 text-gray-500 hover:bg-gray-500/20 border-gray-500/20">
            <FileText className="h-4 w-4 mr-1" /> Draft
          </Badge>
        );
      case 'sent':
        return (
          <Badge variant="outline" className="bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20 border-yellow-500/20">
            <Clock className="h-4 w-4 mr-1" /> Awaiting Signature
          </Badge>
        );
      case 'signed':
        return (
          <Badge variant="outline" className="bg-green-500/10 text-green-500 hover:bg-green-500/20 border-green-500/20">
            <CheckCircle2 className="h-4 w-4 mr-1" /> Signed
          </Badge>
        );
      case 'expired':
        return (
          <Badge variant="outline" className="bg-orange-500/10 text-orange-500 hover:bg-orange-500/20 border-orange-500/20">
            <AlertCircle className="h-4 w-4 mr-1" /> Expired
          </Badge>
        );
      case 'canceled':
        return (
          <Badge variant="outline" className="bg-red-500/10 text-red-500 hover:bg-red-500/20 border-red-500/20">
            Canceled
          </Badge>
        );
      default:
        return (
          <Badge variant="outline">
            {String(status).charAt(0).toUpperCase() + String(status).slice(1)}
          </Badge>
        );
    }
  };

  const getPaymentStatusBadge = (status?: string) => {
    if (!status) return null;
    
    switch (status) {
      case 'pending':
        return (
          <Badge variant="outline" className="bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20 border-yellow-500/20">
            <Clock className="h-4 w-4 mr-1" /> Payment Pending
          </Badge>
        );
      case 'processing':
        return (
          <Badge variant="outline" className="bg-blue-500/10 text-blue-500 hover:bg-blue-500/20 border-blue-500/20">
            Processing
          </Badge>
        );
      case 'paid':
        return (
          <Badge variant="outline" className="bg-green-500/10 text-green-500 hover:bg-green-500/20 border-green-500/20">
            <CheckCircle2 className="h-4 w-4 mr-1" /> Paid
          </Badge>
        );
      default:
        return null;
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-pink"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">My Contracts</h1>
      
      {/* Analytics summary */}
      {analyticsData && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Earnings</p>
                  <p className="text-2xl font-bold">${analyticsData.totalEarnings.toLocaleString()}</p>
                </div>
                <div className="h-12 w-12 rounded-lg bg-green-100 flex items-center justify-center">
                  <DollarSign className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Contracts</p>
                  <p className="text-2xl font-bold">{analyticsData.totalContracts}</p>
                </div>
                <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center">
                  <FileText className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Pending Contracts</p>
                  <p className="text-2xl font-bold">{analyticsData.pendingContracts}</p>
                </div>
                <div className="h-12 w-12 rounded-lg bg-yellow-100 flex items-center justify-center">
                  <Clock className="h-6 w-6 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Average Value</p>
                  <p className="text-2xl font-bold">${analyticsData.averageValue.toLocaleString()}</p>
                </div>
                <div className="h-12 w-12 rounded-lg bg-purple-100 flex items-center justify-center">
                  <BarChart4 className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Action required alert */}
      {contracts.filter(c => c.status === 'sent' && (!c.kolStatus || c.kolStatus === 'pending' || c.kolStatus === 'viewed')).length > 0 && (
        <Alert className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20">
          <Clock className="h-4 w-4" />
          <AlertTitle>Action Required</AlertTitle>
          <AlertDescription>
            You have {contracts.filter(c => c.status === 'sent' && (!c.kolStatus || c.kolStatus === 'pending' || c.kolStatus === 'viewed')).length} contracts that need your attention.
          </AlertDescription>
        </Alert>
      )}

      {/* Search section */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center space-x-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search contracts by title, brand, or campaign..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1"
            />
          </div>
        </CardContent>
      </Card>

      {/* Tabs for different contract statuses */}
      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <div className="flex justify-between items-center">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="signed">Signed</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>
          <span className="text-sm text-muted-foreground">
            {filteredContracts.length} contracts
          </span>
        </div>

        <TabsContent value="all" className="mt-6">
          <ContractsList 
            contracts={filteredContracts}
            formatDate={formatDate}
            getStatusBadge={getStatusBadge}
            getPaymentStatusBadge={getPaymentStatusBadge}
            onViewContract={handleViewContract}
            onSignContract={handleSignContract}
          />
        </TabsContent>
        <TabsContent value="pending" className="mt-6">
          <ContractsList 
            contracts={filteredContracts}
            formatDate={formatDate}
            getStatusBadge={getStatusBadge}
            getPaymentStatusBadge={getPaymentStatusBadge}
            onViewContract={handleViewContract}
            onSignContract={handleSignContract}
          />
        </TabsContent>
        <TabsContent value="signed" className="mt-6">
          <ContractsList 
            contracts={filteredContracts}
            formatDate={formatDate}
            getStatusBadge={getStatusBadge}
            getPaymentStatusBadge={getPaymentStatusBadge}
            onViewContract={handleViewContract}
            onSignContract={handleSignContract}
          />
        </TabsContent>
        <TabsContent value="completed" className="mt-6">
          <ContractsList 
            contracts={filteredContracts}
            formatDate={formatDate}
            getStatusBadge={getStatusBadge}
            getPaymentStatusBadge={getPaymentStatusBadge}
            onViewContract={handleViewContract}
            onSignContract={handleSignContract}
          />
        </TabsContent>
      </Tabs>

      {/* Contract history section */}
      {analyticsData && (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Contract History</CardTitle>
            <CardDescription>
              Overview of your contract activity over time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              {/* This would be a chart in a real implementation */}
              <div className="flex h-full items-end gap-2">
                {analyticsData.contractsByMonth.map((month, i) => (
                  <div key={i} className="relative flex flex-1 flex-col items-center">
                    <div 
                      className="w-full bg-brand-pink/90 rounded-t"
                      style={{ 
                        height: `${(month.value / Math.max(...analyticsData.contractsByMonth.map(m => m.value))) * 200}px` 
                      }}
                    ></div>
                    <div className="mt-2 text-xs font-medium">{month.month}</div>
                    <div className="absolute bottom-[calc(100%+5px)] text-xs font-medium">
                      ${month.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

interface ContractsListProps {
  contracts: Contract[];
  formatDate: (date?: string) => string;
  getStatusBadge: (status: Contract['status'], kolStatus?: string) => React.ReactNode;
  getPaymentStatusBadge: (status?: string) => React.ReactNode | null;
  onViewContract: (id: string) => void;
  onSignContract: (id: string) => void;
}

const ContractsList = ({
  contracts,
  formatDate,
  getStatusBadge,
  getPaymentStatusBadge,
  onViewContract,
  onSignContract
}: ContractsListProps) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Contract</TableHead>
            <TableHead>Brand</TableHead>
            <TableHead>Campaign</TableHead>
            <TableHead>Dates</TableHead>
            <TableHead>Value</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {contracts.length > 0 ? (
            contracts.map((contract) => (
              <TableRow key={contract.id}>
                <TableCell className="font-medium">
                  {contract.id}
                  <br />
                  <span className="text-sm text-muted-foreground">{contract.title}</span>
                </TableCell>
                <TableCell>
                  {contract.brand ? (
                    <div className="font-medium">
                      {contract.brand.name}
                    </div>
                  ) : (
                    <span className="text-muted-foreground">Not specified</span>
                  )}
                </TableCell>
                <TableCell>{contract.campaign || "-"}</TableCell>
                <TableCell>
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center text-xs">
                      <Calendar className="h-3 w-3 mr-1 text-muted-foreground" />
                      <span>Start: {formatDate(contract.startDate)}</span>
                    </div>
                    <div className="flex items-center text-xs">
                      <Calendar className="h-3 w-3 mr-1 text-muted-foreground" />
                      <span>End: {formatDate(contract.endDate)}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  {contract.value ? (
                    <div className="font-medium">${contract.value.toLocaleString()}</div>
                  ) : (
                    <span className="text-muted-foreground">Not specified</span>
                  )}
                  {contract.earnings && getPaymentStatusBadge(contract.earnings.status)}
                </TableCell>
                <TableCell>{getStatusBadge(contract.status, contract.kolStatus)}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onViewContract(contract.id)}
                    >
                      <Eye className="h-4 w-4 mr-1" /> View
                    </Button>

                    {contract.status === 'sent' && (
                      <Button
                        className="bg-brand-pink hover:bg-brand-pink/90"
                        size="sm"
                        onClick={() => onSignContract(contract.id)}
                      >
                        <FileCheck className="h-4 w-4 mr-1" /> Sign
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} className="h-24 text-center">
                <div className="flex flex-col items-center justify-center">
                  <FileText className="h-8 w-8 text-muted-foreground mb-2" />
                  <p className="text-muted-foreground">No contracts found</p>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default KOLContractsPage;
