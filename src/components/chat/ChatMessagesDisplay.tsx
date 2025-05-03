
import React, { useRef, useEffect } from "react";
import { Message } from "@/hooks/useMessageSimulation";
import { Avatar } from "@/components/ui/avatar";
import { User } from "lucide-react";
import { useCredits } from "@/contexts/CreditContext";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface ChatMessagesDisplayProps {
  messages: Message[];
  autoScroll?: boolean;
}

export const ChatMessagesDisplay: React.FC<ChatMessagesDisplayProps> = ({ 
  messages,
  autoScroll = false
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { checkMessageCredit, hasPremiumPlan } = useCredits();

  // Auto-scroll to bottom of messages only when autoScroll is true
  useEffect(() => {
    if (autoScroll && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, autoScroll]);

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
        
        // Only analyze user messages for credit estimation
        let creditInfo = null;
        if (!isBot && !hasPremiumPlan) {
          creditInfo = checkMessageCredit(message.content);
        }
        
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
            
            <div className="flex flex-col gap-1">
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
              
              {!isBot && creditInfo && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Badge 
                        variant={creditInfo.isKOLQuery ? "default" : "outline"} 
                        className={`self-end text-xs ${creditInfo.isKOLQuery ? "bg-brand-pink" : "text-muted-foreground"}`}
                      >
                        {creditInfo.isKOLQuery ? "KOL Query" : "General Query"} 
                        {" "} ({creditInfo.estimatedCost.toFixed(2)} credit{creditInfo.estimatedCost !== 1 ? "s" : ""})
                      </Badge>
                    </TooltipTrigger>
                    <TooltipContent side="bottom">
                      <div className="text-xs space-y-1">
                        <p>Confidence: {creditInfo.confidenceScore}%</p>
                        <p>Type: {creditInfo.isKOLQuery ? "KOL/Creator specific" : "General question"}</p>
                        <p>Cost: {creditInfo.estimatedCost.toFixed(2)} credit{creditInfo.estimatedCost !== 1 ? "s" : ""}</p>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
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
