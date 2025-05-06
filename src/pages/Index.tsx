import { useState, useRef, useEffect } from "react";
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
import { UserRole } from "@/contexts/AuthContext";
import { WelcomeTour } from "@/components/onboarding/WelcomeTour";
import { DemoIndicator } from "@/components/demo/DemoIndicator";
import { useMobileDetection } from "@/hooks/use-mobile-detection";
import { useViewportFix } from "@/hooks/useViewportFix";

// Add type definition for the window object at the top level of the file
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

// Mock campaigns data for KOLs
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
  }
];

// Mock global brands data - expanded to 20 popular TikTok and Instagram brands
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
  },
  {
    id: "b11",
    name: "Fashion Nova",
    logo: "https://cdn.freebiesupply.com/logos/large/2x/fashion-nova-logo-png-transparent.png",
    industry: "Fashion",
    campaignTypes: ["Try-On Hauls", "OOTD Content", "Collection Launches"],
    budget: "$2,000-15,000",
    popularity: 94
  },
  {
    id: "b12",
    name: "Gymshark",
    logo: "https://cdn.freebiesupply.com/logos/large/2x/gymshark-logo-png-transparent.png",
    industry: "Fitness Apparel",
    campaignTypes: ["Workout Videos", "Transformation Stories", "Product Showcases"],
    budget: "$3,000-18,000",
    popularity: 92
  },
  {
    id: "b13",
    name: "Sephora",
    logo: "https://cdn.freebiesupply.com/logos/large/2x/sephora-logo-png-transparent.png",
    industry: "Beauty & Cosmetics",
    campaignTypes: ["Makeup Tutorials", "Product Reviews", "Beauty Tips"],
    budget: "$4,000-20,000",
    popularity: 93
  },
  {
    id: "b14",
    name: "Shein",
    logo: "https://cdn.freebiesupply.com/logos/large/2x/shein-logo-png-transparent.png",
    industry: "Fast Fashion",
    campaignTypes: ["Haul Videos", "Styling Tips", "Discount Promotions"],
    budget: "$1,500-10,000",
    popularity: 91
  },
  {
    id: "b15",
    name: "Zara",
    logo: "https://cdn.freebiesupply.com/logos/large/2x/zara-logo-png-transparent.png",
    industry: "Fashion",
    campaignTypes: ["Lookbooks", "Styling Videos", "Collection Reveals"],
    budget: "$3,500-22,000",
    popularity: 90
  },
  {
    id: "b16",
    name: "H&M",
    logo: "https://cdn.freebiesupply.com/logos/large/2x/hm-logo-png-transparent.png",
    industry: "Fashion",
    campaignTypes: ["Sustainable Fashion", "Style Guides", "Collection Showcases"],
    budget: "$2,500-18,000",
    popularity: 89
  },
  {
    id: "b17",
    name: "Fenty Beauty",
    logo: "https://cdn.freebiesupply.com/logos/large/2x/fenty-beauty-logo-png-transparent.png",
    industry: "Beauty & Cosmetics",
    campaignTypes: ["Makeup Tutorials", "Product Reviews", "Inclusive Beauty"],
    budget: "$5,000-25,000",
    popularity: 94
  },
  {
    id: "b18",
    name: "Supreme",
    logo: "https://cdn.freebiesupply.com/logos/large/2x/supreme-logo-png-transparent.png",
    industry: "Streetwear",
    campaignTypes: ["Drop Announcements", "Styling Videos", "Exclusive Access"],
    budget: "$4,500-30,000",
    popularity: 95
  },
  {
    id: "b19",
    name: "Gucci",
    logo: "https://cdn.freebiesupply.com/logos/large/2x/gucci-logo-png-transparent.png",
    industry: "Luxury Fashion",
    campaignTypes: ["Lifestyle Content", "Premium Unboxings", "Collection Features"],
    budget: "$10,000-50,000",
    popularity: 97
  },
  {
    id: "b20",
    name: "Louis Vuitton",
    logo: "https://cdn.freebiesupply.com/logos/large/2x/louis-vuitton-1-logo-png-transparent.png",
    industry: "Luxury Fashion",
    campaignTypes: ["Luxury Lifestyle", "Product Showcases", "Heritage Stories"],
    budget: "$12,000-60,000",
    popularity: 98
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

  // Detect user role and set initial view
  useEffect(() => {
    if (isAuthenticated && user?.role === "kol") {
      setUserView("kol");
    }
  }, [isAuthenticated, user]);
  
  useEffect(() => {
    if (showWelcome) {
      setTimeout(() => {
        const welcomeMessage = userView === "brand" 
          ? "👋 Need creators for your campaign? Tell me what you're looking for."
          : "👋 Looking for paid opportunities? Let me help you find the right match!";
        
        setMessages([{
          id: "welcome",
          type: "bot",
          content: welcomeMessage
        }]);
        setShowWelcome(false);
        // Don't set scrollToBottom for welcome messages
      }, 500);
    }
  }, [showWelcome, userView]);
  
  // If user toggles view, reset welcome message
  useEffect(() => {
    setShowWelcome(true);
  }, [userView]);
  
  // Modified scroll effect to only scroll when shouldScrollToBottom is true
  useEffect(() => {
    if (messagesEndRef.current && shouldScrollToBottom) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
      // Reset the flag after scrolling
      setShouldScrollToBottom(false);
    }
  }, [messages, shouldScrollToBottom]);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCarouselIndex((prev) => 
        prev === mockCreatorData.length - 1 ? 0 : prev + 1
      );
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  const handleSearch = () => {
    if (!searchQuery.trim()) {
      toast.error("Please enter a search term");
      return;
    }
    
    if (freeCredits > 0 || hasPremiumPlan) {
      const userMessage: Message = {
        id: Date.now().toString(),
        type: "user",
        content: `Search for: ${searchQuery}`
      };
      
      setMessages(prev => [...prev, userMessage]);
      // Set scroll flag for user-initiated messages
      setShouldScrollToBottom(true);
      
      useFreeCredit();
      
      setTimeout(() => {
        const botResponse: Message = {
          id: (Date.now() + 1).toString(),
          type: "bot",
          content: userView === "brand" 
            ? `Searching for creators matching "${searchQuery}"...` 
            : `Searching for campaigns matching "${searchQuery}"...`
        };
        setMessages(prev => [...prev, botResponse]);
        // Set scroll flag for bot responses to user actions
        setShouldScrollToBottom(true);
        
        setTimeout(() => {
          if (userView === "brand") {
            navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
          } else {
            navigate(`/dashboard/kol/campaigns`);
          }
        }, 1500);
      }, 800);
      
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
  
  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputValue
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    // Set scroll flag for user-initiated messages
    setShouldScrollToBottom(true);
    
    if (!hasPremiumPlan && freeCredits === 0) {
      setTimeout(() => {
        const botResponse: Message = {
          id: (Date.now() + 1).toString(),
          type: "bot",
          content: "You've used all your free searches for today. Upgrade to our premium plan to continue accessing our AI agent, or wait until 7:00 AM tomorrow for your credits to reset."
        };
        setMessages(prev => [...prev, botResponse]);
        // Set scroll flag for bot responses to user actions
        setShouldScrollToBottom(true);
      }, 800);
      
      return;
    }
    
    if (!hasPremiumPlan) {
      useFreeCredit();
    }
    
    const lowerInput = inputValue.toLowerCase();
    
    setTimeout(() => {
      let botResponse: Message;
      
      if (userView === "brand") {
        // Brand-focused response logic
        if (lowerInput.includes("find") || lowerInput.includes("search") || lowerInput.includes("looking for")) {
          botResponse = {
            id: (Date.now() + 1).toString(),
            type: "bot",
            content: `Great! I can help you find creators. Here are some matching your description: ${getCreatorSuggestions(lowerInput)}`
          };
        } else if (lowerInput.includes("price") || lowerInput.includes("cost") || lowerInput.includes("plan")) {
          botResponse = {
            id: (Date.now() + 1).toString(),
            type: "bot",
            content: "We offer flexible pricing plans starting at $99/month with unlimited searches. Would you like to see our pricing details?"
          };
        } else if (lowerInput.includes("hello") || lowerInput.includes("hi ") || lowerInput.includes("hey")) {
          botResponse = {
            id: (Date.now() + 1).toString(),
            type: "bot",
            content: "Hello! I'm your AI assistant for finding TikTok creators. How can I help you today? You can ask me to find creators in specific niches, with certain follower counts, or for particular marketing goals."
          };
        } else {
          botResponse = {
            id: (Date.now() + 1).toString(),
            type: "bot",
            content: "Thanks for your message! To help you better, could you tell me what type of creators you're looking for? For example, beauty influencers with 100K+ followers or gaming creators with high engagement rates."
          };
        }
      } else {
        // KOL-focused response logic
        if (lowerInput.includes("find") || lowerInput.includes("campaign") || lowerInput.includes("work") || lowerInput.includes("make money")) {
          botResponse = {
            id: (Date.now() + 1).toString(),
            type: "bot",
            content: `I can help you find paid campaigns! Here are some opportunities that might interest you: ${getCampaignSuggestions(lowerInput)}`
          };
        } else if (lowerInput.includes("pay") || lowerInput.includes("earn") || lowerInput.includes("money")) {
          botResponse = {
            id: (Date.now() + 1).toString(),
            type: "bot",
            content: `Our creators earn an average of ${kolStats.avgEarnings} per campaign, with top earners making over ${kolStats.topEarningAmount} in the ${kolStats.topEarningNiche} niche. Would you like me to find high-paying opportunities for you?`
          };
        } else if (lowerInput.includes("hello") || lowerInput.includes("hi ") || lowerInput.includes("hey")) {
          botResponse = {
            id: (Date.now() + 1).toString(),
            type: "bot",
            content: "Hello! I'm your AI assistant for finding paid brand campaigns. How can I help you today? You can ask me about available campaigns, payment rates, or specific brands looking for creators like you."
          };
        } else {
          botResponse = {
            id: (Date.now() + 1).toString(),
            type: "bot",
            content: "Thanks for your message! To help you find the best opportunities, could you tell me what type of campaigns you're interested in? For example, fashion brand partnerships, tech product reviews, or food promotions."
          };
        }
      }
      
      setMessages(prev => [...prev, botResponse]);
      // Set scroll flag for bot responses to user actions
      setShouldScrollToBottom(true);
    }, 1000);
  };
  
  const getCreatorSuggestions = (input: string) => {
    let filteredCreators = [...mockCreatorData];
    
    const niches = ["beauty", "fashion", "gaming", "tech", "travel", "fitness", "food", "lifestyle"];
    const mentionedNiches = niches.filter(niche => input.includes(niche));
    
    if (mentionedNiches.length > 0) {
      filteredCreators = filteredCreators.filter(creator => 
        creator.niche.some(niche => 
          mentionedNiches.some(mentionedNiche => 
            niche.toLowerCase().includes(mentionedNiche)
          )
        )
      );
    }
    
    const suggestions = filteredCreators.slice(0, 3);
    
    return suggestions.length > 0 
      ? `<div class="mt-2 space-y-2">${suggestions.map(creator => 
          `<div class="flex items-center gap-2 p-2 bg-black/20 rounded-lg">
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
              >
                View Profile
              </button>
            </div>
          </div>`
        ).join('')}</div>`
      : "I couldn't find creators matching that exact description. Try a broader search or different keywords.";
  };
  
  const getCampaignSuggestions = (input: string) => {
    let filteredCampaigns = [...mockCampaigns];
    
    const niches = ["beauty", "fashion", "gaming", "tech", "travel", "fitness", "food", "lifestyle"];
    const mentionedNiches = niches.filter(niche => input.includes(niche));
    
    if (mentionedNiches.length > 0) {
      filteredCampaigns = filteredCampaigns.filter(campaign => 
        campaign.categories.some(category => 
          mentionedNiches.some(mentionedNiche => 
            category.toLowerCase().includes(mentionedNiche)
          )
        )
      );
    }
    
    const suggestions = filteredCampaigns.slice(0, 3);
    
    return suggestions.length > 0 
      ? `<div class="mt-2 space-y-2">${suggestions.map(campaign => 
          `<div class="flex items-center gap-2 p-2 bg-black/20 rounded-lg">
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
          </div>`
        ).join('')}</div>`
      : "I couldn't find campaigns matching your interests. Try different keywords or check our available campaigns section.";
  };
  
  const trendingCreators = mockCreatorData
    .filter(creator => creator.trending)
    .slice(0, 3);

  const allCreators = mockCreatorData.slice(0, 10);
  
  // Update to use all 20 brands
  const topBrands = mockBrands;

  // Handle image loading errors
  const handleImageError = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    // Replace with a default placeholder when logo fails to load
    event.currentTarget.src = "https://ui-avatars.com/api/?name=Brand&background=0D8ABC&color=fff";
  };

  // Add global functions to handle navigation and apply actions from the injected HTML
  useEffect(() => {
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
    
    return () => {
      delete window.navigateToCreator;
      delete window.navigateToCampaign;
      delete window.handleChatApply;
    };
  }, [navigate, isAuthenticated, user]);

  // Import our new AgentTaskManager component
  const AgentTaskManager = React.lazy(() => import("@/components/ai/AgentTaskManager").then(module => ({
    default: module.AgentTaskManager
  })));

  return (
    <div className="min-h-screen flex flex-col overflow-y-auto overflow-x-hidden hero-gradient pt-16 pb-16">
      {/* Show the welcome tour */}
      <WelcomeTour />
      
      <div className="absolute inset-0 bg-gradient-to-br from-black via-purple-900/20 to-black -z-10"></div>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] -z-10"></div>
      
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full blur-3xl opacity-20 animate-pulse delay-700"></div>
      
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
          <React.Suspense fallback={<div className="w-full md:w-2/3 h-[65vh] bg-black/20 rounded-xl border border-white/10 flex items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-brand-pink" /></div>}>
            <AgentTaskManager className="w-full md:w-2/3 h-[65vh] max-h-[700px]" />
          </React.Suspense>
          
          <div className="w-full md:w-1/3 flex flex-col gap-4">
            <Card className="bg-black/20 backdrop-blur-md border border-white/10 shadow-lg">
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
                    <Button onClick={handleSearch} className="bg-brand-pink hover:bg-brand-pink/90">
                      <Search className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  {userView === "brand" ? (
                    <div className="flex flex-wrap gap-2">
                      <Badge 
                        variant="outline" 
                        className="cursor-pointer bg-black/40 hover:bg-black/60"
                        onClick={() => {
