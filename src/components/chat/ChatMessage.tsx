
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

export const ChatMessage: React.FC<ChatMessageProps> = ({ message, isOwnMessage, typingSpeed = 55 }) => {
  // Find sender in conversations
  const sender = mockConversations
    .flatMap((c) => c.participants)
    .find((p) => p.id === message.senderId);

  // Check if message comes from agent in the welcome message
  const isAgentMessage = message.senderId === "agent" || (!isOwnMessage && message.id === "welcome");
  
  // Use typing effect for agent greeting messages with more human typing parameters
  const { displayedText, isComplete } = useTypingEffect({
    text: message.content,
    typingSpeed: message.isThinking ? 600 : typingSpeed,
    startDelay: message.isThinking ? 0 : 700,
    humanizedTyping: !message.isThinking,
    highlightText: "Kolerr", 
    highlightSpeed: 120,
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

  // Special styling for thinking message
  const thinkingAnimation = message.isThinking ? "animate-pulse" : "";

  return (
    <div
      className={`flex items-start gap-2 group mb-4 ${
        isOwnMessage ? "flex-row-reverse" : ""
      }`}
    >
      {!isOwnMessage && (
        <Avatar className="h-10 w-10 flex-shrink-0 mt-1">
          {isAgentMessage ? (
            <img src="/lovable-uploads/ff866eaa-8037-4015-a3f1-e8d5c10916b3.png" alt="Kolerr AI Agent" />
          ) : (
            <img 
              src={sender?.avatar || "/lovable-uploads/92eead47-3854-4a2d-a9ca-5b60716aaec4.png"} 
              alt={sender?.name} 
              className="object-cover"
            />
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
        >
          {isAgentMessage ? (
            <div 
              className={`${!isComplete ? 'typing-cursor typing-active' : 'typing-complete'}`}
              dangerouslySetInnerHTML={{ 
                __html: displayedText
                  .replace(/👋/g, '<span style="display:inline-block;transform:rotate(-20deg);">👋</span>')
                  .replace(/Kolerr/g, '<span class="highlight-text">Kolerr</span>')
                  .replace(/TikTok/g, '<span class="highlight-text">TikTok</span>')
                  .replace(/Meta/g, '<span class="highlight-text">Meta</span>')
              }}
            />
          ) : (
            <div className="whitespace-pre-wrap break-words">
              {message.content}
            </div>
          )}
          
          {/* URL Detection and Formatting */}
          {!isAgentMessage && message.content.includes('http') && (
            <div className="mt-1 text-blue-400 underline break-all">
              {Array.from(message.content.matchAll(/(https?:\/\/[^\s]+)/g)).map((match, index) => (
                <a 
                  key={index} 
                  href={match[0]} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300"
                >
                  {match[0]}
                </a>
              ))}
            </div>
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
      
      {isOwnMessage && (
        <Avatar className="h-10 w-10 flex-shrink-0 mt-1">
          <img 
            src={"/lovable-uploads/92eead47-3854-4a2d-a9ca-5b60716aaec4.png"} 
            alt="User" 
            className="object-cover"
          />
        </Avatar>
      )}
    </div>
  );
};
