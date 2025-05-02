
import React, { useEffect, useRef } from "react";
import { ChatMessage } from "@/components/chat/ChatMessage";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Message } from "@/hooks/useMessageSimulation";

interface ChatMessagesDisplayProps {
  messages: Message[];
}

export const ChatMessagesDisplay: React.FC<ChatMessagesDisplayProps> = ({ messages }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  // Effect for scrolling to bottom on new messages
  useEffect(() => {
    if (endOfMessagesRef.current) {
      endOfMessagesRef.current.scrollIntoView({ behavior: "smooth" });
    } else if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // Function to group messages by date
  const groupMessagesByDate = () => {
    const groups: { [key: string]: Message[] } = {};
    
    messages.forEach(message => {
      const date = new Date(message.timestamp);
      const dateKey = new Date(
        date.getFullYear(), 
        date.getMonth(), 
        date.getDate()
      ).toISOString();
      
      if (!groups[dateKey]) {
        groups[dateKey] = [];
      }
      
      groups[dateKey].push(message);
    });
    
    return groups;
  };

  // Format date for display
  const formatDate = (dateKey: string) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    const date = new Date(dateKey);
    
    if (date.toDateString() === today.toDateString()) return 'Today';
    if (date.toDateString() === yesterday.toDateString()) return 'Yesterday';
    
    return date.toLocaleDateString(undefined, { 
      weekday: 'long', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const messageGroups = groupMessagesByDate();

  return (
    <ScrollArea className="flex-1 p-4" ref={scrollRef as any}>
      <div className="space-y-6 pb-2">
        {Object.entries(messageGroups).map(([dateKey, msgs]) => (
          <div key={dateKey} className="space-y-4">
            <div className="flex justify-center">
              <div className="px-2.5 py-1 bg-black/20 rounded-full">
                <span className="text-xs text-gray-400">
                  {formatDate(dateKey)}
                </span>
              </div>
            </div>
            
            {msgs.map((message) => (
              <div key={message.id} className="animate-fade-in">
                <ChatMessage
                  message={{...message, isThinking: message.isThinking || false} as any}
                  isOwnMessage={message.senderId === "current-user"}
                  typingSpeed={message.isThinking ? 500 : 1}
                />
              </div>
            ))}
          </div>
        ))}
        
        {/* Invisible element to scroll to */}
        <div ref={endOfMessagesRef} />
      </div>
    </ScrollArea>
  );
};
