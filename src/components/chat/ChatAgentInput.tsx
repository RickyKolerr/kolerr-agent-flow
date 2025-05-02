
import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Lock, AlertTriangle } from "lucide-react";
import { useCredits } from "@/contexts/CreditContext";
import { useUserAccess } from "@/hooks/useUserAccess";
import { useRolePermissions } from "@/hooks/useRolePermissions";
import { useNavigate } from "react-router-dom";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip";

interface ChatAgentInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
  placeholder?: string;
  inputRef?: React.RefObject<HTMLInputElement>;
  chatType?: "kol_search" | "campaign_search" | "general";
  isSearchFocused?: boolean;
}

export const ChatAgentInput: React.FC<ChatAgentInputProps> = ({
  onSendMessage,
  disabled = false,
  placeholder = "Type a message...",
  inputRef,
  chatType = "general",
  isSearchFocused = false,
}) => {
  const [input, setInput] = useState("");
  const localInputRef = useRef<HTMLInputElement>(null);
  const { freeCredits, hasPremiumPlan } = useCredits();
  const { isAuthenticated } = useUserAccess();
  const navigate = useNavigate();
  const { canPerform } = useRolePermissions();
  
  // Determine if this input will require credits
  const inputRequiresCredits = chatType !== "general" || isSearchFocused;
  
  // Check permissions based on chat type
  const permissionType = chatType === "kol_search" 
    ? "view_kol_profiles" 
    : chatType === "campaign_search" 
    ? "view_full_campaign_details" 
    : undefined;
    
  const permission = permissionType 
    ? canPerform(permissionType) 
    : { allowed: true };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedInput = input.trim();
    if (trimmedInput && !disabled) {
      onSendMessage(trimmedInput);
      setInput("");
    }
  };

  const getStatusIndicator = () => {
    if (hasPremiumPlan) {
      return null; // Premium users have unlimited access
    }

    if (!isAuthenticated && inputRequiresCredits) {
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="text-xs text-muted-foreground flex items-center mr-2">
                <Lock className="h-3 w-3 mr-1" />
                <span>Login required</span>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Login required for full access</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    }

    if (freeCredits <= 0 && inputRequiresCredits) {
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="text-xs text-yellow-500 flex items-center mr-2">
                <AlertTriangle className="h-3 w-3 mr-1" />
                <span>No credits left</span>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>You've used all your free credits for today</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    }

    return null;
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="flex items-center border-t border-white/10 py-4 px-4">
        {getStatusIndicator()}
        
        <Input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={
            !permission.allowed && permission.reason 
              ? `${permission.reason}` 
              : placeholder
          }
          disabled={disabled || !permission.allowed}
          className="flex-1 bg-black/30 border-white/10"
          ref={inputRef || localInputRef}
        />
        <Button 
          type="submit" 
          size="icon" 
          variant="ghost"
          disabled={disabled || input.trim() === "" || !permission.allowed}
          className="ml-2"
        >
          <Send className="h-4 w-4" />
          <span className="sr-only">Send</span>
        </Button>
      </div>
      
      {!permission.allowed && permission.requiresUpgrade && (
        <div className="absolute inset-x-0 bottom-full mb-2 px-4">
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full text-xs bg-brand-pink/10 border-brand-pink/20 text-brand-pink"
            onClick={() => navigate("/pricing")}
          >
            Upgrade to unlock this feature
          </Button>
        </div>
      )}
      
      {!isAuthenticated && inputRequiresCredits && (
        <div className="absolute inset-x-0 bottom-full mb-2 px-4">
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full text-xs bg-brand-pink/10 border-brand-pink/20 text-brand-pink"
            onClick={() => navigate("/login")}
          >
            Login to access full features
          </Button>
        </div>
      )}
    </form>
  );
};
