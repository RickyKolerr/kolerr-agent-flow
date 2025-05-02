
import { KOL_PATTERNS, FINDING_PHRASES, METRIC_PATTERNS } from "@/constants/creditConstants";
import { RESET_HOUR } from "@/constants/creditConstants";

/**
 * Determines if a message is KOL/campaign-specific or general
 * Using an enhanced algorithm for better detection
 * @param message The user message to classify
 * @returns True if the message is KOL/campaign-specific, false if general
 */
export const isKOLSpecificQuery = (message: string): boolean => {
  const lowerMsg = message.toLowerCase();
  
  // Quick check for explicit KOL-related keywords
  if (KOL_PATTERNS.some(pattern => lowerMsg.includes(pattern))) {
    return true;
  }
  
  // Enhanced context detection - check for phrases that suggest looking for specific creators
  if (FINDING_PHRASES.some(phrase => lowerMsg.includes(phrase))) {
    return true;
  }
  
  // Check for questions about specific demographics or metrics
  if (METRIC_PATTERNS.some(metric => lowerMsg.includes(metric))) {
    return true;
  }
  
  return false;
};

/**
 * Calculates the time until the credits reset
 * @returns A formatted string showing time until reset
 */
export const getTimeUntilReset = (): string => {
  const now = new Date();
  const tomorrow = new Date();
  
  // Set tomorrow's date
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  // Set the reset time
  tomorrow.setHours(RESET_HOUR, 0, 0, 0);
  
  // If now is after today's reset time, reset will be tomorrow
  // If now is before today's reset time, reset will be today
  const reset = new Date();
  reset.setHours(RESET_HOUR, 0, 0, 0);
  
  const resetTime = now >= reset ? tomorrow : reset;
  
  // Calculate difference in milliseconds
  const diff = resetTime.getTime() - now.getTime();
  
  // Calculate hours and minutes
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  
  return `${hours}h ${minutes}m`;
};

/**
 * Checks if credits should be reset based on last reset time
 * @param lastReset The timestamp of the last reset
 * @returns True if credits should be reset, false otherwise
 */
export const shouldResetCredits = (lastReset: string): boolean => {
  const now = new Date();
  const resetTime = new Date(lastReset);
  resetTime.setHours(RESET_HOUR, 0, 0, 0);
  
  return (
    now.getTime() > resetTime.getTime() && 
    (now.getDate() > resetTime.getDate() || 
     now.getMonth() > resetTime.getMonth() ||
     now.getFullYear() > resetTime.getFullYear())
  );
};

