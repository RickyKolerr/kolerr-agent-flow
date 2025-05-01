
import React, { useEffect, useRef } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { ChatAgentHeader } from "./ChatAgentHeader";
import { ChatMessagesDisplay } from "./ChatMessagesDisplay";
import { ChatAgentInput } from "./ChatAgentInput";
import { useMessageSimulation } from "@/hooks/useMessageSimulation";
import { useUserAccess } from "@/hooks/useUserAccess";

interface AgentChatProps {
  title: string;
  subtitle: string;
  initialMessage: string;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export const AgentChat: React.FC<AgentChatProps> = ({ 
  title, 
  subtitle, 
  initialMessage,
  isOpen = false,
  onOpenChange
}) => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const inputRef = useRef<HTMLInputElement>(null);
  const { 
    messages, 
    sendButtonClicked, 
    handleSendMessage, 
    initializeWithWelcomeMessage 
  } = useMessageSimulation();
  
  // Get user access information to personalize chat experience
  const { user, isAuthenticated, isKOLSpecificQuery } = useUserAccess();

  // Set custom placeholder based on user role
  const getPlaceholderText = () => {
    if (!isAuthenticated) return "Sign in to save chat history...";
    if (user?.role === "kol") return "Ask about campaigns, opportunities...";
    if (user?.role === "brand") return "Ask about finding KOLs, campaigns...";
    return "Ask me anything...";
  };

  // Add welcome message on mount and when chat opens
  useEffect(() => {
    if (isOpen) {
      initializeWithWelcomeMessage(initialMessage);
      
      // Focus input after a short delay to ensure the chat interface is visible
      const timer = setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 300);
      
      return () => clearTimeout(timer);
    }
  }, [initialMessage, isOpen, initializeWithWelcomeMessage]);

  const renderChatContent = () => (
    <div className="flex flex-col h-full">
      <ChatAgentHeader 
        title={title} 
        subtitle={subtitle} 
        onClose={onOpenChange ? () => onOpenChange(false) : undefined}
      />
      
      {/* Fixed height for the chat messages area */}
      <div className="flex-1 overflow-hidden relative" style={{ minHeight: "350px" }}>
        <ChatMessagesDisplay messages={messages} />
      </div>
      
      <ChatAgentInput 
        onSendMessage={handleSendMessage} 
        disabled={sendButtonClicked}
        placeholder={getPlaceholderText()}
        inputRef={inputRef}
      />
    </div>
  );

  // For mobile devices, use a Sheet component that slides in from bottom
  if (isMobile) {
    return (
      <Sheet open={isOpen} onOpenChange={onOpenChange}>
        <SheetContent side="bottom" className="h-[85vh] p-0 rounded-t-xl border-t border-white/10 bg-gradient-to-b from-black/90 to-black/80 backdrop-blur-xl">
          {renderChatContent()}
        </SheetContent>
      </Sheet>
    );
  }
  
  // For desktop, use Dialog component to create a modal-like experience
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px] h-[70vh] p-0 bg-gradient-to-br from-black/80 to-black/60 backdrop-blur-xl border border-white/10 shadow-lg rounded-2xl overflow-hidden">
        <DialogTitle className="sr-only">{title}</DialogTitle>
        {renderChatContent()}
      </DialogContent>
    </Dialog>
  );
};
