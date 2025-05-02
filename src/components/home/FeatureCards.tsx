
import React from "react";
import { Search } from "lucide-react";

export const FeatureCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
      <div className="glass-panel rounded-xl p-6 text-center">
        <div className="w-16 h-16 rounded-full bg-brand-pink/20 flex items-center justify-center mx-auto mb-4">
          <Search className="h-8 w-8 text-brand-pink" />
        </div>
        <h2 className="text-xl font-bold mb-3">AI-Powered Search</h2>
        <p className="text-muted-foreground">Find the perfect creators based on niche, audience, engagement, and more.</p>
      </div>
      
      <div className="glass-panel rounded-xl p-6 text-center">
        <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center mx-auto mb-4">
          <svg className="h-8 w-8 text-blue-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 12H12M12 12H16M12 12V8M12 12V16M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <h2 className="text-xl font-bold mb-3">Chat Assistant</h2>
        <p className="text-muted-foreground">Get recommendations and insights through our intuitive chat interface.</p>
      </div>
      
      <div className="glass-panel rounded-xl p-6 text-center">
        <div className="w-16 h-16 rounded-full bg-purple-500/20 flex items-center justify-center mx-auto mb-4">
          <svg className="h-8 w-8 text-purple-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 16V21M12 16L7 21M12 16L17 21M3 8L6.5 10L3 12L6.5 14L3 16L6.5 18L3 20L12 15L21 20L17.5 18L21 16L17.5 14L21 12L17.5 10L21 8L12 13L3 8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <h2 className="text-xl font-bold mb-3">Analytics & Insights</h2>
        <p className="text-muted-foreground">Detailed analytics to help you make data-driven decisions.</p>
      </div>
    </div>
  );
};
