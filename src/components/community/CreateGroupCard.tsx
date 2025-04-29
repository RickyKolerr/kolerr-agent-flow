
import { Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const CreateGroupCard = () => {
  return (
    <Card className="border-dashed hover-scale">
      <CardHeader>
        <CardTitle className="text-muted-foreground">Create New Group</CardTitle>
        <CardDescription>
          Start your own collaboration group with other creators
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center py-8">
        <Users className="h-12 w-12 text-muted-foreground mb-4" />
        <Button>
          Create Group
        </Button>
      </CardContent>
    </Card>
  );
};
