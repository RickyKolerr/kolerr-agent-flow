import React, { useEffect, useRef } from "react";
import { Search } from "lucide-react";

// Simple vanilla JS tilt effect
const useTilt = (ref: React.RefObject<HTMLDivElement>) => {
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!element) return;
      
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const tiltX = (y - centerY) / 15;
      const tiltY = (centerX - x) / 15;
      
      // Fix: Cast the element to HTMLElement to access the style property
      (element as HTMLElement).style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02)`;
    };
    
    const handleMouseLeave = () => {
      if (!element) return;
      // Fix: Cast the element to HTMLElement to access the style property
      (element as HTMLElement).style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    };
    
    const handleMouseEnter = () => {
      if (!element) return;
      // Fix: Cast the element to HTMLElement to access the style property
      (element as HTMLElement).style.transition = 'none';
    };
    
    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);
    element.addEventListener('mouseenter', handleMouseEnter);
    
    return () => {
      if (!element) return;
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
      element.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [ref]);
};

export const FeatureCards = () => {
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);
  
  useTilt(card1Ref);
  useTilt(card2Ref);
  useTilt(card3Ref);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
            // Fix: Cast entry.target to HTMLElement to access the style property
            (entry.target as HTMLElement).style.animationDelay = `${index * 200}ms`;
          }
        });
      },
      { threshold: 0.1 }
    );
    
    const cards = document.querySelectorAll('.feature-card');
    cards.forEach((card) => observer.observe(card));
    
    return () => {
      cards.forEach((card) => observer.unobserve(card));
    };
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
      <div 
        ref={card1Ref}
        className="feature-card glass-panel rounded-xl p-6 text-center transition-all duration-300 opacity-0 border border-white/10 shadow-lg hover:shadow-xl hover:border-brand-pink/30"
        style={{ transition: 'transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease' }}
      >
        <div className="w-16 h-16 rounded-full bg-brand-pink/20 flex items-center justify-center mx-auto mb-4 transition-transform hover:scale-110 duration-300">
          <Search className="h-8 w-8 text-brand-pink animate-pulse" />
        </div>
        <h2 className="text-xl font-bold mb-3 bg-gradient-to-r from-white to-brand-pink/80 bg-clip-text text-transparent">AI-Powered Search</h2>
        <p className="text-muted-foreground">Find the perfect creators based on niche, audience, engagement, and more.</p>
      </div>
      
      <div 
        ref={card2Ref}
        className="feature-card glass-panel rounded-xl p-6 text-center transition-all duration-300 opacity-0 border border-white/10 shadow-lg hover:shadow-xl hover:border-blue-500/30"
        style={{ transition: 'transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease' }}
      >
        <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center mx-auto mb-4 transition-transform hover:scale-110 duration-300">
          <svg className="h-8 w-8 text-blue-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 12H12M12 12H16M12 12V8M12 12V16M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <h2 className="text-xl font-bold mb-3 bg-gradient-to-r from-white to-blue-500/80 bg-clip-text text-transparent">Chat Assistant</h2>
        <p className="text-muted-foreground">Get recommendations and insights through our intuitive chat interface.</p>
      </div>
      
      <div 
        ref={card3Ref}
        className="feature-card glass-panel rounded-xl p-6 text-center transition-all duration-300 opacity-0 border border-white/10 shadow-lg hover:shadow-xl hover:border-purple-500/30"
        style={{ transition: 'transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease' }}
      >
        <div className="w-16 h-16 rounded-full bg-purple-500/20 flex items-center justify-center mx-auto mb-4 transition-transform hover:scale-110 duration-300">
          <svg className="h-8 w-8 text-purple-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 16V21M12 16L7 21M12 16L17 21M3 8L6.5 10L3 12L6.5 14L3 16L6.5 18L3 20L12 15L21 20L17.5 18L21 16L17.5 14L21 12L17.5 10L21 8L12 13L3 8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <h2 className="text-xl font-bold mb-3 bg-gradient-to-r from-white to-purple-500/80 bg-clip-text text-transparent">Analytics & Insights</h2>
        <p className="text-muted-foreground">Detailed analytics to help you make data-driven decisions.</p>
      </div>
    </div>
  );
};
