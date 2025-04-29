
import React from 'react';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MessageCircle, UserPlus } from 'lucide-react';
import { useChat } from '@/contexts/ChatContext';

export interface CreatorCardProps {
  creator: {
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
  };
  onConnect: (creator: any) => void;
}

export const CreatorCard = ({ creator, onConnect }: CreatorCardProps) => {
  const { openChat, isInitialized } = useChat();

  const handleMessageClick = () => {
    openChat(creator.id, creator.name);
  };

  return (
    <Card className="overflow-hidden">
      <div 
        className={`h-2 w-full 
          ${creator.tier === 'Platinum' ? 'bg-slate-400' : 
            creator.tier === 'Gold' ? 'bg-yellow-400' : 
            creator.tier === 'Silver' ? 'bg-gray-300' : 
            'bg-brand-pink'
          }
        `}
      />
      <CardContent className="p-6">
        <div className="flex justify-between">
          <div className="flex space-x-3">
            <Avatar className="h-14 w-14">
              <AvatarImage src={creator.avatar} />
              <AvatarFallback>{creator.name.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold">{creator.name}</h3>
              <p className="text-sm text-muted-foreground">{creator.username}</p>
              <div className="flex items-center mt-1 space-x-1">
                <Badge variant="outline">{creator.tier}</Badge>
                <Badge className={`
                  ${creator.compatibility > 90 ? 'bg-green-500/20 text-green-700' :
                    creator.compatibility > 75 ? 'bg-blue-500/20 text-blue-700' :
                    'bg-orange-500/20 text-orange-700'}
                `}>
                  {creator.compatibility}% match
                </Badge>
              </div>
            </div>
          </div>
          <div>
            <p className="text-sm font-medium">{(creator.followers / 1000).toFixed(0)}K</p>
            <p className="text-xs text-muted-foreground">followers</p>
          </div>
        </div>
        
        <div className="mt-3">
          <p className="text-sm text-muted-foreground line-clamp-3">{creator.bio}</p>
        </div>
        
        <div className="flex flex-wrap gap-1 mt-3">
          {creator.niche.map((tag, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
        
        <div className="flex mt-3 space-x-1">
          {creator.platforms.map((platform) => (
            <div key={platform} className="bg-muted/50 p-1 rounded">
              <img 
                src={`https://ui-avatars.com/api/?name=${platform}&background=random&color=fff&size=20&length=1&bold=true&font-size=0.6`}
                alt={platform}
                className="w-5 h-5 rounded"
              />
            </div>
          ))}
        </div>
      </CardContent>
      
      <CardFooter className="bg-muted/20 px-6 py-3 flex justify-between">
        <Button 
          variant={creator.connected ? "outline" : "default"}
          size="sm"
          onClick={() => onConnect(creator)}
          className={creator.connected ? "border-green-500 text-green-500" : ""}
        >
          <UserPlus className="h-4 w-4 mr-1" />
          {creator.connected ? "Connected" : "Connect"}
        </Button>
        
        {isInitialized && (
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleMessageClick}
          >
            <MessageCircle className="h-4 w-4 mr-1" />
            Message
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};
