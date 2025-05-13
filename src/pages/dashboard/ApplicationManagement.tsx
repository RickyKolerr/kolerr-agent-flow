
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ApplicationManagement } from "@/components/campaigns/ApplicationManagement";

const ApplicationManagementPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Application Management</h1>
        <Button onClick={() => navigate('/dashboard/campaigns/create')} className="bg-brand-pink hover:bg-brand-pink/90">
          <Plus className="mr-2 h-4 w-4" /> Create Campaign
        </Button>
      </div>

      {/* Search section */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center space-x-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search applications by KOL name or handle..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1"
            />
          </div>
        </CardContent>
      </Card>

      {/* Application Management Component */}
      <ApplicationManagement />
    </div>
  );
};

export default ApplicationManagementPage;
