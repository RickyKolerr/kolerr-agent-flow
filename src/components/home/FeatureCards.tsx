
import React, { useEffect, useRef } from "react";
import { Search, MessageSquare, BarChart3, Star, Zap, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

// Enhanced 3D tilt effect
const useTilt = (ref: React.RefObject<HTMLDivElement>, intensity: number = 1) => {
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
      
      const tiltX = ((y - centerY) / centerY) * (8 * intensity);
      const tiltY = ((centerX - x) / centerX) * (8 * intensity);
      const glareX = ((x / rect.width) * 100);
      const glareY = ((y / rect.height) * 100);
      
      // Apply the 3D transform and glare effect
      (element as HTMLElement).style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.03, 1.03, 1.03)`;
      
      // Update glare position
      const glareElement = element.querySelector('.glare') as HTMLElement;
      if (glareElement) {
        glareElement.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 50%)`;
      }
    };
    
    const handleMouseLeave = () => {
      if (!element) return;
      (element as HTMLElement).style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
      
      const glareElement = element.querySelector('.glare') as HTMLElement;
      if (glareElement) {
        glareElement.style.background = 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0) 0%, rgba(255,255,255,0) 100%)';
      }
    };
    
    const handleMouseEnter = () => {
      if (!element) return;
      (element as HTMLElement).style.transition = 'transform 0.2s cubic-bezier(0.33, 1, 0.68, 1)';
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
  }, [ref, intensity]);
};

