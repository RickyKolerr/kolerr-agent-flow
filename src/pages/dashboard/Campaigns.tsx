
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Search } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Campaign as CampaignType } from "@/types/campaign";
import { CampaignFilters } from "@/components/campaigns/CampaignFilters";
import { CampaignListItem } from "@/components/campaigns/CampaignListItem";

// Define a local campaign structure that matches what we're using in this file
interface Campaign {
  id: string;
  title: string;
  status: "draft" | "active" | "completed" | "paused";
  budget: number;
  audience: string;
  startDate: string;
  endDate: string;
  description: string;
  metrics: {
    views: number;
    engagement: number;
    conversions: number;
    roi: number;
  };
  assignedKols: {
    id: string;
    name: string;
    status: "pending" | "accepted" | "declined";
    metrics?: {
      views: number;
      engagement: number;
    };
  }[];
  createdAt: string;
  updatedAt: string;
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
      description: "Summer fashion collection launch featuring new swimwear line",
      metrics: {
        views: 12500,
        engagement: 4.8,
        conversions: 380,
        roi: 3.2
      },
      assignedKols: [
        { id: "kol1", name: "Fashion Influencer 1", status: "accepted", metrics: { views: 5000, engagement: 5.2 } },
        { id: "kol2", name: "Fashion Influencer 2", status: "pending" }
      ],
      createdAt: "2023-05-15T10:30:00Z",
      updatedAt: "2023-05-20T14:15:00Z"
    },
    {
      id: "camp2",
      title: "New Product Teaser",
      status: "draft",
      budget: 3000,
      audience: "Tech enthusiasts, 20-45",
      startDate: "2023-07-20",
      endDate: "2023-08-05",
      description: "Teaser campaign for upcoming product launch",
      metrics: {
        views: 0,
        engagement: 0,
        conversions: 0,
        roi: 0
      },
      assignedKols: [],
      createdAt: "2023-06-10T09:15:00Z",
      updatedAt: "2023-06-10T09:15:00Z"
    },
    {
      id: "camp3",
      title: "Holiday Special",
      status: "completed",
      budget: 7500,
      audience: "General, all ages",
      startDate: "2022-12-01",
      endDate: "2022-12-25",
      description: "Holiday season promotional campaign",
      metrics: {
        views: 25000,
        engagement: 5.2,
        conversions: 850,
        roi: 4.5
      },
      assignedKols: [
        { id: "kol3", name: "Lifestyle Influencer", status: "accepted", metrics: { views: 12000, engagement: 6.1 } },
        { id: "kol4", name: "Family Influencer", status: "accepted", metrics: { views: 8500, engagement: 4.8 } }
      ],
      createdAt: "2022-11-10T08:20:00Z",
      updatedAt: "2022-12-28T16:45:00Z"
    },
    {
      id: "camp4",
      title: "Back to School",
      status: "paused",
      budget: 4200,
      audience: "Students, parents, 16-45",
      startDate: "2023-08-15",
      endDate: "2023-09-05",
      description: "Back to school promotional campaign for students and parents",
      metrics: {
        views: 7500,
        engagement: 3.7,
        conversions: 210,
        roi: 2.8
      },
      assignedKols: [
        { id: "kol5", name: "Student Influencer", status: "accepted", metrics: { views: 3500, engagement: 4.2 } }
      ],
      createdAt: "2023-07-20T11:30:00Z",
      updatedAt: "2023-08-25T13:40:00Z"
    },
    {
      id: "camp5",
      title: "Fitness Challenge",
      status: "active",
      budget: 6000,
      audience: "Fitness enthusiasts, 18-40",
      startDate: "2023-05-01",
      endDate: "2023-05-31",
      description: "30-day fitness challenge campaign with workout influencers",
      metrics: {
        views: 18000,
        engagement: 6.3,
        conversions: 520,
        roi: 3.9
      },
      assignedKols: [
        { id: "kol6", name: "Fitness Instructor 1", status: "accepted", metrics: { views: 9500, engagement: 7.1 } },
        { id: "kol7", name: "Fitness Instructor 2", status: "declined" }
      ],
      createdAt: "2023-04-15T14:20:00Z",
      updatedAt: "2023-04-28T10:10:00Z"
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
