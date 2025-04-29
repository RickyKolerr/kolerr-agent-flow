
import { useState } from "react";
import { BarChart3, PieChart, TrendingUp, Database } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/contexts/LanguageContext";
import { SearchAnalyticsChart } from "@/components/analytics/SearchAnalyticsChart";
import { CreditUsageStats } from "@/components/analytics/CreditUsageStats";
import { ROITracker } from "@/components/analytics/ROITracker";
import { useCredits } from "@/contexts/CreditContext";
import { PerformanceMetrics } from "@/components/analytics/PerformanceMetrics";

// Sample data for the charts
const mockSearchData = [
  { date: "2024-01", searches: 120, conversions: 45 },
  { date: "2024-02", searches: 180, conversions: 65 },
  { date: "2024-03", searches: 240, conversions: 90 },
  { date: "2024-04", searches: 300, conversions: 120 },
];

const mockROIData = [
  { campaign: "Influencer Campaign Q1", spent: 5000, revenue: 15000, roi: 200 },
  { campaign: "Brand Awareness Q1", spent: 3000, revenue: 8000, roi: 166.7 },
  { campaign: "Product Launch", spent: 10000, revenue: 25000, roi: 150 },
  { campaign: "Social Media Push", spent: 4000, revenue: 12000, roi: 200 },
];

const mockPerformanceData = [
  { metric: "Engagement Rate", value: 4.8, change: 0.5, unit: "%" },
  { metric: "Click-through Rate", value: 2.3, change: 0.2, unit: "%" },
  { metric: "Conversion Rate", value: 1.7, change: -0.3, unit: "%" },
  { metric: "Avg. Session Duration", value: 3.5, change: 0.8, unit: "min" },
];

export default function AnalyticsPage() {
  const { t } = useLanguage();
  const { freeCredits, premiumCredits, totalCredits } = useCredits();
  const [timeframe, setTimeframe] = useState<"week" | "month" | "quarter" | "year">("month");

  const creditCategories = [
    { name: "Basic Searches", usage: 45, total: 100 },
    { name: "Advanced Analytics", usage: 30, total: 50 },
    { name: "Campaign Analysis", usage: 15, total: 25 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">{t('analytics.title', 'Analytics Dashboard')}</h1>
        
        <div className="flex gap-2">
          <Tabs defaultValue={timeframe} onValueChange={(v) => setTimeframe(v as any)}>
            <TabsList>
              <TabsTrigger value="week">{t('analytics.timeframe.week', 'Week')}</TabsTrigger>
              <TabsTrigger value="month">{t('analytics.timeframe.month', 'Month')}</TabsTrigger>
              <TabsTrigger value="quarter">{t('analytics.timeframe.quarter', 'Quarter')}</TabsTrigger>
              <TabsTrigger value="year">{t('analytics.timeframe.year', 'Year')}</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t('analytics.metrics.totalSearches', 'Total Searches')}
            </CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">840</div>
            <p className="text-xs text-muted-foreground">
              +20.1% {t('analytics.fromPrevious', 'from previous period')}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t('analytics.metrics.conversionRate', 'Conversion Rate')}
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">38.2%</div>
            <p className="text-xs text-muted-foreground">
              +2.5% {t('analytics.fromPrevious', 'from previous period')}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t('analytics.metrics.roi', 'ROI')}
            </CardTitle>
            <PieChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">179.2%</div>
            <p className="text-xs text-muted-foreground">
              +12.3% {t('analytics.fromPrevious', 'from previous period')}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t('analytics.metrics.creditsUsed', 'Credits Used')}
            </CardTitle>
            <Database className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCredits - (freeCredits + premiumCredits)}</div>
            <p className="text-xs text-muted-foreground">
              {Math.round(((totalCredits - (freeCredits + premiumCredits)) / totalCredits) * 100)}% {t('analytics.ofTotal', 'of total')}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <SearchAnalyticsChart data={mockSearchData} />
        
        <div className="space-y-6">
          <CreditUsageStats
            totalCredits={totalCredits}
            usedCredits={totalCredits - (freeCredits + premiumCredits)}
            categories={creditCategories}
          />
        </div>
      </div>

      <PerformanceMetrics data={mockPerformanceData} />
      
      <ROITracker data={mockROIData} />
    </div>
  );
}
