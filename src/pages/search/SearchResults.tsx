
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Filter,
  SlidersHorizontal,
  User,
  TrendingUp,
  Clock,
  ArrowUp,
  ArrowDown,
  Contact
} from "lucide-react";
import { toast } from "sonner";
import { CreditBadge } from "@/components/CreditBadge";
import { mockCreatorData } from "@/data/mockCreators";

// Types
interface Creator {
  id: string;
  username: string;
  fullName: string;
  avatar: string;
  followers: number;
  engagementRate: number;
  niche: string[];
  contentSamples: string[];
  location: string;
}

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [creators, setCreators] = useState<Creator[]>([]);
  const [filteredCreators, setFilteredCreators] = useState<Creator[]>([]);
  const [sortBy, setSortBy] = useState("relevance");
  const [filterNiche, setFilterNiche] = useState<string[]>([]);
  const [filterFollowers, setFilterFollowers] = useState("");
  const [loading, setLoading] = useState(true);
  
  // Parse search query from URL parameters
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get("q") || "";
    const category = params.get("category");
    
    setSearchQuery(query);
    
    // Simulate API call
    setLoading(true);
    
    // Simulate delay for API call
    setTimeout(() => {
      if (category === "top") {
        // Filter for top creators (those with high engagement)
        const topResults = mockCreatorData
          .sort((a, b) => b.engagementRate - a.engagementRate)
          .slice(0, 10);
        setCreators(topResults);
        setFilteredCreators(topResults);
      } else if (category === "trending") {
        // Filter for trending creators (highest recent growth)
        const trendingResults = mockCreatorData
          .filter(creator => creator.trending)
          .slice(0, 10);
        setCreators(trendingResults);
        setFilteredCreators(trendingResults);
      } else if (query) {
        // Search by query term
        const queryResults = mockCreatorData.filter(creator => 
          creator.username.toLowerCase().includes(query.toLowerCase()) || 
          creator.fullName.toLowerCase().includes(query.toLowerCase()) ||
          creator.niche.some(niche => niche.toLowerCase().includes(query.toLowerCase()))
        );
        setCreators(queryResults);
        setFilteredCreators(queryResults);
      } else {
        // Default - show all creators
        setCreators(mockCreatorData);
        setFilteredCreators(mockCreatorData);
      }
      
      setLoading(false);
    }, 1000);
  }, [location.search]);
  
  // Apply filters and sorting
  useEffect(() => {
    let results = [...creators];
    
    // Apply niche filter
    if (filterNiche.length > 0) {
      results = results.filter(creator => 
        creator.niche.some(niche => filterNiche.includes(niche))
      );
    }
    
    // Apply follower count filter
    if (filterFollowers) {
      const minFollowers = parseInt(filterFollowers) * 1000;
      results = results.filter(creator => creator.followers >= minFollowers);
    }
    
    // Apply tab filter
    if (activeTab !== "all") {
      results = results.filter(creator => 
        creator.niche.includes(activeTab)
      );
    }
    
    // Apply sorting
    switch (sortBy) {
      case "followers_high":
        results.sort((a, b) => b.followers - a.followers);
        break;
      case "followers_low":
        results.sort((a, b) => a.followers - b.followers);
        break;
      case "engagement_high":
        results.sort((a, b) => b.engagementRate - a.engagementRate);
        break;
      default:
        // relevance is default
        break;
    }
    
    setFilteredCreators(results);
  }, [creators, activeTab, sortBy, filterNiche, filterFollowers]);
  
  const handleSearch = () => {
    if (!searchQuery.trim()) {
      toast.error("Please enter a search term");
      return;
    }
    
    navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
  };
  
  const handleViewProfile = (id: string) => {
    navigate(`/creators/${id}`);
  };
  
  const handleContactCreator = (id: string) => {
    // Show premium upgrade toast
    toast.info("Premium feature", {
      description: "Upgrade to premium to contact creators directly",
      action: {
        label: "Upgrade",
        onClick: () => navigate("/pricing")
      }
    });
  };
  
  // Get unique niches for filtering
  const allNiches = Array.from(
    new Set(mockCreatorData.flatMap(creator => creator.niche))
  ).sort();
  
  // Toggle niche in filter
  const toggleNicheFilter = (niche: string) => {
    if (filterNiche.includes(niche)) {
      setFilterNiche(filterNiche.filter(n => n !== niche));
    } else {
      setFilterNiche([...filterNiche, niche]);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Search Results</h1>
        <CreditBadge />
      </div>
      
      {/* Search Bar */}
      <div className="bg-card rounded-lg p-4 mb-6 shadow-sm">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search TikTok creators..."
              className="pl-9"
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
          </div>
          <Button onClick={handleSearch} className="bg-brand-pink hover:bg-brand-pink/90">
            Search
          </Button>
        </div>
      </div>
      
      {/* Results Area */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Filters Sidebar */}
        <div className="md:col-span-1">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold flex items-center">
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </h2>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => {
                    setFilterNiche([]);
                    setFilterFollowers("");
                    setSortBy("relevance");
                  }}
                >
                  Reset
                </Button>
              </div>
              
              <Separator className="my-4" />
              
              <div className="space-y-4">
                {/* Niche Filter */}
                <div>
                  <h3 className="text-sm font-medium mb-2">Creator Niche</h3>
                  <div className="flex flex-wrap gap-2">
                    {allNiches.map(niche => (
                      <Badge 
                        key={niche}
                        variant={filterNiche.includes(niche) ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => toggleNicheFilter(niche)}
                      >
                        {niche}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                {/* Followers Filter */}
                <div>
                  <h3 className="text-sm font-medium mb-2">Minimum Followers (K)</h3>
                  <Input
                    type="number"
                    placeholder="e.g. 100"
                    value={filterFollowers}
                    onChange={(e) => setFilterFollowers(e.target.value)}
                  />
                </div>
                
                {/* Sort Options */}
                <div>
                  <h3 className="text-sm font-medium mb-2">Sort By</h3>
                  <div className="space-y-2">
                    <Button 
                      variant={sortBy === "relevance" ? "default" : "outline"}
                      size="sm"
                      className="w-full justify-start"
                      onClick={() => setSortBy("relevance")}
                    >
                      <TrendingUp className="h-4 w-4 mr-2" />
                      Relevance
                    </Button>
                    
                    <Button 
                      variant={sortBy === "followers_high" ? "default" : "outline"}
                      size="sm"
                      className="w-full justify-start"
                      onClick={() => setSortBy("followers_high")}
                    >
                      <ArrowDown className="h-4 w-4 mr-2" />
                      Followers (High to Low)
                    </Button>
                    
                    <Button 
                      variant={sortBy === "followers_low" ? "default" : "outline"}
                      size="sm"
                      className="w-full justify-start"
                      onClick={() => setSortBy("followers_low")}
                    >
                      <ArrowUp className="h-4 w-4 mr-2" />
                      Followers (Low to High)
                    </Button>
                    
                    <Button 
                      variant={sortBy === "engagement_high" ? "default" : "outline"}
                      size="sm"
                      className="w-full justify-start"
                      onClick={() => setSortBy("engagement_high")}
                    >
                      <TrendingUp className="h-4 w-4 mr-2" />
                      Engagement Rate
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Results List */}
        <div className="md:col-span-3">
          {/* Category Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
            <TabsList className="w-full justify-start overflow-x-auto">
              <TabsTrigger value="all">All Creators</TabsTrigger>
              {allNiches.slice(0, 5).map(niche => (
                <TabsTrigger key={niche} value={niche}>{niche}</TabsTrigger>
              ))}
              <TabsTrigger value="more">More...</TabsTrigger>
            </TabsList>
          </Tabs>
          
          {/* Results Count */}
          <div className="mb-4 text-sm text-muted-foreground">
            Found {filteredCreators.length} creators
            {searchQuery && <span> for "{searchQuery}"</span>}
            {filterNiche.length > 0 && <span> in {filterNiche.join(", ")}</span>}
          </div>
          
          {/* Creator Cards */}
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <Card key={i} className="animate-pulse">
                  <CardContent className="p-6 h-28"></CardContent>
                </Card>
              ))}
            </div>
          ) : filteredCreators.length === 0 ? (
            <div className="text-center py-10">
              <h3 className="font-medium text-lg">No creators found</h3>
              <p className="text-muted-foreground mt-2">Try adjusting your search or filters</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredCreators.map(creator => (
                <Card key={creator.id} className="overflow-hidden hover:shadow-md transition-shadow">
                  <CardContent className="p-0">
                    <div className="flex items-center p-4">
                      <div className="flex-shrink-0 mr-4">
                        <div className="h-16 w-16 rounded-full overflow-hidden bg-muted">
                          <img 
                            src={creator.avatar || "/placeholder.svg"} 
                            alt={creator.username} 
                            className="h-full w-full object-cover"
                          />
                        </div>
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center mb-1">
                          <h3 className="font-medium">{creator.fullName}</h3>
                          <span className="text-muted-foreground text-sm ml-2">@{creator.username}</span>
                        </div>
                        
                        <div className="flex items-center text-sm text-muted-foreground mb-2">
                          <span className="mr-4">{(creator.followers / 1000).toFixed(0)}K followers</span>
                          <span>{(creator.engagementRate * 100).toFixed(2)}% engagement</span>
                        </div>
                        
                        <div className="flex flex-wrap gap-2">
                          {creator.niche.map(niche => (
                            <Badge key={niche} variant="secondary" className="text-xs">
                              {niche}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button 
                          onClick={() => handleContactCreator(creator.id)}
                          variant="gradient"
                          className="flex items-center"
                        >
                          <Contact className="h-4 w-4 mr-2" />
                          Contact
                        </Button>
                        
                        <Button 
                          onClick={() => handleViewProfile(creator.id)}
                          className="bg-brand-pink hover:bg-brand-pink/90"
                        >
                          <User className="h-4 w-4 mr-2" />
                          View Profile
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
