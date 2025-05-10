import { useState, useRef, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Bot, User, ArrowRight, Sparkles, Star, MessageCircle, Users, FileText, BadgePercent, Eye, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useCredits } from "@/contexts/CreditContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { mockCreatorData } from "@/data/mockCreators";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getTimeUntilReset } from "@/hooks/useSearchCredits";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { WelcomeTour } from "@/components/onboarding/WelcomeTour";
import { DemoIndicator } from "@/components/demo/DemoIndicator";
import { useMobileDetection } from "@/hooks/use-mobile-detection";
import { useViewportFix } from "@/hooks/useViewportFix";

// Type definition for window object to avoid TypeScript errors
declare global {
  interface Window {
    navigateToCreator: (creatorId: string) => void;
    navigateToCampaign: (campaignId: string) => void;
    handleChatApply: (campaignId: string) => void;
  }
}

interface Message {
  id: string;
  type: "user" | "bot";
  content: string;
}

// Mock campaigns data for KOLs - using memoized data to reduce memory usage
const mockCampaigns = [
  {
    id: "c1",
    title: "Summer Fashion Collection",
    brand: "StyleCo",
    brandLogo: "https://ui-avatars.com/api/?name=StyleCo&background=0D8ABC&color=fff",
    budget: "$500-1000",
    deadline: "July 15, 2023",
    compatibility: 95,
    categories: ["fashion", "lifestyle"],
    description: "Looking for fashion creators to showcase our summer collection"
  },
  {
    id: "c2",
    title: "Gaming Peripherals Review",
    brand: "TechGear",
    brandLogo: "https://ui-avatars.com/api/?name=TechGear&background=9C27B0&color=fff",
    budget: "$300-600",
    deadline: "July 20, 2023",
    compatibility: 75,
    categories: ["tech", "gaming"],
    description: "Tech reviewers needed for our new gaming peripherals"
  },
  {
    id: "c3",
    title: "Vegan Food Challenge",
    brand: "GreenEats",
    brandLogo: "https://ui-avatars.com/api/?name=GreenEats&background=4CAF50&color=fff",
    budget: "$200-400",
    deadline: "July 25, 2023",
    compatibility: 88,
    categories: ["food", "lifestyle"],
    description: "Food creators to try our vegan meal kits"
  }
];

// Limit brands data to 10 instead of 20 to reduce memory usage
const mockBrands = [
  {
    id: "b1",
    name: "Nike",
    logo: "https://cdn.freebiesupply.com/logos/large/2x/nike-4-logo-png-transparent.png",
    industry: "Sports & Apparel",
    campaignTypes: ["Product Launch", "Influencer Endorsement", "Sports Events"],
    budget: "$5,000-25,000",
    popularity: 98
  },
  {
    id: "b2",
    name: "Apple",
    logo: "https://cdn.freebiesupply.com/logos/large/2x/apple-logo-png-transparent.png",
    industry: "Technology",
    campaignTypes: ["Product Reviews", "Tech Tutorials", "Unboxing Videos"],
    budget: "$10,000-50,000",
    popularity: 99
  },
  {
    id: "b3",
    name: "Coca-Cola",
    logo: "https://cdn.freebiesupply.com/logos/large/2x/coca-cola-logo-png-transparent.png",
    industry: "Beverages",
    campaignTypes: ["Lifestyle Content", "Holiday Campaigns", "Summer Promos"],
    budget: "$3,000-20,000",
    popularity: 95
  },
  {
    id: "b4",
    name: "Amazon",
    logo: "https://cdn.freebiesupply.com/logos/large/2x/amazon-dark-logo-png-transparent.png",
    industry: "E-Commerce",
    campaignTypes: ["Product Reviews", "Unboxing", "Prime Day Promotions"],
    budget: "$2,500-15,000",
    popularity: 97
  },
  {
    id: "b5",
    name: "Google",
    logo: "https://cdn.freebiesupply.com/logos/large/2x/google-logo-png-transparent.png",
    industry: "Technology",
    campaignTypes: ["Tech Reviews", "How-To Content", "Product Tutorials"],
    budget: "$8,000-30,000",
    popularity: 96
  },
  {
    id: "b6",
    name: "Samsung",
    logo: "https://cdn.freebiesupply.com/logos/large/2x/samsung-logo-png-transparent.png",
    industry: "Technology",
    campaignTypes: ["Product Reviews", "Tech Comparisons", "Lifestyle Tech"],
    budget: "$5,000-25,000",
    popularity: 94
  },
  {
    id: "b7",
    name: "Adidas",
    logo: "https://cdn.freebiesupply.com/logos/large/2x/adidas-logo-png-transparent.png",
    industry: "Sports & Apparel",
    campaignTypes: ["Athletic Endorsements", "Fitness Content", "Product Launches"],
    budget: "$4,000-20,000",
    popularity: 93
  },
  {
    id: "b8",
    name: "Microsoft",
    logo: "https://cdn.freebiesupply.com/logos/large/2x/microsoft-logo-png-transparent.png",
    industry: "Technology",
    campaignTypes: ["Software Reviews", "Productivity Tips", "Gaming Content"],
    budget: "$6,000-35,000",
    popularity: 92
  },
  {
    id: "b9",
    name: "Disney",
    logo: "https://cdn.freebiesupply.com/logos/large/2x/disney-logo-png-transparent.png",
    industry: "Entertainment",
    campaignTypes: ["Family Content", "Travel", "Movie Promotions"],
    budget: "$7,000-40,000",
    popularity: 95
  },
  {
    id: "b10",
    name: "Netflix",
    logo: "https://cdn.freebiesupply.com/logos/large/2x/netflix-logo-png-transparent.png",
    industry: "Entertainment",
    campaignTypes: ["Show Reviews", "Watch Parties", "Premiere Events"],
    budget: "$5,000-30,000",
    popularity: 96
  }
];

