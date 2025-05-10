
import { useState } from "react";
import { 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  Search, 
  Filter, 
  ChevronDown,
  MessageCircle,
  Eye
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockCreatorData } from "@/data/mockCreators";
import { ApplicationStatus } from "@/types/campaign";

interface Application {
  id: string;
  kolId: string;
  campaignId: string;
  campaignName: string;
  status: ApplicationStatus;
  dateApplied: string;
  message: string;
}

export const ApplicationManagement = () => {
  // Sample applications data
  const [applications, setApplications] = useState<Application[]>([
    {
      id: "app1",
      kolId: "creator1",
      campaignId: "camp1",
      campaignName: "Summer Collection Launch",
      status: "pending",
      dateApplied: "2023-05-15",
      message: "I'm really excited about this campaign as it aligns perfectly with my audience's interests."
    },
    {
      id: "app2",
      kolId: "creator2",
      campaignId: "camp1",
      campaignName: "Summer Collection Launch",
      status: "approved",
      dateApplied: "2023-05-14",
      message: "I have experience with similar products and my audience responds well to this type of content."
    },
    {
      id: "app3",
      kolId: "creator3",
      campaignId: "camp2",
      campaignName: "Back to School Campaign",
      status: "rejected",
      dateApplied: "2023-05-13",
      message: "I believe my unique style would be a great fit for showcasing your back to school collection."
    },
    {
      id: "app4",
      kolId: "creator4",
      campaignId: "camp2",
      campaignName: "Back to School Campaign",
      status: "pending",
      dateApplied: "2023-05-12",
      message: "My audience consists mainly of students who would be interested in your products."
    },
    {
      id: "app5",
      kolId: "creator5",
      campaignId: "camp3",
      campaignName: "Holiday Special",
      status: "pending",
      dateApplied: "2023-05-10",
      message: "I'd love to create content featuring your holiday collection. My engagement rates peak during holiday seasons."
    }
  ]);
  
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<ApplicationStatus | "all">("all");
  const [currentApplicationId, setCurrentApplicationId] = useState<string | null>(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  
  // Get current application details
  const currentApplication = applications.find(app => app.id === currentApplicationId);
  const currentCreator = currentApplication 
    ? mockCreatorData.find(creator => creator.id === currentApplication.kolId) 
    : null;
  
  // Filter applications based on search term and status filter
  const filteredApplications = applications.filter(app => {
    const matchesSearch = app.campaignName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (mockCreatorData.find(c => c.id === app.kolId)?.fullName || "").toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = statusFilter === "all" || app.status === statusFilter;
    
    return matchesSearch && matchesFilter;
  });
  
  // Group applications by campaign
  const applicationsByStatus = {
    pending: filteredApplications.filter(app => app.status === "pending"),
    approved: filteredApplications.filter(app => app.status === "approved"),
    rejected: filteredApplications.filter(app => app.status === "rejected")
  };
  
  // Update application status
  const updateApplicationStatus = (id: string, status: ApplicationStatus) => {
    setApplications(applications.map(app => 
      app.id === id ? {...app, status} : app
    ));
    
    const statusMessages = {
      approved: "Application approved! The creator has been notified.",
      rejected: "Application rejected. The creator has been notified.",
      pending: "Application set back to pending status."
    };
    
    toast.success(statusMessages[status]);
    
    // Close dialog if open
    if (viewDialogOpen) {
      setViewDialogOpen(false);
    }
  };
  
  // Get creator details by ID
  const getCreatorById = (id: string) => {
    return mockCreatorData.find(creator => creator.id === id) || {
      id: "",
      fullName: "Unknown Creator",
      username: "unknown",
      avatar: "",
      followers: 0,
      engagementRate: 0,
      niche: []
    };
  };
  
  // Format follower count
  const formatFollowers = (followers: number) => {
    if (followers >= 1000000) {
      return `${(followers / 1000000).toFixed(1)}M`;
    }
    if (followers >= 1000) {
      return `${(followers / 1000).toFixed(1)}K`;
    }
    return followers.toString();
  };

  // Status badge component
  const StatusBadge = ({ status }: { status: ApplicationStatus }) => {
    switch (status) {
      case "approved":
        return (
          <Badge className="bg-green-500/20 text-green-500 hover:bg-green-500/30 border-none">
            <CheckCircle className="mr-1 h-3 w-3" /> Approved
          </Badge>
        );
      case "rejected":
        return (
          <Badge variant="outline" className="bg-red-500/10 text-red-500 hover:bg-red-500/20 border-red-500/30">
            <XCircle className="mr-1 h-3 w-3" /> Rejected
          </Badge>
        );
      default:
        return (
          <Badge variant="outline" className="bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20 border-yellow-500/30">
            <AlertTriangle className="mr-1 h-3 w-3" /> Pending
          </Badge>
        );
    }
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Campaign Applications</CardTitle>
        <CardDescription>
          Review and manage applications from creators for your campaigns
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-2 justify-between">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search campaigns or creators..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full sm:w-auto">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setStatusFilter("all")}>
                  All Applications
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("pending")}>
                  Pending Applications
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("approved")}>
                  Approved Applications
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("rejected")}>
                  Rejected Applications
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          <Tabs defaultValue="all">
            <TabsList className="grid grid-cols-4 w-full">
              <TabsTrigger value="all">
                All ({filteredApplications.length})
              </TabsTrigger>
              <TabsTrigger value="pending">
                Pending ({applicationsByStatus.pending.length})
              </TabsTrigger>
              <TabsTrigger value="approved">
                Approved ({applicationsByStatus.approved.length})
              </TabsTrigger>
              <TabsTrigger value="rejected">
                Rejected ({applicationsByStatus.rejected.length})
              </TabsTrigger>
            </TabsList>
            
            {["all", "pending", "approved", "rejected"].map((tab) => (
              <TabsContent key={tab} value={tab} className="pt-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Creator</TableHead>
                      <TableHead>Campaign</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date Applied</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {(tab === "all" ? filteredApplications : applicationsByStatus[tab as keyof typeof applicationsByStatus]).length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="h-24 text-center">
                          No applications found.
                        </TableCell>
                      </TableRow>
                    ) : (
                      (tab === "all" ? filteredApplications : applicationsByStatus[tab as keyof typeof applicationsByStatus]).map((application) => {
                        const creator = getCreatorById(application.kolId);
                        return (
                          <TableRow key={application.id}>
                            <TableCell>
                              <div className="flex items-center space-x-3">
                                <Avatar>
                                  <AvatarImage src={creator.avatar} alt={creator.fullName} />
                                  <AvatarFallback>{creator.fullName.substring(0, 2)}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <div className="font-medium">{creator.fullName}</div>
                                  <div className="text-sm text-muted-foreground">@{creator.username}</div>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>{application.campaignName}</TableCell>
                            <TableCell>
                              <StatusBadge status={application.status} />
                            </TableCell>
                            <TableCell>{application.dateApplied}</TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end space-x-2">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => {
                                    setCurrentApplicationId(application.id);
                                    setViewDialogOpen(true);
                                  }}
                                >
                                  <Eye className="h-4 w-4 mr-2" /> View Details
                                </Button>
                                {application.status === "pending" && (
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <Button
                                        variant="outline"
                                        size="sm"
                                      >
                                        Update Status
                                      </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                      <DropdownMenuItem 
                                        onClick={() => updateApplicationStatus(application.id, "approved")}
                                        className="text-green-600 focus:text-green-600"
                                      >
                                        <CheckCircle className="mr-2 h-4 w-4" />
                                        Approve
                                      </DropdownMenuItem>
                                      <DropdownMenuItem 
                                        onClick={() => updateApplicationStatus(application.id, "rejected")}
                                        className="text-red-600 focus:text-red-600"
                                      >
                                        <XCircle className="mr-2 h-4 w-4" />
                                        Reject
                                      </DropdownMenuItem>
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                )}
                                {application.status !== "pending" && (
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => updateApplicationStatus(application.id, "pending")}
                                  >
                                    Reset Status
                                  </Button>
                                )}
                              </div>
                            </TableCell>
                          </TableRow>
                        );
                      })
                    )}
                  </TableBody>
                </Table>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </CardContent>
      
      {/* Application Details Dialog */}
      {currentCreator && currentApplication && (
        <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Application Details</DialogTitle>
              <DialogDescription>
                Review application for {currentApplication.campaignName}
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium">Creator Information</h3>
                  <div className="flex items-center space-x-3 mt-2">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={currentCreator.avatar} alt={currentCreator.fullName} />
                      <AvatarFallback>{currentCreator.fullName.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="text-xl font-medium">{currentCreator.fullName}</div>
                      <div className="text-sm text-muted-foreground">@{currentCreator.username}</div>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-muted/50 p-3 rounded-md">
                    <div className="text-sm text-muted-foreground">Followers</div>
                    <div className="text-lg font-medium">{formatFollowers(currentCreator.followers)}</div>
                  </div>
                  <div className="bg-muted/50 p-3 rounded-md">
                    <div className="text-sm text-muted-foreground">Engagement</div>
                    <div className="text-lg font-medium">{(currentCreator.engagementRate * 100).toFixed(1)}%</div>
                  </div>
                </div>
                
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Niche</div>
                  <div className="flex flex-wrap gap-1">
                    {currentCreator.niche.map((tag) => (
                      <Badge key={tag} variant="secondary" className="mr-1">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium">Application Information</h3>
                  <div className="mt-2">
                    <div className="text-sm text-muted-foreground">Status</div>
                    <StatusBadge status={currentApplication.status} />
                  </div>
                </div>
                
                <div>
                  <div className="text-sm text-muted-foreground">Date Applied</div>
                  <div>{currentApplication.dateApplied}</div>
                </div>
                
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Message</div>
                  <div className="bg-muted/50 p-3 rounded-md text-sm">
                    {currentApplication.message}
                  </div>
                </div>
              </div>
            </div>
            
            <DialogFooter className="flex-col sm:flex-row gap-2">
              <Button variant="outline" className="sm:w-auto w-full" onClick={() => setViewDialogOpen(false)}>
                Close
              </Button>
              
              <Button 
                variant="outline" 
                className="sm:w-auto w-full"
              >
                <MessageCircle className="mr-2 h-4 w-4" />
                Message Creator
              </Button>
              
              {currentApplication.status === "pending" && (
                <>
                  <Button 
                    className="bg-green-600 hover:bg-green-700 sm:w-auto w-full"
                    onClick={() => updateApplicationStatus(currentApplication.id, "approved")}
                  >
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Approve
                  </Button>
                  <Button 
                    variant="destructive" 
                    className="sm:w-auto w-full"
                    onClick={() => updateApplicationStatus(currentApplication.id, "rejected")}
                  >
                    <XCircle className="mr-2 h-4 w-4" />
                    Reject
                  </Button>
                </>
              )}
              
              {currentApplication.status !== "pending" && (
                <Button 
                  variant="outline" 
                  className="sm:w-auto w-full"
                  onClick={() => updateApplicationStatus(currentApplication.id, "pending")}
                >
                  Reset Status
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </Card>
  );
};
