import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Bot, User, ArrowRight, Sparkles, Star, MessageCircle, Users, FileText, BadgePercent } from "lucide-react";
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

// Add this declaration at the top of the file, outside of any component
declare global {
  interface Window {
    navigateToCreator: (creatorId: string) => void;
    navigateToCampaign: (campaignId: string) => void;
  }
}

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
          ? "👋 Welcome to the world's first Influencer Marketing AI Agent! As a Strategic Partner of Global TikTok and Meta, Kolerr can help you quickly find creators all around the world for your campaigns. What type of influencers are you looking for today?"
          : "👋 Welcome to Kolerr! We connect creators like you to amazing paid brand campaigns. Tell me what kind of opportunities you're looking for, and I'll help you find the perfect match!";
        
        setMessages([{
          id: "welcome",
          type: "bot",
          content: welcomeMessage
        }]);
        setShowWelcome(false);
      }, 500);
    }
  }, [showWelcome, userView]);
  
  // If user toggles view, reset welcome message
  useEffect(() => {
    setShowWelcome(true);
  }, [userView]);
  
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);
  
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
    
    if (!hasPremiumPlan && freeCredits === 0) {
      setTimeout(() => {
        const botResponse: Message = {
          id: (Date.now() + 1).toString(),
          type: "bot",
          content: "You've used all your free searches for today. Upgrade to our premium plan to continue accessing our AI agent, or wait until 7:00 AM tomorrow for your credits to reset."
        };
        setMessages(prev => [...prev, botResponse]);
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
            <div class="ml-2">
              <button 
                onclick="window.navigateToCampaign('${campaign.id}')" 
                class="text-xs bg-brand-pink hover:bg-brand-pink/90 text-white px-3 py-1 rounded flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-1"><circle cx="12" cy="12" r="10"></circle><path d="M12 8v8"></path><path d="m8 12 4 4 4-4"></path></svg>
                View
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

  // Add a global function to handle navigation from the injected HTML
  useEffect(() => {
    window.navigateToCreator = (creatorId) => {
      navigate(`/creators/${creatorId}`);
    };
    
    window.navigateToCampaign = (campaignId) => {
      navigate(`/campaigns/${campaignId}`);
    };
    
    return () => {
      delete window.navigateToCreator;
      delete window.navigateToCampaign;
    };
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col overflow-y-auto overflow-x-hidden hero-gradient pt-16 pb-16">
      <div className="absolute inset-0 bg-gradient-to-br from-black via-purple-900/20 to-black -z-10"></div>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] -z-10"></div>
      
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full blur-3xl opacity-20 animate-pulse delay-700"></div>
      
      <div className="container mx-auto px-4 py-6 flex-1 flex flex-col">
        {!isAuthenticated && (
          <div className="flex justify-center mb-8">
            <Tabs 
              defaultValue="brand" 
              value={userView} 
              onValueChange={(value) => setUserView(value as "brand" | "kol")} 
              className="w-full max-w-md"
            >
              <TabsList className="grid grid-cols-2 w-full">
                <TabsTrigger value="brand">For Brands</TabsTrigger>
                <TabsTrigger value="kol">For Creators</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        )}

        <div className="flex-1 flex flex-col md:flex-row gap-6 items-start">
          <div className="w-full md:w-2/3 bg-black/20 backdrop-blur-md rounded-xl border border-white/10 shadow-2xl flex flex-col overflow-hidden h-[65vh] max-h-[700px]">
            <div className="bg-black/40 p-4 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-brand-pink flex items-center justify-center mr-3">
                  <Bot className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h1 className="font-semibold text-lg">
                    {userView === "brand" ? "Influencer AI Agent" : "Campaign Finder AI"}
                  </h1>
                  <p className="text-xs text-gray-400">
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
                    <div className="h-8 w-8 rounded-full bg-brand-pink flex items-center justify-center mr-3 flex-shrink-0">
                      <Bot className="h-4 w-4 text-white" />
                    </div>
                  )}
                  
                  <div 
                    className={`p-3 rounded-lg max-w-[80%] ${
                      message.type === "user" 
                        ? "bg-brand-navy text-white" 
                        : "bg-black/40 border border-white/10"
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
            
            <div className="p-4 border-t border-white/10 bg-black/40">
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
                <Button onClick={handleSendMessage} className="bg-brand-pink hover:bg-brand-pink/90">
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="mt-3 flex flex-wrap gap-2">
                {userView === "brand" ? (
                  <>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => setInputValue("Find beauty influencers with high engagement")}
                      className="text-xs bg-black/40 border-white/10"
                    >
                      <Sparkles className="h-3 w-3 mr-1 text-brand-pink" />
                      Beauty influencers
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => setInputValue("Find gaming creators under 100K followers")}
                      className="text-xs bg-black/40 border-white/10"
                    >
                      <Sparkles className="h-3 w-3 mr-1 text-brand-pink" />
                      Gaming creators
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => setInputValue("Find fitness creators with viral content")}
                      className="text-xs bg-black/40 border-white/10"
                    >
                      <Sparkles className="h-3 w-3 mr-1 text-brand-pink" />
                      Fitness creators
                    </Button>
                  </>
                ) : (
                  <>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => setInputValue("Find fashion campaigns that pay well")}
                      className="text-xs bg-black/40 border-white/10"
                    >
                      <Sparkles className="h-3 w-3 mr-1 text-brand-pink" />
                      Fashion campaigns
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => setInputValue("How much can I earn on tech reviews?")}
                      className="text-xs bg-black/40 border-white/10"
                    >
                      <Sparkles className="h-3 w-3 mr-1 text-brand-pink" />
                      Tech earnings
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => setInputValue("Find brand sponsorships available now")}
                      className="text-xs bg-black/40 border-white/10"
                    >
                      <Sparkles className="h-3 w-3 mr-1 text-brand-pink" />
                      Available sponsorships
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
          
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
                          setSearchQuery("fashion");
                          handleSearch();
                        }}
                      >
                        fashion
                      </Badge>
                      <Badge 
                        variant="outline" 
                        className="cursor-pointer bg-black/40 hover:bg-black/60"
                        onClick={() => {
                          setSearchQuery("beauty");
                          handleSearch();
                        }}
                      >
                        beauty
                      </Badge>
                      <Badge 
                        variant="outline" 
                        className="cursor-pointer bg-black/40 hover:bg-black/60"
                        onClick={() => {
                          setSearchQuery("gaming");
                          handleSearch();
                        }}
                      >
                        gaming
                      </Badge>
                      <Badge 
                        variant="outline" 
                        className="cursor-pointer bg-black/40 hover:bg-black/60"
                        onClick={() => {
                          setSearchQuery("travel");
                          handleSearch();
                        }}
                      >
                        travel
                      </Badge>
                    </div>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      <Badge 
                        variant="outline" 
                        className="cursor-pointer bg-black/40 hover:bg-black/60"
                        onClick={() => {
                          setSearchQuery("high paying");
                          handleSearch();
                        }}
                      >
                        high paying
                      </Badge>
                      <Badge 
                        variant="outline" 
                        className="cursor-pointer bg-black/40 hover:bg-black/60"
                        onClick={() => {
                          setSearchQuery("easy to complete");
                          handleSearch();
                        }}
                      >
                        easy to complete
                      </Badge>
                      <Badge 
                        variant="outline" 
                        className="cursor-pointer bg-black/40 hover:bg-black/60"
                        onClick={() => {
                          setSearchQuery("urgent");
                          handleSearch();
                        }}
                      >
                        urgent
                      </Badge>
                      <Badge 
                        variant="outline" 
                        className="cursor-pointer bg-black/40 hover:bg-black/60"
                        onClick={() => {
                          setSearchQuery("long term");
                          handleSearch();
                        }}
                      >
                        long term
                      </Badge>
                    </div>
                  )}
                  
                  <div className="text-xs text-muted-foreground">
                    {hasPremiumPlan ? 
                      'Premium plan: Unlimited searches' : 
                      `Free tier: ${freeCredits}/5 searches remaining`
                    }
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {userView === "brand" ? (
              <Card className="bg-black/20 backdrop-blur-md border border-white/10 shadow-lg">
                <CardContent className="p-4">
                  <h2 className="text-xl font-semibold mb-3 flex items-center">
                    <Star className="h-4 w-4 text-brand-pink mr-2" />
                    Trending Creators
                  </h2>
                  
                  <div className="space-y-3">
                    {trendingCreators.map(creator => (
                      <div key={creator.id} className="flex items-center gap-3 p-2 hover:bg-black/30 rounded-lg cursor-pointer transition-colors" onClick={() => navigate(`/creators/${creator.id}`)}>
                        <Avatar className="h-10 w-10">
                          <img src={creator.avatar} alt={creator.fullName} className="object-cover" />
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
                      className="w-full mt-2 border-white/10"
                      onClick={() => navigate('/search?category=trending')}
                    >
                      <MessageCircle className="h-3 w-3 mr-1 text-brand-pink" />
                      View All Trending
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="bg-black/20 backdrop-blur-md border border-white/10 shadow-lg">
                <CardContent className="p-4">
                  <h2 className="text-xl font-semibold mb-3 flex items-center">
                    <FileText className="h-4 w-4 text-brand-pink mr-2" />
                    Hot Campaigns
                  </h2>
                  
                  <div className="space-y-3">
                    {mockCampaigns.map(campaign => (
                      <div 
                        key={campaign.id} 
                        className="flex items-center gap-3 p-2 hover:bg-black/30 rounded-lg cursor-pointer transition-colors" 
                        onClick={() => navigate(isAuthenticated ? `/dashboard/kol/campaigns` : '/signup')}
                      >
                        <Avatar className="h-10 w-10">
                          <img src={campaign.brandLogo} alt={campaign.brand} className="object-cover" />
                        </Avatar>
                        <div className="flex-1">
                          <div className="font-medium">${campaign.title}</div>
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
                      className="w-full mt-2 border-white/10"
                      onClick={() => navigate(isAuthenticated ? `/dashboard/kol/campaigns` : '/signup')}
                    >
                      <FileText className="h-3 w-3 mr-1 text-brand-pink" />
                      Browse All Campaigns
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
            
            {/* Conditional CTA Card */}
            {userView === "brand" ? (
              <Card className="bg-gradient-to-r from-brand-pink/80 to-purple-700/80 backdrop-blur-md border-none shadow-xl">
                <CardContent className="p-4">
                  <h3 className="text-lg font-bold text-white mb-2">Unlock Full Access</h3>
                  <p className="text-sm text-white/90 mb-3">
                    Get unlimited AI searches, advanced analytics, and creator booking tools.
                  </p>
                  <Button 
                    className="w-full bg-white text-brand-pink hover:bg-white/90" 
                    onClick={() => navigate("/signup")}
                  >
                    Get Started
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <Card className="bg-gradient-to-r from-brand-pink/80 to-purple-700/80 backdrop-blur-md border-none shadow-xl">
                <CardContent className="p-4">
                  <h3 className="text-lg font-bold text-white mb-2">Start Earning Today</h3>
                  <p className="text-sm text-white/90 mb-3">
                    Join {mockCampaigns.length}+ creators earning an average of {kolStats.avgEarnings} per campaign.
                  </p>
                  <Button 
                    className="w-full bg-white text-brand-pink hover:bg-white/90" 
                    onClick={() => navigate("/signup")}
                  >
                    Create Creator Account
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
        
        {/* KOL Earning Statistics Section - Only visible for "kol" view */}
        {userView === "kol" && (
          <div className="mt-10 mb-12 bg-black/20 backdrop-blur-md rounded-xl border border-white/10 p-6 shadow-2xl">
            <div className="flex items-center mb-5">
              <BadgePercent className="h-5 w-5 text-brand-pink mr-2" />
              <h2 className="text-xl font-semibold">Creator Earnings & Opportunities</h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="bg-black/20 border-white/10">
                <CardContent className="p-4 flex flex-col items-center text-center">
                  <div className="h-12 w-12 rounded-full bg-brand-pink/20 flex items-center justify-center mb-2">
                    <BadgePercent className="h-6 w-6 text-brand-pink" />
                  </div>
                  <h3 className="text-2xl font-bold">{kolStats.avgEarnings}</h3>
                  <p className="text-sm text-muted-foreground">Average Campaign Payment</p>
                </CardContent>
              </Card>
              
              <Card className="bg-black/20 border-white/10">
                <CardContent className="p-4 flex flex-col items-center text-center">
                  <div className="h-12 w-12 rounded-full bg-brand-pink/20 flex items-center justify-center mb-2">
                    <FileText className="h-6 w-6 text-brand-pink" />
                  </div>
                  <h3 className="text-2xl font-bold">{kolStats.availableCampaigns}</h3>
                  <p className="text-sm text-muted-foreground">Available Opportunities</p>
                </CardContent>
              </Card>
              
              <Card className="bg-black/20 border-white/10">
                <CardContent className="p-4 flex flex-col items-center text-center">
                  <div className="h-12 w-12 rounded-full bg-brand-pink/20 flex items-center justify-center mb-2">
                    <Star className="h-6 w-6 text-brand-pink" />
                  </div>
                  <h3 className="text-2xl font-bold">{kolStats.topEarningAmount}</h3>
                  <p className="text-sm text-muted-foreground">Top Creator Earnings</p>
                </CardContent>
              </Card>
              
              <Card className="bg-black/20 border-white/10">
                <CardContent className="p-4 flex flex-col items-center text-center">
                  <div className="h-12 w-12 rounded-full bg-brand-pink/20 flex items-center justify-center mb-2">
                    <Users className="h-6 w-6 text-brand-pink" />
                  </div>
                  <h3 className="text-2xl font-bold">{kolStats.avgCompletionTime}</h3>
                  <p className="text-sm text-muted-foreground">Average Completion Time</p>
                </CardContent>
              </Card>
            </div>
            
            <div className="mt-4 text-center">
              <Button 
                onClick={() => navigate(isAuthenticated ? "/dashboard/kol/campaigns" : "/signup")} 
                className="bg-brand-pink hover:bg-brand-pink/90"
              >
                Browse Available Campaigns
              </Button>
            </div>
          </div>
        )}
        
        {/* General carousel section */}
        <div className="mt-10 mb-12 bg-black/20 backdrop-blur-md rounded-xl border border-white/10 p-6 shadow-2xl">
          <div className="flex items-center mb-5">
            <Users className="h-5 w-5 text-brand-pink mr-2" />
            <h2 className="text-xl font-semibold">
              {userView === "brand" ? "Featured Content Creators" : "Top Brands"}
            </h2>
          </div>
          
          <Carousel 
            className="w-full" 
            opts={{
              align: "start",
              loop: true,
              startIndex: activeCarouselIndex,
              dragFree: false,
              skipSnaps: false,
              inViewThreshold: 0.6,
              duration: 30,
            }}
            setApi={(api) => {
              api?.on("select", () => {
                setActiveCarouselIndex(api.selectedScrollSnap());
              });
            }}
          >
            <CarouselContent className="transition-transform duration-700 ease-in-out">
              {userView === "brand" ? (
                // Show creators in brand view
                allCreators.map((creator) => (
                  <CarouselItem 
                    key={creator.id} 
                    className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/6 transition-opacity duration-500"
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
                          className="h-full w-full object-cover transition-transform duration-500"
                        />
                      </div>
                      <div className="text-center mt-3">
                        <p className="font-medium">{creator.fullName}</p>
                        <p className="text-xs text-gray-400">{(creator.followers / 1000000).toFixed(1)}M followers</p>
                      </div>
                    </div>
                  </CarouselItem>
                ))
              ) : (
                // Show brands in KOL view
                topBrands.map((brand) => (
                  <CarouselItem 
                    key={brand.id} 
                    className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/6 transition-opacity duration-500"
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
                          className="h-full w-full object-contain transition-transform duration-500"
                        />
                      </div>
                      <div className="text-center mt-3">
                        <p className="font-medium">{brand.name}</p>
                        <p className="text-xs text-gray-400">{brand.industry}</p>
                        <Badge className="mt-1 bg-brand-pink/40 text-xs">{brand.campaignTypes[0]}</Badge>
                      </div>
                    </div>
                  </CarouselItem>
                ))
              )}
            </CarouselContent>
            <CarouselPrevious className="left-0 bg-black/60 hover:bg-black/80 border-white/10 transition-all duration-300" />
            <CarouselNext className="right-0 bg-black/60 hover:bg-black/80 border-white/10 transition-all duration-300" />
          </Carousel>
          
          {/* View all button for brands */}
          {userView === "kol" && (
            <div className="mt-4 text-center">
              <Button 
                onClick={() => navigate(isAuthenticated ? "/dashboard/kol/campaigns" : "/signup")} 
                className="bg-brand-pink hover:bg-brand-pink/90"
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
