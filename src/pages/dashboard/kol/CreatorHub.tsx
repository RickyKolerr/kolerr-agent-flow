
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Link as LinkIcon, 
  Copy, 
  Star, 
  Users, 
  Gift, 
  Award, 
  Share2, 
  RefreshCw, 
  CheckCircle2,
  BarChart3
} from "lucide-react";
import { toast } from "sonner";

const CreatorHub = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>("referrals");
  
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const tabParam = searchParams.get('tab');
    if (tabParam && ["referrals", "rewards", "community"].includes(tabParam)) {
      setActiveTab(tabParam);
    }
  }, [location]);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    navigate(`/dashboard/kol/creator-hub?tab=${value}`);
  };

  const copyReferralLink = () => {
    navigator.clipboard.writeText("https://kolerr.com/ref/creator123");
    toast.success("Referral link copied to clipboard!");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
        <h1 className="text-3xl font-bold tracking-tight">Creator Hub</h1>
        <Button className="bg-brand-pink hover:bg-brand-pink/90">
          <Award className="mr-2 h-4 w-4" /> Upgrade to Pro
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-6">
        <TabsList className="grid grid-cols-3 max-w-md">
          <TabsTrigger value="referrals" className="flex items-center gap-2">
            <LinkIcon className="h-4 w-4" />
            <span className="hidden sm:inline">Referrals</span>
            <span className="sm:hidden">Refer</span>
          </TabsTrigger>
          <TabsTrigger value="rewards" className="flex items-center gap-2">
            <Star className="h-4 w-4" />
            <span className="hidden sm:inline">Rewards</span>
            <span className="sm:hidden">Points</span>
          </TabsTrigger>
          <TabsTrigger value="community" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span className="hidden sm:inline">Community</span>
            <span className="sm:hidden">Connect</span>
          </TabsTrigger>
        </TabsList>

        {/* Referrals Tab */}
        <TabsContent value="referrals" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Share2 className="h-5 w-5 mr-2 text-brand-pink" />
                  Your Referral Link
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input 
                    value="https://kolerr.com/ref/creator123" 
                    readOnly 
                    className="flex-1"
                  />
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={copyReferralLink}
                    title="Copy referral link"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    Share this link with other creators. You'll earn rewards for every sign up.
                  </p>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <LinkIcon className="h-4 w-4 mr-1" /> Copy Link
                    </Button>
                    <Button size="sm" variant="outline">
                      Share
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <RefreshCw className="h-5 w-5 mr-2 text-brand-pink" />
                  Referral Stats
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Total Referred</p>
                    <p className="text-2xl font-bold">12</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Points Earned</p>
                    <p className="text-2xl font-bold">1,200</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Conversion Rate</p>
                    <p className="text-2xl font-bold">38%</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Active Creators</p>
                    <p className="text-2xl font-bold">8</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CheckCircle2 className="h-5 w-5 mr-2 text-brand-pink" />
                  How It Works
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="space-y-3">
                  <li className="flex items-start gap-2">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border bg-background">
                      <span className="text-xs">1</span>
                    </div>
                    <p className="text-sm">Share your unique referral link with other creators</p>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border bg-background">
                      <span className="text-xs">2</span>
                    </div>
                    <p className="text-sm">They sign up using your link and complete onboarding</p>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border bg-background">
                      <span className="text-xs">3</span>
                    </div>
                    <p className="text-sm">You earn 100 points per successful referral</p>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border bg-background">
                      <span className="text-xs">4</span>
                    </div>
                    <p className="text-sm">Redeem points for rewards and perks</p>
                  </li>
                </ol>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Recent Referrals</CardTitle>
              <CardDescription>Track the status of your referred creators</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="grid grid-cols-4 p-3 text-sm font-medium">
                  <div>Creator</div>
                  <div>Date</div>
                  <div>Status</div>
                  <div>Points</div>
                </div>
                <div className="divide-y divide-border">
                  {[
                    { name: "Alex Kim", date: "May 2, 2025", status: "Active", points: "100" },
                    { name: "Jamie Lee", date: "Apr 28, 2025", status: "Pending", points: "0" },
                    { name: "Taylor Wong", date: "Apr 15, 2025", status: "Active", points: "100" },
                    { name: "Casey Jordan", date: "Apr 10, 2025", status: "Active", points: "100" },
                    { name: "Morgan Smith", date: "Mar 25, 2025", status: "Inactive", points: "50" },
                  ].map((referral, i) => (
                    <div key={i} className="grid grid-cols-4 p-3 text-sm">
                      <div>{referral.name}</div>
                      <div className="text-muted-foreground">{referral.date}</div>
                      <div>
                        <Badge
                          variant="outline"
                          className={
                            referral.status === "Active"
                              ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                              : referral.status === "Pending"
                              ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                              : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                          }
                        >
                          {referral.status}
                        </Badge>
                      </div>
                      <div>{referral.points}</div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Rewards Tab */}
        <TabsContent value="rewards" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center">
                  <Star className="h-5 w-5 mr-2 text-brand-pink" />
                  Your Reward Points
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-center space-y-2 py-4">
                  <div className="text-4xl font-bold">1,250</div>
                  <p className="text-muted-foreground">Available points</p>
                </div>
                <div className="flex justify-center pt-4">
                  <Button className="bg-brand-pink hover:bg-brand-pink/90">Redeem Rewards</Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2 text-brand-pink" />
                  Points Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span>This Month</span>
                    <span className="font-medium">+350 points</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Last Month</span>
                    <span className="font-medium">+420 points</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Total Earned</span>
                    <span className="font-medium">2,450 points</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Total Redeemed</span>
                    <span className="font-medium">1,200 points</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center">
                  <Award className="h-5 w-5 mr-2 text-brand-pink" />
                  Creator Level
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-center space-y-2 py-4">
                  <Badge className="px-3 py-1 text-base bg-gradient-to-r from-brand-magenta to-brand-purple text-white">Silver</Badge>
                  <p className="text-sm text-muted-foreground">5,000 points to Gold</p>
                  <div className="w-full bg-secondary rounded-full h-2 mt-2">
                    <div className="bg-brand-pink h-2 rounded-full" style={{ width: '25%' }}></div>
                  </div>
                  <p className="text-xs text-muted-foreground">1,250 / 5,000</p>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Available Rewards</CardTitle>
              <CardDescription>Redeem your points for these exclusive creator perks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  {
                    title: "Featured Creator Spotlight",
                    points: 1000,
                    description: "Get featured on our homepage and social media channels"
                  },
                  {
                    title: "Premium Analytics (1 Month)",
                    points: 800,
                    description: "Access advanced performance metrics and audience insights"
                  },
                  {
                    title: "Early Campaign Access",
                    points: 500,
                    description: "Get 24-hour head start on new brand campaigns"
                  },
                  {
                    title: "Professional Photo Editing",
                    points: 750,
                    description: "5 professional photo edits from our design team"
                  },
                  {
                    title: "Creator Workshop Pass",
                    points: 1500,
                    description: "Attend our exclusive online creator workshop"
                  },
                  {
                    title: "Brand Match Priority",
                    points: 600,
                    description: "Get prioritized in our brand matching algorithm for 30 days"
                  },
                ].map((reward, i) => (
                  <Card key={i} className="overflow-hidden border border-border">
                    <div className="bg-gradient-to-r from-brand-magenta/10 to-brand-purple/10 p-4">
                      <div className="flex justify-between items-start">
                        <h3 className="font-medium">{reward.title}</h3>
                        <Badge variant="secondary">{reward.points} points</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">{reward.description}</p>
                    </div>
                    <div className="p-3 flex justify-end bg-muted/50">
                      <Button 
                        size="sm"
                        disabled={1250 < reward.points}
                      >
                        {1250 >= reward.points ? "Redeem" : "Not Enough Points"}
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Points History</CardTitle>
              <CardDescription>Your recent points transactions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="grid grid-cols-4 p-3 text-sm font-medium">
                  <div>Activity</div>
                  <div>Date</div>
                  <div>Type</div>
                  <div>Points</div>
                </div>
                <div className="divide-y divide-border">
                  {[
                    { activity: "Referral: Casey J.", date: "May 6, 2025", type: "Earned", points: "+100" },
                    { activity: "Monthly Creator Challenge", date: "May 3, 2025", type: "Earned", points: "+250" },
                    { activity: "Premium Analytics", date: "Apr 22, 2025", type: "Redeemed", points: "-800" },
                    { activity: "Campaign Completion", date: "Apr 18, 2025", type: "Earned", points: "+300" },
                    { activity: "Referral: Taylor W.", date: "Apr 15, 2025", type: "Earned", points: "+100" },
                  ].map((transaction, i) => (
                    <div key={i} className="grid grid-cols-4 p-3 text-sm">
                      <div>{transaction.activity}</div>
                      <div className="text-muted-foreground">{transaction.date}</div>
                      <div>
                        <Badge
                          variant="outline"
                          className={
                            transaction.type === "Earned"
                              ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                              : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                          }
                        >
                          {transaction.type}
                        </Badge>
                      </div>
                      <div className={transaction.type === "Earned" ? "text-green-600" : "text-red-600"}>
                        {transaction.points}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Community Tab */}
        <TabsContent value="community" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="h-5 w-5 mr-2 text-brand-pink" />
                  Creator Community
                </CardTitle>
                <CardDescription>Connect with other creators</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-muted p-4 rounded-md text-center">
                  <p className="text-sm">Join our exclusive creator community to collaborate, learn, and grow together.</p>
                  <Button className="mt-4 bg-brand-pink hover:bg-brand-pink/90">Join Discord Server</Button>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Active Members</span>
                  <span className="font-medium">2,487</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Daily Messages</span>
                  <span className="font-medium">740+</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Events</CardTitle>
                <CardDescription>Creator community events</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  {
                    title: "Content Creation Masterclass",
                    date: "May 15, 2025",
                    time: "2:00 PM EST",
                    attendees: 156
                  },
                  {
                    title: "Brand Partnership Q&A",
                    date: "May 22, 2025",
                    time: "1:00 PM EST",
                    attendees: 89
                  },
                  {
                    title: "Platform Algorithm Updates",
                    date: "June 1, 2025",
                    time: "11:00 AM EST",
                    attendees: 204
                  }
                ].map((event, i) => (
                  <div key={i} className="bg-muted/50 p-3 rounded-md">
                    <h4 className="font-medium">{event.title}</h4>
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>{event.date} • {event.time}</span>
                      <span>{event.attendees} attending</span>
                    </div>
                    <Button size="sm" variant="outline" className="mt-2 w-full text-xs">
                      RSVP
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Creator Resources</CardTitle>
                <CardDescription>Tools and guides to help you succeed</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    "Content Creation Guide",
                    "Negotiation Tactics for Creators",
                    "Algorithm Optimization Tips",
                    "Tax Guidelines for Influencers",
                    "Building Your Personal Brand",
                    "Metrics That Matter to Brands"
                  ].map((resource, i) => (
                    <div key={i} className="flex items-center justify-between p-2 hover:bg-muted rounded-md">
                      <span className="text-sm">{resource}</span>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <LinkIcon className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Creator Spotlights</CardTitle>
              <CardDescription>Learn from successful creators in our community</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    name: "Jordan Lee",
                    handle: "@jordanlee",
                    niche: "Travel & Lifestyle",
                    quote: "Consistency and authenticity were key to my growth. Focus on building genuine connections with your audience."
                  },
                  {
                    name: "Mia Wong",
                    handle: "@miawongcreates",
                    niche: "Beauty & Fashion",
                    quote: "Don't chase trends, set them. I found success by developing my unique style and aesthetic."
                  },
                  {
                    name: "Ethan Rivera",
                    handle: "@ethanrtalk",
                    niche: "Tech Reviews",
                    quote: "Technical expertise combined with storytelling helps my content stand out in a crowded niche."
                  }
                ].map((creator, i) => (
                  <Card key={i} className="bg-muted/50 border-none">
                    <CardContent className="pt-6">
                      <div className="text-center mb-4">
                        <div className="h-16 w-16 mx-auto rounded-full bg-gradient-to-r from-brand-magenta to-brand-purple flex items-center justify-center text-white text-xl font-bold">
                          {creator.name.split(" ").map(n => n[0]).join("")}
                        </div>
                        <h3 className="font-medium mt-2">{creator.name}</h3>
                        <p className="text-sm text-muted-foreground">{creator.handle}</p>
                        <Badge variant="outline" className="mt-1">{creator.niche}</Badge>
                      </div>
                      <div className="bg-background p-3 rounded-md">
                        <p className="text-sm italic">"{creator.quote}"</p>
                      </div>
                      <div className="mt-3 text-center">
                        <Button variant="link" className="text-brand-pink p-0">
                          View Full Interview
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Collaboration Board</CardTitle>
              <CardDescription>Find other creators for collabs and projects</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-end">
                  <Button>
                    <Gift className="mr-2 h-4 w-4" />
                    Post Opportunity
                  </Button>
                </div>
                
                <div className="rounded-md border">
                  <div className="grid grid-cols-5 p-3 text-sm font-medium">
                    <div className="col-span-2">Opportunity</div>
                    <div>Posted By</div>
                    <div>Category</div>
                    <div>Posted</div>
                  </div>
                  <div className="divide-y divide-border">
                    {[
                      {
                        title: "Looking for fitness creator for joint workout series",
                        author: "FitWithAlex",
                        category: "Fitness",
                        date: "2 days ago"
                      },
                      {
                        title: "Tech unboxing collab for new smartphone launch",
                        author: "TechReviewer",
                        category: "Technology",
                        date: "3 days ago"
                      },
                      {
                        title: "Food blogger needed for restaurant opening",
                        author: "ChefMaria",
                        category: "Food",
                        date: "5 days ago"
                      },
                      {
                        title: "Beauty product review series",
                        author: "GlamByJen",
                        category: "Beauty",
                        date: "1 week ago"
                      },
                      {
                        title: "Travel vlog collab in Southeast Asia",
                        author: "WanderlustMike",
                        category: "Travel",
                        date: "1 week ago"
                      }
                    ].map((opportunity, i) => (
                      <div key={i} className="grid grid-cols-5 p-3 text-sm">
                        <div className="col-span-2 font-medium">{opportunity.title}</div>
                        <div>{opportunity.author}</div>
                        <div>
                          <Badge variant="outline">{opportunity.category}</Badge>
                        </div>
                        <div className="text-muted-foreground">{opportunity.date}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CreatorHub;
