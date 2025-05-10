
import { Badge } from "@/components/ui/badge";
import { CampaignStatus } from "@/types/campaign";
import { CheckCircle, PauseCircle, ClipboardEdit, CheckCircle2 } from "lucide-react";

interface CampaignStatusBadgeProps {
  status: CampaignStatus;
  showIcon?: boolean;
}

export const CampaignStatusBadge = ({ status, showIcon = true }: CampaignStatusBadgeProps) => {
  const getStatusConfig = (status: CampaignStatus) => {
    switch (status) {
      case "active":
        return {
          className: "bg-green-500/10 text-green-500 hover:bg-green-500/20 border-green-500/20",
          icon: <CheckCircle className="h-3.5 w-3.5 mr-1.5" />,
          label: "Active"
        };
      case "draft":
        return {
          className: "bg-gray-500/10 text-gray-500 hover:bg-gray-500/20 border-gray-500/20",
          icon: <ClipboardEdit className="h-3.5 w-3.5 mr-1.5" />,
          label: "Draft"
        };
      case "completed":
        return {
          className: "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20 border-blue-500/20",
          icon: <CheckCircle2 className="h-3.5 w-3.5 mr-1.5" />,
          label: "Completed"
        };
      case "paused":
        return {
          className: "bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20 border-yellow-500/20",
          icon: <PauseCircle className="h-3.5 w-3.5 mr-1.5" />,
          label: "Paused"
        };
    }
  };

  const { className, icon, label } = getStatusConfig(status);

  return (
    <Badge 
      variant="outline" 
      className={`flex items-center px-2.5 py-1 rounded-full ${className}`}
    >
      {showIcon && icon}
      <span className="font-medium">{label}</span>
    </Badge>
  );
};
