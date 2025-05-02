
import { Card, CardContent } from "@/components/ui/card";
import { Clock, Users, TrendingUp, Search } from "lucide-react";

interface AverageUsageStatsProps {
  stats: {
    avgQueryCost: number;
    kolQueryPercentage: number;
    peakUsageHour: number;
    queryVolume: number;
  };
}

export function AverageUsageStats({ stats }: AverageUsageStatsProps) {
  const formatHour = (hour: number): string => {
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const formattedHour = hour % 12 || 12;
    return `${formattedHour} ${ampm}`;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardContent className="p-4 flex flex-col items-center space-y-2">
          <div className="flex items-center justify-center h-10 w-10 rounded-full bg-brand-pink/20 text-brand-pink">
            <Search className="h-5 w-5" />
          </div>
          <div className="space-y-0.5 text-center">
            <p className="text-sm font-medium text-muted-foreground">Avg Credit Per Query</p>
            <p className="text-2xl font-bold">{stats.avgQueryCost.toFixed(2)}</p>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4 flex flex-col items-center space-y-2">
          <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-600/20 text-blue-600">
            <Users className="h-5 w-5" />
          </div>
          <div className="space-y-0.5 text-center">
            <p className="text-sm font-medium text-muted-foreground">KOL Query Percentage</p>
            <p className="text-2xl font-bold">{stats.kolQueryPercentage.toFixed(1)}%</p>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4 flex flex-col items-center space-y-2">
          <div className="flex items-center justify-center h-10 w-10 rounded-full bg-green-600/20 text-green-600">
            <Clock className="h-5 w-5" />
          </div>
          <div className="space-y-0.5 text-center">
            <p className="text-sm font-medium text-muted-foreground">Peak Usage Time</p>
            <p className="text-2xl font-bold">{formatHour(stats.peakUsageHour)}</p>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4 flex flex-col items-center space-y-2">
          <div className="flex items-center justify-center h-10 w-10 rounded-full bg-purple-600/20 text-purple-600">
            <TrendingUp className="h-5 w-5" />
          </div>
          <div className="space-y-0.5 text-center">
            <p className="text-sm font-medium text-muted-foreground">Total Queries</p>
            <p className="text-2xl font-bold">{stats.queryVolume}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
