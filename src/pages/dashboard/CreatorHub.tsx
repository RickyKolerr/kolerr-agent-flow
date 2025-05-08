
import React, { useState } from "react";
import { UsersIcon, UserPlus, Search, Briefcase, MessageSquare, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/contexts/AuthContext";
import { useUserAccess } from "@/hooks/useUserAccess";
import { mockContacts } from "@/data/mockContacts";
import { toast } from "sonner";

// Mock collaboration projects
const collaborationProjects = [
  {
    id: "p1",
    title: "Summer Fashion Collection",
    creator: "Alex Thompson",
    creatorAvatar: "https://ui-avatars.com/api/?name=Alex+Thompson&background=random",
    description: "Collaborative fashion campaign featuring sustainable summer wear",
    type: "Fashion",
    status: "active",
    dueDate: "2023-07-15",
    participants: 4,
    maxParticipants: 6
  },
  {
    id: "p2",
    title: "Beauty Product Review Series",
    creator: "Maria Rodriguez",
    creatorAvatar: "https://ui-avatars.com/api/?name=Maria+Rodriguez&background=random",
    description: "Series of honest reviews for a new skincare line",
    type: "Beauty",
    status: "pending",
    dueDate: "2023-07-22",
    participants: 3,
    maxParticipants: 5
  },
  {
    id: "p3",
    title: "Travel Destination Showcase",
    creator: "Sarah Johnson",
    creatorAvatar: "https://ui-avatars.com/api/?name=Sarah+Johnson&background=random",
    description: "Multi-creator showcase of hidden travel destinations",
    type: "Travel",
    status: "active",
    dueDate: "2023-08-10",
    participants: 5,
    maxParticipants: 8
  }
];

// Mock featured creators
const featuredCreators = [
  {
    id: "c1",
    name: "Alex Thompson",
    username: "@alexcreates",
    avatar: "https://ui-avatars.com/api/?name=Alex+Thompson&background=random",
    followers: 245000,
    niche: ["fashion", "lifestyle"],
    status: "online",
    compatibility: 92,
    connected: false
  },
  {
    id: "c2",
    name: "Maria Rodriguez",
    username: "@mariarodriguezbeauty",
    avatar: "https://ui-avatars.com/api/?name=Maria+Rodriguez&background=random",
    followers: 189000,
    niche: ["beauty", "skincare"],
    status: "offline",
    compatibility: 85,
    connected: true
  },
  {
    id: "c3",
    name: "David Kim",
    username: "@davidgaming",
    avatar: "https://ui-avatars.com/api/?name=David+Kim&background=random",
    followers: 320000,
    niche: ["gaming", "tech"],
    status: "offline",
    compatibility: 75,
    connected: false
  }
];

const CreatorHub = () => {
  const { user } = useAuth();
  const { canAccessFeature } = useUserAccess();
  const [activeTab, setActiveTab] = useState("discover");
  const [searchQuery, setSearchQuery] = useState("");
  
  const handleConnectCreator = (creator: any) => {
    toast.success(`Connection request sent to ${creator.name}`, {
      description: "You'll be notified when they respond."
    });
  };
  
  const handleJoinProject = (project: any) => {
    toast.success(`Request to join "${project.title}" sent`, {
      description: `You'll be notified when ${project.creator} responds.`
    });
  };
  
  const handleCreateProject = () => {
    toast.success("Create a new collaboration project", {
      description: "This functionality will be implemented soon."
    });
  };

  // Filter creators based on search query
  const filteredCreators = searchQuery
    ? featuredCreators.filter(
        creator =>
          creator.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          creator.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
          creator.niche.some(n => n.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : featuredCreators;

  // Filter projects based on search query
  const filteredProjects = searchQuery
    ? collaborationProjects.filter(
        project =>
          project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          project.creator.toLowerCase().includes(searchQuery.toLowerCase()) ||
          project.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
          project.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : collaborationProjects;
    
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <UsersIcon className="h-6 w-6 text-brand-pink" />
        <h1 className="text-2xl font-bold tracking-tight">Creator Hub</h1>
      </div>
      
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search creators, projects, or topics..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button onClick={handleCreateProject} className="flex items-center gap-2 whitespace-nowrap">
          <Briefcase className="h-4 w-4" />
          <span>Create Project</span>
        </Button>
      </div>
      
      <Tabs defaultValue="discover" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3">
          <TabsTrigger value="discover">Discover</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="connections">Connections</TabsTrigger>
        </TabsList>
        
        {/* Discover Tab */}
        <TabsContent value="discover" className="space-y-6 mt-6">
          <div>
            <h2 className="text-xl font-semibold mb-4">Featured Creators</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredCreators.map((creator) => (
                <Card key={creator.id} className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div className="flex gap-3">
                        <Avatar className="h-10 w-10 border border-brand-pink/20">
                          <AvatarImage src={creator.avatar} alt={creator.name} />
                          <AvatarFallback>{creator.name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-base">{creator.name}</CardTitle>
                          <CardDescription>{creator.username}</CardDescription>
                        </div>
                      </div>
                      <Badge variant="outline" className={creator.status === "online" ? "bg-green-500/10 text-green-500" : "bg-gray-500/10 text-gray-400"}>
                        {creator.status === "online" ? "Online" : "Offline"}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-3">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-muted-foreground">{creator.followers.toLocaleString()} followers</span>
                      <div className="flex gap-1">
                        {creator.niche.map((tag, i) => (
                          <Badge key={i} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="mt-4 flex items-center gap-2">
                      <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                      <span className="text-sm">
                        <strong>{creator.compatibility}%</strong> compatibility with your niche
                      </span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      onClick={() => handleConnectCreator(creator)} 
                      variant={creator.connected ? "outline" : "default"}
                      className="w-full"
                      disabled={creator.connected}
                    >
                      {creator.connected ? (
                        "Connected"
                      ) : (
                        <>
                          <UserPlus className="h-4 w-4 mr-2" />
                          Connect
                        </>
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
          
          <Separator />
          
          <div>
            <h2 className="text-xl font-semibold mb-4">Trending Projects</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {filteredProjects.slice(0, 2).map((project) => (
                <Card key={project.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle>{project.title}</CardTitle>
                      <Badge variant={project.status === "active" ? "default" : "outline"}>
                        {project.status === "active" ? "Active" : "Pending"}
                      </Badge>
                    </div>
                    <CardDescription className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={project.creatorAvatar} />
                        <AvatarFallback>{project.creator[0]}</AvatarFallback>
                      </Avatar>
                      <span>by {project.creator}</span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">{project.description}</p>
                    <div className="flex justify-between items-center mt-4">
                      <Badge variant="outline">{project.type}</Badge>
                      <span className="text-xs text-muted-foreground">
                        Due: {new Date(project.dueDate).toLocaleDateString()}
                      </span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <div className="w-full flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">
                        {project.participants}/{project.maxParticipants} participants
                      </span>
                      <Button size="sm" onClick={() => handleJoinProject(project)}>
                        Join Project
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>
        
        {/* Projects Tab */}
        <TabsContent value="projects" className="mt-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">All Projects</h2>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  Filter
                </Button>
                <Button variant="outline" size="sm">
                  Sort
                </Button>
              </div>
            </div>
            
            {filteredProjects.length === 0 ? (
              <div className="py-8 text-center">
                <p className="text-muted-foreground">No projects found matching your search.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredProjects.map((project) => (
                  <Card key={project.id}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle>{project.title}</CardTitle>
                        <Badge variant={project.status === "active" ? "default" : "outline"}>
                          {project.status === "active" ? "Active" : "Pending"}
                        </Badge>
                      </div>
                      <CardDescription className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={project.creatorAvatar} />
                          <AvatarFallback>{project.creator[0]}</AvatarFallback>
                        </Avatar>
                        <span>by {project.creator}</span>
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm">{project.description}</p>
                      <div className="flex justify-between items-center mt-4">
                        <Badge variant="outline">{project.type}</Badge>
                        <span className="text-xs text-muted-foreground">
                          Due: {new Date(project.dueDate).toLocaleDateString()}
                        </span>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <div className="w-full flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">
                          {project.participants}/{project.maxParticipants} participants
                        </span>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <MessageSquare className="h-4 w-4 mr-2" />
                            Details
                          </Button>
                          <Button size="sm" onClick={() => handleJoinProject(project)}>
                            Join Project
                          </Button>
                        </div>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </TabsContent>
        
        {/* Connections Tab */}
        <TabsContent value="connections" className="mt-6">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Your Network</h2>
            
            <div className="grid gap-4">
              {mockContacts.map((contact) => (
                <Card key={contact.id} className="overflow-hidden">
                  <div className="flex items-center p-4">
                    <Avatar className="h-12 w-12 mr-4">
                      <AvatarImage src={contact.avatar} alt={contact.name} />
                      <AvatarFallback>{contact.name[0]}</AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1">
                      <h3 className="font-medium">{contact.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {contact.role} at {contact.company}
                      </p>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <MessageSquare className="h-4 w-4" />
                        <span className="sr-only">Message</span>
                      </Button>
                      <Button variant="default" size="sm">
                        View Profile
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CreatorHub;
