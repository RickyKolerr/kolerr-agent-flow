
import React from "react";
import { ChatSidebar } from "./ChatSidebar";
import { ChatWindow } from "./ChatWindow";
import { DemoIndicator } from "@/components/demo/DemoIndicator";

export const ChatLayout: React.FC = () => {
  return (
    <div className="flex h-screen overflow-hidden bg-black/10 backdrop-blur-md">
      <DemoIndicator 
        section="Chat" 
        tooltip="This is a production-ready chat interface that will be connected to WebSockets." 
      />
      <ChatSidebar />
      <ChatWindow />
    </div>
  );
};
