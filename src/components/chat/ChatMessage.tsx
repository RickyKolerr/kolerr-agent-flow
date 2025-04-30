
import React, { useEffect, useState } from "react";
import { Check } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { mockConversations } from "./mockChatData";
import { formatMessageTime } from "./utils";
import { ChatMessage as ChatMessageType } from "./types";
import { useTypingEffect } from "@/hooks/useTypingEffect";

interface ChatMessageProps {
  message: ChatMessageType;
  isOwnMessage: boolean;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message, isOwnMessage }) => {
  // Find sender in conversations
  const sender = mockConversations
    .flatMap((c) => c.participants)
    .find((p) => p.id === message.senderId);

  // Check if message comes from chatbot in the initial greeting
  const isBotGreeting = !isOwnMessage && message.id === "welcome";
  
  // Use typing effect for bot greeting messages
  const { displayedText, isComplete } = useTypingEffect({
    text: message.content,
    typingSpeed: 40,  // Base typing speed (adjusted for human feel)
    startDelay: 500,  // Delay before typing starts
    humanizedTyping: true, // Enable humanized typing
    highlightText: "Kolerr", // Highlight brand name
    highlightSpeed: 120, // Slower for brand name
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
          {isBotGreeting ? (
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
