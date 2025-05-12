
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { SlotManagement } from "@/components/campaigns/SlotManagement";
import { Loader2, ArrowLeft, Save } from "lucide-react";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";
import { Slot } from "@/types/campaign";

const EditCampaignPage = () => {
  const { campaignId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  // Campaign state
  const [campaign, setCampaign] = useState({
    id: "",
    title: "",
    description: "",
    brand: "",
    brandLogo: "",
    budget: "",
    deadline: "",
    startDate: "",
    endDate: "",
    platforms: [] as string[],
    categories: [] as string[],
    requirements: [] as string[],
    slots: [] as Slot[]
  });
  
  useEffect(() => {
    // Simulate API fetch
    const fetchCampaign = async () => {
      setLoading(true);
      
      // In a real app, this would be an API call
      setTimeout(() => {
        // Mock data for the example
        if (campaignId === "camp1") {
          setCampaign({
            id: "camp1",
            title: "Summer Collection Launch",
            description: "Launch our new summer collection with a focus on sustainable materials and ethical production processes.",
            brand: "FashionBrand",
            brandLogo: "https://ui-avatars.com/api/?name=FB&background=0D8ABC&color=fff",
            budget: "5000",
            deadline: "2023-06-30",
            startDate: "2023-06-01",
            endDate: "2023-06-30",
            platforms: ["TikTok", "Instagram"],
            categories: ["Fashion", "Summer"],
            requirements: ["2+ min video", "Product showcase"],
            slots: [
              {
                id: "slot1",
                name: "Fashion Influencers",
                targetKOLs: 2,
                minEngagement: 5,
                maxBudget: 2500,
                targetAudience: ["18-24", "Fashion enthusiasts"],
                startDate: "2023-06-01",
                endDate: "2023-06-15",
                requirements: ["Fashion background", "Min 50K followers"],
                status: "filled",
                assignedKols: []
              },
              {
                id: "slot2",
                name: "Sustainability Advocates",
                targetKOLs: 1,
                minEngagement: 3,
                maxBudget: 2000,
                targetAudience: ["25-34", "Eco-conscious"],
                startDate: "2023-06-10",
                endDate: "2023-06-30",
                requirements: ["Focus on sustainable lifestyle"],
                status: "open",
                assignedKols: []
              }
            ]
          });
        } else {
          // Default empty campaign for others
          setCampaign({
            id: campaignId || "",
            title: "Untitled Campaign",
            description: "",
            brand: "Your Brand",
            brandLogo: "",
            budget: "",
            deadline: new Date().toISOString().split('T')[0],
            startDate: new Date().toISOString().split('T')[0],
            endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            platforms: [],
            categories: [],
            requirements: [],
            slots: []
          });
        }
        
        setLoading(false);
      }, 800);
    };
    
    fetchCampaign();
  }, [campaignId]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCampaign({
      ...campaign,
      [name]: value
    });
  };
  
  const handleAddSlot = (slotData: Omit<Slot, "id">) => {
    const newSlot = {
      ...slotData,
      id: uuidv4()
    };
    
    setCampaign({
      ...campaign,
      slots: [...campaign.slots, newSlot]
    });
  };
  
  const handleRemoveSlot = (slotId: string) => {
    setCampaign({
      ...campaign,
      slots: campaign.slots.filter(slot => slot.id !== slotId)
    });
  };
  
  const handleSave = async () => {
    if (!campaign.title) {
      toast.error("Campaign title is required");
      return;
    }
    
    setSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success("Campaign updated successfully");
      setSaving(false);
      navigate("/dashboard/campaigns");
    }, 1000);
    
    // In a real app:
    // try {
    //   await updateCampaign(campaignId, campaignData);
    //   toast.success("Campaign updated successfully");
    //   navigate("/dashboard/campaigns");
    // } catch (error) {
    //   console.error("Failed to update campaign:", error);
    //   toast.error("Failed to update campaign");
    // } finally {
    //   setSaving(false);
    // }
  };
  
  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-brand-pink" />
        <span className="ml-2">Loading campaign...</span>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <Button variant="ghost" onClick={() => navigate("/dashboard/campaigns")} className="mr-2">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <h1 className="text-2xl font-bold">Edit Campaign</h1>
        </div>
        <Button 
          onClick={handleSave} 
          disabled={saving}
          className="bg-brand-pink hover:bg-brand-pink/90"
        >
          {saving ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </>
          )}
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Campaign Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="title">Campaign Title*</Label>
              <Input 
                id="title"
                name="title"
                value={campaign.title}
                onChange={handleInputChange}
                placeholder="Enter campaign title"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="budget">Budget ($)</Label>
              <Input 
                id="budget"
                name="budget"
                value={campaign.budget}
                onChange={handleInputChange}
                placeholder="Enter budget amount"
              />
            </div>
            
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="description">Description</Label>
              <Textarea 
                id="description"
                name="description"
                value={campaign.description}
                onChange={handleInputChange}
                placeholder="Describe the campaign"
                rows={4}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date</Label>
              <Input 
                id="startDate"
                name="startDate"
                type="date"
                value={campaign.startDate}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="endDate">End Date</Label>
              <Input 
                id="endDate"
                name="endDate"
                type="date"
                value={campaign.endDate}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="deadline">Application Deadline</Label>
              <Input 
                id="deadline"
                name="deadline"
                type="date"
                value={campaign.deadline}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>SLOT Management</CardTitle>
        </CardHeader>
        <CardContent>
          <SlotManagement
            campaignId={campaign.id}
            slots={campaign.slots}
            onAddSlot={handleAddSlot}
            onRemoveSlot={handleRemoveSlot}
          />
        </CardContent>
      </Card>
      
      <div className="flex justify-end gap-4">
        <Button variant="outline" onClick={() => navigate("/dashboard/campaigns")}>
          Cancel
        </Button>
        <Button 
          onClick={handleSave} 
          disabled={saving}
          className="bg-brand-pink hover:bg-brand-pink/90"
        >
          {saving ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default EditCampaignPage;
