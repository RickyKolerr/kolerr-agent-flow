
import { useAuth } from "@/contexts/AuthContext";
import { useCredits } from "@/contexts/CreditContext";

export const useUserAccess = () => {
  const { user, isAuthenticated } = useAuth();
  const { freeCredits, hasPremiumPlan } = useCredits();

  const canAccessFeature = (feature: "search" | "campaigns" | "analytics" | "contracts") => {
    if (!isAuthenticated) return false;
    
    // Basic checks for free users
    if (feature === "search") {
      return freeCredits > 0 || hasPremiumPlan;
    }

    // Role-based feature access and premium plan checks
    const userRole = user?.role;
    
    switch (feature) {
      case "campaigns":
        return (["brand", "admin"].includes(userRole || "") && hasPremiumPlan);
      case "analytics":
        return (["brand", "admin"].includes(userRole || "") && hasPremiumPlan);
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
