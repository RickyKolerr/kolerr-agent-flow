import React from "react";
import { ChevronLeft, LayoutDashboard, MoreVertical, Phone, Video } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { OnlineIndicator } from "./OnlineIndicator";
import { Link } from "react-router-dom";
import { ChatUser } from "./types";

interface ChatHeaderProps {
  participant: ChatUser | null;
  onBackClick?: () => void;
  isDashboardChat?: boolean;
  dashboardUrl?: string;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({
  participant,
  onBackClick,
  isDashboardChat = false,
  dashboardUrl = "/dashboard",
}) => {
  return (
    <div className="px-4 py-3 border-b border-white/10 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Button
          onClick={onBackClick}
          size="icon"
          variant="ghost"
          className="md:hidden h-8 w-8"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        
        {isDashboardChat && (
          <Link to={dashboardUrl} className="mr-2 hidden md:flex">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <LayoutDashboard className="h-5 w-5" />
              <span className="sr-only">Back to Dashboard</span>
            </Button>
          </Link>
        )}
        
        {participant ? (
          <>
            <div className="relative">
              <Avatar className="h-9 w-9 border border-white/10">
                <img src={participant.avatar} alt={participant.name} />
              </Avatar>
              {participant.status && (
                <OnlineIndicator status={participant.status} />
              )}
            </div>
            <div>
              <h3 className="font-medium">{participant.name}</h3>
              <p className="text-xs text-muted-foreground">
                {participant.status === "online" ? "Online" : "Offline"}
              </p>
            </div>
          </>
        ) : (
          <h3 className="font-medium">Messages</h3>
        )}
      </div>
      
      {participant && (
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
            <Phone className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
            <Video className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
            <MoreVertical className="h-5 w-5" />
          </Button>
        </div>
      )}
    </div>
  );
};
