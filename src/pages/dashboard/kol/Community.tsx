
import { useState } from "react";
import { 
  MessageCircle, Users, UserPlus, Search, Filter, 
  MessageSquare, Calendar, Heart, Star, Award
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

// Mock creators data
const mockCreators = [
  {
    id: "c1",
    name: "Alex Thompson",
    username: "@alexcreates",
    avatar: "https://ui-avatars.com/api/?name=Alex+Thompson&background=random",
    followers: 245000,
    niche: ["fashion", "lifestyle"],
    tier: "Gold",
    bio: "Fashion blogger and lifestyle influencer based in New York. Sharing daily outfit inspirations and fashion tips.",
    compatibility: 92,
    platforms: ["tiktok", "instagram"],
    connected: false
  },
  {
    id: "c2",
    name: "Maria Rodriguez",
    username: "@mariarodriguezbeauty",
    avatar: "https://ui-avatars.com/api/?name=Maria+Rodriguez&background=random",
    followers: 189000,
    niche: ["beauty", "skincare", "lifestyle"],
    tier: "Gold",
    bio: "Beauty expert and skincare enthusiast. Creating content to help you look and feel your best.",
    compatibility: 85,
    platforms: ["instagram", "youtube"],
    connected: true
  },
  {
    id: "c3",
    name: "David Kim",
    username: "@davidgaming",
    avatar: "https://ui-avatars.com/api/?name=David+Kim&background=random",
    followers: 320000,
    niche: ["gaming", "tech"],
    tier: "Platinum",
    bio: "Gaming content creator and tech enthusiast. Weekly game reviews and tech tips.",
    compatibility: 65,
    platforms: ["tiktok", "youtube", "twitch"],
    connected: false
  },
  {
    id: "c4",
    name: "Sarah Johnson",
    username: "@sarahtravels",
    avatar: "https://ui-avatars.com/api/?name=Sarah+Johnson&background=random",
    followers: 175000,
    niche: ["travel", "photography"],
    tier: "Silver",
    bio: "Travel vlogger exploring new destinations every month. Sharing travel tips and photography insights.",
    compatibility: 78,
    platforms: ["instagram", "youtube"],
    connected: false
  },
  {
    id: "c5",
    name: "James Wilson",
    username: "@fitwithjames",
    avatar: "https://ui-avatars.com/api/?name=James+Wilson&background=random",
    followers: 210000,
    niche: ["fitness", "wellness", "nutrition"],
    tier: "Gold",
    bio: "Certified fitness trainer sharing workout routines, wellness tips, and healthy recipes.",
    compatibility: 90,
    platforms: ["instagram", "tiktok"],
    connected: true
  },
  {
    id: "c6",
    name: "Emma Davis",
    username: "@emmacooks",
    avatar: "https://ui-avatars.com/api/?name=Emma+Davis&background=random",
    followers: 165000,
    niche: ["food", "cooking", "wellness"],
    tier: "Silver",
    bio: "Recipe developer and home cook. Sharing quick, healthy, and delicious recipes for busy people.",
    compatibility: 75,
    platforms: ["instagram", "tiktok", "youtube"],
    connected: false
  }
];

// Mock collaboration groups
const collaborationGroups = [
  {
    id: "g1",
    name: "Fashion & Beauty Creators",
    description: "A group for fashion and beauty creators to collaborate, share tips, and support each other.",
    members: 24,
    category: "fashion",
    recentActivity: "15 min ago"
  },
  {
    id: "g2",
    name: "Travel Content Collective",
    description: "Connect with fellow travel content creators for collaborations, location tips, and content strategies.",
    members: 18,
    category: "travel",
    recentActivity: "2 hours ago"
  },
  {
    id: "g3",
    name: "Fitness Influencer Network",
    description: "For fitness creators to discuss workout trends, nutrition tips, and potential cross-promotions.",
    members: 31,
    category: "fitness",
    recentActivity: "1 day ago"
  }
];

// Mock collaboration opportunities
const collaborationOpportunities = [
  {
    id: "o1",
    title: "Joint Fashion Haul",
    creator: "Alex Thompson",
    creatorAvatar: "https://ui-avatars.com/api/?name=Alex+Thompson&background=random",
    description: "Looking for 1-2 other fashion creators for a collaborative try-on haul featuring sustainable brands.",
    platforms: ["tiktok", "instagram"],
    deadline: "2023-08-10",
    participants: 1,
    maxParticipants: 3
  },
  {
    id: "o2",
    title: "Travel Vlog Series",
    creator: "Sarah Johnson",
    creatorAvatar: "https://ui-avatars.com/api/?name=Sarah+Johnson&background=random",
    description: "Planning a collaborative travel series with 2-3 other travel creators. Each episode will feature a different destination.",
    platforms: ["youtube"],
    deadline: "2023-08-20",
    participants: 2,
    maxParticipants: 4
  },
  {
    id: "o3",
    title: "Fitness Challenge",
    creator: "James Wilson",
    creatorAvatar: "https://ui-avatars.com/api/?name=James+Wilson&background=random",
    description: "Creating a 7-day fitness challenge with multiple trainers. Each day features a different workout style.",
    platforms: ["instagram", "tiktok"],
    deadline: "2023-08-15",
    participants: 3,
    maxParticipants: 5
  }
];

const Community = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [activeTab, setActiveTab] = useState("creators");
  const [selectedCreator, setSelectedCreator] = useState<any>(null);
  const [message, setMessage] = useState("");
  
  const filteredCreators = mockCreators.filter(creator => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      if (!creator.name.toLowerCase().includes(query) && 
          !creator.username.toLowerCase().includes(query) && 
          !creator.bio.toLowerCase().includes(query) &&
          !creator.niche.some(n => n.toLowerCase().includes(query))) {
        return false;
      }
    }
    
    if (categoryFilter && !creator.niche.includes(categoryFilter)) {
      return false;
    }
    
    return true;
  });
  
  const handleSendMessage = () => {
    if (!message.trim() || !selectedCreator) return;
    
    toast.success(`Message sent to ${selectedCreator.name}`, {
      description: "They will be notified of your message."
    });
    setMessage("");
  };
  
  const handleConnectCreator = (creator: any) => {
    toast.success(`Connection request sent to ${creator.name}`, {
      description: "You'll be notified when they respond."
    });
  };
  
  const handleJoinGroup = (group: any) => {
    toast.success(`Joined ${group.name}`, {
      description: "You can now participate in group discussions."
    });
  };
  
  const handleJoinCollaboration = (opportunity: any) => {
    toast.success(`Joined collaboration: ${opportunity.title}`, {
      description: `You'll be connected with ${opportunity.creator} to discuss details.`
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <MessageCircle className="h-6 w-6 text-brand-pink" />
        <h1 className="text-2xl font-bold tracking-tight">Creator Community</h1>
      </div>
      
      <Tabs defaultValue="creators" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="creators">Creators</TabsTrigger>
          <TabsTrigger value="groups">Collaboration Groups</TabsTrigger>
          <TabsTrigger value="opportunities">Collaboration Opportunities</TabsTrigger>
        </TabsList>
        
        <TabsContent value="creators" className="space-y-6 mt-6">
          {/* Search and filters */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative w-full md:w-2/3">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search creators by name, niche, or username..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full md:w-1/3">
                <SelectValue placeholder="Filter by niche" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Niches</SelectItem>
                <SelectItem value="fashion">Fashion</SelectItem>
                <SelectItem value="beauty">Beauty</SelectItem>
                <SelectItem value="gaming">Gaming</SelectItem>
                <SelectItem value="tech">Tech</SelectItem>
                <SelectItem value="travel">Travel</SelectItem>
                <SelectItem value="fitness">Fitness</SelectItem>
                <SelectItem value="food">Food</SelectItem>
                <SelectItem value="wellness">Wellness</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {/* Creator cards */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredCreators.length > 0 ? filteredCreators.map((creator) => (
              <Card key={creator.id} className="overflow-hidden hover-scale">
                <CardHeader className="pb-2">
                  <div className="flex justify-between">
                    <Avatar className="h-12 w-12 border-2 border-brand-pink">
                      <AvatarImage src={creator.avatar} alt={creator.name} />
                      <AvatarFallback>{creator.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <Badge variant="outline" className="bg-brand-pink/10 text-brand-pink">
                      {creator.tier}
                    </Badge>
                  </div>
                  <CardTitle className="mt-2">{creator.name}</CardTitle>
                  <CardDescription className="flex items-center space-x-1">
                    <span>{creator.username}</span>
                    <span className="text-muted-foreground mx-1">•</span>
                    <span>{(creator.followers/1000).toFixed(0)}K followers</span>
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-3">
                  <p className="text-sm line-clamp-3 mb-3">{creator.bio}</p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {creator.niche.map((tag) => (
                      <Badge key={tag} variant="outline" className="capitalize">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center gap-2">
                    {creator.platforms.map((platform) => (
                      <Badge key={platform} className="bg-secondary text-xs capitalize">
                        {platform}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between pt-2 border-t">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="text-xs"
                        onClick={() => setSelectedCreator(creator)}
                      >
                        <MessageSquare className="h-3 w-3 mr-1" />
                        Message
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle className="flex items-center">
                          <Avatar className="h-8 w-8 mr-2">
                            <AvatarImage src={selectedCreator?.avatar} alt={selectedCreator?.name} />
                            <AvatarFallback>{selectedCreator?.name?.charAt(0)}</AvatarFallback>
                          </Avatar>
                          Message {selectedCreator?.name}
                        </DialogTitle>
                        <DialogDescription className="pt-2">
                          Send a direct message to connect and discuss collaboration opportunities.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <Textarea
                          placeholder="Write your message here..."
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          className="min-h-[120px]"
                        />
                        <div className="flex justify-end gap-3">
                          <Button
                            variant="default"
                            onClick={handleSendMessage}
                            disabled={!message.trim()}
                          >
                            Send Message
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                  
                  <Button 
                    variant={creator.connected ? "secondary" : "default"} 
                    size="sm"
                    className="text-xs"
                    disabled={creator.connected}
                    onClick={() => !creator.connected && handleConnectCreator(creator)}
                  >
                    {creator.connected ? (
                      <>
                        <Check className="h-3 w-3 mr-1" />
                        Connected
                      </>
                    ) : (
                      <>
                        <UserPlus className="h-3 w-3 mr-1" />
                        Connect
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            )) : (
              <div className="col-span-full text-center py-12">
                <Users className="mx-auto h-12 w-12 text-muted-foreground mb-3" />
                <h3 className="text-xl font-medium mb-2">No matching creators found</h3>
                <p className="text-muted-foreground">Try adjusting your filters or search term</p>
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="groups" className="space-y-6 mt-6">
          {/* Collaboration groups */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {collaborationGroups.map((group) => (
              <Card key={group.id} className="hover-scale">
                <CardHeader>
                  <CardTitle>{group.name}</CardTitle>
                  <CardDescription className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    <span>{group.members} members</span>
                    <span className="text-muted-foreground mx-1">•</span>
                    <Badge variant="outline" className="capitalize">
                      {group.category}
                    </Badge>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm line-clamp-3 mb-4">
                    {group.description}
                  </p>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3 mr-1" />
                    <span>Active {group.recentActivity}</span>
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-4 flex justify-end">
                  <Button onClick={() => handleJoinGroup(group)}>
                    Join Group
                  </Button>
                </CardFooter>
              </Card>
            ))}
            
            {/* Create new group card */}
            <Card className="border-dashed hover-scale">
              <CardHeader>
                <CardTitle className="text-muted-foreground">Create New Group</CardTitle>
                <CardDescription>
                  Start your own collaboration group with other creators
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center py-8">
                <Users className="h-12 w-12 text-muted-foreground mb-4" />
                <Button>
                  Create Group
                </Button>
              </CardContent>
            </Card>
          </div>
          
          {/* Popular discussions */}
          <Card>
            <CardHeader>
              <CardTitle>Popular Discussions</CardTitle>
              <CardDescription>
                Recent active topics from collaboration groups
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between pb-3 border-b">
                  <div>
                    <p className="font-medium">Tips for creator-brand negotiations</p>
                    <p className="text-xs text-muted-foreground">
                      Fashion & Beauty Creators • 42 replies • Updated 3 hours ago
                    </p>
                  </div>
                  <Button variant="ghost" size="sm" className="text-brand-pink">
                    <MessageSquare className="h-4 w-4 mr-1" />
                    View
                  </Button>
                </div>
                
                <div className="flex justify-between pb-3 border-b">
                  <div>
                    <p className="font-medium">Content planning for holiday season</p>
                    <p className="text-xs text-muted-foreground">
                      Fitness Influencer Network • 28 replies • Updated 1 day ago
                    </p>
                  </div>
                  <Button variant="ghost" size="sm" className="text-brand-pink">
                    <MessageSquare className="h-4 w-4 mr-1" />
                    View
                  </Button>
                </div>
                
                <div className="flex justify-between pb-3">
                  <div>
                    <p className="font-medium">Best practices for cross-platform content</p>
                    <p className="text-xs text-muted-foreground">
                      Travel Content Collective • 36 replies • Updated 2 days ago
                    </p>
                  </div>
                  <Button variant="ghost" size="sm" className="text-brand-pink">
                    <MessageSquare className="h-4 w-4 mr-1" />
                    View
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t pt-4">
              <Button variant="outline" className="w-full">
                View All Discussions
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="opportunities" className="space-y-6 mt-6">
          {/* Collaboration opportunities */}
          <div className="grid gap-4">
            {collaborationOpportunities.map((opportunity) => (
              <Card key={opportunity.id} className="hover-scale">
                <CardContent className="p-0">
                  <div className="flex flex-col md:flex-row">
                    <div className="w-full md:w-2/3 p-6">
                      <div className="flex items-center space-x-3 mb-3">
                        <Avatar>
                          <AvatarImage src={opportunity.creatorAvatar} alt={opportunity.creator} />
                          <AvatarFallback>{opportunity.creator.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="text-xl font-bold">{opportunity.title}</h3>
                          <p className="text-sm text-muted-foreground">By {opportunity.creator}</p>
                        </div>
                      </div>
                      
                      <p className="text-muted-foreground mb-4">
                        {opportunity.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {opportunity.platforms.map(platform => (
                          <Badge key={platform} className="bg-brand-pink text-white capitalize">
                            {platform}
                          </Badge>
                        ))}
                      </div>
                      
                      <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1 text-brand-pink" />
                          <span>Deadline: {new Date(opportunity.deadline).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-1 text-brand-pink" />
                          <span>{opportunity.participants}/{opportunity.maxParticipants} Participants</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="w-full md:w-1/3 bg-black/10 p-6 flex flex-col justify-between">
                      <div>
                        <div className="mb-4">
                          <h4 className="font-medium text-sm mb-1">Benefits:</h4>
                          <ul className="space-y-1">
                            <li className="text-sm flex items-center">
                              <Heart className="h-3 w-3 mr-1 text-brand-pink" />
                              Expanded audience reach
                            </li>
                            <li className="text-sm flex items-center">
                              <Star className="h-3 w-3 mr-1 text-brand-pink" />
                              Cross-promotion
                            </li>
                            <li className="text-sm flex items-center">
                              <Award className="h-3 w-3 mr-1 text-brand-pink" />
                              Collaboration points
                            </li>
                          </ul>
                        </div>
                      </div>
                      
                      {opportunity.participants < opportunity.maxParticipants ? (
                        <Button 
                          className="w-full mt-6"
                          onClick={() => handleJoinCollaboration(opportunity)}
                        >
                          Join Collaboration
                        </Button>
                      ) : (
                        <Button 
                          className="w-full mt-6"
                          variant="outline"
                          disabled
                        >
                          Collaboration Full
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Create collaboration */}
          <Card className="border-dashed">
            <CardHeader>
              <CardTitle>Create Your Own Collaboration</CardTitle>
              <CardDescription>
                Start a new collaboration opportunity with other creators
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center py-6">
              <Users className="h-12 w-12 text-muted-foreground mb-4" />
              <Button>
                Create Collaboration
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Community;
