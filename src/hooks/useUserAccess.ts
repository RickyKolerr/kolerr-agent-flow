
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

  /**
   * Gets the appropriate redirect path based on user authentication status and role
   * Used for CTA navigation decisions to ensure users go to the right place
   */
  const getRedirectPath = () => {
    if (!isAuthenticated) return "/login";
    
    if (!user?.onboardingStatus || user.onboardingStatus === "incomplete") {
      return `/onboarding/${user.role}`;
    }
    
    // Role-based dashboard redirects
    if (user?.role === "kol") {
      return "/dashboard/kol/campaigns";
    } else if (user?.role === "brand") {
      return "/dashboard/overview";
    } else if (user?.role === "admin") {
      return "/dashboard/overview";
    }
    
    // Default fallback
    return "/dashboard";
  };

  /**
   * Gets the appropriate dashboard navigation path based on feature and user role
   * Ensures proper navigation for features that have different paths based on role
   */
  const getDashboardPath = (feature: string) => {
    if (!isAuthenticated) return "/login";
    
    const userRole = user?.role;
    
    switch (feature) {
      case "campaigns":
        return userRole === "kol" ? "/dashboard/kol/campaigns" : "/dashboard/campaigns";
      case "contracts":
        return userRole === "kol" ? "/dashboard/kol/contracts" : "/dashboard/contracts";
      case "analytics":
        return userRole === "kol" ? "/dashboard/kol/analytics" : "/dashboard/analytics";
      case "profile":
        return "/dashboard/profile";
      case "settings":
        return "/dashboard/settings";
      case "subscription":
        return "/dashboard/subscription";
      default:
        return "/dashboard";
    }
  };

  return {
    canAccessFeature,
    getRedirectPath,
    getDashboardPath,
    isAuthenticated,
    user,
    freeCredits,
    hasPremiumPlan
  };
};
