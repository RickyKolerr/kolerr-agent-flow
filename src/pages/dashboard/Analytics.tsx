
import { SearchAnalyticsChart } from "@/components/analytics/SearchAnalyticsChart";
import { CreditUsageStats } from "@/components/analytics/CreditUsageStats";
import { ROITracker } from "@/components/analytics/ROITracker";
import { useCredits } from "@/contexts/CreditContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  LineChart, 
  BarChart, 
  Activity, 
  Download, 
  Calendar, 
  ChevronDown, 
  Users, 
  Zap
} from "lucide-react";
import { useState } from "react";
import { 
  ResponsiveContainer, 
  LineChart as RechartsLineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  PieChart,
  Pie,
  Cell
} from "recharts";

const mockSearchData = [
  { date: "2023-11", searches: 80, conversions: 35 },
  { date: "2023-12", searches: 90, conversions: 40 },
  { date: "2024-01", searches: 120, conversions: 45 },
  { date: "2024-02", searches: 180, conversions: 65 },
  { date: "2024-03", searches: 240, conversions: 90 },
  { date: "2024-04", searches: 300, conversions: 120 },
];

const mockROIData = [
  { campaign: "Influencer Q1", spent: 5000, revenue: 15000, roi: 200 },
  { campaign: "Brand Awareness", spent: 3000, revenue: 8000, roi: 166.7 },
  { campaign: "Product Launch", spent: 10000, revenue: 25000, roi: 150 },
  { campaign: "Holiday Promo", spent: 7500, revenue: 21000, roi: 180 },
  { campaign: "Fashion Week", spent: 12000, revenue: 32000, roi: 166.7 },
];

const mockAudienceData = [
  { name: "18-24", value: 30 },
  { name: "25-34", value: 40 },
  { name: "35-44", value: 20 },
  { name: "45+", value: 10 },
];

const mockChannelData = [
  { name: "TikTok", value: 45 },
  { name: "Instagram", value: 25 },
  { name: "YouTube", value: 20 },
  { name: "Twitter", value: 10 },
];

const COLORS = ["#ec4899", "#8b5cf6", "#3b82f6", "#10b981"];

export default function AnalyticsPage() {
  const { freeCredits, premiumCredits, totalCredits } = useCredits();
  const [timeframe, setTimeframe] = useState("6m");

  const creditCategories = [
    { name: "Basic Searches", usage: 45, total: 100 },
    { name: "Advanced Analytics", usage: 30, total: 50 },
    { name: "Campaign Analysis", usage: 15, total: 25 },
  ];

  // Simulated engagement rates over time
  const engagementData = [
    { month: "Nov", tiktok: 4.2, instagram: 3.8, youtube: 2.5 },
    { month: "Dec", tiktok: 4.5, instagram: 3.2, youtube: 2.6 },
    { month: "Jan", tiktok: 5.1, instagram: 3.5, youtube: 2.8 },
    { month: "Feb", tiktok: 4.9, instagram: 3.7, youtube: 3.0 },
    { month: "Mar", tiktok: 5.5, instagram: 4.1, youtube: 3.2 },
    { month: "Apr", tiktok: 6.2, instagram: 4.5, youtube: 3.5 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics Dashboard</h1>
          <p className="text-muted-foreground">Track your campaign performance and ROI</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Calendar className="mr-2 h-4 w-4" />
            Apr 1 - Apr 30
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Searches
            </CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,024</div>
            <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Conversion Rate
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">32.5%</div>
            <p className="text-xs text-muted-foreground">
              +7.2% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Average ROI
            </CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">172.8%</div>
            <p className="text-xs text-muted-foreground">
              +12.5% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Campaigns
            </CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">
              +2 from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="audience">Audience</TabsTrigger>
          <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            <SearchAnalyticsChart data={mockSearchData} />
            
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold">Engagement Rate</CardTitle>
                  <div className="flex gap-2">
                    <Button 
                      variant={timeframe === "3m" ? "default" : "outline"} 
                      size="sm"
                      onClick={() => setTimeframe("3m")}
                      className={timeframe === "3m" ? "bg-brand-pink hover:bg-brand-pink/90" : ""}
                    >
                      3M
                    </Button>
                    <Button 
                      variant={timeframe === "6m" ? "default" : "outline"} 
                      size="sm"
                      onClick={() => setTimeframe("6m")}
                      className={timeframe === "6m" ? "bg-brand-pink hover:bg-brand-pink/90" : ""}
                    >
                      6M
                    </Button>
                  </div>
                </div>
                <CardDescription>
                  Average engagement rate across platforms
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-2">
                <div className="h-[240px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsLineChart
                      data={engagementData}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#444" opacity={0.2} />
                      <XAxis dataKey="month" />
                      <YAxis tickFormatter={(value) => `${value}%`} />
                      <Tooltip 
                        formatter={(value) => [`${value}%`, "Engagement Rate"]}
                        contentStyle={{ 
                          backgroundColor: '#1f2937', 
                          borderColor: '#374151',
                          color: '#f3f4f6',
                          borderRadius: '8px'
                        }}
                      />
                      <Legend />
                      <Line type="monotone" dataKey="tiktok" name="TikTok" stroke="#ec4899" activeDot={{ r: 8 }} />
                      <Line type="monotone" dataKey="instagram" name="Instagram" stroke="#8b5cf6" />
                      <Line type="monotone" dataKey="youtube" name="YouTube" stroke="#3b82f6" />
                    </RechartsLineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <CreditUsageStats
              totalCredits={totalCredits}
              usedCredits={totalCredits - (freeCredits + premiumCredits)}
              categories={creditCategories}
            />
          </div>

          <ROITracker data={mockROIData} />
        </TabsContent>
        <TabsContent value="audience" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Age Demographics</CardTitle>
                <CardDescription>Distribution of your audience by age group</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={mockAudienceData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {mockAudienceData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        formatter={(value) => [`${value}%`, "Percentage"]}
                        contentStyle={{ 
                          backgroundColor: '#1f2937', 
                          borderColor: '#374151',
                          color: '#f3f4f6',
                          borderRadius: '8px'
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Channel Distribution</CardTitle>
                <CardDescription>Audience distribution across platforms</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={mockChannelData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {mockChannelData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        formatter={(value) => [`${value}%`, "Percentage"]}
                        contentStyle={{ 
                          backgroundColor: '#1f2937', 
                          borderColor: '#374151',
                          color: '#f3f4f6',
                          borderRadius: '8px'
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="campaigns">
          <ROITracker data={mockROIData} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
