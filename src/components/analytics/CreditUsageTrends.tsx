
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useCredits } from "@/contexts/CreditContext";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AverageUsageStats } from "./AverageUsageStats";

export function CreditUsageTrends() {
  const { getCreditHistory, checkMessageCredit } = useCredits();
  const [timeRange, setTimeRange] = useState<"day" | "week" | "month">("week");
  const [chartData, setChartData] = useState<any[]>([]);
  const [averageStats, setAverageStats] = useState({
    avgQueryCost: 0,
    kolQueryPercentage: 0,
    peakUsageHour: 0,
    queryVolume: 0
  });
  
  useEffect(() => {
    const creditHistory = getCreditHistory();
    
    if (creditHistory.length === 0) {
      return;
    }
    
    // Filter data by time range
    const now = Date.now();
    const filterTime = {
      day: now - 24 * 60 * 60 * 1000,
      week: now - 7 * 24 * 60 * 60 * 1000,
      month: now - 30 * 24 * 60 * 60 * 1000
    };
    
    const filteredHistory = creditHistory.filter(item => item.timestamp >= filterTime[timeRange]);
    
    // Process data for charts based on time range
    let processedData: any[] = [];
    let hourCounts: Record<number, number> = {};
    let totalCost = 0;
    let kolQueryCount = 0;
    
    if (timeRange === "day") {
      // Group by hour for day view
      const hourlyData: Record<number, { kol: number, general: number, total: number }> = {};
      
      filteredHistory.forEach(item => {
        const hour = new Date(item.timestamp).getHours();
        if (!hourlyData[hour]) {
          hourlyData[hour] = { kol: 0, general: 0, total: 0 };
        }
        
        if (item.type === "kol") {
          hourlyData[hour].kol += 1;
          kolQueryCount++;
        } else {
          hourlyData[hour].general += 1;
        }
        
        hourlyData[hour].total += 1;
        hourCounts[hour] = (hourCounts[hour] || 0) + 1;
        totalCost += item.creditCost;
      });
      
      // Convert to array for chart
      processedData = Object.keys(hourlyData).map(hour => ({
        name: `${hour}:00`,
        kol: hourlyData[parseInt(hour)].kol,
        general: hourlyData[parseInt(hour)].general,
        total: hourlyData[parseInt(hour)].total
      }));
    } else if (timeRange === "week") {
      // Group by day for week view
      const dailyData: Record<string, { kol: number, general: number, total: number }> = {};
      
      filteredHistory.forEach(item => {
        const date = new Date(item.timestamp);
        const day = date.toLocaleDateString('en-US', { weekday: 'short' });
        const hour = date.getHours();
        
        if (!dailyData[day]) {
          dailyData[day] = { kol: 0, general: 0, total: 0 };
        }
        
        if (item.type === "kol") {
          dailyData[day].kol += 1;
          kolQueryCount++;
        } else {
          dailyData[day].general += 1;
        }
        
        dailyData[day].total += 1;
        hourCounts[hour] = (hourCounts[hour] || 0) + 1;
        totalCost += item.creditCost;
      });
      
      // Convert to array for chart
      const daysOrder = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      
      processedData = daysOrder.map(day => ({
        name: day,
        kol: dailyData[day]?.kol || 0,
        general: dailyData[day]?.general || 0,
        total: dailyData[day]?.total || 0
      }));
    } else {
      // Group by week for month view
      const weeklyData: Record<number, { kol: number, general: number, total: number }> = {};
      
      filteredHistory.forEach(item => {
        const date = new Date(item.timestamp);
        const weekNumber = Math.floor((date.getDate() - 1) / 7) + 1;
        const hour = date.getHours();
        
        if (!weeklyData[weekNumber]) {
          weeklyData[weekNumber] = { kol: 0, general: 0, total: 0 };
        }
        
        if (item.type === "kol") {
          weeklyData[weekNumber].kol += 1;
          kolQueryCount++;
        } else {
          weeklyData[weekNumber].general += 1;
        }
        
        weeklyData[weekNumber].total += 1;
        hourCounts[hour] = (hourCounts[hour] || 0) + 1;
        totalCost += item.creditCost;
      });
      
      // Convert to array for chart
      processedData = Object.keys(weeklyData).map(week => ({
        name: `Week ${week}`,
        kol: weeklyData[parseInt(week)].kol,
        general: weeklyData[parseInt(week)].general,
        total: weeklyData[parseInt(week)].total
      }));
    }
    
    setChartData(processedData);
    
    // Calculate statistics
    const avgQueryCost = filteredHistory.length > 0 ? totalCost / filteredHistory.length : 0;
    const kolQueryPercentage = filteredHistory.length > 0 ? (kolQueryCount / filteredHistory.length) * 100 : 0;
    
    // Find peak usage hour
    let peakHour = 0;
    let maxCount = 0;
    
    Object.keys(hourCounts).forEach(hour => {
      if (hourCounts[parseInt(hour)] > maxCount) {
        maxCount = hourCounts[parseInt(hour)];
        peakHour = parseInt(hour);
      }
    });
    
    setAverageStats({
      avgQueryCost,
      kolQueryPercentage,
      peakUsageHour: peakHour,
      queryVolume: filteredHistory.length
    });
    
  }, [timeRange, getCreditHistory]);
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Credit Usage Trends</CardTitle>
        <CardDescription>
          Analyze your search credit usage patterns over time
        </CardDescription>
        <div className="flex justify-between items-center">
          <Tabs defaultValue="bar" className="w-[200px]">
            <TabsList>
              <TabsTrigger value="bar">Bar</TabsTrigger>
              <TabsTrigger value="line">Line</TabsTrigger>
            </TabsList>
          </Tabs>
          
          <Select 
            value={timeRange} 
            onValueChange={(value) => setTimeRange(value as "day" | "week" | "month")}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Time Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="day">Last 24 Hours</SelectItem>
              <SelectItem value="week">Last Week</SelectItem>
              <SelectItem value="month">Last Month</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent className="pt-2">
        <Tabs defaultValue="bar">
          <TabsContent value="bar" className="space-y-4">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="kol" name="KOL Queries" fill="#ec4899" />
                  <Bar dataKey="general" name="General Queries" fill="#6366f1" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            
            <AverageUsageStats stats={averageStats} />
          </TabsContent>
          
          <TabsContent value="line" className="space-y-4">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="total" 
                    name="Total Queries" 
                    stroke="#2563eb" 
                    activeDot={{ r: 8 }} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="kol" 
                    name="KOL Queries" 
                    stroke="#ec4899" 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="general" 
                    name="General Queries"  
                    stroke="#6366f1" 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            
            <AverageUsageStats stats={averageStats} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
