
import { createContext, useContext, ReactNode, useState, useEffect } from "react";
import { useSearchCredits } from "@/hooks/useSearchCredits";
import { useAuth } from "@/contexts/AuthContext";
import { useIntelligentCredits } from "@/hooks/useIntelligentCredits";

interface CreditContextType {
  freeCredits: number;
  premiumCredits: number;
  totalCredits: number;
  useFreeCredit: () => boolean;
  usePremiumCredit: (amount: number) => boolean;
  timeUntilReset: string;
  hasPremiumPlan: boolean;
  useIntelligentCredit: (message: string) => boolean;
  generalQuestionsPerCredit: number;
}

const CreditContext = createContext<CreditContextType | undefined>(undefined);

export const CreditProvider = ({ children }: { children: ReactNode }) => {
  const { creditsLeft, useCredit, getTimeUntilReset } = useSearchCredits();
  const [premiumCredits, setPremiumCredits] = useState<number>(0);
  const { user, isAuthenticated } = useAuth();
  
  // Detect if user has premium plan
  const hasPremiumPlan = isAuthenticated && user?.subscription?.plan !== "free";
  
  // Initialize intelligent credits system
  const { 
    freeCredits,
    useIntelligentCredit,
    generalQuestionsPerCredit
  } = useIntelligentCredits(creditsLeft, hasPremiumPlan);
  
  // Load premium credits from localStorage or set default
  useEffect(() => {
    if (isAuthenticated) {
      const storedPremiumCredits = localStorage.getItem('premium_credits');
      if (storedPremiumCredits) {
        setPremiumCredits(parseInt(storedPremiumCredits));
      } else {
        // Set default premium credits based on subscription plan
        if (user?.subscription?.plan === "pro") {
          setPremiumCredits(500);
        } else if (user?.subscription?.plan === "growth") {
          setPremiumCredits(200);
        } else if (user?.subscription?.plan === "enterprise") {
          setPremiumCredits(2000);
        }
      }
    }
  }, [isAuthenticated, user?.subscription?.plan]);
  
  // Save premium credits to localStorage when they change
  useEffect(() => {
    if (isAuthenticated && premiumCredits !== 0) {
      localStorage.setItem('premium_credits', premiumCredits.toString());
    }
  }, [premiumCredits, isAuthenticated]);
  
  // New useFreeCredit that uses the intelligent system
  const useFreeCredit = () => {
    // Direct use of a credit bypassing the question classification
    // This is for backward compatibility with other components
    return useIntelligentCredit("find creator");
  };
  
  const usePremiumCredit = (amount: number) => {
    if (premiumCredits >= amount) {
      setPremiumCredits(prev => prev - amount);
      return true;
    }
    return false;
  };
  
  const totalCredits = freeCredits + premiumCredits;
  const timeUntilReset = getTimeUntilReset();
  
  return (
    <CreditContext.Provider value={{
      freeCredits,
      premiumCredits,
      totalCredits,
      useFreeCredit,
      usePremiumCredit,
      timeUntilReset,
      hasPremiumPlan,
      useIntelligentCredit,
      generalQuestionsPerCredit
    }}>
      {children}
    </CreditContext.Provider>
  );
};

export const useCredits = () => {
  const context = useContext(CreditContext);
  
  if (context === undefined) {
    throw new Error("useCredits must be used within a CreditProvider");
  }
  
  return context;
};
