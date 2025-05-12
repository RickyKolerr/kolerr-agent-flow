import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  FileText, 
  ArrowLeft, 
  Download, 
  Send, 
  Mail, 
  Clock, 
  CheckCircle2, 
  Calendar, 
  User,
  FileCheck,
  FileWarning,
  AlertCircle,
  DollarSign,
  ExternalLink
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SigningService } from "@/services/SigningService";
import { Contract } from "@/types/contract";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";
import { useUserAccess } from "@/hooks/useUserAccess";
import { KOLContractReview } from "@/components/contracts/KOLContractReview";
import { MobileSigningView } from "@/components/contracts/MobileSigningView";
import { useMediaQuery } from "@/hooks/useMediaQuery";

// Mock contract data - in a real app, you would fetch this from your API
const mockContracts: Contract[] = [
  {
    id: "CT-2023-001",
    title: "Summer Collection Promo",
    type: "standard",
    kol: {
      name: "Sophia Chen",
      handle: "@fashionwithsophia",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&auto=format&fit=crop",
      email: "sophia@example.com"
    },
    brand: {
      name: "Fashion Brand Co",
      email: "contracts@fashionbrand.com"
    },
    campaign: "Summer Collection Launch",
    createdDate: "2023-06-02",
    startDate: "2023-07-01",
    endDate: "2023-08-30",
    status: 'sent',
    value: 1500,
    terms: "This agreement is made between Fashion Brand Co. (\"Brand\") and Sophia Chen (\"Creator\").\n\nThe Creator agrees to create and publish the following content:\n- 2 Instagram posts featuring the Summer Collection\n- 1 Instagram Story series (minimum 3 slides)\n- 1 TikTok video showcasing the products\n\nAll content must be approved by the Brand before publishing. Content must be published between July 1 and August 30, 2023.\n\nThe Brand agrees to pay the Creator $1,500 upon successful completion of all deliverables. The Brand will also provide the Creator with the products being promoted at no cost.",
    signwellData: {
      documentId: "doc-123456",
      signLink: "https://app.signwell.com/sign/abc123",
      expiresAt: "2023-07-01"
    }
  },
  {
    id: "CT-2023-002",
    title: "Product Review Agreement",
    type: "review",
    kol: {
      name: "Jake Thomas",
      handle: "@jakeadventures",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&auto=format&fit=crop",
      email: "jake@example.com"
    },
    campaign: "New Product Teaser",
    createdDate: "2023-06-05",
    startDate: "2023-07-15",
    endDate: "2023-08-15",
    status: 'draft',
    value: 800,
    terms: "This agreement outlines the terms for the product review collaboration between the Brand and Jake Thomas.\n\nJake Thomas agrees to provide an honest and thorough review of the provided products across his social media platforms.\n\nThe review must include pros and cons of the product and a clear disclosure that the content is sponsored."
  }
];

