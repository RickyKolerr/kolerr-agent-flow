import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, User, MessageCircle } from "lucide-react";

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
    content: "👋 Hi! I'm your AI agent for influencer discovery. What kind of TikTok creator are you looking for? Try searching by niche, follower count, or engagement rate."
  }]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (inputValue.trim() === "") return;
    const userMessage = {
      id: Date.now().toString(),
      type: "user",
      content: inputValue
    };
    setMessages(prev => [...prev, userMessage]);
    setInputValue("");

    setTimeout(() => {
      const botResponse = {
        id: (Date.now() + 1).toString(),
        type: "bot",
        content: getResponse(inputValue)
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  const handleSearch = () => {
    if (searchQuery.trim() === "") return;
    const searchMessage = {
      id: Date.now().toString(),
      type: "user",
      content: `Search for: ${searchQuery}`
    };
    setMessages(prev => [...prev, searchMessage]);

    setTimeout(() => {
      const botResponse = {
        id: (Date.now() + 1).toString(),
        type: "bot",
        content: `I found several TikTok creators matching "${searchQuery}". To see detailed analytics and book them, please sign in.`
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
    <div className="flex flex-col min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 flex-1 flex lg:flex-row flex-col gap-8">
        {/* Chat Interface - Takes more space now */}
        <div className="lg:w-2/3 w-full flex flex-col">
          <div className="rounded-xl border border-border overflow-hidden glass-panel shadow-lg flex flex-col h-[800px]">
            {/* Chat header */}
            <div className="bg-secondary p-4 border-b border-border flex justify-between items-center">
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-brand-pink flex items-center justify-center mr-3">
                  <MessageCircle className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h2 className="font-semibold text-lg">AI KOL Discovery Agent</h2>
                  <p className="text-sm text-muted-foreground">Find the perfect creators for your brand</p>
                </div>
              </div>
            </div>

            {/* Quick Search Bar */}
            <div className="bg-secondary/50 p-4 border-b border-border">
              <div className="flex gap-2">
                <Input 
                  placeholder="Quick search for TikTok creators..." 
                  value={searchQuery} 
                  onChange={e => setSearchQuery(e.target.value)}
                  className="bg-background"
                />
                <Button size="icon" onClick={handleSearch}>
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Chat messages */}
            <div className="flex-1 p-6 overflow-y-auto bg-background/30">
              {messages.map(message => (
                <div key={message.id} className={`mb-6 flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
                  {message.type === "bot" && (
                    <div className="h-8 w-8 rounded-full bg-brand-pink flex items-center justify-center mr-3 flex-shrink-0">
                      <MessageCircle className="h-4 w-4 text-white" />
                    </div>
                  )}
                  <div className={`p-4 rounded-lg max-w-[80%] ${message.type === "user" ? "bg-brand-navy text-white" : "bg-secondary"}`}>
                    {message.content}
                  </div>
                  {message.type === "user" && (
                    <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center ml-3 flex-shrink-0">
                      <User className="h-4 w-4" />
                    </div>
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Chat input */}
            <div className="p-4 border-t border-border bg-background">
              <div className="flex gap-2">
                <Input
                  placeholder="Ask about specific creator types, niches, or requirements..."
                  value={inputValue}
                  onChange={e => setInputValue(e.target.value)}
                  onKeyPress={e => {
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
        </div>

        {/* Quick Info Panel */}
        <div className="lg:w-1/3 w-full">
          <div className="rounded-xl border border-border p-6 glass-panel">
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
                <Button 
                  onClick={() => navigate("/signup")} 
                  className="w-full bg-brand-pink hover:bg-brand-pink/90"
                >
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
