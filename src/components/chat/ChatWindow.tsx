
import React, { useState, useRef, useEffect } from "react";
import { ChatHeader } from "./ChatHeader";
import { MessageInput } from "./MessageInput";
import { ChatMessage as ChatMessageComponent } from "./ChatMessage";
import { ScrollArea } from "@/components/ui/scroll-area";
import { mockConversations, mockMessages } from "./mockChatData";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext"; 
import { ChatMessage } from "./types";

interface ChatWindowProps {
  onBackClick?: () => void;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({ onBackClick }) => {
  const { conversationId } = useParams();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [conversation, setConversation] = useState<any>(null);
  const messageContainerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const searchParams = new URLSearchParams(location.search);
  const recipientId = searchParams.get('recipient');
  const recipientName = searchParams.get('name');
  const initialMessage = searchParams.get('message');

  // Determine whether to show back to dashboard button
  const isDashboardChat = location.pathname.includes('/dashboard');
  
  const getDashboardPath = () => {
    return user?.role === 'kol' ? "/dashboard/kol/messages" : "/dashboard/messages";
  };

  useEffect(() => {
    // If we don't have a conversation ID but have recipient info from URL params,
    // we should create a new conversation or find an existing one
    if (!conversationId && recipientId && recipientName) {
      // For demo purposes, just navigate to the first conversation
      // In a real app, you would create or find the conversation with this recipient
      if (mockConversations.length > 0) {
        navigate(`/chat/${mockConversations[0].id}${location.search}`);
      }
      return;
    }

    // Find the conversation by ID
    const foundConversation = mockConversations.find(
      (c) => c.id === conversationId
    );

    if (foundConversation) {
      setConversation(foundConversation);
      // Get messages for this conversation from mockMessages
      const conversationMessages = mockMessages.filter(
        (msg) => msg.conversationId === conversationId
      );
      setMessages(conversationMessages || []);
    } else if (conversationId) {
      // If we have an ID but no conversation, redirect somewhere appropriate
      navigate(isDashboardChat ? getDashboardPath() : "/chat");
    }
  }, [conversationId, recipientId, navigate, location.search]);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // Handle sending a new message
  const handleSendMessage = (content: string) => {
    if (!content.trim() || !conversationId) return;

    const newMessage = {
      id: `msg-${Date.now()}`,
      senderId: "current-user",
      content,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, newMessage]);
  };

  // Handle initial message from URL params
  useEffect(() => {
    if (initialMessage && conversationId && messages.length > 0) {
      // Only send the initial message if we haven't already (check if it exists)
      const messageExists = messages.some(msg => msg.content === initialMessage);
      
      if (!messageExists) {
        handleSendMessage(initialMessage);
        // Clear the message from the URL after sending
        const newSearchParams = new URLSearchParams(location.search);
        newSearchParams.delete('message');
        navigate(`${location.pathname}?${newSearchParams.toString()}`, { replace: true });
      }
    }
  }, [initialMessage, conversationId, messages.length]);

  // If no conversation is selected, show empty state
  if (!conversation && !recipientId) {
    return (
      <div className="h-full flex flex-col">
        <ChatHeader 
          participant={null} 
          onBackClick={onBackClick}
          isDashboardChat={isDashboardChat}
          dashboardUrl={getDashboardPath()} 
        />
        <div className="flex-1 flex flex-col items-center justify-center p-4">
          <div className="text-center space-y-3">
            <h3 className="text-xl font-medium">No conversation selected</h3>
            <p className="text-muted-foreground">Choose a conversation from the sidebar or start a new one.</p>
          </div>
        </div>
      </div>
    );
  }

  // Find the other participant (not the current user)
  const otherParticipant = conversation?.participants?.find(
    (p: any) => p.id !== "current-user"
  ) || { 
    id: recipientId || "unknown", 
    name: recipientName || "Unknown User", 
    status: "offline",
    avatar: "https://via.placeholder.com/40" 
  };

  return (
    <div className="h-full flex flex-col">
      <ChatHeader 
        participant={otherParticipant} 
        onBackClick={onBackClick}
        isDashboardChat={isDashboardChat}
        dashboardUrl={getDashboardPath()}
      />
      <ScrollArea ref={messageContainerRef} className="flex-1">
        <div className="p-4 space-y-4">
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              message={message}
              isOwnMessage={message.senderId === "current-user"}
            />
          ))}
          {messages.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No messages yet. Start the conversation!</p>
            </div>
          )}
        </div>
      </ScrollArea>
      <div className="p-4 border-t border-white/10">
        <MessageInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
};
