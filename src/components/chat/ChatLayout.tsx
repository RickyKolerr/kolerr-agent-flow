
import React, { useState, useEffect, useCallback } from "react";
import { ChatSidebar } from "./ChatSidebar";
import { ChatWindow } from "./ChatWindow";
import { DemoIndicator } from "@/components/demo/DemoIndicator";
import { useMobileDetection } from "@/hooks/use-mobile-detection";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Menu } from "lucide-react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useMediaQuery } from "@/hooks/useMediaQuery";

interface ChatLayoutProps {
  isDashboardChat?: boolean;
}

export const ChatLayout: React.FC<ChatLayoutProps> = ({ isDashboardChat = false }) => {
  const { isMobile } = useMobileDetection();
  const isSmallScreen = useMediaQuery('(max-width: 768px)');
  const [showSidebar, setShowSidebar] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { conversationId } = useParams<{ conversationId: string }>();
  
  // On mobile, default to showing the sidebar (conversations list)
  // unless we have a specific conversation open
  useEffect(() => {
    if (isSmallScreen) {
      setShowSidebar(!conversationId);
    } else {
      setShowSidebar(true);
    }
  }, [isSmallScreen, conversationId]);

  const toggleSidebar = useCallback(() => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setShowSidebar(!showSidebar);
    
    // Reset transitioning state after animation completes
    setTimeout(() => {
      setIsTransitioning(false);
    }, 300); // Match with CSS transition duration
  }, [showSidebar, isTransitioning]);

  // Handle back button on conversation view
  const handleBackToConversations = () => {
    if (isSmallScreen) {
      setShowSidebar(true);
    } else if (isDashboardChat) {
      navigate(-1);
    }
  };

  return (
    <div className="flex h-full w-full overflow-hidden bg-black/20 backdrop-blur-lg rounded-lg shadow-lg">
      <DemoIndicator 
        section="Chat" 
        tooltip="This is a production-ready chat interface for Brand-KOL communication." 
      />
      
      {/* Sidebar - clean transitions and layout */}
      <div 
        className={`
          ${isSmallScreen ? (showSidebar ? 'w-full' : 'w-0 opacity-0') : 'w-80 min-w-0 md:min-w-80'} 
          h-full overflow-hidden transition-all duration-300 ease-in-out border-r border-white/10
        `}
      >
        {(showSidebar || !isSmallScreen) && (
          <ChatSidebar 
            onConversationSelect={isSmallScreen ? toggleSidebar : undefined} 
            isDashboardChat={isDashboardChat}
          />
        )}
      </div>
      
      {/* Chat window - improved visibility on all screens */}
      <div 
        className={`flex-1 ${isSmallScreen && showSidebar ? 'hidden' : 'flex'} flex-col h-full`}
      >
        <ChatWindow 
          onBackClick={handleBackToConversations}
          showBackButton={isSmallScreen || isDashboardChat}
          isDashboardChat={isDashboardChat}
        />
      </div>
      
      {/* Improved Mobile Toggle Button - only when in a conversation */}
      {isSmallScreen && !showSidebar && conversationId && (
        <Button
          variant="default"
          size="icon"
          className="fixed bottom-24 left-4 h-12 w-12 rounded-full bg-brand-pink shadow-lg z-50 hover:bg-brand-pink/90 focus:outline-none focus:ring-2 focus:ring-white/20"
          onClick={toggleSidebar}
        >
          <Menu className="h-5 w-5 text-white" />
        </Button>
      )}
    </div>
  );
};
