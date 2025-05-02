
import { useState, useEffect } from "react";
import { RESET_HOUR } from "@/constants/creditConstants";
import { getTimeUntilReset, shouldResetCredits } from "@/utils/creditUtils";

// Number of free searches per day
const DEFAULT_FREE_CREDITS = 5;

export const useSearchCredits = () => {
  // Get the current available credits from localStorage or use default
  const [creditsLeft, setCreditsLeft] = useState(() => {
    const storedCredits = localStorage.getItem("search_credits");
    const lastResetDate = localStorage.getItem("credits_last_reset");
    
    // If this is the first time or we need to reset based on date
    if (!storedCredits || !lastResetDate || shouldResetCredits(lastResetDate)) {
      localStorage.setItem("search_credits", DEFAULT_FREE_CREDITS.toString());
      localStorage.setItem("credits_last_reset", new Date().toISOString());
      return DEFAULT_FREE_CREDITS;
    }
    
    return parseInt(storedCredits);
  });

  // Update localStorage when credits change
  useEffect(() => {
    localStorage.setItem("search_credits", creditsLeft.toString());
  }, [creditsLeft]);

  // Use one credit and return if successful
  const useCredit = () => {
    if (creditsLeft > 0) {
      setCreditsLeft(prev => prev - 1);
      return true;
    }
    return false;
  };

  // Reset credits to default amount
  const resetCredits = () => {
    setCreditsLeft(DEFAULT_FREE_CREDITS);
    localStorage.setItem("credits_last_reset", new Date().toISOString());
  };

  // Set credits to a specific amount
  const setCredits = (amount: number) => {
    setCreditsLeft(amount);
  };

  return {
    creditsLeft,
    useCredit,
    resetCredits,
    setCredits,
    getTimeUntilReset,
  };
};

// Re-export these functions for backward compatibility
export { RESET_HOUR, getTimeUntilReset, shouldResetCredits };

