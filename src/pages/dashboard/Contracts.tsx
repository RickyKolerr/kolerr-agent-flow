
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Search, FileText, Download, Eye, FilePlus, Send, Clock, CheckCircle2, 
  AlertCircle, FileWarning, FileCheck
} from "lucide-react";
import { toast } from "sonner";
import { Contract } from "@/types/contract";
import { SigningService } from "@/services/SigningService";

// Mock contracts data with real portrait images
const mockContracts: Contract[] = [
  {
    id: "CT-2023-001",
    title: "Summer Collection Promo",
    type: "standard",
    kol: {
      name: "Sophia Chen",
      handle: "@fashionwithsophia",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&auto=format&fit=crop"
    },
    campaign: "Summer Collection Launch",
    createdDate: "2023-06-02",
    status: 'signed',
    value: 1500,
    signwellData: {
      documentId: "doc-123abc",
      completedAt: "2023-06-05"
    }
  },
  {
    id: "CT-2023-002",
    title: "Product Review Agreement",
    type: "review",
    kol: {
      name: "Jake Thomas",
      handle: "@jakeadventures",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&auto=format&fit=crop"
    },
    campaign: "New Product Teaser",
    createdDate: "2023-06-05",
    status: 'sent',
    value: 800,
    signwellData: {
      documentId: "doc-456def",
      signLink: "https://app.signwell.com/sign/abc123",
      expiresAt: "2023-07-05"
    }
  },
  {
    id: "CT-2023-003",
    title: "Content Creation Partnership",
    type: "standard",
    kol: {
      name: "Aisha Mohamed",
      handle: "@aisha_beauty",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&auto=format&fit=crop"
    },
    campaign: "Holiday Special",
    createdDate: "2023-06-10",
    status: 'draft',
    value: 2500
  },
  {
    id: "CT-2023-004",
    title: "Fitness Challenge Sponsorship",
    type: "event",
    kol: {
      name: "Mike Wilson",
      handle: "@mike_fitness",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&auto=format&fit=crop"
    },
    campaign: "Fitness Challenge",
    createdDate: "2023-05-15",
    status: 'signed',
    value: 1200,
    signwellData: {
      documentId: "doc-789ghi",
      completedAt: "2023-05-20"
    }
  },
  {
    id: "CT-2023-005",
    title: "Recipe Collaboration",
    type: "review",
    kol: {
      name: "Priya Singh",
      handle: "@priyacooks",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&auto=format&fit=crop"
    },
    createdDate: "2023-05-28",
    status: 'expired',
    value: 350
  },
  {
    id: "CT-2023-006",
    title: "Tech Review Partnership",
    type: "review",
    kol: {
      name: "David Park",
      handle: "@techwithdavid",
      avatar: "https://images.unsplash.com/photo-1639149888905-fb39731f2e6c?w=150&h=150&auto=format&fit=crop"
    },
    createdDate: "2023-06-12",
    status: 'draft'
  }
];

const ContractsPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  // Filter contracts based on search and active tab
  const filteredContracts = mockContracts
    .filter(contract => 
      contract.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contract.kol.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contract.kol.handle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (contract.campaign && contract.campaign.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    .filter(contract => {
      if (activeTab === "all") return true;
      return contract.status === activeTab;
    });

  const handleCreateContract = () => {
    navigate("/dashboard/contracts/create");
  };

  const handleViewContract = (id: string) => {
    navigate(`/dashboard/contracts/${id}`);
  };

  const handleDownloadContract = (id: string) => {
    const contract = mockContracts.find(c => c.id === id);
    
    if (contract?.signwellData?.documentId) {
      toast.promise(SigningService.downloadContract(contract.signwellData.documentId), {
        loading: "Downloading contract...",
        success: "Contract downloaded successfully",
        error: "Failed to download contract"
      });
    } else {
      toast.error("This contract is not available for download");
    }
  };
  
  const handleSendContract = (id: string) => {
    const contract = mockContracts.find(c => c.id === id);
    if (!contract) return;
    
    toast.promise(SigningService.prepareContract(contract), {
      loading: "Sending contract for signature...",
      success: "Contract sent successfully",
      error: "Failed to send contract for signature"
    });
  };
  
  const handleSignContract = (id: string) => {
    const contract = mockContracts.find(c => c.id === id);
    if (!contract?.signwellData?.signLink) return;
    
    // In a real app, this would open SignWell's signing page
    window.open(contract.signwellData.signLink, "_blank");
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusBadge = (status: Contract['status']) => {
    switch (status) {
      case 'draft':
        return (
          <div className="flex items-center">
            <FileText className="h-4 w-4 mr-1 text-gray-500" />
            <Badge variant="outline" className="bg-gray-500/10 text-gray-500 hover:bg-gray-500/20 border-gray-500/20">Draft</Badge>
          </div>
        );
      case 'sent':
        return (
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1 text-yellow-500" />
            <Badge variant="outline" className="bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20 border-yellow-500/20">Awaiting Signature</Badge>
          </div>
        );
      case 'signed':
        return (
          <div className="flex items-center">
            <CheckCircle2 className="h-4 w-4 mr-1 text-green-500" />
            <Badge variant="outline" className="bg-green-500/10 text-green-500 hover:bg-green-500/20 border-green-500/20">Signed</Badge>
          </div>
        );
      case 'expired':
        return (
          <div className="flex items-center">
            <AlertCircle className="h-4 w-4 mr-1 text-orange-500" />
            <Badge variant="outline" className="bg-orange-500/10 text-orange-500 hover:bg-orange-500/20 border-orange-500/20">Expired</Badge>
          </div>
        );
      case 'canceled':
        return (
          <div className="flex items-center">
            <FileWarning className="h-4 w-4 mr-1 text-red-500" />
            <Badge variant="outline" className="bg-red-500/10 text-red-500 hover:bg-red-500/20 border-red-500/20">Canceled</Badge>
          </div>
        );
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Contracts</h1>
        <Button 
          className="bg-brand-pink hover:bg-brand-pink/90"
          onClick={handleCreateContract}
        >
          <FilePlus className="mr-2 h-4 w-4" /> Create Contract
        </Button>
      </div>

      {/* Search section */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center space-x-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search contracts by title, KOL, or campaign..."
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
            <TabsTrigger value="draft">Drafts</TabsTrigger>
            <TabsTrigger value="sent">Pending</TabsTrigger>
            <TabsTrigger value="signed">Signed</TabsTrigger>
            <TabsTrigger value="expired">Expired</TabsTrigger>
            <TabsTrigger value="canceled">Canceled</TabsTrigger>
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
            onViewContract={handleViewContract}
            onDownloadContract={handleDownloadContract}
            onSendContract={handleSendContract}
            onSignContract={handleSignContract}
          />
        </TabsContent>
        <TabsContent value="draft" className="mt-6">
          <ContractsList 
            contracts={filteredContracts} 
            formatDate={formatDate} 
            getStatusBadge={getStatusBadge}
            onViewContract={handleViewContract}
            onDownloadContract={handleDownloadContract}
            onSendContract={handleSendContract}
            onSignContract={handleSignContract}
          />
        </TabsContent>
        <TabsContent value="sent" className="mt-6">
          <ContractsList 
            contracts={filteredContracts} 
            formatDate={formatDate} 
            getStatusBadge={getStatusBadge}
            onViewContract={handleViewContract}
            onDownloadContract={handleDownloadContract}
            onSendContract={handleSendContract}
            onSignContract={handleSignContract}
          />
        </TabsContent>
        <TabsContent value="signed" className="mt-6">
          <ContractsList 
            contracts={filteredContracts} 
            formatDate={formatDate} 
            getStatusBadge={getStatusBadge}
            onViewContract={handleViewContract}
            onDownloadContract={handleDownloadContract}
            onSendContract={handleSendContract}
            onSignContract={handleSignContract}
          />
        </TabsContent>
        <TabsContent value="expired" className="mt-6">
          <ContractsList 
            contracts={filteredContracts} 
            formatDate={formatDate} 
            getStatusBadge={getStatusBadge}
            onViewContract={handleViewContract}
            onDownloadContract={handleDownloadContract}
            onSendContract={handleSendContract}
            onSignContract={handleSignContract}
          />
        </TabsContent>
        <TabsContent value="canceled" className="mt-6">
          <ContractsList 
            contracts={filteredContracts} 
            formatDate={formatDate} 
            getStatusBadge={getStatusBadge}
            onViewContract={handleViewContract}
            onDownloadContract={handleDownloadContract}
            onSendContract={handleSendContract}
            onSignContract={handleSignContract}
          />
        </TabsContent>
      </Tabs>

      {/* Templates section */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="flex items-center">
            <FileText className="h-5 w-5 mr-2" />
            Contract Templates
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="border rounded-lg p-4 hover:bg-accent transition-colors cursor-pointer">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">Standard Influencer Agreement</h3>
                <FileText className="h-5 w-5 text-muted-foreground" />
              </div>
              <p className="text-sm text-muted-foreground mt-1">Basic terms for sponsored content</p>
            </div>
            <div className="border rounded-lg p-4 hover:bg-accent transition-colors cursor-pointer">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">Product Review Contract</h3>
                <FileText className="h-5 w-5 text-muted-foreground" />
              </div>
              <p className="text-sm text-muted-foreground mt-1">For honest product review campaigns</p>
            </div>
            <div className="border rounded-lg p-4 hover:bg-accent transition-colors cursor-pointer">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">Full Campaign Partnership</h3>
                <FileText className="h-5 w-5 text-muted-foreground" />
              </div>
              <p className="text-sm text-muted-foreground mt-1">Comprehensive multi-post campaign</p>
            </div>
            <div className="border rounded-lg p-4 hover:bg-accent transition-colors cursor-pointer">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">Brand Ambassador</h3>
                <FileText className="h-5 w-5 text-muted-foreground" />
              </div>
              <p className="text-sm text-muted-foreground mt-1">For long-term brand representation</p>
            </div>
            <div className="border rounded-lg p-4 hover:bg-accent transition-colors cursor-pointer">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">Event Appearance</h3>
                <FileText className="h-5 w-5 text-muted-foreground" />
              </div>
              <p className="text-sm text-muted-foreground mt-1">For in-person events and appearances</p>
            </div>
            <div className="border rounded-lg p-4 hover:bg-accent transition-colors cursor-pointer">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">Custom Template</h3>
                <FilePlus className="h-5 w-5 text-brand-pink" />
              </div>
              <p className="text-sm text-muted-foreground mt-1">Create your own contract template</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

interface ContractsListProps {
  contracts: Contract[];
  formatDate: (date: string) => string;
  getStatusBadge: (status: Contract['status']) => React.ReactNode;
  onViewContract: (id: string) => void;
  onDownloadContract: (id: string) => void;
  onSendContract: (id: string) => void;
  onSignContract: (id: string) => void;
}

const ContractsList = ({ 
  contracts, 
  formatDate, 
  getStatusBadge, 
  onViewContract, 
  onDownloadContract,
  onSendContract,
  onSignContract
}: ContractsListProps) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Contract</TableHead>
            <TableHead>KOL</TableHead>
            <TableHead>Campaign</TableHead>
            <TableHead>Created</TableHead>
            <TableHead>Value</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {contracts.length > 0 ? (
            contracts.map((contract) => (
              <TableRow key={contract.id}>
                <TableCell className="font-medium">{contract.id}<br />
                  <span className="text-sm text-muted-foreground">{contract.title}</span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={contract.kol.avatar} alt={contract.kol.name} />
                      <AvatarFallback>{contract.kol.name.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{contract.kol.name}</p>
                      <p className="text-sm text-muted-foreground">{contract.kol.handle}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{contract.campaign || "-"}</TableCell>
                <TableCell>{formatDate(contract.createdDate)}</TableCell>
                <TableCell>
                  {contract.value ? `$${contract.value.toLocaleString()}` : "-"}
                </TableCell>
                <TableCell>{getStatusBadge(contract.status)}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-2">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => onViewContract(contract.id)}
                    >
                      <Eye className="h-4 w-4 mr-1" /> View
                    </Button>
                    
                    {contract.status === 'signed' && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => onDownloadContract(contract.id)}
                      >
                        <Download className="h-4 w-4 mr-1" /> Download
                      </Button>
                    )}
                    
                    {contract.status === 'draft' && (
                      <Button 
                        className="bg-brand-pink hover:bg-brand-pink/90" 
                        size="sm"
                        onClick={() => onSendContract(contract.id)}
                      >
                        <Send className="h-4 w-4 mr-1" /> Send
                      </Button>
                    )}
                    
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

export default ContractsPage;
