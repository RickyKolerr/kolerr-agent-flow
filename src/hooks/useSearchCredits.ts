
import { useState, useEffect } from 'react';
import { toast } from "sonner";

const DAILY_CREDITS = 5;
const RESET_HOUR = 7; // 7 AM

export const useSearchCredits = () => {
  const [creditsLeft, setCreditsLeft] = useState<number>(() => {
    const stored = localStorage.getItem('search_credits');
    if (!stored) return DAILY_CREDITS;
    
    const { credits, lastReset } = JSON.parse(stored);
    const now = new Date();
    const resetTime = new Date(lastReset);
    resetTime.setHours(RESET_HOUR, 0, 0, 0);
    
    if (now.getTime() > resetTime.getTime() && now.getHours() >= RESET_HOUR) {
      return DAILY_CREDITS;
    }
    
    return credits;
  });

  useEffect(() => {
    localStorage.setItem('search_credits', JSON.stringify({
      credits: creditsLeft,
      lastReset: new Date().toISOString()
    }));
  }, [creditsLeft]);

  const useCredit = () => {
    if (creditsLeft > 0) {
      setCreditsLeft(prev => prev - 1);
      return true;
    }
    
    const now = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(RESET_HOUR, 0, 0, 0);
    
    const hoursLeft = Math.ceil((tomorrow.getTime() - now.getTime()) / (1000 * 60 * 60));
    
    toast.error(
      "You've used all your free searches for today", 
      { description: `Sign up now for unlimited searches or wait ${hoursLeft} hours for your credits to reset.` }
    );
    
    return false;
  };

  return { creditsLeft, useCredit };
};
