import React, { useEffect, useRef, useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { ChatAgentHeader } from "./ChatAgentHeader";
import { ChatMessagesDisplay } from "./ChatMessagesDisplay";
import { ChatAgentInput } from "./ChatAgentInput";
import { useMessageSimulation } from "@/hooks/useMessageSimulation";
import { useUserAccess } from "@/hooks/useUserAccess";
import { CreditCounter } from "@/components/CreditCounter";
import { useCredits } from "@/contexts/CreditContext";
import { Badge } from "@/components/ui/badge";
import { useRolePermissions } from "@/hooks/useRolePermissions";
import { useNavigate } from "react-router-dom";
import { Search, MessageCircle, Info } from "lucide-react";

interface AgentChatProps {
  title: string;
  subtitle: string;
  initialMessage: string;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  chatType?: "kol_search" | "campaign_search" | "general";
  isDashboard?: boolean;
}

export const AgentChat: React.FC<AgentChatProps> = ({ 
  title, 
  subtitle, 
  initialMessage,
  isOpen = false,
  onOpenChange,
  chatType = "general",
  isDashboard = false
}) => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { 
    messages, 
    sendButtonClicked, 
    handleSendMessage, 
    initializeWithWelcomeMessage 
  } = useMessageSimulation();
  
  // Get user access information to personalize chat experience
  const { user, isAuthenticated, isKOLSpecificQuery } = useUserAccess();
  const { freeCredits, hasPremiumPlan, generalQuestionsPerCredit } = useCredits();
  const { canPerform, getSearchResultLimit } = useRolePermissions();
  
  // Track if this chat is focused on search
  const [isSearchFocused, setIsSearchFocused] = useState(
    chatType === "kol_search" || chatType === "campaign_search"
  );
  
  // Keep track of results shown to limit for non-premium users
  const [resultsShown, setResultsShown] = useState(0);
  const resultLimit = getSearchResultLimit();

  // Set custom placeholder based on chat type and user role
  const getPlaceholderText = () => {
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

  // Add welcome message on mount and when chat opens
  useEffect(() => {
    if (isOpen) {
      initializeWithWelcomeMessage(initialMessage);
      
      // Focus input after a short delay to ensure the chat interface is visible
      const timer = setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 300);
      
      return () => clearTimeout(timer);
    }
  }, [initialMessage, isOpen, initializeWithWelcomeMessage]);

  // Update permission checks based on number of results shown and resets
  useEffect(() => {
    if (messages.length > 0) {
      const userMessages = messages.filter(msg => msg.senderId === "current-user");
      setResultsShown(userMessages.length);
    }
  }, [messages]);

  // Wrap the handleSendMessage to apply our business logic
  const handleMessageWithCredits = (input: string) => {
    // Check if this is a search query
    const isSearchQuery = isKOLSpecificQuery(input) || isSearchFocused;
    
    // Check if user has reached their result limit (only for non-premium)
    if (!hasPremiumPlan && resultsShown >= resultLimit) {
      // Redirect to upgrade if results limit reached
      navigate("/pricing");
      return;
    }
    
    // Check if user has permission to perform this action
    const permissionType = chatType === "kol_search" 
      ? "view_kol_profiles" 
      : chatType === "campaign_search" 
      ? "view_full_campaign_details" 
      : undefined;
    
    if (permissionType) {
      const permission = canPerform(permissionType);
      if (!permission.allowed) {
        // Handle unauthorized access attempt
        if (!isAuthenticated) {
          navigate("/login");
        } else if (permission.requiresUpgrade) {
          navigate("/pricing");
        }
        return;
      }
    }
    
    // If all checks pass, send the message
    handleSendMessage(input);
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
          {!isAuthenticated && (
            <div className="mt-2 pt-1 border-t border-brand-pink/20 text-xs">
              <span>Guest users limited to {resultLimit} basic results</span>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderChatContent = () => (
    <div className="flex flex-col h-full">
      <ChatAgentHeader 
        title={title} 
        subtitle={subtitle} 
        onClose={onOpenChange ? () => onOpenChange(false) : undefined}
      />
      
      {/* Credit info for non-premium users */}
      {!hasPremiumPlan && !isDashboard && renderCreditInfo()}
      
      {/* Fixed height for the chat messages area */}
      <div className="flex-1 overflow-hidden relative" style={{ minHeight: "350px" }}>
        <ChatMessagesDisplay messages={messages} />
      </div>
      
      <ChatAgentInput 
        onSendMessage={handleMessageWithCredits} 
        disabled={sendButtonClicked}
        placeholder={getPlaceholderText()}
        inputRef={inputRef}
        chatType={chatType}
        isSearchFocused={isSearchFocused}
      />
    </div>
  );

  // For mobile devices, use a Sheet component that slides in from bottom
  if (isMobile) {
    return (
      <Sheet open={isOpen} onOpenChange={onOpenChange}>
        <SheetContent side="bottom" className="h-[85vh] p-0 rounded-t-xl border-t border-white/10 bg-gradient-to-b from-black/90 to-black/80 backdrop-blur-xl">
          {renderChatContent()}
        </SheetContent>
      </Sheet>
    );
  }
  
  // For desktop, use Dialog component to create a modal-like experience
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px] h-[70vh] p-0 bg-gradient-to-br from-black/80 to-black/60 backdrop-blur-xl border border-white/10 shadow-lg rounded-2xl overflow-hidden">
        <DialogTitle className="sr-only">{title}</DialogTitle>
        {renderChatContent()}
      </DialogContent>
    </Dialog>
  );
};
