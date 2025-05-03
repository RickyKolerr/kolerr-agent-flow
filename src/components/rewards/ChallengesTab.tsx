
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Challenge } from "@/types/rewards";
import { ArrowRight, Trophy, Calendar, CheckCircle } from "lucide-react";

type ChallengesTabProps = {
  activeChallenges: Challenge[];
  availableChallenges: number;
  monthlyCompletedChallenges: number;
};

export const ChallengesTab = ({ 
  activeChallenges, 
  availableChallenges, 
  monthlyCompletedChallenges 
}: ChallengesTabProps) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Active Challenges</h2>
        <Badge variant="outline">{activeChallenges.length} In Progress</Badge>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
        {activeChallenges.map((challenge) => (
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
              {availableChallenges} new challenges are available for you to start
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
              You've completed {monthlyCompletedChallenges} challenges this month
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
    </div>
  );
};
