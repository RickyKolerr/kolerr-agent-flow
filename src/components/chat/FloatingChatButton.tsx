
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { MessagesSquare } from "lucide-react";
import { AgentChat } from "./AgentChat";
import { CreditBadge } from "@/components/CreditBadge";
import { useCredits } from "@/contexts/CreditContext";
import { ChatToggle } from "./ChatToggle";
import { toast } from "sonner";

interface FloatingChatButtonProps {
  initialMessage?: string;
  chatType?: "kol_search" | "campaign_search" | "general";
}

export const FloatingChatButton: React.FC<FloatingChatButtonProps> = ({ 
  initialMessage = "👋 Hello! How can I assist you today?",
  chatType = "general" 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchMode, setIsSearchMode] = useState(false);
  const [isPulsing, setIsPulsing] = useState(false);
  const { hasPremiumPlan } = useCredits();
  
  // Add pulsing effect after a few seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPulsing(true);
      // Stop pulsing after 3 pulses
      setTimeout(() => setIsPulsing(false), 3000);
    }, 5000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Determine title and subtitle based on chat type and search mode
  const getTitle = () => {
    switch (chatType) {
      case "kol_search":
        return "KOL Discovery Agent";
      case "campaign_search":
        return "Campaign Search Agent";
      default:
        return isSearchMode ? "Search Assistant" : "AI Assistant";
    }
  };
  
  const getSubtitle = () => {
    switch (chatType) {
      case "kol_search":
        return "Find the perfect creator for your brand";
      case "campaign_search":
        return "Discover campaign opportunities";
      default:
        return isSearchMode 
          ? "Search for specific KOLs or campaigns (uses more credits)"
          : "Ask me anything about Kolerr (uses fewer credits)";
    }
  };

  return (
    <>
      <div className="fixed bottom-4 right-4 z-50 flex items-center space-x-3">
        {chatType === "general" && (
          <div 
            className={`bg-black/60 backdrop-blur-xl rounded-full px-3 py-1 border border-white/20 shadow-lg transition-all duration-300 ${
              isOpen ? 'opacity-0 translate-x-10' : 'opacity-100 translate-x-0'
            }`}
          >
            <ChatToggle
              isSearchMode={isSearchMode}
              onToggle={setIsSearchMode}
              variant="pill"
            />
          </div>
        )}
      
        <Button
          onClick={() => setIsOpen(true)}
          className={`rounded-full h-14 w-14 shadow-lg transition-all duration-500 ${
            isSearchMode ? "bg-brand-pink hover:bg-brand-pink/90" : "bg-blue-500 hover:bg-blue-600"
          } ${isPulsing ? 'animate-pulse shadow-[0_0_15px_rgba(244,114,182,0.5)]' : ''} hover:scale-110`}
        >
          <div className="relative">
            <MessagesSquare className="h-6 w-6" />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-white/90"></span>
            </span>
          </div>
          <span className="sr-only">Chat with AI Assistant</span>
        </Button>
      </div>

      <AgentChat
        title={getTitle()}
        subtitle={getSubtitle()}
        initialMessage={initialMessage}
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        chatType={chatType}
      />
    </>
  );
};
