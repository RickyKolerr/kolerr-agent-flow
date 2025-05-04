
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChartContainer } from "@/components/ui/chart";
import { BarChart, Users, CreditCard, Calendar, ArrowUpRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { CreatorEarningsCard } from "@/components/kol/CreatorEarningsCard";
import { useUserAccess } from "@/hooks/useUserAccess";

const Overview = () => {
  const navigate = useNavigate();
  const [timeframe, setTimeframe] = useState("month");
  const { user } = useUserAccess();
  const isKOLUser = user?.role === "kol";

  // Mock data
  const mockData = {
    day: [
      { name: '9AM', value: 4 },
      { name: '10AM', value: 6 },
      { name: '11AM', value: 8 },
      { name: '12PM', value: 12 },
      { name: '1PM', value: 10 },
      { name: '2PM', value: 15 },
      { name: '3PM', value: 18 },
      { name: '4PM', value: 14 },
      { name: '5PM', value: 9 }
    ],
    week: [
      { name: 'Mon', value: 20 },
      { name: 'Tue', value: 35 },
      { name: 'Wed', value: 45 },
      { name: 'Thu', value: 55 },
      { name: 'Fri', value: 70 },
      { name: 'Sat', value: 65 },
      { name: 'Sun', value: 50 }
    ],
    month: [
      { name: 'Week 1', value: 130 },
      { name: 'Week 2', value: 160 },
      { name: 'Week 3', value: 240 },
      { name: 'Week 4', value: 280 }
    ]
  };
  
  const stats = [
    {
      title: "Total KOLs",
      value: "486",
      change: "+12%",
      increased: true,
      icon: Users,
      link: "/dashboard/kols"
    },
    {
      title: "Active Campaigns",
      value: "6",
      change: "+2",
      increased: true,
      icon: BarChart,
      link: "/dashboard/campaigns"
    },
    {
      title: "Scheduled Bookings",
      value: "18",
      change: "+5",
      increased: true,
      icon: Calendar,
      link: "/dashboard/bookings"
    },
    {
      title: "Available Credits",
      value: "720",
      change: "-50",
      increased: false,
      icon: CreditCard,
      link: "/dashboard/credits"
    }
  ];

  const recentActivity = [
    {
      id: 1,
      type: "KOL Search",
      details: "Searched for 'fashion lifestyle TikTok creators'",
      time: "2 hours ago"
    },
    {
      id: 2,
      type: "Campaign Created",
      details: "Summer Collection Campaign created",
      time: "4 hours ago"
    },
    {
      id: 3,
      type: "KOL Added",
      details: "Added @fashionista_tiktok to potential collaborators",
      time: "Yesterday"
    },
    {
      id: 4,
      type: "Booking Confirmed",
      details: "Slot booked with @travel_with_me for next Tuesday",
      time: "Yesterday"
    },
    {
      id: 5,
      type: "Contract Signed",
      details: "Contract #TC-2023-0042 signed by @beauty_tips_daily",
      time: "2 days ago"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <div className="flex items-center space-x-2">
          <Button onClick={() => navigate("/dashboard/kols")}>
            Search KOLs
          </Button>
          <Button variant="outline" onClick={() => navigate("/dashboard/campaigns")}>
            Create Campaign
          </Button>
        </div>
      </div>

      {/* Stats cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <Card key={i} className="hover-scale">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center space-x-1 mt-2">
                <p className={`text-xs ${stat.increased ? 'text-green-500' : 'text-red-500'}`}>
                  {stat.change}
                </p>
                <p className="text-xs text-muted-foreground">from last month</p>
              </div>
              <Button 
                variant="link" 
                className="p-0 h-auto mt-2 text-brand-pink"
                onClick={() => navigate(stat.link)}
              >
                View details 
                <ArrowUpRight className="ml-1 h-3 w-3" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Creator Earnings Section - Only show for KOL users */}
      {isKOLUser && <CreatorEarningsCard />}
      
      <div className="grid gap-4 md:grid-cols-2">
        {/* Performance Chart */}
        <Card className="col-span-2 md:col-span-1">
          <CardHeader>
            <CardTitle>Campaign Performance</CardTitle>
            <CardDescription>
              Engagement metrics across your active campaigns
            </CardDescription>
            <Tabs defaultValue="month">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger
                  value="day"
                  onClick={() => setTimeframe("day")}
                  className={timeframe === "day" ? "data-[state=active]:bg-brand-pink" : ""}
                >
                  Day
                </TabsTrigger>
                <TabsTrigger
                  value="week"
                  onClick={() => setTimeframe("week")}
                  className={timeframe === "week" ? "data-[state=active]:bg-brand-pink" : ""}
                >
                  Week
                </TabsTrigger>
                <TabsTrigger
                  value="month"
                  onClick={() => setTimeframe("month")}
                  className={timeframe === "month" ? "data-[state=active]:bg-brand-pink" : ""}
                >
                  Month
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>
          <CardContent className="px-2">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsLineChart
                  data={mockData[timeframe as keyof typeof mockData]}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#F472B6"
                    strokeWidth={2}
                    activeDot={{ r: 8 }}
                  />
                </RechartsLineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity Card */}
        <Card className="col-span-2 md:col-span-1">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Your latest actions and updates
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-5">
              {recentActivity.map((activity) => (
                <div 
                  key={activity.id}
                  className="flex space-x-4 items-start border-b border-border pb-3 last:border-0 last:pb-0"
                >
                  <div className="h-9 w-9 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-medium">{activity.type.substring(0, 2)}</span>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {activity.type}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {activity.details}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Overview;
