
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText } from "lucide-react";

export const FeatureComparison = () => {
  const features = [
    {
      name: "Search Credits",
      free: "5 daily credits",
      pro: "Unlimited searches",
    },
    {
      name: "Advanced Filters",
      free: "Basic filters only",
      pro: "All filters included",
    },
    {
      name: "Saved Searches",
      free: "Up to 3 saved searches",
      pro: "Unlimited saved searches",
    },
    {
      name: "Analytics",
      free: "Basic metrics",
      pro: "Advanced analytics & reporting",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center space-x-2">
          <FileText className="h-5 w-5 text-brand-pink" />
          <CardTitle>Feature Comparison</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-4 font-medium">
            <div>Feature</div>
            <div>Free Plan</div>
            <div>Pro Plan</div>
          </div>
          {features.map((feature, index) => (
            <div key={index} className="grid grid-cols-3 gap-4 border-t pt-4">
              <div className="font-medium">{feature.name}</div>
              <div className="text-sm text-muted-foreground">{feature.free}</div>
              <div className="text-sm text-brand-pink">{feature.pro}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
