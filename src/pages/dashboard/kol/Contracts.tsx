
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Download, FileText, ClipboardCheck, Clock } from "lucide-react";

// Mock contracts data
const mockContracts = [
  {
    id: "c001",
    title: "Spring Fashion Campaign",
    brand: "StyleCo",
    brandLogo: "https://api.dicebear.com/7.x/identicon/svg?seed=StyleCo",
    status: "active",
    startDate: "April 15, 2025",
    endDate: "May 30, 2025",
    compensation: "$1,200",
    deliverables: "3 Instagram posts, 2 TikTok videos",
    paymentStatus: "50% paid",
  },
  {
    id: "c002",
    title: "Product Review Series",
    brand: "TechGadget",
    brandLogo: "https://api.dicebear.com/7.x/identicon/svg?seed=TechGadget",
    status: "pending",
    startDate: "May 1, 2025",
    endDate: "June 15, 2025",
    compensation: "$2,000",
    deliverables: "2 YouTube reviews, 1 blog post",
    paymentStatus: "Awaiting signature",
  },
  {
    id: "c003",
    title: "Winter Collection Showcase",
    brand: "WinterFashion",
    brandLogo: "https://api.dicebear.com/7.x/identicon/svg?seed=WinterFashion",
    status: "completed",
    startDate: "January 10, 2025",
    endDate: "February 28, 2025",
    compensation: "$1,800",
    deliverables: "4 Instagram posts, 3 stories, 1 Reel",
    paymentStatus: "Fully paid",
  },
  {
    id: "c004",
    title: "Wellness Product Promotion",
    brand: "HealthyLife",
    brandLogo: "https://api.dicebear.com/7.x/identicon/svg?seed=HealthyLife",
    status: "completed",
    startDate: "February 1, 2025",
    endDate: "March 15, 2025",
    compensation: "$1,500",
    deliverables: "2 Instagram posts, 1 YouTube video",
    paymentStatus: "Fully paid",
  },
];

const KolContracts = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const filteredContracts = mockContracts
    .filter(contract => 
      activeTab === "all" || 
      contract.status === activeTab
    )
    .filter(contract =>
      contract.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contract.brand.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <ClipboardCheck className="h-4 w-4 mr-1" />;
      case "pending":
        return <Clock className="h-4 w-4 mr-1" />;
      case "completed":
        return <FileText className="h-4 w-4 mr-1" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">My Contracts</h1>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search contracts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="all">All Contracts</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {filteredContracts.length === 0 ? (
            <div className="text-center py-10">
              <FileText className="h-12 w-12 mx-auto text-muted-foreground" />
              <p className="mt-4 text-lg font-medium">No contracts found</p>
              <p className="text-muted-foreground">
                Try adjusting your search or filter criteria
              </p>
            </div>
          ) : (
            filteredContracts.map((contract) => (
              <ContractCard key={contract.id} contract={contract} />
            ))
          )}
        </TabsContent>
        
        <TabsContent value="active" className="space-y-4">
          {filteredContracts.length === 0 ? (
            <div className="text-center py-10">
              <ClipboardCheck className="h-12 w-12 mx-auto text-muted-foreground" />
              <p className="mt-4 text-lg font-medium">No active contracts</p>
              <p className="text-muted-foreground">
                You don't have any active contracts at the moment
              </p>
            </div>
          ) : (
            filteredContracts.map((contract) => (
              <ContractCard key={contract.id} contract={contract} />
            ))
          )}
        </TabsContent>
        
        <TabsContent value="pending" className="space-y-4">
          {filteredContracts.length === 0 ? (
            <div className="text-center py-10">
              <Clock className="h-12 w-12 mx-auto text-muted-foreground" />
              <p className="mt-4 text-lg font-medium">No pending contracts</p>
              <p className="text-muted-foreground">
                You don't have any contracts pending approval
              </p>
            </div>
          ) : (
            filteredContracts.map((contract) => (
              <ContractCard key={contract.id} contract={contract} />
            ))
          )}
        </TabsContent>
        
        <TabsContent value="completed" className="space-y-4">
          {filteredContracts.length === 0 ? (
            <div className="text-center py-10">
              <FileText className="h-12 w-12 mx-auto text-muted-foreground" />
              <p className="mt-4 text-lg font-medium">No completed contracts</p>
              <p className="text-muted-foreground">
                You don't have any completed contracts
              </p>
            </div>
          ) : (
            filteredContracts.map((contract) => (
              <ContractCard key={contract.id} contract={contract} />
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

interface ContractCardProps {
  contract: {
    id: string;
    title: string;
    brand: string;
    brandLogo: string;
    status: string;
    startDate: string;
    endDate: string;
    compensation: string;
    deliverables: string;
    paymentStatus: string;
  };
}

const ContractCard: React.FC<ContractCardProps> = ({ contract }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";
      case "completed":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <ClipboardCheck className="h-4 w-4 mr-1" />;
      case "pending":
        return <Clock className="h-4 w-4 mr-1" />;
      case "completed":
        return <FileText className="h-4 w-4 mr-1" />;
      default:
        return null;
    }
  };
  
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex flex-wrap md:flex-nowrap justify-between items-start gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-md overflow-hidden flex-shrink-0">
              <img
                src={contract.brandLogo}
                alt={contract.brand}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <CardTitle>{contract.title}</CardTitle>
              <p className="text-muted-foreground text-sm">{contract.brand}</p>
            </div>
          </div>
          <div className="flex items-center">
            <Badge className={`flex items-center ${getStatusColor(contract.status)}`}>
              {getStatusIcon(contract.status)}
              <span className="capitalize">{contract.status}</span>
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <p className="text-sm text-muted-foreground">Timeline</p>
            <p className="font-medium">{contract.startDate} - {contract.endDate}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Compensation</p>
            <p className="font-medium">{contract.compensation}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Payment Status</p>
            <p className="font-medium">{contract.paymentStatus}</p>
          </div>
        </div>
        <div className="mb-4">
          <p className="text-sm text-muted-foreground">Deliverables</p>
          <p>{contract.deliverables}</p>
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline" size="sm" className="gap-1">
            <Download className="h-4 w-4" />
            Download
          </Button>
          <Button size="sm">View Details</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default KolContracts;
