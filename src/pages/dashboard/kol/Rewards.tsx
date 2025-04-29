
import { useState } from "react";
import { 
  BadgePercent, Star, Gift, ArrowRight, Calendar, 
  CheckCircle, Clock, Trophy, Award 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";

// Mock rewards data
const rewardsData = {
  currentPoints: 1250,
  lifetimePoints: 2450,
  currentTier: "Silver",
  nextTier: "Gold",
  nextTierPoints: 2000,
  rankOnLeaderboard: 23,
  monthlyCompletedChallenges: 3,
  availableChallenges: 2,
  pointsHistory: [
    { id: "p1", activity: "Completed Campaign: Summer Fashion Collection", points: 150, date: "2023-07-05" },
    { id: "p2", activity: "Referral Bonus: Michael Chen", points: 200, date: "2023-06-28" },
    { id: "p3", activity: "Challenge Completed: 5 Day Posting Streak", points: 100, date: "2023-06-22" },
    { id: "p4", activity: "Campaign Engagement Bonus", points: 75, date: "2023-06-15" },
    { id: "p5", activity: "Referral Bonus: Sophia Roberts", points: 200, date: "2023-06-10" },
    { id: "p6", activity: "Challenge Completed: First Viral Post", points: 150, date: "2023-06-05" },
    { id: "p7", activity: "Completed Campaign: Tech Review Series", points: 125, date: "2023-05-28" },
    { id: "p8", activity: "Referral Bonus: James Wilson", points: 200, date: "2023-05-20" },
  ],
  activeChallenges: [
    {
      id: "c1",
      title: "10 Day Posting Streak",
      description: "Create and post content for 10 consecutive days",
      reward: 200,
      progress: 7,
      total: 10,
      deadline: "2023-08-01"
    },
    {
      id: "c2",
      title: "Multi-Platform Publishing",
      description: "Publish campaign content across 3 different platforms",
      reward: 150,
      progress: 2,
      total: 3,
      deadline: "2023-07-25"
    }
  ],
  availableRewards: [
    {
      id: "r1",
      title: "Premium Analytics Access",
      description: "Get 30 days of premium analytics tools access",
      points: 500,
      category: "tool",
      image: "https://ui-avatars.com/api/?name=Analytics&background=5D33F6&color=fff",
      featured: true
    },
    {
      id: "r2",
      title: "Campaign Priority Access",
      description: "Get early access to high-value campaigns for 2 weeks",
      points: 800,
      category: "opportunity",
      image: "https://ui-avatars.com/api/?name=Priority&background=FF8A65&color=fff"
    },
    {
      id: "r3",
      title: "Professional Photo Editing Software",
      description: "3 month subscription to premium editing suite",
      points: 1200,
      category: "tool",
      image: "https://ui-avatars.com/api/?name=Editing&background=3949AB&color=fff"
    },
    {
      id: "r4",
      title: "Content Creator Kit",
      description: "Ring light, microphone, and phone tripod bundle",
      points: 2000,
      category: "gear",
      image: "https://ui-avatars.com/api/?name=Kit&background=00ACC1&color=fff",
      featured: true
    }
  ],
  leaderboard: [
    { rank: 1, name: "Alex Thompson", avatar: "https://ui-avatars.com/api/?name=Alex+Thompson&background=random", points: 4250 },
    { rank: 2, name: "Maria Rodriguez", avatar: "https://ui-avatars.com/api/?name=Maria+Rodriguez&background=random", points: 3890 },
    { rank: 3, name: "David Kim", avatar: "https://ui-avatars.com/api/?name=David+Kim&background=random", points: 3720 },
    { rank: 4, name: "Sarah Johnson", avatar: "https://ui-avatars.com/api/?name=Sarah+Johnson&background=random", points: 3450 },
    { rank: 5, name: "James Wilson", avatar: "https://ui-avatars.com/api/?name=James+Wilson&background=random", points: 3200 },
    { rank: 6, name: "Emma Davis", avatar: "https://ui-avatars.com/api/?name=Emma+Davis&background=random", points: 2950 },
    { rank: 7, name: "Michael Chen", avatar: "https://ui-avatars.com/api/?name=Michael+Chen&background=random", points: 2840 },
    { rank: 8, name: "Olivia Martinez", avatar: "https://ui-avatars.com/api/?name=Olivia+Martinez&background=random", points: 2780 },
    { rank: 9, name: "William Taylor", avatar: "https://ui-avatars.com/api/?name=William+Taylor&background=random", points: 2650 },
    { rank: 10, name: "Sophia Roberts", avatar: "https://ui-avatars.com/api/?name=Sophia+Roberts&background=random", points: 2520 },
    // ... more entries
    { rank: 23, name: "Current User", avatar: "https://ui-avatars.com/api/?name=Current+User&background=F472B6", points: 1250, isCurrentUser: true }
  ]
};

const Rewards = () => {
  const [activeTab, setActiveTab] = useState("overview");
  
  const handleRedeemReward = (reward: any) => {
    if (rewardsData.currentPoints >= reward.points) {
      toast.success(`Reward Redeemed: ${reward.title}`, {
        description: "Your reward has been added to your account.",
      });
    } else {
      toast.error("Not enough points", {
        description: `You need ${reward.points - rewardsData.currentPoints} more points to redeem this reward.`,
      });
    }
  };
  
  const tierProgress = Math.min(
    Math.round((rewardsData.currentPoints / rewardsData.nextTierPoints) * 100),
    100
  );
  
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <BadgePercent className="h-6 w-6 text-brand-pink" />
        <h1 className="text-2xl font-bold tracking-tight">Rewards & Challenges</h1>
      </div>
      
      <Tabs defaultValue="overview" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="challenges">Challenges</TabsTrigger>
          <TabsTrigger value="rewards">Rewards</TabsTrigger>
          <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6 mt-6">
          {/* Points overview */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Current Points
                </CardTitle>
                <Star className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{rewardsData.currentPoints}</div>
                <p className="text-xs text-muted-foreground">
                  Available to redeem
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Current Tier
                </CardTitle>
                <Trophy className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{rewardsData.currentTier}</div>
                <p className="text-xs text-muted-foreground">
                  {rewardsData.nextTierPoints - rewardsData.currentPoints} points to {rewardsData.nextTier}
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Lifetime Points
                </CardTitle>
                <Award className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{rewardsData.lifetimePoints}</div>
                <p className="text-xs text-muted-foreground">
                  Total points earned
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Creator Rank
                </CardTitle>
                <Star className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">#{rewardsData.rankOnLeaderboard}</div>
                <p className="text-xs text-muted-foreground">
                  On global leaderboard
                </p>
              </CardContent>
            </Card>
          </div>
          
          {/* Tier progress */}
          <Card>
            <CardHeader>
              <CardTitle>Current Progress</CardTitle>
              <CardDescription>
                Track your journey to the next tier
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Progress to {rewardsData.nextTier}</span>
                    <span className="text-sm font-medium">
                      {rewardsData.currentPoints} / {rewardsData.nextTierPoints} points
                    </span>
                  </div>
                  <Progress value={tierProgress} className="h-2" />
                </div>
                
                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div>
                    <h3 className="text-sm font-medium mb-2">Active Challenges</h3>
                    <div className="space-y-2">
                      {rewardsData.activeChallenges.map((challenge) => (
                        <div key={challenge.id} className="flex items-center justify-between">
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 text-brand-pink mr-2" />
                            <span className="text-sm">{challenge.title}</span>
                          </div>
                          <span className="text-sm font-medium">+{challenge.reward}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium mb-2">Featured Rewards</h3>
                    <div className="space-y-2">
                      {rewardsData.availableRewards
                        .filter(reward => reward.featured)
                        .map((reward) => (
                          <div key={reward.id} className="flex items-center justify-between">
                            <div className="flex items-center">
                              <Gift className="h-4 w-4 text-brand-pink mr-2" />
                              <span className="text-sm">{reward.title}</span>
                            </div>
                            <span className="text-sm font-medium">{reward.points} pts</span>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Recent activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Point Activity</CardTitle>
              <CardDescription>
                Your recent point earnings and redemptions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-60">
                <div className="space-y-4">
                  {rewardsData.pointsHistory.map((item) => (
                    <div key={item.id} className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-gray-800">
                      <div>
                        <p className="text-sm font-medium">{item.activity}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(item.date).toLocaleDateString()}
                        </p>
                      </div>
                      <Badge className="bg-brand-pink">+{item.points}</Badge>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="challenges" className="space-y-6 mt-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Active Challenges</h2>
            <Badge variant="outline">{rewardsData.activeChallenges.length} In Progress</Badge>
          </div>
          
          <div className="grid gap-4 md:grid-cols-2">
            {rewardsData.activeChallenges.map((challenge) => (
              <Card key={challenge.id}>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Trophy className="h-5 w-5 text-brand-pink mr-2" />
                    {challenge.title}
                  </CardTitle>
                  <CardDescription>{challenge.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Progress</span>
                        <span className="text-sm font-medium">
                          {challenge.progress}/{challenge.total}
                        </span>
                      </div>
                      <Progress value={(challenge.progress / challenge.total) * 100} className="h-2" />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          Deadline: {new Date(challenge.deadline).toLocaleDateString()}
                        </span>
                      </div>
                      <Badge variant="secondary">+{challenge.reward} pts</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            {/* Available challenges placeholder */}
            <Card className="border-dashed">
              <CardHeader>
                <CardTitle className="text-muted-foreground">More Challenges Available</CardTitle>
                <CardDescription>
                  {rewardsData.availableChallenges} new challenges are available for you to start
                </CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center py-6">
                <Button>
                  <ArrowRight className="h-4 w-4 mr-2" />
                  Browse Challenges
                </Button>
              </CardContent>
            </Card>
          </div>
          
          {/* Challenge history */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Challenge History</h2>
            <Card>
              <CardHeader>
                <CardTitle>Completed Challenges</CardTitle>
                <CardDescription>
                  You've completed {rewardsData.monthlyCompletedChallenges} challenges this month
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b">
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                      <div>
                        <p className="font-medium">5 Day Posting Streak</p>
                        <p className="text-xs text-muted-foreground">Completed on Jul 10, 2023</p>
                      </div>
                    </div>
                    <Badge>+100 pts</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between pb-3 border-b">
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                      <div>
                        <p className="font-medium">First Viral Post</p>
                        <p className="text-xs text-muted-foreground">Completed on Jun 28, 2023</p>
                      </div>
                    </div>
                    <Badge>+150 pts</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between pb-3">
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                      <div>
                        <p className="font-medium">Multi-Platform Campaign</p>
                        <p className="text-xs text-muted-foreground">Completed on Jun 15, 2023</p>
                      </div>
                    </div>
                    <Badge>+125 pts</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="rewards" className="mt-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {rewardsData.availableRewards.map((reward) => (
              <Card key={reward.id} className={reward.featured ? "border-brand-pink" : ""}>
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start mb-2">
                    <div className="w-12 h-12 rounded-lg overflow-hidden">
                      <img 
                        src={reward.image} 
                        alt={reward.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {reward.featured && (
                      <Badge className="bg-brand-pink">Featured</Badge>
                    )}
                  </div>
                  <CardTitle className="text-lg">{reward.title}</CardTitle>
                  <CardDescription className="h-12">{reward.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Badge variant="outline" className="mb-4 capitalize">{reward.category}</Badge>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Star className="h-5 w-5 text-brand-pink mr-1" />
                      <span className="text-lg font-bold">{reward.points}</span>
                    </div>
                    <Button 
                      size="sm" 
                      disabled={rewardsData.currentPoints < reward.points}
                      onClick={() => handleRedeemReward(reward)}
                    >
                      Redeem
                    </Button>
                  </div>
                  {rewardsData.currentPoints < reward.points && (
                    <p className="text-xs text-muted-foreground mt-2">
                      You need {reward.points - rewardsData.currentPoints} more points
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Past redemptions */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Redemption History</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center py-6 text-muted-foreground">
                You haven't redeemed any rewards yet. Start earning points to unlock exclusive rewards!
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="leaderboard" className="mt-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Global Creator Leaderboard</h2>
            <div className="flex items-center">
              <Badge variant="outline" className="bg-brand-pink/10 text-brand-pink">
                Your rank: #{rewardsData.rankOnLeaderboard}
              </Badge>
            </div>
          </div>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Top Creators</CardTitle>
              <CardDescription>
                Based on total reward points earned
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {rewardsData.leaderboard.map((creator) => (
                  <div 
                    key={creator.rank} 
                    className={`flex items-center justify-between py-2 px-3 rounded-md ${
                      creator.isCurrentUser ? 'bg-brand-pink/10' : creator.rank <= 3 ? 'bg-secondary/50' : ''
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`flex items-center justify-center w-7 h-7 rounded-full 
                        ${creator.rank === 1 ? 'bg-yellow-500' : 
                          creator.rank === 2 ? 'bg-gray-400' : 
                          creator.rank === 3 ? 'bg-amber-700' : 'bg-secondary'} 
                        text-white font-bold text-sm`}
                      >
                        {creator.rank}
                      </div>
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={creator.avatar} alt={creator.name} />
                        <AvatarFallback>{creator.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-sm">{creator.name}</p>
                        {creator.isCurrentUser && (
                          <p className="text-xs text-brand-pink">You</p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-brand-pink mr-1" />
                      <span className="font-bold">{creator.points.toLocaleString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-center border-t pt-4">
              <Button variant="outline" size="sm">
                View Full Leaderboard
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Rewards;
