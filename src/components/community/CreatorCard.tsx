
import { Check, MessageSquare, UserPlus } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast } from "sonner";

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
  const [selectedCreator, setSelectedCreator] = useState<Creator | null>(null);

  const handleSendMessage = () => {
    if (!message.trim() || !selectedCreator) return;
    
    toast.success(`Message sent to ${selectedCreator.name}`, {
      description: "They will be notified of your message."
    });
    setMessage("");
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
          onClick={() => !creator.connected && onConnect(creator)}
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
  );
};
