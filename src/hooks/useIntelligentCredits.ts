
import { useState, useEffect } from 'react';
import { toast } from "sonner";
import { getTimeUntilReset, RESET_HOUR } from "./useSearchCredits";

// Constants for credit system
const GENERAL_QUESTIONS_PER_CREDIT = 3;

// Enhanced pattern detection with more comprehensive categories
const KOL_PATTERNS = {
  // Core KOL-related terms
  core: ['kol', 'creator', 'influencer', 'tiktok', 'search', 'find', 'campaign',
    'follower', 'niche', 'engagement'],
  
  // Industry/category terms that indicate KOL search
  industries: ['fashion', 'beauty', 'gaming', 'tech', 'travel', 'food', 'fitness', 
    'lifestyle', 'music', 'sports', 'comedy', 'education', 'finance', 'health', 
    'wellness', 'automotive', 'pets', 'parenting', 'home', 'decor', 'luxury'],
  
  // Action words indicating search intent
  actions: ['recommend', 'suggest', 'locate', 'identify', 'discover', 'show me',
    'find me', 'search for', 'who should', 'who can', 'best', 'top', 'popular'],
  
  // Monetary terms indicating commercial intent
  commercial: ['sponsor', 'promote', 'advertise', 'collaborate', 'partnership', 'deal', 'cost',
    'budget', 'roi', 'conversion', 'revenue', 'sales', 'monetize', 'profit', 'payment', 'earnings'],
  
  // Specific metrics
  metrics: ['views', 'likes', 'followers', 'engagement rate', 'audience', 'reach',
    'impressions', 'conversion rate', 'demographics', 'analytics', 'performance', 'growth']
};

// Identifying phrases that strongly indicate specific search intents
const SEARCH_INTENT_PHRASES = [
  "who can", "who should", "looking for someone", "need a creator", 
  "best creator", "top influencer", "recommend", "suggestion",
  "find me", "help me find", "search for", "show me", 
  "campaign suitable for", "match me with", "connect with"
];

interface IntelligentCreditStore {
  freeCredits: number;
  generalQuestionCounter: number;
  lastReset: string;
  searchHistory: Array<{
    query: string;
    creditCost: number;
    type: "kol" | "general";
    timestamp: number;
  }>;
}

