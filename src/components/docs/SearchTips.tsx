
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileSearch } from "lucide-react";

export const SearchTips = () => {
  const tips = [
    {
      title: "Use Specific Keywords",
      description: "Include niche-specific terms and relevant hashtags in your search",
    },
    {
      title: "Combine Filters",
      description: "Use multiple filters together to find the most relevant KOLs",
    },
    {
      title: "Check Engagement",
      description: "Look for consistent engagement rates rather than just follower count",
    },
    {
      title: "Review Content Style",
      description: "Ensure the KOL's content style matches your brand's tone",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center space-x-2">
          <FileSearch className="h-5 w-5 text-brand-pink" />
          <CardTitle>Search Tips</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {tips.map((tip, index) => (
            <div key={index} className="space-y-2">
              <h3 className="font-medium">{tip.title}</h3>
              <p className="text-sm text-muted-foreground">{tip.description}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
