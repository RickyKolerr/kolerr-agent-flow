
import { ArrowDown, ArrowUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

interface PerformanceMetric {
  metric: string;
  value: number;
  change: number;
  unit: string;
}

interface PerformanceMetricsProps {
  data: PerformanceMetric[];
}

export function PerformanceMetrics({ data }: PerformanceMetricsProps) {
  const { t } = useLanguage();
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('analytics.performanceMetrics', 'Key Performance Indicators')}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {data.map((item, index) => (
            <div key={index} className="flex flex-col gap-1 p-4 border rounded-md">
              <div className="text-sm font-medium text-muted-foreground">
                {item.metric}
              </div>
              <div className="flex items-end gap-2">
                <div className="text-2xl font-bold">
                  {item.value}{item.unit}
                </div>
                <div className={`text-xs flex items-center ${item.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {item.change >= 0 ? (
                    <ArrowUp className="h-3 w-3 mr-1" />
                  ) : (
                    <ArrowDown className="h-3 w-3 mr-1" />
                  )}
                  {Math.abs(item.change)}{item.unit}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
