
import React from "react";
import { MoreHorizontal, Phone, Video } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { OnlineIndicator } from "./OnlineIndicator";
import { ChatUser } from "./types";

interface ChatHeaderProps {
  participant: ChatUser;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({ participant }) => {
  if (!participant) return null;

  return (
    <div className="border-b border-white/10 p-4 flex items-center justify-between bg-black/10">
      <div className="flex items-center gap-3">
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
                ? `Last seen ${new Date(participant.lastSeen).toLocaleString()}`
                : "Offline"}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-1">
        <Button variant="ghost" size="icon" className="rounded-full">
          <Phone className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Video className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="rounded-full">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
