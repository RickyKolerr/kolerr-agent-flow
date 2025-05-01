
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
    <div className="flex h-full w-full overflow-hidden bg-black/10 backdrop-blur-md">
      <DemoIndicator 
        section="Chat" 
        tooltip="This is a production-ready chat interface for Brand-KOL communication." 
      />
      
      {/* Sidebar - adapt width based on screen size */}
      <div 
        className={`
          ${isSmallScreen ? (showSidebar ? 'block w-full' : 'hidden') : 'block w-80 min-w-80'} 
          h-full transition-all duration-300 will-change-transform
        `}
        style={{ 
          transform: showSidebar || !isSmallScreen ? 'translateX(0)' : 'translateX(-100%)',
          opacity: showSidebar || !isSmallScreen ? 1 : 0
        }}
      >
        <ChatSidebar 
          onConversationSelect={isSmallScreen ? toggleSidebar : undefined} 
          isDashboardChat={isDashboardChat}
        />
      </div>
      
      {/* Chat window */}
      <div 
        className={`flex-1 ${isSmallScreen ? (showSidebar ? 'hidden' : 'block') : 'block'} h-full`}
        style={{ 
          opacity: isSmallScreen && showSidebar ? 0 : 1,
          transition: 'opacity 200ms ease-out'
        }}
      >
        <ChatWindow 
          onBackClick={handleBackToConversations}
          showBackButton={isSmallScreen || isDashboardChat}
          isDashboardChat={isDashboardChat}
        />
      </div>
      
      {/* Mobile Toggle Button - only show when in a conversation */}
      {isSmallScreen && !showSidebar && conversationId && (
        <Button
          variant="ghost"
          size="icon"
          className="fixed bottom-20 left-5 h-12 w-12 rounded-full bg-brand-pink/80 shadow-lg z-50 hover:bg-brand-pink"
          onClick={toggleSidebar}
        >
          <Menu className="h-6 w-6 text-white" />
        </Button>
      )}
    </div>
  );
};
