
import { MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export const PopularDiscussions = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Popular Discussions</CardTitle>
        <CardDescription>
          Recent active topics from collaboration groups
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between pb-3 border-b">
            <div>
              <p className="font-medium">Tips for creator-brand negotiations</p>
              <p className="text-xs text-muted-foreground">
                Fashion & Beauty Creators • 42 replies • Updated 3 hours ago
              </p>
            </div>
            <Button variant="ghost" size="sm" className="text-brand-pink">
              <MessageSquare className="h-4 w-4 mr-1" />
              View
            </Button>
          </div>
          
          <div className="flex justify-between pb-3 border-b">
            <div>
              <p className="font-medium">Content planning for holiday season</p>
              <p className="text-xs text-muted-foreground">
                Fitness Influencer Network • 28 replies • Updated 1 day ago
              </p>
            </div>
            <Button variant="ghost" size="sm" className="text-brand-pink">
              <MessageSquare className="h-4 w-4 mr-1" />
              View
            </Button>
          </div>
          
          <div className="flex justify-between pb-3">
            <div>
              <p className="font-medium">Best practices for cross-platform content</p>
              <p className="text-xs text-muted-foreground">
                Travel Content Collective • 36 replies • Updated 2 days ago
              </p>
            </div>
            <Button variant="ghost" size="sm" className="text-brand-pink">
              <MessageSquare className="h-4 w-4 mr-1" />
              View
            </Button>
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t pt-4">
        <Button variant="outline" className="w-full">
          View All Discussions
        </Button>
      </CardFooter>
    </Card>
  );
};
