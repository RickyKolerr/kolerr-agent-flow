
import { useState, useCallback } from "react";
import { useUserAccess } from "@/hooks/useUserAccess";

export interface Message {
  id: string;
  senderId: string;
  content: string;
  timestamp: string;
  conversationId: string;
  status?: "sending" | "sent" | "delivered" | "read";
  isThinking?: boolean;
}

export const useMessageSimulation = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [sendButtonClicked, setSendButtonClicked] = useState(false);
  const { isKOLSpecificQuery, user } = useUserAccess();

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
    
    // Generate a response based on message content and user role
    let responseContent = "I'm processing your request. This is a placeholder response that would be replaced with actual AI response in a production environment.";
    
    // Check if message contains certain keywords to personalize response
    const lowerCaseMsg = userMessageContent.toLowerCase();
    
    // Personalized responses based on user role and query
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
                isThinking: false
              } 
            : msg
        )
      );
    }, thinkingTime);
  }, [user?.role]);

  const handleSendMessage = useCallback((input: string) => {
    // Prevent multiple submissions by checking if button was already clicked
    if (sendButtonClicked || !input.trim()) return;
    
    // Set the button as clicked to prevent double submissions
    setSendButtonClicked(true);
    
    // Add user message
    const userMessage: Message = {
      id: `msg-${Date.now()}-user`,
      senderId: "current-user",
      content: input,
      timestamp: new Date().toISOString(),
      status: "sending" as const,
      conversationId: "agent-chat",
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
  }, [sendButtonClicked, simulateResponse]);

  const initializeWithWelcomeMessage = useCallback((initialMessage: string) => {
    // Only add welcome message if no messages exist yet
    if (messages.length === 0) {
      // Personalize welcome message if we know the user role
      let welcomeMessage = initialMessage;
      
      if (user?.role === "kol") {
        welcomeMessage = `Welcome back ${user.name || 'creator'}! How can I help with your campaigns or creator opportunities today?`;
      } else if (user?.role === "brand") {
        welcomeMessage = `Welcome back ${user.name || 'brand partner'}! Need help finding the perfect KOLs for your campaign?`;
      }
      
      setMessages([
        {
          id: "welcome",
          senderId: "agent",
          content: welcomeMessage,
          timestamp: new Date().toISOString(),
          conversationId: "agent-chat",
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
