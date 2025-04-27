
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileSearch, Search } from "lucide-react";

export const SearchTutorial = () => {
  const steps = [
    {
      title: "Enter Keywords",
      description: "Start by entering relevant keywords about the type of KOL you're looking for",
    },
    {
      title: "Apply Filters",
      description: "Use filters to narrow down results by follower count, engagement rate, and location",
    },
    {
      title: "Review Results",
      description: "Analyze the search results and KOL profiles that match your criteria",
    },
    {
      title: "Save Searches",
      description: "Save your successful searches to quickly access them later",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center space-x-2">
          <Search className="h-5 w-5 text-brand-pink" />
          <CardTitle>Search Tutorial</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {steps.map((step, index) => (
            <div key={index} className="flex gap-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-pink/10 text-brand-pink">
                {index + 1}
              </div>
              <div>
                <h3 className="font-medium">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
