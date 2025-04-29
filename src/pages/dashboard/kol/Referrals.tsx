
import { useState } from "react";
import { Link, UserPlus, Copy, Check, Users, BadgeDollarSign, Award, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";

// Mock referral data
const referralData = {
  referralCode: "CREATOR123",
  referralLink: "https://kolerr.app/join/CREATOR123",
  pointsPerReferral: 200,
  totalPoints: 1200,
  pendingPoints: 200,
  totalReferrals: 6,
  pendingReferrals: 1,
  activeReferrals: 5,
  nextTier: {
    name: "Gold",
    pointsNeeded: 2000,
    progress: 60
  },
  referrals: [
    {
      id: "ref1",
      name: "Emily Johnson",
      avatar: "https://ui-avatars.com/api/?name=Emily+Johnson&background=random",
      joinDate: "2023-06-10",
      status: "active",
      points: 200,
      hasEarnedYou: 200
    },
    {
      id: "ref2",
      name: "Michael Chen",
      avatar: "https://ui-avatars.com/api/?name=Michael+Chen&background=random",
      joinDate: "2023-06-15",
      status: "active",
      points: 450,
      hasEarnedYou: 200
    },
    {
      id: "ref3",
      name: "Sophia Roberts",
      avatar: "https://ui-avatars.com/api/?name=Sophia+Roberts&background=random",
      joinDate: "2023-06-22",
      status: "active",
      points: 320,
      hasEarnedYou: 200
    },
    {
      id: "ref4",
      name: "James Wilson",
      avatar: "https://ui-avatars.com/api/?name=James+Wilson&background=random",
      joinDate: "2023-06-28",
      status: "active",
      points: 180,
      hasEarnedYou: 200
    },
    {
      id: "ref5",
      name: "Olivia Garcia",
      avatar: "https://ui-avatars.com/api/?name=Olivia+Garcia&background=random",
      joinDate: "2023-07-05",
      status: "active",
      points: 290,
      hasEarnedYou: 200
    },
    {
      id: "ref6",
      name: "Noah Williams",
      avatar: "https://ui-avatars.com/api/?name=Noah+Williams&background=random",
      joinDate: "2023-07-12",
      status: "pending",
      points: 0,
      hasEarnedYou: 0
    }
  ]
};

// Mock rewards data
const rewardTiers = [
  {
    name: "Bronze",
    pointsRequired: 0,
    benefits: [
      "Access to basic campaigns",
      "Standard referral points"
    ]
  },
  {
    name: "Silver",
    pointsRequired: 1000,
    benefits: [
      "Early access to campaigns",
      "+10% campaign payouts",
      "Priority support"
    ]
  },
  {
    name: "Gold",
    pointsRequired: 2000,
    benefits: [
      "VIP campaign access",
      "+15% campaign payouts",
      "Featured creator placement",
      "Exclusive community events"
    ]
  },
  {
    name: "Platinum",
    pointsRequired: 5000,
    benefits: [
      "Elite campaign opportunities",
      "+20% campaign payouts",
      "Direct brand relationship manager",
      "Early platform feature access",
      "Custom creator merchandise"
    ]
  }
];

const Referrals = () => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralData.referralLink);
    setCopied(true);
    toast.success("Referral link copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };
  
  const getCurrentTier = () => {
    let currentTier = rewardTiers[0];
    for (let tier of rewardTiers) {
      if (referralData.totalPoints >= tier.pointsRequired) {
        currentTier = tier;
      } else {
        break;
      }
    }
    return currentTier;
  };
  
  const currentTier = getCurrentTier();
  
  // Find next tier (if any)
  const getNextTier = () => {
    const currentTierIndex = rewardTiers.findIndex(tier => tier.name === currentTier.name);
    if (currentTierIndex < rewardTiers.length - 1) {
      return rewardTiers[currentTierIndex + 1];
    }
    return null;
  };
  
  const nextTier = getNextTier();
  
  const calculateTierProgress = () => {
    if (!nextTier) return 100;
    
    const pointsForNextTier = nextTier.pointsRequired - currentTier.pointsRequired;
    const pointsEarned = referralData.totalPoints - currentTier.pointsRequired;
    return Math.min(Math.floor((pointsEarned / pointsForNextTier) * 100), 100);
  };
  
  const tierProgress = calculateTierProgress();
  
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Link className="h-6 w-6 text-brand-pink" />
        <h1 className="text-2xl font-bold tracking-tight">Creator Referrals</h1>
      </div>

      <Tabs defaultValue="overview" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="rewards">Rewards</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6 mt-6">
          {/* Referral stats */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
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
                <div className="text-2xl font-bold">{currentTier.name}</div>
                {nextTier ? (
                  <p className="text-xs text-muted-foreground">
                    {nextTier.pointsRequired - referralData.totalPoints} points to {nextTier.name}
                  </p>
                ) : (
                  <p className="text-xs text-muted-foreground">
                    Highest tier reached
                  </p>
                )}
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
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Per Referral
                </CardTitle>
                <Gift className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+{referralData.pointsPerReferral}</div>
                <p className="text-xs text-muted-foreground">
                  Points earned per active referral
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
                  Invite Contacts
                </Button>
              </div>
              
              <div className="mt-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Progress to {nextTier ? nextTier.name : 'Max'} Tier</span>
                  <span className="text-sm font-medium">{tierProgress}%</span>
                </div>
                <Progress value={tierProgress} className="h-2" />
              </div>
            </CardContent>
          </Card>
          
          {/* Referral list */}
          <Card>
            <CardHeader>
              <CardTitle>Your Referrals</CardTitle>
              <CardDescription>
                Creators who joined using your referral link
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {referralData.referrals.map(referral => (
                  <div key={referral.id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarImage src={referral.avatar} alt={referral.name} />
                        <AvatarFallback>{referral.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{referral.name}</p>
                        <p className="text-xs text-muted-foreground">
                          Joined {new Date(referral.joinDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="text-sm">
                          {referral.status === "active" ? (
                            <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                              Active
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20">
                              Pending
                            </Badge>
                          )}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {referral.status === "active" ? `${referral.points} points earned` : "Awaiting first campaign"}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">+{referral.hasEarnedYou}</p>
                        <p className="text-xs text-muted-foreground">points for you</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="rewards" className="space-y-6 mt-6">
          {/* Current tier info */}
          <Card>
            <CardHeader>
              <CardTitle>Your Current Tier: {currentTier.name}</CardTitle>
              <CardDescription>
                You've earned {referralData.totalPoints} points so far
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium mb-2">Current Benefits:</h3>
                  <ul className="space-y-1">
                    {currentTier.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-center text-sm">
                        <Check className="h-4 w-4 mr-2 text-green-500" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
                
                {nextTier && (
                  <>
                    <div className="pt-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Progress to {nextTier.name} Tier</span>
                        <span className="text-sm font-medium">
                          {referralData.totalPoints} / {nextTier.pointsRequired} points
                        </span>
                      </div>
                      <Progress value={tierProgress} className="h-2" />
                    </div>
                    
                    <div className="pt-2">
                      <h3 className="text-sm font-medium mb-2">Next Tier Unlocks:</h3>
                      <ul className="space-y-1">
                        {nextTier.benefits.map((benefit, index) => (
                          <li key={index} className="flex items-center text-sm">
                            {currentTier.benefits.includes(benefit) ? (
                              <Check className="h-4 w-4 mr-2 text-green-500" />
                            ) : (
                              <div className="h-4 w-4 mr-2 rounded-full border border-dashed border-muted-foreground"></div>
                            )}
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
          
          {/* All tiers */}
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {rewardTiers.map((tier, index) => (
              <Card key={index} className={
                tier.name === currentTier.name 
                  ? "border-brand-pink border-2" 
                  : ""
              }>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>{tier.name}</CardTitle>
                    {tier.name === currentTier.name && (
                      <Badge>Current</Badge>
                    )}
                  </div>
                  <CardDescription>
                    {tier.pointsRequired} points required
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {tier.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-center text-sm">
                        <Check className="h-4 w-4 mr-2 text-brand-pink" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  {tier.pointsRequired > referralData.totalPoints ? (
                    <div className="w-full">
                      <div className="text-xs text-muted-foreground mb-1">
                        {tier.pointsRequired - referralData.totalPoints} more points needed
                      </div>
                      <Progress 
                        value={(referralData.totalPoints / tier.pointsRequired) * 100}
                        className="h-1"
                      />
                    </div>
                  ) : (
                    <span className="text-xs text-brand-pink font-medium">Tier Unlocked</span>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
          
          {/* How to earn points */}
          <Card>
            <CardHeader>
              <CardTitle>How to Earn Points</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="bg-brand-pink/10 p-3 rounded-full">
                    <UserPlus className="h-6 w-6 text-brand-pink" />
                  </div>
                  <div>
                    <h3 className="font-medium">Refer Creator</h3>
                    <p className="text-sm text-muted-foreground">
                      {referralData.pointsPerReferral} points per successful referral
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="bg-brand-pink/10 p-3 rounded-full">
                    <BadgeDollarSign className="h-6 w-6 text-brand-pink" />
                  </div>
                  <div>
                    <h3 className="font-medium">Complete Campaigns</h3>
                    <p className="text-sm text-muted-foreground">
                      50-100 points per completed campaign
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="bg-brand-pink/10 p-3 rounded-full">
                    <Award className="h-6 w-6 text-brand-pink" />
                  </div>
                  <div>
                    <h3 className="font-medium">High Performance</h3>
                    <p className="text-sm text-muted-foreground">
                      Bonus points for exceeding campaign targets
                    </p>
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

export default Referrals;
