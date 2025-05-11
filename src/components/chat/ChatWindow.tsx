
import React, { useState, useRef, useEffect, useCallback } from "react";
import { ChatHeader } from "./ChatHeader";
import { MessageInput } from "./MessageInput";
import { ChatMessage as ChatMessageComponent } from "./ChatMessage";
import { ScrollArea } from "@/components/ui/scroll-area";
import { mockConversations, mockMessages } from "./mockChatData";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext"; 
import { ChatMessage } from "./types";
import { Loader2 } from "lucide-react";

interface ChatWindowProps {
  onBackClick?: () => void;
  showBackButton?: boolean;
  isDashboardChat?: boolean;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({ 
  onBackClick, 
  showBackButton = false, 
  isDashboardChat = false 
}) => {
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
  const [isLoading, setIsLoading] = useState(true);
  const [shouldScrollToBottom, setShouldScrollToBottom] = useState(false);
  
  const getDashboardPath = useCallback(() => {
    return user?.role === 'kol' ? "/dashboard/kol" : "/dashboard";
  }, [user?.role]);

  useEffect(() => {
    setIsLoading(true);
    
    // Handle recipient info from URL params when no conversation ID exists
    if (!conversationId && recipientId && recipientName) {
      // For demo purposes, navigate to first conversation
      if (mockConversations.length > 0) {
        navigate(`/chat/${mockConversations[0].id}${location.search}`);
      }
      setIsLoading(false);
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
      // Only set scroll flag when messages are loaded
      setShouldScrollToBottom(true);
    } else if (conversationId) {
      // Redirect if ID exists but conversation not found
      navigate(isDashboardChat ? getDashboardPath() : "/chat");
    }
    
    setIsLoading(false);
  }, [conversationId, recipientId, navigate, location.search, isDashboardChat, getDashboardPath]);

  // Optimized scroll to bottom only when needed
  useEffect(() => {
    if (messageContainerRef.current && shouldScrollToBottom) {
      // Use requestAnimationFrame for smooth scrolling
      requestAnimationFrame(() => {
        if (messageContainerRef.current) {
          messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
        }
      });
      // Reset flag after scrolling
      setShouldScrollToBottom(false);
    }
  }, [shouldScrollToBottom, messages]);

  // Handle sending a new message with debounce
  const handleSendMessage = useCallback((content: string) => {
    if (!content.trim() || !conversationId) return;

    const newMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      conversationId: conversationId,
      senderId: "current-user",
      content,
      timestamp: new Date().toISOString(),
      status: 'sending'
    };

    setMessages(prev => [...prev, newMessage]);
    // Set flag to scroll to bottom after sending a message
    setShouldScrollToBottom(true);
    
    // Simulate message delivery after a short delay
    setTimeout(() => {
      setMessages(prev => 
        prev.map(msg => 
          msg.id === newMessage.id ? { ...msg, status: 'delivered' } : msg
        )
      );
    }, 500);
  }, [conversationId]);

  // Handle initial message from URL params
  useEffect(() => {
    if (initialMessage && conversationId && messages.length > 0) {
      // Only send the initial message if we haven't already
      const messageExists = messages.some(msg => msg.content === initialMessage);
      
      if (!messageExists) {
        handleSendMessage(initialMessage);
        // Clear the message from the URL after sending
        const newSearchParams = new URLSearchParams(location.search);
        newSearchParams.delete('message');
        navigate(`${location.pathname}?${newSearchParams.toString()}`, { replace: true });
      }
    }
  }, [initialMessage, conversationId, messages.length, handleSendMessage, location.search, navigate, location.pathname]);

  // Loading state
  if (isLoading) {
    return (
      <div className="h-full flex flex-col">
        <ChatHeader 
          participant={null} 
          onBackClick={onBackClick}
          isDashboardChat={isDashboardChat}
          dashboardUrl={getDashboardPath()} 
        />
        <div className="flex-1 flex items-center justify-center bg-black/10 backdrop-blur-sm">
          <Loader2 className="h-8 w-8 animate-spin text-brand-pink" />
        </div>
      </div>
    );
  }
  
  // Empty state - no conversation selected
  if (!conversation && !recipientId) {
    return (
      <div className="h-full flex flex-col">
        <ChatHeader 
          participant={null} 
          onBackClick={onBackClick}
          isDashboardChat={isDashboardChat}
          dashboardUrl={getDashboardPath()} 
        />
        <div className="flex-1 flex flex-col items-center justify-center p-4 bg-black/10 backdrop-blur-sm">
          <div className="text-center space-y-3 max-w-md glass-panel rounded-lg p-8">
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
      
      <div 
        ref={messageContainerRef}
        className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent p-4 space-y-4 bg-gradient-to-b from-black/5 to-black/20"
      >
        {messages.map((message) => (
          <ChatMessageComponent
            key={message.id}
            message={message}
            isOwnMessage={message.senderId === "current-user"}
          />
        ))}
        {messages.length === 0 && (
          <div className="text-center py-8 h-full flex items-center justify-center">
            <p className="text-muted-foreground bg-black/10 backdrop-blur-sm px-4 py-2 rounded-full">
              No messages yet. Start the conversation!
            </p>
          </div>
        )}
      </div>
      
      <div className="border-t border-white/10">
        <MessageInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
};
