
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { toast } from "sonner";
import { CreditBadge } from "@/components/CreditBadge";
import { useCredits } from "@/contexts/CreditContext";
import { useUserAccess } from "@/hooks/useUserAccess";
import { RESET_HOUR } from "@/constants/creditConstants";
import { getTimeUntilReset } from "@/utils/creditUtils";

export const HeroSection = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const { isAuthenticated } = useUserAccess();
  const { freeCredits, hasPremiumPlan } = useCredits();
  const [isVisible, setIsVisible] = useState(false);
  const [placeholderText, setPlaceholderText] = useState("Search for creators...");
  const placeholders = [
    "Search for creators by niche...",
    "Find influencers in beauty...",
    "Discover TikTok creators...",
    "Search for gaming influencers...",
    "Find creators by audience...",
  ];
  
  // Animation effects
  useEffect(() => {
    setIsVisible(true);
    
    // Rotate placeholder text
    let currentIndex = 0;
    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % placeholders.length;
      setPlaceholderText(placeholders[currentIndex]);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);
  
  const handleSearch = () => {
    if (searchQuery.trim() === "") return;
    
    if (!hasPremiumPlan && freeCredits === 0) {
      if (!isAuthenticated) {
        navigate("/login");
        return;
      }
      
      toast.error("Out of free searches", {
        description: `Upgrade your plan to continue searching or wait until ${RESET_HOUR}:00 AM for your credits to reset (${getTimeUntilReset()} remaining).`,
        action: {
          label: "Upgrade",
          onClick: () => navigate("/pricing")
        }
      });
      return;
    }

    // Navigate to search results
    navigate(`/search/results?q=${encodeURIComponent(searchQuery)}`);
  };
  
  return (
    <div className={`text-center max-w-3xl mx-auto mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'}`}>
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-brand-pink to-brand-orange bg-clip-text text-transparent animate-pulse-slow">
        Find the Perfect Influencers with AI
      </h1>
      <p className="text-xl md:text-2xl text-muted-foreground mb-8">
        Discover, analyze and manage TikTok creators for your brand campaigns
      </p>
      
      <div className="relative bg-black/40 backdrop-blur-md rounded-xl p-6 mb-6 border border-white/20 shadow-[0_0_15px_rgba(244,114,182,0.15)] hover:shadow-[0_0_25px_rgba(244,114,182,0.25)] transition-all duration-500">
        <div className="flex gap-2">
          <Input 
            placeholder={placeholderText}
            value={searchQuery} 
            onChange={e => setSearchQuery(e.target.value)}
            className="bg-black/60 border-white/10 focus:border-brand-pink/50 transition-all"
          />
          <Button 
            size="icon" 
            variant="secondary" 
            onClick={handleSearch}
            className="bg-brand-pink hover:bg-brand-pink/90 text-white transition-transform hover:scale-105"
          >
            <Search className="h-4 w-4" />
          </Button>
        </div>
        
        {!hasPremiumPlan && (
          <div className="mt-4 text-sm text-muted-foreground flex justify-between items-center">
            <span>{freeCredits} free {freeCredits === 1 ? 'search' : 'searches'} remaining</span>
            {isAuthenticated && <CreditBadge variant="compact" />}
          </div>
        )}
        
        {/* Animated background elements */}
        <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] opacity-20 blur-3xl bg-gradient-to-r from-brand-pink via-purple-500 to-blue-500 rounded-full animate-pulse-slow"></div>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button 
          size="lg" 
          onClick={() => navigate("/signup")}
          className="bg-brand-pink hover:bg-brand-pink/90 px-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:translate-y-[-2px] relative overflow-hidden action-button"
        >
          Get Started
        </Button>
        <Button 
          size="lg" 
          variant="outline" 
          onClick={() => navigate("/features")}
          className="border-white/20 hover:bg-white/10 shadow-lg hover:shadow-xl transition-all duration-300 hover:translate-y-[-2px]"
        >
          Learn More
        </Button>
      </div>
    </div>
  );
};
