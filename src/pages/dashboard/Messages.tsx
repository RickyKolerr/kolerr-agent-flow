
import React from "react";
import { ChatLayout } from "@/components/chat/ChatLayout";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";

const MessagesPage: React.FC = () => {
  const { user, isAuthenticated } = useAuth();

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If user is KOL, redirect to KOL messages page
  if (user?.role === 'kol') {
    return <Navigate to="/dashboard/kol/messages" replace />;
  }

  return (
    <div className="-m-6 h-[calc(100vh-6rem)]">
      <div className="flex flex-col h-full bg-black/10 backdrop-blur-lg rounded-lg overflow-hidden">
        <div className="px-4 py-3 border-b border-white/10 bg-black/20">
          <h1 className="text-xl font-semibold">Brand Messages</h1>
          <p className="text-sm text-muted-foreground">
            Chat with creators and partners
          </p>
        </div>
        <div className="flex-1 overflow-hidden">
          <ChatLayout isDashboardChat={true} />
        </div>
      </div>
    </div>
  );
};

export default MessagesPage;