export default function ViewContract() {
  const { contractId } = useParams<{ contractId: string }>();
  const navigate = useNavigate();
  const { user } = useUserAccess();
  const [contract, setContract] = useState<Contract | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const isMobile = useMediaQuery("(max-width: 640px)");
  
  const isKOL = user?.role === "kol"; // Check if the current user is a KOL
  
  useEffect(() => {
    // Simulate API call to fetch contract
    const fetchContract = async () => {
      setIsLoading(true);
      try {
        // In a real app, you'd call your API here
        await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
        
        const foundContract = mockContracts.find(c => c.id === contractId);
        if (foundContract) {
          setContract(foundContract);
        }
      } catch (error) {
        console.error("Error fetching contract:", error);
        toast.error("Failed to load contract details");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchContract();
  }, [contractId]);
  
  const handleDownload = async () => {
    if (!contract?.signwellData?.documentId) return;
    
    toast("Redirecting to SignWell to download the contract...");
    SigningService.downloadContract(contract.signwellData.documentId);
  };
  
  const handleSendContract = async () => {
    if (!contract) return;
    
    toast.promise(SigningService.prepareContract(contract), {
      loading: "Preparing contract with SignWell...",
      success: () => {
        setContract({
          ...contract,
          status: 'sent',
          signwellData: {
            documentId: `doc-${Math.random().toString(36).substring(2, 9)}`,
            signLink: `https://app.signwell.com/sign/${Math.random().toString(36).substring(2, 9)}`,
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
          }
        });
        return "Contract sent for signature through SignWell";
      },
      error: "Failed to prepare contract with SignWell"
    });
  };
  
  const handleSendReminder = async () => {
    if (!contract?.signwellData?.documentId) return;
    
    toast.promise(SigningService.sendReminder(contract.signwellData.documentId), {
      loading: "Sending reminder through SignWell...",
      success: "Reminder sent successfully through SignWell",
      error: "Failed to send reminder"
    });
  };
  
  const handleViewSigningPage = () => {
    if (!contract?.signwellData?.signLink) return;
    
    // Redirect to SignWell's signing page
    toast("Redirecting to SignWell for contract signing...");
    window.open(contract.signwellData.signLink, "_blank");
  };
  
  const getStatusBadge = (status: Contract['status']) => {
    switch (status) {
      case 'draft':
        return (
          <Badge variant="outline" className="bg-gray-500/10 text-gray-500 border-gray-500/20">
            <FileText className="h-3.5 w-3.5 mr-1" /> Draft
          </Badge>
        );
      case 'sent':
        return (
          <Badge variant="outline" className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20">
            <Clock className="h-3.5 w-3.5 mr-1" /> Awaiting Signature
          </Badge>
        );
      case 'signed':
        return (
          <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
            <CheckCircle2 className="h-3.5 w-3.5 mr-1" /> Signed
          </Badge>
        );
      case 'expired':
        return (
          <Badge variant="outline" className="bg-orange-500/10 text-orange-500 border-orange-500/20">
            <AlertCircle className="h-3.5 w-3.5 mr-1" /> Expired
          </Badge>
        );
      case 'canceled':
        return (
          <Badge variant="outline" className="bg-red-500/10 text-red-500 border-red-500/20">
            <FileWarning className="h-3.5 w-3.5 mr-1" /> Canceled
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
  
  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A";
    
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  const goBack = () => {
    // Navigate back to the appropriate contracts page based on user role
    navigate(isKOL ? "/dashboard/kol/contracts" : "/dashboard/contracts");
  };
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-pink"></div>
      </div>
    );
  }
  
  if (!contract) {
    return (
      <div className="space-y-4">
        <Button
          variant="outline"
          size="icon"
          onClick={goBack}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-8">
              <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
              <h2 className="text-2xl font-bold mb-2">Contract Not Found</h2>
              <p className="text-muted-foreground mb-4">
                The contract you're looking for doesn't exist or has been removed.
              </p>
              <Button onClick={goBack}>
                Back to Contracts
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  // Mobile optimized view for KOLs
  if (isMobile && isKOL) {
    return (
      <MobileSigningView 
        contract={contract}
        onSign={handleViewSigningPage}
        onBack={goBack}
        onDownload={handleDownload}
      />
    );
  }
  
  // KOL-specific desktop view
  if (isKOL) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={goBack}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold tracking-tight">
            Contract Details
          </h1>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <KOLContractReview 
              contract={contract}
              onSign={handleViewSigningPage}
            />
          </div>
          
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Brand</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback>{contract.brand?.name.substring(0, 2) || 'BR'}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{contract.brand?.name || 'Unknown Brand'}</p>
                    {contract.brand?.email && <p className="text-sm text-muted-foreground">{contract.brand.email}</p>}
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {contract.status === 'signed' && contract.earnings && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <DollarSign className="h-5 w-5 mr-2" /> Payment Status
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Amount:</span>
                    <span className="font-medium">${contract.value?.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Status:</span>
                    <Badge variant="outline" className={
                      contract.earnings.status === 'paid' ? 'bg-green-500/10 text-green-500 border-green-500/20' :
                      contract.earnings.status === 'processing' ? 'bg-blue-500/10 text-blue-500 border-blue-500/20' :
                      'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
                    }>
                      {contract.earnings.status === 'paid' ? 'Paid' : 
                       contract.earnings.status === 'processing' ? 'Processing' : 'Pending'}
                    </Badge>
                  </div>
                  {contract.earnings.paidDate && (
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Paid on:</span>
                      <span>{formatDate(contract.earnings.paidDate)}</span>
                    </div>
                  )}
                  {contract.earnings.paymentMethod && (
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Method:</span>
                      <span>{contract.earnings.paymentMethod}</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
            
            <Card>
              <CardHeader>
                <CardTitle>Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {contract.signwellData?.signLink && (
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={handleViewSigningPage}
                  >
                    <ExternalLink className="h-4 w-4 mr-2" /> View in SignWell
                  </Button>
                )}
                {contract.status === 'signed' && contract.signwellData?.documentId && (
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={handleDownload}
                  >
                    <Download className="h-4 w-4 mr-2" /> Download from SignWell
                  </Button>
                )}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  <li className="flex gap-3">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border bg-background">
                      <FileText className="h-3 w-3" />
                    </div>
                    <div>
                      <p className="text-sm">Contract created</p>
                      <p className="text-xs text-muted-foreground">{formatDate(contract.createdDate)}</p>
                    </div>
                  </li>
                  
                  {contract.status !== 'draft' && (
                    <li className="flex gap-3">
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border bg-background">
                        <Send className="h-3 w-3" />
                      </div>
                      <div>
                        <p className="text-sm">Sent for signature</p>
                        <p className="text-xs text-muted-foreground">{formatDate(contract.signwellData?.expiresAt ? new Date(new Date(contract.signwellData.expiresAt).getTime() - 7 * 24 * 60 * 60 * 1000).toISOString() : contract.createdDate)}</p>
                      </div>
                    </li>
                  )}
                  
                  {contract.status === 'signed' && (
                    <li className="flex gap-3">
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border bg-green-500">
                        <CheckCircle2 className="h-3 w-3 text-white" />
                      </div>
                      <div>
                        <p className="text-sm">Fully signed</p>
                        <p className="text-xs text-muted-foreground">{formatDate(contract.signwellData?.completedAt || new Date().toISOString())}</p>
                      </div>
                    </li>
                  )}
                  
                  {contract.status === 'signed' && contract.earnings?.status === 'paid' && (
                    <li className="flex gap-3">
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border bg-green-500">
                        <DollarSign className="h-3 w-3 text-white" />
                      </div>
                      <div>
                        <p className="text-sm">Payment completed</p>
                        <p className="text-xs text-muted-foreground">{formatDate(contract.earnings.paidDate)}</p>
                      </div>
                    </li>
                  )}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }
  
  // Brand view (default)
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={goBack}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold tracking-tight">
            Contract: {contract.id}
          </h1>
        </div>
        
        <div className="flex items-center gap-2">
          {contract.status === 'draft' && (
            <Button 
              className="bg-brand-pink hover:bg-brand-pink/90"
              onClick={handleSendContract}
            >
              <Send className="h-4 w-4 mr-2" /> Send with SignWell
            </Button>
          )}
          {contract.status === 'sent' && (
            <Button 
              variant="outline" 
              onClick={handleSendReminder}
            >
              <Mail className="h-4 w-4 mr-2" /> Send Reminder
            </Button>
          )}
          {contract.status === 'signed' && contract.signwellData?.documentId && (
            <Button 
              variant="outline" 
              onClick={handleDownload}
            >
              <Download className="h-4 w-4 mr-2" /> Download from SignWell
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle>Contract Details</CardTitle>
              {getStatusBadge(contract.status)}
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Contract ID</p>
                  <p className="text-sm">{contract.id}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Type</p>
                  <p className="text-sm capitalize">{contract.type}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Created</p>
                  <p className="text-sm">{formatDate(contract.createdDate)}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Start Date</p>
                  <p className="text-sm">{formatDate(contract.startDate)}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">End Date</p>
                  <p className="text-sm">{formatDate(contract.endDate)}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Value</p>
                  <p className="text-sm">{contract.value ? `$${contract.value.toLocaleString()}` : 'Not specified'}</p>
                </div>
              </div>
              
              {contract.signwellData?.documentId && (
                <div className="bg-muted/40 p-4 rounded-md">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">SignWell Integration</h4>
                      <p className="text-sm text-muted-foreground mt-1">This contract is managed by SignWell.</p>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => window.open(`https://app.signwell.com/documents/${contract.signwellData?.documentId}`, "_blank")}
                    >
                      <ExternalLink className="h-4 w-4 mr-2" /> Open in SignWell
                    </Button>
                  </div>
                </div>
              )}
              
              {/* ... keep existing code (terms section if needed) */}
            </CardContent>
          </Card>
          
          {/* ... keep existing code (additional content as needed) */}
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>KOL Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-4">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={contract.kol.avatar} alt={contract.kol.name} />
                  <AvatarFallback>{contract.kol.name.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{contract.kol.name}</p>
                  <p className="text-sm text-muted-foreground">{contract.kol.handle}</p>
                </div>
              </div>
              
              {contract.kol.email && (
                <div className="pt-2">
                  <p className="text-sm font-medium text-muted-foreground">Contact Email</p>
                  <p className="text-sm">{contract.kol.email}</p>
                </div>
              )}
              
              {/* ... keep existing code (additional KOL information) */}
            </CardContent>
          </Card>
          
          {/* ... keep existing code (additional cards) */}
        </div>
      </div>
    </div>
  );
}
