
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useUserAccess } from "@/hooks/useUserAccess";
import CreatorHubComponent from "@/pages/dashboard/CreatorHub";

const KolCreatorHub: React.FC = () => {
  const { user } = useAuth();
  const { canAccessFeature } = useUserAccess();

  // If not authenticated, redirect to login
  if (!canAccessFeature("creator_hub")) {
    return <Navigate to="/login" replace />;
  }

  // Use the same CreatorHub component for KOL users
  return <CreatorHubComponent />;
};

export default KolCreatorHub;
