
import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useChat } from '@/contexts/ChatContext';
import { ChatWindow } from '@/components/chat/ChatWindow';
import { Dialog, DialogContent } from '@/components/ui/dialog';

export const FloatingChatButton = () => {
  const { isInitialized, unreadCount } = useChat();
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isChatMinimized, setIsChatMinimized] = useState(false);
  
  if (!isInitialized) return null;
  
  // Open a small floating window
  if (isChatOpen && !isChatMinimized) {
    return (
      <div className="fixed bottom-5 right-5 z-50 w-96 h-[500px] flex flex-col overflow-hidden shadow-lg rounded-t-lg">
        <ChatWindow 
          onClose={() => setIsChatOpen(false)}
          minimized={false}
          toggleMinimize={() => setIsChatMinimized(true)}
        />
      </div>
    );
  }
  
  // Minimized chat window
  if (isChatOpen && isChatMinimized) {
    return (
      <div className="fixed bottom-5 right-5 z-50 w-60 shadow-lg">
        <ChatWindow
          onClose={() => setIsChatOpen(false)}
          minimized={true}
          toggleMinimize={() => setIsChatMinimized(false)}
        />
      </div>
    );
  }
  
  // Floating button
  return (
    <div className="fixed bottom-5 right-5 z-50">
      <Button 
        onClick={() => setIsChatOpen(true)}
        className="h-12 w-12 rounded-full bg-brand-pink hover:bg-brand-pink/90 shadow-lg"
      >
        <MessageCircle className="h-6 w-6" />
        {unreadCount > 0 && (
          <Badge className="absolute -top-1 -right-1 bg-brand-navy h-5 w-5 p-0 flex items-center justify-center">
            {unreadCount}
          </Badge>
        )}
      </Button>
    </div>
  );
};
