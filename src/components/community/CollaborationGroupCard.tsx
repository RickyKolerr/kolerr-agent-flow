
import { Calendar, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface CollaborationGroup {
  id: string;
  name: string;
  description: string;
  members: number;
  category: string;
  recentActivity: string;
}

interface CollaborationGroupCardProps {
  group: CollaborationGroup;
  onJoin: (group: CollaborationGroup) => void;
}

export const CollaborationGroupCard = ({ group, onJoin }: CollaborationGroupCardProps) => {
  return (
    <Card key={group.id} className="hover-scale">
      <CardHeader>
        <CardTitle>{group.name}</CardTitle>
        <CardDescription className="flex items-center gap-1">
          <Users className="h-3 w-3" />
          <span>{group.members} members</span>
          <span className="text-muted-foreground mx-1">•</span>
          <Badge variant="outline" className="capitalize">
            {group.category}
          </Badge>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm line-clamp-3 mb-4">
          {group.description}
        </p>
        <div className="flex items-center text-xs text-muted-foreground">
          <Calendar className="h-3 w-3 mr-1" />
          <span>Active {group.recentActivity}</span>
        </div>
      </CardContent>
      <CardFooter className="border-t pt-4 flex justify-end">
        <Button onClick={() => onJoin(group)}>
          Join Group
        </Button>
      </CardFooter>
    </Card>
  );
};