export const FeatureCards = () => {
  const navigate = useNavigate();
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);
  const card4Ref = useRef<HTMLDivElement>(null);
  const card5Ref = useRef<HTMLDivElement>(null);
  const card6Ref = useRef<HTMLDivElement>(null);
  
  useTilt(card1Ref, 1.2);
  useTilt(card2Ref, 1.2);
  useTilt(card3Ref, 1.2);
  useTilt(card4Ref, 0.8);
  useTilt(card5Ref, 0.8);
  useTilt(card6Ref, 0.8);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('animate-fade-in');
              entry.target.classList.remove('opacity-0');
              entry.target.classList.remove('translate-y-10');
            }, index * 100);
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
    <div className="space-y-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient bg-gradient-to-r from-white via-brand-pink to-blue-500 inline-block">
          Powerful Features
        </h2>
        <p className="text-xl text-white/70 max-w-2xl mx-auto">
          Everything you need to discover, analyze and collaborate with influencers
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <div 
          ref={card1Ref}
          className="feature-card opacity-0 translate-y-10 transition-all duration-500 relative bg-black/40 backdrop-blur-xl rounded-xl p-6 border border-white/10 shadow-lg hover:shadow-xl h-[280px] flex flex-col"
          style={{ transition: 'transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease' }}
        >
          <div className="glare absolute inset-0 pointer-events-none rounded-xl z-10"></div>
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-pink/30 to-brand-pink/10 flex items-center justify-center mb-4 transition-transform hover:scale-110 duration-300">
            <Search className="h-8 w-8 text-brand-pink" />
          </div>
          <h3 className="text-xl font-bold mb-3 bg-gradient-to-r from-white to-brand-pink/80 bg-clip-text text-transparent">AI-Powered Search</h3>
          <p className="text-white/70 flex-grow">Find the perfect creators based on niche, audience demographics, engagement rates, and content style.</p>
          <div className="absolute bottom-0 right-0 w-32 h-32 rounded-br-xl opacity-5 bg-gradient-to-br from-transparent to-brand-pink"></div>
        </div>
        
        <div 
          ref={card2Ref}
          className="feature-card opacity-0 translate-y-10 transition-all duration-500 relative bg-black/40 backdrop-blur-xl rounded-xl p-6 border border-white/10 shadow-lg hover:shadow-xl h-[280px] flex flex-col"
          style={{ transition: 'transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease' }}
        >
          <div className="glare absolute inset-0 pointer-events-none rounded-xl z-10"></div>
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/30 to-blue-500/10 flex items-center justify-center mb-4 transition-transform hover:scale-110 duration-300">
            <MessageSquare className="h-8 w-8 text-blue-500" />
          </div>
          <h3 className="text-xl font-bold mb-3 bg-gradient-to-r from-white to-blue-500/80 bg-clip-text text-transparent">Intelligent Chat</h3>
          <p className="text-white/70 flex-grow">Get personalized recommendations and insights through our intuitive AI assistant.</p>
          <div className="absolute bottom-0 right-0 w-32 h-32 rounded-br-xl opacity-5 bg-gradient-to-br from-transparent to-blue-500"></div>
        </div>
        
        <div 
          ref={card3Ref}
          className="feature-card opacity-0 translate-y-10 transition-all duration-500 relative bg-black/40 backdrop-blur-xl rounded-xl p-6 border border-white/10 shadow-lg hover:shadow-xl h-[280px] flex flex-col"
          style={{ transition: 'transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease' }}
        >
          <div className="glare absolute inset-0 pointer-events-none rounded-xl z-10"></div>
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500/30 to-purple-500/10 flex items-center justify-center mb-4 transition-transform hover:scale-110 duration-300">
            <BarChart3 className="h-8 w-8 text-purple-500" />
          </div>
          <h3 className="text-xl font-bold mb-3 bg-gradient-to-r from-white to-purple-500/80 bg-clip-text text-transparent">Deep Analytics</h3>
          <p className="text-white/70 flex-grow">Comprehensive performance metrics and audience insights to make data-driven decisions.</p>
          <div className="absolute bottom-0 right-0 w-32 h-32 rounded-br-xl opacity-5 bg-gradient-to-br from-transparent to-purple-500"></div>
        </div>
        
        <div 
          ref={card4Ref}
          className="feature-card opacity-0 translate-y-10 transition-all duration-500 relative bg-black/40 backdrop-blur-xl rounded-xl p-6 border border-white/10 shadow-lg hover:shadow-xl h-[280px] flex flex-col"
          style={{ transition: 'transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease' }}
        >
          <div className="glare absolute inset-0 pointer-events-none rounded-xl z-10"></div>
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500/30 to-green-500/10 flex items-center justify-center mb-4 transition-transform hover:scale-110 duration-300">
            <Star className="h-8 w-8 text-green-500" />
          </div>
          <h3 className="text-xl font-bold mb-3 bg-gradient-to-r from-white to-green-500/80 bg-clip-text text-transparent">Campaign Management</h3>
          <p className="text-white/70 flex-grow">Streamline your influencer campaigns from discovery to execution with our end-to-end tools.</p>
          <div className="absolute bottom-0 right-0 w-32 h-32 rounded-br-xl opacity-5 bg-gradient-to-br from-transparent to-green-500"></div>
        </div>
        
        <div 
          ref={card5Ref}
          className="feature-card opacity-0 translate-y-10 transition-all duration-500 relative bg-black/40 backdrop-blur-xl rounded-xl p-6 border border-white/10 shadow-lg hover:shadow-xl h-[280px] flex flex-col"
          style={{ transition: 'transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease' }}
        >
          <div className="glare absolute inset-0 pointer-events-none rounded-xl z-10"></div>
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-yellow-500/30 to-yellow-500/10 flex items-center justify-center mb-4 transition-transform hover:scale-110 duration-300">
            <Zap className="h-8 w-8 text-yellow-500" />
          </div>
          <h3 className="text-xl font-bold mb-3 bg-gradient-to-r from-white to-yellow-500/80 bg-clip-text text-transparent">Automated Matching</h3>
          <p className="text-white/70 flex-grow">Our AI automatically matches your brand with the most suitable creators based on your specific requirements.</p>
          <div className="absolute bottom-0 right-0 w-32 h-32 rounded-br-xl opacity-5 bg-gradient-to-br from-transparent to-yellow-500"></div>
        </div>
        
        <div 
          ref={card6Ref}
          className="feature-card opacity-0 translate-y-10 transition-all duration-500 relative bg-black/40 backdrop-blur-xl rounded-xl p-6 border border-white/10 shadow-lg hover:shadow-xl h-[280px] flex flex-col"
          style={{ transition: 'transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease' }}
        >
          <div className="glare absolute inset-0 pointer-events-none rounded-xl z-10"></div>
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-orange/30 to-brand-orange/10 flex items-center justify-center mb-4 transition-transform hover:scale-110 duration-300">
            <Globe className="h-8 w-8 text-brand-orange" />
          </div>
          <h3 className="text-xl font-bold mb-3 bg-gradient-to-r from-white to-brand-orange/80 bg-clip-text text-transparent">Global Reach</h3>
          <p className="text-white/70 flex-grow">Connect with creators across multiple platforms and regions to expand your brand's global presence.</p>
          <div className="absolute bottom-0 right-0 w-32 h-32 rounded-br-xl opacity-5 bg-gradient-to-br from-transparent to-brand-orange"></div>
        </div>
      </div>
      
      <div className="text-center mt-12 pt-6">
        <Button
          size="lg"
          onClick={() => navigate("/features")}
          className="bg-white text-black hover:bg-white/90 px-8 py-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:translate-y-[-2px] text-lg font-medium"
        >
          Explore All Features
        </Button>
      </div>
    </div>
  );
};
