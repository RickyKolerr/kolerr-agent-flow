
import React from "react";
import { TeamManagement } from "@/components/settings/TeamManagement";

const TeamManagementPage = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Team Management</h1>
      <p className="text-muted-foreground">
        Invite and manage team members for your brand's account.
      </p>
      
      <TeamManagement />
    </div>
  );
};

export default TeamManagementPage;
