
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useUserAccess } from "@/hooks/useUserAccess";
import { CreatorsTab } from "@/components/community/CreatorsTab";

// Mock data for creators that matches the Creator interface
const mockCreators = [
  {
    id: "1",
    name: "Alex Johnson",
    username: "alexcreates",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&auto=format&fit=crop",
    followers: 125000,
    niche: ["Fashion", "Lifestyle"],
    tier: "Premium",
    bio: "Fashion and lifestyle content creator based in NYC.",
    compatibility: 85,
    platforms: ["instagram", "tiktok"],
    connected: false
  },
  {
    id: "2",
    name: "Sam Wong",
    username: "samtech",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&auto=format&fit=crop",
    followers: 98000,
    niche: ["Tech", "Gaming"],
    tier: "Standard",
    bio: "Tech enthusiast and gaming content creator.",
    compatibility: 75,
    platforms: ["youtube", "twitch"],
    connected: false
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
