
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MessageCircle } from "lucide-react";
import { useUserAccess } from "@/hooks/useUserAccess";
import { toast } from "sonner";
import { CreditBadge } from "@/components/CreditBadge";
import { useCredits } from "@/contexts/CreditContext";
import { RESET_HOUR } from "@/constants/creditConstants";
import { getTimeUntilReset } from "@/utils/creditUtils";
import { FloatingChatButton } from "@/components/chat/FloatingChatButton";

const HomePage = () => {
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
    <div className="min-h-screen flex flex-col hero-gradient">
      <div className="container mx-auto px-4 py-16 max-w-7xl flex flex-col items-center justify-center flex-grow">
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
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
          <div className="glass-panel rounded-xl p-6 text-center">
            <div className="w-16 h-16 rounded-full bg-brand-pink/20 flex items-center justify-center mx-auto mb-4">
              <Search className="h-8 w-8 text-brand-pink" />
            </div>
            <h2 className="text-xl font-bold mb-3">AI-Powered Search</h2>
            <p className="text-muted-foreground">Find the perfect creators based on niche, audience, engagement, and more.</p>
          </div>
          
          <div className="glass-panel rounded-xl p-6 text-center">
            <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="h-8 w-8 text-blue-500" />
            </div>
            <h2 className="text-xl font-bold mb-3">Chat Assistant</h2>
            <p className="text-muted-foreground">Get recommendations and insights through our intuitive chat interface.</p>
          </div>
          
          <div className="glass-panel rounded-xl p-6 text-center">
            <div className="w-16 h-16 rounded-full bg-purple-500/20 flex items-center justify-center mx-auto mb-4">
              <svg className="h-8 w-8 text-purple-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 16V21M12 16L7 21M12 16L17 21M3 8L6.5 10L3 12L6.5 14L3 16L6.5 18L3 20L12 15L21 20L17.5 18L21 16L17.5 14L21 12L17.5 10L21 8L12 13L3 8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h2 className="text-xl font-bold mb-3">Analytics & Insights</h2>
            <p className="text-muted-foreground">Detailed analytics to help you make data-driven decisions.</p>
          </div>
        </div>
      </div>
      
      <FloatingChatButton 
        initialMessage="👋 Hello! How can I assist you today?"
        chatType="general"
      />
    </div>
  );
};

export default HomePage;
