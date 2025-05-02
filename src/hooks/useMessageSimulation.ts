import { useState, useCallback } from "react";
import { useUserAccess } from "@/hooks/useUserAccess";
import { useRolePermissions } from "@/hooks/useRolePermissions";
import { useCredits } from "@/contexts/CreditContext";
import { toast } from "sonner";

export interface Message {
  id: string;
  senderId: string;
  content: string;
  timestamp: string;
  conversationId: string;
  status?: "sending" | "sent" | "delivered" | "read";
  isThinking?: boolean;
  isKolSpecific?: boolean;
  hasAccess?: boolean; // Indicates if user has access to this content
  requiresUpgrade?: boolean; // Indicates if upgrade is needed to view full content
}

export const useMessageSimulation = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [sendButtonClicked, setSendButtonClicked] = useState(false);
  const { isKOLSpecificQuery, user } = useUserAccess();
  const { canPerform, getSearchResultLimit } = useRolePermissions();
  const { useIntelligentCredit, hasPremiumPlan } = useCredits();
  const resultLimit = getSearchResultLimit();

  // Clear all messages
  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);

  // Function to simulate response with typing effect
  const simulateResponse = useCallback((userMessageContent: string) => {
    // First, add a thinking message
    const thinkingId = `thinking-${Date.now()}`;
    const thinkingMessage: Message = {
      id: thinkingId,
      senderId: "agent",
      content: "...",
      timestamp: new Date().toISOString(),
      conversationId: "agent-chat",
      isThinking: true,
    };
    
    setMessages(prev => [...prev, thinkingMessage]);
    
    // Check if this is a KOL-specific query
    const isKolQuery = isKOLSpecificQuery(userMessageContent);
    
    // Generate a response based on message content and user role
    let responseContent = "I'm processing your request. This is a placeholder response that would be replaced with actual AI response in a production environment.";
    let hasAccess = true;
    let requiresUpgrade = false;
    
    // Check permissions for KOL-specific queries
    if (isKolQuery) {
      const permission = canPerform("view_kol_profiles");
      hasAccess = permission.allowed;
      requiresUpgrade = permission.requiresUpgrade || false;
      
      // For KOL searches, check if we're over the limit for non-premium users
      const userMessages = messages.filter(msg => msg.senderId === "current-user").length;
      
      if (!hasPremiumPlan && userMessages >= resultLimit) {
        hasAccess = false;
        requiresUpgrade = true;
        responseContent = `You've reached the limit of ${resultLimit} search results as a ${user?.role || 'guest'} user. Please upgrade your plan to continue searching.`;
      }
    }
    
    // Personalized responses based on user role and query
    const lowerCaseMsg = userMessageContent.toLowerCase();
    
    if (user?.role === "kol") {
      if (lowerCaseMsg.includes("campaign")) {
        responseContent = "I can help you find campaigns that match your profile. Currently we have several opportunities in fashion and lifestyle categories.";
      } else if (lowerCaseMsg.includes("payment") || lowerCaseMsg.includes("fee")) {
        responseContent = "For KOLs, payments are processed within 14 days after campaign completion and verification. You can check your pending payments in the Rewards section.";
      }
    } else if (user?.role === "brand") {
      if (lowerCaseMsg.includes("kol") || lowerCaseMsg.includes("influencer")) {
        responseContent = "I can help you find the perfect influencers for your campaign based on your target audience, budget, and campaign goals.";
      } else if (lowerCaseMsg.includes("analytics")) {
        responseContent = "Our analytics dashboard provides real-time metrics on your campaign performance including reach, engagement rate, and ROI.";
      }
    }
    
    // Check if it's a query about the platform regardless of user type
    if (lowerCaseMsg.includes("how does") || lowerCaseMsg.includes("help")) {
      responseContent = "Kolerr connects brands with influencers (KOLs) for marketing campaigns. Brands can find, vet, and collaborate with influencers while KOLs can discover opportunities that match their audience and values.";
    }
    
    // If user doesn't have access, modify the response accordingly
    if (!hasAccess) {
      if (requiresUpgrade) {
        responseContent = "This feature requires a premium plan. Please upgrade to access detailed information and unlimited searches.";
      } else if (!user) {
        responseContent = "Please sign in to view full results and save your searches. Create an account to unlock all features.";
      } else {
        responseContent = "You don't have permission to access this information. Please contact support if you believe this is an error.";
      }
    }
    
    // Add thinking delay based on message complexity
    const thinkingTime = Math.max(1000, Math.min(userMessageContent.length * 20, 3000));
    
    // After a delay, replace the thinking message with the actual response
    setTimeout(() => {
      setMessages(prev => 
        prev.map(msg => 
          msg.id === thinkingId 
            ? {
                id: `msg-${Date.now()}-agent`,
                senderId: "agent",
                content: responseContent,
                timestamp: new Date().toISOString(),
                conversationId: "agent-chat",
                isThinking: false,
                isKolSpecific: isKolQuery,
                hasAccess,
                requiresUpgrade
              } 
            : msg
        )
      );
    }, thinkingTime);
  }, [user, isKOLSpecificQuery, canPerform, getSearchResultLimit, hasPremiumPlan, resultLimit, messages]);

  const handleSendMessage = useCallback((input: string) => {
    // Prevent multiple submissions by checking if button was already clicked
    if (sendButtonClicked || !input.trim()) return;
    
    // Set the button as clicked to prevent double submissions
    setSendButtonClicked(true);
    
    // Check if we can use a credit for this message
    if (!useIntelligentCredit(input)) {
      setSendButtonClicked(false);
      toast.error("You don't have enough credits for this action");
      return;
    }
    
    // Add user message
    const userMessage: Message = {
      id: `msg-${Date.now()}-user`,
      senderId: "current-user",
      content: input,
      timestamp: new Date().toISOString(),
      status: "sending" as const,
      conversationId: "agent-chat",
      isKolSpecific: isKOLSpecificQuery(input)
    };
    
    setMessages(prev => [...prev, userMessage]);
    
    // Reset button clicked state after a short delay
    setTimeout(() => {
      setSendButtonClicked(false);
    }, 500);
    
    // Simulate message delivery
    setTimeout(() => {
      setMessages(prev => 
        prev.map(msg => 
          msg.id === userMessage.id ? { ...msg, status: "delivered" } : msg
        )
      );
    }, 100);
    
    // Simulate agent response with faster timing
    setTimeout(() => {
      simulateResponse(input);
    }, 200);
  }, [sendButtonClicked, simulateResponse, useIntelligentCredit, isKOLSpecificQuery]);

  const initializeWithWelcomeMessage = useCallback((initialMessage: string) => {
    // Only add welcome message if no messages exist yet
    if (messages.length === 0) {
      // Personalize welcome message if we know the user role
      let welcomeMessage = initialMessage;
      
      if (user?.role === "kol") {
        welcomeMessage = `👋 Looking for paid opportunities? Let me help you find the right match!`;
      } else if (user?.role === "brand") {
        welcomeMessage = `👋 Need creators for your campaign? Tell me what you're looking for.`;
      }
      
      // We set it directly without any typing initially,
      // the typing effect will be handled by the ChatMessage component
      setMessages([
        {
          id: "welcome",
          senderId: "agent",
          content: welcomeMessage,
          timestamp: new Date().toISOString(),
          conversationId: "agent-chat",
          hasAccess: true
        }
      ]);
    }
  }, [messages.length, user]);

  return {
    messages,
    setMessages,
    sendButtonClicked,
    handleSendMessage,
    initializeWithWelcomeMessage,
    clearMessages,
  };
};
