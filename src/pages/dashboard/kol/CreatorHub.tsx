import { useState, useEffect } from "react";
import { Award, Link as LinkIcon, Users, BadgeDollarSign, Gift, Copy, Check, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useUserAccess } from "@/hooks/useUserAccess";
import { Navigate, useSearchParams } from "react-router-dom";

// Combined Creator Hub component that integrates Referrals, Rewards, and Community
const CreatorHub = () => {
  const { user } = useUserAccess();
  const [searchParams] = useSearchParams();
  const tabFromUrl = searchParams.get('tab');
  const [activeTab, setActiveTab] = useState(tabFromUrl || "referrals");
  const [copied, setCopied] = useState(false);

  // Update active tab when URL parameters change
  useEffect(() => {
    if (tabFromUrl && ["referrals", "rewards", "community"].includes(tabFromUrl)) {
      setActiveTab(tabFromUrl);
    }
  }, [tabFromUrl]);

  // Redirect if not a KOL user
  if (user?.role !== "kol" && user?.role !== "admin") {
    return <Navigate to="/dashboard" />;
  }

  // Mock data (combined from previous separate components)
  const referralData = {
    referralCode: "CREATOR123",
    referralLink: "https://kolerr.app/join/CREATOR123",
    pointsPerReferral: 200,
    totalPoints: 1200,
    pendingPoints: 200,
    totalReferrals: 6,
    pendingReferrals: 1,
    activeReferrals: 5,
  };

  // Mock rewards data
  const rewardsData = {
    currentPoints: 1200,
    currentTier: "Silver",
    nextTier: "Gold",
    pointsToNextTier: 800,
    activeChallenges: [
      {
        id: "1",
        title: "Complete 3 campaigns",
        description: "Successfully complete 3 brand campaigns this month",
        progress: 66,
        current: 2,
        target: 3,
        reward: 150,
        deadline: "2023-08-30"
      },
      {
        id: "2",
        title: "Maintain 98% on-time delivery",
        description: "Keep your on-time content delivery rate above 98%",
        progress: 100,
        current: 100,
        target: 98,
        reward: 100,
        deadline: "2023-08-30"
      }
    ],
    completedChallenges: 5,
    availableRewards: [
      {
        id: "1",
        title: "Premium Brand Exposure",
        description: "Featured placement in brand searches for 2 weeks",
        pointsCost: 500,
        imageUrl: "https://ui-avatars.com/api/?name=Brand+Exposure"
      },
      {
        id: "2",
        title: "Campaign Priority Access",
        description: "Early access to upcoming campaigns for 1 month",
        pointsCost: 800,
        imageUrl: "https://ui-avatars.com/api/?name=Priority+Access"
      },
      {
        id: "3",
        title: "Professional Photoshoot",
        description: "1-hour professional photo session",
        pointsCost: 1500,
        imageUrl: "https://ui-avatars.com/api/?name=Photo+Shoot"
      }
    ]
  };

  // Mock creators data
  const topCreators = [
    {
      id: "c1",
      name: "Alex Thompson",
      username: "@alexcreates",
      avatar: "https://ui-avatars.com/api/?name=Alex+Thompson&background=random",
      followers: 245000,
      niche: ["fashion", "lifestyle"],
      connected: false
    },
    {
      id: "c2",
      name: "Maria Rodriguez",
      username: "@mariarodriguezbeauty",
      avatar: "https://ui-avatars.com/api/?name=Maria+Rodriguez&background=random",
      followers: 189000, 
      niche: ["beauty", "skincare"],
      connected: true
    },
    {
      id: "c3",
      name: "David Kim",
      username: "@davidgaming",
      avatar: "https://ui-avatars.com/api/?name=David+Kim&background=random",
      followers: 320000,
      niche: ["gaming", "tech"],
      connected: false
    }
  ];

  const topGroups = [
    {
      id: "g1",
      name: "Fashion & Beauty Creators",
      description: "A group for fashion and beauty creators to collaborate",
      members: 24,
      category: "fashion",
      recentActivity: "15 min ago"
    },
    {
      id: "g2",
      name: "Travel Content Collective",
      description: "Connect with fellow travel content creators",
      members: 18,
      category: "travel",
      recentActivity: "2 hours ago"
    }
  ];

  // Event handlers
  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralData.referralLink);
    setCopied(true);
    toast.success("Referral link copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };
  
  const handleConnectCreator = (creator: any) => {
    toast.success(`Connection request sent to ${creator.name}`, {
      description: "You'll be notified when they respond."
    });
  };
  
  const handleJoinGroup = (group: any) => {
    toast.success(`Joined ${group.name}`, {
      description: "You can now participate in group discussions."
    });
  };

  const handleRedeemReward = (reward: any) => {
    toast.success(`Reward requested: ${reward.title}`, {
      description: "We'll process your request shortly."
    });
  };
  
  // Calculate progress percentage for next tier
  const tierProgress = Math.min(Math.round((rewardsData.currentPoints / (rewardsData.currentPoints + rewardsData.pointsToNextTier)) * 100), 100);
  
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Award className="h-6 w-6 text-brand-pink" />
        <h1 className="text-2xl font-bold tracking-tight">Creator Hub</h1>
      </div>
      
      <Tabs value={activeTab} className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="referrals">Referrals</TabsTrigger>
          <TabsTrigger value="rewards">Rewards & Challenges</TabsTrigger>
          <TabsTrigger value="community">Community</TabsTrigger>
        </TabsList>
        
        {/* REFERRALS TAB */}
        <TabsContent value="referrals" className="space-y-6 mt-6">
          {/* Referral stats summary */}
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Points
                </CardTitle>
                <BadgeDollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{referralData.totalPoints}</div>
                <p className="text-xs text-muted-foreground">
                  {referralData.pendingPoints} points pending
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Current Tier
                </CardTitle>
                <Award className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{rewardsData.currentTier}</div>
                <p className="text-xs text-muted-foreground">
                  {rewardsData.pointsToNextTier} points to {rewardsData.nextTier}
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Referrals
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{referralData.totalReferrals}</div>
                <p className="text-xs text-muted-foreground">
                  {referralData.activeReferrals} active, {referralData.pendingReferrals} pending
                </p>
              </CardContent>
            </Card>
          </div>
          
          {/* Referral link */}
          <Card>
            <CardHeader>
              <CardTitle>Your Referral Link</CardTitle>
              <CardDescription>
                Share this link with other creators to earn {referralData.pointsPerReferral} points for each signup
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                <Input
                  value={referralData.referralLink}
                  readOnly
                  className="flex-1"
                />
                <Button 
                  onClick={copyToClipboard}
                  className="flex items-center gap-2"
                >
                  {copied ? (
                    <>
                      <Check className="h-4 w-4" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4" />
                      Copy Link
                    </>
                  )}
                </Button>
                <Button variant="outline">
                  <UserPlus className="h-4 w-4 mr-2" />
                  Invite
                </Button>
              </div>
              
              <div className="mt-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Progress to {rewardsData.nextTier}</span>
                  <span className="text-sm font-medium">{tierProgress}%</span>
                </div>
                <Progress value={tierProgress} className="h-2" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* REWARDS TAB */}
        <TabsContent value="rewards" className="space-y-6 mt-6">
          {/* Active Challenges */}
          <Card>
            <CardHeader>
              <CardTitle>Active Challenges</CardTitle>
              <CardDescription>
                Complete challenges to earn reward points
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {rewardsData.activeChallenges.map(challenge => (
                  <div key={challenge.id} className="border rounded-lg p-4">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div>
                        <h3 className="font-medium">{challenge.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          {challenge.description}
                        </p>
                      </div>
                      <div className="mt-2 md:mt-0 md:ml-4 md:text-right">
                        <p className="font-medium text-brand-pink">+{challenge.reward} points</p>
                        <p className="text-xs">
                          Ends {new Date(challenge.deadline).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="mt-4">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm">Progress</span>
                        <span className="text-sm font-medium">
                          {challenge.current}/{challenge.target}
                        </span>
                      </div>
                      <Progress value={challenge.progress} className="h-2" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <p className="text-sm text-muted-foreground">
                You've completed {rewardsData.completedChallenges} challenges this month
              </p>
            </CardFooter>
          </Card>
          
          {/* Available Rewards */}
          <Card>
            <CardHeader>
              <CardTitle>Available Rewards</CardTitle>
              <CardDescription>
                Redeem your points for exclusive rewards
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {rewardsData.availableRewards.map(reward => (
                  <Card key={reward.id} className="overflow-hidden">
                    <div className="aspect-video bg-muted">
                      <img 
                        src={reward.imageUrl} 
                        alt={reward.title}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <CardHeader className="p-4">
                      <CardTitle className="text-base">{reward.title}</CardTitle>
                      <CardDescription className="text-xs">
                        {reward.description}
                      </CardDescription>
                    </CardHeader>
                    <CardFooter className="flex items-center justify-between p-4 pt-0">
                      <p className="font-medium">{reward.pointsCost} points</p>
                      <Button 
                        size="sm" 
                        onClick={() => handleRedeemReward(reward)}
                        disabled={rewardsData.currentPoints < reward.pointsCost}
                      >
                        Redeem
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* COMMUNITY TAB */}
        <TabsContent value="community" className="space-y-6 mt-6">
          {/* Top Creators */}
          <Card>
            <CardHeader>
              <CardTitle>Top Creators to Connect With</CardTitle>
              <CardDescription>
                Build your network by connecting with other successful creators
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topCreators.map(creator => (
                  <div key={creator.id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarImage src={creator.avatar} alt={creator.name} />
                        <AvatarFallback>{creator.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{creator.name}</p>
                        <p className="text-sm text-muted-foreground">{creator.username}</p>
                        <div className="flex gap-2 mt-1">
                          {creator.niche.map(tag => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    <Button 
                      variant={creator.connected ? "outline" : "default"}
                      size="sm"
                      onClick={() => handleConnectCreator(creator)}
                      disabled={creator.connected}
                    >
                      {creator.connected ? "Connected" : "Connect"}
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          {/* Collaboration Groups */}
          <Card>
            <CardHeader>
              <CardTitle>Popular Collaboration Groups</CardTitle>
              <CardDescription>
                Join creator groups to collaborate on projects
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                {topGroups.map(group => (
                  <Card key={group.id} className="overflow-hidden">
                    <CardHeader>
                      <CardTitle className="text-base">{group.name}</CardTitle>
                      <CardDescription className="text-xs">
                        {group.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between text-sm">
                        <span>{group.members} members</span>
                        <span className="text-muted-foreground">
                          Active {group.recentActivity}
                        </span>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        size="sm" 
                        className="w-full"
                        onClick={() => handleJoinGroup(group)}
                      >
                        Join Group
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Explore All Groups
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CreatorHub;
