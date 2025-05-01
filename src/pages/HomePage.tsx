
import { useState, useRef } from "react";
import { mockCreatorData } from "@/data/mockCreators";
import { useUserAccess } from "@/hooks/useUserAccess";
import { CreatorsGrid } from "@/components/home/CreatorCards";
import { HeroSection } from "@/components/home/HeroSection";
import { ChatSection } from "@/components/home/ChatSection";
import { useSearchHandler } from "@/components/home/SearchHandler";

const HomePage = () => {
  // Messages state for the chat
  const [messages, setMessages] = useState<Array<{
    id: string;
    type: "user" | "bot";
    content: string;
    isTyping?: boolean;
    isKOLSpecific?: boolean;
  }>>([{
    id: "welcome",
    type: "bot",
    content: "👋 Welcome to the world's first Influencer Marketing AI Agent! As a Strategic Partner of Global TikTok and Meta, Kolerr can help you quickly find creators all around the world for your campaigns. What type of influencers are you looking for today?",
    isTyping: true
  }]);

  // Reference for scrolling to the end of messages
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [shouldScrollToBottom, setShouldScrollToBottom] = useState(false);
  const { isAuthenticated } = useUserAccess();

  // Use the search handler hook to manage search-related state and functions
  const { 
    searchQuery, 
    setSearchQuery, 
    handleSearch, 
    getCreditUsageText,
    hasPremiumPlan,
    freeCredits
  } = useSearchHandler(messages, setMessages, setShouldScrollToBottom);

  // Filter and sort creators for different sections
  const topPerformers = mockCreatorData
    .sort((a, b) => b.followers - a.followers)
    .slice(0, 6);

  const trendingCreators = mockCreatorData
    .filter(creator => creator.trending)
    .slice(0, 6);

  const viralCreators = mockCreatorData
    .sort((a, b) => b.engagementRate - a.engagementRate)
    .slice(0, 6);

  // Using a fixed bottom padding to accommodate the floating chat
  const bottomSpacingClass = "pb-[500px]"; // Match the height of the floating chat

  return (
    <div className="min-h-screen flex flex-col home-container hero-gradient overflow-hidden">
      <div className="container mx-auto px-4 pt-8 pb-16 max-w-7xl w-full overflow-hidden">
        {/* Creator Cards Grid */}
        <CreatorsGrid 
          topPerformers={topPerformers}
          trendingCreators={trendingCreators}
          viralCreators={viralCreators}
        />

        {/* Hero Section with Search */}
        <HeroSection
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          handleSearch={handleSearch}
          getCreditUsageText={getCreditUsageText}
          isAuthenticated={isAuthenticated}
          hasPremiumPlan={hasPremiumPlan}
        />
      </div>
      
      {/* Chat Component - manages its own state */}
      <ChatSection />

      {/* Add fixed bottom padding to prevent content from being hidden behind floating chat */}
      <div className={bottomSpacingClass}></div>
    </div>
  );
};

export default HomePage;
