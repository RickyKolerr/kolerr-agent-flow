
import React, { useEffect, useState } from "react";
import { HeroSection } from "@/components/home/HeroSection";
import { FeatureCards } from "@/components/home/FeatureCards";
import { FloatingChatButton } from "@/components/chat/FloatingChatButton";

const HomePage = () => {
  const [loaded, setLoaded] = useState(false);
  
  useEffect(() => {
    // Set loaded state after a short delay for entrance animations
    setTimeout(() => setLoaded(true), 100);
    
    // Initialize any animations or effects
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const heroGradient = document.querySelector('.hero-gradient') as HTMLElement;
      
      if (heroGradient) {
        // Subtle parallax effect on scroll
        const yPos = -(scrolled * 0.15);
        heroGradient.style.backgroundPosition = `center ${yPos}px`;
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col hero-gradient relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-dot-pattern opacity-20"></div>
      <div className="absolute -top-[40%] -right-[10%] w-[70%] h-[70%] bg-blue-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
      <div className="absolute -bottom-[30%] -left-[10%] w-[60%] h-[60%] bg-brand-pink/10 rounded-full blur-3xl animate-pulse-slow delay-700"></div>
      
      <div className={`container mx-auto px-4 py-16 max-w-7xl flex flex-col items-center justify-center flex-grow transition-all duration-1000 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
        <HeroSection />
        <FeatureCards />
      </div>
      
      <FloatingChatButton 
        initialMessage="👋 Hello! How can I assist you today with finding the perfect creators or campaigns?"
        chatType="general"
      />
    </div>
  );
};

export default HomePage;
