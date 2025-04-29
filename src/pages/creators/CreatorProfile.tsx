
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Star, TrendingUp, Users, MessageCircle, CheckCircle } from "lucide-react";
import { mockCreatorData } from "@/data/mockCreators";
import { useUserAccess } from "@/hooks/useUserAccess";
import { toast } from "sonner";

const CreatorProfile = () => {
  const { creatorId } = useParams();
  const navigate = useNavigate();
  const [creator, setCreator] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated, canAccessFeature } = useUserAccess();

  useEffect(() => {
    // Simulate API call to fetch creator data
    const fetchCreator = async () => {
      setLoading(true);
      try {
        // Find creator in mock data based on ID
        const foundCreator = mockCreatorData.find(c => c.id === creatorId);
        
        if (!foundCreator) {
          toast.error("Creator not found");
          navigate("/search");
          return;
        }
        
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 800));
        setCreator(foundCreator);
      } catch (error) {
        toast.error("Failed to load creator profile");
      } finally {
        setLoading(false);
      }
    };
    
    fetchCreator();
  }, [creatorId, navigate]);
  
  const handleBookCreator = () => {
    if (!isAuthenticated) {
      toast.info("Please log in to book this creator", {
        action: {
          label: "Login",
          onClick: () => navigate("/login")
        }
      });
      return;
    }
    
    navigate("/dashboard/bookings", { 
      state: { creator: creator } 
    });
  };
  
  const handleAddToCampaign = () => {
    if (!isAuthenticated) {
      toast.info("Please log in to add creators to campaigns", {
        action: {
          label: "Login",
          onClick: () => navigate("/login")
        }
      });
      return;
    }
    
    navigate("/dashboard/campaigns", { 
      state: { selectedCreator: creator } 
    });
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 flex items-center justify-center h-[70vh]">
        <div className="text-center">
          <div className="animate-spin h-12 w-12 rounded-full border-4 border-primary border-t-transparent mx-auto mb-4"></div>
          <p className="text-xl">Loading creator profile...</p>
        </div>
      </div>
    );
  }

  if (!creator) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Creator Not Found</h2>
          <p className="mb-6">The creator profile you're looking for doesn't exist or has been removed.</p>
          <Button onClick={() => navigate("/search")}>Back to Search</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="glass-panel rounded-2xl p-6 shadow-2xl mb-8">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/3">
            <div className="rounded-xl overflow-hidden mb-4 aspect-square">
              <img 
                src={creator.avatar} 
                alt={creator.fullName} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-4">
              <Button 
                onClick={handleBookCreator}
                className="w-full bg-brand-pink hover:bg-brand-pink/90"
                size="lg"
              >
                Book This Creator
              </Button>
              <Button 
                onClick={handleAddToCampaign}
                variant="outline"
                className="w-full"
                size="lg"
              >
                Add to Campaign
              </Button>
              <Button 
                variant="ghost"
                className="w-full"
                onClick={() => navigate('/search')}
              >
                Back to Search
              </Button>
            </div>
          </div>
          
          <div className="md:w-2/3">
            <div className="mb-6">
              <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">{creator.fullName}</h1>
                <Badge className="bg-brand-pink text-white">
                  Top {creator.niche[0]} Creator
                </Badge>
              </div>
              <p className="text-muted-foreground mt-1">@{creator.username}</p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                <div className="bg-black/30 rounded-lg p-4 text-center">
                  <p className="text-brand-pink text-2xl font-bold">{(creator.followers / 1000000).toFixed(1)}M</p>
                  <p className="text-sm text-muted-foreground">Followers</p>
                </div>
                <div className="bg-black/30 rounded-lg p-4 text-center">
                  <p className="text-brand-pink text-2xl font-bold">{(creator.engagementRate * 100).toFixed(1)}%</p>
                  <p className="text-sm text-muted-foreground">Engagement</p>
                </div>
                <div className="bg-black/30 rounded-lg p-4 text-center">
                  <p className="text-brand-pink text-2xl font-bold">{creator.avgViews}</p>
                  <p className="text-sm text-muted-foreground">Avg. Views</p>
                </div>
                <div className="bg-black/30 rounded-lg p-4 text-center">
                  <p className="text-brand-pink text-2xl font-bold">${creator.rate}/post</p>
                  <p className="text-sm text-muted-foreground">Starting Rate</p>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 mt-6">
                {creator.niche.map(tag => (
                  <Badge key={tag} variant="secondary" className="text-sm py-1">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
            
            <Tabs defaultValue="about" className="mt-6">
              <TabsList className="grid grid-cols-3">
                <TabsTrigger value="about">About</TabsTrigger>
                <TabsTrigger value="content">Content</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
              </TabsList>
              <TabsContent value="about" className="mt-4">
                <Card>
                  <CardContent className="pt-6">
                    <p className="mb-4">
                      {creator.bio || `${creator.fullName} is a prominent influencer in the ${creator.niche.join(", ")} niche with a highly engaged audience across multiple platforms.`}
                    </p>
                    <div className="grid grid-cols-2 gap-4 mt-6">
                      <div>
                        <h3 className="font-semibold mb-2">Demographics</h3>
                        <p>Age: 18-34 (76%)</p>
                        <p>Gender: Female (65%), Male (35%)</p>
                        <p>Top locations: US, UK, Australia</p>
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">Collaborations</h3>
                        <p>Previous Brands: Nike, Adidas, Sephora</p>
                        <p>Content Types: Video, Stories, Posts</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="content" className="mt-4">
                <Card>
                  <CardContent className="pt-6">
                    <p className="mb-4 text-muted-foreground">Recent content samples from this creator</p>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div key={i} className="aspect-square bg-black/20 rounded-lg overflow-hidden relative">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <p className="text-muted-foreground text-sm">Content sample {i}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-6 text-center">
                      {isAuthenticated ? (
                        <Button variant="outline">View Full Content Library</Button>
                      ) : (
                        <Button 
                          variant="outline" 
                          onClick={() => navigate('/login')}
                        >
                          Login to View Full Content Library
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="analytics" className="mt-4">
                <Card>
                  <CardContent className="pt-6">
                    {isAuthenticated && canAccessFeature("analytics") ? (
                      <div>
                        <h3 className="font-semibold mb-4">Performance Metrics</h3>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-black/20 rounded-lg p-4">
                            <p className="text-muted-foreground text-sm">Audience Growth (last 30 days)</p>
                            <p className="text-xl font-bold text-brand-pink">+14.5%</p>
                          </div>
                          <div className="bg-black/20 rounded-lg p-4">
                            <p className="text-muted-foreground text-sm">Avg. Click-through Rate</p>
                            <p className="text-xl font-bold text-brand-pink">3.8%</p>
                          </div>
                          <div className="bg-black/20 rounded-lg p-4">
                            <p className="text-muted-foreground text-sm">Content Freq.</p>
                            <p className="text-xl font-bold text-brand-pink">4.2 posts/week</p>
                          </div>
                          <div className="bg-black/20 rounded-lg p-4">
                            <p className="text-muted-foreground text-sm">Audience Sentiment</p>
                            <p className="text-xl font-bold text-brand-pink">Very Positive</p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-6">
                        <TrendingUp className="h-12 w-12 mx-auto text-brand-pink opacity-50 mb-3" />
                        <h3 className="text-xl font-bold mb-2">Advanced Analytics</h3>
                        <p className="mb-4 text-muted-foreground">
                          Access detailed performance metrics for this creator with a premium plan
                        </p>
                        <Button 
                          onClick={() => navigate(isAuthenticated ? '/dashboard/subscription' : '/pricing')}
                          className="bg-brand-pink hover:bg-brand-pink/90"
                        >
                          {isAuthenticated ? 'Upgrade Plan' : 'View Pricing'}
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="bg-black/30 hover:bg-black/40 transition-all">
          <CardContent className="p-6">
            <div className="flex items-center mb-4">
              <Star className="h-5 w-5 text-brand-pink mr-2" />
              <h3 className="text-lg font-semibold">Similar Creators</h3>
            </div>
            <div className="space-y-3 mb-4">
              {mockCreatorData
                .filter(c => c.id !== creator.id && c.niche.some(n => creator.niche.includes(n)))
                .slice(0, 3)
                .map(c => (
                  <div key={c.id} className="flex items-center gap-3 p-2 rounded hover:bg-black/20">
                    <img src={c.avatar} alt={c.fullName} className="w-10 h-10 rounded-full object-cover" />
                    <div>
                      <p className="font-medium">{c.fullName}</p>
                      <p className="text-xs text-muted-foreground">{c.followers.toLocaleString()} followers</p>
                    </div>
                  </div>
                ))
              }
            </div>
            <Button 
              variant="ghost" 
              className="w-full" 
              size="sm"
              onClick={() => navigate('/search', { state: { niche: creator.niche[0] } })}
            >
              View More Similar Creators
            </Button>
          </CardContent>
        </Card>
        
        <Card className="bg-black/30 hover:bg-black/40 transition-all">
          <CardContent className="p-6">
            <div className="flex items-center mb-4">
              <MessageCircle className="h-5 w-5 text-brand-pink mr-2" />
              <h3 className="text-lg font-semibold">Contact Creator</h3>
            </div>
            <p className="text-sm mb-4 text-muted-foreground">
              Connect directly with this creator to discuss collaboration opportunities
            </p>
            <Button 
              className="w-full mb-2 bg-brand-pink hover:bg-brand-pink/90" 
              onClick={() => isAuthenticated ? handleBookCreator() : navigate('/login')}
            >
              {isAuthenticated ? "Send Message" : "Login to Contact"}
            </Button>
          </CardContent>
        </Card>
        
        <Card className="bg-black/30 hover:bg-black/40 transition-all">
          <CardContent className="p-6">
            <div className="flex items-center mb-4">
              <CheckCircle className="h-5 w-5 text-brand-pink mr-2" />
              <h3 className="text-lg font-semibold">Recommended For</h3>
            </div>
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2">
                <div className="bg-brand-pink/20 rounded-full p-1">
                  <CheckCircle className="h-4 w-4 text-brand-pink" />
                </div>
                <p>Brand awareness campaigns</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="bg-brand-pink/20 rounded-full p-1">
                  <CheckCircle className="h-4 w-4 text-brand-pink" />
                </div>
                <p>Product launches & reviews</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="bg-brand-pink/20 rounded-full p-1">
                  <CheckCircle className="h-4 w-4 text-brand-pink" />
                </div>
                <p>Lifestyle & travel partnerships</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="bg-brand-pink/20 rounded-full p-1">
                  <CheckCircle className="h-4 w-4 text-brand-pink" />
                </div>
                <p>Authentic story-telling content</p>
              </div>
            </div>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => navigate('/dashboard/campaigns/create', { state: { recommendedCreator: creator } })}
              disabled={!isAuthenticated}
            >
              Create Campaign with Creator
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CreatorProfile;
