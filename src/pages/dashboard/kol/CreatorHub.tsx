
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useUserAccess } from "@/hooks/useUserAccess";
import { CreatorsTab } from "@/components/community/CreatorsTab";

// Mock data for creators
const mockCreators = [
  {
    id: "1",
    name: "Alex Johnson",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&auto=format&fit=crop",
    categories: ["Fashion", "Lifestyle"],
    followers: 125000,
    engagement: 3.2,
  },
  {
    id: "2",
    name: "Sam Wong",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&auto=format&fit=crop",
    categories: ["Tech", "Gaming"],
    followers: 98000,
    engagement: 4.5,
  }
];

const KolCreatorHub: React.FC = () => {
  const { user } = useAuth();
  const { canAccessFeature } = useUserAccess();

  // If not authorized to access creator hub, redirect to login
  if (!canAccessFeature("creator_hub")) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleConnectCreator = (creator: any) => {
    console.log("Connect to creator:", creator);
    // Implementation would connect with creator
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Creator Hub</h1>
      <CreatorsTab 
        creators={mockCreators} 
        onConnectCreator={handleConnectCreator}
      />
    </div>
  );
};

export default KolCreatorHub;
