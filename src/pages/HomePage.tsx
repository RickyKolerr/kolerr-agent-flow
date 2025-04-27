
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Search, User, Check } from "lucide-react";

interface Message {
  id: string;
  type: "user" | "bot";
  content: string;
}

const HomePage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      type: "bot",
      content: "👋 Hi there! I'm Kolerr, your AI agent for influencer marketing. How can I help you today? Would you like to search for a TikTok influencer or learn more about our platform?"
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const features = [
    { 
      title: "AI-Powered KOL Search", 
      description: "Find the perfect TikTok creators for your brand in seconds" 
    },
    { 
      title: "Campaign Management", 
      description: "Create and manage influencer campaigns with ease" 
    },
    { 
      title: "Smart Scheduling", 
      description: "Book creator slots efficiently" 
    },
    { 
      title: "Contract Automation", 
      description: "Generate and sign contracts in minutes" 
    }
  ];

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (inputValue.trim() === "") return;

    const userMessage = {
      id: Date.now().toString(),
      type: "user" as const,
      content: inputValue
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");

    // Simulate bot response after a short delay
    setTimeout(() => {
      const botResponse = {
        id: (Date.now() + 1).toString(),
        type: "bot" as const,
        content: getResponse(inputValue)
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  const handleSearch = () => {
    if (searchQuery.trim() === "") return;
    
    const searchMessage = {
      id: Date.now().toString(),
      type: "user" as const,
      content: `Search for: ${searchQuery}`
    };

    setMessages(prev => [...prev, searchMessage]);
    
    // Simulate bot response
    setTimeout(() => {
      const botResponse = {
        id: (Date.now() + 1).toString(),
        type: "bot" as const,
        content: `I found several TikTok creators matching "${searchQuery}". To see detailed analytics and book them, please sign in or create an account.`
      };
      setMessages(prev => [...prev, botResponse]);
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
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-10 backdrop-blur-lg bg-background/80 border-b border-border px-4 py-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <div className="h-8 w-8 rounded-md bg-brand-pink flex items-center justify-center mr-2">
              <span className="font-bold text-white">K</span>
            </div>
            <span className="font-bold text-xl">Kolerr</span>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => navigate("/login")}>Log In</Button>
            <Button onClick={() => navigate("/signup")}>Sign Up</Button>
          </div>
        </div>
      </header>

      <div className="flex-1 container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 py-12 px-4">
        {/* Hero Section */}
        <div className="flex flex-col justify-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-brand-pink to-brand-orange bg-clip-text text-transparent">
            AI-Powered Influencer Marketing Agent
          </h1>
          <p className="text-xl mb-8 text-muted-foreground">
            Connect with the right TikTok creators for your brand through our AI agent. Find, book, and manage influencer campaigns effortlessly.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <Button 
              size="lg" 
              onClick={() => navigate("/signup")}
              className="bg-brand-pink hover:bg-brand-pink/90 text-white"
            >
              Get Started <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => {
                const chatSection = document.getElementById('chat-section');
                if (chatSection) chatSection.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Try the AI Agent
            </Button>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {features.map((feature, index) => (
              <div key={index} className="flex p-4 rounded-lg border border-border">
                <div className="mr-4 h-6 w-6 rounded-full bg-brand-pink/20 flex items-center justify-center flex-shrink-0">
                  <Check className="h-3 w-3 text-brand-pink" />
                </div>
                <div>
                  <h3 className="font-medium">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Interface */}
        <div id="chat-section" className="rounded-xl border border-border overflow-hidden glass-panel shadow-lg flex flex-col">
          {/* Chat header */}
          <div className="bg-secondary p-4 border-b border-border flex justify-between items-center">
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-brand-pink flex items-center justify-center mr-2">
                <span className="font-bold text-white text-sm">K</span>
              </div>
              <span className="font-medium">Kolerr AI Agent</span>
            </div>
            <div className="flex items-center">
              <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse mr-2"></div>
              <span className="text-xs text-muted-foreground">Online</span>
            </div>
          </div>

          {/* KOL Search */}
          <div className="bg-secondary/50 p-4 border-b border-border">
            <div className="flex gap-2">
              <Input
                placeholder="Search for TikTok creators..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-background"
              />
              <Button size="icon" onClick={handleSearch}>
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Chat messages */}
          <div className="flex-1 p-4 overflow-y-auto bg-background/30">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`mb-4 flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
              >
                {message.type === "bot" && (
                  <div className="h-8 w-8 rounded-full bg-brand-pink flex items-center justify-center mr-2 flex-shrink-0">
                    <span className="font-bold text-white text-sm">K</span>
                  </div>
                )}
                <div
                  className={`p-3 rounded-lg max-w-[80%] ${
                    message.type === "user"
                      ? "bg-brand-navy text-white"
                      : "bg-secondary"
                  }`}
                >
                  {message.content}
                </div>
                {message.type === "user" && (
                  <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center ml-2 flex-shrink-0">
                    <User className="h-4 w-4" />
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Chat input */}
          <div className="p-4 border-t border-border bg-background flex gap-2">
            <Input
              placeholder="Type your message..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleSendMessage();
                }
              }}
              className="bg-secondary"
            />
            <Button onClick={handleSendMessage}>Send</Button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="h-6 w-6 rounded-md bg-brand-pink flex items-center justify-center mr-2">
                <span className="font-bold text-white text-xs">K</span>
              </div>
              <span className="font-bold">Kolerr IM Agent</span>
            </div>
            <div className="flex gap-6">
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground">Terms</a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground">Privacy</a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground">Contact</a>
            </div>
          </div>
          <div className="mt-6 text-center md:text-left text-sm text-muted-foreground">
            © 2025 Kolerr. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
