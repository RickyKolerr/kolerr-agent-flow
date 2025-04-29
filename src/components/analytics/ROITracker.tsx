
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, Cell } from 'recharts';
import { TrendingUp, DollarSign, BarChart2, Percent } from "lucide-react";

interface ROIData {
  campaign: string;
  spent: number;
  revenue: number;
  roi: number;
}

interface ROITrackerProps {
  data: ROIData[];
}

export function ROITracker({ data }: ROITrackerProps) {
  const colors = ['#ec4899', '#8b5cf6', '#3b82f6', '#10b981', '#f97316'];

  const totalSpent = data.reduce((sum, item) => sum + item.spent, 0);
  const totalRevenue = data.reduce((sum, item) => sum + item.revenue, 0);
  const averageROI = data.reduce((sum, item) => sum + item.roi, 0) / data.length;

  const formattedData = data.map(item => ({
    ...item,
    revenue: item.revenue,
    roi: parseFloat(item.roi.toFixed(1))
  }));

  return (
    <Card className="col-span-full">
      <CardHeader className="pb-3 flex flex-row items-center justify-between">
        <div>
          <CardTitle className="flex items-center text-xl font-semibold">
            <TrendingUp className="mr-2 h-5 w-5 text-brand-pink" />
            ROI Tracker
          </CardTitle>
          <CardDescription>
            Monitor your campaign performance and return on investment
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-3 mb-6">
          <Card>
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Total Spent</p>
                <h3 className="text-2xl font-bold">${totalSpent.toLocaleString()}</h3>
              </div>
              <DollarSign className="h-8 w-8 text-muted-foreground/30" />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Total Revenue</p>
                <h3 className="text-2xl font-bold">${totalRevenue.toLocaleString()}</h3>
              </div>
              <BarChart2 className="h-8 w-8 text-muted-foreground/30" />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Average ROI</p>
                <h3 className="text-2xl font-bold">{averageROI.toFixed(1)}%</h3>
              </div>
              <Percent className="h-8 w-8 text-muted-foreground/30" />
            </CardContent>
          </Card>
        </div>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={formattedData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <XAxis dataKey="campaign" />
              <YAxis yAxisId="left" orientation="left" stroke="#888888" />
              <YAxis yAxisId="right" orientation="right" stroke="#ec4899" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1f2937', 
                  borderColor: '#374151',
                  color: '#f3f4f6',
                  borderRadius: '8px',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                }}
                itemStyle={{ color: '#f3f4f6' }}
              />
              <Legend />
              <Bar 
                yAxisId="left" 
                dataKey="spent" 
                name="Invested ($)" 
                fill="#8b5cf6"
              />
              <Bar 
                yAxisId="left" 
                dataKey="revenue" 
                name="Revenue ($)" 
                fill="#10b981" 
              />
              <Bar
                yAxisId="right"
                dataKey="roi"
                name="ROI (%)"
                fill="#ec4899"
                radius={[4, 4, 0, 0]}
              >
                {data.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
