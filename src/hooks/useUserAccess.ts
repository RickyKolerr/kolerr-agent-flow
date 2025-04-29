
import { useAuth } from "@/contexts/AuthContext";
import { useCredits } from "@/contexts/CreditContext";

export const useUserAccess = () => {
  const { user, isAuthenticated } = useAuth();
  const { freeCredits, hasPremiumPlan } = useCredits();

  const canAccessFeature = (feature: "search" | "campaigns" | "analytics" | "contracts" | "referrals" | "rewards" | "community" | "messages") => {
    if (!isAuthenticated) return false;
    
    // Basic checks for free users
    if (feature === "search") {
      return freeCredits > 0 || hasPremiumPlan;
    }

    // All authenticated users can access messages
    if (feature === "messages") {
      return true;
    }

    // Role-based feature access and premium plan checks
    const userRole = user?.role;
    
    switch (feature) {
      case "campaigns":
        // Both brands and KOLs can access campaigns, but with different views
        return Boolean(userRole);
      case "analytics":
        return Boolean(userRole);
      case "contracts":
        return (["brand", "kol", "admin"].includes(userRole || "") && hasPremiumPlan);
      case "referrals":
        // KOL-specific feature
        return userRole === "kol";
      case "rewards":
        // KOL-specific feature
        return userRole === "kol";
      case "community":
        // KOL-specific feature
        return userRole === "kol";
      default:
        return false;
    }
  };

  const getRedirectPath = () => {
    if (!isAuthenticated) return "/login";
    
    if (!user?.onboardingStatus || user.onboardingStatus === "incomplete") {
      return `/onboarding/${user.role}`;
    }
    
    // Direct KOLs to their specific dashboard
    if (user?.role === "kol") {
      return "/dashboard/kol/campaigns";
    }
    
    return "/dashboard";
  };

  return {
    canAccessFeature,
    getRedirectPath,
    isAuthenticated,
    user,
    freeCredits,
    hasPremiumPlan
  };
};
