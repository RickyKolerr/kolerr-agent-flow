
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessagesSquare } from "lucide-react";
import { AgentChat } from "./AgentChat";
import { CreditBadge } from "@/components/CreditBadge";
import { useCredits } from "@/contexts/CreditContext";

interface FloatingChatButtonProps {
  initialMessage?: string;
  chatType?: "kol_search" | "campaign_search" | "general";
}

export const FloatingChatButton: React.FC<FloatingChatButtonProps> = ({ 
  initialMessage = "👋 Hello! How can I assist you today?",
  chatType = "general" 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { hasPremiumPlan } = useCredits();
  
  // Determine title and subtitle based on chat type
  const getTitle = () => {
    switch (chatType) {
      case "kol_search":
        return "KOL Discovery Agent";
      case "campaign_search":
        return "Campaign Search Agent";
      default:
        return "AI Assistant";
    }
  };
  
  const getSubtitle = () => {
    switch (chatType) {
      case "kol_search":
        return "Find the perfect creator for your brand";
      case "campaign_search":
        return "Discover campaign opportunities";
      default:
        return "Ask me anything about Kolerr";
    }
  };

  return (
    <>
      <div className="fixed bottom-4 right-4 z-50 flex items-center">
        {!hasPremiumPlan && (
          <div className="mr-2">
            <CreditBadge variant="compact" />
          </div>
        )}
      
        <Button
          onClick={() => setIsOpen(true)}
          className="rounded-full h-14 w-14 bg-brand-pink hover:bg-brand-pink/90 shadow-lg"
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
