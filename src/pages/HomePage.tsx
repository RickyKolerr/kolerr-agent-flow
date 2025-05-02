
import React from "react";
import { HeroSection } from "@/components/home/HeroSection";
import { FeatureCards } from "@/components/home/FeatureCards";
import { FloatingChatButton } from "@/components/chat/FloatingChatButton";

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col hero-gradient">
      <div className="container mx-auto px-4 py-16 max-w-7xl flex flex-col items-center justify-center flex-grow">
        <HeroSection />
        <FeatureCards />
      </div>
      
      <FloatingChatButton 
        initialMessage="👋 Hello! How can I assist you today?"
        chatType="general"
      />
    </div>
  );
};

export default HomePage;
