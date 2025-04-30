
import React, { useState, useEffect } from "react";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import { ChatMessage } from "@/components/chat/ChatMessage";
import { useAuth } from "@/contexts/AuthContext";
import { ScrollArea } from "@/components/ui/scroll-area";

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
  inSidebar?: boolean;
}

export const AgentChat: React.FC<AgentChatProps> = ({ 
  title, 
  subtitle, 
  initialMessage,
  inSidebar = false 
}) => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  
  useEffect(() => {
    // Add welcome message on mount
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
  }, [initialMessage, messages.length]);

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
    }, 500);
    
    // Simulate agent response (in a real app, this would call an API)
    setTimeout(() => {
      const agentResponse = {
        id: `msg-${Date.now()}-agent`,
        senderId: "agent",
        content: "I'm processing your request. This is a placeholder response that would be replaced with actual AI response in a production environment.",
        timestamp: new Date().toISOString(),
        conversationId: "agent-chat",
      };
      
      setMessages(prev => [...prev, agentResponse]);
    }, 1500);
  };
  
  // Render the sidebar version directly
  if (inSidebar) {
    return (
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center px-4 py-3 border-b border-white/10">
          <Avatar className="h-8 w-8 mr-3">
            <img src="/lovable-uploads/ff866eaa-8037-4015-a3f1-e8d5c10916b3.png" alt="Kolerr AI Agent" />
          </Avatar>
          <div className="flex-1">
            <h3 className="font-semibold text-sm">{title}</h3>
            <p className="text-xs text-gray-400">{subtitle}</p>
          </div>
        </div>
        
        {/* Messages */}
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <ChatMessage
                key={message.id}
                message={message as any} // Use type assertion temporarily to fix build error
                isOwnMessage={message.senderId === "current-user"}
              />
            ))}
          </div>
        </ScrollArea>
        
        {/* Input */}
        <div className="p-3 border-t border-white/10">
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
              className="flex-1 bg-black/20 h-9 text-sm"
            />
            <Button type="submit" size="sm" className="shrink-0 h-9 w-9 p-0">
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </div>
    );
  }
  
  // Original floating version
  return (
    <div className="fixed right-6 bottom-6 z-50 flex flex-col bg-black/40 backdrop-blur-xl border border-white/10 shadow-lg rounded-2xl overflow-hidden transition-all duration-300 w-96 h-[600px] max-h-[80vh]">
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
      </div>
      
      {/* Messages */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              message={message as any} // Use type assertion temporarily to fix build error
              isOwnMessage={message.senderId === "current-user"}
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
};
