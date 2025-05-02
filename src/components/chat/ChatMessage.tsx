
import React from "react";
import { useTypingEffect } from "@/hooks/useTypingEffect";
import { Badge } from "@/components/ui/badge";
import { Lock, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { Message } from "@/hooks/useMessageSimulation";

interface ChatMessageProps {
  message: Message;
  isLastMessage?: boolean;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message, isLastMessage }) => {
  const navigate = useNavigate();
  const isAgent = message.senderId === "agent";
  
  // Apply typing effect only to agent messages
  const { displayedText, isComplete } = isAgent
    ? useTypingEffect({
        text: message.content,
        typingSpeed: 30,
        startDelay: 300,
        humanizedTyping: true,
      })
    : { displayedText: message.content, isComplete: true };

  // Format the timestamp to be more readable
  const formattedTime = formatDistanceToNow(
    new Date(message.timestamp),
    { addSuffix: true, includeSeconds: true }
  );
  
  // Decide if we should show restricted content
  const showRestrictedContent = isAgent && !message.hasAccess && message.content;
  
  // Determine the message background color based on type and access
  const getMessageClasses = () => {
    let baseClasses = "p-4 rounded-lg max-w-[85%] whitespace-pre-wrap";
    
    if (isAgent) {
      if (showRestrictedContent) {
        return `${baseClasses} bg-black/30 border border-red-500/30 text-white/70`;
      }
      return `${baseClasses} bg-black/30 border border-white/10`;
    }
    
    return `${baseClasses} bg-brand-pink text-white`;
  };
  
  return (
    <div className={`flex gap-3 mb-4 ${isAgent ? "self-start" : "self-end justify-end"}`}>
      {isAgent && (
        <div className="w-8 h-8 rounded-full bg-brand-pink flex items-center justify-center flex-shrink-0 mt-1">
          <span className="text-white font-medium text-sm">AI</span>
        </div>
      )}
      
      <div className="flex flex-col">
        <div className={getMessageClasses()}>
          {showRestrictedContent ? (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Lock className="h-4 w-4 text-red-400" />
                <span className="font-medium">Access Restricted</span>
              </div>
              <p className="text-sm opacity-80">{message.content}</p>
              
              {message.requiresUpgrade && (
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="mt-2 w-full border-brand-pink/30 text-brand-pink"
                  onClick={() => navigate('/pricing')}
                >
                  <CreditCard className="mr-1 h-3 w-3" />
                  Upgrade to unlock
                </Button>
              )}
              
              {!message.requiresUpgrade && (
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="mt-2 w-full border-brand-pink/30 text-brand-pink"
                  onClick={() => navigate('/login')}
                >
                  <Lock className="mr-1 h-3 w-3" />
                  Login to access
                </Button>
              )}
            </div>
          ) : (
            <>
              {isAgent ? (
                <span className={`${!isComplete ? 'typing-cursor typing-active' : 'typing-complete'}`}>
                  {displayedText}
                </span>
              ) : (
                displayedText
              )}
            </>
          )}
  
          {message.isThinking && (
            <div className="typing-indicator">
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
            </div>
          )}
        </div>
        
        <div className="text-xs text-gray-400 mt-1 px-1 flex items-center justify-between">
          <span>{formattedTime}</span>
          
          {message.isKolSpecific && !isAgent && (
            <Badge variant="outline" className="text-[10px] py-0 h-4 bg-brand-pink/10 border-brand-pink/30 text-brand-pink">
              1 credit
            </Badge>
          )}
        </div>
      </div>
      
      {!isAgent && (
        <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center flex-shrink-0 mt-1">
          <span className="text-white font-medium text-sm">You</span>
        </div>
      )}
    </div>
  );
};
