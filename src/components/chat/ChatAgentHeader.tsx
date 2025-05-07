import React from "react";
import { X, Home } from "lucide-react";
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
    <div className="sticky top-0 z-10 flex justify-between items-center border-b border-white/10 bg-black/50 backdrop-blur-lg p-4">
      <div>
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-medium text-white">{title}</h2>
        </div>
        {subtitle && (
          <p className="text-sm text-white/70 mt-1">{subtitle}</p>
        )}
      </div>
      
      <div className="flex items-center gap-2">
        {/* Only keep one close button */}
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
  );
};
