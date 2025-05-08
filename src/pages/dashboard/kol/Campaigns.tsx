
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, CalendarDays, Users, DollarSign } from "lucide-react";

// Mock campaign data
const mockCampaigns = [
  {
    id: "1",
    title: "Summer Fashion Collection",
    brand: "StyleBrand",
    brandLogo: "https://api.dicebear.com/7.x/identicon/svg?seed=StyleBrand",
    category: "Fashion",
    compensation: "$500 - $1,000",
    applicants: 32,
    deadline: "May 20, 2025",
    requirements: ["Instagram", "TikTok", "Min 10K followers"],
    description: "Looking for fashion influencers to showcase our new summer collection with creative photo and video content."
  },
  {
    id: "2",
    title: "Healthy Lifestyle Challenge",
    brand: "FitLife",
    brandLogo: "https://api.dicebear.com/7.x/identicon/svg?seed=FitLife",
    category: "Fitness",
    compensation: "$800 - $1,500",
    applicants: 48,
    deadline: "May 25, 2025",
    requirements: ["Instagram", "YouTube", "Min 20K followers"],
    description: "30-day fitness challenge campaign promoting our new supplements and workout gear. Looking for fitness creators to document their journey."
  },
  {
    id: "3",
    title: "Tech Gadget Review",
    brand: "TechWorld",
    brandLogo: "https://api.dicebear.com/7.x/identicon/svg?seed=TechWorld",
    category: "Technology",
    compensation: "$1,000 - $2,500",
    applicants: 27,
    deadline: "June 5, 2025",
    requirements: ["YouTube", "Blog", "Min 15K subscribers"],
    description: "In-depth reviews of our latest smart home products. We're seeking tech reviewers with experience in detailed product demonstrations."
  }
];

const KolCampaigns = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCampaigns = mockCampaigns.filter(campaign => 
    campaign.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    campaign.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
    campaign.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Available Campaigns</h1>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search campaigns..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline" className="gap-2">
          <Filter className="h-4 w-4" /> Filters
        </Button>
      </div>

      <div className="grid gap-6">
        {filteredCampaigns.map(campaign => (
          <Card key={campaign.id} className="hover-scale">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-md overflow-hidden">
                    <img
                      src={campaign.brandLogo}
                      alt={campaign.brand}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <CardTitle className="text-xl">{campaign.title}</CardTitle>
                    <CardDescription>{campaign.brand}</CardDescription>
                  </div>
                </div>
                <Badge variant="outline" className="bg-secondary/50">
                  {campaign.category}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                {campaign.description}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{campaign.compensation}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CalendarDays className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Deadline: {campaign.deadline}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{campaign.applicants} applicants</span>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {campaign.requirements.map((req, index) => (
                  <Badge key={index} variant="secondary">{req}</Badge>
                ))}
              </div>
              
              <div className="flex justify-end">
                <Button className="bg-brand-pink hover:bg-brand-pink/90">
                  Apply Now
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default KolCampaigns;
