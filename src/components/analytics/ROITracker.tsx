
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ChartColumnIncreasing } from "lucide-react";

interface ROITrackerProps {
  data: Array<{
    campaign: string;
    spent: number;
    revenue: number;
    roi: number;
  }>;
}

export const ROITracker = ({ data }: ROITrackerProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ChartColumnIncreasing className="h-5 w-5" />
          ROI Tracking
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Campaign</TableHead>
              <TableHead className="text-right">Spent</TableHead>
              <TableHead className="text-right">Revenue</TableHead>
              <TableHead className="text-right">ROI</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.campaign}>
                <TableCell>{row.campaign}</TableCell>
                <TableCell className="text-right">${row.spent.toFixed(2)}</TableCell>
                <TableCell className="text-right">${row.revenue.toFixed(2)}</TableCell>
                <TableCell className="text-right">
                  <span className={row.roi >= 0 ? "text-green-600" : "text-red-600"}>
                    {row.roi.toFixed(1)}%
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
