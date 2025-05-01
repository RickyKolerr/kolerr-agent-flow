
import React, { useEffect, useRef } from "react";
import { ChatMessage } from "@/components/chat/ChatMessage";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Message } from "@/hooks/useMessageSimulation";

interface ChatMessagesDisplayProps {
  messages: Message[];
}

export const ChatMessagesDisplay: React.FC<ChatMessagesDisplayProps> = ({ messages }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to bottom when new messages are added
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <ScrollArea className="flex-1 p-4" ref={scrollRef as any}>
      <div className="space-y-4 pb-2">
        {messages.map((message) => (
          <ChatMessage
            key={message.id}
            message={{...message, isThinking: message.isThinking || false} as any}
            isOwnMessage={message.senderId === "current-user"}
            typingSpeed={message.isThinking ? 500 : 1} // Slower typing for thinking animation, ultra-fast for normal messages
          />
        ))}
      </div>
    </ScrollArea>
  );
};
