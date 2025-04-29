
import React, { createContext, useContext, useEffect, useState } from 'react';
import ChatService, { ChatMessage, ChatConversation } from '@/services/ChatService';
import { useAuth } from '@/contexts/AuthContext';

interface ChatContextType {
  isConnected: boolean;
  isInitialized: boolean;
  conversations: ChatConversation[];
  currentConversationId: string | null;
  currentMessages: ChatMessage[];
  unreadCount: number;
  isLoading: boolean;
  error: string | null;
  sendMessage: (content: string, conversationId?: string) => Promise<void>;
  selectConversation: (conversationId: string) => void;
  markAsRead: (conversationId: string) => void;
  searchConversations: (query: string) => ChatConversation[];
  openChat: (userId: string, userName: string) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  const chatService = ChatService.getInstance();
  
  const [isConnected, setIsConnected] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [conversations, setConversations] = useState<ChatConversation[]>([]);
  const [currentConversationId, setCurrentConversationId] = useState<string | null>(null);
  const [currentMessages, setCurrentMessages] = useState<ChatMessage[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Initialize chat service when user is authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      // Mock user ID for demo purposes
      const mockUserId = user.role === 'brand' ? 'b1' : 'k1';
      
      setIsLoading(true);
      setError(null);
      
      try {
        chatService.init(mockUserId, user.role as any);
        setIsInitialized(true);
      } catch (err) {
        setError('Failed to initialize chat service');
        console.error('Chat initialization error:', err);
      }
    } else {
      // Reset state when user logs out
      setIsInitialized(false);
      setConversations([]);
      setCurrentConversationId(null);
      setCurrentMessages([]);
    }
  }, [isAuthenticated, user]);

  // Set up chat event listeners
  useEffect(() => {
    if (!isInitialized) return;
    
    const handleConnected = () => {
      setIsConnected(true);
      setIsLoading(false);
    };
    
    const handleDisconnected = () => {
      setIsConnected(false);
    };
    
    const handleConversationsLoaded = (data: ChatConversation[]) => {
      setConversations(data);
      setIsLoading(false);
      
      // Calculate total unread count
      setUnreadCount(chatService.getTotalUnreadCount());
    };
    
    const handleConversationsUpdated = (data: ChatConversation[]) => {
      setConversations(data);
      setUnreadCount(chatService.getTotalUnreadCount());
    };
    
    const handleMessageSent = (message: ChatMessage) => {
      if (message.conversationId === currentConversationId) {
        setCurrentMessages(prev => [...prev, message]);
      }
    };
    
    const handleMessageReceived = (message: ChatMessage) => {
      if (message.conversationId === currentConversationId) {
        setCurrentMessages(prev => [...prev, message]);
        // Mark as read immediately if the conversation is open
        chatService.markAsRead(message.conversationId);
      }
      
      // Update unread count
      setUnreadCount(chatService.getTotalUnreadCount());
    };
    
    const handleError = (error: { message: string }) => {
      setError(error.message);
    };
    
    // Subscribe to events
    chatService.on('connected', handleConnected);
    chatService.on('disconnected', handleDisconnected);
    chatService.on('conversations_loaded', handleConversationsLoaded);
    chatService.on('conversations_updated', handleConversationsUpdated);
    chatService.on('message_sent', handleMessageSent);
    chatService.on('message_received', handleMessageReceived);
    chatService.on('error', handleError);
    
    // Unsubscribe when component unmounts or user changes
    return () => {
      chatService.off('connected', handleConnected);
      chatService.off('disconnected', handleDisconnected);
      chatService.off('conversations_loaded', handleConversationsLoaded);
      chatService.off('conversations_updated', handleConversationsUpdated);
      chatService.off('message_sent', handleMessageSent);
      chatService.off('message_received', handleMessageReceived);
      chatService.off('error', handleError);
    };
  }, [isInitialized, currentConversationId]);

  // Update current messages when conversation is selected
  useEffect(() => {
    if (!currentConversationId) {
      setCurrentMessages([]);
      return;
    }
    
    setCurrentMessages(chatService.getMessages(currentConversationId));
    chatService.markAsRead(currentConversationId);
    setUnreadCount(chatService.getTotalUnreadCount());
  }, [currentConversationId]);

  // Send a message
  const sendMessage = async (content: string, conversationId?: string) => {
    const targetConversationId = conversationId || currentConversationId;
    if (!targetConversationId) {
      setError('No conversation selected');
      return;
    }
    
    try {
      await chatService.sendMessage(content, targetConversationId);
    } catch (err) {
      setError('Failed to send message');
      console.error('Send message error:', err);
    }
  };

  // Select a conversation
  const selectConversation = (conversationId: string) => {
    setCurrentConversationId(conversationId);
  };

  // Mark messages as read
  const markAsRead = (conversationId: string) => {
    chatService.markAsRead(conversationId);
    setUnreadCount(chatService.getTotalUnreadCount());
  };

  // Search conversations
  const searchConversations = (query: string) => {
    return chatService.searchConversations(query);
  };

  // Open chat with a specific user (creates conversation if needed)
  const openChat = (userId: string, userName: string) => {
    // For demo purposes, find an existing conversation with this user
    const conversation = conversations.find(conv => 
      conv.participants.some(p => p.id === userId)
    );
    
    if (conversation) {
      selectConversation(conversation.id);
    } else {
      // In a real implementation, this would create a new conversation
      // For demo, we'll just select the first conversation
      if (conversations.length > 0) {
        selectConversation(conversations[0].id);
      }
    }
  };

  const value = {
    isConnected,
    isInitialized,
    conversations,
    currentConversationId,
    currentMessages,
    unreadCount,
    isLoading,
    error,
    sendMessage,
    selectConversation,
    markAsRead,
    searchConversations,
    openChat
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};
