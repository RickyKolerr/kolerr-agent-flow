
import React, { useEffect, useRef } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatMessage } from "./ChatMessage";
import type { Message } from "@/hooks/useMessageSimulation";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Lock, Info } from "lucide-react";
import { useRolePermissions } from "@/hooks/useRolePermissions";
import { useCredits } from "@/contexts/CreditContext";

interface ChatMessagesDisplayProps {
  messages: Message[];
}

export const ChatMessagesDisplay: React.FC<ChatMessagesDisplayProps> = ({ messages }) => {
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { getSearchResultLimit } = useRolePermissions();
  const { hasPremiumPlan } = useCredits();
  
  const resultLimit = getSearchResultLimit();
  const userMessages = messages.filter(m => m.senderId === "current-user");
  const isApproachingLimit = !hasPremiumPlan && userMessages.length >= (resultLimit - 2) && userMessages.length < resultLimit;
  const hasReachedLimit = !hasPremiumPlan && userMessages.length >= resultLimit;

  useEffect(() => {
    // Scroll to the bottom when messages change
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <ScrollArea className="h-full overflow-y-auto p-4" ref={scrollAreaRef}>
      {/* Show empty state if no messages */}
      {messages.length === 0 && (
        <div className="h-full flex items-center justify-center text-center p-4">
          <div className="max-w-sm">
            <h3 className="font-medium text-lg mb-2">No messages yet</h3>
            <p className="text-muted-foreground text-sm">
              Start the conversation by sending a message below.
            </p>
          </div>
        </div>
      )}
      
      {/* Display the message list */}
      <div className="flex flex-col">
        {messages.map((message, i) => (
          <ChatMessage 
            key={message.id} 
            message={message} 
            isLastMessage={i === messages.length - 1} 
          />
        ))}
        
        {/* Show warning when approaching search limit */}
        {isApproachingLimit && (
          <Alert className="mt-4 bg-yellow-500/10 border-yellow-500/30 text-yellow-400">
            <Info className="h-4 w-4" />
            <AlertTitle>Search limit approaching</AlertTitle>
            <AlertDescription>
              You have {resultLimit - userMessages.length} searches remaining. 
              Upgrade for unlimited searches.
            </AlertDescription>
          </Alert>
        )}
        
        {/* Show error when reached search limit */}
        {hasReachedLimit && (
          <Alert className="mt-4 bg-red-500/10 border-red-500/30 text-red-400">
            <Lock className="h-4 w-4" />
            <AlertTitle>Search limit reached</AlertTitle>
            <AlertDescription>
              You've used all {resultLimit} free searches. Upgrade for unlimited searches.
            </AlertDescription>
          </Alert>
        )}
        
        <div ref={messagesEndRef} />
      </div>
    </ScrollArea>
  );
};
