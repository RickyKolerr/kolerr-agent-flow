
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CampaignCard } from "@/components/campaigns/CampaignCard";
import { CampaignFilters } from "@/components/campaigns/CampaignFilters";
import { PlusCircle, Filter } from "lucide-react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { ApplicationManagement } from "@/components/campaigns/ApplicationManagement";
import { useAuth } from "@/contexts/AuthContext";

const CampaignsPage = () => {
  const navigate = useNavigate();
  const [showFilters, setShowFilters] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const { user } = useAuth();
  const isBrand = user?.role === "brand";
  
  // Add state for filters
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("date-desc");

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
  };

  const handleSortChange = (value: string) => {
    setSortBy(value);
  };

  // Example campaigns data - enhanced with the required properties for CampaignCard
  const campaigns = [
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
      description: "Launch our new summer collection with a focus on sustainable materials and ethical production processes."
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
      description: "Target students and parents with our back to school essentials. Focus on affordability and style."
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
      description: "Holiday-themed campaign to drive Q4 sales. Looking for creators who can showcase products in festive settings."
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
      description: "30-day fitness challenge with our new line of workout gear. Target fitness influencers with engaged audiences."
    },
  ];

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
        {campaigns.map((campaign) => (
          <CampaignCard 
            key={campaign.id} 
            campaign={campaign} 
            onApply={() => {}} 
            disableApply={isBrand} // Disable apply button for brands
          />
        ))}
      </div>

      {campaigns.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium">No campaigns yet</h3>
          <p className="text-muted-foreground mt-1">
            Create your first campaign to get started
          </p>
          <Button className="mt-4" onClick={() => navigate("/dashboard/campaigns/create")}>
            <PlusCircle className="h-4 w-4 mr-2" />
            Create Campaign
          </Button>
        </div>
      )}
    </div>
  );
};

export default CampaignsPage;
