
import React from "react";
import { TeamManagement as TeamManagementComponent } from "@/components/settings/TeamManagement";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useUserAccess } from "@/hooks/useUserAccess";

const TeamManagement: React.FC = () => {
  const { user } = useAuth();
  const { canAccessFeature } = useUserAccess();

  // Redirect to dashboard if user cannot access team management
  if (!canAccessFeature("team_management")) {
    // This checks if the user is a brand or admin since only they can access team management
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Team Management</h1>
      <TeamManagementComponent />
    </div>
  );
};

export default TeamManagement;
