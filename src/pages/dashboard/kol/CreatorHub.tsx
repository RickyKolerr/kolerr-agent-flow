
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import CreatorHubComponent from "@/pages/dashboard/CreatorHub";

const KolCreatorHub: React.FC = () => {
  const { user, isAuthenticated } = useAuth();

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If user is brand, redirect to brand creator hub page
  if (user?.role === 'brand') {
    return <Navigate to="/dashboard/creator-hub" replace />;
  }

  // Use the same CreatorHub component for KOL users
  return <CreatorHubComponent />;
};

export default KolCreatorHub;
