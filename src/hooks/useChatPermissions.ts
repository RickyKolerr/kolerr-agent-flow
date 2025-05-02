
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useCredits } from "@/contexts/CreditContext";
import { toast } from "sonner";

// Interface for tracking brand-KOL contacts
interface ContactHistoryEntry {
  profileId: string;
  profileType: "kol" | "brand";
  timestamp: string;
  monthKey: string; // Format: "2025-05" (year-month)
}

export const useChatPermissions = () => {
  const { user, isAuthenticated } = useAuth();
  const { hasPremiumPlan, freeCredits, useFreeCredit, usePremiumCredit } = useCredits();
  
  // State to track unlocked conversations (would be in a database in production)
  const [unlockedConversations, setUnlockedConversations] = useState<string[]>(() => {
    // Load from localStorage for demo purposes
    const saved = localStorage.getItem('unlocked_conversations');
    return saved ? JSON.parse(saved) : [];
  });
  
  // State to track contact history (would be in a database in production)
  const [contactHistory, setContactHistory] = useState<ContactHistoryEntry[]>(() => {
    // Load from localStorage for demo purposes
    const saved = localStorage.getItem('contact_history');
    return saved ? JSON.parse(saved) : [];
  });
  
  // Save state changes to localStorage for demo purposes
  useEffect(() => {
    if (unlockedConversations.length > 0) {
      localStorage.setItem('unlocked_conversations', JSON.stringify(unlockedConversations));
    }
  }, [unlockedConversations]);
  
  useEffect(() => {
    if (contactHistory.length > 0) {
      localStorage.setItem('contact_history', JSON.stringify(contactHistory));
    }
  }, [contactHistory]);
  
  // Generate a unique conversation ID for a given profile pair
  const getConversationKey = (profileId: string, profileType: "kol" | "brand") => {
    if (!user) return '';
    
    // Order the IDs consistently so the same conversation is referenced from both sides
    const ids = [user.id, profileId].sort();
    return `${ids[0]}_${ids[1]}`;
  };
  
  // Check if the current user has already unlocked conversation with a profile
  const isConversationUnlocked = (profileId: string, profileType: "kol" | "brand") => {
    if (!user) return false;
    
    const conversationKey = getConversationKey(profileId, profileType);
    return unlockedConversations.includes(conversationKey);
  };
  
  // Get the current month key (for tracking monthly limits)
  const getCurrentMonthKey = () => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  };
  
  // Count contacts made this month by role
  const getMonthlyContactCount = () => {
    if (!user) return 0;
    
    const currentMonthKey = getCurrentMonthKey();
    return contactHistory.filter(
      entry => entry.monthKey === currentMonthKey
    ).length;
  };
  
  // Get monthly contact limit based on user role and subscription
  const getMonthlyContactLimit = () => {
    if (!user) return 0;
    
    // Brands have different limits based on subscription
    if (user.role === 'brand') {
      if (hasPremiumPlan) {
        // Different limits based on plan tier (enterprise, growth, pro)
        if (user.subscription?.plan === 'enterprise') return 100;
        if (user.subscription?.plan === 'growth') return 50;
        if (user.subscription?.plan === 'pro') return 25;
        return 50; // Default premium
      }
      return 10; // Free tier brands
    }
    
    // KOLs don't have a monthly limit, they pay per contact
    if (user.role === 'kol') {
      return 9999; // Effectively unlimited
    }
    
    return 0; // Default for other roles
  };
  
  // Check if a KOL was invited by a brand (would check database in production)
  const wasInvitedByBrand = (kolId: string, brandId: string) => {
    // Mock logic for demo - in production, would check a real database
    if (user?.role === 'kol') {
      // Pretend 10% of conversations are from invitations (demo only)
      return Math.random() < 0.1;
    }
    return false;
  };
  
  // Check if user can message a specific profile
  const canMessageProfile = (profileId: string, profileType: "kol" | "brand") => {
    if (!isAuthenticated || !user) {
      return { canMessage: false, reason: "Please sign in to continue" };
    }
    
    // If conversation is already unlocked, always allow
    if (isConversationUnlocked(profileId, profileType)) {
      return { canMessage: true };
    }
    
    const userRole = user.role;
    const monthlyContactCount = getMonthlyContactCount();
    const monthlyLimit = getMonthlyContactLimit();
    
    // KOL messaging a Brand
    if (userRole === 'kol' && profileType === 'brand') {
      // Check if KOL was invited by this brand (automatic unlock)
      if (wasInvitedByBrand(user.id, profileId)) {
        return { canMessage: true, wasInvited: true };
      }
      
      // Not invited, needs 1 credit
      if (freeCredits >= 1 || hasPremiumPlan) {
        return { canMessage: true, requiresCredit: true };
      }
      
      return { 
        canMessage: false, 
        reason: "You need 1 credit to contact this brand",
        requiresCredit: true
      };
    }
    
    // Brand messaging a KOL
    if (userRole === 'brand' && profileType === 'kol') {
      // Check monthly limit
      if (monthlyContactCount < monthlyLimit) {
        return { canMessage: true };
      }
      
      return {
        canMessage: false,
        reason: `You've reached your monthly limit of ${monthlyLimit} new contacts`,
        monthlyLimit: monthlyLimit,
        monthlyCount: monthlyContactCount
      };
    }
    
    // Default - not allowed based on role
    return { 
      canMessage: false, 
      reason: "Your account type cannot message this profile" 
    };
  };
  
  // Record a message being sent and handle unlocking conversations
  const trackMessageSent = (profileId: string, profileType: "kol" | "brand") => {
    if (!isAuthenticated || !user) return;
    
    const conversationKey = getConversationKey(profileId, profileType);
    const isUnlocked = isConversationUnlocked(profileId, profileType);
    
    // If already unlocked, no need to process further
    if (isUnlocked) return;
    
    const userRole = user.role;
    
    // KOL messaging a Brand
    if (userRole === 'kol' && profileType === 'brand') {
      // Check if KOL was invited by this brand (automatic unlock)
      if (wasInvitedByBrand(user.id, profileId)) {
        // Unlock without using credit
        setUnlockedConversations(prev => [...prev, conversationKey]);
        return;
      }
      
      // Use 1 credit to unlock
      if (hasPremiumPlan) {
        usePremiumCredit(1);
      } else {
        useFreeCredit();
      }
      
      // Unlock the conversation
      setUnlockedConversations(prev => [...prev, conversationKey]);
      
      toast.success("Conversation unlocked!", { 
        description: "You can now message this brand anytime" 
      });
      
      return;
    }
    
    // Brand messaging a KOL
    if (userRole === 'brand' && profileType === 'kol') {
      // Record this contact for monthly limits
      const newContact: ContactHistoryEntry = {
        profileId,
        profileType,
        timestamp: new Date().toISOString(),
        monthKey: getCurrentMonthKey()
      };
      
      setContactHistory(prev => [...prev, newContact]);
      
      // Unlock the conversation
      setUnlockedConversations(prev => [...prev, conversationKey]);
      
      toast.success("Creator contacted!", { 
        description: "You can now message anytime" 
      });
      
      return;
    }
  };
  
  return {
    canMessageProfile,
    trackMessageSent,
    isConversationUnlocked,
    getMonthlyContactCount,
    getMonthlyContactLimit
  };
};
