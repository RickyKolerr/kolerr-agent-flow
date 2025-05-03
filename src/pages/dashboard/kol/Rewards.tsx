
import { useState, useEffect } from "react";
import { BadgePercent } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserRewardsData } from "@/types/rewards";
import { getRewardsData } from "@/services/rewardsService";
import { RewardsOverview } from "@/components/rewards/RewardsOverview";
import { ChallengesTab } from "@/components/rewards/ChallengesTab";
import { RewardsTab } from "@/components/rewards/RewardsTab";
import { LeaderboardTab } from "@/components/rewards/LeaderboardTab";
import { toast } from "sonner";

const Rewards = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [rewardsData, setRewardsData] = useState<UserRewardsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch rewards data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data = await getRewardsData();
        setRewardsData(data);
      } catch (error) {
        console.error("Failed to fetch rewards data:", error);
        toast.error("Failed to load rewards data", {
          description: "Please try again later."
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p className="text-lg">Loading rewards data...</p>
        </div>
      </div>
    );
  }

  if (!rewardsData) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p className="text-lg">Unable to load rewards data.</p>
          <Button 
            variant="outline" 
            className="mt-4"
            onClick={() => window.location.reload()}
          >
            Retry
          </Button>
        </div>
      </div>
    );
  }
  
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
          <RewardsOverview rewardsData={rewardsData} />
        </TabsContent>
        
        <TabsContent value="challenges" className="space-y-6 mt-6">
          <ChallengesTab 
            activeChallenges={rewardsData.activeChallenges}
            availableChallenges={rewardsData.availableChallenges}
            monthlyCompletedChallenges={rewardsData.monthlyCompletedChallenges}
          />
        </TabsContent>
        
        <TabsContent value="rewards" className="mt-6">
          <RewardsTab 
            availableRewards={rewardsData.availableRewards}
            currentPoints={rewardsData.currentPoints}
          />
        </TabsContent>
        
        <TabsContent value="leaderboard" className="mt-6">
          <LeaderboardTab 
            leaderboard={rewardsData.leaderboard}
            userRank={rewardsData.rankOnLeaderboard}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Rewards;
