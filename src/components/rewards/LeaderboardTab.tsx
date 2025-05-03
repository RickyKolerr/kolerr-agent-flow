
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";
import { LeaderboardEntry } from "@/types/rewards";

type LeaderboardTabProps = {
  leaderboard: LeaderboardEntry[];
  userRank: number;
};

export const LeaderboardTab = ({ leaderboard, userRank }: LeaderboardTabProps) => {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Global Creator Leaderboard</h2>
        <div className="flex items-center">
          <Badge variant="outline" className="bg-brand-pink/10 text-brand-pink">
            Your rank: #{userRank}
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
            {leaderboard.map((creator) => (
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
    </div>
  );
};
