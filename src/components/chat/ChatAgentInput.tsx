
import React from "react";
import { SendHorizontalIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ChatAgentInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
  placeholder?: string;
  inputRef?: React.RefObject<HTMLInputElement>;
}

export const ChatAgentInput: React.FC<ChatAgentInputProps> = ({
  onSendMessage,
  disabled = false,
  placeholder = "Type your message...",
  inputRef
}) => {
  const [message, setMessage] = React.useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message);
      setMessage("");
    }
  };

  return (
    <div className="border-t border-white/10 bg-black/40 p-4">
      <form onSubmit={handleSubmit} className="flex gap-2 items-center">
        <Input
          ref={inputRef}
          className="flex-1 bg-black/60 border-white/10 focus:ring-brand-pink focus:border-brand-pink"
          placeholder={placeholder}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={disabled}
        />
        <Button
          type="submit"
          size="icon"
          className="shrink-0 bg-brand-pink hover:bg-brand-pink/90"
          disabled={disabled || !message.trim()}
        >
          <SendHorizontalIcon className="h-4 w-4" />
          <span className="sr-only">Send message</span>
        </Button>
      </form>
    </div>
  );
};