export const useIntelligentCredits = (initialFreeCredits: number, hasPremiumPlan: boolean) => {
  // Initialize from localStorage or with default values
  const [creditState, setCreditState] = useState<IntelligentCreditStore>(() => {
    const stored = localStorage.getItem('intelligent_credits');
    if (!stored) {
      return {
        freeCredits: initialFreeCredits,
        generalQuestionCounter: 0,
        lastReset: new Date().toISOString(),
        searchHistory: []
      };
    }
    
    const parsedStore = JSON.parse(stored);
    const now = new Date();
    const resetTime = new Date(parsedStore.lastReset);
    resetTime.setHours(RESET_HOUR, 0, 0, 0);
    
    if (now.getTime() > resetTime.getTime() && 
        (now.getDate() > resetTime.getDate() || 
         now.getMonth() > resetTime.getMonth() ||
         now.getFullYear() > resetTime.getFullYear())) {
      // Reset credits if it's past the reset time
      return {
        freeCredits: initialFreeCredits,
        generalQuestionCounter: 0,
        lastReset: now.toISOString(),
        searchHistory: parsedStore.searchHistory || []
      };
    }
    
    // Ensure searchHistory exists
    if (!parsedStore.searchHistory) {
      parsedStore.searchHistory = [];
    }
    
    return parsedStore;
  });

  // Persist credit state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('intelligent_credits', JSON.stringify(creditState));
  }, [creditState]);

  // Calculate confidence score for KOL-specific query (0-100)
  const calculateKOLConfidence = (message: string): number => {
    const lowerMsg = message.toLowerCase();
    let score = 0;
    
    // Check for core KOL terms (highest weight)
    KOL_PATTERNS.core.forEach(term => {
      if (lowerMsg.includes(term)) score += 15;
    });
    
    // Check for industry/category terms (medium weight)
    KOL_PATTERNS.industries.forEach(term => {
      if (lowerMsg.includes(term)) score += 10;
    });
    
    // Check for action verbs indicating search (high weight)
    KOL_PATTERNS.actions.forEach(term => {
      if (lowerMsg.includes(term)) score += 12;
    });
    
    // Check for commercial terms (very high weight)
    KOL_PATTERNS.commercial.forEach(term => {
      if (lowerMsg.includes(term)) score += 18;
    });
    
    // Check for metrics (high weight)
    KOL_PATTERNS.metrics.forEach(term => {
      if (lowerMsg.includes(term)) score += 15;
    });
    
    // Check for specific intent phrases (highest weight)
    SEARCH_INTENT_PHRASES.forEach(phrase => {
      if (lowerMsg.includes(phrase)) score += 25;
    });
    
    // Cap the score at 100
    return Math.min(score, 100);
  };

  /**
   * Determines if a message is KOL/campaign-specific or general using enhanced detection
   * @param message The user message to classify
   * @returns True if the message is KOL/campaign-specific, false if general
   */
  const isKOLSpecificQuery = (message: string) => {
    const confidenceScore = calculateKOLConfidence(message);
    
    // Consider it a KOL query if confidence is above threshold
    return confidenceScore >= 40;
  };

  /**
   * Logs the search to history for analytics
   */
  const logSearchHistory = (query: string, creditCost: number, type: "kol" | "general") => {
    setCreditState(prev => ({
      ...prev,
      searchHistory: [...prev.searchHistory, {
        query,
        creditCost,
        type,
        timestamp: Date.now()
      }].slice(-100) // Keep only the last 100 searches to avoid localStorage overflow
    }));
  };

  /**
   * Uses credits based on the message classification with adaptive allocation
   * @param message The user message
   * @returns True if credit usage was successful, false otherwise
   */
  const useIntelligentCredit = (message: string) => {
    // Premium users don't consume credits
    if (hasPremiumPlan) {
      // Still log the search for analytics
      logSearchHistory(message, 0, isKOLSpecificQuery(message) ? "kol" : "general");
      return true;
    }
    
    // Check if this is a KOL-specific query
    const isKOLQuery = isKOLSpecificQuery(message);
    
    // For KOL-specific queries, use 1 full credit
    if (isKOLQuery) {
      if (creditState.freeCredits > 0) {
        setCreditState(prev => ({
          ...prev,
          freeCredits: prev.freeCredits - 1
        }));
        
        // Log the search
        logSearchHistory(message, 1, "kol");
        return true;
      } else {
        showCreditExhaustedToast();
        return false;
      }
    } 
    // For general queries, increment the counter and check if we've reached the threshold
    else {
      const newCounter = creditState.generalQuestionCounter + 1;
      
      // If we've reached the threshold, reset counter and consume a credit
      if (newCounter >= GENERAL_QUESTIONS_PER_CREDIT) {
        if (creditState.freeCredits > 0) {
          setCreditState(prev => ({
            ...prev,
            generalQuestionCounter: 0,
            freeCredits: prev.freeCredits - 1
          }));
          
          // Log the search
          logSearchHistory(message, 1, "general");
          return true;
        } else {
          showCreditExhaustedToast();
          return false;
        }
      } 
      // Otherwise just increment the counter
      else {
        setCreditState(prev => ({
          ...prev,
          generalQuestionCounter: newCounter
        }));
        
        // Log the search with fractional credit cost
        logSearchHistory(message, 1/GENERAL_QUESTIONS_PER_CREDIT, "general");
        return true;
      }
    }
  };

  const showCreditExhaustedToast = () => {
    toast.error("Out of free searches", {
      description: `Upgrade your plan to continue searching or wait until ${RESET_HOUR}:00 AM for your credits to reset (${getTimeUntilReset()} remaining).`,
      action: {
        label: "Upgrade",
        onClick: () => window.location.href = "/pricing"
      }
    });
  };

  // Calculate how many general questions remain before a credit is used
  const remainingGeneralQuestions = GENERAL_QUESTIONS_PER_CREDIT - creditState.generalQuestionCounter;

  // Get search history for analytics
  const getSearchHistory = () => creditState.searchHistory;

  return {
    freeCredits: creditState.freeCredits,
    generalQuestionCounter: creditState.generalQuestionCounter,
    remainingGeneralQuestions,
    useIntelligentCredit,
    isKOLSpecificQuery,
    getSearchHistory,
    calculateKOLConfidence,
    timeUntilReset: getTimeUntilReset(),
    resetHour: RESET_HOUR,
    generalQuestionsPerCredit: GENERAL_QUESTIONS_PER_CREDIT
  };
};
