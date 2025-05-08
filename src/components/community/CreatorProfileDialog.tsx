
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSquare, UserPlus, Check, Save, ExternalLink, Share2, Flag } from "lucide-react";
import { toast } from "sonner";

interface Creator {
  id: string;
  name: string;
  username: string;
  avatar: string;
  followers: number;
  niche: string[];
  status?: string;
  compatibility?: number;
  connected?: boolean;
  platforms?: string[];
  bio?: string;
}

interface CreatorProfileDialogProps {
  creator: Creator | null;
  isOpen: boolean;
  onClose: () => void;
  onConnect: (creator: Creator) => void;
}

export const CreatorProfileDialog: React.FC<CreatorProfileDialogProps> = ({
  creator,
  isOpen,
  onClose,
  onConnect
}) => {
  const [isSaved, setIsSaved] = React.useState(false);
  
  if (!creator) return null;
  
  const handleMessage = () => {
    toast.success(`Opening chat with ${creator.name}`);
    onClose();
  };
  
  const handleSave = () => {
    setIsSaved(!isSaved);
    if (!isSaved) {
      toast.success(`${creator.name} added to saved creators`);
    } else {
      toast.info(`${creator.name} removed from saved creators`);
    }
  };
  
  const handleReport = () => {
    toast.info("Report feature will be available soon");
  };
  
  const handleShare = () => {
    toast.info("Share feature will be available soon");
  };
  
  const mockProjects = [
    { 
      id: 'p1', 
      title: 'Summer Collection Showcase', 
      type: 'Fashion',
      date: '2 weeks ago',
      participants: 4
    },
    { 
      id: 'p2', 
      title: 'Sustainable Brands Feature', 
      type: 'Lifestyle',
      date: '1 month ago',
      participants: 6
    }
  ];
  
  const mockStats = {
    projects: 12,
    collaborations: 28,
    rating: 4.8,
    responseRate: '98%',
    responseTime: '< 24 hours'
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => onClose()}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16 border-2 border-brand-pink">
              <AvatarImage src={creator.avatar} alt={creator.name} />
              <AvatarFallback>{creator.name.split("")[0]}</AvatarFallback>
            </Avatar>
            <div>
              <DialogTitle className="text-xl">{creator.name}</DialogTitle>
              <DialogDescription className="flex items-center gap-2">
                {creator.username}
                <span className="text-muted-foreground mx-1">•</span>
                <span>{(creator.followers/1000).toFixed(0)}K followers</span>
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          {/* Quick Actions */}
          <div className="flex flex-wrap gap-2">
            <Button onClick={handleMessage} size="sm" className="flex-grow sm:flex-grow-0">
              <MessageSquare className="h-4 w-4 mr-2" />
              Message
            </Button>
            
            <Button 
              onClick={() => onConnect(creator)} 
              size="sm" 
              variant={creator.connected ? "secondary" : "default"} 
              className="flex-grow sm:flex-grow-0"
              disabled={creator.connected}
            >
              {creator.connected ? (
                <>
                  <Check className="h-4 w-4 mr-2" />
                  Connected
                </>
              ) : (
                <>
                  <UserPlus className="h-4 w-4 mr-2" />
                  Connect
                </>
              )}
            </Button>
            
            <Button onClick={handleSave} variant="outline" size="sm" className="flex-grow sm:flex-grow-0">
              <Save className="h-4 w-4 mr-2" />
              {isSaved ? "Saved" : "Save"}
            </Button>
            
            <Button onClick={handleShare} variant="outline" size="sm" className="ml-auto">
              <Share2 className="h-4 w-4" />
              <span className="sr-only">Share</span>
            </Button>
            
            <Button onClick={handleReport} variant="ghost" size="sm">
              <Flag className="h-4 w-4" />
              <span className="sr-only">Report</span>
            </Button>
          </div>
          
          {/* Bio */}
          <div>
            <h3 className="font-medium mb-2">Bio</h3>
            <p className="text-sm text-muted-foreground">
              {creator.bio || `${creator.name} is a content creator specializing in ${creator.niche.join(", ")}. 
              They create engaging content that resonates with their audience of ${(creator.followers/1000).toFixed(0)}K followers.`}
            </p>
          </div>
          
          {/* Tags */}
          <div>
            <h3 className="font-medium mb-2">Categories</h3>
            <div className="flex flex-wrap gap-2">
              {creator.niche.map((tag) => (
                <Badge key={tag} variant="outline" className="capitalize">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
          
          {/* Platforms */}
          {creator.platforms && (
            <div>
              <h3 className="font-medium mb-2">Platforms</h3>
              <div className="flex flex-wrap gap-2">
                {creator.platforms.map((platform) => (
                  <Badge key={platform} className="bg-secondary text-xs capitalize">
                    {platform}
                  </Badge>
                ))}
              </div>
            </div>
          )}
          
          {/* Stats */}
          <div>
            <h3 className="font-medium mb-2">Creator Stats</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div className="bg-black/10 backdrop-blur-md rounded-lg p-3">
                <div className="text-lg font-semibold">{mockStats.projects}</div>
                <div className="text-xs text-muted-foreground">Projects</div>
              </div>
              <div className="bg-black/10 backdrop-blur-md rounded-lg p-3">
                <div className="text-lg font-semibold">{mockStats.collaborations}</div>
                <div className="text-xs text-muted-foreground">Collaborations</div>
              </div>
              <div className="bg-black/10 backdrop-blur-md rounded-lg p-3">
                <div className="text-lg font-semibold">{mockStats.rating}</div>
                <div className="text-xs text-muted-foreground">Average Rating</div>
              </div>
              <div className="bg-black/10 backdrop-blur-md rounded-lg p-3">
                <div className="text-lg font-semibold">{mockStats.responseRate}</div>
                <div className="text-xs text-muted-foreground">Response Rate</div>
              </div>
              <div className="bg-black/10 backdrop-blur-md rounded-lg p-3 col-span-2 sm:col-span-1">
                <div className="text-lg font-semibold">{mockStats.responseTime}</div>
                <div className="text-xs text-muted-foreground">Avg. Response Time</div>
              </div>
            </div>
          </div>
          
          {/* Content Tabs */}
          <Tabs defaultValue="projects" className="w-full">
            <TabsList className="grid grid-cols-2">
              <TabsTrigger value="projects">Projects</TabsTrigger>
              <TabsTrigger value="collaborations">Collaborations</TabsTrigger>
            </TabsList>
            
            <TabsContent value="projects" className="mt-4 space-y-4">
              {mockProjects.length > 0 ? mockProjects.map(project => (
                <div key={project.id} className="flex items-center justify-between p-3 bg-black/10 backdrop-blur-md rounded-lg">
                  <div>
                    <p className="font-medium">{project.title}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Badge variant="outline" className="text-xs">{project.type}</Badge>
                      <span>{project.date}</span>
                    </div>
                  </div>
                  <Button size="sm" variant="ghost">
                    <ExternalLink className="h-4 w-4" />
                    <span className="sr-only">View</span>
                  </Button>
                </div>
              )) : (
                <p className="text-center text-sm text-muted-foreground py-4">No projects available</p>
              )}
            </TabsContent>
            
            <TabsContent value="collaborations" className="mt-4">
              <p className="text-center text-sm text-muted-foreground py-4">Collaboration history will be available soon</p>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
};
