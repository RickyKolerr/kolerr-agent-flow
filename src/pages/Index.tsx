
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sparkles, Rocket, Star, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useCredits } from "@/contexts/CreditContext";
import { useLanguage } from "@/contexts/LanguageContext";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { useFreeCredit, freeCredits, hasPremiumPlan } = useCredits();
  const { t } = useLanguage();

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
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-purple-900/20 to-black -z-10"></div>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] -z-10"></div>
      
      {/* Animated Gradient Orbs */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full blur-3xl opacity-20 animate-pulse delay-700"></div>

      <div className="container mx-auto px-4 py-12 md:py-0">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          {/* Hero Section */}
          <div className="space-y-6 animate-fade-in">
            <h1 className="text-4xl md:text-7xl font-bold tracking-tighter">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-400 to-cyan-500">
                {t('index.heroTitle')}
              </span>
              <br />
              <span className="text-white">{t('index.heroSubtitle')}</span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-300 max-w-xl mx-auto">
              {t('index.heroDescription')}
            </p>
          </div>

          {/* Search Section */}
          <div className="relative mt-8">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-4 rounded-2xl hover:border-pink-500/50 transition-colors duration-300 shadow-2xl">
              <div className="relative">
                <Input 
                  className="w-full bg-black/50 text-lg p-6 pl-12 rounded-xl border-white/10"
                  placeholder={t('index.searchPlaceholder')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
                <Sparkles className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-pink-500" />
              </div>
              
              <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-4 px-2">
                <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-pink-500 hover:text-pink-400 hover:bg-pink-500/10"
                    onClick={() => handleCategorySearch("top")}
                  >
                    <Star className="h-4 w-4 mr-2" />
                    {t('index.topCreators')}
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-pink-500 hover:text-pink-400 hover:bg-pink-500/10"
                    onClick={() => handleCategorySearch("trending")}
                  >
                    <Rocket className="h-4 w-4 mr-2" />
                    {t('index.trending')}
                  </Button>
                </div>
                <Button 
                  className="w-full md:w-auto bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-90 border-0"
                  onClick={handleSearch}
                >
                  <Search className="h-4 w-4 mr-2" />
                  {t('index.startDiscovering')}
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
