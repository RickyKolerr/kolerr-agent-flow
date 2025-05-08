
import { useState } from "react";
import { FileText, Search, Filter, Check, X, MessageSquare, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { ScrollArea } from "@/components/ui/scroll-area";

// Mock application data
const mockApplications = [
  {
    id: "app1",
    campaignId: "c1",
    campaignTitle: "Summer Fashion Collection",
    creatorName: "Emma Wilson",
    creatorAvatar: "https://ui-avatars.com/api/?name=Emma+Wilson&background=9b87f5&color=fff",
    creatorPlatforms: ["instagram", "tiktok"],
    submittedDate: "2023-08-15",
    status: "pending",
    note: "I have experience in fashion photography and would love to showcase your summer collection.",
    followers: "45.2K",
    engagement: "3.8%",
    categories: ["fashion", "lifestyle"],
    messages: [
      { sender: "creator", content: "I'm excited about this opportunity!", timestamp: "2023-08-15T10:30:00" },
      { sender: "brand", content: "Thanks for applying! We'll review your profile and get back to you soon.", timestamp: "2023-08-15T14:15:00" }
    ]
  },
  {
    id: "app2",
    campaignId: "c2",
    campaignTitle: "Fitness App Launch",
    creatorName: "John Smith",
    creatorAvatar: "https://ui-avatars.com/api/?name=John+Smith&background=4CAF50&color=fff",
    creatorPlatforms: ["youtube", "instagram"],
    submittedDate: "2023-08-12",
    status: "approved",
    note: "I'm a certified fitness trainer with a YouTube channel focused on home workouts.",
    followers: "112K",
    engagement: "4.5%",
    categories: ["fitness", "health"],
    messages: [
      { sender: "creator", content: "I've been looking for fitness products to review!", timestamp: "2023-08-12T09:40:00" },
      { sender: "brand", content: "Your profile looks perfect for our campaign!", timestamp: "2023-08-13T11:20:00" },
      { sender: "brand", content: "We'd love to have you onboard. Can you start next week?", timestamp: "2023-08-14T15:00:00" },
      { sender: "creator", content: "Absolutely! Looking forward to it.", timestamp: "2023-08-14T15:30:00" }
    ]
  },
  {
    id: "app3",
    campaignId: "c3",
    campaignTitle: "Organic Skincare Review",
    creatorName: "Sophia Lee",
    creatorAvatar: "https://ui-avatars.com/api/?name=Sophia+Lee&background=FF5722&color=fff",
    creatorPlatforms: ["instagram", "tiktok"],
    submittedDate: "2023-08-10",
    status: "rejected",
    note: "I specialize in skincare reviews and have worked with multiple organic brands in the past.",
    followers: "78.5K",
    engagement: "2.9%",
    categories: ["beauty", "skincare"],
    messages: [
      { sender: "creator", content: "Your products align perfectly with my content focus!", timestamp: "2023-08-10T14:20:00" },
      { sender: "brand", content: "Thanks for your interest. We'll review your application.", timestamp: "2023-08-11T10:15:00" },
      { sender: "brand", content: "After careful consideration, we've decided to go with creators who have higher engagement rates for this campaign. We appreciate your interest and would love to consider you for future campaigns.", timestamp: "2023-08-14T09:30:00" }
    ]
  },
  {
    id: "app4",
    campaignId: "c2",
    campaignTitle: "Fitness App Launch",
    creatorName: "Michael Brown",
    creatorAvatar: "https://ui-avatars.com/api/?name=Michael+Brown&background=607D8B&color=fff",
    creatorPlatforms: ["tiktok"],
    submittedDate: "2023-08-11",
    status: "pending",
    note: "I create fitness content focused on HIIT workouts and would love to promote your app.",
    followers: "156K",
    engagement: "5.2%",
    categories: ["fitness", "health"],
    messages: [
      { sender: "creator", content: "Your app seems like a great fit for my audience!", timestamp: "2023-08-11T16:45:00" },
      { sender: "brand", content: "Thanks for your interest! We're reviewing applications and will get back to you soon.", timestamp: "2023-08-12T11:30:00" }
    ]
  }
];

const ApplicationManagement = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCampaign, setFilterCampaign] = useState("");
  const [selectedApplication, setSelectedApplication] = useState<typeof mockApplications[0] | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [message, setMessage] = useState("");
  
  // Filter applications based on active tab and search term
  const filteredApplications = mockApplications
    .filter(app => activeTab === "all" || app.status === activeTab)
    .filter(app => {
      const searchLower = searchTerm.toLowerCase();
      return (
        app.creatorName.toLowerCase().includes(searchLower) ||
        app.campaignTitle.toLowerCase().includes(searchLower) ||
        app.categories.some(cat => cat.toLowerCase().includes(searchLower))
      );
    })
    .filter(app => !filterCampaign || app.campaignId === filterCampaign);
  
  // Get unique campaigns for filter
  const uniqueCampaigns = Array.from(
    new Set(mockApplications.map(app => app.campaignId))
  ).map(campaignId => {
    const campaign = mockApplications.find(app => app.campaignId === campaignId);
    return {
      id: campaignId,
      title: campaign?.campaignTitle || ""
    };
  });
  
  const handleSendMessage = () => {
    if (!message.trim() || !selectedApplication) return;
    
    toast.success("Message sent", {
      description: `Your message has been sent to ${selectedApplication.creatorName}.`
    });
    
    setMessage("");
  };
  
  const handleStatusChange = (appId: string, newStatus: string) => {
    // In a real app, this would update the backend
    toast.success(`Application ${newStatus === 'approved' ? 'approved' : 'rejected'}`, {
      description: `The creator will be notified of your decision.`
    });
    
    setIsViewDialogOpen(false);
  };
  
  const getStatusBadge = (status: string) => {
    switch(status) {
      case "pending":
        return <Badge variant="outline" className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20">Pending Review</Badge>;
      case "approved":
        return <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">Approved</Badge>;
      case "rejected":
        return <Badge variant="outline" className="bg-red-500/10 text-red-500 border-red-500/20">Rejected</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <FileText className="h-6 w-6 text-brand-pink" />
          <h1 className="text-2xl font-bold tracking-tight">Creator Applications</h1>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row md:items-center gap-4 md:justify-between">
        <div className="flex flex-col md:flex-row gap-3 md:items-center">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search creators or campaigns..."
              className="pl-8 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <Select value={filterCampaign} onValueChange={setFilterCampaign}>
            <SelectTrigger className="w-full md:w-56">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                <SelectValue placeholder="Filter by campaign" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Campaigns</SelectItem>
              {uniqueCampaigns.map(campaign => (
                <SelectItem key={campaign.id} value={campaign.id}>{campaign.title}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-4 mb-6">
          <TabsTrigger value="all" className="text-sm">
            All Applications
          </TabsTrigger>
          <TabsTrigger value="pending" className="text-sm">
            Pending
          </TabsTrigger>
          <TabsTrigger value="approved" className="text-sm">
            Approved
          </TabsTrigger>
          <TabsTrigger value="rejected" className="text-sm">
            Rejected
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value={activeTab} className="mt-0">
          <div className="grid gap-4">
            {filteredApplications.length > 0 ? filteredApplications.map(application => (
              <Card key={application.id} className="overflow-hidden hover:shadow-md transition-shadow">
                <CardContent className="p-0">
                  <div className="flex flex-col md:flex-row">
                    <div className="w-full md:w-2/3 p-6">
                      <div className="flex items-center space-x-4 mb-4">
                        <img 
                          src={application.creatorAvatar} 
                          alt={application.creatorName} 
                          className="h-12 w-12 rounded-full"
                        />
                        <div>
                          <h3 className="text-lg font-bold">{application.creatorName}</h3>
                          <div className="flex gap-1 mt-1">
                            {application.creatorPlatforms.map(platform => (
                              <Badge key={platform} variant="outline" className="capitalize">
                                {platform}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <h4 className="text-sm font-semibold mb-1">Campaign</h4>
                        <p className="text-base">{application.campaignTitle}</p>
                      </div>
                      
                      <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm mb-4">
                        <div>
                          <span className="text-muted-foreground">Followers:</span> {application.followers}
                        </div>
                        <div>
                          <span className="text-muted-foreground">Engagement:</span> {application.engagement}
                        </div>
                        <div>
                          <span className="text-muted-foreground">Applied:</span> {new Date(application.submittedDate).toLocaleDateString()}
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-1 mb-4">
                        {application.categories.map(category => (
                          <Badge key={category} variant="secondary" className="capitalize">
                            {category}
                          </Badge>
                        ))}
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-semibold mb-1">Creator's Note:</h4>
                        <p className="text-sm text-muted-foreground line-clamp-2">{application.note}</p>
                      </div>
                    </div>
                    
                    <div className="w-full md:w-1/3 bg-black/5 p-6 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-center mb-4">
                          {getStatusBadge(application.status)}
                        </div>
                        
                        <div className="mb-4">
                          <h4 className="font-medium flex items-center mb-2">
                            <MessageSquare className="h-4 w-4 mr-1" />
                            Messages ({application.messages.length})
                          </h4>
                          <p className="text-xs text-muted-foreground">
                            Last message: {new Date(application.messages[application.messages.length - 1].timestamp).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      
                      <div className="space-y-2 mt-4">
                        {application.status === "pending" && (
                          <div className="grid grid-cols-2 gap-2">
                            <Button 
                              variant="default"
                              className="bg-green-600 hover:bg-green-700"
                              onClick={() => {
                                setSelectedApplication(application);
                                handleStatusChange(application.id, "approved");
                              }}
                            >
                              <Check className="h-4 w-4 mr-1" />
                              Approve
                            </Button>
                            <Button 
                              variant="outline"
                              className="text-red-500 border-red-500 hover:bg-red-50"
                              onClick={() => {
                                setSelectedApplication(application);
                                handleStatusChange(application.id, "rejected");
                              }}
                            >
                              <X className="h-4 w-4 mr-1" />
                              Reject
                            </Button>
                          </div>
                        )}
                        
                        <Button 
                          variant={application.status === "pending" ? "outline" : "default"}
                          className="w-full"
                          onClick={() => {
                            setSelectedApplication(application);
                            setIsViewDialogOpen(true);
                          }}
                        >
                          View Details
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )) : (
              <div className="text-center py-12">
                <FileText className="mx-auto h-12 w-12 text-muted-foreground mb-3" />
                <h3 className="text-xl font-medium mb-2">No applications found</h3>
                <p className="text-muted-foreground">
                  {activeTab === "all" 
                    ? "There are no applications matching your filters." 
                    : `You don't have any ${activeTab} applications.`}
                </p>
                {searchTerm && (
                  <Button 
                    variant="outline"
                    className="mt-4"
                    onClick={() => setSearchTerm("")}
                  >
                    Clear Search
                  </Button>
                )}
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
      
      {/* Application Details Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-3xl">
          {selectedApplication && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center">
                  <img 
                    src={selectedApplication.creatorAvatar} 
                    alt={selectedApplication.creatorName} 
                    className="h-8 w-8 rounded-full mr-2"
                  />
                  Application from {selectedApplication.creatorName}
                </DialogTitle>
                <DialogDescription className="flex items-center gap-2 mt-1">
                  For campaign: <span className="font-medium">{selectedApplication.campaignTitle}</span>
                  {getStatusBadge(selectedApplication.status)}
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid gap-6 mt-4">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-2">Creator Details</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Name:</span>
                        <span className="font-medium">{selectedApplication.creatorName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Followers:</span>
                        <span className="font-medium">{selectedApplication.followers}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Engagement:</span>
                        <span className="font-medium">{selectedApplication.engagement}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Platforms:</span>
                        <span className="font-medium capitalize">{selectedApplication.creatorPlatforms.join(", ")}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Categories:</span>
                        <span className="font-medium capitalize">{selectedApplication.categories.join(", ")}</span>
                      </div>
                    </div>
                    
                    <Button
                      variant="outline"
                      className="mt-4 w-full"
                      onClick={() => {
                        toast.success("Redirecting to creator profile");
                      }}
                    >
                      <User className="h-4 w-4 mr-2" />
                      View Full Profile
                    </Button>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Application Note</h4>
                    <div className="border rounded-md p-3 min-h-[100px] bg-muted/20">
                      <p className="text-sm">{selectedApplication.note}</p>
                    </div>
                    
                    {selectedApplication.status === "pending" && (
                      <div className="grid grid-cols-2 gap-2 mt-4">
                        <Button 
                          variant="default"
                          className="bg-green-600 hover:bg-green-700"
                          onClick={() => handleStatusChange(selectedApplication.id, "approved")}
                        >
                          <Check className="h-4 w-4 mr-1" />
                          Approve Application
                        </Button>
                        <Button 
                          variant="outline"
                          className="text-red-500 border-red-500 hover:bg-red-50"
                          onClick={() => handleStatusChange(selectedApplication.id, "rejected")}
                        >
                          <X className="h-4 w-4 mr-1" />
                          Reject Application
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Message History</h4>
                  <ScrollArea className="h-60 border rounded-md p-3">
                    <div className="space-y-3">
                      {selectedApplication.messages.map((msg, index) => (
                        <div 
                          key={index} 
                          className={`flex ${msg.sender === 'brand' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div 
                            className={`max-w-[80%] px-3 py-2 rounded-lg ${
                              msg.sender === 'brand' 
                                ? 'bg-brand-pink text-white' 
                                : 'bg-secondary'
                            }`}
                          >
                            <p className="text-sm">{msg.content}</p>
                            <p className="text-xs opacity-70 mt-1">
                              {new Date(msg.timestamp).toLocaleString()}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Send Message</h4>
                  <div className="flex gap-2">
                    <Textarea 
                      placeholder="Type your message..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="flex-1"
                    />
                    <Button onClick={handleSendMessage}>Send</Button>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ApplicationManagement;
