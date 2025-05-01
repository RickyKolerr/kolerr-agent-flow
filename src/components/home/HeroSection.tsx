
import React from "react";
import { CreditBadge } from "@/components/CreditBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useUserAccess } from "@/hooks/useUserAccess";
import { useNavigate } from "react-router-dom";

interface HeroSectionProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleSearch: () => void;
  getCreditUsageText: () => string;
  isAuthenticated: boolean;
  hasPremiumPlan: boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  searchQuery,
  setSearchQuery,
  handleSearch,
  getCreditUsageText,
  isAuthenticated,
  hasPremiumPlan
}) => {
  const navigate = useNavigate();
  const { canAccessFeature } = useUserAccess();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full">
      <div className="lg:col-span-2">
        <div className="rounded-2xl overflow-hidden glass-panel shadow-2xl flex flex-col">
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
              <Input 
                placeholder="Quick search for TikTok creators..." 
                value={searchQuery} 
                onChange={e => setSearchQuery(e.target.value)} 
                className="bg-black/60" 
              />
              <Button size="icon" variant="secondary" onClick={handleSearch}>
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <InfoPanel />
    </div>
  );
};

// Import MessageCircle and Lock inside this file to avoid adding them as props
import { MessageCircle, Lock } from "lucide-react";

// Include the InfoPanel as a subcomponent since it's only used here
const InfoPanel: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="lg:col-span-1">
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
      
      <CreditInfoCard />
    </div>
  );
};

import { CreditCounter } from "@/components/CreditCounter";
import { CreditCard } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const CreditInfoCard: React.FC = () => {
  const navigate = useNavigate();
  const { freeCredits, hasPremiumPlan } = useCredits();

  return (
    <div className="rounded-2xl glass-panel p-6 shadow-2xl mt-6 relative">
      <DemoIndicator 
        section="Credit System" 
        icon="info"
        tooltip={
          <div className="text-sm space-y-1">
            <p>The Kolerr credit system intelligently manages your free searches.</p>
            <p>Different question types consume credits at different rates.</p>
          </div>
        }
      />
      <h3 className="text-lg font-bold mb-3 flex items-center">
        <CreditCard className="h-4 w-4 text-brand-pink mr-2" />
        Understanding Credits
      </h3>
      
      <CreditCounter />
      
      <div className="mt-4 pt-4 border-t border-white/10">
        <div className="flex justify-between items-center">
          <span className="text-sm">Current balance:</span>
          <div>
            <Badge className="bg-brand-pink/80 hover:bg-brand-pink">
              {freeCredits} {freeCredits === 1 ? 'credit' : 'credits'}
            </Badge>
          </div>
        </div>
        {!hasPremiumPlan && (
          <Button 
            variant="outline" 
            className="w-full mt-4 text-brand-pink border-brand-pink/30 hover:bg-brand-pink/10"
            onClick={() => navigate("/pricing")}
          >
            Get Unlimited With Premium
          </Button>
        )}
      </div>
    </div>
  );
};

import { useCredits } from "@/contexts/CreditContext";
import { DemoIndicator } from "@/components/demo/DemoIndicator";
