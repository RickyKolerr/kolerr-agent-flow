
import { Card, CardContent } from "@/components/ui/card";
import { DollarSign, FileText, Star, Users, TrendingUp, Clock } from "lucide-react";

interface EarningStatProps {
  icon: React.ReactNode;
  value: string;
  label: string;
  bgColor: string;
  trending?: {
    value: string;
    positive: boolean;
  };
}

const EarningStat = ({ icon, value, label, bgColor, trending }: EarningStatProps) => {
  return (
    <Card className="overflow-hidden border-0 bg-black/20 relative hover:shadow-lg transition-all duration-300 hover:scale-[1.02] shadow-[0_4px_12px_-2px_rgba(0,0,0,0.3)]">
      <CardContent className="p-6 relative">
        <div className={`absolute top-0 left-0 w-1 h-full ${bgColor}`}></div>
        <div className="flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <div className={`p-3 rounded-full ${bgColor} bg-opacity-20`}>
              {icon}
            </div>
            {trending && (
              <div className={`flex items-center text-sm font-medium ${trending.positive ? 'text-green-500' : 'text-red-500'}`}>
                <TrendingUp className={`h-4 w-4 mr-1 ${!trending.positive && 'transform rotate-180'}`} />
                {trending.value}
              </div>
            )}
          </div>
          <div className="mt-2 mb-1">
            <span className="text-4xl font-bold">{value}</span>
          </div>
          <p className="text-muted-foreground text-sm">{label}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export const CreatorEarningsCard = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <div className="h-8 w-8 rounded-full bg-brand-pink flex items-center justify-center">
          <DollarSign className="h-5 w-5 text-white" />
        </div>
        <h2 className="text-2xl font-bold tracking-tight">Creator Earnings & Opportunities</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <EarningStat 
          icon={<DollarSign className="h-6 w-6 text-brand-pink" />}
          value="$2,450"
          label="Average Campaign Payment"
          bgColor="bg-brand-pink"
          trending={{ value: "+15% this month", positive: true }}
        />
        
        <EarningStat 
          icon={<FileText className="h-6 w-6 text-blue-500" />}
          value="286"
          label="Available Opportunities"
          bgColor="bg-blue-500"
          trending={{ value: "+24 new", positive: true }}
        />
        
        <EarningStat 
          icon={<Star className="h-6 w-6 text-yellow-500" />}
          value="$8,700"
          label="Top Creator Earnings"
          bgColor="bg-yellow-500"
          trending={{ value: "+32% vs last month", positive: true }}
        />
        
        <EarningStat 
          icon={<Clock className="h-6 w-6 text-purple-500" />}
          value="48 hrs"
          label="Average Completion Time"
          bgColor="bg-purple-500"
        />
      </div>
      
      <Card className="border-0 bg-gradient-to-r from-brand-pink/30 to-purple-700/30">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div className="space-y-2">
              <h3 className="font-semibold text-lg">Ready to start earning?</h3>
              <p className="text-sm text-muted-foreground">Join our top creators earning over $10,000 monthly</p>
            </div>
            <div className="mt-4 md:mt-0 flex items-center">
              <div className="flex -space-x-3 mr-4">
                <div className="h-8 w-8 rounded-full bg-blue-500 border-2 border-background"></div>
                <div className="h-8 w-8 rounded-full bg-yellow-500 border-2 border-background"></div>
                <div className="h-8 w-8 rounded-full bg-green-500 border-2 border-background"></div>
                <div className="h-8 w-8 rounded-full bg-brand-pink border-2 border-background flex items-center justify-center text-xs font-medium">+42</div>
              </div>
              <div className="bg-brand-pink hover:bg-brand-pink/90 py-2 px-4 rounded-md text-sm font-medium text-white">Apply Now</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
