
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AssignedKOL } from "@/types/campaign";
import { User, Plus } from "lucide-react";

interface AssignKOLsProps {
  assignedKols: AssignedKOL[];
  onAssign: (kolId: string) => void;
}

export const AssignKOLs = ({ assignedKols, onAssign }: AssignKOLsProps) => {
  const [isAssigning, setIsAssigning] = useState(false);

  const getStatusColor = (status: AssignedKOL["status"]) => {
    switch (status) {
      case "accepted":
        return "bg-green-500/10 text-green-500";
      case "declined":
        return "bg-red-500/10 text-red-500";
      default:
        return "bg-yellow-500/10 text-yellow-500";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Assigned KOLs</span>
          <Button size="sm" onClick={() => setIsAssigning(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Assign KOL
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {assignedKols.map((kol) => (
            <div
              key={kol.id}
              className="flex items-center justify-between p-4 border rounded-lg"
            >
              <div className="flex items-center space-x-4">
                <User className="h-8 w-8 text-muted-foreground" />
                <div>
                  <p className="font-medium">{kol.name}</p>
                  <Badge variant="outline" className={getStatusColor(kol.status)}>
                    {kol.status}
                  </Badge>
                </div>
              </div>
              {kol.metrics && (
                <div className="text-sm text-muted-foreground">
                  <p>{kol.metrics.views.toLocaleString()} views</p>
                  <p>{kol.metrics.engagement.toFixed(2)}% engagement</p>
                </div>
              )}
            </div>
          ))}
          {assignedKols.length === 0 && (
            <p className="text-center text-muted-foreground py-4">
              No KOLs assigned to this campaign yet
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
