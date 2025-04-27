
import { useAuth } from "@/contexts/AuthContext";
import { useSearchCredits } from "@/hooks/useSearchCredits";

export const useUserAccess = () => {
  const { user, isAuthenticated } = useAuth();
  const { creditsLeft } = useSearchCredits();

  const canAccessFeature = (feature: "search" | "campaigns" | "analytics" | "contracts") => {
    if (!isAuthenticated) return false;
    
    // Basic checks for free users
    if (feature === "search") {
      return creditsLeft > 0;
    }

    // Role-based feature access
    const userRole = user?.role;
    
    switch (feature) {
      case "campaigns":
        return ["brand", "admin"].includes(userRole || "");
      case "analytics":
        return ["brand", "admin"].includes(userRole || "");
      case "contracts":
        return ["brand", "kol", "admin"].includes(userRole || "");
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
    creditsLeft
  };
};
