
import React, { useState } from "react";
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
    <div className="text-center max-w-3xl mx-auto mb-12">
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
        Find the Perfect Influencers with AI
      </h1>
      <p className="text-xl md:text-2xl text-muted-foreground mb-8">
        Discover, analyze and manage TikTok creators for your brand campaigns
      </p>
      
      <div className="bg-black/40 backdrop-blur-md rounded-xl p-6 mb-6 border border-white/10">
        <div className="flex gap-2">
          <Input 
            placeholder="Search for creators by niche, audience, or engagement..." 
            value={searchQuery} 
            onChange={e => setSearchQuery(e.target.value)}
            className="bg-black/60"
          />
          <Button size="icon" variant="secondary" onClick={handleSearch}>
            <Search className="h-4 w-4" />
          </Button>
        </div>
        
        {!hasPremiumPlan && (
          <div className="mt-4 text-sm text-muted-foreground flex justify-between items-center">
            <span>{freeCredits} free {freeCredits === 1 ? 'search' : 'searches'} remaining</span>
            {isAuthenticated && <CreditBadge variant="compact" />}
          </div>
        )}
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button 
          size="lg" 
          onClick={() => navigate("/signup")}
          className="bg-brand-pink hover:bg-brand-pink/90 px-8"
        >
          Get Started
        </Button>
        <Button 
          size="lg" 
          variant="outline" 
          onClick={() => navigate("/features")}
          className="border-white/20 hover:bg-white/10"
        >
          Learn More
        </Button>
      </div>
    </div>
  );
};
