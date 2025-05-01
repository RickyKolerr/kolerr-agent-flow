
import React from "react";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { X, Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface ChatAgentHeaderProps {
  title: string;
  subtitle: string;
  onClose?: () => void;
  avatarUrl?: string;
  status?: "online" | "offline" | "away";
}

export const ChatAgentHeader: React.FC<ChatAgentHeaderProps> = ({ 
  title, 
  subtitle, 
  onClose,
  avatarUrl = "/lovable-uploads/ff866eaa-8037-4015-a3f1-e8d5c10916b3.png",
  status = "online"
}) => {
  // Function to render status indicator
  const renderStatus = () => {
    const statusColors = {
      online: "bg-green-500",
      offline: "bg-gray-500",
      away: "bg-yellow-500"
    };
    
    return (
      <span className={`absolute bottom-0 right-0 rounded-full w-2.5 h-2.5 ${statusColors[status]} border border-black`}></span>
    );
  };

  return (
    <div className="flex items-center px-4 py-3 border-b border-white/10 bg-black/40">
      <div className="relative">
        <Avatar className="h-10 w-10 mr-3">
          <img src={avatarUrl} alt={`${title} AI Agent`} />
        </Avatar>
        {renderStatus()}
      </div>
      
      <div className="flex-1">
        <div className="flex items-center">
          <h3 className="font-semibold text-base">{title}</h3>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="sm" className="h-6 w-6 ml-2 p-0">
                  <Info className="h-3.5 w-3.5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom" align="center" className="max-w-[250px]">
                <p className="text-xs">AI assistant to help you with Kolerr platform</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <p className="text-xs text-gray-400">
          {subtitle}
        </p>
      </div>
      
      {onClose && (
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={onClose} 
          className="ml-auto"
          aria-label="Close chat"
        >
          <X className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
};
