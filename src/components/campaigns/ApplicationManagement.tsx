
import { useState } from "react";
import { 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  Search, 
  Filter, 
  ChevronDown,
  MessageCircle,
  Eye,
  Clock
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
import { Textarea } from "@/components/ui/textarea";

interface Application {
  id: string;
  kolId: string;
  campaignId: string;
  campaignName: string;
  status: ApplicationStatus;
  dateApplied: string;
  message: string;
  feedback?: string;
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
      status: "hold",
      dateApplied: "2023-05-10",
      message: "I'd love to create content featuring your holiday collection. My engagement rates peak during holiday seasons."
    }
  ]);
  
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<ApplicationStatus | "all">("all");
  const [currentApplicationId, setCurrentApplicationId] = useState<string | null>(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  
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
  
  // Group applications by status
  const applicationsByStatus = {
    pending: filteredApplications.filter(app => app.status === "pending"),
    approved: filteredApplications.filter(app => app.status === "approved"),
    hold: filteredApplications.filter(app => app.status === "hold"),
    rejected: filteredApplications.filter(app => app.status === "rejected")
  };
  
  // Update application status
  const updateApplicationStatus = (id: string, status: ApplicationStatus, feedback?: string) => {
    setApplications(applications.map(app => 
      app.id === id ? {...app, status, feedback: feedback || app.feedback} : app
    ));
    
    const statusMessages = {
      approved: "Application approved! The creator has been notified.",
      rejected: "Application rejected. The creator has been notified.",
      pending: "Application set back to pending status.",
      hold: "Application put on hold. The creator has been notified."
    };
    
    toast.success(statusMessages[status]);
    
    // Reset feedback message
    setFeedbackMessage("");
    
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

  // Status badge component with improved styling
  const StatusBadge = ({ status }: { status: ApplicationStatus }) => {
    switch (status) {
      case "approved":
        return (
          <Badge className="flex items-center gap-1 bg-green-500/20 text-green-500 hover:bg-green-500/30 border-none px-2.5 py-1 rounded-full">
            <CheckCircle className="h-3.5 w-3.5" /> 
            <span className="font-medium">Approved</span>
          </Badge>
        );
      case "rejected":
        return (
          <Badge variant="outline" className="flex items-center gap-1 bg-red-500/10 text-red-500 hover:bg-red-500/20 border-red-500/30 px-2.5 py-1 rounded-full">
            <XCircle className="h-3.5 w-3.5" /> 
            <span className="font-medium">Rejected</span>
          </Badge>
        );
      case "hold":
        return (
          <Badge variant="outline" className="flex items-center gap-1 bg-blue-500/10 text-blue-500 hover:bg-blue-500/20 border-blue-500/30 px-2.5 py-1 rounded-full">
            <Clock className="h-3.5 w-3.5" /> 
            <span className="font-medium">On Hold</span>
          </Badge>
        );
      default:
        return (
          <Badge variant="outline" className="flex items-center gap-1 bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20 border-yellow-500/30 px-2.5 py-1 rounded-full">
            <AlertTriangle className="h-3.5 w-3.5" /> 
            <span className="font-medium">Pending</span>
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
                <DropdownMenuItem onClick={() => setStatusFilter("hold")}>
                  On Hold Applications
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("rejected")}>
                  Rejected Applications
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid grid-cols-5 w-full mb-4">
              <TabsTrigger value="all" className="text-xs sm:text-sm">
                All ({filteredApplications.length})
              </TabsTrigger>
              <TabsTrigger value="pending" className="text-xs sm:text-sm">
                Pending ({applicationsByStatus.pending.length})
              </TabsTrigger>
              <TabsTrigger value="approved" className="text-xs sm:text-sm">
                Approved ({applicationsByStatus.approved.length})
              </TabsTrigger>
              <TabsTrigger value="hold" className="text-xs sm:text-sm">
                On Hold ({applicationsByStatus.hold.length})
              </TabsTrigger>
              <TabsTrigger value="rejected" className="text-xs sm:text-sm">
                Rejected ({applicationsByStatus.rejected.length})
              </TabsTrigger>
            </TabsList>
            
            {["all", "pending", "approved", "hold", "rejected"].map((tab) => (
              <TabsContent key={tab} value={tab} className="pt-2">
                <div className="rounded-md border overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[250px]">Creator</TableHead>
                        <TableHead className="hidden md:table-cell">Campaign</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="hidden sm:table-cell">Date Applied</TableHead>
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
                                    <AvatarImage
                                      src={creator.avatar} 
                                      alt={creator.fullName}
                                      onError={(e) => {
                                        const target = e.target as HTMLImageElement;
                                        target.src = "https://ui-avatars.com/api/?name=" + encodeURIComponent(creator.fullName) + "&background=0D8ABC&color=fff";
                                      }}
                                    />
                                    <AvatarFallback>{creator.fullName.substring(0, 2)}</AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <div className="font-medium">{creator.fullName}</div>
                                    <div className="text-sm text-muted-foreground">@{creator.username}</div>
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell className="hidden md:table-cell">{application.campaignName}</TableCell>
                              <TableCell>
                                <StatusBadge status={application.status} />
                              </TableCell>
                              <TableCell className="hidden sm:table-cell">{application.dateApplied}</TableCell>
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
                                    <Eye className="h-4 w-4 mr-2" /> 
                                    <span className="hidden sm:inline">View Details</span>
                                  </Button>
                                  {application.status === "pending" && (
                                    <div className="hidden sm:block">
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
                                            onClick={() => updateApplicationStatus(application.id, "hold")}
                                            className="text-blue-600 focus:text-blue-600"
                                          >
                                            <Clock className="mr-2 h-4 w-4" />
                                            Put On Hold
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
                                    </div>
                                  )}
                                </div>
                              </TableCell>
                            </TableRow>
                          );
                        })
                      )}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </CardContent>
      
      {/* Application Details Dialog with enhanced status badges */}
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
                      <AvatarImage 
                        src={currentCreator.avatar} 
                        alt={currentCreator.fullName} 
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "https://ui-avatars.com/api/?name=" + encodeURIComponent(currentCreator.fullName) + "&background=0D8ABC&color=fff";
                        }}
                      />
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
                    <div className="text-sm text-muted-foreground mb-1">Status</div>
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
                
                {currentApplication.feedback && (
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Feedback</div>
                    <div className="bg-muted/50 p-3 rounded-md text-sm">
                      {currentApplication.feedback}
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {currentApplication.status === "pending" && (
              <div className="mt-4">
                <div className="text-sm font-medium mb-2">Add Feedback (optional)</div>
                <Textarea
                  placeholder="Add feedback or notes for the creator..."
                  value={feedbackMessage}
                  onChange={(e) => setFeedbackMessage(e.target.value)}
                  className="w-full"
                />
              </div>
            )}
            
            <DialogFooter className="flex-col sm:flex-row gap-2 mt-4">
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
                    onClick={() => updateApplicationStatus(currentApplication.id, "approved", feedbackMessage)}
                  >
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Approve
                  </Button>
                  <Button 
                    variant="secondary"
                    className="sm:w-auto w-full"
                    onClick={() => updateApplicationStatus(currentApplication.id, "hold", feedbackMessage)}
                  >
                    <Clock className="mr-2 h-4 w-4" />
                    Put On Hold
                  </Button>
                  <Button 
                    variant="destructive" 
                    className="sm:w-auto w-full"
                    onClick={() => updateApplicationStatus(currentApplication.id, "rejected", feedbackMessage)}
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
