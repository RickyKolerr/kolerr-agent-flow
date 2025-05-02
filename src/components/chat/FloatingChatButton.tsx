import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { MessagesSquare, Lock } from "lucide-react";
import { AgentChat } from "./AgentChat";
import { CreditBadge } from "@/components/CreditBadge";
import { useCredits } from "@/contexts/CreditContext";
import { ChatToggle } from "./ChatToggle";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

interface FloatingChatButtonProps {
  initialMessage?: string;
  chatType?: "kol_search" | "campaign_search" | "general";
  profileId?: string;
  profileName?: string;
  profileType?: "kol" | "brand";
}

export const FloatingChatButton: React.FC<FloatingChatButtonProps> = ({ 
  initialMessage = "👋 Hello! How can I assist you today?",
  chatType = "general",
  profileId,
  profileName,
  profileType
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchMode, setIsSearchMode] = useState(false);
  const [isPulsing, setIsPulsing] = useState(false);
  const { hasPremiumPlan, freeCredits, useFreeCredit } = useCredits();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  // Check if this button is for a profile contact or general assistant
  const isProfileContact = Boolean(profileId && profileType);
  
  // Add pulsing effect after a few seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPulsing(true);
      // Stop pulsing after 3 pulses
      setTimeout(() => setIsPulsing(false), 3000);
    }, 5000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Determine title and subtitle based on chat type and search mode
  const getTitle = () => {
    // If this is a profile contact button, show the profile name
    if (isProfileContact && profileName) {
      return `Chat with ${profileName}`;
    }
    
    // Otherwise use the existing logic
    switch (chatType) {
      case "kol_search":
        return "KOL Discovery Agent";
      case "campaign_search":
        return "Campaign Search Agent";
      default:
        return isSearchMode ? "Search Assistant" : "AI Assistant";
    }
  };
  
  const getSubtitle = () => {
    // If this is a profile contact button, show appropriate subtitle
    if (isProfileContact) {
      return profileType === "kol" 
        ? "Discuss collaboration opportunities" 
        : "Explore campaign opportunities";
    }
    
    // Otherwise use the existing logic
    switch (chatType) {
      case "kol_search":
        return "Find the perfect creator for your brand";
      case "campaign_search":
        return "Discover campaign opportunities";
      default:
        return isSearchMode 
          ? "Search for specific KOLs or campaigns (uses more credits)"
          : "Ask me anything about Kolerr (uses fewer credits)";
    }
  };
  
  // Check if the user can contact this profile
  const canContactProfile = () => {
    if (!isAuthenticated) return false;
    if (!isProfileContact) return true; // General chat is always allowed for authenticated users
    
    // User role-based checks
    const userRole = user?.role;
    
    // KOLs contacting brands - need 1 credit unless they were invited
    if (userRole === 'kol' && profileType === 'brand') {
      // Check if KOL was invited by this brand (would be in a real contacts database)
      const wasInvited = false; // This would check a real database
      
      if (wasInvited) return true;
      // Otherwise, needs 1 credit
      return freeCredits >= 1;
    }
    
    // Brands contacting KOLs - check monthly limit
    if (userRole === 'brand' && profileType === 'kol') {
      // Get brand's monthly contact limit based on subscription
      const contactLimit = hasPremiumPlan ? 50 : 10;
      
      // Get number of contacts made this month (would come from a real database)
      const contactsThisMonth = 5; // This would check a real database
      
      return contactsThisMonth < contactLimit;
    }
    
    // Default - not allowed
    return false;
  };
  
  // Handle click on the chat button
  const handleChatButtonClick = () => {
    // For general chat, always allow
    if (!isProfileContact) {
      setIsOpen(true);
      return;
    }
    
    // Not logged in - prompt to sign up
    if (!isAuthenticated) {
      toast.error("Please sign in to contact creators", {
        description: "Create an account to unlock messaging features",
        action: {
          label: "Sign In",
          onClick: () => navigate("/login")
        }
      });
      return;
    }
    
    const userRole = user?.role;
    
    // KOL contacting brand
    if (userRole === 'kol' && profileType === 'brand') {
      // Check if KOL was invited by this brand (would be in a real contacts database)
      const wasInvited = false; // This would check a real database
      
      if (wasInvited) {
        setIsOpen(true);
        return;
      }
      
      // Not invited, check credits
      if (freeCredits >= 1) {
        // Confirm with toast that this will use a credit
        toast({
          title: "Unlock this conversation?",
          description: "This will use 1 credit to contact this brand",
          action: {
            label: "Confirm",
            onClick: () => {
              useFreeCredit();
              setIsOpen(true);
              toast.success("Conversation unlocked!");
            }
          }
        });
      } else {
        // No credits
        toast.error("Not enough credits", {
          description: "You need 1 credit to contact this brand",
          action: {
            label: "Get Credits",
            onClick: () => navigate("/pricing")
          }
        });
      }
      return;
    }
    
    // Brand contacting KOL
    if (userRole === 'brand' && profileType === 'kol') {
      // Get brand's monthly contact limit based on subscription
      const contactLimit = hasPremiumPlan ? 50 : 10;
      
      // Get number of contacts made this month (would come from a real database)
      const contactsThisMonth = 5; // This would check a real database
      
      if (contactsThisMonth < contactLimit) {
        // Track this new contact (would be in a real database)
        setIsOpen(true);
      } else {
        // Over limit
        toast.error("Monthly contact limit reached", {
          description: hasPremiumPlan 
            ? "You've reached your 50 contact limit this month" 
            : "Upgrade to premium for more monthly contacts",
          action: {
            label: hasPremiumPlan ? "Manage Plan" : "Upgrade",
            onClick: () => navigate("/pricing")
          }
        });
      }
      return;
    }
    
    // Default fallback - general error
    toast.error("Unable to start conversation", {
      description: "Please try again later"
    });
  };

  return (
    <>
      <div className="fixed bottom-4 right-4 z-50 flex items-center space-x-3">
        {chatType === "general" && !isProfileContact && (
          <div 
            className={`bg-black/60 backdrop-blur-xl rounded-full px-3 py-1 border border-white/20 shadow-lg transition-all duration-300 ${
              isOpen ? 'opacity-0 translate-x-10' : 'opacity-100 translate-x-0'
            }`}
          >
            <ChatToggle
              isSearchMode={isSearchMode}
              onToggle={setIsSearchMode}
              variant="pill"
            />
          </div>
        )}
      
        <Button
          onClick={handleChatButtonClick}
          className={`rounded-full h-14 w-14 shadow-lg transition-all duration-500 ${
            isSearchMode ? "bg-brand-pink hover:bg-brand-pink/90" : "bg-blue-500 hover:bg-blue-600"
          } ${isPulsing ? 'animate-pulse shadow-[0_0_15px_rgba(244,114,182,0.5)]' : ''} hover:scale-110 relative`}
        >
          <div className="relative">
            {!isAuthenticated && isProfileContact ? (
              <Lock className="h-6 w-6" />
            ) : (
              <MessagesSquare className="h-6 w-6" />
            )}
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-white/90"></span>
            </span>
          </div>
          <span className="sr-only">
            {isProfileContact ? `Chat with ${profileName || 'this profile'}` : "Chat with AI Assistant"}
          </span>
          
          {/* Add a blurred overlay for guest users on profile contacts */}
          {!isAuthenticated && isProfileContact && (
            <div className="absolute inset-0 bg-black/30 rounded-full backdrop-blur-sm flex items-center justify-center">
              <Lock className="h-4 w-4 text-white/70" />
            </div>
          )}
        </Button>
      </div>

      <AgentChat
        title={getTitle()}
        subtitle={getSubtitle()}
        initialMessage={initialMessage}
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        chatType={chatType}
        profileId={profileId}
        profileType={profileType}
      />
    </>
  );
};
