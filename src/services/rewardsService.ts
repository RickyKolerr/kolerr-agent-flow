
import { UserRewardsData, RewardsStats } from "@/types/rewards";

// Mock data that would be replaced by actual API calls
export const getRewardsData = async (): Promise<UserRewardsData> => {
  // In a real implementation, this would call an API endpoint
  // Example: return await fetch('/api/rewards').then(res => res.json());
  
  // For now, return mock data
  return {
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
};

export const getCreatorEarningsStats = async (): Promise<RewardsStats> => {
  // In a real implementation, this would call an API endpoint
  return {
    averageCampaignPayment: "$5,200",
    availableOpportunities: 324,
    topCreatorEarnings: "$18,500",
    averageCompletionTime: "36 hrs"
  };
};

export const redeemReward = async (rewardId: string): Promise<boolean> => {
  // In a real implementation, this would call an API endpoint
  console.log(`Redeeming reward with ID: ${rewardId}`);
  return true;
};

export const completeChallenge = async (challengeId: string): Promise<boolean> => {
  // In a real implementation, this would call an API endpoint
  console.log(`Completing challenge with ID: ${challengeId}`);
  return true;
};
