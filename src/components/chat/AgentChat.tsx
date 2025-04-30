
import React, { useState, useEffect, useRef } from "react";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import { ChatMessage } from "@/components/chat/ChatMessage";
import { useAuth } from "@/contexts/AuthContext";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useTypingEffect } from "@/hooks/useTypingEffect";
import { X } from "lucide-react";
import { useMediaQuery } from "@/hooks/useMediaQuery";

// Updated interface to align with the ChatMessage type from types.ts
interface Message {
  id: string;
  senderId: string;
  content: string;
  timestamp: string;
  conversationId: string; // Required for ChatMessage component
  status?: "sending" | "sent" | "delivered" | "read";
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

  // Function to simulate response with typing effect
  const simulateResponse = (userMessageContent: string) => {
    // Generate a simple response based on the user message
    let responseContent = "I'm processing your request. This is a placeholder response that would be replaced with actual AI response in a production environment.";
    
    // Add agent response with faster typing (will be optimized with useTypingEffect)
    const agentResponse = {
      id: `msg-${Date.now()}-agent`,
      senderId: "agent",
      content: responseContent,
      timestamp: new Date().toISOString(),
      conversationId: "agent-chat",
    };
    
    setMessages(prev => [...prev, agentResponse]);
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
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (!input.trim()) return;
    
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
    
    // Simulate message delivery
    setTimeout(() => {
      setMessages(prev => 
        prev.map(msg => 
          msg.id === userMessage.id ? { ...msg, status: "delivered" } : msg
        )
      );
    }, 300); // Faster delivery simulation
    
    // Simulate agent response with faster timing
    setTimeout(() => {
      simulateResponse(input);
    }, 700); // Faster response time
  };

  const renderChatContent = () => (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center px-4 py-3 border-b border-white/10">
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
          <Button variant="ghost" size="icon" onClick={() => onOpenChange(false)} className="ml-auto">
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
      
      {/* Messages */}
      <ScrollArea className="flex-1 p-4" ref={scrollRef as any}>
        <div className="space-y-4">
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              message={message as any}
              isOwnMessage={message.senderId === "current-user"}
              // Use a faster typing effect for agent messages
              typingSpeed={10} // Much faster typing speed
            />
          ))}
        </div>
      </ScrollArea>
      
      {/* Input */}
      <div className="p-4 border-t border-white/10">
        <form 
          className="flex gap-2" 
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
        >
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me anything..."
            className="flex-1 bg-black/20"
          />
          <Button type="submit" size="icon" className="shrink-0">
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
        <SheetContent side="bottom" className="h-[80vh] p-0">
          {renderChatContent()}
        </SheetContent>
      </Sheet>
    );
  }
  
  // For desktop, use Dialog component to create a modal-like experience
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] h-[80vh] p-0 bg-black/40 backdrop-blur-xl border border-white/10 shadow-lg rounded-2xl overflow-hidden">
        {renderChatContent()}
      </DialogContent>
    </Dialog>
  );
};
