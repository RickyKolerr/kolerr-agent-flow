
import React, { useRef } from "react";
import { ChatAgentHeader } from "./ChatAgentHeader";
import { ChatMessagesDisplay } from "./ChatMessagesDisplay";
import { ChatAgentInput } from "./ChatAgentInput";
import { ChatToggle } from "./ChatToggle";
import { Badge } from "@/components/ui/badge";
import { Search, MessageCircle, Info } from "lucide-react";
import { useCredits } from "@/contexts/CreditContext";

interface ChatAgentContentProps {
  title: string;
  subtitle: string;
  initialMessage: string;
  messages: any[]; 
  sendButtonClicked: boolean;
  handleSendMessage: (input: string) => void;
  chatType: "kol_search" | "campaign_search" | "general";
  isDashboard?: boolean;
  isSearchFocused: boolean;
  handleSearchModeChange: (isSearch: boolean) => void;
  resultsShown: number;
  resultLimit: number;
  isMobile: boolean;
  isOpen: boolean;
  onOpenChange?: (open: boolean) => void;
}

export const ChatAgentContent: React.FC<ChatAgentContentProps> = ({
  title,
  subtitle,
  handleSendMessage,
  messages,
  sendButtonClicked,
  chatType,
  isDashboard = false,
  isSearchFocused,
  handleSearchModeChange,
  resultsShown,
  resultLimit,
  isMobile,
  isOpen,
  onOpenChange,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { freeCredits, hasPremiumPlan, generalQuestionsPerCredit } = useCredits();

  // Set custom placeholder based on chat type and user role
  const getPlaceholderText = () => {
    const { isAuthenticated, user } = { isAuthenticated: false, user: { role: '' } }; // This would be replaced with actual useUserAccess hook
    
    if (!isAuthenticated) return "Sign in to save chat history...";
    
    if (chatType === "kol_search") {
      return "Ask about specific creators or campaigns...";
    }
    
    if (chatType === "campaign_search") {
      return "Search for campaigns that match your profile...";
    }
    
    // Default general chat
    if (user?.role === "kol") return "Ask about campaigns, opportunities...";
    if (user?.role === "brand") return "Ask about finding KOLs, campaigns...";
    return "Ask me anything...";
  };

  const renderCreditInfo = () => {
    if (hasPremiumPlan) return null;
    
    return (
      <div className="p-3 border-t border-white/10">
        <div className="rounded-md bg-brand-pink/10 p-2 border border-brand-pink/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Info className="h-3 w-3 text-brand-pink mr-2" />
              <span className="font-medium text-xs">Credit Usage</span>
            </div>
            <Badge variant="outline" className="text-brand-pink text-xs">
              {freeCredits} left
            </Badge>
          </div>
          <div className="mt-1 text-xs grid grid-cols-2 gap-1">
            <div className="flex items-center">
              <Search className="h-3 w-3 mr-1 text-brand-pink" />
              <span>KOL search: 1 credit</span>
            </div>
            <div className="flex items-center">
              <MessageCircle className="h-3 w-3 mr-1 text-brand-pink" />
              <span>General: {generalQuestionsPerCredit}:1</span>
            </div>
          </div>
          {!true && ( // isAuthenticated would be used here
            <div className="mt-2 pt-1 border-t border-brand-pink/20 text-xs">
              <span>Guest users limited to {resultLimit} basic results</span>
            </div>
          )}
        </div>
      </div>
    );
  };

  // Add a floating toggle button for mobile when chat is active
  const renderFloatingToggle = () => {
    if (isMobile && isOpen && chatType === "general") {
      return (
        <div className="absolute top-16 left-1/2 transform -translate-x-1/2 z-10">
          <ChatToggle 
            isSearchMode={isSearchFocused} 
            onToggle={handleSearchModeChange} 
            variant="pill"
            showLabels={false}
          />
        </div>
      );
    }
    return null;
  };

  return (
    <div className="flex flex-col h-full">
      <ChatAgentHeader 
        title={title} 
        subtitle={subtitle} 
        onClose={onOpenChange ? () => onOpenChange(false) : undefined}
      />
      
      {/* Credit info for non-premium users */}
      {!hasPremiumPlan && !isDashboard && renderCreditInfo()}
      
      {/* Floating toggle for mobile */}
      {renderFloatingToggle()}
      
      {/* Fixed height for the chat messages area */}
      <div className="flex-1 overflow-hidden relative" style={{ minHeight: "350px" }}>
        <ChatMessagesDisplay messages={messages} />
      </div>
      
      <ChatAgentInput 
        onSendMessage={handleSendMessage} 
        disabled={sendButtonClicked}
        placeholder={getPlaceholderText()}
        inputRef={inputRef}
        chatType={chatType}
        isSearchFocused={isSearchFocused}
        onSearchModeChange={handleSearchModeChange}
      />
    </div>
  );
};
