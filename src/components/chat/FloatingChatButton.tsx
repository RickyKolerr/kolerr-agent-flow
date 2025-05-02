
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useMobileDetection } from "@/hooks/use-mobile-detection";
import { AgentChat } from "./AgentChat";

export const FloatingChatButton = () => {
  const location = useLocation();
  const { user } = useAuth();
  const { isMobile } = useMobileDetection();
  const [isVisible, setIsVisible] = useState(true);
  const [isAgentChatOpen, setIsAgentChatOpen] = useState(false);

  // Check if we should hide the button based on current route
  useEffect(() => {
    // Hide on chat pages, auth pages, and certain dashboard pages
    const shouldHide = 
      location.pathname.startsWith('/chat') || 
      ['/login', '/signup', '/forgot-password'].includes(location.pathname) ||
      location.pathname.startsWith('/onboarding') ||
      location.pathname === '/' || // Hide on home page
      location.pathname === '/home'; // Also hide on /home route
    
    setIsVisible(!shouldHide);
  }, [location.pathname]);

  // Handle chat button click to open agent chat
  const handleChatClick = () => {
    setIsAgentChatOpen(true);
  };

  // Generate welcome message based on user type
  const getWelcomeMessage = () => {
    if (!user) {
      return "👋 Hello there! I'm your Kolerr AI assistant. How can I help you today?";
    } else if (user.role === "kol") {
      return "👋 Welcome back! Need help finding campaign opportunities or managing your profile?";
    } else {
      return "👋 Welcome back! Need help finding the right KOLs for your campaigns or managing your brand account?";
    }
  };

  if (!isVisible) {
    return null;
  }

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          variant="secondary"
          size="lg"
          className="h-14 w-14 rounded-full shadow-lg bg-brand-pink hover:bg-brand-pink/90"
          onClick={handleChatClick}
        >
          <MessageCircle className="h-6 w-6 text-white" />
          <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center">
            3
          </Badge>
        </Button>
      </div>

      {/* Agent Chat Modal/Sheet */}
      <AgentChat
        title="Kolerr AI Assistant"
        subtitle={user ? `Hi ${user.name || 'there'}! How can I help you today?` : "Ask me anything about Kolerr"}
        initialMessage={getWelcomeMessage()}
        isOpen={isAgentChatOpen}
        onOpenChange={setIsAgentChatOpen}
      />
    </>
  );
};
