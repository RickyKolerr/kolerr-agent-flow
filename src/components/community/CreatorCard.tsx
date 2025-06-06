
import { Check, MessageSquare, UserPlus, Save } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useUserAccess } from "@/hooks/useUserAccess";

interface Creator {
  id: string;
  name: string;
  username: string;
  avatar: string;
  followers: number;
  niche: string[];
  tier: string;
  bio: string;
  compatibility: number;
  platforms: string[];
  connected: boolean;
}

interface CreatorCardProps {
  creator: Creator;
  onConnect: (creator: Creator) => void;
}

export const CreatorCard = ({ creator, onConnect }: CreatorCardProps) => {
  const [message, setMessage] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedCreator, setSelectedCreator] = useState<Creator | null>(null);
  const [isSaved, setIsSaved] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated, canAccessFeature, hasPremiumPlan, getRedirectPath, user } = useUserAccess();

  const handleContactCreator = () => {
    if (!isAuthenticated) {
      toast.error("Please log in to contact creators", {
        description: "Create an account or log in to continue"
      });
      navigate("/login");
      return;
    }

    // Open message dialog
    setSelectedCreator(creator);
    setIsDialogOpen(true);
  };

  const handleRequestCollab = () => {
    if (!isAuthenticated) {
      toast.error("Please log in to request collaborations", {
        description: "Create an account or log in to continue"
      });
      navigate("/login");
      return;
    }

    if (!hasPremiumPlan) {
      toast.error("Premium plan required", {
        description: "Upgrade to premium to request collaborations with creators"
      });
      navigate("/pricing");
      return;
    }

    // Set a template message for collaboration
    setSelectedCreator(creator);
    setMessage(`Hi ${creator.name}, I'd like to collaborate with you on a project. Would you be interested in discussing further?`);
    setIsDialogOpen(true);
  };
  
  const handleSaveCreator = () => {
    if (!isAuthenticated) {
      toast.error("Please log in to save creators", {
        description: "Create an account or log in to continue"
      });
      navigate("/login");
      return;
    }
    
    setIsSaved(!isSaved);
    
    if (!isSaved) {
      toast.success(`${creator.name} saved to your list`, {
        description: "You can access your saved creators in your dashboard"
      });
    } else {
      toast.info(`${creator.name} removed from your saved list`);
    }
  };

  const handleSendMessage = () => {
    if (!message.trim() || !selectedCreator) return;
    
    toast.success(`Message sent to ${selectedCreator.name}`, {
      description: "They will be notified of your message."
    });
    
    // Navigate to appropriate dashboard messages page based on user role
    const chatPath = user?.role === 'kol' 
      ? `/dashboard/kol/messages?recipient=${selectedCreator.id}&name=${encodeURIComponent(selectedCreator.name)}&message=${encodeURIComponent(message)}`
      : `/dashboard/messages?recipient=${selectedCreator.id}&name=${encodeURIComponent(selectedCreator.name)}&message=${encodeURIComponent(message)}`;
    
    navigate(chatPath);
    
    setMessage("");
    setIsDialogOpen(false);
  };

  return (
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
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button 
              variant="outline" 
              size="sm"
              className="text-xs flex-1 mr-2"
              onClick={handleContactCreator}
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
        
        <div className="flex flex-1 gap-2">
          <Button
            variant="save"
            size="sm"
            className="text-xs flex-1"
            onClick={handleSaveCreator}
          >
            <Save className="h-3 w-3 mr-1" />
            {isSaved ? "Saved" : "Save"}
          </Button>
          
          <Button 
            variant={creator.connected ? "secondary" : "default"} 
            size="sm"
            className="text-xs flex-1"
            disabled={creator.connected}
            onClick={() => !creator.connected ? handleRequestCollab() : null}
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
        </div>
      </CardFooter>
    </Card>
  );
};
