
import { useAuth } from "@/contexts/AuthContext";
import { useCredits } from "@/contexts/CreditContext";
import { useIntelligentCredits } from "@/hooks/useIntelligentCredits";

export const useUserAccess = () => {
  const { user, isAuthenticated } = useAuth();
  const { freeCredits: originalCredits, hasPremiumPlan } = useCredits();
  
  // Integrate the intelligent credits system for more accurate credit management
  const { freeCredits, isKOLSpecificQuery } = useIntelligentCredits(originalCredits, hasPremiumPlan);

  const canAccessFeature = (feature: "search" | "campaigns" | "analytics" | "contracts" | "messages" | "available_campaigns" | "apply_campaigns" | "team_management" | "application_management") => {
    if (!isAuthenticated) return false;
    
    // Basic checks for free users
    if (feature === "search") {
      return freeCredits > 0 || hasPremiumPlan;
    }

    // All authenticated users can access messages
    if (feature === "messages") {
      return true;
    }

    // Team Management and Application Management are only accessible to brands and admins
    if (feature === "team_management" || feature === "application_management") {
      return user?.role === "brand" || user?.role === "admin";
    }

    // Role-based feature access and premium plan checks
    const userRole = user?.role;
    
    switch (feature) {
      case "campaigns":
        // Only brands can access campaigns management
        return userRole === "brand" || userRole === "admin";
      case "available_campaigns":
        // Anyone can view available campaigns, but only KOLs can apply
        return Boolean(userRole);
      case "apply_campaigns":
        // Only KOLs can apply to campaigns
        return userRole === "kol" || userRole === "admin";  
      case "analytics":
        return Boolean(userRole);
      case "contracts":
        return (["brand", "kol", "admin"].includes(userRole || "") && hasPremiumPlan);
      default:
        return false;
    }
  };

  const getRedirectPath = () => {
    if (!isAuthenticated) return "/login";
    
    if (!user?.onboardingStatus || user.onboardingStatus === "incomplete") {
      return `/onboarding/${user.role}`;
    }
    
    // Direct users to role-specific dashboard
    if (user?.role === "kol") {
      return "/dashboard/kol/campaigns";
    } else if (user?.role === "brand") {
      return "/dashboard/overview";
    }
    
    return "/dashboard";
  };

  return {
    canAccessFeature,
    getRedirectPath,
    isAuthenticated,
    user,
    freeCredits,
    hasPremiumPlan,
    isKOLSpecificQuery
  };
};
