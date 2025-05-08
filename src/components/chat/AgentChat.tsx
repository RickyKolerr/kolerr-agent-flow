
import React, { useEffect, useRef } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { ChatAgentHeader } from "./ChatAgentHeader";
import { ChatMessagesDisplay } from "./ChatMessagesDisplay";
import { ChatAgentInput } from "./ChatAgentInput";
import { useMessageSimulation } from "@/hooks/useMessageSimulation";
import { useUserAccess } from "@/hooks/useUserAccess";
import taskHandler, { TaskType } from "@/utils/taskHandler";

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
    initializeWithWelcomeMessage,
    setMessages 
  } = useMessageSimulation();
  
  // Get user access information to personalize chat experience
  const { user, isAuthenticated, isKOLSpecificQuery } = useUserAccess();

  // Detect the type of task from user input
  const detectTaskType = (input: string): TaskType => {
    const lowerInput = input.toLowerCase();
    
    if (lowerInput.includes("search") || 
        lowerInput.includes("find") || 
        lowerInput.includes("look for") ||
        lowerInput.includes("discover")) {
      return "search";
    } 
    else if (lowerInput.includes("filter") || 
             lowerInput.includes("narrow down") || 
             lowerInput.includes("only show") ||
             lowerInput.includes("limit to")) {
      return "filter";
    }
    else if (lowerInput.includes("contact") || 
             lowerInput.includes("reach out") || 
             lowerInput.includes("message") ||
             lowerInput.includes("connect with")) {
      return "contact";
    }
    
    return "general";
  };

  // Enhanced message handler that creates tasks
  const handleEnhancedSendMessage = (input: string) => {
    if (!input.trim()) return;

    // Create a task based on detected type
    const taskType = detectTaskType(input);
    const taskId = taskHandler.createTask(taskType, input);
    
    // Process the message through the regular message handler
    handleSendMessage(input);
    
    // Monitor for task completion
    const taskCheckInterval = setInterval(() => {
      const task = taskHandler.getTask(taskId);
      if (task && (task.status === 'completed' || task.status === 'failed')) {
        clearInterval(taskCheckInterval);
        
        // Add a response based on task outcome
        if (task.status === 'completed') {
          let responseContent = '';
          
          switch (task.type) {
            case 'search':
              responseContent = `I found ${task.result?.results?.length || 0} creators matching your criteria. Would you like to see their profiles or refine your search?`;
              break;
            case 'filter':
              responseContent = `I've filtered the results by ${task.result?.field}: ${task.result?.value}. Is there anything else you'd like to filter by?`;
              break;
            case 'contact':
              responseContent = `I've prepared a message to ${task.result?.kolId}. Would you like to review it before sending?`;
              break;
            default:
              responseContent = `I've processed your request. Is there anything else you'd like me to do?`;
          }
          
          // This will be handled by the existing message simulation flow
          setTimeout(() => {
            handleSendMessage(responseContent);
          }, 500);
        } else {
          // Handle failed tasks
          const errorMessage = `I'm sorry, I encountered an issue while processing your request: ${task.error}. Would you like to try again?`;
          setTimeout(() => {
            handleSendMessage(errorMessage);
          }, 500);
        }
      }
    }, 500);
  };

  // Set custom placeholder based on user role
  const getPlaceholderText = () => {
    if (!isAuthenticated) return "Sign in to save chat history...";
    if (user?.role === "kol") return "Ask about campaigns, opportunities...";
    if (user?.role === "brand") return "Ask about finding KOLs, campaigns...";
    return "Search, filter, or contact creators...";
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

  const handleClose = () => {
    if (onOpenChange) {
      onOpenChange(false);
    }
  };

  const renderChatContent = () => (
    <div className="flex flex-col h-full">
      <ChatAgentHeader 
        title={title} 
        subtitle={subtitle} 
        onClose={handleClose}
      />
      
      {/* Fixed height for the chat messages area - disabled auto-scroll */}
      <div className="flex-1 overflow-hidden relative" style={{ minHeight: "350px" }}>
        <ChatMessagesDisplay 
          messages={messages} 
          autoScroll={true} // Enable auto-scrolling for better UX
        />
      </div>
      
      <ChatAgentInput 
        onSendMessage={handleEnhancedSendMessage} 
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
        <SheetContent side="bottom" className="h-[85vh] p-0 rounded-t-xl border-t border-white/20 bg-gradient-to-b from-black/95 to-black/85 backdrop-blur-xl">
          {renderChatContent()}
        </SheetContent>
      </Sheet>
    );
  }
  
  // For desktop, use Dialog component to create a modal-like experience
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px] h-[70vh] p-0 bg-gradient-to-br from-black/90 to-black/70 backdrop-blur-xl border border-white/15 shadow-lg rounded-2xl overflow-hidden">
        <DialogTitle className="sr-only">{title}</DialogTitle>
        {renderChatContent()}
      </DialogContent>
    </Dialog>
  );
};
