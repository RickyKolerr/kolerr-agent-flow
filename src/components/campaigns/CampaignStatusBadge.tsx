
import { Badge } from "@/components/ui/badge";
import { CampaignStatus } from "@/types/campaign";

interface CampaignStatusBadgeProps {
  status: CampaignStatus;
}

export const CampaignStatusBadge = ({ status }: CampaignStatusBadgeProps) => {
  const getStatusColor = (status: CampaignStatus) => {
    switch (status) {
      case "active":
        return "bg-green-500/10 text-green-500 hover:bg-green-500/20 border-green-500/20";
      case "draft":
        return "bg-gray-500/10 text-gray-500 hover:bg-gray-500/20 border-gray-500/20";
      case "completed":
        return "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20 border-blue-500/20";
      case "paused":
        return "bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20 border-yellow-500/20";
    }
  };

  return (
    <Badge variant="outline" className={getStatusColor(status)}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  );
};
