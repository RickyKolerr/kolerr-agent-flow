
import { useState, useEffect } from 'react';
import { toast } from "sonner";
import { GENERAL_QUESTIONS_PER_CREDIT, RESET_HOUR } from "@/constants/creditConstants";
import { isKOLSpecificQuery, getTimeUntilReset, shouldResetCredits } from "@/utils/creditUtils";
import { IntelligentCreditStore, IntelligentCreditResult } from "@/types/credits";

export const useIntelligentCredits = (initialFreeCredits: number, hasPremiumPlan: boolean): IntelligentCreditResult => {
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
    
    // Check if we need to reset credits based on time
    if (shouldResetCredits(parsedStore.lastReset)) {
      return {
        freeCredits: initialFreeCredits,
        generalQuestionCounter: 0,
        lastReset: new Date().toISOString()
      };
    }
    
    return parsedStore;
  });

  // Persist credit state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('intelligent_credits', JSON.stringify(creditState));
  }, [creditState]);

  /**
   * Uses credits based on the message classification
   * @param message The user message
   * @returns True if credit usage was successful, false otherwise
   */
  const useIntelligentCredit = (message: string): boolean => {
    // Premium users still consume credits, but from their premium pool
    // This is handled in the CreditContext, we just track the usage pattern here
    
    // Check if this is a KOL-specific query
    const isKOLQuery = isKOLSpecificQuery(message);
    
    // For KOL-specific queries, use 1 full credit
    if (isKOLQuery) {
      if (creditState.freeCredits > 0 || hasPremiumPlan) {
        // Only decrement for non-premium users
        if (!hasPremiumPlan) {
          setCreditState(prev => ({
            ...prev,
            freeCredits: prev.freeCredits - 1
          }));
        }
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
        if (creditState.freeCredits > 0 || hasPremiumPlan) {
          // Only decrement for non-premium users
          if (!hasPremiumPlan) {
            setCreditState(prev => ({
              ...prev,
              generalQuestionCounter: 0,
              freeCredits: prev.freeCredits - 1
            }));
          } else {
            // For premium users, just reset the counter
            setCreditState(prev => ({
              ...prev,
              generalQuestionCounter: 0
            }));
          }
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

  const showCreditExhaustedToast = (): void => {
    toast.error("Out of free credits", {
      description: `Upgrade your plan to continue searching or wait until ${RESET_HOUR}:00 AM for your credits to reset (${getTimeUntilReset()} remaining).`,
      action: {
        label: "Upgrade",
        onClick: () => window.location.href = "/pricing"
      }
    });
  };

  // Calculate how many general questions remain before a credit is used
  const remainingGeneralQuestions = GENERAL_QUESTIONS_PER_CREDIT - creditState.generalQuestionCounter;

  // Reset credits to a specific amount (used for testing or admin functions)
  const resetCredits = (amount: number): void => {
    setCreditState(prev => ({
      ...prev,
      freeCredits: amount,
      generalQuestionCounter: 0
    }));
  };

  // Set credits to a specific amount without affecting the counter
  const setCredits = (amount: number): void => {
    setCreditState(prev => ({
      ...prev,
      freeCredits: amount
    }));
  };

  // Add credits to the current amount
  const addCredits = (amount: number): void => {
    setCreditState(prev => ({
      ...prev,
      freeCredits: prev.freeCredits + amount
    }));
  };

  return {
    freeCredits: creditState.freeCredits,
    generalQuestionCounter: creditState.generalQuestionCounter,
    remainingGeneralQuestions,
    useIntelligentCredit,
    isKOLSpecificQuery,
    timeUntilReset: getTimeUntilReset(),
    resetHour: RESET_HOUR,
    generalQuestionsPerCredit: GENERAL_QUESTIONS_PER_CREDIT,
    resetCredits,
    setCredits,
    addCredits
  };
};
