import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription,
  CardFooter
} from "@/components/ui/card";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { 
  User, 
  MapPin, 
  Heart, 
  MessageCircle, 
  TrendingUp,
  Users, 
  Target, 
  Clock,
  ThumbsUp,
  Calendar,
  ChevronLeft,
  Lock
} from "lucide-react";
import { toast } from "sonner";
import { mockCreatorData } from "@/data/mockCreators";
import { mockConversations } from "@/components/chat/mockChatData";
import { useCredits } from "@/contexts/CreditContext";
import { useUserAccess } from "@/hooks/useUserAccess";

const CreatorProfile = () => {
  const { creatorId } = useParams();
  const navigate = useNavigate();
  const [creator, setCreator] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const { freeCredits, premiumCredits, useFreeCredit, usePremiumCredit, hasPremiumPlan } = useCredits();
  const { isAuthenticated } = useUserAccess();
  
  // Fetch creator data
  useEffect(() => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const foundCreator = mockCreatorData.find(c => c.id === creatorId);
      
      if (foundCreator) {
        setCreator(foundCreator);
      } else {
        toast.error("Creator not found");
        navigate("/search");
      }
      
      setLoading(false);
    }, 800);
  }, [creatorId, navigate]);
  
  // Handle advanced analytics request
  const handleAdvancedAnalytics = () => {
    if (!isAuthenticated) {
      toast.error("Sign up required", {
        description: "Create an account to access advanced analytics",
        action: {
          label: "Sign Up",
          onClick: () => navigate("/signup")
        }
      });
      return;
    }
    
    // Premium feature - requires 2 credits
    if (hasPremiumPlan && premiumCredits >= 2) {
      usePremiumCredit(2);
      toast.success("Advanced analytics accessed", {
        description: "2 premium credits have been used"
      });
      setActiveTab("analytics");
    } else if (freeCredits >= 2) {
      useFreeCredit();
      useFreeCredit();
      toast.success("Advanced analytics accessed", {
        description: "2 credits have been used"
      });
      setActiveTab("analytics");
    } else {
      toast.error("Not enough credits", {
        description: "You need 2 credits to view advanced analytics",
        action: {
          label: "Get Credits",
          onClick: () => navigate("/pricing")
        }
      });
    }
  };
  
  // Handle audience insights request
  const handleAudienceInsights = () => {
    if (!isAuthenticated) {
      toast.error("Sign up required", {
        description: "Create an account to access audience insights",
        action: {
          label: "Sign Up",
          onClick: () => navigate("/signup")
        }
      });
      return;
    }
    
    // Premium feature - requires 5 credits
    if (hasPremiumPlan && premiumCredits >= 5) {
      usePremiumCredit(5);
      toast.success("Audience insights accessed", {
        description: "5 premium credits have been used"
      });
      setActiveTab("audience");
    } else {
      toast.error("Premium feature", {
        description: "Audience insights requires a premium subscription",
        action: {
          label: "Upgrade",
          onClick: () => navigate("/pricing")
        }
      });
    }
  };
  
  // Handle contact request for creators
  const handleContactCreator = () => {
    if (!isAuthenticated) {
      toast.error("Create an account to contact creators", {
        action: {
          label: "Sign Up",
          onClick: () => navigate("/signup")
        }
      });
      return;
    }
    
    // Check if a conversation with this creator already exists
    const existingConversation = mockConversations.find(conv => 
      conv.participants.some(p => p.name === creator.fullName)
    );
    
    if (existingConversation) {
      // Navigate to existing conversation
      navigate(`/chat/${existingConversation.id}`);
      toast.success(`Continuing conversation with ${creator.fullName}`);
    } else {
      // In a real app, we would create a new conversation here
      // For now, just navigate to chat and show a message
      toast.success(`Starting conversation with ${creator.fullName}`);
      navigate(`/chat`);
    }
  };
  
  // Handle collaboration request
  const handleRequestCollab = () => {
    if (!isAuthenticated) {
      toast.error("Create an account to request collaborations", {
        action: {
          label: "Sign Up",
          onClick: () => navigate("/signup")
        }
      });
      return;
    }
    
    // Check if a conversation with this creator already exists
    const existingConversation = mockConversations.find(conv => 
      conv.participants.some(p => p.name === creator.fullName)
    );
    
    if (existingConversation) {
      // Navigate to existing conversation with pre-filled collab request
      navigate(`/chat/${existingConversation.id}?message=Hi ${creator.fullName}, I'm interested in collaborating with you on a project. Would you be available to discuss details?`);
      toast.success(`Sending collaboration request to ${creator.fullName}`);
    } else {
      // In a real app, we would create a new conversation here
      // For now, just navigate to chat and show a message
      toast.success(`Requesting collaboration with ${creator.fullName}`);
      navigate(`/chat`);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 w-48 bg-muted rounded"></div>
          <div className="h-64 bg-muted rounded-lg"></div>
          <div className="h-32 bg-muted rounded-lg"></div>
        </div>
      </div>
    );
  }

  if (!creator) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Creator not found</h2>
        <Button onClick={() => navigate("/search")}>Back to Search</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Button 
        variant="ghost" 
        size="sm" 
        className="mb-4" 
        onClick={() => navigate(-1)}
      >
        <ChevronLeft className="h-4 w-4 mr-2" />
        Back to Results
      </Button>
      
      {/* Creator Header */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="relative">
              <div className="h-24 w-24 md:h-32 md:w-32 rounded-full overflow-hidden bg-muted">
                <img 
                  src={creator.avatar || "/placeholder.svg"} 
                  alt={creator.username} 
                  className="h-full w-full object-cover"
                />
              </div>
              
              {creator.verified && (
                <div className="absolute bottom-0 right-0 bg-blue-500 text-white p-1 rounded-full">
                  <Badge className="bg-blue-500">Verified</Badge>
                </div>
              )}
            </div>
            
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h1 className="text-3xl font-bold mb-1">{creator.fullName}</h1>
                  <div className="flex items-center text-muted-foreground mb-2">
                    <span className="text-lg">@{creator.username}</span>
                    {creator.location && (
                      <div className="flex items-center ml-4">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span>{creator.location}</span>
                      </div>
                    )}
                  </div>
                </div>
                
                <Button 
                  className="bg-brand-pink hover:bg-brand-pink/90 mt-2 md:mt-0"
                  onClick={handleContactCreator}
                >
                  {isAuthenticated ? "Contact Creator" : (
                    <>
                      <Lock className="h-4 w-4 mr-1" />
                      Contact Creator
                    </>
                  )}
                </Button>
              </div>
              
              <div className="flex flex-wrap gap-2 mt-2">
                {creator.niche.map((niche: string) => (
                  <Badge key={niche} variant="secondary">
                    {niche}
                  </Badge>
                ))}
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                <div className="text-center p-2 bg-muted/30 rounded-lg">
                  <div className="text-2xl font-bold">{(creator.followers / 1000).toFixed(0)}K</div>
                  <div className="text-sm text-muted-foreground">Followers</div>
                </div>
                
                <div className="text-center p-2 bg-muted/30 rounded-lg">
                  <div className="text-2xl font-bold">{(creator.engagementRate * 100).toFixed(2)}%</div>
                  <div className="text-sm text-muted-foreground">Engagement</div>
                </div>
                
                <div className="text-center p-2 bg-muted/30 rounded-lg">
                  <div className="text-2xl font-bold">{creator.postsPerWeek}</div>
                  <div className="text-sm text-muted-foreground">Posts/Week</div>
                </div>
                
                <div className="text-center p-2 bg-muted/30 rounded-lg">
                  <div className="text-2xl font-bold">${creator.estimatedCost}</div>
                  <div className="text-sm text-muted-foreground">Avg. Rate</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Guest user CTA banner */}
          {!isAuthenticated && (
            <div className="mt-6 bg-black/30 border border-white/10 rounded-lg p-4">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center">
                  <Lock className="h-5 w-5 text-brand-pink mr-3" />
                  <div>
                    <h3 className="font-medium">Get full access to this creator's profile</h3>
                    <p className="text-sm text-muted-foreground">Sign up to contact creators, view analytics, and more</p>
                  </div>
                </div>
                <Button 
                  className="sm:w-auto w-full bg-brand-pink hover:bg-brand-pink/90"
                  onClick={() => navigate("/signup")}
                >
                  Create Account
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* Analytics Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-6">
        <TabsList className="w-full justify-start overflow-x-auto">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="audience">Audience</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Creator Bio</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{creator.bio || "No bio available."}</p>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Performance Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Engagement Rate</span>
                    <span className="text-sm font-medium">{(creator.engagementRate * 100).toFixed(2)}%</span>
                  </div>
                  <Progress value={creator.engagementRate * 100} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Consistency</span>
                    <span className="text-sm font-medium">{creator.consistency}%</span>
                  </div>
                  <Progress value={creator.consistency} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Growth Rate</span>
                    <span className="text-sm font-medium">{creator.growthRate}%</span>
                  </div>
                  <Progress value={creator.growthRate} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Content Quality</span>
                    <span className="text-sm font-medium">{creator.contentQuality}/10</span>
                  </div>
                  <Progress value={creator.contentQuality * 10} className="h-2" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Creator Availability</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>Next Available</span>
                    </div>
                    <span className="font-medium">{creator.nextAvailable || "Not specified"}</span>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>Response Time</span>
                    </div>
                    <span className="font-medium">{creator.responseTime || "Not specified"}</span>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <ThumbsUp className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>Collaboration Style</span>
                    </div>
                    <span className="font-medium">{creator.collaborationStyle || "Not specified"}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full"
                  onClick={handleRequestCollab}
                >
                  {isAuthenticated ? "Request Collab" : (
                    <>
                      <Lock className="h-4 w-4 mr-1" />
                      Sign up to Request
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Premium Insights</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button 
                    onClick={handleAdvancedAnalytics} 
                    className="flex items-center justify-center gap-2 h-24"
                  >
                    <div>
                      <TrendingUp className="h-6 w-6 mx-auto mb-2" />
                      <span className="block">Advanced Analytics</span>
                      <span className="text-xs">
                        {!isAuthenticated ? "Sign up required" : "2 credits"}
                      </span>
                    </div>
                  </Button>
                  
                  <Button 
                    onClick={handleAudienceInsights} 
                    className="flex items-center justify-center gap-2 h-24"
                  >
                    <div>
                      <Users className="h-6 w-6 mx-auto mb-2" />
                      <span className="block">Audience Insights</span>
                      <span className="text-xs">
                        {!isAuthenticated ? "Sign up required" : "Premium feature"}
                      </span>
                    </div>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="content" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Content</CardTitle>
              <CardDescription>Sample content from this creator</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {creator.contentSamples ? (
                  creator.contentSamples.map((sample: string, index: number) => (
                    <div key={index} className="aspect-[9/16] bg-muted rounded-md overflow-hidden">
                      <img 
                        src={sample || "/placeholder.svg"} 
                        alt={`Content sample ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))
                ) : (
                  <p className="col-span-3 text-center py-8 text-muted-foreground">
                    No content samples available
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Content Performance</CardTitle>
              <CardDescription>Average engagement metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-muted/30 p-4 rounded-lg text-center">
                  <Heart className="h-5 w-5 mx-auto mb-2 text-red-500" />
                  <span className="block text-lg font-medium">{creator.avgLikes || "N/A"}</span>
                  <span className="text-sm text-muted-foreground">Avg. Likes</span>
                </div>
                
                <div className="bg-muted/30 p-4 rounded-lg text-center">
                  <MessageCircle className="h-5 w-5 mx-auto mb-2 text-blue-500" />
                  <span className="block text-lg font-medium">{creator.avgComments || "N/A"}</span>
                  <span className="text-sm text-muted-foreground">Avg. Comments</span>
                </div>
                
                <div className="bg-muted/30 p-4 rounded-lg text-center">
                  <TrendingUp className="h-5 w-5 mx-auto mb-2 text-green-500" />
                  <span className="block text-lg font-medium">{creator.avgViews || "N/A"}</span>
                  <span className="text-sm text-muted-foreground">Avg. Views</span>
                </div>
                
                <div className="bg-muted/30 p-4 rounded-lg text-center">
                  <Target className="h-5 w-5 mx-auto mb-2 text-purple-500" />
                  <span className="block text-lg font-medium">{(creator.conversionRate * 100).toFixed(2) || "N/A"}%</span>
                  <span className="text-sm text-muted-foreground">Conv. Rate</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Add guest CTA for content tab */}
          {!isAuthenticated && (
            <Card className="bg-gradient-to-r from-brand-pink/30 to-purple-700/30">
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <h3 className="font-semibold text-lg">Unlock detailed content analytics</h3>
                    <p className="text-sm text-muted-foreground">
                      Sign up to view performance metrics, audience demographics, and more
                    </p>
                  </div>
                  <Button onClick={() => navigate("/signup")}>
                    Sign Up for Free
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="analytics" className="mt-6 space-y-6">
          {!isAuthenticated ? (
            <Card className="bg-black/30 border-white/10">
              <CardContent className="p-8 text-center">
                <Lock className="h-12 w-12 text-brand-pink mx-auto mb-4" />
                <h2 className="text-2xl font-bold mb-2">Analytics Locked</h2>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                  Create an account to unlock detailed analytics for this creator, including performance metrics, trends, and strategies.
                </p>
                <Button 
                  className="bg-brand-pink hover:bg-brand-pink/90"
                  onClick={() => navigate("/signup")}
                >
                  Sign Up to Access Analytics
                </Button>
              </CardContent>
            </Card>
          ) : (
            // ... keep existing code (analytics content for logged in users)
            <>
              <Card>
                <CardHeader>
                  <CardTitle>Advanced Analytics</CardTitle>
                  <CardDescription>Detailed performance metrics and trends</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* This would include charts and detailed analytics in a real implementation */}
                  <div className="h-64 bg-muted rounded-lg flex items-center justify-center">
                    <p className="text-muted-foreground">Analytics charts would be displayed here</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="font-medium">Performance Metrics</h3>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Viral Hit Rate</span>
                          <span className="font-medium">{creator.viralHitRate || "12%"}</span>
                        </div>
                        <Progress value={12} className="h-1" />
                        
                        <div className="flex justify-between mt-2">
                          <span>Brand Mention Performance</span>
                          <span className="font-medium">{creator.brandMentionPerformance || "18%"}</span>
                        </div>
                        <Progress value={18} className="h-1" />
                        
                        <div className="flex justify-between mt-2">
                          <span>Call-to-Action Success</span>
                          <span className="font-medium">{creator.ctaSuccess || "8%"}</span>
                        </div>
                        <Progress value={8} className="h-1" />
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="font-medium">Content Strategy</h3>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span>Best Posting Time</span>
                          <span className="font-medium">{creator.bestPostingTime || "7:00 PM - 9:00 PM"}</span>
                        </div>
                        
                        <div className="flex justify-between items-center mt-2">
                          <span>Best Content Format</span>
                          <span className="font-medium">{creator.bestContentFormat || "Tutorial Videos"}</span>
                        </div>
                        
                        <div className="flex justify-between items-center mt-2">
                          <span>Optimal Video Length</span>
                          <span className="font-medium">{creator.optimalVideoLength || "30-45 seconds"}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </TabsContent>
        
        <TabsContent value="audience" className="mt-6 space-y-6">
          {!isAuthenticated ? (
            <Card className="bg-black/30 border-white/10">
              <CardContent className="p-8 text-center">
                <Lock className="h-12 w-12 text-brand-pink mx-auto mb-4" />
                <h2 className="text-2xl font-bold mb-2">Audience Insights Locked</h2>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                  Create an account to access detailed audience demographics, interests, and overlaps for better targeting.
                </p>
                <Button 
                  className="bg-brand-pink hover:bg-brand-pink/90"
                  onClick={() => navigate("/signup")}
                >
                  Sign Up for Premium Insights
                </Button>
              </CardContent>
            </Card>
          ) : (
            // ... keep existing code (audience insights for logged in users)
            <Card>
              <CardHeader>
                <CardTitle>Audience Insights</CardTitle>
                <CardDescription>Premium feature - Detailed audience demographics and interests</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="h-64 bg-muted rounded-lg flex items-center justify-center">
                  <p className="text-muted-foreground">Audience demographics charts would be displayed here</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-medium">Demographics</h3>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Age Range</span>
                        <span className="font-medium">18-24 (68%)</span>
                      </div>
                      <Progress value={68} className="h-1" />
                      
                      <div className="flex justify-between mt-2">
                        <span>Gender</span>
                        <span className="font-medium">Female (72%)</span>
                      </div>
                      <Progress value={72} className="h-1" />
                      
                      <div className="flex justify-between mt-2">
                        <span>Top Locations</span>
                        <span className="font-medium">US, UK, Canada</span>
                      </div>
                      <Progress value={85} className="h-1" />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="font-medium">Interests</h3>
                    
                    <div className="space-y-2">
                      <div className="flex flex-wrap gap-2">
                        {["Fashion", "Beauty", "Fitness", "Technology", "Travel", "Food"].map(interest => (
                          <Badge key={interest}>
                            {interest}
                          </Badge>
                        ))}
                      </div>
                      
                      <h4 className="font-medium mt-4">Related Creators</h4>
                      <div className="space-y-2 mt-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="h-6 w-6 rounded-full bg-muted mr-2"></div>
                            <span>Creator 1</span>
                          </div>
                          <span className="text-sm text-muted-foreground">80% audience overlap</span>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="h-6 w-6 rounded-full bg-muted mr-2"></div>
                            <span>Creator 2</span>
                          </div>
                          <span className="text-sm text-muted-foreground">65% audience overlap</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <p className="text-sm text-muted-foreground">
                  Note: Audience data is approximate and based on platform analytics.
                </p>
              </CardFooter>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Add a global type declaration
declare global {
  interface Window {
    navigateToCreator: (creatorId: string) => void;
  }
}

export default CreatorProfile;
