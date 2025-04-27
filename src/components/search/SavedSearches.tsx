
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookmarkIcon, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface SavedSearch {
  id: string;
  query: string;
  date: string;
  filters: string[];
}

export const SavedSearches = () => {
  const [searches, setSearches] = useState<SavedSearch[]>([
    {
      id: "1",
      query: "Fashion influencers",
      date: "2024-04-25",
      filters: ["Followers > 10k", "Engagement > 5%"]
    },
    {
      id: "2",
      query: "Tech reviewers",
      date: "2024-04-24",
      filters: ["Niche: Technology", "Location: US"]
    }
  ]);

  const handleDelete = (id: string) => {
    setSearches(searches.filter(search => search.id !== id));
    toast.success("Search deleted successfully");
  };

  const handleApply = (query: string) => {
    toast.success("Search applied successfully");
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center space-x-2">
          <BookmarkIcon className="h-5 w-5 text-muted-foreground" />
          <CardTitle>Saved Searches</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {searches.map((search) => (
            <div 
              key={search.id}
              className="flex items-start justify-between p-4 rounded-lg border"
            >
              <div className="space-y-1">
                <p className="font-medium">{search.query}</p>
                <p className="text-sm text-muted-foreground">
                  {search.filters.join(" • ")}
                </p>
                <p className="text-xs text-muted-foreground">
                  Saved on {search.date}
                </p>
              </div>
              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleApply(search.query)}
                >
                  Apply
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleDelete(search.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
