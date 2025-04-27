
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, User, MessageCircle, Lock, Paperclip } from "lucide-react";
import { useUserAccess } from "@/hooks/useUserAccess";
import { toast } from "sonner";
import { CreditBadge } from "@/components/CreditBadge";
import { useCredits } from "@/contexts/CreditContext";

interface Message {
  id: string;
  type: "user" | "bot";
  content: string;
}

const HomePage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [messages, setMessages] = useState<Message[]>([{
    id: "welcome",
    type: "bot",
    content: "👋 Hi! I'm your AI agent for influencer discovery. You have 5 free searches per day. What kind of TikTok creator are you looking for?"
  }]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { isAuthenticated, canAccessFeature, getRedirectPath } = useUserAccess();
  const { freeCredits, useFreeCredit, hasPremiumPlan } = useCredits();

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (inputValue.trim() === "") return;
    
    // Check if user can send message (has credits)
    if (!hasPremiumPlan && freeCredits === 0) {
      if (!isAuthenticated) {
        toast.info("Please sign in to continue", {
          action: {
            label: "Sign In",
            onClick: () => navigate("/login")
          }
        });
        return;
      }
      
      toast.error("Out of free searches", {
        description: "Upgrade your plan to continue searching",
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
      content: inputValue
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue("");

    // Use credit only after message is sent
    if (!hasPremiumPlan) {
      useFreeCredit();
    }

    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: "bot",
        content: getResponse(inputValue)
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  const handleSearch = () => {
    if (searchQuery.trim() === "") return;
    
    // Check if user can search (has credits)
    if (!hasPremiumPlan && freeCredits === 0) {
      if (!isAuthenticated) {
        toast.info("Please sign in to continue", {
          action: {
            label: "Sign In",
            onClick: () => navigate("/login")
          }
        });
        return;
      }
      
      toast.error("Out of free searches", {
        description: "Upgrade your plan to continue searching",
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
      content: `Search for: ${searchQuery}`
    };
    
    setMessages(prev => [...prev, searchMessage]);

    // Use credit only after search is performed
    if (!hasPremiumPlan) {
      useFreeCredit();
    }

    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: "bot",
        content: isAuthenticated 
          ? `I found several TikTok creators matching "${searchQuery}". Let me analyze their profiles.`
          : "To see detailed analytics and book these creators, please sign in."
      };
      setMessages(prev => [...prev, botResponse]);

      if (!isAuthenticated) {
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    }, 1000);
  };

  const getResponse = (message: string) => {
    const lowerMsg = message.toLowerCase();
    if (lowerMsg.includes("hello") || lowerMsg.includes("hi ")) {
      return "Hello! How can I assist you with your influencer marketing needs today?";
    } else if (lowerMsg.includes("search") || lowerMsg.includes("find") || lowerMsg.includes("kol") || lowerMsg.includes("influencer")) {
      return "I can help you find the perfect TikTok creators! Please log in or sign up to access our full KOL search database with analytics.";
    } else if (lowerMsg.includes("price") || lowerMsg.includes("cost") || lowerMsg.includes("subscription")) {
      return "We offer flexible pricing plans starting at $99/month. You can view all pricing details and features after creating an account.";
    } else if (lowerMsg.includes("account") || lowerMsg.includes("sign") || lowerMsg.includes("login")) {
      return "You can create an account or sign in using the buttons in the top right corner. It only takes a minute!";
    } else {
      return "I'd love to help you with that! To access our full platform features including KOL search, campaign management, and analytics, please sign in or create an account.";
    }
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden hero-gradient">
      <div className="container mx-auto px-4 py-16 flex-1 flex lg:flex-row flex-col gap-8 relative z-10">
        <div className="lg:w-2/3 w-full flex flex-col">
          <div className="text-center lg:text-left mb-8">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-gradient mb-4">
              Discover your perfect
              <span className="text-brand-pink"> KOL match</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground">
              Connect with TikTok creators that align with your brand
            </p>
          </div>

          <div className="rounded-xl overflow-hidden glass-panel shadow-lg flex flex-col flex-1">
            <div className="bg-black/60 p-4 border-b border-white/10 flex justify-between items-center">
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-brand-pink flex items-center justify-center mr-3">
                  <MessageCircle className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h2 className="font-semibold text-lg">AI KOL Discovery Agent</h2>
                  <p className="text-sm text-muted-foreground">
                    {freeCredits > 0 
                      ? `${freeCredits} free ${freeCredits === 1 ? 'search' : 'searches'} remaining today` 
                      : hasPremiumPlan ? 'Premium plan activated' : 'Out of free searches today'}
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
                <CreditBadge variant="compact" />
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

            <div className="flex-1 p-6 overflow-y-auto bg-black/20">
              {messages.map(message => <div key={message.id} className={`mb-6 flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
                  {message.type === "bot" && <div className="h-8 w-8 rounded-full bg-brand-pink flex items-center justify-center mr-3 flex-shrink-0">
                      <MessageCircle className="h-4 w-4 text-white" />
                    </div>}
                  <div className={`p-4 rounded-lg max-w-[80%] ${message.type === "user" ? "bg-brand-navy text-white" : "bg-secondary"}`}>
                    {message.content}
                  </div>
                  {message.type === "user" && <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center ml-3 flex-shrink-0">
                      <User className="h-4 w-4" />
                    </div>}
                </div>)}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-4 border-t border-white/10 bg-black/40">
              <div className="flex gap-2">
                <Input placeholder="Ask about specific creator types, niches, or requirements..." value={inputValue} onChange={e => setInputValue(e.target.value)} onKeyPress={e => e.key === "Enter" && handleSendMessage()} className="bg-black/60" />
                <Button onClick={handleSendMessage}>Send</Button>
              </div>
              <div className="flex items-center justify-between mt-3 px-2">
                <Button variant="ghost" size="sm" className="text-muted-foreground">
                  <Paperclip className="h-4 w-4 mr-2" />
                  Attach
                </Button>
                
                {!hasPremiumPlan && (
                  <div className="text-sm text-muted-foreground flex items-center gap-2">
                    <span>Free tier: {freeCredits}/5 searches</span>
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

        <div className="lg:w-1/3 w-full">
          <div className="rounded-xl glass-panel p-6">
            <h2 className="text-2xl font-bold mb-6">Discover TikTok Creators</h2>
            <div className="space-y-4">
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
              <div className="mt-6">
                <Button onClick={() => navigate("/signup")} className="w-full bg-brand-pink hover:bg-brand-pink/90">
                  Sign Up for Full Access
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
