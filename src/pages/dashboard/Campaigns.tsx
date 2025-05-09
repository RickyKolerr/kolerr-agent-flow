
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CampaignCard } from "@/components/campaigns/CampaignCard";
import { CampaignFilters } from "@/components/campaigns/CampaignFilters";
import { PlusCircle, Filter } from "lucide-react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { ApplicationManagement } from "@/components/campaigns/ApplicationManagement";

const CampaignsPage = () => {
  const navigate = useNavigate();
  const [showFilters, setShowFilters] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");

  // Example campaigns data
  const campaigns = [
    {
      id: "camp1",
      title: "Summer Collection Launch",
      status: "active",
      budget: "$5,000",
      applications: 14,
      kols: 3,
      startDate: "2023-06-01",
      endDate: "2023-06-30",
      platforms: ["TikTok", "Instagram"],
      goals: ["Brand Awareness", "Product Launch"],
      progress: 65,
      description: "Launch our new summer collection with a focus on sustainable materials and ethical production processes."
    },
    {
      id: "camp2",
      title: "Back to School Campaign",
      status: "draft",
      budget: "$3,500",
      applications: 0,
      kols: 0,
      startDate: "2023-07-15",
      endDate: "2023-08-15",
      platforms: ["TikTok"],
      goals: ["Sales", "Engagement"],
      progress: 0,
      description: "Target students and parents with our back to school essentials. Focus on affordability and style."
    },
    {
      id: "camp3",
      title: "Holiday Special",
      status: "scheduled",
      budget: "$10,000",
      applications: 5,
      kols: 0,
      startDate: "2023-11-15",
      endDate: "2023-12-31",
      platforms: ["TikTok", "Instagram", "YouTube"],
      goals: ["Sales", "Brand Awareness"],
      progress: 20,
      description: "Holiday-themed campaign to drive Q4 sales. Looking for creators who can showcase products in festive settings."
    },
    {
      id: "camp4",
      title: "Fitness Challenge",
      status: "completed",
      budget: "$7,500",
      applications: 22,
      kols: 5,
      startDate: "2023-01-15",
      endDate: "2023-02-15",
      platforms: ["TikTok", "Instagram"],
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

      {showFilters && <CampaignFilters />}

      {/* KOL Applications Section */}
      <ApplicationManagement />

      {/* Campaigns Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {campaigns.map((campaign) => (
          <CampaignCard 
            key={campaign.id} 
            campaign={campaign} 
            onClick={() => navigate(`/campaigns/${campaign.id}`)} 
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
