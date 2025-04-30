
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatHeader } from "./ChatHeader";
import { MessageInput } from "./MessageInput";
import { ChatMessage } from "./ChatMessage";
import { mockConversations, mockMessages } from "./mockChatData";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";

interface ChatWindowProps {
  onBackClick?: () => void;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({ onBackClick }) => {
  const { conversationId } = useParams<{ conversationId: string }>();
  const [messages, setMessages] = useState<any[]>([]);
  const [conversation, setConversation] = useState<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [shouldScrollToBottom, setShouldScrollToBottom] = useState(false);

  useEffect(() => {
    // Find the conversation
    if (conversationId) {
      const foundConversation = mockConversations.find(
        (c) => c.id === conversationId
      );
      setConversation(foundConversation);
      
      // Get messages for this conversation
      const conversationMessages = mockMessages.filter(
        (m) => m.conversationId === conversationId
      ).sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
      
      setMessages(conversationMessages);
      setShouldScrollToBottom(true);
    } else {
      setMessages([]);
      setConversation(null);
    }
  }, [conversationId]);

  useEffect(() => {
    if (messagesEndRef.current && shouldScrollToBottom) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
      setShouldScrollToBottom(false);
    }
  }, [shouldScrollToBottom, messages]);

  const handleSendMessage = (content: string, attachments?: any[]) => {
    if (!conversationId || !content.trim()) return;
    
    const newMessage = {
      id: `msg-${Date.now()}`,
      conversationId,
      senderId: "current-user",
      content,
      timestamp: new Date().toISOString(),
      status: "sent",
      attachments: attachments || [],
    };
    
    setMessages((prev) => [...prev, newMessage]);
    setShouldScrollToBottom(true);
    
    // Simulate reply after a delay
    setTimeout(() => {
      const otherParticipant = conversation?.participants.find(p => p.id !== "current-user");
      if (otherParticipant) {
        const replyMessage = {
          id: `msg-reply-${Date.now()}`,
          conversationId,
          senderId: otherParticipant.id,
          content: `Thanks for your message! This is an automated reply from ${otherParticipant.name}.`,
          timestamp: new Date().toISOString(),
          status: "sent",
          attachments: [],
        };
        setMessages((prev) => [...prev, replyMessage]);
        setShouldScrollToBottom(true);
      }
    }, 2000);
  };

  // Get the other participant for the header
  const otherParticipant = conversation?.participants.find(p => p.id !== "current-user");

  return (
    <div className="flex-1 flex flex-col h-full">
      {conversationId && conversation ? (
        <>
          <ChatHeader participant={otherParticipant} onBackClick={onBackClick} />
          <ScrollArea className="flex-1 p-4">
            {messages.length > 0 ? (
              <div className="space-y-4">
                {messages.map((message) => (
                  <ChatMessage
                    key={message.id}
                    message={message}
                    isOwnMessage={message.senderId === "current-user"}
                  />
                ))}
                <div ref={messagesEndRef} />
              </div>
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <div className="bg-black/20 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4">
                    <MessageSquare className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-medium">No messages yet</h3>
                  <p className="text-muted-foreground mt-1">
                    Send a message to start the conversation
                  </p>
                </div>
              </div>
            )}
          </ScrollArea>
          <MessageInput onSendMessage={handleSendMessage} />
        </>
      ) : (
        <div className="flex items-center justify-center h-full">
          <div className="text-center p-6">
            <div className="bg-black/20 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4">
              <MessageSquare className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-medium">Select a conversation</h3>
            <p className="text-muted-foreground mt-2 max-w-sm">
              Choose a conversation from the sidebar to start messaging
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
