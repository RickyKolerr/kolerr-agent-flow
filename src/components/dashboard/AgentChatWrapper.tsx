
import React from "react";
import { AgentChat } from "@/components/chat/AgentChat";
import { useAuth } from "@/contexts/AuthContext";

export const AgentChatWrapper: React.FC = () => {
  const { user } = useAuth();
  const isKol = user?.role === 'kol';

  // Different configurations based on user role
  const chatConfig = isKol 
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
  
  return <AgentChat {...chatConfig} />;
};
