
import { useState, useEffect } from "react";
import { RESET_HOUR } from "@/constants/creditConstants";
import { getTimeUntilReset } from "@/utils/creditUtils";

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

  // Check if we need to reset credits (at 4:00 AM each day)
  function shouldResetCredits(lastResetDate: string) {
    const now = new Date();
    const lastReset = new Date(lastResetDate);
    
    // If it's a different day and past the reset hour
    if (now.getDate() !== lastReset.getDate() || 
        now.getMonth() !== lastReset.getMonth() || 
        now.getFullYear() !== lastReset.getFullYear()) {
      
      // Only reset if we're past the reset hour (4:00 AM)
      if (now.getHours() >= RESET_HOUR) {
        return true;
      }
    }
    
    return false;
  }

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

// Export constants for use in other files
export { RESET_HOUR };
