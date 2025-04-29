
import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Message {
  id: string;
  type: "user" | "bot";
  content: string;
}

interface ChatContextType {
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  addMessage: (message: Omit<Message, "id">) => void;
  resetMessages: () => void;
  showWelcomeMessage: boolean;
  setShowWelcomeMessage: React.Dispatch<React.SetStateAction<boolean>>;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(true);

  const addMessage = (message: Omit<Message, "id">) => {
    const newMessage: Message = {
      ...message,
      id: Date.now().toString(),
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const resetMessages = () => {
    setMessages([]);
    setShowWelcomeMessage(true);
  };

  return (
    <ChatContext.Provider value={{ 
      messages, 
      setMessages, 
      addMessage, 
      resetMessages,
      showWelcomeMessage, 
      setShowWelcomeMessage 
    }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = (): ChatContextType => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};
