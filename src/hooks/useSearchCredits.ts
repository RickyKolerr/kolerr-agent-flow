
import { useState, useEffect } from 'react';
import { toast } from "sonner";

export const DAILY_CREDITS = 5;
export const RESET_HOUR = 7; // 7 AM
export const CREDIT_PACKAGE_EXPIRY_DAYS = 60;

export const getTimeUntilReset = (): string => {
  const now = new Date();
  const tomorrow = new Date();
  
  if (now.getHours() < RESET_HOUR) {
    tomorrow.setDate(now.getDate());
  } else {
    tomorrow.setDate(now.getDate() + 1);
  }
  
  tomorrow.setHours(RESET_HOUR, 0, 0, 0);
  
  const hoursLeft = Math.floor((tomorrow.getTime() - now.getTime()) / (1000 * 60 * 60));
  const minutesLeft = Math.floor(((tomorrow.getTime() - now.getTime()) % (1000 * 60 * 60)) / (1000 * 60));
  
  return `${hoursLeft}h ${minutesLeft}m`;
};

// Calculate expiration date for credit packages
export const getExpirationDate = (purchaseDate?: Date): Date => {
  const startDate = purchaseDate || new Date();
  const expirationDate = new Date(startDate);
  expirationDate.setDate(expirationDate.getDate() + CREDIT_PACKAGE_EXPIRY_DAYS);
  return expirationDate;
};

// Format date for display
export const formatExpirationDate = (date: Date): string => {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

// Calculate days until expiration
export const getDaysUntilExpiration = (expirationDate: Date): number => {
  const now = new Date();
  const diffTime = expirationDate.getTime() - now.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

export const useSearchCredits = () => {
  const [creditsLeft, setCreditsLeft] = useState<number>(() => {
    const stored = localStorage.getItem('search_credits');
    if (!stored) return DAILY_CREDITS;
    
    const { credits, lastReset } = JSON.parse(stored);
    const now = new Date();
    const resetTime = new Date(lastReset);
    resetTime.setHours(RESET_HOUR, 0, 0, 0);
    
    if (now.getTime() > resetTime.getTime() && 
        (now.getDate() > resetTime.getDate() || 
         now.getMonth() > resetTime.getMonth() ||
         now.getFullYear() > resetTime.getFullYear())) {
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
    
    toast.error(
      "You've used all your free searches for today", 
      { 
        description: `Get more searches with credit packages or wait until tomorrow at ${RESET_HOUR}:00 AM for your credits to reset (${getTimeUntilReset()} remaining).`,
        action: {
          label: "Get Credits",
          onClick: () => window.location.href = "/pricing#credit-packages-section"
        }
      }
    );
    
    return false;
  };

  return { 
    creditsLeft, 
    useCredit,
    dailyLimit: DAILY_CREDITS,
    getTimeUntilReset,
    resetHour: RESET_HOUR
  };
};
