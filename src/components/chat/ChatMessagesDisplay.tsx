
import React, { useRef, useEffect } from "react";
import { Message } from "@/hooks/useMessageSimulation";
import { Avatar } from "@/components/ui/avatar";
import { User } from "lucide-react";

interface ChatMessagesDisplayProps {
  messages: Message[];
}

export const ChatMessagesDisplay: React.FC<ChatMessagesDisplayProps> = ({ 
  messages 
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of messages when new messages arrive
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (messages.length === 0) {
    return (
      <div className="flex h-full items-center justify-center text-center p-4">
        <p className="text-muted-foreground">No messages yet. Start a conversation!</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col p-4 gap-4 h-full overflow-y-auto">
      {messages.map((message, index) => {
        const isBot = message.senderId === "agent";
        
        return (
          <div 
            key={message.id || index} 
            className={`flex ${isBot ? "justify-start" : "justify-end"} items-start gap-2`}
          >
            {isBot && (
              <Avatar className="h-8 w-8 mr-1">
                <img src="/lovable-uploads/ff866eaa-8037-4015-a3f1-e8d5c10916b3.png" alt="AI Assistant" />
              </Avatar>
            )}
            
            <div 
              className={`rounded-lg px-4 py-3 max-w-[80%] 
                ${isBot 
                  ? "bg-secondary text-secondary-foreground" 
                  : "bg-primary text-primary-foreground ml-auto"
                }
                ${message.isThinking ? "animate-pulse" : ""}
              `}
            >
              {message.content}
              {message.isThinking && <span className="inline-block ml-1">...</span>}
            </div>
            
            {!isBot && (
              <Avatar className="h-8 w-8 ml-1">
                <User className="h-4 w-4" />
              </Avatar>
            )}
          </div>
        );
      })}
      <div ref={messagesEndRef} />
    </div>
  );
};
