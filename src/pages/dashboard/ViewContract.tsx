
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
  FileCheck
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SigningService } from "@/services/SigningService";
import { Contract } from "@/types/contract";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";

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
  const [contract, setContract] = useState<Contract | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
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
    
    toast.promise(SigningService.downloadContract(contract.signwellData.documentId), {
      loading: "Downloading contract...",
      success: "Contract downloaded successfully",
      error: "Failed to download contract"
    });
  };
  
  const handleSendContract = async () => {
    if (!contract) return;
    
    toast.promise(SigningService.prepareContract(contract), {
      loading: "Preparing contract for signing...",
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
        return "Contract sent for signature";
      },
      error: "Failed to send contract"
    });
  };
  
  const handleSendReminder = async () => {
    if (!contract?.signwellData?.documentId) return;
    
    toast.promise(SigningService.sendReminder(contract.signwellData.documentId), {
      loading: "Sending reminder...",
      success: "Reminder sent successfully",
      error: "Failed to send reminder"
    });
  };
  
  const handleViewSigningPage = () => {
    if (!contract?.signwellData?.signLink) return;
    
    // In a real app, you'd redirect to SignWell's signing page
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
      default:
        return (
          <Badge variant="outline">
            {status.charAt(0).toUpperCase() + status.slice(1)}
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
          onClick={() => navigate("/dashboard/contracts")}
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
              <Button onClick={() => navigate("/dashboard/contracts")}>
                Back to Contracts
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={() => navigate("/dashboard/contracts")}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl font-bold tracking-tight">
          {contract.title}
        </h1>
        
        <div className="ml-auto flex items-center gap-2">
          {contract.status === 'draft' && (
            <Button onClick={handleSendContract}>
              <Send className="mr-2 h-4 w-4" /> Send for Signature
            </Button>
          )}
          
          {contract.status === 'sent' && (
            <>
              <Button variant="outline" onClick={handleSendReminder}>
                <Mail className="mr-2 h-4 w-4" /> Send Reminder
              </Button>
              
              <Button onClick={handleViewSigningPage}>
                <FileCheck className="mr-2 h-4 w-4" /> Sign Now
              </Button>
            </>
          )}
          
          {contract.status === 'signed' && (
            <Button variant="outline" onClick={handleDownload}>
              <Download className="mr-2 h-4 w-4" /> Download
            </Button>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="h-5 w-5 mr-2" /> Contract Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Contract ID</p>
                    <p className="font-medium">{contract.id}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Status</p>
                    <div>{getStatusBadge(contract.status)}</div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Contract Type</p>
                    <p className="capitalize">{contract.type}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Campaign</p>
                    <p>{contract.campaign || "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Created</p>
                    <p>{formatDate(contract.createdDate)}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Value</p>
                    <p>{contract.value ? `$${contract.value.toLocaleString()}` : "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Start Date</p>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                      <span>{formatDate(contract.startDate)}</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">End Date</p>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                      <span>{formatDate(contract.endDate)}</span>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Terms</h3>
                  <div className="bg-muted/40 p-4 rounded-md whitespace-pre-wrap">
                    {contract.terms}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {contract.status === 'sent' && contract.signwellData && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileCheck className="h-5 w-5 mr-2" /> Signature Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Signing Link</p>
                    <div className="flex items-center gap-2 mt-1">
                      <code className="bg-muted px-2 py-1 rounded text-sm truncate flex-1">
                        {contract.signwellData.signLink}
                      </code>
                      <Button variant="outline" size="sm" onClick={handleViewSigningPage}>Open</Button>
                    </div>
                  </div>
                  
                  {contract.signwellData.expiresAt && (
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Expires</p>
                      <p>{formatDate(contract.signwellData.expiresAt)}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Signers</CardTitle>
              <CardDescription>
                People who need to sign this contract
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start space-x-4">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={contract.kol.avatar} />
                  <AvatarFallback>{contract.kol.name.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <div className="flex items-center">
                    <p className="text-sm font-medium">{contract.kol.name}</p>
                    {contract.status === 'signed' && (
                      <Badge className="ml-2" variant="outline">
                        <CheckCircle2 className="h-3 w-3 mr-1 text-green-500" /> Signed
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">{contract.kol.handle}</p>
                  <p className="text-xs text-muted-foreground">{contract.kol.email || 'No email provided'}</p>
                </div>
              </div>
              
              {contract.brand && (
                <div className="flex items-start space-x-4">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback>{contract.brand.name.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <div className="flex items-center">
                      <p className="text-sm font-medium">{contract.brand.name}</p>
                      {contract.status === 'signed' && (
                        <Badge className="ml-2" variant="outline">
                          <CheckCircle2 className="h-3 w-3 mr-1 text-green-500" /> Signed
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">{contract.brand.email || 'No email provided'}</p>
                  </div>
                </div>
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
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
