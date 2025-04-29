import { useState } from "react";
import { 
  FileSearch, Filter, 
  TrendingUp
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { CampaignCard } from "@/components/campaigns/CampaignCard";

// Mock campaigns
const mockCampaigns = [
  {
    id: "c1",
    title: "Summer Fashion Collection",
    brand: "StyleCo",
    brandLogo: "https://ui-avatars.com/api/?name=StyleCo&background=0D8ABC&color=fff",
    description: "Promote our new summer fashion collection across your TikTok channel. Looking for authentic content showcasing our newest styles.",
    budget: "500-1000",
    compatibility: 95,
    deadline: "2023-07-15",
    platforms: ["tiktok"],
    categories: ["fashion", "lifestyle"],
    requirements: ["1+ min video", "3+ posts"],
    status: "open"
  },
  {
    id: "c2",
    title: "Gaming Peripherals Review",
    brand: "TechGear",
    brandLogo: "https://ui-avatars.com/api/?name=TechGear&background=9C27B0&color=fff",
    description: "Looking for tech influencers to review our new line of gaming keyboards, mouse, and headsets. Honest reviews appreciated.",
    budget: "300-600",
    compatibility: 75,
    deadline: "2023-07-20",
    platforms: ["youtube", "tiktok"],
    categories: ["tech", "gaming"],
    requirements: ["Unboxing", "Detailed review"],
    status: "open"
  },
  {
    id: "c3",
    title: "Vegan Food Challenge",
    brand: "GreenEats",
    brandLogo: "https://ui-avatars.com/api/?name=GreenEats&background=4CAF50&color=fff",
    description: "Participate in our 3-day vegan challenge and share your experience with our meal kits. Looking for authentic reactions and recipes.",
    budget: "200-400",
    compatibility: 88,
    deadline: "2023-07-25",
    platforms: ["instagram", "tiktok"],
    categories: ["food", "lifestyle", "health"],
    requirements: ["3+ posts", "Story highlights"],
    status: "open"
  },
  {
    id: "c4",
    title: "Fitness Apparel Showcase",
    brand: "FlexFit",
    brandLogo: "https://ui-avatars.com/api/?name=FlexFit&background=FF5722&color=fff",
    description: "Show off your workout routine wearing our new fitness apparel line. Looking for dynamic content highlighting durability and style.",
    budget: "400-800",
    compatibility: 92,
    deadline: "2023-08-01",
    platforms: ["instagram", "tiktok"],
    categories: ["fitness", "fashion"],
    requirements: ["Workout demo", "Product features highlight"],
    status: "open"
  },
  {
    id: "c5",
    title: "Travel Backpack Feature",
    brand: "Wanderlust",
    brandLogo: "https://ui-avatars.com/api/?name=Wanderlust&background=607D8B&color=fff",
    description: "Feature our adventure-ready backpack in your travel content. Looking for authentic integrations showing versatility and durability.",
    budget: "300-700",
    compatibility: 80,
    deadline: "2023-08-10",
    platforms: ["instagram", "youtube"],
    categories: ["travel", "lifestyle"],
    requirements: ["Product placement", "Feature highlight"],
    status: "open"
  }
];

const AvailableCampaigns = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [budgetFilter, setBudgetFilter] = useState("all");
  const [platformFilter, setPlatformFilter] = useState("all");
  
  const filteredCampaigns = mockCampaigns.filter(campaign => {
    // Apply search filter
    if (searchQuery && !campaign.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !campaign.description.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Apply category filter
    if (categoryFilter && categoryFilter !== "all" && !campaign.categories.includes(categoryFilter)) {
      return false;
    }
    
    // Apply budget filter
    if (budgetFilter && budgetFilter !== "all") {
      const [min, max] = campaign.budget.split("-").map(Number);
      if (budgetFilter === "low" && min >= 300) return false;
      if (budgetFilter === "medium" && (min < 300 || min >= 600)) return false;
      if (budgetFilter === "high" && min < 600) return false;
    }
    
    // Apply platform filter
    if (platformFilter && platformFilter !== "all" && !campaign.platforms.includes(platformFilter)) {
      return false;
    }
    
    return true;
  });
  
  const handleApplyCampaign = (campaign: typeof mockCampaigns[0]) => {
    // This function could later be replaced with a backend call
    toast.success(`Applied to "${campaign.title}"`, {
      description: "Your application has been submitted successfully.",
      duration: 5000,
    });
    
    // Future backend integration:
    // 1. Make API call to backend to submit application
    // 2. Update local state to reflect application status
    // 3. Handle success/failure responses
    // 4. Redirect to application details or show follow-up actions
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
        <div className="flex items-center space-x-2">
          <FileSearch className="h-6 w-6 text-brand-pink" />
          <h1 className="text-2xl font-bold tracking-tight">Available Campaigns</h1>
        </div>
      </div>
      
      {/* Filters */}
      <div className="grid gap-4 md:grid-cols-4">
        <div className="col-span-full md:col-span-2">
          <Input 
            placeholder="Search campaigns..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full"
          />
        </div>
        
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="fashion">Fashion</SelectItem>
            <SelectItem value="beauty">Beauty</SelectItem>
            <SelectItem value="tech">Tech</SelectItem>
            <SelectItem value="gaming">Gaming</SelectItem>
            <SelectItem value="food">Food</SelectItem>
            <SelectItem value="travel">Travel</SelectItem>
            <SelectItem value="fitness">Fitness</SelectItem>
            <SelectItem value="lifestyle">Lifestyle</SelectItem>
          </SelectContent>
        </Select>
        
        <Select value={platformFilter} onValueChange={setPlatformFilter}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Platform" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Platforms</SelectItem>
            <SelectItem value="tiktok">TikTok</SelectItem>
            <SelectItem value="instagram">Instagram</SelectItem>
            <SelectItem value="youtube">YouTube</SelectItem>
          </SelectContent>
        </Select>
        
        <Select value={budgetFilter} onValueChange={setBudgetFilter}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Budget" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Budgets</SelectItem>
            <SelectItem value="low">Under $300</SelectItem>
            <SelectItem value="medium">$300-$600</SelectItem>
            <SelectItem value="high">$600+</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Campaign Cards */}
      <div className="grid gap-6 mt-6">
        {filteredCampaigns.length > 0 ? (
          filteredCampaigns.map((campaign) => (
            <CampaignCard
              key={campaign.id}
              campaign={campaign}
              onApply={handleApplyCampaign}
            />
          ))
        ) : (
          <div className="text-center py-12">
            <FileSearch className="mx-auto h-12 w-12 text-muted-foreground mb-3" />
            <h3 className="text-xl font-medium mb-2">No matching campaigns found</h3>
            <p className="text-muted-foreground">Try adjusting your filters or check back later for new opportunities</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AvailableCampaigns;
