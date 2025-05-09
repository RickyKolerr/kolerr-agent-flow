
import { createContext, useContext, ReactNode, useState, useEffect } from "react";
import { useSearchCredits } from "@/hooks/useSearchCredits";
import { useAuth } from "@/contexts/AuthContext";
import { useIntelligentCredits } from "@/hooks/useIntelligentCredits";
import { toast } from "sonner";
import { RESET_HOUR } from "@/hooks/useSearchCredits";

interface CreditPackage {
  id: string;
  purchaseDate: string;
  expirationDate: string;
  creditsTotal: number;
  creditsRemaining: number;
}

interface CreditContextType {
  freeCredits: number;
  premiumCredits: number;
  totalCredits: number;
  useFreeCredit: () => boolean;
  usePremiumCredit: (amount: number) => boolean;
  timeUntilReset: string;
  hasPremiumPlan: boolean;
  remainingGeneralQuestions: number;
  creditUsageAnalytics: {
    kolQueries: number;
    generalQueries: number;
    totalQueries: number;
    creditEfficiency: number;
  };
  getCreditHistory: () => Array<{
    query: string;
    creditCost: number;
    type: "kol" | "general";
    timestamp: number;
  }>;
  checkMessageCredit: (message: string) => {
    isKOLQuery: boolean;
    confidenceScore: number;
    estimatedCost: number;
  };
  creditPackages: CreditPackage[];
}

const CreditContext = createContext<CreditContextType | undefined>(undefined);

export const CreditProvider = ({ children }: { children: ReactNode }) => {
  const { creditsLeft, useCredit, getTimeUntilReset } = useSearchCredits();
  const [premiumCredits, setPremiumCredits] = useState<number>(0);
  const { user, isAuthenticated } = useAuth();
  const [creditPackages, setCreditPackages] = useState<CreditPackage[]>([]);
  
  // Detect if user has premium plan
  const hasPremiumPlan = isAuthenticated && user?.subscription?.plan !== "free";
  
  // Initialize intelligent credits system
  const { 
    freeCredits,
    useIntelligentCredit,
    isKOLSpecificQuery,
    calculateKOLConfidence,
    getSearchHistory,
    remainingGeneralQuestions
  } = useIntelligentCredits(creditsLeft, hasPremiumPlan);
  
  // New analytics state
  const [creditUsageAnalytics, setCreditUsageAnalytics] = useState({
    kolQueries: 0,
    generalQueries: 0,
    totalQueries: 0,
    creditEfficiency: 0
  });
  
  // Calculate analytics based on search history
  useEffect(() => {
    const history = getSearchHistory();
    
    if (history.length > 0) {
      const kolQueries = history.filter(item => item.type === "kol").length;
      const generalQueries = history.filter(item => item.type === "general").length;
      const totalQueries = history.length;
      
      // Calculate credit efficiency (queries per credit)
      const totalCreditCost = history.reduce((sum, item) => sum + item.creditCost, 0);
      const creditEfficiency = totalCreditCost > 0 ? totalQueries / totalCreditCost : 0;
      
      setCreditUsageAnalytics({
        kolQueries,
        generalQueries,
        totalQueries,
        creditEfficiency
      });
    }
  }, [getSearchHistory]);
  
  // Load premium credits and purchased packages from localStorage or set default
  useEffect(() => {
    if (isAuthenticated) {
      // Load premium credits
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

      // Load purchased credit packages
      const storedPackages = localStorage.getItem('credit_packages');
      if (storedPackages) {
        setCreditPackages(JSON.parse(storedPackages));
      }
    }
  }, [isAuthenticated, user?.subscription?.plan]);
  
  // Save premium credits to localStorage when they change
  useEffect(() => {
    if (isAuthenticated && premiumCredits !== 0) {
      localStorage.setItem('premium_credits', premiumCredits.toString());
    }
  }, [premiumCredits, isAuthenticated]);

  // Save credit packages to localStorage when they change
  useEffect(() => {
    if (isAuthenticated && creditPackages.length > 0) {
      localStorage.setItem('credit_packages', JSON.stringify(creditPackages));
    }
  }, [creditPackages, isAuthenticated]);
  
  // Check for expired credit packages daily
  useEffect(() => {
    const checkExpiredPackages = () => {
      const now = new Date();
      const expiredPackages = creditPackages.filter(pkg => new Date(pkg.expirationDate) < now);
      
      if (expiredPackages.length > 0) {
        // Remove expired packages and notify user
        const remainingPackages = creditPackages.filter(pkg => new Date(pkg.expirationDate) >= now);
        setCreditPackages(remainingPackages);

        expiredPackages.forEach(pkg => {
          toast.warning("Credit package expired", {
            description: `Your ${pkg.creditsTotal} credit package has expired. Unused credits (${pkg.creditsRemaining}) have been removed.`,
            duration: 10000,
          });
        });
      }
    };

    // Check on initial load
    checkExpiredPackages();

    // Set up daily check
    const intervalId = setInterval(checkExpiredPackages, 86400000); // 24 hours
    return () => clearInterval(intervalId);
  }, [creditPackages]);
  
  // Check if user has low credits and should be notified
  useEffect(() => {
    // Skip notifications for premium users
    if (hasPremiumPlan) return;
    
    // Show notification when credits are running low (20% or less)
    const lowCreditThreshold = Math.ceil(creditsLeft * 0.2);
    if (freeCredits <= lowCreditThreshold && freeCredits > 0) {
      toast.warning("Credits running low", {
        description: `You have ${freeCredits} free ${freeCredits === 1 ? 'credit' : 'credits'} remaining. Credits reset at ${RESET_HOUR}:00 AM.`,
        action: {
          label: "Get More",
          onClick: () => window.location.href = "/pricing"
        }
      });
    }

    // Check if any credit packages will expire in the next 7 days
    const now = new Date();
    const sevenDaysFromNow = new Date();
    sevenDaysFromNow.setDate(now.getDate() + 7);
    
    const soonToExpirePackages = creditPackages.filter(pkg => {
      const expirationDate = new Date(pkg.expirationDate);
      return expirationDate > now && expirationDate <= sevenDaysFromNow && pkg.creditsRemaining > 0;
    });

    if (soonToExpirePackages.length > 0) {
      soonToExpirePackages.forEach(pkg => {
        toast.warning("Credits expiring soon", {
          description: `You have ${pkg.creditsRemaining} credits expiring on ${new Date(pkg.expirationDate).toLocaleDateString()}. Use them before they expire.`,
          duration: 10000,
        });
      });
    }
  }, [freeCredits, hasPremiumPlan, creditsLeft, creditPackages]);
  
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
  
  // Analyze a message to determine credit cost before actual use
  const checkMessageCredit = (message: string) => {
    const isKOLQuery = isKOLSpecificQuery(message);
    const confidenceScore = calculateKOLConfidence(message);
    const estimatedCost = isKOLQuery ? 1 : (1/3); // General questions cost 1/3 credit
    
    return {
      isKOLQuery,
      confidenceScore,
      estimatedCost
    };
  };
  
  const getCreditHistory = () => getSearchHistory();
  
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
      remainingGeneralQuestions,
      creditUsageAnalytics,
      getCreditHistory,
      checkMessageCredit,
      creditPackages
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
