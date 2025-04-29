
import { Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const CreateCollaborationCard = () => {
  return (
    <Card className="border-dashed">
      <CardHeader>
        <CardTitle>Create Your Own Collaboration</CardTitle>
        <CardDescription>
          Start a new collaboration opportunity with other creators
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center py-6">
        <Users className="h-12 w-12 text-muted-foreground mb-4" />
        <Button>
          Create Collaboration
        </Button>
      </CardContent>
    </Card>
  );
};
