
import React from "react";
import { Navigate, useParams } from "react-router-dom";
import { ChatLayout } from "@/components/chat/ChatLayout";
import { useAuth } from "@/contexts/AuthContext";
import { mockConversations } from "@/components/chat/mockChatData";

const ChatPage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const { conversationId } = useParams<{ conversationId: string }>();
  
  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  // If no conversationId is provided, redirect to the first conversation
  if (!conversationId) {
    const firstConversation = mockConversations[0];
    if (firstConversation) {
      return <Navigate to={`/chat/${firstConversation.id}`} replace />;
    }
  }
  
  return (
    <div className="h-[calc(100vh-4rem)] w-full">
      <ChatLayout />
    </div>
  );
};

export default ChatPage;
