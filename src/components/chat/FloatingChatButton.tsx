
import React, { useState, useEffect } from "react";
import { Bot } from "lucide-react";
import { cn } from "@/lib/utils";
import { AgentChat } from "./AgentChat";
import { useAuth } from "@/contexts/AuthContext";
import { useLocation } from "react-router-dom";

export function FloatingChatButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasNotification, setHasNotification] = useState(false);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const { user, isAuthenticated } = useAuth();
  const location = useLocation();
  
  // Check if we should show the button (authenticated and not on home page)
  const shouldShowButton = isAuthenticated && location.pathname !== "/" && location.pathname !== "/home";

  // Configure AgentChat based on user role
  const agentConfig = user?.role === 'kol' 
    ? {
        title: "Campaign Finder AI",
        subtitle: "4 free searches remaining today",
        initialMessage: "👋 Welcome to Kolerr! We connect creators like you to amazing paid brand campaigns. Tell me what kind of opportunities you're looking for, and I'll help you find the perfect match!"
      }
    : {
        title: "Influencer AI Agent",
        subtitle: "4 free searches remaining today",
        initialMessage: "👋 Welcome to the world's first Influencer Marketing AI Agent! As a Strategic Partner of Global TikTok and Meta, Kolerr can help you quickly find creators all around the world for your campaigns. What type of influencers are you looking for today?"
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
  if (!shouldShowButton) return null;

  return (
    <>
      <button 
        onClick={handleOpenChat}
        className={cn(
          "fixed z-40 flex items-center justify-center",
          "bottom-4 right-4 md:bottom-6 md:right-6",
          "h-12 w-12 md:h-14 md:w-14",
          "rounded-full shadow-lg",
          "bg-gradient-to-r from-brand-gradient-from to-brand-gradient-to",
          "text-white hover:shadow-xl transform hover:scale-105 transition-all duration-300",
          isFirstLoad && "animate-pulse"
        )}
        aria-label="Chat with AI Assistant"
      >
        <Bot className="h-6 w-6" />
        
        {/* Notification dot */}
        {hasNotification && (
          <span className="absolute top-0 right-0 h-3 w-3 bg-red-500 rounded-full 
            animate-pulse border border-white transform translate-x-1 -translate-y-1" />
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
