
import React from "react";
import { Check } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { mockConversations } from "./mockChatData";
import { formatMessageTime } from "./utils";
import { ChatMessage as ChatMessageType } from "./types";
import { useTypingEffect } from "@/hooks/useTypingEffect";

interface ChatMessageProps {
  message: ChatMessageType;
  isOwnMessage: boolean;
  animateTyping?: boolean;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ 
  message, 
  isOwnMessage, 
  animateTyping = false 
}) => {
  // Find sender in conversations
  const sender = mockConversations
    .flatMap((c) => c.participants)
    .find((p) => p.id === message.senderId);

  // Use typing effect for bot messages when animateTyping is true
  const { displayedText, isComplete } = useTypingEffect({
    text: message.content,
    typingSpeed: 40,  // Faster base typing speed
    startDelay: 300,
    // Highlight important phrases with slower typing
    highlightText: isOwnMessage ? "" : "Kolerr",
    highlightSpeed: 150,  // Slower speed for brand name and important terms
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

  // Only use the animation for non-user messages when animateTyping is true
  const content = animateTyping && !isOwnMessage ? displayedText : message.content;

  return (
    <div
      className={`flex items-end gap-2 group ${
        isOwnMessage ? "flex-row-reverse" : ""
      }`}
    >
      {!isOwnMessage && (
        <Avatar className="h-8 w-8">
          <img src={sender?.avatar} alt={sender?.name} />
        </Avatar>
      )}

      <div className="max-w-[70%]">
        <div
          className={`rounded-xl p-3 ${
            isOwnMessage
              ? "bg-brand-pink text-white rounded-br-none"
              : "bg-black/30 border border-white/10 rounded-bl-none"
          }`}
        >
          {content}
          
          {!isComplete && !isOwnMessage && animateTyping && (
            <span className="typing-cursor"></span>
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
          className={`text-xs text-gray-400 mt-1 flex items-center ${
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
