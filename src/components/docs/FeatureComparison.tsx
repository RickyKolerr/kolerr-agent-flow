
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText } from "lucide-react";

export const FeatureComparison = () => {
  const features = [
    {
      name: "Search Credits",
      free: "5 daily credits (resets at 7AM)",
      pro: "Up to 2000 monthly credits",
    },
    {
      name: "Search Results",
      free: "3 results for guests, limited view",
      pro: "Unlimited results with full details",
    },
    {
      name: "KOL Metrics",
      free: "Basic profile information",
      pro: "Detailed engagement & audience metrics",
    },
    {
      name: "General Questions",
      free: "15 questions daily (3:1 ratio)",
      pro: "Unlimited conversations",
    },
    {
      name: "Contact KOLs",
      free: "Limited (requires registration)",
      pro: "Unlimited direct messaging",
    },
    {
      name: "Result Analytics",
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
