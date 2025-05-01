
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useMobileDetection } from "@/hooks/use-mobile-detection";

export const FloatingChatButton = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { isMobile } = useMobileDetection();
  const [isVisible, setIsVisible] = useState(true);

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

  // Handle chat button click
  const handleChatClick = () => {
    if (!user) {
      navigate('/login', { state: { from: location.pathname, message: 'Please log in to access chat' } });
      return;
    }

    // If already authenticated, navigate to chat
    navigate('/chat');
  };

  if (!isVisible) {
    return null;
  }

  return (
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
  );
};
