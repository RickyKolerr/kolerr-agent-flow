
import { useState } from "react";
import { FileText, ArrowUpRight, Clock, CheckCircle, XCircle, MessageCircle, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { ScrollArea } from "@/components/ui/scroll-area";

// Mock application data
const mockApplications = [
  {
    id: "app1",
    campaignId: "c1",
    campaignTitle: "Summer Fashion Collection",
    brand: "StyleCo",
    brandLogo: "https://ui-avatars.com/api/?name=StyleCo&background=0D8ABC&color=fff",
    appliedDate: "2023-06-28",
    status: "pending",
    notes: "I'd love to showcase your summer collection with my beach-themed content. My audience responds well to authentic fashion showcases.",
    budget: "500-1000",
    platform: "tiktok",
    categories: ["fashion", "lifestyle"],
    messages: [
      { sender: "user", content: "I'm excited about this opportunity!", timestamp: "2023-06-28T10:30:00" },
      { sender: "brand", content: "Thanks for applying! We'll review your profile and get back to you soon.", timestamp: "2023-06-28T14:15:00" }
    ]
  },
  {
    id: "app2",
    campaignId: "c3",
    campaignTitle: "Vegan Food Challenge",
    brand: "GreenEats",
    brandLogo: "https://ui-avatars.com/api/?name=GreenEats&background=4CAF50&color=fff",
    appliedDate: "2023-06-20",
    status: "accepted",
    notes: "I've been following a plant-based diet for over a year and would love to showcase your products.",
    budget: "200-400",
    platform: "instagram",
    categories: ["food", "health"],
    startDate: "2023-07-10",
    endDate: "2023-07-13",
    messages: [
      { sender: "user", content: "I've done several food challenges before and my audience loves them!", timestamp: "2023-06-20T09:45:00" },
      { sender: "brand", content: "Your profile looks perfect for our campaign! We'd love to have you on board.", timestamp: "2023-06-22T11:20:00" },
      { sender: "brand", content: "We'll ship the products next week. Please confirm your shipping address.", timestamp: "2023-06-23T15:40:00" },
      { sender: "user", content: "Confirmed! Looking forward to receiving the products.", timestamp: "2023-06-23T16:05:00" }
    ]
  },
  {
    id: "app3",
    campaignId: "c5",
    campaignTitle: "Travel Backpack Feature",
    brand: "Wanderlust",
    brandLogo: "https://ui-avatars.com/api/?name=Wanderlust&background=607D8B&color=fff",
    appliedDate: "2023-06-15",
    status: "rejected",
    notes: "I have a travel series planned for next month that would be perfect for featuring your backpack.",
    budget: "300-700",
    platform: "youtube",
    categories: ["travel"],
    messages: [
      { sender: "user", content: "I'm planning a hiking trip that would be perfect to showcase your backpack!", timestamp: "2023-06-15T08:30:00" },
      { sender: "brand", content: "Thanks for your interest! We've received many applications and will review yours soon.", timestamp: "2023-06-16T14:00:00" },
      { sender: "brand", content: "After careful consideration, we've decided to go with other creators whose content more closely aligns with our current campaign goals. We appreciate your interest and hope to work with you in the future.", timestamp: "2023-06-25T10:15:00" }
    ]
  },
  {
    id: "app4",
    campaignId: "c4",
    campaignTitle: "Fitness Apparel Showcase",
    brand: "FlexFit",
    brandLogo: "https://ui-avatars.com/api/?name=FlexFit&background=FF5722&color=fff",
    appliedDate: "2023-06-25",
    status: "completed",
    notes: "As a fitness instructor, I can create authentic content showcasing your apparel during my workout routines.",
    budget: "400-800",
    platform: "tiktok",
    categories: ["fitness", "fashion"],
    completedDate: "2023-07-15",
    performance: {
      views: 45000,
      engagement: "4.2%",
      clicks: 720
    },
    messages: [
      { sender: "user", content: "I'm a certified fitness trainer and would love to showcase your apparel!", timestamp: "2023-06-25T11:20:00" },
      { sender: "brand", content: "We love your content! Let's move forward with this collaboration.", timestamp: "2023-06-26T09:30:00" },
      { sender: "brand", content: "We've shipped the products. Please confirm when you receive them.", timestamp: "2023-06-28T15:45:00" },
      { sender: "user", content: "Received the products today! They look amazing, filming starts tomorrow.", timestamp: "2023-07-01T16:10:00" },
      { sender: "user", content: "Content is live now! Here's the link to the post.", timestamp: "2023-07-10T14:25:00" },
      { sender: "brand", content: "The content looks fantastic! Thank you for the great work.", timestamp: "2023-07-11T10:00:00" }
    ]
  }
];

const Applications = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [message, setMessage] = useState("");
  const [selectedApplication, setSelectedApplication] = useState<typeof mockApplications[0] | null>(null);
  
  const filteredApplications = activeTab === "all" 
    ? mockApplications 
    : mockApplications.filter(app => app.status === activeTab);
  
  const handleSendMessage = () => {
    if (!message.trim() || !selectedApplication) return;
    
    toast.success("Message sent", {
      description: "Your message has been sent to the brand."
    });
    
    setMessage("");
  };
  
  const getStatusBadge = (status: string) => {
    switch(status) {
      case "pending":
        return <Badge variant="outline" className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20">Pending Review</Badge>;
      case "accepted":
        return <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">Accepted</Badge>;
      case "rejected":
        return <Badge variant="outline" className="bg-red-500/10 text-red-500 border-red-500/20">Not Selected</Badge>;
      case "completed":
        return <Badge variant="outline" className="bg-blue-500/10 text-blue-500 border-blue-500/20">Completed</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };
  
  const getStatusIcon = (status: string) => {
    switch(status) {
      case "pending": return <Clock className="h-5 w-5 text-yellow-500" />;
      case "accepted": return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "rejected": return <XCircle className="h-5 w-5 text-red-500" />;
      case "completed": return <CheckCircle className="h-5 w-5 text-blue-500" />;
      default: return <Clock className="h-5 w-5" />;
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <FileText className="h-6 w-6 text-brand-pink" />
          <h1 className="text-2xl font-bold tracking-tight">My Applications</h1>
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
          <TabsTrigger value="accepted" className="text-sm">
            Accepted
          </TabsTrigger>
          <TabsTrigger value="completed" className="text-sm">
            Completed
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value={activeTab} className="mt-0">
          <div className="grid gap-4">
            {filteredApplications.length > 0 ? filteredApplications.map(application => (
              <Card key={application.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex flex-col md:flex-row">
                    <div className="w-full md:w-2/3 p-6">
                      <div className="flex items-center space-x-3 mb-4">
                        <img 
                          src={application.brandLogo} 
                          alt={application.brand} 
                          className="h-10 w-10 rounded-full"
                        />
                        <div>
                          <h3 className="text-xl font-bold">{application.campaignTitle}</h3>
                          <p className="text-sm text-muted-foreground">{application.brand}</p>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-3 mb-4">
                        {getStatusBadge(application.status)}
                        <Badge variant="outline" className="capitalize">
                          {application.platform}
                        </Badge>
                        {application.categories.map(category => (
                          <Badge key={category} variant="secondary" className="capitalize">
                            {category}
                          </Badge>
                        ))}
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <h4 className="text-sm font-semibold mb-1">Your Application Note:</h4>
                          <p className="text-sm text-muted-foreground">{application.notes}</p>
                        </div>
                        
                        <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1 text-brand-pink" />
                            <span>Applied {new Date(application.appliedDate).toLocaleDateString()}</span>
                          </div>
                          
                          {application.status === "accepted" && (
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1 text-green-500" />
                              <span>Campaign: {new Date(application.startDate).toLocaleDateString()} - {new Date(application.endDate).toLocaleDateString()}</span>
                            </div>
                          )}
                          
                          {application.status === "completed" && application.performance && (
                            <div className="flex items-center">
                              <ArrowUpRight className="h-4 w-4 mr-1 text-blue-500" />
                              <span>{application.performance.views.toLocaleString()} views, {application.performance.engagement} engagement</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="w-full md:w-1/3 bg-black/10 p-6 flex flex-col justify-between">
                      <div className="flex items-center space-x-2 mb-4">
                        {getStatusIcon(application.status)}
                        <span className="font-medium">
                          {application.status === "pending" && "Awaiting review"}
                          {application.status === "accepted" && "Campaign accepted"}
                          {application.status === "rejected" && "Not selected"}
                          {application.status === "completed" && "Campaign completed"}
                        </span>
                      </div>
                      
                      <div className="mb-6">
                        <h4 className="font-medium flex items-center mb-2">
                          <MessageCircle className="h-4 w-4 mr-1" />
                          Messages ({application.messages.length})
                        </h4>
                        <p className="text-xs text-muted-foreground">
                          Last message: {new Date(application.messages[application.messages.length - 1].timestamp).toLocaleDateString()}
                        </p>
                      </div>
                      
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            variant="default"
                            className="w-full"
                            onClick={() => setSelectedApplication(application)}
                          >
                            View Details
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-3xl">
                          <DialogHeader>
                            <DialogTitle className="flex items-center">
                              <img 
                                src={selectedApplication?.brandLogo} 
                                alt={selectedApplication?.brand} 
                                className="h-8 w-8 rounded-full mr-2"
                              />
                              {selectedApplication?.campaignTitle}
                            </DialogTitle>
                            <DialogDescription className="flex items-center mt-1">
                              {selectedApplication && getStatusBadge(selectedApplication.status)}
                              <span className="ml-2 text-sm">{selectedApplication?.brand}</span>
                            </DialogDescription>
                          </DialogHeader>
                          
                          <div className="grid gap-4 mt-4">
                            <div>
                              <h4 className="font-medium mb-2">Application Details</h4>
                              <p className="text-sm">{selectedApplication?.notes}</p>
                            </div>
                            
                            <div>
                              <h4 className="font-medium mb-2">Message History</h4>
                              <ScrollArea className="h-60 border rounded-md p-3">
                                <div className="space-y-3">
                                  {selectedApplication?.messages.map((msg, index) => (
                                    <div 
                                      key={index} 
                                      className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                                    >
                                      <div 
                                        className={`max-w-[80%] px-3 py-2 rounded-lg ${
                                          msg.sender === 'user' 
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
                            
                            {(selectedApplication?.status === "pending" || selectedApplication?.status === "accepted") && (
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
                            )}
                          </div>
                        </DialogContent>
                      </Dialog>
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
                    ? "You haven't applied to any campaigns yet." 
                    : `You don't have any ${activeTab} applications.`}
                </p>
                <Button 
                  variant="default" 
                  className="mt-4"
                  onClick={() => window.location.href = "/dashboard/kol/campaigns"}
                >
                  Browse Available Campaigns
                </Button>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Applications;
