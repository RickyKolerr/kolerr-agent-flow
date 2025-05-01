
import React, { useState, useEffect } from "react";
import { Bot } from "lucide-react";
import { cn } from "@/lib/utils";
import { AgentChat } from "./AgentChat";
import { useAuth } from "@/contexts/AuthContext";
import { useLocation } from "react-router-dom";
import { useUserAccess } from "@/hooks/useUserAccess";

export function FloatingChatButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasNotification, setHasNotification] = useState(false);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const { user, isAuthenticated } = useAuth();
  const location = useLocation();
  const { canAccessFeature } = useUserAccess();
  
  // Enhanced logic: check authentication, route path, and feature access
  const homePaths = ['/', '/home', '/index'];
  const authPaths = ['/login', '/signup', '/forgot-password', '/reset-password', '/verify-email', '/onboarding'];
  const chatPaths = ['/chat'];
  
  const isHomePath = homePaths.includes(location.pathname);
  const isAuthPath = authPaths.some(path => location.pathname.startsWith(path));
  const isChatPath = chatPaths.some(path => location.pathname.startsWith(path));
  
  // Don't show on home paths, auth paths, or dedicated chat paths
  const shouldShowButton = 
    isAuthenticated && 
    !isHomePath && 
    !isAuthPath && 
    !isChatPath && 
    canAccessFeature('messages');

  // Configure AgentChat based on user role with shorter messages
  const agentConfig = user?.role === 'kol' 
    ? {
        title: "Campaign Finder AI",
        subtitle: "4 free searches remaining today",
        initialMessage: "👋 Hi! I'll help you find paid brand campaigns that match your content. What opportunities are you looking for?"
      }
    : {
        title: "Influencer AI Agent",
        subtitle: "4 free searches remaining today",
        initialMessage: "👋 Welcome! As TikTok and Meta's Strategic Partner, I can help you find the right creators for your campaigns. What type of influencers do you need?"
      };

  // Show notification dot after a delay to simulate new information
  useEffect(() => {
    if (isFirstLoad && shouldShowButton) {
      const timer = setTimeout(() => {
        setHasNotification(true);
        setIsFirstLoad(false);
      }, 15000); // Show notification after 15 seconds
      
      return () => clearTimeout(timer);
    }
  }, [isFirstLoad, shouldShowButton]);
  
  // Reset notification when chat is opened
  const handleOpenChat = () => {
    setIsOpen(true);
    setHasNotification(false);
  };

  // Don't render anything if we shouldn't show the button
  if (!shouldShowButton) {
    return null;
  }

  return (
    <>
      <button 
        onClick={handleOpenChat}
        className="fixed z-40 flex items-center justify-center bottom-4 right-4 md:bottom-6 md:right-6 h-14 w-14 rounded-full shadow-lg bg-gradient-to-r from-brand-gradient-from to-brand-gradient-to text-white hover:shadow-xl transform hover:scale-105 transition-all duration-300"
        aria-label="Chat with AI Assistant"
      >
        <Bot className="h-6 w-6" />
        
        {/* Notification dot */}
        {hasNotification && (
          <span className="absolute top-0 right-0 h-3 w-3 bg-red-500 rounded-full animate-pulse border border-white transform translate-x-1 -translate-y-1" />
        )}
      </button>

      <AgentChat
        title={agentConfig.title}
        subtitle={agentConfig.subtitle}
        initialMessage={agentConfig.initialMessage}
        isOpen={isOpen}
        onOpenChange={setIsOpen}
      />
    </>
  );
}
