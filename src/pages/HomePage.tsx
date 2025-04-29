import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, User, MessageCircle, Lock, Paperclip, Star, Users, TrendingUp } from "lucide-react";
import { useUserAccess } from "@/hooks/useUserAccess";
import { toast } from "sonner";
import { CreditBadge } from "@/components/CreditBadge";
import { useCredits } from "@/contexts/CreditContext";
import { mockCreatorData } from "@/data/mockCreators";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { RESET_HOUR, getTimeUntilReset } from "@/hooks/useSearchCredits";
import { useTypingEffect } from "@/hooks/useTypingEffect";
import { useIntelligentCredits } from "@/hooks/useIntelligentCredits";

interface Message {
  id: string;
  type: "user" | "bot";
  content: string;
  isTyping?: boolean;
  isKOLSpecific?: boolean;
}

const HomePage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  
  // Modify the welcome message to make these phrases stand out
  const welcomeMessage = "👋 Welcome to the world's first Influencer Marketing AI Agent! As a Strategic Partner of Global TikTok and Meta, Kolerr can help you quickly find creators all around the world for your campaigns. What type of influencers are you looking for today?";
  
  // Add a special phrase that will be typed extra slowly
  const slowTypedPhrase = "What type of influencers are you looking for today?";
  const creatorPhrase = "For Creators";
  
  const [messages, setMessages] = useState<Message[]>([{
    id: "welcome",
    type: "bot",
    content: welcomeMessage,
    isTyping: true
  }]);
  
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { isAuthenticated, canAccessFeature, getRedirectPath } = useUserAccess();
  const { freeCredits: originalFreeCredits, useFreeCredit, hasPremiumPlan } = useCredits();
  
  // Initialize intelligent credit system
  const { 
    freeCredits,
    generalQuestionCounter, 
    remainingGeneralQuestions,
    useIntelligentCredit,
    isKOLSpecificQuery,
    generalQuestionsPerCredit
  } = useIntelligentCredits(originalFreeCredits, hasPremiumPlan);

  // Enhanced typing effect with super slow speed for specific phrases
  const { displayedText, isComplete } = useTypingEffect({
    text: welcomeMessage,
    typingSpeed: 150, // Normal speed for regular text
    startDelay: 1000,
    highlightText: slowTypedPhrase,
    highlightSpeed: 400  // Much slower (400ms) for the highlighted phrase
  });

  // Track if messages have been updated
  const [messagesUpdated, setMessagesUpdated] = useState(false);

  // Update the welcome message as it types
  useEffect(() => {
    setMessages(prevMessages => {
      const newMessages = [...prevMessages];
      const welcomeMessageIndex = newMessages.findIndex(msg => msg.id === "welcome");
      if (welcomeMessageIndex !== -1) {
        newMessages[welcomeMessageIndex] = {
          ...newMessages[welcomeMessageIndex],
          content: displayedText,
          isTyping: !isComplete
        };
      }
      return newMessages;
    });
  }, [displayedText, isComplete]);

  // Only scroll when messages are actually updated (not on initial load)
  useEffect(() => {
    if (messagesEndRef.current && messagesUpdated) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
      setMessagesUpdated(false);
    }
  }, [messages, messagesUpdated]);

  const handleSendMessage = () => {
    if (inputValue.trim() === "") return;
    
    // Analyze if the message is KOL-specific
    const isSpecific = isKOLSpecificQuery(inputValue);
    
    // Check if we have enough credits
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

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputValue,
      isKOLSpecific: isSpecific
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setMessagesUpdated(true);

    // Use intelligent credit system
    if (!useIntelligentCredit(inputValue)) {
      return; // Stop if we couldn't use a credit
    }

    // Add a small delay before AI starts typing
    setTimeout(() => {
      const botResponseText = getResponse(inputValue);
      const botResponseId = (Date.now() + 1).toString();
      
      // Add empty bot message with typing indicator
      setMessages(prev => [...prev, {
        id: botResponseId,
        type: "bot",
        content: "",
        isTyping: true,
        isKOLSpecific: isSpecific
      }]);
      setMessagesUpdated(true);
      
      // Use typing effect to gradually reveal the message with more realistic timing
      let currentText = "";
      let charIndex = 0;
      
      // Check if this message contains our special phrases
      const containsSlowTypedPhrase = botResponseText.includes(slowTypedPhrase);
      const containsCreatorPhrase = botResponseText.includes(creatorPhrase);
      
      const typingTextWithDelay = () => {
        if (charIndex < botResponseText.length) {
          // Check if we're currently typing one of our special phrases
          const currentSubstring = botResponseText.substring(charIndex, charIndex + Math.max(slowTypedPhrase.length, creatorPhrase.length));
          const isSlowPart = containsSlowTypedPhrase && 
            currentSubstring.includes(slowTypedPhrase.substring(0, Math.min(currentSubstring.length, slowTypedPhrase.length)));
          const isCreatorPart = containsCreatorPhrase && 
            currentSubstring.includes(creatorPhrase.substring(0, Math.min(currentSubstring.length, creatorPhrase.length)));
          
          // Adjust typing speed based on what we're typing
          const typingDelay = isSlowPart || isCreatorPart ? 400 : 150;
          
          currentText += botResponseText[charIndex];
          charIndex++;
          
          // Update the message with the current text
          setMessages(prev => {
            const updatedMessages = [...prev];
            const messageIndex = updatedMessages.findIndex(msg => msg.id === botResponseId);
            if (messageIndex !== -1) {
              updatedMessages[messageIndex] = {
                ...updatedMessages[messageIndex],
                content: currentText,
                isTyping: charIndex < botResponseText.length
              };
            }
            return updatedMessages;
          });
          setMessagesUpdated(true);
          
          // If we're typing one of our special phrases, slow down even more
          setTimeout(typingTextWithDelay, typingDelay);
        }
      };
      
      // Start the typing effect
      typingTextWithDelay();
    }, 1500);
  };

  // Similar update for handleSearch function
  const handleSearch = () => {
    if (searchQuery.trim() === "") return;
    
    // Search is always considered a KOL-specific query
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

    const searchMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: `Search for: ${searchQuery}`,
      isKOLSpecific: true
    };
    
    setMessages(prev => [...prev, searchMessage]);
    setMessagesUpdated(true);

    // Use intelligent credit system (search is always KOL-specific)
    if (!useIntelligentCredit(`find ${searchQuery}`)) {
      return; // Stop if we couldn't use a credit
    }

    // Add a small delay before AI starts typing
    setTimeout(() => {
      const responseText = isAuthenticated 
        ? `I found several TikTok creators matching "${searchQuery}". Let me analyze their profiles.`
        : "To see detailed analytics and book these creators, please sign in.";
      
      // Check if this response contains "For Creators" phrase
      const containsCreatorPhrase = responseText.includes(creatorPhrase);
      
      const botResponseId = (Date.now() + 1).toString();
      
      // Add empty bot message with typing indicator
      setMessages(prev => [...prev, {
        id: botResponseId,
        type: "bot",
        content: "",
        isTyping: true,
        isKOLSpecific: true
      }]);
      setMessagesUpdated(true);
      
      // Use typing effect with variable speed
      let currentText = "";
      let charIndex = 0;
      
      const typingTextWithDelay = () => {
        if (charIndex < responseText.length) {
          // Check if we're currently typing the creator phrase
          const currentSubstring = responseText.substring(charIndex, charIndex + creatorPhrase.length);
          const isCreatorPart = containsCreatorPhrase && 
            currentSubstring.includes(creatorPhrase.substring(0, Math.min(currentSubstring.length, creatorPhrase.length)));
          
          // Slow down for creator phrase
          const typingDelay = isCreatorPart ? 400 : 150;
          
          currentText += responseText[charIndex];
          charIndex++;
          
          // Update the message with the current text
          setMessages(prev => {
            const updatedMessages = [...prev];
            const messageIndex = updatedMessages.findIndex(msg => msg.id === botResponseId);
            if (messageIndex !== -1) {
              updatedMessages[messageIndex] = {
                ...updatedMessages[messageIndex],
                content: currentText,
                isTyping: charIndex < responseText.length
              };
            }
            return updatedMessages;
          });
          setMessagesUpdated(true);
          
          // Schedule next character
          setTimeout(typingTextWithDelay, typingDelay);
        } else {
          // Typing is complete, check if we need to navigate
          if (!isAuthenticated) {
            setTimeout(() => {
              navigate("/login");
            }, 2000);
          }
        }
      };
      
      // Start the typing effect
      typingTextWithDelay();
    }, 1500);
  };

  // Modify the getResponse function to potentially include our special phrases
  const getResponse = (message: string) => {
    const lowerMsg = message.toLowerCase();
    if (lowerMsg.includes("hello") || lowerMsg.includes("hi ")) {
      return "Hello! How can I assist you with your influencer marketing needs today?";
    } else if (lowerMsg.includes("search") || lowerMsg.includes("find") || lowerMsg.includes("kol") || lowerMsg.includes("influencer")) {
      return `For Creators: I can help you find the perfect TikTok creators! Please log in or sign up to access our full KOL search database with analytics.`;
    } else if (lowerMsg.includes("price") || lowerMsg.includes("cost") || lowerMsg.includes("subscription")) {
      return "We offer flexible pricing plans starting at $99/month. You can view all pricing details and features after creating an account.";
    } else if (lowerMsg.includes("account") || lowerMsg.includes("sign") || lowerMsg.includes("login")) {
      return "You can create an account or sign in using the buttons in the top right corner. It only takes a minute!";
    } else {
      return "I'd love to help you with that! To access our full platform features including KOL search, campaign management, and analytics, please sign in or create an account.";
    }
  };

  const topPerformers = mockCreatorData
    .sort((a, b) => b.followers - a.followers)
    .slice(0, 6);

  const trendingCreators = mockCreatorData
    .filter(creator => creator.trending)
    .slice(0, 6);

  const viralCreators = mockCreatorData
    .sort((a, b) => b.engagementRate - a.engagementRate)
    .slice(0, 6);

  // Helper function to get appropriate credit usage text
  const getCreditUsageText = () => {
    if (hasPremiumPlan) return "Premium plan activated";
    
    return `${freeCredits} free ${freeCredits === 1 ? 'search' : 'searches'} remaining • ${remainingGeneralQuestions} general ${remainingGeneralQuestions === 1 ? 'question' : 'questions'} left`;
  };

  return (
    <div className="min-h-screen flex flex-col overflow-auto hero-gradient">
      <div className="container mx-auto px-4 pt-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="glass-panel rounded-2xl p-6 shadow-2xl">
            <div className="flex items-center gap-3 mb-6">
              <Star className="h-8 w-8 text-brand-pink" />
              <h2 className="text-2xl font-bold">Top Performers</h2>
            </div>
            <div className="space-y-4">
              {topPerformers.slice(0, 3).map(creator => (
                <Card key={creator.id} className="bg-black/40 hover:bg-black/50 transition-all">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <img 
                        src={creator.avatar} 
                        alt={creator.fullName} 
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{creator.fullName}</h3>
                        <p className="text-brand-pink font-medium">
                          {(creator.followers / 1000000).toFixed(1)}M Followers
                        </p>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {creator.niche.slice(0, 2).map(tag => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="glass-panel rounded-2xl p-6 shadow-2xl">
            <div className="flex items-center gap-3 mb-6">
              <TrendingUp className="h-8 w-8 text-brand-pink" />
              <h2 className="text-2xl font-bold">Trending Now</h2>
            </div>
            <div className="space-y-4">
              {trendingCreators.slice(0, 3).map(creator => (
                <Card key={creator.id} className="bg-black/40 hover:bg-black/50 transition-all">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <img 
                        src={creator.avatar} 
                        alt={creator.fullName} 
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{creator.fullName}</h3>
                        <div className="flex items-center text-brand-pink font-medium">
                          <TrendingUp className="h-4 w-4 mr-1" />
                          {(creator.engagementRate * 100).toFixed(1)}% Engagement
                        </div>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {creator.niche.slice(0, 2).map(tag => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="glass-panel rounded-2xl p-6 shadow-2xl">
            <div className="flex items-center gap-3 mb-6">
              <Users className="h-8 w-8 text-brand-pink" />
              <h2 className="text-2xl font-bold">Viral Stars</h2>
            </div>
            <div className="space-y-4">
              {viralCreators.slice(0, 3).map(creator => (
                <Card key={creator.id} className="bg-black/40 hover:bg-black/50 transition-all">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <img 
                        src={creator.avatar} 
                        alt={creator.fullName} 
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{creator.fullName}</h3>
                        <p className="text-brand-pink font-medium">
                          {creator.avgViews} Avg. Views
                        </p>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {creator.niche.slice(0, 2).map(tag => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:w-2/3 w-full">
          <div className="rounded-2xl overflow-hidden glass-panel shadow-2xl flex flex-col flex-1">
            <div className="bg-black/70 p-6 border-b border-white/10 flex justify-between items-center">
              <div className="flex items-center">
                <div className="h-16 w-16 rounded-full bg-brand-pink flex items-center justify-center mr-4">
                  <MessageCircle className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h2 className="font-bold text-2xl">AI KOL Discovery Agent</h2>
                  <p className="text-lg text-muted-foreground">
                    {getCreditUsageText()}
                  </p>
                </div>
              </div>
              {!isAuthenticated ? (
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => navigate("/login")}
                  className="text-brand-pink hover:text-brand-pink/90"
                >
                  <Lock className="h-4 w-4 mr-2" />
                  Sign in for full access
                </Button>
              ) : !hasPremiumPlan && (
                <CreditBadge variant="detailed" />
              )}
            </div>

            <div className="bg-black/40 p-4 border-b border-white/10">
              <div className="flex gap-2">
                <Input placeholder="Quick search for TikTok creators..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="bg-black/60" />
                <Button size="icon" variant="secondary" onClick={handleSearch}>
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <ScrollArea className="flex-1 p-6 bg-black/20 h-[400px]">
              {messages.map(message => (
                <div key={message.id} className={`mb-6 flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
                  {message.type === "bot" && (
                    <div className="h-8 w-8 rounded-full bg-brand-pink flex items-center justify-center mr-3 flex-shrink-0">
                      <MessageCircle className="h-4 w-4 text-white" />
                    </div>
                  )}
                  <div className={`p-4 rounded-lg max-w-[80%] ${message.type === "user" ? "bg-brand-navy text-white" : "bg-secondary"}`}>
                    {message.content}
                    {message.isTyping && (
                      <span className="inline-block ml-1 animate-pulse">▌</span>
                    )}
                    {message.isKOLSpecific && !hasPremiumPlan && message.type === "user" && (
                      <span className="block text-xs italic mt-1 opacity-70">Uses 1 credit</span>
                    )}
                    {!message.isKOLSpecific && !hasPremiumPlan && message.type === "user" && (
                      <span className="block text-xs italic mt-1 opacity-70">General question ({generalQuestionsPerCredit} = 1 credit)</span>
                    )}
                  </div>
                  {message.type === "user" && (
                    <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center ml-3 flex-shrink-0">
                      <User className="h-4 w-4" />
                    </div>
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </ScrollArea>

            <div className="p-4 border-t border-white/10 bg-black/40">
              <div className="flex gap-2">
                <Input placeholder="Ask about specific creator types, niches, or requirements..." 
                       value={inputValue} 
                       onChange={e => setInputValue(e.target.value)} 
                       onKeyPress={e => e.key === "Enter" && handleSendMessage()} 
                       className="bg-black/60" />
                <Button onClick={handleSendMessage}>Send</Button>
              </div>
              <div className="flex items-center justify-between mt-3 px-2">
                <Button variant="ghost" size="sm" className="text-muted-foreground">
                  <Paperclip className="h-4 w-4 mr-2" />
                  Attach
                </Button>
                
                {!hasPremiumPlan && (
                  <div className="text-sm text-muted-foreground flex items-center gap-2">
                    <span>
                      {isKOLSpecificQuery(inputValue) 
                        ? "KOL question: Uses 1 credit" 
                        : `General question: ${generalQuestionCounter}/${generalQuestionsPerCredit}`}
                    </span>
                    <Button 
                      variant="link" 
                      size="sm" 
                      className="text-brand-pink p-0 h-auto" 
                      onClick={() => navigate("/pricing")}
                    >
                      Upgrade
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="lg:w-1/3 w-full mt-8 lg:mt-0">
          <div className="rounded-2xl glass-panel p-8 shadow-2xl">
            <h2 className="text-3xl font-bold mb-8">Discover TikTok Creators</h2>
            <div className="space-y-6">
              <p className="text-muted-foreground">
                Chat with our AI to find the perfect creators for your brand. You can:
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <div className="h-6 w-6 rounded-full bg-brand-pink/20 flex items-center justify-center">
                    <Search className="h-3 w-3 text-brand-pink" />
                  </div>
                  <span>Search by niche, audience, or engagement</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-6 w-6 rounded-full bg-brand-pink/20 flex items-center justify-center">
                    <MessageCircle className="h-3 w-3 text-brand-pink" />
                  </div>
                  <span>Get instant creator recommendations</span>
                </li>
              </ul>
              <div className="mt-8">
                <Button onClick={() => navigate("/signup")} className="w-full bg-brand-pink hover:bg-brand-pink/90 py-3 text-lg">
                  Get Started
                </Button>
              </div>
            </div>
          </div>
          
          {/* Update the Credit Usage Info Card */}
          <div className="rounded-2xl glass-panel p-6 shadow-2xl mt-6">
            <h3 className="text-lg font-bold mb-3 flex items-center">
              <MessageCircle className="h-4 w-4 text-brand-pink mr-2" />
              Understanding Credits
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between items-center pb-2 border-b border-white/10">
                <span>KOL specific questions:</span>
                <span className="font-medium">1 credit each</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-white/10">
                <span>General questions:</span>
                <span className="font-medium">{generalQuestionsPerCredit} for 1 credit</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Your remaining:</span>
                <span className="font-medium">
                  {freeCredits} credits + {remainingGeneralQuestions} general questions
                </span>
              </div>
              {!hasPremiumPlan && (
                <Button 
                  variant="outline" 
                  className="w-full mt-2 text-brand-pink border-brand-pink/30 hover:bg-brand-pink/10"
                  onClick={() => navigate("/pricing")}
                >
                  Get Unlimited With Premium
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
