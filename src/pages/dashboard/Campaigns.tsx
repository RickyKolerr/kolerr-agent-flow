import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Search } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Campaign } from "@/types/campaign";
import { CampaignFilters } from "@/components/campaigns/CampaignFilters";
import { CampaignListItem } from "@/components/campaigns/CampaignListItem";

interface Campaign {
  id: string;
  title: string;
  status: "draft" | "active" | "completed" | "paused";
  budget: number;
  audience: string;
  startDate: string;
  endDate: string;
  kols: number;
  engagement: number;
}

const CampaignsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [sortBy, setSortBy] = useState("date-desc");
  const navigate = useNavigate();

  const handleCreateCampaign = () => {
    navigate("/dashboard/campaigns/create");
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: '2-digit',
      month: 'short',
      day: 'numeric'
    });
  };

  const sortCampaigns = (campaigns: Campaign[]) => {
    return [...campaigns].sort((a, b) => {
      switch (sortBy) {
        case 'date-desc':
          return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
        case 'date-asc':
          return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
        case 'budget-desc':
          return b.budget - a.budget;
        case 'budget-asc':
          return a.budget - b.budget;
        default:
          return 0;
      }
    });
  };

  const mockCampaigns: Campaign[] = [
    {
      id: "camp1",
      title: "Summer Collection Launch",
      status: "active",
      budget: 5000,
      audience: "Fashion enthusiasts, 18-35",
      startDate: "2023-06-10",
      endDate: "2023-07-10",
      kols: 12,
      engagement: 4.8
    },
    {
      id: "camp2",
      title: "New Product Teaser",
      status: "draft",
      budget: 3000,
      audience: "Tech enthusiasts, 20-45",
      startDate: "2023-07-20",
      endDate: "2023-08-05",
      kols: 8,
      engagement: 0
    },
    {
      id: "camp3",
      title: "Holiday Special",
      status: "completed",
      budget: 7500,
      audience: "General, all ages",
      startDate: "2022-12-01",
      endDate: "2022-12-25",
      kols: 15,
      engagement: 5.2
    },
    {
      id: "camp4",
      title: "Back to School",
      status: "paused",
      budget: 4200,
      audience: "Students, parents, 16-45",
      startDate: "2023-08-15",
      endDate: "2023-09-05",
      kols: 10,
      engagement: 3.7
    },
    {
      id: "camp5",
      title: "Fitness Challenge",
      status: "active",
      budget: 6000,
      audience: "Fitness enthusiasts, 18-40",
      startDate: "2023-05-01",
      endDate: "2023-05-31",
      kols: 8,
      engagement: 6.3
    }
  ];

  const filteredCampaigns = sortCampaigns(
    mockCampaigns.filter(campaign => 
      campaign.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (activeTab === "all" || campaign.status === activeTab)
    )
  );

  const handleCampaignClick = (id: string) => {
    toast.info(`Viewing campaign details for ${id}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Campaigns</h1>
        <Button onClick={handleCreateCampaign}>
          <Plus className="mr-2 h-4 w-4" /> Create Campaign
        </Button>
      </div>

      <CampaignFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <div className="flex justify-between items-center">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="draft">Drafts</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="paused">Paused</TabsTrigger>
          </TabsList>
          <span className="text-sm text-muted-foreground">
            {filteredCampaigns.length} campaigns
          </span>
        </div>

        <TabsContent value="all" className="mt-6">
          <CampaignsList 
            campaigns={filteredCampaigns}
            onCampaignClick={handleCampaignClick}
            formatDate={formatDate}
          />
        </TabsContent>
        <TabsContent value="active" className="mt-6">
          <CampaignsList 
            campaigns={filteredCampaigns}
            onCampaignClick={handleCampaignClick}
            formatDate={formatDate}
          />
        </TabsContent>
        <TabsContent value="draft" className="mt-6">
          <CampaignsList 
            campaigns={filteredCampaigns}
            onCampaignClick={handleCampaignClick}
            formatDate={formatDate}
          />
        </TabsContent>
        <TabsContent value="completed" className="mt-6">
          <CampaignsList 
            campaigns={filteredCampaigns}
            onCampaignClick={handleCampaignClick}
            formatDate={formatDate}
          />
        </TabsContent>
        <TabsContent value="paused" className="mt-6">
          <CampaignsList 
            campaigns={filteredCampaigns}
            onCampaignClick={handleCampaignClick}
            formatDate={formatDate}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

interface CampaignsListProps {
  campaigns: Campaign[];
  onCampaignClick: (id: string) => void;
  formatDate: (date: string) => string;
}

const CampaignsList = ({ campaigns, onCampaignClick, formatDate }: CampaignsListProps) => {
  if (campaigns.length === 0) {
    return (
      <div className="col-span-2 flex flex-col items-center justify-center p-12 text-center">
        <Search className="h-10 w-10 text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium">No campaigns found</h3>
        <p className="text-muted-foreground mt-1">
          No campaigns match your current search or filter criteria.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {campaigns.map((campaign) => (
        <CampaignListItem
          key={campaign.id}
          campaign={campaign}
          onCampaignClick={onCampaignClick}
          formatDate={formatDate}
        />
      ))}
    </div>
  );
};

export default CampaignsPage;