// Mock KOL statistics
const kolStats = {
  avgEarnings: "$450",
  availableCampaigns: 124,
  avgCompletionTime: "3 days",
  topEarningNiche: "Tech",
  topEarningAmount: "$1,200"
};

const Index = () => {
  const navigate = useNavigate();
  const { useFreeCredit, freeCredits, hasPremiumPlan } = useCredits();
  const { t } = useLanguage();
  const { user, isAuthenticated } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [showWelcome, setShowWelcome] = useState(true);
  const [activeCarouselIndex, setActiveCarouselIndex] = useState(0);
  const [userView, setUserView] = useState<"brand" | "kol">("brand");
  const [applyingTo, setApplyingTo] = useState<string | null>(null);
  const [shouldScrollToBottom, setShouldScrollToBottom] = useState(false);
  const { isMobile, hasTouch } = useMobileDetection();
  
  // Apply viewport fixes for mobile devices
  useViewportFix();

  // Use memoized data to avoid recreating these on each render
  const trendingCreators = useMemo(() => mockCreatorData
    .filter(creator => creator.trending)
    .slice(0, 3), []);

  const allCreators = useMemo(() => mockCreatorData.slice(0, 10), []);
  
  // Optimize carousel options with useRef to avoid recreation on each render
  // Fix the 'align' type issue by using a valid enum value
  const carouselOptions = useMemo(() => ({
    align: "start" as const, 
    loop: true,
    dragFree: false,
    skipSnaps: false,
    inViewThreshold: 0.6,
    duration: 30,
  }), []);
  
  // Detect user role and set initial view
  useEffect(() => {
    if (isAuthenticated && user?.role === "kol") {
      setUserView("kol");
    }
  }, [isAuthenticated, user]);
  
  useEffect(() => {
    if (showWelcome) {
      const timeoutId = setTimeout(() => {
        const welcomeMessage = userView === "brand" 
          ? "👋 Need creators for your campaign? Tell me what you're looking for."
          : "👋 Looking for paid opportunities? Let me help you find the right match!";
        
        setMessages([{
          id: "welcome",
          type: "bot",
          content: welcomeMessage
        }]);
        setShowWelcome(false);
      }, 500);
      return () => clearTimeout(timeoutId);
    }
  }, [showWelcome, userView]);
  
  // If user toggles view, reset welcome message
  useEffect(() => {
    setShowWelcome(true);
    // Clear old messages to reduce memory usage
    setMessages([]);
  }, [userView]);
  
  // Modified scroll effect to only scroll when shouldScrollToBottom is true
  useEffect(() => {
    if (messagesEndRef.current && shouldScrollToBottom) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
      // Reset the flag after scrolling
      setShouldScrollToBottom(false);
    }
  }, [messages, shouldScrollToBottom]);
  
  // Add global functions for chat and navigation in a safe way with cleanup
  useEffect(() => {
    // Safely define the global functions
    window.navigateToCreator = (creatorId) => {
      navigate(`/creators/${creatorId}`);
    };
    
    window.navigateToCampaign = (campaignId) => {
      navigate(`/campaigns/${campaignId}`);
    };
    
    window.handleChatApply = (campaignId) => {
      // Check if user is authenticated
      if (!isAuthenticated) {
        toast.info("Please sign in to apply for this campaign");
        navigate(`/login?redirect=/campaigns/${campaignId}&action=apply`);
        return;
      }
      
      // Check if user has completed their profile
      if (user && (!user.onboardingStatus || user.onboardingStatus === "incomplete")) {
        toast.info("Please complete your profile before applying to campaigns");
        navigate(`/onboarding/${user.role}`);
        return;
      }
      
      // Simulate API call delay
      setApplyingTo(campaignId);
      
      setTimeout(() => {
        toast.success("Your application has been submitted", {
          description: "The brand will review your application shortly."
        });
        setApplyingTo(null);
      }, 1000);
    };
    
    // Cleanup function to remove global functions when component unmounts
    return () => {
      window.navigateToCreator = undefined;
      window.navigateToCampaign = undefined;
      window.handleChatApply = undefined;
    };
  }, [navigate, isAuthenticated, user]);
  
  const handleSearch = () => {
    if (!searchQuery.trim()) {
      toast.error("Please enter a search term");
      return;
    }
    
    if (freeCredits > 0 || hasPremiumPlan) {
      // Create a more memory-efficient copy of the searchQuery
      const query = searchQuery.trim();
      
      const userMessage: Message = {
        id: Date.now().toString(),
        type: "user",
        content: `Search for: ${query}`
      };
      
      setMessages(prev => {
        // Only keep the last 10 messages to avoid memory issues
        const updatedMessages = [...prev, userMessage];
        return updatedMessages.slice(-10);
      });
      
      setShouldScrollToBottom(true);
      useFreeCredit();
      
      const timeoutId = setTimeout(() => {
        const botResponse: Message = {
          id: (Date.now() + 1).toString(),
          type: "bot",
          content: userView === "brand" 
            ? `Searching for creators matching "${query}"...` 
            : `Searching for campaigns matching "${query}"...`
        };
        
        setMessages(prev => {
          // Only keep the last 10 messages to avoid memory issues
          const updatedMessages = [...prev, botResponse];
          return updatedMessages.slice(-10);
        });
        
        setShouldScrollToBottom(true);
        
        const navigateTimeoutId = setTimeout(() => {
          if (userView === "brand") {
            navigate(`/search?q=${encodeURIComponent(query)}`);
          } else {
            navigate(`/dashboard/kol/campaigns`);
          }
        }, 1000);
        
        return () => clearTimeout(navigateTimeoutId);
      }, 500);
      
      return () => clearTimeout(timeoutId);
    } else {
      toast.error(
        "You've used all your free searches for today", 
        { 
          description: `Get more searches with a premium plan or wait until tomorrow at 7:00 AM for your credits to reset (${getTimeUntilReset()} remaining).`,
          action: {
            label: "Upgrade",
            onClick: () => navigate("/pricing")
          }
        }
      );
    }
  };
  
  // Optimized message sending function
  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    
    // Create a more memory-efficient copy of the input
    const input = inputValue.trim();
    
    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: input
    };
    
    setMessages(prev => {
      // Only keep the last 10 messages to avoid memory issues
      const updatedMessages = [...prev, userMessage];
      return updatedMessages.slice(-10);
    });
    
    setInputValue("");
    setShouldScrollToBottom(true);
    
    if (!hasPremiumPlan && freeCredits === 0) {
      const timeoutId = setTimeout(() => {
        const botResponse: Message = {
          id: (Date.now() + 1).toString(),
          type: "bot",
          content: "You've used all your free searches for today. Upgrade to our premium plan to continue accessing our AI agent, or wait until 7:00 AM tomorrow for your credits to reset."
        };
        
        setMessages(prev => {
          // Only keep the last 10 messages to avoid memory issues
          const updatedMessages = [...prev, botResponse];
          return updatedMessages.slice(-10);
        });
        
        setShouldScrollToBottom(true);
      }, 500);
      
      return () => clearTimeout(timeoutId);
    }
    
    if (!hasPremiumPlan) {
      useFreeCredit();
    }
    
    // Convert to lowercase only once
    const lowerInput = input.toLowerCase();
    
    const timeoutId = setTimeout(() => {
      let responseContent = "";
      
      if (userView === "brand") {
        // Brand-focused response logic
        if (lowerInput.includes("find") || lowerInput.includes("search") || lowerInput.includes("looking for")) {
          responseContent = `Great! I can help you find creators. Here are some matching your description: ${getCreatorSuggestions(lowerInput)}`;
        } else if (lowerInput.includes("price") || lowerInput.includes("cost") || lowerInput.includes("plan")) {
          responseContent = "We offer flexible pricing plans starting at $99/month with unlimited searches. Would you like to see our pricing details?";
        } else if (lowerInput.includes("hello") || lowerInput.includes("hi ") || lowerInput.includes("hey")) {
          responseContent = "Hello! I'm your AI assistant for finding TikTok creators. How can I help you today? You can ask me to find creators in specific niches, with certain follower counts, or for particular marketing goals.";
        } else {
          responseContent = "Thanks for your message! To help you better, could you tell me what type of creators you're looking for? For example, beauty influencers with 100K+ followers or gaming creators with high engagement rates.";
        }
      } else {
        // KOL-focused response logic
        if (lowerInput.includes("find") || lowerInput.includes("campaign") || lowerInput.includes("work") || lowerInput.includes("make money")) {
          responseContent = `I can help you find paid campaigns! Here are some opportunities that might interest you: ${getCampaignSuggestions(lowerInput)}`;
        } else if (lowerInput.includes("pay") || lowerInput.includes("earn") || lowerInput.includes("money")) {
          responseContent = `Our creators earn an average of ${kolStats.avgEarnings} per campaign, with top earners making over ${kolStats.topEarningAmount} in the ${kolStats.topEarningNiche} niche. Would you like me to find high-paying opportunities for you?`;
        } else if (lowerInput.includes("hello") || lowerInput.includes("hi ") || lowerInput.includes("hey")) {
          responseContent = "Hello! I'm your AI assistant for finding paid brand campaigns. How can I help you today? You can ask me about available campaigns, payment rates, or specific brands looking for creators like you.";
        } else {
          responseContent = "Thanks for your message! To help you find the best opportunities, could you tell me what type of campaigns you're interested in? For example, fashion brand partnerships, tech product reviews, or food promotions.";
        }
      }
      
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: "bot",
        content: responseContent
      };
      
      setMessages(prev => {
        // Only keep the last 10 messages to avoid memory issues
        const updatedMessages = [...prev, botResponse];
        return updatedMessages.slice(-10);
      });
      
      setShouldScrollToBottom(true);
    }, 800);
    
    return () => clearTimeout(timeoutId);
  };
  
  // Optimized creator suggestions function
  const getCreatorSuggestions = (input: string) => {
    // Use a new array to avoid modifying the original
    let filteredCreators = [];
    
    const niches = ["beauty", "fashion", "gaming", "tech", "travel", "fitness", "food", "lifestyle"];
    const mentionedNiches = niches.filter(niche => input.includes(niche));
    
    // Only filter if needed
    if (mentionedNiches.length > 0) {
      filteredCreators = allCreators.filter(creator => 
        creator.niche.some(niche => 
          mentionedNiches.some(mentionedNiche => 
            niche.toLowerCase().includes(mentionedNiche)
          )
        )
      );
    } else {
      // Use first 3 creators if no specific niche mentioned
      filteredCreators = allCreators.slice(0, 3);
    }
    
    const suggestions = filteredCreators.slice(0, 3);
    
    if (suggestions.length === 0) {
      return "I couldn't find creators matching that exact description. Try a broader search or different keywords.";
    }
    
    // Build HTML string without complex nesting
    let htmlContent = '<div class="mt-2 space-y-2">';
    
    for (let i = 0; i < suggestions.length; i++) {
      const creator = suggestions[i];
      htmlContent += `<div class="flex items-center gap-2 p-2 bg-black/20 rounded-lg">
        <div class="w-8 h-8 bg-gray-200 rounded-full overflow-hidden">
          <img src="${creator.avatar}" alt="${creator.fullName}" class="w-full h-full object-cover" />
        </div>
        <div class="flex-1">
          <div class="font-medium">${creator.fullName}</div>
          <div class="text-xs text-gray-500">${(creator.followers / 1000000).toFixed(1)}M followers</div>
        </div>
        <div class="ml-2">
          <button 
            onclick="window.navigateToCreator('${creator.id}')" 
            class="text-xs bg-brand-pink hover:bg-brand-pink/90 text-white px-3 py-1 rounded"
          >View Profile</button>
        </div>
      </div>`;
    }
    
    htmlContent += '</div>';
    return htmlContent;
  };
  
  // Optimized campaign suggestions function
  const getCampaignSuggestions = (input: string) => {
    const niches = ["beauty", "fashion", "gaming", "tech", "travel", "fitness", "food", "lifestyle"];
    const mentionedNiches = niches.filter(niche => input.includes(niche));
    
    // Filter campaigns - use a new array to avoid modifying the original
    let filteredCampaigns = [];
    
    if (mentionedNiches.length > 0) {
      filteredCampaigns = mockCampaigns.filter(campaign => 
        campaign.categories.some(category => 
          mentionedNiches.some(mentionedNiche => 
            category.toLowerCase().includes(mentionedNiche)
          )
        )
      );
    } else {
      // Use all campaigns if no specific niche mentioned
      filteredCampaigns = mockCampaigns;
    }
    
    // Take only first 3 campaigns for suggestions
    const suggestions = filteredCampaigns.slice(0, 3);
    
    if (suggestions.length === 0) {
      return "I couldn't find campaigns matching your interests. Try different keywords or check our available campaigns section.";
    }
    
    // Build HTML string without complex nesting
    let htmlContent = '<div class="mt-2 space-y-2">';
    
    for (let i = 0; i < suggestions.length; i++) {
      const campaign = suggestions[i];
      htmlContent += `<div class="flex items-center gap-2 p-2 bg-black/20 rounded-lg">
        <div class="w-8 h-8 bg-gray-200 rounded-full overflow-hidden">
          <img src="${campaign.brandLogo}" alt="${campaign.brand}" class="w-full h-full object-cover" />
        </div>
        <div class="flex-1">
          <div class="font-medium">${campaign.title}</div>
          <div class="text-xs text-gray-500">${campaign.budget} • ${campaign.deadline}</div>
        </div>
        <div class="flex gap-2">
          <button 
            onclick="window.navigateToCampaign('${campaign.id}')" 
            class="text-xs bg-brand-navy hover:bg-brand-navy/80 text-white px-3 py-1 rounded-md flex items-center gap-1"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
              <circle cx="12" cy="12" r="3"></circle>
            </svg>
            View
          </button>
          <button 
            onclick="window.handleChatApply('${campaign.id}')" 
            class="text-xs bg-brand-pink hover:bg-brand-pink/90 text-white px-3 py-1 rounded-md flex items-center gap-1"
            ${applyingTo === campaign.id ? 'disabled' : ''}
          >
            ${applyingTo === campaign.id ? 
              `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="animate-spin">
                <path d="M21 12a9 9 0 1 1-6.219-8.56"></path>
              </svg>
              Applying...` : 
              'Apply'
            }
          </button>
        </div>
      </div>`;
    }
    
    htmlContent += '</div>';
    return htmlContent;
  };
  
  // Handle image loading errors
  const handleImageError = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    // Replace with a default placeholder when logo fails to load
    event.currentTarget.src = "https://ui-avatars.com/api/?name=Brand&background=0D8ABC&color=fff";
  };

  // Updated search categories for brands
  const brandSearchCategories = [
    { label: "fashion", onClick: () => { setSearchQuery("fashion"); handleSearch(); } },
    { label: "beauty", onClick: () => { setSearchQuery("beauty"); handleSearch(); } },
    { label: "tech", onClick: () => { setSearchQuery("tech"); handleSearch(); } },
    { label: "lifestyle", onClick: () => { setSearchQuery("lifestyle"); handleSearch(); } },
    { label: "gaming", onClick: () => { setSearchQuery("gaming"); handleSearch(); } },
    { label: "fitness", onClick: () => { setSearchQuery("fitness"); handleSearch(); } }
  ];

  // Updated search categories for KOLs
  const kolSearchCategories = [
    { label: "high paying", onClick: () => { setSearchQuery("high paying"); handleSearch(); } },
    { label: "easy to complete", onClick: () => { setSearchQuery("easy to complete"); handleSearch(); } },
    { label: "urgent", onClick: () => { setSearchQuery("urgent"); handleSearch(); } },
    { label: "long term", onClick: () => { setSearchQuery("long term"); handleSearch(); } },
    { label: "product reviews", onClick: () => { setSearchQuery("product reviews"); handleSearch(); } },
    { label: "sponsored posts", onClick: () => { setSearchQuery("sponsored posts"); handleSearch(); } }
  ];

  // Updated chatbot suggestions for brands
  const brandChatSuggestions = [
    { label: "Beauty influencers", query: "Find beauty influencers with high engagement" },
    { label: "Gaming creators", query: "Find gaming creators under 100K followers" },
    { label: "Tech reviewers", query: "Find tech reviewers with good conversion rates" },
    { label: "Fashion KOLs", query: "Find fashion KOLs in Asia region" }
  ];

  // Updated chatbot suggestions for KOLs
  const kolChatSuggestions = [
    { label: "Fashion campaigns", query: "Find fashion campaigns that pay well" },
    { label: "Tech earnings", query: "How much can I earn on tech reviews?" },
    { label: "Quick gigs", query: "Find quick campaign opportunities this month" },
    { label: "Brand partnerships", query: "How to get more long-term brand partnerships?" }
  ];

  // Memory-optimized rendering
  const renderCarouselContent = () => {
    const items = userView === "brand" 
      ? allCreators.map((creator) => (
          <CarouselItem 
            key={creator.id} 
            className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/6"
          >
            <div className="p-1">
              <div 
                className="overflow-hidden rounded-full aspect-square border border-white/10 bg-black/20 hover:scale-105 transition-all duration-300 cursor-pointer"
                onClick={() => navigate(`/creators/${creator.id}`)}
              >
                <img
                  src={creator.avatar}
                  alt={creator.fullName}
                  onError={handleImageError}
                  className="h-full w-full object-cover"
                  loading="lazy" // Add lazy loading
                />
              </div>
              <div className="text-center mt-3">
                <p className="font-medium">{creator.fullName}</p>
                <p className="text-xs text-gray-400">{(creator.followers / 1000000).toFixed(1)}M followers</p>
              </div>
            </div>
          </CarouselItem>
        ))
      : mockBrands.map((brand) => (
          <CarouselItem 
            key={brand.id} 
            className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/6"
          >
            <div className="p-1">
              <div 
                className="overflow-hidden rounded-lg aspect-square border border-white/10 bg-white hover:scale-105 transition-all duration-300 cursor-pointer flex items-center justify-center p-4"
                onClick={() => navigate(isAuthenticated ? `/dashboard/kol/campaigns` : '/signup')}
              >
                <img
                  src={brand.logo}
                  alt={brand.name}
                  onError={handleImageError}
                  className="h-full w-full object-contain"
                  loading="lazy" // Add lazy loading
                />
              </div>
              <div className="text-center mt-3">
                <p className="font-medium">{brand.name}</p>
                <p className="text-xs text-gray-400">{brand.industry}</p>
                <Badge className="mt-1 bg-brand-pink/40 text-xs">{brand.campaignTypes[0]}</Badge>
              </div>
            </div>
          </CarouselItem>
        ));

    return (
      <CarouselContent>
        {items}
      </CarouselContent>
    );
  };

  return (
    <div className="min-h-screen flex flex-col overflow-y-auto overflow-x-hidden hero-gradient pt-16 pb-16">
      {/* Show the welcome tour */}
      <WelcomeTour />
      
      <div className="absolute inset-0 bg-gradient-to-br from-black via-purple-900/20 to-black -z-10"></div>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] -z-10"></div>
      
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full blur-3xl opacity-20"></div>
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full blur-3xl opacity-20"></div>
      
      <div className="container mx-auto px-4 py-6 flex-1 flex flex-col max-w-full">
        {!isAuthenticated && (
          <div className="flex justify-center mb-8">
            <Tabs 
              defaultValue="brand" 
              value={userView} 
              onValueChange={(value) => setUserView(value as "brand" | "kol")} 
              className="w-full max-w-md"
            >
              <TabsList className={`grid grid-cols-2 w-full ${isMobile ? 'h-14' : ''}`}>
                <TabsTrigger 
                  value="brand"
                  className={`${isMobile ? 'py-4 text-base touch-manipulation' : ''}`}
                  style={isMobile ? { touchAction: 'manipulation' } : {}}
                  aria-label="For Brands tab"
                >
                  For Brands
                </TabsTrigger>
                <TabsTrigger 
                  value="kol"
                  className={`${isMobile ? 'py-4 text-base touch-manipulation' : ''}`}
                  style={isMobile ? { touchAction: 'manipulation' } : {}}
                  aria-label="For Creators tab"
                >
                  For Creators
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        )}

        <div className="flex-1 flex flex-col md:flex-row gap-6 items-start w-full">
          <div className="w-full md:w-2/3 bg-black/40 backdrop-blur-md rounded-xl border border-white/10 shadow-2xl flex flex-col overflow-hidden h-[65vh] max-h-[700px] ai-chat-container">
            <div className="bg-gradient-to-r from-brand-magenta/80 to-brand-purple/80 p-4 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-brand-magenta flex items-center justify-center mr-3">
                  <Bot className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h1 className="font-semibold text-lg">
                    {userView === "brand" ? "Influencer AI Agent" : "Campaign Finder AI"}
                  </h1>
                  <p className="text-xs text-gray-200">
                    {hasPremiumPlan 
                      ? "Premium plan active" 
                      : `${freeCredits} free searches remaining today`}
                  </p>
                </div>
              </div>
            </div>
            
            <ScrollArea className="flex-1 p-4 space-y-4">
              {messages.map(message => (
                <div 
                  key={message.id} 
                  className={`flex ${message.type === "user" ? "justify-end" : "justify-start"} animate-fade-in`}
                >
                  {message.type === "bot" && (
                    <div className="h-8 w-8 rounded-full bg-brand-purple flex items-center justify-center mr-3 flex-shrink-0">
                      <Bot className="h-4 w-4 text-white" />
                    </div>
                  )}
                  
                  <div 
                    className={`p-3 rounded-lg max-w-[80%] ${
                      message.type === "user" 
                        ? "bg-brand-navy text-white" 
                        : "bg-black/60 border border-white/10"
                    }`}
                    dangerouslySetInnerHTML={{ __html: message.content }}
                  ></div>
                  
                  {message.type === "user" && (
                    <div className="h-8 w-8 rounded-full bg-gray-700 flex items-center justify-center ml-3 flex-shrink-0">
                      <User className="h-4 w-4 text-white" />
                    </div>
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </ScrollArea>
            
            <div className="p-4 border-t border-white/10 bg-black/60">
              <div className="flex gap-2">
                <Input 
                  placeholder={userView === "brand" 
                    ? "Ask about specific creators, niches or requirements..." 
                    : "Ask about available campaigns, earnings, or opportunities..."}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  className="bg-black/60 border-white/10"
                />
                <Button onClick={handleSendMessage} className="bg-brand-magenta hover:bg-brand-magenta/90">
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-2">
                {userView === "brand" ? (
                  <>
                    {brandChatSuggestions.map((suggestion, index) => (
                      <Button 
                        key={index}
                        variant="outline" 
                        size="sm" 
                        onClick={() => setInputValue(suggestion.query)}
                        className="text-xs bg-black/60 border-white/10 truncate"
                      >
                        <Sparkles className="h-3 w-3 mr-1 text-brand-magenta" />
                        {suggestion.label}
                      </Button>
                    ))}
                  </>
                ) : (
                  <>
                    {kolChatSuggestions.map((suggestion, index) => (
                      <Button 
                        key={index}
                        variant="outline" 
                        size="sm" 
                        onClick={() => setInputValue(suggestion.query)}
                        className="text-xs bg-black/60 border-white/10 truncate"
                      >
                        <Sparkles className="h-3 w-3 mr-1 text-brand-magenta" />
                        {suggestion.label}
                      </Button>
                    ))}
                  </>
                )}
              </div>
            </div>
          </div>
          
          <div className="w-full md:w-1/3 flex flex-col gap-4">
            <Card className="bg-black/40 backdrop-blur-md border border-white/10 shadow-lg">
              <CardContent className="p-4">
                <h2 className="text-xl font-semibold mb-3">Quick Search</h2>
                <div className="space-y-3">
                  <div className="flex gap-2">
                    <Input 
                      placeholder={userView === "brand" ? "Search for creators or niches..." : "Search for campaigns..."}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                      className="bg-black/60 border-white/10"
                    />
                    <Button onClick={handleSearch} className="bg-brand-magenta hover:bg-brand-magenta/90">
                      <Search className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 max-h-24 overflow-y-auto scrollbar-none">
                    {userView === "brand" ? (
                      <>
                        {brandSearchCategories.map((category, index) => (
                          <Badge 
                            key={index}
                            variant="outline" 
                            className="cursor-pointer bg-black/60 hover:bg-black/80"
                            onClick={category.onClick}
                          >
                            {category.label}
                          </Badge>
                        ))}
                      </>
                    ) : (
                      <>
                        {kolSearchCategories.map((category, index) => (
                          <Badge 
                            key={index}
                            variant="outline" 
                            className="cursor-pointer bg-black/60 hover:bg-black/80"
                            onClick={category.onClick}
                          >
                            {category.label}
                          </Badge>
                        ))}
                      </>
                    )}
                  </div>
                  
                  <div className="text-xs text-muted-foreground">
                    {hasPremiumPlan ? 
                      'Premium plan: Unlimited searches' : 
                      `Free tier: ${freeCredits}/5 searches remaining`
                    }
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Display trending creators or campaigns card */}
            {userView === "brand" ? (
              <Card className="bg-black/40 backdrop-blur-md border border-white/10 shadow-lg">
                <CardContent className="p-4">
                  <h2 className="text-xl font-semibold mb-3 flex items-center">
                    <Star className="h-4 w-4 text-brand-purple mr-2" />
                    Trending Creators
                  </h2>
                  
                  <div className="space-y-3">
                    {trendingCreators.map(creator => (
                      <div key={creator.id} className="flex items-center gap-3 p-2 hover:bg-black/60 rounded-lg cursor-pointer transition-colors" onClick={() => navigate(`/creators/${creator.id}`)}>
                        <Avatar className="h-10 w-10">
                          <img 
                            src={creator.avatar} 
                            alt={creator.fullName} 
                            className="object-cover"
                            loading="lazy" 
                          />
                        </Avatar>
                        <div className="flex-1">
                          <div className="font-medium">{creator.fullName}</div>
                          <div className="text-xs text-gray-400">
                            {(creator.followers / 1000000).toFixed(1)}M followers
                          </div>
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          {creator.niche[0]}
                        </Badge>
                      </div>
                    ))}
                    
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full mt-2 border-white/10 bg-black/60 hover:bg-black/80"
                      onClick={() => navigate('/search?category=trending')}
                    >
                      <MessageCircle className="h-3 w-3 mr-1 text-brand-purple" />
                      View All Trending
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="bg-black/40 backdrop-blur-md border border-white/10 shadow-lg">
                <CardContent className="p-4">
                  <h2 className="text-xl font-semibold mb-3 flex items-center">
                    <FileText className="h-4 w-4 text-brand-purple mr-2" />
                    Hot Campaigns
                  </h2>
                  
                  <div className="space-y-3">
                    {mockCampaigns.map(campaign => (
                      <div 
                        key={campaign.id} 
                        className="flex items-center gap-3 p-2 hover:bg-black/60 rounded-lg cursor-pointer transition-colors" 
                        onClick={() => navigate(isAuthenticated ? `/dashboard/kol/campaigns` : '/signup')}
                      >
                        <Avatar className="h-10 w-10">
                          <img 
                            src={campaign.brandLogo} 
                            alt={campaign.brand} 
                            className="object-cover" 
                            loading="lazy"
                          />
                        </Avatar>
                        <div className="flex-1">
                          <div className="font-medium">{campaign.title}</div>
                          <div className="text-xs text-gray-400">
                            {campaign.budget} • Deadline: {campaign.deadline}
                          </div>
                        </div>
                        <Badge 
                          variant="secondary" 
                          className={`text-xs ${campaign.compatibility > 90 ? 'bg-green-500/20 text-green-300' : ''}`}
                        >
                          {campaign.compatibility}% match
                        </Badge>
                      </div>
                    ))}
                    
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full mt-2 border-white/10 bg-black/60 hover:bg-black/80"
                      onClick={() => navigate(isAuthenticated ? `/dashboard/kol/campaigns` : '/signup')}
                    >
                      <FileText className="h-3 w-3 mr-1 text-brand-purple" />
                      Browse All Campaigns
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
            
            {/* CTA Card */}
            <Card className="bg-gradient-to-r from-brand-purple/80 to-brand-purple/40 backdrop-blur-md border-none shadow-xl">
              <CardContent className="p-4">
                <h3 className="text-lg font-bold text-white mb-2">
                  {userView === "brand" ? "Unlock Full Access" : "Start Earning Today"}
                </h3>
                <p className="text-sm text-white/90 mb-3">
                  {userView === "brand" 
                    ? "Get unlimited AI searches, advanced analytics, and creator booking tools." 
                    : `Join ${mockCampaigns.length}+ creators earning an average of ${kolStats.avgEarnings} per campaign.`
                  }
                </p>
                <Button 
                  className="w-full bg-white text-brand-purple hover:bg-white/90" 
                  onClick={() => navigate("/signup")}
                >
                  {userView === "brand" ? "Get Started" : "Create Creator Account"}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* KOL Earning Statistics Section - Only visible for "kol" view */}
        {userView === "kol" && (
          <div className="mt-10 mb-12 bg-black/40 backdrop-blur-md rounded-xl border border-white/10 p-6 shadow-2xl">
            <div className="flex items-center mb-5">
              <BadgePercent className="h-5 w-5 text-brand-purple mr-2" />
              <h2 className="text-xl font-semibold">Creator Earnings & Opportunities</h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="bg-black/60 border-white/10">
                <CardContent className="p-4 flex flex-col items-center text-center">
                  <div className="h-12 w-12 rounded-full bg-brand-purple/20 flex items-center justify-center mb-2">
                    <BadgePercent className="h-6 w-6 text-brand-purple" />
                  </div>
                  <h3 className="text-2xl font-bold">{kolStats.avgEarnings}</h3>
                  <p className="text-sm text-muted-foreground">Average Campaign Payment</p>
                </CardContent>
              </Card>
              
              <Card className="bg-black/60 border-white/10">
                <CardContent className="p-4 flex flex-col items-center text-center">
                  <div className="h-12 w-12 rounded-full bg-brand-purple/20 flex items-center justify-center mb-2">
                    <FileText className="h-6 w-6 text-brand-purple" />
                  </div>
                  <h3 className="text-2xl font-bold">{kolStats.availableCampaigns}</h3>
                  <p className="text-sm text-muted-foreground">Available Opportunities</p>
                </CardContent>
              </Card>
              
              <Card className="bg-black/60 border-white/10">
                <CardContent className="p-4 flex flex-col items-center text-center">
                  <div className="h-12 w-12 rounded-full bg-brand-purple/20 flex items-center justify-center mb-2">
                    <Star className="h-6 w-6 text-brand-purple" />
                  </div>
                  <h3 className="text-2xl font-bold">{kolStats.topEarningAmount}</h3>
                  <p className="text-sm text-muted-foreground">Top Creator Earnings</p>
                </CardContent>
              </Card>
              
              <Card className="bg-black/60 border-white/10">
                <CardContent className="p-4 flex flex-col items-center text-center">
                  <div className="h-12 w-12 rounded-full bg-brand-purple/20 flex items-center justify-center mb-2">
                    <Users className="h-6 w-6 text-brand-purple" />
                  </div>
                  <h3 className="text-2xl font-bold">{kolStats.avgCompletionTime}</h3>
                  <p className="text-sm text-muted-foreground">Average Completion Time</p>
                </CardContent>
              </Card>
            </div>
            
            <div className="mt-4 text-center">
              <Button 
                onClick={() => navigate(isAuthenticated ? "/dashboard/kol/campaigns" : "/signup")} 
                className="bg-brand-purple hover:bg-brand-purple/90"
              >
                Browse Available Campaigns
              </Button>
            </div>
          </div>
        )}
        
        {/* General carousel section with optimized rendering */}
        <div className="mt-10 mb-12 bg-black/40 backdrop-blur-md rounded-xl border border-white/10 p-6 shadow-2xl relative campaign-section">
          <DemoIndicator section="Top Creators & Brands" />
          <div className="flex items-center mb-5">
            <Users className="h-5 w-5 text-brand-purple mr-2" />
            <h2 className="text-xl font-semibold">
              {userView === "brand" ? "Featured Content Creators" : "Top Brands"}
            </h2>
          </div>
          
          <Carousel 
            className="w-full" 
            opts={carouselOptions}
          >
            {renderCarouselContent()}
            <CarouselPrevious className="left-0 bg-black/60 hover:bg-black/80 border-white/10" />
            <CarouselNext className="right-0 bg-black/60 hover:bg-black/80 border-white/10" />
          </Carousel>
          
          {/* View all button for brands */}
          {userView === "kol" && (
            <div className="mt-4 text-center">
              <Button 
                onClick={() => navigate(isAuthenticated ? "/dashboard/kol/campaigns" : "/signup")} 
                className="bg-brand-purple hover:bg-brand-purple/90"
              >
                View All Brand Campaigns
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
