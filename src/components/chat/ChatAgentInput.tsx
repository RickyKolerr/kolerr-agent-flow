
import React, { useState, useRef, forwardRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Paperclip } from "lucide-react";
import { ChatToggle } from "@/components/chat/ChatToggle";

interface ChatAgentInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
  placeholder?: string;
  inputRef?: React.RefObject<HTMLInputElement>;
  chatType?: "kol_search" | "campaign_search" | "general";
  isSearchFocused?: boolean;
  onSearchModeChange?: (isSearchMode: boolean) => void;
}

export const ChatAgentInput: React.FC<ChatAgentInputProps> = ({
  onSendMessage,
  disabled = false,
  placeholder = "Type a message...",
  inputRef,
  chatType = "general",
  isSearchFocused = false,
  onSearchModeChange
}) => {
  const [message, setMessage] = useState("");
  const defaultInputRef = useRef<HTMLInputElement>(null);
  const actualInputRef = inputRef || defaultInputRef;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey && !disabled) {
      e.preventDefault();
      if (message.trim()) {
        onSendMessage(message.trim());
        setMessage("");
      }
    }
  };

  // Only show toggle for general chat type
  const showToggle = chatType === "general" && onSearchModeChange !== undefined;

  return (
    <div className="border-t border-white/10 p-4">
      <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
        {showToggle && (
          <div className="flex justify-center mb-2">
            <ChatToggle 
              isSearchMode={isSearchFocused} 
              onToggle={(isSearch) => onSearchModeChange?.(isSearch)} 
            />
          </div>
        )}
        <div className="flex space-x-2">
          <Button
            type="button"
            size="icon"
            variant="outline"
            className="shrink-0"
            disabled={disabled}
          >
            <Paperclip className="h-5 w-5" />
            <span className="sr-only">Attach file</span>
          </Button>
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className="flex-1 bg-background border-white/10 focus-visible:ring-brand-pink"
            disabled={disabled}
            ref={actualInputRef}
          />
          <Button
            type="submit"
            size="icon"
            className="shrink-0 bg-brand-pink hover:bg-brand-pink/90"
            disabled={disabled || !message.trim()}
          >
            <Send className="h-5 w-5" />
            <span className="sr-only">Send message</span>
          </Button>
        </div>
      </form>
    </div>
  );
};
