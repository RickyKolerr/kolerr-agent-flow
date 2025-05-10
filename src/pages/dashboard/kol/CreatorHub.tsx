
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useUserAccess } from "@/hooks/useUserAccess";
import { CreatorsTab } from "@/components/community/CreatorsTab";

const KolCreatorHub: React.FC = () => {
  const { user } = useAuth();
  const { canAccessFeature } = useUserAccess();

  // If not authorized to access creator hub, redirect to login
  if (!canAccessFeature("creator_hub")) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Creator Hub</h1>
      <CreatorsTab 
        creators={[]} 
        onConnectCreator={(creator) => {
          console.log("Connect to creator:", creator);
        }} 
      />
    </div>
  );
};

export default KolCreatorHub;
