
import React, { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

interface ChatAgentInputProps {
  onSendMessage: (message: string) => void;
  disabled: boolean;
}

export const ChatAgentInput: React.FC<ChatAgentInputProps> = ({ 
  onSendMessage, 
  disabled 
}) => {
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || disabled) return;
    
    onSendMessage(input);
    setInput("");
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
          placeholder="Ask me anything..."
          className="flex-1 bg-black/20 focus:ring-1 focus:ring-brand-pink/50"
          disabled={disabled}
          aria-label="Type your message"
        />
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
