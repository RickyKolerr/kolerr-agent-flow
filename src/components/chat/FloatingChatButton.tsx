
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessagesSquare } from "lucide-react";
import { AgentChat } from "./AgentChat";
import { CreditBadge } from "@/components/CreditBadge";
import { useCredits } from "@/contexts/CreditContext";
import { ChatToggle } from "./ChatToggle";

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
  const { hasPremiumPlan } = useCredits();
  
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
          ? "Search for specific KOLs or campaigns (1 credit per search)"
          : "Ask me anything about Kolerr (1 credit per 3 questions)";
    }
  };

  return (
    <>
      <div className="fixed bottom-4 right-4 z-50 flex items-center space-x-3">
        {!hasPremiumPlan && chatType === "general" && (
          <div className="bg-black/40 backdrop-blur-md rounded-full px-3 py-1 border border-white/10 shadow-lg">
            <ChatToggle
              isSearchMode={isSearchMode}
              onToggle={setIsSearchMode}
              variant="pill"
            />
          </div>
        )}
      
        <Button
          onClick={() => setIsOpen(true)}
          className={`rounded-full h-14 w-14 shadow-lg ${
            isSearchMode ? "bg-brand-pink hover:bg-brand-pink/90" : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          <MessagesSquare className="h-6 w-6" />
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
