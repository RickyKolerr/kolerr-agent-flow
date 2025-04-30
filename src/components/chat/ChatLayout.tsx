
import React, { useState } from "react";
import { ChatSidebar } from "./ChatSidebar";
import { ChatWindow } from "./ChatWindow";
import { DemoIndicator } from "@/components/demo/DemoIndicator";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

export const ChatLayout: React.FC = () => {
  const isMobile = useIsMobile();
  const [showSidebar, setShowSidebar] = useState(true);
  
  // On mobile, default to showing the sidebar (conversations list)
  React.useEffect(() => {
    if (isMobile) {
      // If we have a conversation ID in the URL, don't show sidebar by default
      const hasConversationId = window.location.pathname.split('/').length > 2;
      setShowSidebar(!hasConversationId);
    } else {
      setShowSidebar(true);
    }
  }, [isMobile]);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-black/10 backdrop-blur-md">
      <DemoIndicator 
        section="Chat" 
        tooltip="This is a production-ready chat interface that will be connected to WebSockets." 
      />
      
      {/* Mobile back button - only show when viewing a conversation */}
      {isMobile && !showSidebar && (
        <Button 
          variant="ghost" 
          className="absolute top-4 left-4 z-10"
          onClick={toggleSidebar}
        >
          <ChevronLeft className="h-5 w-5 mr-1" />
          Back
        </Button>
      )}
      
      {/* Sidebar - show full width on mobile when active, hide when viewing conversation */}
      <div className={`${isMobile ? (showSidebar ? 'block w-full' : 'hidden') : 'block w-80 min-w-80'} transition-all duration-300`}>
        <ChatSidebar onConversationSelect={isMobile ? toggleSidebar : undefined} />
      </div>
      
      {/* Chat window - hide on mobile when showing the sidebar */}
      <div className={`flex-1 ${isMobile ? (showSidebar ? 'hidden' : 'block') : 'block'}`}>
        <ChatWindow onBackClick={isMobile ? toggleSidebar : undefined} />
      </div>
    </div>
  );
};
