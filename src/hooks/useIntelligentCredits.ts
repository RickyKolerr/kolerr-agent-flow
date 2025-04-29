import { useState, useEffect } from 'react';
import { toast } from "sonner";
import { getTimeUntilReset, RESET_HOUR } from "./useSearchCredits";

// Constants for credit system
const GENERAL_QUESTIONS_PER_CREDIT = 3;
const KOL_PATTERNS = [
  'kol', 'creator', 'influencer', 'tiktok', 'search', 'find', 'campaign',
  'follower', 'niche', 'engagement', 'fashion', 'beauty', 'gaming', 'tech', 'travel'
];

interface IntelligentCreditStore {
  freeCredits: number;
  generalQuestionCounter: number;
  lastReset: string;
}

export const useIntelligentCredits = (initialFreeCredits: number, hasPremiumPlan: boolean) => {
  // Initialize from localStorage or with default values
  const [creditState, setCreditState] = useState<IntelligentCreditStore>(() => {
    const stored = localStorage.getItem('intelligent_credits');
    if (!stored) {
      return {
        freeCredits: initialFreeCredits,
        generalQuestionCounter: 0,
        lastReset: new Date().toISOString()
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
        lastReset: now.toISOString()
      };
    }
    
    return parsedStore;
  });

  // Persist credit state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('intelligent_credits', JSON.stringify(creditState));
  }, [creditState]);

  /**
   * Determines if a message is KOL/campaign-specific or general
   * @param message The user message to classify
   * @returns True if the message is KOL/campaign-specific, false if general
   */
  const isKOLSpecificQuery = (message: string) => {
    const lowerMsg = message.toLowerCase();
    
    // Check if the message contains any KOL-related keywords
    return KOL_PATTERNS.some(pattern => lowerMsg.includes(pattern));
  };

  /**
   * Uses credits based on the message classification
   * @param message The user message
   * @returns True if credit usage was successful, false otherwise
   */
  const useIntelligentCredit = (message: string) => {
    // Premium users don't consume credits
    if (hasPremiumPlan) {
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

  return {
    freeCredits: creditState.freeCredits,
    generalQuestionCounter: creditState.generalQuestionCounter,
    remainingGeneralQuestions,
    useIntelligentCredit,
    isKOLSpecificQuery,
    timeUntilReset: getTimeUntilReset(),
    resetHour: RESET_HOUR,
    generalQuestionsPerCredit: GENERAL_QUESTIONS_PER_CREDIT
  };
};
