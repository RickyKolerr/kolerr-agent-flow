
import { useState, useEffect } from "react";
import { useMessageSimulation } from "@/hooks/useMessageSimulation";
import { useRolePermissions } from "@/hooks/useRolePermissions";
import { useUserAccess } from "@/hooks/useUserAccess";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useChatPermissions } from "@/hooks/useChatPermissions";

export interface ChatAgentState {
  isSearchFocused: boolean;
  resultsShown: number;
}

export const useChatAgent = (
  initialMessage: string,
  chatType: "kol_search" | "campaign_search" | "general",
  isOpen: boolean,
  profileId?: string,
  profileType?: "kol" | "brand"
) => {
  const navigate = useNavigate();
  const { 
    messages, 
    sendButtonClicked, 
    handleSendMessage: handleSendRawMessage, 
    initializeWithWelcomeMessage 
  } = useMessageSimulation();
  
  // Get user access information to personalize chat experience
  const { user, isAuthenticated, isKOLSpecificQuery } = useUserAccess();
  const { canPerform, getSearchResultLimit } = useRolePermissions();
  const { canMessageProfile, trackMessageSent } = useChatPermissions();
  
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
      // Customize welcome message for profile chats
      let welcomeMsg = initialMessage;
      
      if (profileId && profileType && isAuthenticated) {
        if (profileType === "kol" && user?.role === "brand") {
          welcomeMsg = `You're now chatting with ${profileId}. Discuss collaboration opportunities and campaign details.`;
        } else if (profileType === "brand" && user?.role === "kol") {
          welcomeMsg = `You've connected with ${profileId}. Discuss potential opportunities and showcase your value.`;
        }
      }
      
      initializeWithWelcomeMessage(welcomeMsg);
    }
  }, [initialMessage, isOpen, initializeWithWelcomeMessage, profileId, profileType, isAuthenticated, user]);

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
  const handleSendMessage = (input: string) => {
    // Special handling for profile-specific chats
    if (profileId && profileType) {
      // Check if user has permission to message this profile
      const { canMessage, reason } = canMessageProfile(profileId, profileType);
      
      if (!canMessage) {
        if (!isAuthenticated) {
          toast.error("Please sign in to continue", {
            description: "Create an account to message this profile",
            action: {
              label: "Sign In",
              onClick: () => navigate("/login")
            }
          });
          return;
        }
        
        toast.error("Cannot send message", {
          description: reason || "You don't have permission to message this profile",
          action: {
            label: "Learn More",
            onClick: () => navigate("/pricing")
          }
        });
        return;
      }
      
      // Track this message in the permission system
      trackMessageSent(profileId, profileType);
      
      // Send the message
      handleSendRawMessage(input);
      return;
    }
    
    // From here, standard chat agent logic continues
    
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
    handleSendRawMessage(input);
  };

  return {
    messages,
    sendButtonClicked,
    handleSendMessage,
    isSearchFocused,
    handleSearchModeChange,
    resultsShown,
    resultLimit
  };
};
