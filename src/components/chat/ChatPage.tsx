
import React, { useState } from 'react';
import { MessageCircle, Search } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChatSidebar } from "@/components/chat/ChatSidebar";
import { ChatWindow } from "@/components/chat/ChatWindow";
import { useChat } from '@/contexts/ChatContext';

const ChatPage = () => {
  const { selectConversation, currentConversationId } = useChat();
  
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <MessageCircle className="h-6 w-6 text-brand-pink" />
        <h1 className="text-2xl font-bold tracking-tight">Messaging</h1>
      </div>
      
      <div className="flex h-[calc(100vh-14rem)] overflow-hidden border rounded-md shadow-sm">
        <div className="w-1/3 max-w-xs">
          <ChatSidebar 
            onSelectConversation={selectConversation}
            currentConversationId={currentConversationId}
          />
        </div>
        <div className="flex-1">
          {currentConversationId ? (
            <ChatWindow onClose={() => selectConversation('')} />
          ) : (
            <div className="h-full flex flex-col items-center justify-center p-6 text-center bg-muted/10">
              <MessageCircle className="h-12 w-12 text-muted-foreground mb-4" />
              <h2 className="text-xl font-semibold mb-2">No conversation selected</h2>
              <p className="text-muted-foreground mb-4">
                Select a conversation from the sidebar or start a new one
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
