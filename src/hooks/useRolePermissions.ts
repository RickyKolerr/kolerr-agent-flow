
import { useAuth } from "@/contexts/AuthContext";
import { useCredits } from "@/contexts/CreditContext";

export type PermissionType = 
  | "view_kol_profiles" 
  | "view_full_campaign_details"
  | "contact_kol"
  | "view_kol_metrics"
  | "invite_to_campaign"
  | "save_campaign"
  | "apply_for_job";

export const useRolePermissions = () => {
  const { user, isAuthenticated } = useAuth();
  const { freeCredits } = useCredits();
  
  const canPerform = (action: PermissionType): { 
    allowed: boolean; 
    reason?: string;
    creditsRequired?: number;
    requiresUpgrade?: boolean;
  } => {
    // Not authenticated users have very limited permissions
    if (!isAuthenticated) {
      switch (action) {
        case "view_kol_profiles":
          return { 
            allowed: freeCredits > 0, 
            reason: freeCredits <= 0 ? "No credits remaining" : undefined,
            creditsRequired: 1,
            requiresUpgrade: false
          };
        default:
          return { 
            allowed: false, 
            reason: "Authentication required", 
            requiresUpgrade: false 
          };
      }
    }

    // KOL permissions
    if (user?.role === "kol") {
      switch (action) {
        case "view_kol_profiles":
          return { allowed: true };
        case "view_full_campaign_details":
          return { allowed: true };
        case "save_campaign":
          return { allowed: true };
        case "apply_for_job":
          return { allowed: true };
        case "contact_kol":
          return { allowed: false, reason: "KOLs cannot contact other KOLs through the platform", requiresUpgrade: false };
        case "view_kol_metrics":
          return { allowed: false, reason: "KOLs cannot view other KOLs' metrics", requiresUpgrade: false };
        case "invite_to_campaign":
          return { allowed: false, reason: "KOLs cannot invite others to campaigns", requiresUpgrade: false };
        default:
          return { allowed: false, reason: "Insufficient permissions", requiresUpgrade: false };
      }
    }

    // Brand permissions
    if (user?.role === "brand") {
      const hasPaidPlan = user?.subscription?.plan !== "free";
      
      switch (action) {
        case "view_kol_profiles":
          return { 
            allowed: freeCredits > 0 || hasPaidPlan, 
            reason: freeCredits <= 0 && !hasPaidPlan ? "No credits remaining" : undefined,
            creditsRequired: hasPaidPlan ? 0 : 1,
            requiresUpgrade: freeCredits <= 0 && !hasPaidPlan
          };
        case "contact_kol":
          return { 
            allowed: true 
          };
        case "view_kol_metrics":
          return { 
            allowed: hasPaidPlan, 
            reason: !hasPaidPlan ? "Premium plan required to view detailed metrics" : undefined,
            requiresUpgrade: !hasPaidPlan
          };
        case "invite_to_campaign":
          return { 
            allowed: true 
          };
        case "view_full_campaign_details":
          return { allowed: true };
        default:
          return { allowed: false, reason: "Insufficient permissions", requiresUpgrade: false };
      }
    }

    // Admin permissions (has all permissions)
    if (user?.role === "admin") {
      return { allowed: true };
    }

    // Default case
    return { allowed: false, reason: "Unknown role or permission", requiresUpgrade: false };
  };

  const getSearchResultLimit = (): number => {
    if (!isAuthenticated) {
      return 3; // Guests get 3 view-only results
    }
    
    const hasPaidPlan = user?.subscription?.plan !== "free";
    
    if (hasPaidPlan) {
      // Return a large number for practically unlimited results
      return 1000;
    }
    
    if (user?.role === "kol") {
      return 10; // KOLs get 10 results with free plan
    }
    
    if (user?.role === "brand") {
      return 15; // Brands get 15 results with free plan
    }
    
    return 5; // Default case
  };

  return {
    canPerform,
    getSearchResultLimit,
    isAuthenticated,
    userRole: user?.role
  };
};
