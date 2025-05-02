
import React, { useEffect, useState, useRef } from "react";
import { HeroSection } from "@/components/home/HeroSection";
import { FeatureCards } from "@/components/home/FeatureCards";
import { FloatingChatButton } from "@/components/chat/FloatingChatButton";
import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const HomePage = () => {
  const [loaded, setLoaded] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const featuresRef = useRef<HTMLDivElement>(null);
  
  // Handle smooth scrolling to features section
  const scrollToFeatures = () => {
    featuresRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  useEffect(() => {
    // Set loaded state after a short delay for entrance animations
    setTimeout(() => setLoaded(true), 100);
    
    // Initialize any animations or effects based on scroll
    const handleScroll = () => {
      const scrolled = window.scrollY;
      setScrollPosition(scrolled);
      
      const heroGradient = document.querySelector('.hero-gradient') as HTMLElement;
      const particles = document.querySelectorAll('.particle') as NodeListOf<HTMLElement>;
      
      if (heroGradient) {
        // Dynamic parallax effect with rotation based on scroll
        const yPos = -(scrolled * 0.15);
        const rotationDeg = scrolled * 0.02;
        heroGradient.style.backgroundPosition = `center ${yPos}px`;
        heroGradient.style.transform = `rotate(${rotationDeg}deg)`;
      }
      
      // Animate particles on scroll
      particles.forEach((particle, index) => {
        const speed = 0.1 + (index % 5) * 0.05;
        const yPos = scrolled * speed;
        const rotation = scrolled * (0.02 + (index % 3) * 0.01);
        particle.style.transform = `translateY(${yPos}px) rotate(${rotation}deg)`;
        particle.style.opacity = String(Math.max(0, 1 - (scrolled * 0.001))); // Converting number to string
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col hero-gradient relative overflow-hidden">
      {/* Animated particles background */}
      {Array.from({ length: 20 }).map((_, index) => (
        <div 
          key={index}
          className={`particle absolute rounded-full opacity-20 ${
            index % 2 === 0 ? 'bg-brand-pink/30' : 'bg-blue-500/30'
          }`}
          style={{
            width: `${20 + (index % 5) * 10}px`,
            height: `${20 + (index % 5) * 10}px`,
            left: `${(index * 5) % 100}%`,
            top: `${(index * 7) % 80}%`,
            animationDelay: `${index * 0.2}s`,
            animationDuration: `${5 + index % 10}s`,
            filter: `blur(${2 + (index % 4)}px)`
          }}
        />
      ))}
      
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-dot-pattern opacity-20 animate-pulse-slow"></div>
      <div className="absolute -top-[30%] -right-[5%] w-[60%] h-[60%] bg-blue-500/20 rounded-full blur-3xl animate-pulse-slow"></div>
      <div className="absolute -bottom-[20%] -left-[5%] w-[50%] h-[50%] bg-brand-pink/20 rounded-full blur-3xl animate-pulse-slow delay-700"></div>
      
      {/* Abstract decorative elements */}
      <div className="absolute top-[20%] right-[10%] w-[200px] h-[200px] border border-white/10 rounded-full animate-spin-slow"></div>
      <div className="absolute bottom-[30%] left-[5%] w-[150px] h-[150px] border-2 border-white/5 rounded-full animate-reverse-spin-slow"></div>
      <div className="absolute top-[40%] left-[15%] w-24 h-24 backdrop-blur-md bg-gradient-to-br from-blue-500/10 to-brand-pink/10 rounded-lg rotate-12 animate-float"></div>
      
      <div className={`container mx-auto px-4 py-16 max-w-7xl flex flex-col items-center justify-center flex-grow transition-all duration-1000 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
        {/* Hero section with dramatic entrance */}
        <div className="relative z-10">
          <HeroSection />
          
          {/* Scroll indicator */}
          <div className="absolute bottom-[-100px] left-1/2 transform -translate-x-1/2 flex flex-col items-center opacity-80 hover:opacity-100 transition-opacity animate-bounce-slow">
            <span className="text-white/70 text-sm mb-2">Explore Features</span>
            <Button 
              variant="ghost" 
              size="icon" 
              className="rounded-full border border-white/10 bg-black/20 backdrop-blur-md hover:bg-white/10"
              onClick={scrollToFeatures}
            >
              <ArrowDown className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        {/* Features section with ref for scroll target */}
        <div 
          ref={featuresRef} 
          className="mt-32 pt-16 w-full"
          style={{
            opacity: Math.min(1, scrollPosition / 300).toString(), // Convert number to string
            transform: `translateY(${Math.max(0, 50 - scrollPosition / 10)}px)`
          }}
        >
          <FeatureCards />
        </div>
      </div>
      
      {/* Stylized wave divider */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden">
        <svg 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none" 
          className="absolute bottom-0 w-full h-16 md:h-24"
        >
          <path 
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.11,150.07,99.17,232.5,88.16,294.12,79.83,266.33,65.26,321.39,56.44Z" 
            className="fill-black/20 backdrop-blur"
          ></path>
        </svg>
      </div>
      
      <FloatingChatButton 
        initialMessage="✨ Welcome! How can I help you discover the perfect influencers today?"
        chatType="general"
      />
    </div>
  );
};

export default HomePage;
