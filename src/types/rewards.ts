
export interface PointHistoryItem {
  id: string;
  activity: string;
  points: number;
  date: string;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  reward: number;
  progress: number;
  total: number;
  deadline: string;
  status?: 'active' | 'completed' | 'expired';
}

export interface Reward {
  id: string;
  title: string;
  description: string;
  points: number;
  category: string;
  image: string;
  featured?: boolean;
  isRedeemed?: boolean;
}

export interface LeaderboardEntry {
  rank: number;
  name: string;
  avatar: string;
  points: number;
  isCurrentUser?: boolean;
}

export interface UserRewardsData {
  currentPoints: number;
  lifetimePoints: number;
  currentTier: string;
  nextTier: string;
  nextTierPoints: number;
  rankOnLeaderboard: number;
  monthlyCompletedChallenges: number;
  availableChallenges: number;
  pointsHistory: PointHistoryItem[];
  activeChallenges: Challenge[];
  availableRewards: Reward[];
  leaderboard: LeaderboardEntry[];
}

export interface RewardsStats {
  averageCampaignPayment: string;
  availableOpportunities: number;
  topCreatorEarnings: string;
  averageCompletionTime: string;
}
