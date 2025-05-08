
import React from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ChatAgentHeaderProps {
  title: string;
  subtitle?: string;
  onClose: () => void;
}

export const ChatAgentHeader: React.FC<ChatAgentHeaderProps> = ({
  title,
  subtitle,
  onClose,
}) => {
  return (
    <div className="sticky top-0 z-10 flex flex-col border-b border-white/10 bg-gradient-to-r from-brand-magenta/60 to-brand-purple/60 backdrop-blur-lg p-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-medium text-white">{title}</h2>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="rounded-full hover:bg-white/10"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
      </div>
      
      {subtitle ? (
        <p className="text-sm text-white/70 mt-1">{subtitle}</p>
      ) : (
        <p className="text-sm text-white/90 mt-1 italic font-medium">
          Kolerr IM Agent - Less navigation, more interaction.
        </p>
      )}
    </div>
  );
};
