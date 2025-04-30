
import React from "react";
import { MoreHorizontal, Phone, Video, ArrowLeft } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { OnlineIndicator } from "./OnlineIndicator";
import { ChatUser } from "./types";

interface ChatHeaderProps {
  participant: ChatUser;
  onBackClick?: () => void;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({ participant, onBackClick }) => {
  if (!participant) return null;

  // Format the last seen date in a more user-friendly way
  const formatLastSeen = (lastSeen: string) => {
    const date = new Date(lastSeen);
    const now = new Date();
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) {
      return `Today at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    } else if (diffInDays === 1) {
      return `Yesterday at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    } else if (diffInDays < 7) {
      return `${diffInDays} days ago`;
    } else {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' });
    }
  };

  return (
    <div className="border-b border-white/10 p-4 flex items-center justify-between bg-black/10">
      <div className="flex items-center gap-3">
        {onBackClick && (
          <Button variant="ghost" size="icon" className="mr-1 flex md:hidden" onClick={onBackClick}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
        )}
        <div className="relative">
          <Avatar className="h-10 w-10 border border-white/10">
            <img src={participant.avatar} alt={participant.name} />
          </Avatar>
          <OnlineIndicator status={participant.status} />
        </div>
        <div>
          <h3 className="font-medium">{participant.name}</h3>
          <p className="text-xs text-muted-foreground">
            {participant.status === "online"
              ? "Online"
              : participant.lastSeen
                ? `Last seen ${formatLastSeen(participant.lastSeen)}`
                : "Offline"}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-1">
        <Button variant="ghost" size="icon" className="rounded-full md:flex hidden">
          <Phone className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="rounded-full md:flex hidden">
          <Video className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="rounded-full">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
