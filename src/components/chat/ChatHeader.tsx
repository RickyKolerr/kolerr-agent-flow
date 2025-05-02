
import React from "react";
import { ChevronLeft, LayoutDashboard, MoreVertical, Phone, Video } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { OnlineIndicator } from "./OnlineIndicator";
import { Link } from "react-router-dom";
import { ChatUser } from "./types";
import { useMobileDetection } from "@/hooks/use-mobile-detection";
import { Tooltip } from "@/components/ui/tooltip";
import { TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

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
  const { hasTouch } = useMobileDetection();
  
  return (
    <div className="px-4 py-3 border-b border-white/10 flex items-center justify-between">
      <div className="flex items-center gap-3">
        {onBackClick && (
          <Button
            onClick={onBackClick}
            size="icon"
            variant="ghost"
            className="h-10 w-10 md:h-8 md:w-8 -ml-2 touch-manipulation"
            aria-label="Back to conversations"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
        )}
        
        {isDashboardChat && (
          <Link to={dashboardUrl} className="mr-2">
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
          <HeaderButton icon={<Phone className="h-5 w-5" />} label="Call" hasTouch={hasTouch} />
          <HeaderButton icon={<Video className="h-5 w-5" />} label="Video call" hasTouch={hasTouch} />
          <HeaderButton icon={<MoreVertical className="h-5 w-5" />} label="More options" hasTouch={hasTouch} />
        </div>
      )}
    </div>
  );
};

// Optimized button component with tooltip for desktop
const HeaderButton = ({ icon, label, hasTouch }: { icon: React.ReactNode, label: string, hasTouch: boolean }) => {
  // Don't use tooltips on touch devices to avoid interaction issues
  if (hasTouch) {
    return (
      <Button variant="ghost" size="icon" className="h-10 w-10 md:h-8 md:w-8 text-muted-foreground touch-manipulation">
        {icon}
      </Button>
    );
  }
  
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
            {icon}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
