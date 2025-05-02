
import React from "react";
import { useCredits } from "@/contexts/CreditContext";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { ChatAgentContent } from "./ChatAgentContent";
import { ChatAgentWrapper } from "./ChatAgentWrapper";
import { useChatAgent } from "./useChatAgent";

interface AgentChatProps {
  title: string;
  subtitle: string;
  initialMessage: string;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  chatType?: "kol_search" | "campaign_search" | "general";
  isDashboard?: boolean;
  profileId?: string;
  profileType?: "kol" | "brand";
}

export const AgentChat: React.FC<AgentChatProps> = ({ 
  title, 
  subtitle, 
  initialMessage,
  isOpen = false,
  onOpenChange,
  chatType = "general",
  isDashboard = false,
  profileId,
  profileType
}) => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const { hasPremiumPlan, generalQuestionsPerCredit } = useCredits();
  
  // Use our custom hook for chat functionality
  const {
    messages,
    sendButtonClicked,
    handleSendMessage,
    isSearchFocused,
    handleSearchModeChange,
    resultsShown,
    resultLimit
  } = useChatAgent(initialMessage, chatType, isOpen, profileId, profileType);
  
  return (
    <ChatAgentWrapper 
      title={title} 
      isOpen={isOpen} 
      onOpenChange={onOpenChange}
    >
      <ChatAgentContent
        title={title}
        subtitle={subtitle}
        initialMessage={initialMessage}
        messages={messages}
        sendButtonClicked={sendButtonClicked}
        handleSendMessage={handleSendMessage}
        chatType={chatType}
        isDashboard={isDashboard}
        isSearchFocused={isSearchFocused}
        handleSearchModeChange={handleSearchModeChange}
        resultsShown={resultsShown}
        resultLimit={resultLimit}
        isMobile={isMobile}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        profileId={profileId}
        profileType={profileType}
      />
    </ChatAgentWrapper>
  );
};
