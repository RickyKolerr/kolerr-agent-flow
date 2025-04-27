
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CampaignMetrics as CampaignMetricsType } from "@/types/campaign";
import { BarChart2, TrendingUp, Users, DollarSign } from "lucide-react";

interface CampaignMetricsProps {
  metrics: CampaignMetricsType;
}

export const CampaignMetrics = ({ metrics }: CampaignMetricsProps) => {
  const metricItems = [
    {
      label: "Views",
      value: metrics.views.toLocaleString(),
      icon: BarChart2,
      change: "+12%",
    },
    {
      label: "Engagement Rate",
      value: `${metrics.engagement.toFixed(2)}%`,
      icon: TrendingUp,
      change: "+5%",
    },
    {
      label: "Conversions",
      value: metrics.conversions.toLocaleString(),
      icon: Users,
      change: "+8%",
    },
    {
      label: "ROI",
      value: `${metrics.roi.toFixed(2)}%`,
      icon: DollarSign,
      change: "+15%",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {metricItems.map((item) => (
        <Card key={item.label}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {item.label}
            </CardTitle>
            <item.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{item.value}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500">{item.change}</span> from last month
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
