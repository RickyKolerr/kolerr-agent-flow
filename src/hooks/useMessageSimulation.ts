
import { useState } from "react";

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

  // Function to simulate response with typing effect
  const simulateResponse = (userMessageContent: string) => {
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
    
    // Generate a simple response based on the user message
    let responseContent = "I'm processing your request. This is a placeholder response that would be replaced with actual AI response in a production environment.";
    
    // After a short delay, replace the thinking message with the actual response
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
    }, 2000); // Show thinking indicator for 2 seconds
  };

  const handleSendMessage = (input: string) => {
    // Prevent multiple submissions by checking if button was already clicked
    if (sendButtonClicked) return;
    
    if (!input.trim()) return;
    
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
    }, 100); // Ultra-fast delivery simulation
    
    // Simulate agent response with faster timing
    setTimeout(() => {
      simulateResponse(input);
    }, 200); // Ultra-fast response time
  };

  const initializeWithWelcomeMessage = (initialMessage: string) => {
    if (messages.length === 0) {
      setMessages([
        {
          id: "welcome",
          senderId: "agent",
          content: initialMessage,
          timestamp: new Date().toISOString(),
          conversationId: "agent-chat",
        }
      ]);
    }
  };

  return {
    messages,
    setMessages,
    sendButtonClicked,
    handleSendMessage,
    initializeWithWelcomeMessage
  };
};
