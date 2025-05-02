
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Sparkles, Star } from "lucide-react";
import { toast } from "sonner";
import { CreditBadge } from "@/components/CreditBadge";
import { useCredits } from "@/contexts/CreditContext";
import { useUserAccess } from "@/hooks/useUserAccess";
import { RESET_HOUR } from "@/constants/creditConstants";
import { getTimeUntilReset } from "@/utils/creditUtils";

export const HeroSection = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const { isAuthenticated } = useUserAccess();
  const { freeCredits, hasPremiumPlan } = useCredits();
  const [isVisible, setIsVisible] = useState(false);
  const [currentPlaceholderIndex, setCurrentPlaceholderIndex] = useState(0);
  const [placeholderText, setPlaceholderText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  
  const placeholders = [
    "Search for creators by niche...",
    "Find influencers in beauty...",
    "Discover TikTok creators...",
    "Search for gaming influencers...",
    "Find creators by audience...",
  ];
  
  const textRef = useRef<HTMLHeadingElement>(null);
  
  // Typing effect for placeholder text
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    let currentText = "";
    let currentIndex = 0;
    let isDeleting = false;
    
    const type = () => {
      const currentPlaceholder = placeholders[currentPlaceholderIndex];
      
      if (isDeleting) {
        currentText = currentPlaceholder.substring(0, currentIndex - 1);
        currentIndex -= 1;
      } else {
        currentText = currentPlaceholder.substring(0, currentIndex + 1);
        currentIndex += 1;
      }
      
      setPlaceholderText(currentText);
      
      // Speed adjustments
      let typingSpeed = isDeleting ? 30 : 70;
      
      // If complete
      if (!isDeleting && currentIndex === currentPlaceholder.length) {
        // Pause at the end
        timeout = setTimeout(() => {
          isDeleting = true;
          type();
        }, 1500);
        return;
      }
      
      // If deleted
      if (isDeleting && currentIndex === 0) {
        isDeleting = false;
        setCurrentPlaceholderIndex((prevIndex) => 
          (prevIndex + 1) % placeholders.length
        );
      }
      
      timeout = setTimeout(type, typingSpeed);
    };
    
    // Start typing effect
    timeout = setTimeout(type, 1000);
    
    return () => clearTimeout(timeout);
  }, [currentPlaceholderIndex, placeholders]);
  
  // Animation effects
  useEffect(() => {
    setIsVisible(true);
    
    // Text shimmer effect
    const textElement = textRef.current;
    if (textElement) {
      const handleMouseMove = (e: MouseEvent) => {
        const { left, top, width, height } = textElement.getBoundingClientRect();
        const x = (e.clientX - left) / width;
        const y = (e.clientY - top) / height;
        
        textElement.style.setProperty('--x', `${x * 100}%`);
        textElement.style.setProperty('--y', `${y * 100}%`);
      };
      
      window.addEventListener('mousemove', handleMouseMove);
      
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
      };
    }
  }, []);
  
  const handleSearch = () => {
    if (searchQuery.trim() === "") return;
    
    if (!hasPremiumPlan && freeCredits === 0) {
      if (!isAuthenticated) {
        navigate("/login");
        return;
      }
      
      toast.error("Out of free searches", {
        description: `Upgrade your plan to continue searching or wait until ${RESET_HOUR}:00 AM for your credits to reset (${getTimeUntilReset()} remaining).`
      });
      return;
    }

    // Navigate to search results
    navigate(`/search/results?q=${encodeURIComponent(searchQuery)}`);
  };
  
  return (
    <div className={`text-center max-w-4xl mx-auto mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'}`}>
      <div className="relative mb-6">
        <span className="absolute -top-12 right-1/4 text-5xl animate-bounce-slow">✨</span>
        <Sparkles className="absolute -top-6 left-1/3 h-10 w-10 text-brand-pink opacity-75 animate-pulse-slow" />
        <Star className="absolute -top-8 right-1/3 h-6 w-6 text-yellow-400 opacity-75 animate-pulse" />
      </div>
      
      <h1 
        ref={textRef}
        className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 relative shimmer-text"
        style={{
          background: 'linear-gradient(120deg, #ffffff, #f472b6, #60a5fa, #ffffff)',
          backgroundSize: '300% 100%',
          backgroundPosition: 'var(--x, 0%) var(--y, 0%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          textShadow: '0 8px 24px rgba(0,0,0,0.2)'
        }}
      >
        Discover Influential<br/>Creators with AI
      </h1>
      
      <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
        <span className="text-white font-medium">Connect</span> with TikTok creators,{' '}
        <span className="text-brand-pink font-medium">analyze</span> performance metrics, and{' '}
        <span className="text-blue-400 font-medium">manage</span> campaigns with our AI platform
      </p>
      
      <div className="relative glass-card hover-glass bg-black/40 backdrop-blur-xl rounded-2xl p-6 mb-8 border border-white/20 shadow-glow transition-all duration-500 max-w-2xl mx-auto">
        <div className="flex gap-2">
          <Input 
            placeholder={placeholderText}
            value={searchQuery} 
            onChange={e => setSearchQuery(e.target.value)}
            className="bg-black/60 border-white/10 focus:border-brand-pink/50 transition-all text-lg h-12"
          />
          <Button 
            size="lg" 
            onClick={handleSearch}
            className="bg-gradient-to-r from-brand-pink to-blue-500 hover:from-brand-pink/90 hover:to-blue-500/90 text-white transition-all duration-500 hover:shadow-glow h-12 px-6"
          >
            <Search className="h-5 w-5 mr-2" />
            <span>Search</span>
          </Button>
        </div>
        
        {!hasPremiumPlan && (
          <div className="mt-4 text-sm text-muted-foreground flex justify-between items-center">
            <span>{freeCredits} free {freeCredits === 1 ? 'search' : 'searches'} remaining</span>
            {isAuthenticated && <CreditBadge variant="compact" />}
          </div>
        )}
        
        {/* Animated background elements */}
        <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] opacity-20 blur-3xl bg-gradient-to-r from-brand-pink via-purple-500 to-blue-500 rounded-full animate-pulse-slow"></div>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button 
          size="lg" 
          onClick={() => navigate("/signup")}
          className="bg-gradient-to-r from-brand-pink to-brand-orange hover:brightness-110 px-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:translate-y-[-2px] relative overflow-hidden action-button h-14"
        >
          <span className="z-10 font-medium">Get Started Free</span>
          <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-orange-500/20 animate-shimmer-slow"></div>
        </Button>
        <Button 
          size="lg" 
          variant="outline" 
          onClick={() => navigate("/features")}
          className="border-white/20 hover:bg-white/10 shadow-lg hover:shadow-xl transition-all duration-300 hover:translate-y-[-2px] h-14"
        >
          Explore Features
        </Button>
      </div>
      
      <div className="flex justify-center gap-6 mt-8">
        <div className="bg-black/30 backdrop-blur-md rounded-lg px-4 py-2 border border-white/10">
          <span className="text-xl font-bold text-blue-400">500K+</span>
          <p className="text-sm text-white/70">Creators</p>
        </div>
        <div className="bg-black/30 backdrop-blur-md rounded-lg px-4 py-2 border border-white/10">
          <span className="text-xl font-bold text-brand-pink">98%</span>
          <p className="text-sm text-white/70">Match Rate</p>
        </div>
        <div className="bg-black/30 backdrop-blur-md rounded-lg px-4 py-2 border border-white/10">
          <span className="text-xl font-bold text-brand-orange">24/7</span>
          <p className="text-sm text-white/70">AI Support</p>
        </div>
      </div>
    </div>
  );
};
