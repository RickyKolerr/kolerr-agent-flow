
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { UserRewardsData } from "@/types/rewards";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Star, Trophy, Award, Clock, Gift } from "lucide-react";

type RewardsOverviewProps = {
  rewardsData: UserRewardsData;
};

export const RewardsOverview = ({ rewardsData }: RewardsOverviewProps) => {
  const tierProgress = Math.min(
    Math.round((rewardsData.currentPoints / rewardsData.nextTierPoints) * 100),
    100
  );

  return (
    <div className="space-y-6">
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
    </div>
  );
};
