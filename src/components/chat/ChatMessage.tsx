
import React from "react";
import { Check } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { mockConversations } from "./mockChatData";
import { formatMessageTime } from "./utils";
import { ChatMessage as ChatMessageType } from "./types";
import { useTypingEffect } from "@/hooks/useTypingEffect";

interface ChatMessageProps {
  message: ChatMessageType & { isThinking?: boolean };
  isOwnMessage: boolean;
  typingSpeed?: number;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message, isOwnMessage, typingSpeed = 80 }) => {
  // Find sender in conversations
  const sender = mockConversations
    .flatMap((c) => c.participants)
    .find((p) => p.id === message.senderId);

  // Check if message comes from agent in the welcome message
  const isAgentMessage = message.senderId === "agent" || (!isOwnMessage && message.id === "welcome");
  
  // Use typing effect for agent greeting messages with consistent typing parameters
  const { displayedText, isComplete } = useTypingEffect({
    text: message.content,
    typingSpeed: message.isThinking ? 600 : typingSpeed,
    startDelay: message.isThinking ? 0 : 300,  // Reduced delay
    humanizedTyping: !message.isThinking,
    highlightText: "Kolerr", 
    highlightSpeed: 100,
  });

  const getStatusIcon = () => {
    switch (message.status) {
      case "sent":
        return <Check className="h-3 w-3 text-gray-400" />;
      case "delivered":
        return (
          <div className="flex">
            <Check className="h-3 w-3 text-gray-400" />
            <Check className="h-3 w-3 text-gray-400 -ml-1" />
          </div>
        );
      case "read":
        return (
          <div className="flex">
            <Check className="h-3 w-3 text-brand-pink" />
            <Check className="h-3 w-3 text-brand-pink -ml-1" />
          </div>
        );
      default:
        return null;
    }
  };

  // Modified thinking animation to be less intrusive
  const thinkingAnimation = message.isThinking ? "opacity-70" : "";

  return (
    <div
      className={`flex items-end gap-2 group ${
        isOwnMessage ? "flex-row-reverse" : ""
      }`}
    >
      {!isOwnMessage && (
        <Avatar className="h-8 w-8 flex-shrink-0">
          {isAgentMessage ? (
            <img src="/lovable-uploads/ff866eaa-8037-4015-a3f1-e8d5c10916b3.png" alt="Kolerr AI Agent" />
          ) : (
            <img src={sender?.avatar} alt={sender?.name} />
          )}
        </Avatar>
      )}

      <div className={`max-w-[75%] ${isOwnMessage ? "ml-auto" : "mr-auto"}`}>
        <div
          className={`rounded-xl p-3 ${
            isOwnMessage
              ? "bg-brand-pink text-white rounded-br-none shadow-sm"
              : "bg-black/30 border border-white/10 rounded-bl-none shadow-sm"
          } ${thinkingAnimation}`}
          style={{ transform: 'none' }} /* Force no transform to prevent movement */
        >
          {isAgentMessage ? (
            <div 
              className={`${!isComplete ? 'typing-cursor typing-active' : 'typing-complete'}`}
              dangerouslySetInnerHTML={{ 
                __html: displayedText
                  .replace(/👋/g, '<span style="display:inline-block;">👋</span>')
                  .replace(/Kolerr/g, '<span class="highlight-text">Kolerr</span>')
                  .replace(/TikTok/g, '<span class="highlight-text">TikTok</span>')
                  .replace(/Meta/g, '<span class="highlight-text">Meta</span>')
              }}
              style={{ transform: 'none' }} /* Force no transform to prevent movement */
            />
          ) : (
            message.content
          )}
          
          {message.attachments && message.attachments.length > 0 && (
            <div className="mt-2 space-y-2">
              {message.attachments.map((attachment, index) => (
                <div
                  key={`${message.id}-attachment-${index}`}
                  className="rounded-md overflow-hidden"
                >
                  {attachment.type === "image" ? (
                    <img
                      src={attachment.url}
                      alt={attachment.name}
                      className="max-w-full rounded"
                      loading="lazy"
                    />
                  ) : (
                    <div className="bg-black/20 p-2 rounded flex items-center gap-2">
                      <div className="bg-black/30 p-1 rounded">
                        {/* File icon would go here */}
                      </div>
                      <div className="overflow-hidden">
                        <p className="text-sm truncate">{attachment.name}</p>
                        <p className="text-xs text-gray-400">
                          {(attachment.size / 1024).toFixed(1)} KB
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div
          className={`text-xs text-gray-400 mt-0.5 flex items-center ${
            isOwnMessage ? "justify-end" : "justify-start"
          }`}
        >
          {formatMessageTime(message.timestamp)}
          {isOwnMessage && (
            <span className="ml-1">{getStatusIcon()}</span>
          )}
        </div>
      </div>
    </div>
  );
};
