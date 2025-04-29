
import { SearchAnalyticsChart } from "@/components/analytics/SearchAnalyticsChart";
import { CreditUsageStats } from "@/components/analytics/CreditUsageStats";
import { ROITracker } from "@/components/analytics/ROITracker";
import { useCredits } from "@/contexts/CreditContext";

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
];

export default function AnalyticsPage() {
  const { freeCredits, premiumCredits, totalCredits } = useCredits();

  const creditCategories = [
    { name: "Basic Searches", usage: 45, total: 100 },
    { name: "Advanced Analytics", usage: 30, total: 50 },
    { name: "Campaign Analysis", usage: 15, total: 25 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Analytics Dashboard</h1>
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

      <ROITracker data={mockROIData} />
    </div>
  );
}
