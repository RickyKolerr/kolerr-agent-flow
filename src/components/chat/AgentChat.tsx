
import React, { useState, useEffect, useRef } from "react";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, X } from "lucide-react";
import { ChatMessage } from "@/components/chat/ChatMessage";
import { useAuth } from "@/contexts/AuthContext";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useMediaQuery } from "@/hooks/useMediaQuery";

// Updated interface to align with the ChatMessage type from types.ts
interface Message {
  id: string;
  senderId: string;
  content: string;
  timestamp: string;
  conversationId: string; // Required for ChatMessage component
  status?: "sending" | "sent" | "delivered" | "read";
  isThinking?: boolean; // Added isThinking property
}

interface AgentChatProps {
  title: string;
  subtitle: string;
  initialMessage: string;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export const AgentChat: React.FC<AgentChatProps> = ({ 
  title, 
  subtitle, 
  initialMessage,
  isOpen = false,
  onOpenChange
}) => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const isMobile = useMediaQuery("(max-width: 768px)");
  const scrollRef = useRef<HTMLDivElement>(null);
  const [sendButtonClicked, setSendButtonClicked] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

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
  
  useEffect(() => {
    // Add welcome message on mount and when chat opens
    if (isOpen && messages.length === 0) {
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
  }, [initialMessage, messages.length, isOpen]);

  useEffect(() => {
    // Scroll to bottom when new messages are added
    if (scrollRef.current) {
      requestAnimationFrame(() => {
        if (scrollRef.current) {
          scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
      });
    }
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  const handleSendMessage = () => {
    // Prevent multiple submissions by checking if button was already clicked
    if (sendButtonClicked) return;
    
    if (!input.trim()) return;
    
    // Set the button as clicked to prevent double submissions
    setSendButtonClicked(true);
    
    // Add user message
    const userMessage = {
      id: `msg-${Date.now()}-user`,
      senderId: "current-user",
      content: input,
      timestamp: new Date().toISOString(),
      status: "sending" as const,
      conversationId: "agent-chat",
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    
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

  const renderChatContent = () => (
    <div className="flex flex-col h-full">
      {/* Header - Simplified with better contrast and spacing */}
      <div className="flex items-center px-4 py-3 border-b border-white/10 bg-black/40">
        <Avatar className="h-10 w-10 mr-3">
          <img src="/lovable-uploads/ff866eaa-8037-4015-a3f1-e8d5c10916b3.png" alt="Kolerr AI Agent" />
        </Avatar>
        <div className="flex-1">
          <h3 className="font-semibold text-base">{title}</h3>
          <p className="text-xs text-gray-400">
            {subtitle}
          </p>
        </div>
        {onOpenChange && (
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => onOpenChange(false)} 
            className="ml-auto"
            aria-label="Close chat"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
      
      {/* Messages - Improved scrolling and spacing */}
      <ScrollArea className="flex-1 p-4" ref={scrollRef as any}>
        <div className="space-y-4 pb-2">
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              message={{...message, isThinking: message.isThinking || false} as any}
              isOwnMessage={message.senderId === "current-user"}
              typingSpeed={80} // Consistent typing speed
            />
          ))}
        </div>
      </ScrollArea>
      
      {/* Input - Improved accessibility and visual feedback */}
      <div className="p-4 border-t border-white/10 bg-black/40">
        <form 
          className="flex gap-3" 
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
        >
          <Input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me anything..."
            className="flex-1 bg-black/20 focus:ring-1 focus:ring-brand-pink/50"
            disabled={sendButtonClicked}
            aria-label="Type your message"
          />
          <Button 
            type="submit" 
            size="icon" 
            className="shrink-0 p-2.5" 
            disabled={!input.trim() || sendButtonClicked}
            aria-label="Send message"
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );

  // For mobile devices, use a Sheet component that slides in from bottom
  if (isMobile) {
    return (
      <Sheet open={isOpen} onOpenChange={onOpenChange}>
        <SheetContent side="bottom" className="h-[80vh] p-0 rounded-t-xl border-t border-white/10 bg-gradient-to-b from-black/90 to-black/70 backdrop-blur-xl">
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
