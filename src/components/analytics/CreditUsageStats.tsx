
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface CreditUsageStatsProps {
  totalCredits: number;
  usedCredits: number;
  categories: Array<{
    name: string;
    usage: number;
    total: number;
  }>;
}

export const CreditUsageStats = ({ totalCredits, usedCredits, categories }: CreditUsageStatsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Credit Usage</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span>Total Usage</span>
              <span className="font-medium">{usedCredits} / {totalCredits}</span>
            </div>
            <Progress value={(usedCredits / totalCredits) * 100} className="h-2" />
          </div>
          
          <div className="space-y-3">
            {categories.map((category) => (
              <div key={category.name} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>{category.name}</span>
                  <span className="font-medium">{category.usage} / {category.total}</span>
                </div>
                <Progress value={(category.usage / category.total) * 100} className="h-1" />
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
