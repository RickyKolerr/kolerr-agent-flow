
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { DollarSign, ArrowUpRight, Star, Award, Percent, TrendingUp, Calendar } from "lucide-react";

export const KOLEarningsCard = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-full bg-brand-pink flex items-center justify-center">
            <DollarSign className="h-5 w-5 text-white" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight">My Earnings</h2>
        </div>
        <Button variant="outline" size="sm" className="text-sm">
          Payment History
          <ArrowUpRight className="ml-1 h-3 w-3" />
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-brand-pink/20 to-purple-600/20 border-0">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <DollarSign className="h-5 w-5 mr-1 text-brand-pink" />
              Monthly Earnings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-1">$12,450</div>
            <div className="flex items-center text-sm text-green-500">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span>+18.5% from last month</span>
            </div>
            <Progress value={85} className="h-1 mt-4" />
            <div className="flex justify-between mt-1 text-xs text-muted-foreground">
              <span>$0</span>
              <span>Monthly Goal: $15,000</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Star className="h-5 w-5 mr-1 text-yellow-500" />
              Performance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Engagement Rate</span>
                <span className="font-medium">8.6%</span>
              </div>
              <Progress value={86} className="h-1" />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Conversion Rate</span>
                <span className="font-medium">5.2%</span>
              </div>
              <Progress value={52} className="h-1" />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Content Quality</span>
                <span className="font-medium">94%</span>
              </div>
              <Progress value={94} className="h-1" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Calendar className="h-5 w-5 mr-1 text-blue-500" />
              Campaign Schedule
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b pb-2">
                <div>
                  <p className="font-medium">Summer Collection</p>
                  <p className="text-xs text-muted-foreground">Due in 3 days</p>
                </div>
                <Badge className="bg-yellow-500/20 text-yellow-500 hover:bg-yellow-500/30">In Progress</Badge>
              </div>
              
              <div className="flex items-center justify-between border-b pb-2">
                <div>
                  <p className="font-medium">Lifestyle Brand</p>
                  <p className="text-xs text-muted-foreground">Starting next week</p>
                </div>
                <Badge className="bg-blue-500/20 text-blue-500 hover:bg-blue-500/30">Upcoming</Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Tech Review</p>
                  <p className="text-xs text-muted-foreground">Completed yesterday</p>
                </div>
                <Badge className="bg-green-500/20 text-green-500 hover:bg-green-500/30">Completed</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="md:col-span-2 border-0 bg-gradient-to-br from-blue-500/20 to-purple-600/20">
          <CardHeader>
            <CardTitle>Earnings Breakdown</CardTitle>
            <CardDescription>Your earnings by campaign type</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-brand-pink/20 flex items-center justify-center mr-3">
                    <Award className="h-4 w-4 text-brand-pink" />
                  </div>
                  <div>
                    <p className="font-medium">Sponsored Posts</p>
                    <p className="text-xs text-muted-foreground">48 campaigns</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold">$6,250</p>
                  <p className="text-xs text-muted-foreground">50.2% of total</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-blue-500/20 flex items-center justify-center mr-3">
                    <Award className="h-4 w-4 text-blue-500" />
                  </div>
                  <div>
                    <p className="font-medium">Product Reviews</p>
                    <p className="text-xs text-muted-foreground">32 campaigns</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold">$3,840</p>
                  <p className="text-xs text-muted-foreground">30.8% of total</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-yellow-500/20 flex items-center justify-center mr-3">
                    <Award className="h-4 w-4 text-yellow-500" />
                  </div>
                  <div>
                    <p className="font-medium">Brand Ambassadorships</p>
                    <p className="text-xs text-muted-foreground">5 campaigns</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold">$2,360</p>
                  <p className="text-xs text-muted-foreground">19.0% of total</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-green-500/10 to-teal-600/10">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Percent className="h-5 w-5 mr-2 text-green-500" />
              Opportunities
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <div className="text-4xl font-bold">286</div>
              <p className="text-sm text-muted-foreground">Available campaigns</p>
            </div>
            
            <div className="text-center flex justify-around">
              <div>
                <div className="text-2xl font-bold text-blue-500">64</div>
                <p className="text-xs text-muted-foreground">Perfect Match</p>
              </div>
              
              <div>
                <div className="text-2xl font-bold text-brand-pink">142</div>
                <p className="text-xs text-muted-foreground">Good Match</p>
              </div>
              
              <div>
                <div className="text-2xl font-bold">80</div>
                <p className="text-xs text-muted-foreground">Other</p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="pt-0">
            <Button className="w-full bg-green-500 hover:bg-green-600">View Opportunities</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};
