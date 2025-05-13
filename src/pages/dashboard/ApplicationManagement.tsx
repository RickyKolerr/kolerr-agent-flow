
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ApplicationManagement } from "@/components/campaigns/ApplicationManagement";
import { SlotManagement } from "@/components/campaigns/SlotManagement";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

const mockSlots = [
  {
    id: "slot1",
    name: "Primary Influencers",
    targetKOLs: 5,
    minEngagement: 4.5,
    maxBudget: 1000,
    targetAudience: ["18-25", "fashion"],
    startDate: new Date().toISOString(),
    endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    requirements: ["Instagram post", "TikTok video"],
    status: "open",
    assignedKols: []
  },
  {
    id: "slot2",
    name: "Micro Influencers",
    targetKOLs: 10,
    minEngagement: 3.2,
    maxBudget: 500,
    targetAudience: ["25-34", "lifestyle"],
    startDate: new Date().toISOString(),
    endDate: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000).toISOString(),
    requirements: ["Instagram story", "Review"],
    status: "open",
    assignedKols: []
  }
];

const ApplicationManagementPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [slots, setSlots] = useState(mockSlots);
  const navigate = useNavigate();

  const handleAddSlot = (newSlot) => {
    const slotWithId = {
      ...newSlot,
      id: `slot${slots.length + 1}`
    };
    setSlots([...slots, slotWithId]);
    toast.success("New slot created successfully");
  };

  const handleRemoveSlot = (slotId) => {
    setSlots(slots.filter(slot => slot.id !== slotId));
    toast.success("Slot removed successfully");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Application Management</h1>
        <Button onClick={() => navigate('/dashboard/campaigns/create')} className="bg-brand-pink hover:bg-brand-pink/90">
          <Plus className="mr-2 h-4 w-4" /> Create Campaign
        </Button>
      </div>

      <Tabs defaultValue="applications" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="applications">Applications</TabsTrigger>
          <TabsTrigger value="slots">SLOT Management</TabsTrigger>
        </TabsList>
        
        <TabsContent value="applications">
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
        </TabsContent>
        
        <TabsContent value="slots">
          <SlotManagement 
            campaignId="campaign1"
            slots={slots}
            onAddSlot={handleAddSlot}
            onRemoveSlot={handleRemoveSlot}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ApplicationManagementPage;
