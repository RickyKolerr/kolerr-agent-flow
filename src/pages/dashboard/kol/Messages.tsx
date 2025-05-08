
import React from "react";
import { ChatLayout } from "@/components/chat/ChatLayout";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";

const KolMessagesPage: React.FC = () => {
  const { user, isAuthenticated } = useAuth();

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If user is not KOL, redirect to brand messages page
  if (user?.role !== 'kol') {
    return <Navigate to="/dashboard/messages" replace />;
  }

  return (
    <div className="-m-6 h-[calc(100vh-6rem)]">
      <div className="flex flex-col h-full bg-black/10 backdrop-blur-md rounded-lg overflow-hidden">
        <div className="px-4 py-3 border-b border-white/10">
          <h1 className="text-xl font-semibold">Creator Messages</h1>
          <p className="text-sm text-muted-foreground">
            Chat with brands and partners
          </p>
        </div>
        <div className="flex-1 overflow-hidden">
          <ChatLayout isDashboardChat={true} />
        </div>
      </div>
    </div>
  );
};

export default KolMessagesPage;
