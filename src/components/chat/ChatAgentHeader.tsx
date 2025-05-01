
import React from "react";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface ChatAgentHeaderProps {
  title: string;
  subtitle: string;
  onClose?: () => void;
}

export const ChatAgentHeader: React.FC<ChatAgentHeaderProps> = ({ 
  title, 
  subtitle, 
  onClose 
}) => {
  return (
    <div className="flex items-center px-4 py-3 border-b border-white/10 bg-black/40">
      <Avatar className="h-10 w-10 mr-3">
        <img src="/lovable-uploads/ff866eaa-8037-4015-a3f1-e8d5c10916b3.png" alt="Kolerr AI Agent" />
      </Avatar>
      <div className="flex-1">
        <h3 className="font-semibold text-base">{title}</h3>
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
