
import React, { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send, Paperclip, Smile } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface ChatAgentInputProps {
  onSendMessage: (message: string) => void;
  disabled: boolean;
  placeholder?: string;
}

export const ChatAgentInput: React.FC<ChatAgentInputProps> = ({ 
  onSendMessage, 
  disabled,
  placeholder = "Ask me anything..." 
}) => {
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-focus input when component mounts
  useEffect(() => {
    if (inputRef.current && !disabled) {
      inputRef.current.focus();
    }
  }, [disabled]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || disabled) return;
    
    onSendMessage(input);
    setInput("");
  };

  // Handle pressing Enter to submit
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as unknown as React.FormEvent);
    }
  };

  return (
    <div className="p-4 border-t border-white/10 bg-black/40">
      <form 
        className="flex gap-3" 
        onSubmit={handleSubmit}
      >
        <Input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="flex-1 bg-black/20 focus:ring-1 focus:ring-brand-pink/50"
          disabled={disabled}
          aria-label="Type your message"
        />
        
        {/* Feature: File attachment button (UI only for now) */}
        <Popover>
          <PopoverTrigger asChild>
            <Button 
              type="button"
              size="icon" 
              variant="ghost"
              className="shrink-0 p-2.5 hover:bg-black/20" 
              disabled={disabled}
              aria-label="Add attachment"
            >
              <Paperclip className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-72" align="end">
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Add an attachment</h4>
              <p className="text-xs text-gray-400">
                Coming soon: Send files, images, and documents
              </p>
            </div>
          </PopoverContent>
        </Popover>
        
        {/* Feature: Emoji picker (UI only for now) */}
        <Popover>
          <PopoverTrigger asChild>
            <Button 
              type="button"
              size="icon" 
              variant="ghost"
              className="shrink-0 p-2.5 hover:bg-black/20" 
              disabled={disabled}
              aria-label="Add emoji"
            >
              <Smile className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-72" align="end">
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Emojis</h4>
              <p className="text-xs text-gray-400">
                Coming soon: Add emojis and reactions
              </p>
            </div>
          </PopoverContent>
        </Popover>
        
        <Button 
          type="submit" 
          size="icon" 
          className="shrink-0 p-2.5" 
          disabled={!input.trim() || disabled}
          aria-label="Send message"
        >
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
};
