
import React, { useState, useEffect, useCallback } from "react";
import { ChatSidebar } from "./ChatSidebar";
import { ChatWindow } from "./ChatWindow";
import { DemoIndicator } from "@/components/demo/DemoIndicator";
import { useMobileDetection } from "@/hooks/use-mobile-detection";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useLocation } from "react-router-dom";

interface ChatLayoutProps {
  isDashboardChat?: boolean;
}

export const ChatLayout: React.FC<ChatLayoutProps> = ({ isDashboardChat = false }) => {
  const { isMobile } = useMobileDetection();
  const [showSidebar, setShowSidebar] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const location = useLocation();
  
  // On mobile, default to showing the sidebar (conversations list)
  useEffect(() => {
    if (isMobile) {
      // If we have a conversation ID in the URL, don't show sidebar by default
      const hasConversationId = window.location.pathname.split('/').length > 2;
      setShowSidebar(!hasConversationId);
    } else {
      setShowSidebar(true);
    }
  }, [isMobile]);

  const toggleSidebar = useCallback(() => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setShowSidebar(!showSidebar);
    
    // Reset transitioning state after animation completes
    setTimeout(() => {
      setIsTransitioning(false);
    }, 300); // Match with CSS transition duration
  }, [showSidebar, isTransitioning]);

  return (
    <div className="flex h-screen overflow-hidden bg-black/10 backdrop-blur-md">
      <DemoIndicator 
        section="Chat" 
        tooltip="This is a production-ready chat interface that will be connected to WebSockets." 
      />
      
      {/* Sidebar - use will-change for better performance during transitions */}
      <div 
        className={`${
          isMobile ? 
            (showSidebar ? 'block w-full' : 'hidden') : 
            'block w-80 min-w-80'
        } transition-all duration-300 will-change-transform`}
        style={{ 
          transform: showSidebar ? 'translateX(0)' : 'translateX(-100%)',
          opacity: showSidebar ? 1 : 0
        }}
      >
        <ChatSidebar onConversationSelect={isMobile ? toggleSidebar : undefined} />
      </div>
      
      {/* Chat window - controlled visibility for better performance */}
      <div 
        className={`flex-1 ${
          isMobile ? (showSidebar ? 'hidden' : 'block') : 'block'
        } will-change-opacity`}
        style={{ 
          opacity: isMobile && showSidebar ? 0 : 1,
          transition: 'opacity 200ms ease-out'
        }}
      >
        <ChatWindow 
          onBackClick={isMobile ? toggleSidebar : undefined} 
        />
      </div>
    </div>
  );
};
