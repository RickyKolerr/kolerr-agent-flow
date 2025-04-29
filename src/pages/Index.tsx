import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Bot, User, ArrowRight, Sparkles, Star, MessageCircle, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useCredits } from "@/contexts/CreditContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { mockCreatorData } from "@/data/mockCreators";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

interface Message {
  id: string;
  type: "user" | "bot";
  content: string;
}

const Index = () => {
  const navigate = useNavigate();
  const { useFreeCredit, freeCredits, hasPremiumPlan } = useCredits();
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [showWelcome, setShowWelcome] = useState(true);
  const [activeCarouselIndex, setActiveCarouselIndex] = useState(0);
  
  // Auto welcome message
  useEffect(() => {
    if (showWelcome) {
      setTimeout(() => {
        setMessages([{
          id: "welcome",
          type: "bot",
          content: "👋 Welcome to the world's first Influencer Marketing AI Agent! I can help you discover the perfect TikTok creators for your brand. What type of influencers are you looking for today?"
        }]);
        setShowWelcome(false);
      }, 500);
    }
  }, [showWelcome]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Auto-rotate carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCarouselIndex((prev) => 
        prev === mockCreatorData.length - 1 ? 0 : prev + 1
      );
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      toast.error("Please enter a search term");
      return;
    }

    // Check if the user has enough credits
    if (freeCredits > 0 || hasPremiumPlan) {
      // Add the search query as a user message
      const userMessage: Message = {
        id: Date.now().toString(),
        type: "user",
        content: `Search for: ${searchQuery}`
      };
      
      setMessages(prev => [...prev, userMessage]);
      
      // Use a credit for the search
      useFreeCredit();
      
      // Add bot response about searching
      setTimeout(() => {
        const botResponse: Message = {
          id: (Date.now() + 1).toString(),
          type: "bot",
          content: `Searching for creators matching "${searchQuery}"...`
        };
        setMessages(prev => [...prev, botResponse]);
        
        // Navigate to search results after a short delay
        setTimeout(() => {
          navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
        }, 1500);
      }, 800);
      
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
  
  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputValue
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    
    // Check if user has credits for AI responses
    if (!hasPremiumPlan && freeCredits === 0) {
      setTimeout(() => {
        const botResponse: Message = {
          id: (Date.now() + 1).toString(),
          type: "bot",
          content: "You've used all your free searches for today. Upgrade to our premium plan to continue accessing our AI agent."
        };
        setMessages(prev => [...prev, botResponse]);
      }, 800);
      
      return;
    }
    
    // Use a credit for the AI interaction
    if (!hasPremiumPlan) {
      useFreeCredit();
    }
    
    // Analyze the user input to determine intent
    const lowerInput = inputValue.toLowerCase();
    
    // Simulate AI processing delay
    setTimeout(() => {
      let botResponse: Message;
      
      // Simple intent detection
      if (lowerInput.includes("find") || lowerInput.includes("search") || lowerInput.includes("looking for")) {
        // Search intent detected
        botResponse = {
          id: (Date.now() + 1).toString(),
          type: "bot",
          content: `Great! I can help you find creators. Here are some matching your description: ${getCreatorSuggestions(lowerInput)}`
        };
      } else if (lowerInput.includes("price") || lowerInput.includes("cost") || lowerInput.includes("plan")) {
        // Pricing intent detected
        botResponse = {
          id: (Date.now() + 1).toString(),
          type: "bot",
          content: "We offer flexible pricing plans starting at $99/month with unlimited searches. Would you like to see our pricing details?"
        };
      } else if (lowerInput.includes("hello") || lowerInput.includes("hi ") || lowerInput.includes("hey")) {
        // Greeting intent detected
        botResponse = {
          id: (Date.now() + 1).toString(),
          type: "bot",
          content: "Hello! I'm your AI assistant for finding TikTok creators. How can I help you today? You can ask me to find creators in specific niches, with certain follower counts, or for particular marketing goals."
        };
      } else {
        // General response
        botResponse = {
          id: (Date.now() + 1).toString(),
          type: "bot",
          content: "Thanks for your message! To help you better, could you tell me what type of creators you're looking for? For example, beauty influencers with 100K+ followers or gaming creators with high engagement rates."
        };
      }
      
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };
  
  const getCreatorSuggestions = (input: string) => {
    let filteredCreators = [...mockCreatorData];
    
    // Filter by niche if mentioned
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
    
    // Get top 3 filtered creators
    const suggestions = filteredCreators.slice(0, 3);
    
    return suggestions.length > 0 
      ? `<div class="mt-2 space-y-2">${suggestions.map(creator => 
          `<div class="flex items-center gap-2">
            <div class="w-8 h-8 bg-gray-200 rounded-full overflow-hidden">
              <img src="${creator.avatar}" alt="${creator.fullName}" class="w-full h-full object-cover" />
            </div>
            <div>
              <div class="font-medium">${creator.fullName}</div>
              <div class="text-xs text-gray-500">${(creator.followers / 1000000).toFixed(1)}M followers</div>
            </div>
          </div>`
        ).join('')}</div>`
      : "I couldn't find creators matching that exact description. Try a broader search or different keywords.";
  };
  
  const trendingCreators = mockCreatorData
    .filter(creator => creator.trending)
    .slice(0, 3);

  const allCreators = mockCreatorData.slice(0, 10);

  return (
    <div className="min-h-screen flex flex-col relative overflow-x-hidden overflow-y-auto hero-gradient pt-16 pb-16">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-purple-900/20 to-black -z-10"></div>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] -z-10"></div>
      
      {/* Animated gradient orbs */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full blur-3xl opacity-20 animate-pulse delay-700"></div>
      
      <div className="container mx-auto px-4 py-6 flex-1 flex flex-col">
        <div className="flex-1 flex flex-col md:flex-row gap-6 items-start">
          {/* Main AI Chat Panel */}
          <div className="w-full md:w-2/3 bg-black/20 backdrop-blur-md rounded-xl border border-white/10 shadow-2xl flex flex-col overflow-hidden h-[65vh] max-h-[700px]">
            {/* Chat header */}
            <div className="bg-black/40 p-4 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-brand-pink flex items-center justify-center mr-3">
                  <Bot className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h1 className="font-semibold text-lg">Influencer AI Agent</h1>
                  <p className="text-xs text-gray-400">
                    {hasPremiumPlan 
                      ? "Premium plan active" 
                      : `${freeCredits} free searches remaining today`}
                  </p>
                </div>
              </div>
            </div>
            
            {/* Chat messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
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
            </div>
            
            {/* Input area */}
            <div className="p-4 border-t border-white/10 bg-black/40">
              <div className="flex gap-2">
                <Input 
                  placeholder="Ask about specific creators, niches or requirements..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  className="bg-black/60 border-white/10"
                />
                <Button onClick={handleSendMessage} className="bg-brand-pink hover:bg-brand-pink/90">
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
              
              {/* Quick suggestions */}
              <div className="mt-3 flex flex-wrap gap-2">
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
              </div>
            </div>
          </div>
          
          {/* Right sidebar - Search & Trending */}
          <div className="w-full md:w-1/3 flex flex-col gap-4">
            {/* Search box */}
            <Card className="bg-black/20 backdrop-blur-md border border-white/10 shadow-lg">
              <CardContent className="p-4">
                <h2 className="text-xl font-semibold mb-3">Quick Search</h2>
                <div className="space-y-3">
                  <div className="flex gap-2">
                    <Input 
                      placeholder="Search for creators or niches..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                      className="bg-black/60 border-white/10"
                    />
                    <Button onClick={handleSearch} className="bg-brand-pink hover:bg-brand-pink/90">
                      <Search className="h-4 w-4" />
                    </Button>
                  </div>
                  
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
                  
                  <div className="text-xs text-muted-foreground">
                    {hasPremiumPlan ? 
                      'Premium plan: Unlimited searches' : 
                      `Free tier: ${freeCredits}/5 searches remaining`
                    }
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Trending creators */}
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
            
            {/* Sign up or upgrade CTA */}
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
          </div>
        </div>
        
        {/* Creator Portraits Carousel - Moved out of the chatbot */}
        <div className="mt-10 mb-12 bg-black/20 backdrop-blur-md rounded-xl border border-white/10 p-6 shadow-2xl">
          <div className="flex items-center mb-5">
            <Users className="h-5 w-5 text-brand-pink mr-2" />
            <h2 className="text-xl font-semibold">Featured Content Creators</h2>
          </div>
          
          <Carousel 
            className="w-full" 
            opts={{
              align: "start",
              loop: true,
              startIndex: activeCarouselIndex,
            }}
            setApi={(api) => {
              api?.on("select", () => {
                setActiveCarouselIndex(api.selectedScrollSnap());
              });
            }}
          >
            <CarouselContent>
              {allCreators.map((creator) => (
                <CarouselItem key={creator.id} className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/6">
                  <div className="p-1">
                    <div className="overflow-hidden rounded-full aspect-square border border-white/10 bg-black/20 hover:scale-105 transition-transform cursor-pointer"
                        onClick={() => navigate(`/creators/${creator.id}`)}
                    >
                      <img
                        src={creator.avatar}
                        alt={creator.fullName}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="text-center mt-3">
                      <p className="font-medium">{creator.fullName}</p>
                      <p className="text-xs text-gray-400">{(creator.followers / 1000000).toFixed(1)}M followers</p>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-0 bg-black/60 hover:bg-black/80 border-white/10" />
            <CarouselNext className="right-0 bg-black/60 hover:bg-black/80 border-white/10" />
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default Index;
