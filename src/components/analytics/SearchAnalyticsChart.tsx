
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartLegend, ChartTooltip } from "@/components/ui/chart";
import { LineChart } from "@/components/ui/LineChart";

interface SearchAnalyticsChartProps {
  data: Array<{
    date: string;
    searches: number;
    conversions: number;
  }>;
}

export const SearchAnalyticsChart = ({ data }: SearchAnalyticsChartProps) => {
  const valueFormatter = (value: number) => `${value}`;

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Search Activity</CardTitle>
      </CardHeader>
      <CardContent className="h-[300px]">
        <LineChart
          data={data}
          index="date"
          categories={["searches", "conversions"]}
          colors={["#8884d8", "#82ca9d"]}
          valueFormatter={valueFormatter}
          showLegend={true}
          yAxisWidth={40}
        />
      </CardContent>
    </Card>
  );
};
