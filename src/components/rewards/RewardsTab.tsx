
import { useCallback } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { Reward } from "@/types/rewards";
import { redeemReward } from "@/services/rewardsService";
import { toast } from "sonner";

type RewardsTabProps = {
  availableRewards: Reward[];
  currentPoints: number;
};

export const RewardsTab = ({ availableRewards, currentPoints }: RewardsTabProps) => {
  const handleRedeemReward = useCallback(async (reward: Reward) => {
    if (currentPoints >= reward.points) {
      try {
        const success = await redeemReward(reward.id);
        if (success) {
          toast.success(`Reward Redeemed: ${reward.title}`, {
            description: "Your reward has been added to your account.",
          });
        }
      } catch (error) {
        console.error("Failed to redeem reward:", error);
        toast.error("Failed to redeem reward", {
          description: "Please try again later.",
        });
      }
    } else {
      toast.error("Not enough points", {
        description: `You need ${reward.points - currentPoints} more points to redeem this reward.`,
      });
    }
  }, [currentPoints]);

  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {availableRewards.map((reward) => (
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
                  disabled={currentPoints < reward.points}
                  onClick={() => handleRedeemReward(reward)}
                >
                  Redeem
                </Button>
              </div>
              {currentPoints < reward.points && (
                <p className="text-xs text-muted-foreground mt-2">
                  You need {reward.points - currentPoints} more points
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
    </div>
  );
};
