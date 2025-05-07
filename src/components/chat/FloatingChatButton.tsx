
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useMobileDetection } from "@/hooks/use-mobile-detection";
import { AgentChat } from "./AgentChat";
import { useCredits } from "@/contexts/CreditContext";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import taskHandler from "@/utils/taskHandler";

export const FloatingChatButton = () => {
  const location = useLocation();
  const { user } = useAuth();
  const { isMobile } = useMobileDetection();
  const [isVisible, setIsVisible] = useState(true);
  const [isAgentChatOpen, setIsAgentChatOpen] = useState(false);
  const { freeCredits, remainingGeneralQuestions, hasPremiumPlan } = useCredits();

  // Detect task operations in URL or location changes
  useEffect(() => {
    // Parse URL parameters for possible tasks
    const queryParams = new URLSearchParams(location.search);
    const taskParam = queryParams.get('task');
    const queryParam = queryParams.get('query');
    
    if (taskParam && queryParam) {
      // Create a task based on URL parameters
      taskHandler.createTask(taskParam as any, queryParam);
    }
  }, [location.search]);

  // Check if we should hide the button based on current route
  useEffect(() => {
    // Hide on chat pages, auth pages, and certain dashboard pages
    const shouldHide = 
      location.pathname.startsWith('/chat') || 
      ['/login', '/signup', '/forgot-password'].includes(location.pathname) ||
      location.pathname.startsWith('/onboarding') ||
      location.pathname === '/' || 
      location.pathname === '/home';
    
    setIsVisible(!shouldHide);
  }, [location.pathname]);

  // Handle chat button click to open agent chat
  const handleChatClick = () => {
    setIsAgentChatOpen(true);
  };

  // Generate welcome message based on user type with enhanced task capabilities
  const getWelcomeMessage = () => {
    if (!user) {
      return "👋 Hello there! I'm your Kolerr AI assistant. I can help you search, filter, and connect with influencers. What would you like to do today?";
    } else if (user.role === "kol") {
      return "👋 Welcome back! Need help finding campaign opportunities, managing your profile, or connecting with brands?";
    } else {
      return "👋 Welcome back! I can help you find the right KOLs for campaigns, filter by metrics, and prepare outreach messages. What would you like to do today?";
    }
  };

  if (!isVisible) {
    return null;
  }

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="purple"
                size="lg"
                className="h-14 w-14 rounded-full shadow-lg"
                onClick={handleChatClick}
              >
                <MessageCircle className="h-6 w-6 text-white" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top" className="bg-black/70 backdrop-blur-sm border border-white/10">
              <p>
                {hasPremiumPlan 
                  ? "Unlimited AI assistant messages" 
                  : `${remainingGeneralQuestions} general questions available`}
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      {/* Only render AgentChat when it's open to save memory */}
      {isAgentChatOpen && (
        <AgentChat
          title="Kolerr AI Assistant"
          subtitle={user ? `Hi ${user.name || 'there'}! I can help with searches, filtering, or contact preparation` : "Ask me about creator search, filtering, or contact preparation"}
          initialMessage={getWelcomeMessage()}
          isOpen={isAgentChatOpen}
          onOpenChange={setIsAgentChatOpen}
        />
      )}
    </>
  );
};
