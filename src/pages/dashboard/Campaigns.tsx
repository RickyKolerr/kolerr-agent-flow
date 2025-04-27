import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Filter, Calendar, ArrowUpRight } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

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

  const filteredCampaigns = mockCampaigns
    .filter(campaign => 
      campaign.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter(campaign => {
      if (activeTab === "all") return true;
      return campaign.status === activeTab;
    });

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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Campaigns</h1>
        <Button onClick={handleCreateCampaign} className="bg-brand-pink hover:bg-brand-pink/90">
          <Plus className="mr-2 h-4 w-4" /> Create Campaign
        </Button>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
            <div className="flex items-center space-x-2 flex-1">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search campaigns..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1"
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

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
          <CampaignsList campaigns={filteredCampaigns} formatDate={formatDate} />
        </TabsContent>
        <TabsContent value="active" className="mt-6">
          <CampaignsList campaigns={filteredCampaigns} formatDate={formatDate} />
        </TabsContent>
        <TabsContent value="draft" className="mt-6">
          <CampaignsList campaigns={filteredCampaigns} formatDate={formatDate} />
        </TabsContent>
        <TabsContent value="completed" className="mt-6">
          <CampaignsList campaigns={filteredCampaigns} formatDate={formatDate} />
        </TabsContent>
        <TabsContent value="paused" className="mt-6">
          <CampaignsList campaigns={filteredCampaigns} formatDate={formatDate} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

interface CampaignsListProps {
  campaigns: Campaign[];
  formatDate: (date: string) => string;
}

const CampaignsList = ({ campaigns, formatDate }: CampaignsListProps) => {
  const getStatusColor = (status: Campaign['status']) => {
    switch(status) {
      case 'active': return 'bg-green-500/10 text-green-500 hover:bg-green-500/20 border-green-500/20';
      case 'draft': return 'bg-gray-500/10 text-gray-500 hover:bg-gray-500/20 border-gray-500/20';
      case 'completed': return 'bg-blue-500/10 text-blue-500 hover:bg-blue-500/20 border-blue-500/20';
      case 'paused': return 'bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20 border-yellow-500/20';
    }
  };

  const handleCampaignClick = (id: string) => {
    toast.info(`Viewing campaign details for ${id}`);
  };

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {campaigns.length > 0 ? (
        campaigns.map((campaign) => (
          <Card 
            key={campaign.id} 
            className="cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => handleCampaignClick(campaign.id)}
          >
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg font-medium">
                  {campaign.title}
                </CardTitle>
                <Badge variant="outline" className={getStatusColor(campaign.status)}>
                  {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Budget</span>
                  <span className="font-medium">${campaign.budget.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Target Audience</span>
                  <span className="font-medium">{campaign.audience}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">KOLs</span>
                  <span className="font-medium">{campaign.kols}</span>
                </div>
                {campaign.status !== 'draft' && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Avg. Engagement</span>
                    <span className="font-medium">{campaign.engagement}%</span>
                  </div>
                )}
                <div className="flex justify-between items-center pt-2 border-t border-border">
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Calendar className="mr-1 h-3 w-3" />
                    <span>
                      {formatDate(campaign.startDate)} - {formatDate(campaign.endDate)}
                    </span>
                  </div>
                  <Button variant="ghost" size="sm" className="text-brand-pink">
                    Details <ArrowUpRight className="ml-1 h-3 w-3" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))
      ) : (
        <div className="col-span-2 flex flex-col items-center justify-center p-12 text-center">
          <Search className="h-10 w-10 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium">No campaigns found</h3>
          <p className="text-muted-foreground mt-1">
            No campaigns match your current search or filter criteria.
          </p>
        </div>
      )}
    </div>
  );
};

export default CampaignsPage;
