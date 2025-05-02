
import React from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ChatAgentHeaderProps {
  title: string;
  subtitle: string;
  onClose?: () => void;
}

export const ChatAgentHeader: React.FC<ChatAgentHeaderProps> = ({
  title,
  subtitle,
  onClose,
}) => {
  return (
    <div className="flex items-center justify-between p-4 border-b border-white/10">
      {/* Agent info */}
      <div className="flex items-center">
        <div className="w-10 h-10 rounded-full bg-brand-pink flex items-center justify-center text-white font-bold mr-3">
          K
        </div>
        <div className="text-left">
          <h3 className="font-semibold text-white">{title}</h3>
          <p className="text-sm text-gray-300">{subtitle}</p>
        </div>
      </div>

      {/* Close button */}
      {onClose && (
        <Button
          onClick={onClose}
          variant="ghost"
          size="icon"
          className="rounded-full h-8 w-8 hover:bg-white/10"
        >
          <X className="h-5 w-5 text-white" />
          <span className="sr-only">Close</span>
        </Button>
      )}
    </div>
  );
};
