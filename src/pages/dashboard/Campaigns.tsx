
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CampaignCard } from "@/components/campaigns/CampaignCard";
import { CampaignFilters } from "@/components/campaigns/CampaignFilters";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { PlusCircle, Filter } from "lucide-react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { ApplicationManagement } from "@/components/campaigns/ApplicationManagement";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const CampaignsPage = () => {
  const navigate = useNavigate();
  const [showFilters, setShowFilters] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const { user } = useAuth();
  const isBrand = user?.role === "brand";
  
  // Add state for filters
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("date-desc");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [campaignToDelete, setCampaignToDelete] = useState<string | null>(null);

  // Example campaigns data - enhanced with the required properties for CampaignCard
  const [campaigns, setCampaigns] = useState([
    {
      id: "camp1",
      title: "Summer Collection Launch",
      brand: "FashionBrand",
      brandLogo: "https://ui-avatars.com/api/?name=FB&background=0D8ABC&color=fff",
      status: "active",
      budget: "$5,000",
      compatibility: 85,
      deadline: "2023-06-30",
      applications: 14,
      kols: 3,
      startDate: "2023-06-01",
      endDate: "2023-06-30",
      platforms: ["TikTok", "Instagram"],
      categories: ["Fashion", "Summer"],
      requirements: ["2+ min video", "Product showcase"],
      goals: ["Brand Awareness", "Product Launch"],
      progress: 65,
      description: "Launch our new summer collection with a focus on sustainable materials and ethical production processes.",
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
    },
    {
      id: "camp2",
      title: "Back to School Campaign",
      brand: "EduSupplies",
      brandLogo: "https://ui-avatars.com/api/?name=ES&background=4CAF50&color=fff",
      status: "draft",
      budget: "$3,500",
      compatibility: 70,
      deadline: "2023-08-15",
      applications: 0,
      kols: 0,
      startDate: "2023-07-15",
      endDate: "2023-08-15",
      platforms: ["TikTok"],
      categories: ["Education", "Back to School"],
      requirements: ["Review products", "Show usage"],
      goals: ["Sales", "Engagement"],
      progress: 0,
      description: "Target students and parents with our back to school essentials. Focus on affordability and style.",
      slots: []
    },
    {
      id: "camp3",
      title: "Holiday Special",
      brand: "GiftWonders",
      brandLogo: "https://ui-avatars.com/api/?name=GW&background=FF5722&color=fff",
      status: "scheduled",
      budget: "$10,000",
      compatibility: 90,
      deadline: "2023-12-31",
      applications: 5,
      kols: 0,
      startDate: "2023-11-15",
      endDate: "2023-12-31",
      platforms: ["TikTok", "Instagram", "YouTube"],
      categories: ["Holiday", "Gifts"],
      requirements: ["Gift showcase", "Holiday themes"],
      goals: ["Sales", "Brand Awareness"],
      progress: 20,
      description: "Holiday-themed campaign to drive Q4 sales. Looking for creators who can showcase products in festive settings.",
      slots: []
    },
    {
      id: "camp4",
      title: "Fitness Challenge",
      brand: "FitLife",
      brandLogo: "https://ui-avatars.com/api/?name=FL&background=9C27B0&color=fff",
      status: "completed",
      budget: "$7,500",
      compatibility: 95,
      deadline: "2023-02-15",
      applications: 22,
      kols: 5,
      startDate: "2023-01-15",
      endDate: "2023-02-15",
      platforms: ["TikTok", "Instagram"],
      categories: ["Fitness", "Health"],
      requirements: ["Workout demos", "Progress tracking"],
      goals: ["Engagement", "User Generated Content"],
      progress: 100,
      description: "30-day fitness challenge with our new line of workout gear. Target fitness influencers with engaged audiences.",
      slots: []
    },
  ]);

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
  };

  const handleSortChange = (value: string) => {
    setSortBy(value);
  };

  const handleEditCampaign = (id: string) => {
    navigate(`/dashboard/campaigns/edit/${id}`);
  };

  const handleDeleteCampaign = (id: string) => {
    // Open confirmation dialog
    setCampaignToDelete(id);
    setDeleteDialogOpen(true);
  };

  const confirmDeleteCampaign = () => {
    if (campaignToDelete) {
      // Filter out the campaign to delete
      const updatedCampaigns = campaigns.filter(campaign => campaign.id !== campaignToDelete);
      setCampaigns(updatedCampaigns);
      
      // Show success toast
      toast.success("Campaign deleted successfully");
      
      // Close dialog and reset state
      setDeleteDialogOpen(false);
      setCampaignToDelete(null);
    }
  };

  // Filter campaigns based on search query
  const filteredCampaigns = campaigns.filter(campaign => {
    if (!searchQuery) return true;
    
    const searchLower = searchQuery.toLowerCase();
    return (
      campaign.title.toLowerCase().includes(searchLower) ||
      campaign.description.toLowerCase().includes(searchLower) ||
      campaign.brand.toLowerCase().includes(searchLower) ||
      campaign.categories.some(cat => cat.toLowerCase().includes(searchLower))
    );
  });

  // Sort campaigns based on sortBy
  const sortedCampaigns = [...filteredCampaigns].sort((a, b) => {
    switch(sortBy) {
      case "name-asc":
        return a.title.localeCompare(b.title);
      case "name-desc":
        return b.title.localeCompare(a.title);
      case "date-asc":
        return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
      case "date-desc":
        return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
      default:
        return 0;
    }
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4 items-start sm:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Campaigns</h1>
          <p className="text-muted-foreground mt-1">
            Manage your influencer marketing campaigns
          </p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          {isMobile ? (
            <>
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
              <Button
                className="flex-1"
                onClick={() => navigate("/dashboard/campaigns/create")}
              >
                <PlusCircle className="h-4 w-4 mr-2" />
                New
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="h-4 w-4 mr-2" />
                {showFilters ? "Hide Filters" : "Show Filters"}
              </Button>
              <Button onClick={() => navigate("/dashboard/campaigns/create")}>
                <PlusCircle className="h-4 w-4 mr-2" />
                Create Campaign
              </Button>
            </>
          )}
        </div>
      </div>

      {showFilters && 
        <CampaignFilters 
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
          sortBy={sortBy}
          onSortChange={handleSortChange}
        />
      }

      {/* KOL Applications Section - Only visible to brands */}
      {isBrand && <ApplicationManagement />}

      {/* Campaigns Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {sortedCampaigns.map((campaign) => (
          <CampaignCard 
            key={campaign.id} 
            campaign={campaign} 
            onApply={() => {}} 
            disableApply={isBrand}
            onEdit={isBrand ? handleEditCampaign : undefined}
            onDelete={isBrand ? handleDeleteCampaign : undefined}
          />
        ))}
      </div>

      {sortedCampaigns.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium">No campaigns found</h3>
          <p className="text-muted-foreground mt-1">
            {searchQuery 
              ? "Try adjusting your search filters"
              : "Create your first campaign to get started"
            }
          </p>
          <Button className="mt-4" onClick={() => navigate("/dashboard/campaigns/create")}>
            <PlusCircle className="h-4 w-4 mr-2" />
            Create Campaign
          </Button>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the campaign
              and remove all associated data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              className="bg-red-600 hover:bg-red-700 text-white"
              onClick={confirmDeleteCampaign}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default CampaignsPage;
