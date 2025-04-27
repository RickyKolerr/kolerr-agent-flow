import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Search,
  SlidersHorizontal,
  Users,
  TrendingUp,
  Filter,
  Plus,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { useCredits } from "@/contexts/CreditContext";

const AdvancedSearch = () => {
  const navigate = useNavigate();
  const { useFreeCredit, usePremiumCredit, freeCredits, premiumCredits, hasPremiumPlan } = useCredits();
  
  const [searchType, setSearchType] = useState("creator");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedNiches, setSelectedNiches] = useState<string[]>([]);
  const [customNiche, setCustomNiche] = useState("");
  const [followerRange, setFollowerRange] = useState([0, 1000000]);
  const [engagementRate, setEngagementRate] = useState([0, 100]);
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [locationFilter, setLocationFilter] = useState("");
  const [searchCost, setSearchCost] = useState(3);
  
  const niches = [
    "Fashion", "Beauty", "Fitness", "Gaming", "Technology", "Food", "Travel", 
    "Lifestyle", "Comedy", "Education", "Finance", "Music", "Art", "Sports", 
    "Business", "Health", "Home Decor", "Parenting", "Pets"
  ];
  
  const handleAddCustomNiche = () => {
    if (customNiche && !selectedNiches.includes(customNiche)) {
      setSelectedNiches([...selectedNiches, customNiche]);
      setCustomNiche("");
      toast.success(`Added "${customNiche}" to selected niches`);
    }
  };
  
  const handleRemoveNiche = (niche: string) => {
    setSelectedNiches(selectedNiches.filter(n => n !== niche));
  };
  
  const handleToggleNiche = (niche: string) => {
    if (selectedNiches.includes(niche)) {
      handleRemoveNiche(niche);
    } else {
      setSelectedNiches([...selectedNiches, niche]);
    }
  };
  
  const formatFollowerCount = (value: number) => {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)}M`;
    } else if (value >= 1000) {
      return `${(value / 1000).toFixed(0)}K`;
    }
    return value.toString();
  };
  
  useEffect(() => {
    let cost = 1;
    
    if (selectedNiches.length > 0) cost += 1;
    if (locationFilter) cost += 1;
    
    if (searchType === "audience") cost = 5;
    
    setSearchCost(cost);
  }, [selectedNiches, locationFilter, searchType]);
  
  const handleSearch = () => {
    if (hasPremiumPlan && premiumCredits >= searchCost) {
      usePremiumCredit(searchCost);
      executeSearch();
    } else if (freeCredits >= searchCost) {
      for (let i = 0; i < searchCost; i++) {
        useFreeCredit();
      }
      executeSearch();
    } else {
      toast.error("Not enough search credits", {
        description: `This search requires ${searchCost} credits. You need more credits to continue.`,
        action: {
          label: "Get Credits",
          onClick: () => navigate("/pricing")
        }
      });
      return;
    }
  };
  
  const executeSearch = () => {
    const params = new URLSearchParams();
    
    if (searchQuery) {
      params.set("q", searchQuery);
    }
    
    if (selectedNiches.length > 0) {
      params.set("niches", selectedNiches.join(","));
    }
    
    params.set("followers_min", followerRange[0].toString());
    params.set("followers_max", followerRange[1].toString());
    
    params.set("engagement_min", engagementRate[0].toString());
    params.set("engagement_max", engagementRate[1].toString());
    
    if (verifiedOnly) {
      params.set("verified", "true");
    }
    
    if (locationFilter) {
      params.set("location", locationFilter);
    }
    
    params.set("searchType", searchType);
    
    navigate(`/search?${params.toString()}`);
    
    toast.success(
      "Advanced search complete", 
      { description: `${searchCost} credits used for this search` }
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-2 mb-6">
        <SlidersHorizontal className="h-6 w-6" />
        <h1 className="text-3xl font-bold tracking-tight">Advanced Search</h1>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Search Type</CardTitle>
              <CardDescription>
                Select what type of search you want to perform
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs 
                defaultValue={searchType} 
                onValueChange={setSearchType} 
                className="w-full"
              >
                <TabsList className="grid grid-cols-3 mb-4">
                  <TabsTrigger value="creator">
                    <Users className="h-4 w-4 mr-2" />
                    Creator Search
                  </TabsTrigger>
                  <TabsTrigger value="content">
                    <Filter className="h-4 w-4 mr-2" />
                    Content Analysis
                  </TabsTrigger>
                  <TabsTrigger value="audience">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Audience Insights
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="creator" className="space-y-4">
                  <p className="text-muted-foreground">
                    Search for specific creators or find creators matching your criteria
                  </p>
                </TabsContent>
                
                <TabsContent value="content" className="space-y-4">
                  <p className="text-muted-foreground">
                    Analyze content performance by type, format, and engagement
                  </p>
                </TabsContent>
                
                <TabsContent value="audience" className="space-y-4">
                  <p className="text-muted-foreground">
                    Find creators based on their audience demographics and interests
                  </p>
                  
                  {!hasPremiumPlan && (
                    <div className="bg-amber-500/10 border border-amber-500/20 text-amber-800 dark:text-amber-300 rounded-md p-3 text-sm flex items-center">
                      <div className="mr-2 flex-shrink-0">⚠️</div>
                      <div>
                        Audience insights require a premium plan or 5 credits per search.
                      </div>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Search Parameters</CardTitle>
              <CardDescription>
                Define your search criteria to find the perfect creators
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="search-query">Search Terms</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="search-query"
                    placeholder="Enter name, username or keywords..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Creator Niches</Label>
                
                <div className="flex flex-wrap gap-2 mb-3">
                  {selectedNiches.map(niche => (
                    <Badge key={niche} className="flex items-center gap-1">
                      {niche}
                      <button onClick={() => handleRemoveNiche(niche)}>
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
                
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Input
                      placeholder="Add custom niche..."
                      value={customNiche}
                      onChange={(e) => setCustomNiche(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleAddCustomNiche()}
                    />
                  </div>
                  <Button onClick={handleAddCustomNiche} size="icon" variant="outline">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="border rounded-lg p-4 mt-2">
                  <div className="text-sm font-medium mb-2">Common Niches</div>
                  <div className="flex flex-wrap gap-2">
                    {niches.map(niche => (
                      <Badge
                        key={niche}
                        variant={selectedNiches.includes(niche) ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => handleToggleNiche(niche)}
                      >
                        {niche}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
              
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="additional-filters">
                  <AccordionTrigger>Additional Filters</AccordionTrigger>
                  <AccordionContent className="space-y-6">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label>Follower Count</Label>
                        <span className="text-sm text-muted-foreground">
                          {formatFollowerCount(followerRange[0])} - {formatFollowerCount(followerRange[1])}
                        </span>
                      </div>
                      <Slider
                        defaultValue={followerRange}
                        max={5000000}
                        step={10000}
                        onValueChange={setFollowerRange}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label>Engagement Rate (%)</Label>
                        <span className="text-sm text-muted-foreground">
                          {engagementRate[0]}% - {engagementRate[1]}%
                        </span>
                      </div>
                      <Slider
                        defaultValue={engagementRate}
                        max={100}
                        step={1}
                        onValueChange={setEngagementRate}
                      />
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="verified" 
                        checked={verifiedOnly}
                        onCheckedChange={(checked) => setVerifiedOnly(!!checked)}
                      />
                      <Label htmlFor="verified">Verified creators only</Label>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="location">Creator Location</Label>
                      <Select 
                        value={locationFilter} 
                        onValueChange={setLocationFilter}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Any location" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">Any location</SelectItem>
                          <SelectItem value="us">United States</SelectItem>
                          <SelectItem value="ca">Canada</SelectItem>
                          <SelectItem value="uk">United Kingdom</SelectItem>
                          <SelectItem value="au">Australia</SelectItem>
                          <SelectItem value="eu">Europe</SelectItem>
                          <SelectItem value="asia">Asia</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => navigate("/search")}>
                Cancel
              </Button>
              <Button onClick={handleSearch} className="bg-brand-pink hover:bg-brand-pink/90">
                <Search className="h-4 w-4 mr-2" />
                Search ({searchCost} credits)
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Search Cost</CardTitle>
              <CardDescription>
                Credits required for this search
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <span className="text-4xl font-bold">{searchCost}</span>
                <span className="text-lg ml-1">credits</span>
              </div>
              
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>Base search</span>
                  <span>1 credit</span>
                </div>
                {selectedNiches.length > 0 && (
                  <div className="flex justify-between">
                    <span>Niche filtering</span>
                    <span>+1 credit</span>
                  </div>
                )}
                {locationFilter && (
                  <div className="flex justify-between">
                    <span>Location filtering</span>
                    <span>+1 credit</span>
                  </div>
                )}
                {searchType === "audience" && (
                  <div className="flex justify-between">
                    <span>Audience insights</span>
                    <span>+3 credits</span>
                  </div>
                )}
              </div>
              
              <Separator />
              
              <div className="space-y-1 text-sm">
                <div className="flex justify-between font-medium">
                  <span>Your credits</span>
                  <span>{freeCredits} free + {premiumCredits} premium</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>After this search</span>
                  <span>
                    {hasPremiumPlan 
                      ? `${freeCredits} free + ${premiumCredits - searchCost} premium` 
                      : `${freeCredits - searchCost} free + ${premiumCredits} premium`}
                  </span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                variant="outline" 
                className="w-full" 
                onClick={() => navigate("/pricing")}
              >
                Get More Credits
              </Button>
            </CardFooter>
          </Card>
          
          <div className="mt-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Pro Tips</CardTitle>
              </CardHeader>
              <CardContent className="text-sm space-y-2">
                <p>• Combine multiple niches for precise targeting</p>
                <p>• Use engagement rate filters to find high-performing creators</p>
                <p>• Save your common searches to reuse later</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedSearch;
