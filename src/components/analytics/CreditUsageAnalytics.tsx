
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { useCredits } from "@/contexts/CreditContext";
import { PieChart, Pie, Cell, Legend, ResponsiveContainer, Tooltip as RechartsTooltip } from "recharts";
import { useUserAccess } from "@/hooks/useUserAccess";

// Define types for credit usage data
interface CreditUsageData {
  kolQueries: number;
  generalQueries: number;
  totalQueries: number;
  timestamp: number;
}

export function CreditUsageAnalytics() {
  const { freeCredits, premiumCredits, totalCredits, hasPremiumPlan } = useCredits();
  const { user } = useUserAccess();
  const [usageHistory, setUsageHistory] = useState<CreditUsageData[]>([]);
  const [timeframe, setTimeframe] = useState<"day" | "week" | "month">("day");
  
  // On component mount, fetch saved usage history from localStorage
  useEffect(() => {
    const savedHistory = localStorage.getItem('credit_usage_history');
    if (savedHistory) {
      try {
        const parsedHistory = JSON.parse(savedHistory);
        setUsageHistory(parsedHistory);
      } catch (e) {
        console.error("Error parsing credit usage history:", e);
      }
    }
  }, []);
  
  // Filter data by selected timeframe
  const getFilteredData = () => {
    const now = Date.now();
    const oneDayMs = 24 * 60 * 60 * 1000;
    
    let cutoff: number;
    switch (timeframe) {
      case "day":
        cutoff = now - oneDayMs;
        break;
      case "week":
        cutoff = now - 7 * oneDayMs;
        break;
      case "month":
        cutoff = now - 30 * oneDayMs;
        break;
    }
    
    return usageHistory.filter(entry => entry.timestamp >= cutoff);
  };
  
  // Calculate statistics based on filtered data
  const calculateStats = () => {
    const filteredData = getFilteredData();
    
    if (filteredData.length === 0) {
      return {
        totalKolQueries: 0,
        totalGeneralQueries: 0,
        totalQueries: 0
      };
    }
    
    return filteredData.reduce((acc, entry) => {
      return {
        totalKolQueries: acc.totalKolQueries + entry.kolQueries,
        totalGeneralQueries: acc.totalGeneralQueries + entry.generalQueries,
        totalQueries: acc.totalQueries + entry.totalQueries
      };
    }, {
      totalKolQueries: 0,
      totalGeneralQueries: 0,
      totalQueries: 0
    });
  };
  
  const stats = calculateStats();
  
  // Prepare chart data
  const chartData = [
    { name: 'KOL Queries', value: stats.totalKolQueries, color: '#ec4899' }, // brand-pink
    { name: 'General Queries', value: stats.totalGeneralQueries, color: '#6366f1' } // indigo-500
  ].filter(item => item.value > 0);
  
  // Placeholder data if no real data exists
  const placeholderData = [
    { name: 'KOL Queries', value: 3, color: '#ec4899' },
    { name: 'General Queries', value: 9, color: '#6366f1' }
  ];
  
  // Use placeholder data if no real data exists
  const displayData = chartData.length === 0 ? placeholderData : chartData;
  
  // Credit usage categories
  const creditCategories = [
    { name: "KOL Search", used: stats.totalKolQueries, total: hasPremiumPlan ? "Unlimited" : "Daily Limit" },
    { name: "General Questions", used: stats.totalGeneralQueries, total: hasPremiumPlan ? "Unlimited" : `${stats.totalGeneralQueries} of ${stats.totalGeneralQueries + (freeCredits * 3)}` }
  ];
  
  // Format credit count
  const formatCreditCount = (count: number) => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}k`;
    }
    return count.toString();
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Credit Usage</CardTitle>
        <CardDescription>Track how your AI search credits are being utilized</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="day" onValueChange={(v) => setTimeframe(v as "day" | "week" | "month")}>
          <TabsList className="mb-4">
            <TabsTrigger value="day">Today</TabsTrigger>
            <TabsTrigger value="week">This Week</TabsTrigger>
            <TabsTrigger value="month">This Month</TabsTrigger>
          </TabsList>
          
          <TabsContent value="day" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="col-span-1 md:col-span-2">
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={displayData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {displayData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Legend />
                    <RechartsTooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              
              <div className="space-y-4 flex flex-col justify-center">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Credits Remaining</span>
                    <span className="font-medium">{formatCreditCount(freeCredits)}/{formatCreditCount(freeCredits + stats.totalQueries)}</span>
                  </div>
                  <Progress 
                    value={freeCredits / (freeCredits + stats.totalQueries) * 100} 
                    className="h-2" 
                  />
                </div>
                
                {hasPremiumPlan && (
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Premium Credits</span>
                      <span className="font-medium">{formatCreditCount(premiumCredits)}</span>
                    </div>
                    <Progress value={100} className="h-2 bg-brand-pink/20" />
                  </div>
                )}
                
                <div className="text-sm mt-4">
                  <p className="mb-2">Usage breakdown (3:1 ratio):</p>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#ec4899]"></span>
                    <span>1 KOL query = 1 credit</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#6366f1]"></span>
                    <span>3 general queries = 1 credit</span>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="week" className="space-y-4">
            {/* Duplicate the day content here but with filtered data for week */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="col-span-1 md:col-span-2">
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={displayData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {displayData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Legend />
                    <RechartsTooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              
              <div className="space-y-4 flex flex-col justify-center">
                <div className="text-sm">
                  <p className="mb-2">Weekly usage summary:</p>
                  <div className="flex justify-between">
                    <span>KOL queries:</span>
                    <span>{stats.totalKolQueries}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>General queries:</span>
                    <span>{stats.totalGeneralQueries}</span>
                  </div>
                  <div className="flex justify-between font-medium mt-2">
                    <span>Credits used:</span>
                    <span>{stats.totalKolQueries + Math.floor(stats.totalGeneralQueries / 3)}</span>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="month" className="space-y-4">
            {/* Duplicate the day content here but with filtered data for month */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="col-span-1 md:col-span-2">
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={displayData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {displayData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Legend />
                    <RechartsTooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              
              <div className="space-y-4 flex flex-col justify-center">
                <div className="text-sm">
                  <p className="mb-2">Monthly usage summary:</p>
                  <div className="flex justify-between">
                    <span>KOL queries:</span>
                    <span>{stats.totalKolQueries}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>General queries:</span>
                    <span>{stats.totalGeneralQueries}</span>
                  </div>
                  <div className="flex justify-between font-medium mt-2">
                    <span>Total credits used:</span>
                    <span>{stats.totalKolQueries + Math.floor(stats.totalGeneralQueries / 3)}</span>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
