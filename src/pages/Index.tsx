
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sparkles, Rocket, Star, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useCredits } from "@/contexts/CreditContext";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { useFreeCredit, freeCredits, hasPremiumPlan } = useCredits();

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      toast.error("Please enter a search term");
      return;
    }

    // Check if the user has enough credits
    if (freeCredits > 0 || hasPremiumPlan) {
      // Use a credit for the search
      useFreeCredit();
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    } else {
      toast.error(
        "You've used all your free searches for today", 
        { 
          description: "Get more searches with a premium plan or wait until tomorrow for your credits to reset.",
          action: {
            label: "Upgrade",
            onClick: () => navigate("/pricing")
          }
        }
      );
    }
  };

  // Handle category quick searches
  const handleCategorySearch = (category) => {
    if (freeCredits > 0 || hasPremiumPlan) {
      useFreeCredit();
      navigate(`/search?category=${category}`);
    } else {
      toast.error(
        "You've used all your free searches for today", 
        { 
          description: "Get more searches with a premium plan or wait until tomorrow for your credits to reset.",
          action: {
            label: "Upgrade",
            onClick: () => navigate("/pricing")
          }
        }
      );
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center">
      {/* Background Effects */}
      <div className="absolute inset-0 hero-gradient -z-10"></div>
      <div className="absolute inset-0 bg-dot-pattern opacity-20"></div>
      
      {/* Animated Gradient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-pink/30 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/30 rounded-full blur-3xl animate-pulse delay-700"></div>

      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          {/* Hero Section */}
          <div className="space-y-4 animate-fade-in">
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter">
              <span className="text-gradient">Discover Your</span>
              <br />
              <span className="text-brand-pink">Perfect KOL</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground/80 max-w-xl mx-auto">
              Connect with TikTok creators that elevate your brand
            </p>
          </div>

          {/* Search Section */}
          <div className="relative mt-8">
            <div className="glass-panel p-2 hover:border-brand-pink/50 transition-colors duration-300">
              <div className="relative">
                <Input 
                  className="w-full bg-background/50 text-lg p-6 pl-12 rounded-md"
                  placeholder="Find your next TikTok star..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
                <Sparkles className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-brand-pink" />
              </div>
              
              <div className="flex items-center justify-between mt-4 px-2">
                <div className="flex gap-2">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-brand-pink hover:text-brand-pink/80"
                    onClick={() => handleCategorySearch("top")}
                  >
                    <Star className="h-4 w-4 mr-2" />
                    Top Creators
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-brand-pink hover:text-brand-pink/80"
                    onClick={() => handleCategorySearch("trending")}
                  >
                    <Rocket className="h-4 w-4 mr-2" />
                    Trending
                  </Button>
                </div>
                <Button 
                  className="bg-brand-pink hover:bg-brand-pink/90"
                  onClick={handleSearch}
                >
                  <Search className="h-4 w-4 mr-2" />
                  Start Discovering
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
