import { useState, useEffect } from "react";
import { useMessageSimulation } from "@/hooks/useMessageSimulation";
import { useRolePermissions } from "@/hooks/useRolePermissions";
import { useUserAccess } from "@/hooks/useUserAccess";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export interface ChatAgentState {
  isSearchFocused: boolean;
  resultsShown: number;
}

export const useChatAgent = (
  initialMessage: string,
  chatType: "kol_search" | "campaign_search" | "general",
  isOpen: boolean
) => {
  const navigate = useNavigate();
  const { 
    messages, 
    sendButtonClicked, 
    handleSendMessage, 
    initializeWithWelcomeMessage 
  } = useMessageSimulation();
  
  // Get user access information to personalize chat experience
  const { user, isAuthenticated, isKOLSpecificQuery } = useUserAccess();
  const { canPerform, getSearchResultLimit } = useRolePermissions();
  
  // Track if this chat is focused on search
  const [isSearchFocused, setIsSearchFocused] = useState(
    chatType === "kol_search" || chatType === "campaign_search"
  );
  
  // Keep track of results shown to limit for non-premium users
  const [resultsShown, setResultsShown] = useState(0);
  const resultLimit = getSearchResultLimit();

  // Add welcome message on mount and when chat opens
  useEffect(() => {
    if (isOpen) {
      initializeWithWelcomeMessage(initialMessage);
    }
  }, [initialMessage, isOpen, initializeWithWelcomeMessage]);

  // Update permission checks based on number of results shown and resets
  useEffect(() => {
    if (messages.length > 0) {
      const userMessages = messages.filter(msg => msg.senderId === "current-user");
      setResultsShown(userMessages.length);
    }
  }, [messages]);

  // Handler for toggling search mode
  const handleSearchModeChange = (isSearch: boolean) => {
    if (isSearch !== isSearchFocused) {
      setIsSearchFocused(isSearch);
      
      // Notify user about the mode change
      toast.info(
        isSearch ? "Switched to Search Mode" : "Switched to Normal Mode", 
        { 
          description: isSearch 
            ? "Each search uses 1 credit. Use this for finding specific KOLs or campaigns." 
            : `Normal chat uses 1 credit for every 3 questions.`
        }
      );
    }
  };

  // Wrap the handleSendMessage to apply our business logic
  const handleMessageWithCredits = (input: string) => {
    // Force search mode if this is a search query
    const detectSearchQuery = isKOLSpecificQuery(input);
    if (detectSearchQuery && !isSearchFocused) {
      setIsSearchFocused(true);
      toast.info("Automatically switched to Search Mode", {
        description: "Your question seems to be a search. Each search uses 1 credit."
      });
    }
    
    // Check if user has reached their result limit (only for non-premium)
    const { hasPremiumPlan } = { hasPremiumPlan: false }; // This would be replaced with actual useCredits hook
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

  return {
    messages,
    sendButtonClicked,
    handleSendMessage: handleMessageWithCredits,
    isSearchFocused,
    handleSearchModeChange,
    resultsShown,
    resultLimit
  };
};
