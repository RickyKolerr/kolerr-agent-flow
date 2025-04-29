
import { useState } from "react";
import { TrendingUp, TrendingDown, Calendar, ArrowUpRight, BarChart, BarChart2, Eye, Heart, MessageCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  LineChart,
  Line,
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

// Mock performance data
const performanceData = {
  summary: {
    totalViews: 1254000,
    totalEngagement: 87800,
    averageEngagementRate: 7.2,
    totalCampaigns: 12,
    activeRate: 95,
    trending: "up",
  },
  monthly: [
    { month: "Jan", views: 76000, engagement: 5300, engagementRate: 7.0 },
    { month: "Feb", views: 82000, engagement: 5900, engagementRate: 7.2 },
    { month: "Mar", views: 89000, engagement: 6400, engagementRate: 7.2 },
    { month: "Apr", views: 97000, engagement: 7200, engagementRate: 7.4 },
    { month: "May", views: 115000, engagement: 8300, engagementRate: 7.2 },
    { month: "Jun", views: 132000, engagement: 9100, engagementRate: 6.9 },
    { month: "Jul", views: 159000, engagement: 11200, engagementRate: 7.0 },
    { month: "Aug", views: 168000, engagement: 12000, engagementRate: 7.1 },
    { month: "Sep", views: 173000, engagement: 12600, engagementRate: 7.3 },
    { month: "Oct", views: 162000, engagement: 11800, engagementRate: 7.3 },
  ],
  campaigns: [
    { 
      name: "Summer Fashion Collection", 
      brand: "StyleCo",
      views: 185000,
      engagement: 14200,
      engagementRate: 7.7,
      date: "2023-07-01",
      platform: "tiktok",
      performance: "above_average"
    },
    { 
      name: "Fitness Apparel Showcase", 
      brand: "FlexFit",
      views: 142000,
      engagement: 10800,
      engagementRate: 7.6,
      date: "2023-05-15",
      platform: "instagram",
      performance: "above_average"
    },
    { 
      name: "Vegan Food Challenge", 
      brand: "GreenEats",
      views: 98000,
      engagement: 6900,
      engagementRate: 7.0,
      date: "2023-03-22",
      platform: "instagram",
      performance: "average"
    },
    { 
      name: "Travel Essentials", 
      brand: "Wanderlust",
      views: 122000,
      engagement: 8500,
      engagementRate: 7.0,
      date: "2023-02-10",
      platform: "youtube",
      performance: "average"
    },
    { 
      name: "Gaming Peripherals", 
      brand: "TechGear",
      views: 162000,
      engagement: 11100,
      engagementRate: 6.9,
      date: "2022-12-05",
      platform: "tiktok",
      performance: "average"
    },
  ]
};

// Example engagement breakdown
const engagementBreakdown = [
  { name: "Likes", value: 65, color: "#F472B6" },
  { name: "Comments", value: 20, color: "#818CF8" },
  { name: "Shares", value: 12, color: "#60A5FA" },
  { name: "Saves", value: 3, color: "#34D399" },
];

const Analytics = () => {
  const [timeframe, setTimeframe] = useState("3m");
  const [chartView, setChartView] = useState("views");
  
  // Filter data based on timeframe
  const getTimeframeData = () => {
    switch(timeframe) {
      case "1m": return performanceData.monthly.slice(-1);
      case "3m": return performanceData.monthly.slice(-3);
      case "6m": return performanceData.monthly.slice(-6);
      case "12m": return performanceData.monthly.slice(-10); // Using all available data
      default: return performanceData.monthly.slice(-3);
    }
  };
  
  const chartData = getTimeframeData();
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <TrendingUp className="h-6 w-6 text-brand-pink" />
          <h1 className="text-2xl font-bold tracking-tight">Performance Analytics</h1>
        </div>
      </div>
      
      {/* Summary cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Views
            </CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(performanceData.summary.totalViews/1000000).toFixed(1)}M
            </div>
            <p className="text-xs text-muted-foreground">
              Across all platforms
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Engagement Rate
            </CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {performanceData.summary.averageEngagementRate}%
            </div>
            <div className="flex items-center pt-1">
              <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
              <span className="text-xs text-green-500">+0.2%</span>
              <span className="text-xs text-muted-foreground ml-1">from last month</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Campaigns
            </CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {performanceData.summary.totalCampaigns}
            </div>
            <p className="text-xs text-muted-foreground">
              5 active campaigns
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Acceptance Rate
            </CardTitle>
            <MessageCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {performanceData.summary.activeRate}%
            </div>
            <div className="flex items-center pt-1">
              <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
              <span className="text-xs text-green-500">+3%</span>
              <span className="text-xs text-muted-foreground ml-1">from last quarter</span>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Performance chart */}
      <Card className="col-span-4">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Performance Trends</CardTitle>
            <div className="space-x-2">
              <Button 
                variant={chartView === "views" ? "default" : "outline"}
                size="sm"
                onClick={() => setChartView("views")}
              >
                Views
              </Button>
              <Button 
                variant={chartView === "engagement" ? "default" : "outline"}
                size="sm"
                onClick={() => setChartView("engagement")}
              >
                Engagement
              </Button>
              <Button 
                variant={chartView === "rate" ? "default" : "outline"}
                size="sm"
                onClick={() => setChartView("rate")}
              >
                Rate
              </Button>
            </div>
          </div>
          
          <Tabs defaultValue="3m" className="w-[400px]" onValueChange={setTimeframe}>
            <TabsList>
              <TabsTrigger value="1m">1M</TabsTrigger>
              <TabsTrigger value="3m">3M</TabsTrigger>
              <TabsTrigger value="6m">6M</TabsTrigger>
              <TabsTrigger value="12m">12M</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent className="pt-2">
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={chartData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                {chartView === "views" && (
                  <Line
                    type="monotone"
                    dataKey="views"
                    name="Views"
                    stroke="#F472B6"
                    strokeWidth={2}
                    dot={{ strokeWidth: 2 }}
                    activeDot={{ r: 8 }}
                  />
                )}
                {chartView === "engagement" && (
                  <Line
                    type="monotone"
                    dataKey="engagement"
                    name="Engagement"
                    stroke="#818CF8"
                    strokeWidth={2}
                    dot={{ strokeWidth: 2 }}
                    activeDot={{ r: 8 }}
                  />
                )}
                {chartView === "rate" && (
                  <Line
                    type="monotone"
                    dataKey="engagementRate"
                    name="Engagement Rate (%)"
                    stroke="#34D399"
                    strokeWidth={2}
                    dot={{ strokeWidth: 2 }}
                    activeDot={{ r: 8 }}
                  />
                )}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      {/* Campaign performance and engagement breakdown */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Campaign Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsBarChart
                  data={performanceData.campaigns}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                  <XAxis dataKey="name" angle={-45} textAnchor="end" height={70} />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="engagementRate" name="Eng. Rate %" fill="#F472B6" />
                </RechartsBarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Engagement Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              {engagementBreakdown.map(item => (
                <div key={item.name} className="flex items-center">
                  <div className="w-[80px] text-sm">{item.name}</div>
                  <div className="flex-1 ml-4">
                    <div className="h-3 w-full bg-secondary rounded-full overflow-hidden">
                      <div 
                        className="h-full rounded-full" 
                        style={{ width: `${item.value}%`, backgroundColor: item.color }}
                      />
                    </div>
                  </div>
                  <div className="ml-4 text-sm font-medium">{item.value}%</div>
                </div>
              ))}
              
              <div className="pt-4 space-y-2">
                <h4 className="text-sm font-medium">Platform Distribution</h4>
                <div className="flex gap-3">
                  <div className="flex items-center space-x-1">
                    <div className="w-3 h-3 rounded-full bg-brand-pink"></div>
                    <span className="text-xs">TikTok (45%)</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-3 h-3 rounded-full bg-[#818CF8]"></div>
                    <span className="text-xs">Instagram (38%)</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-3 h-3 rounded-full bg-[#34D399]"></div>
                    <span className="text-xs">YouTube (17%)</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;
