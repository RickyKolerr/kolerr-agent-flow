
import { Calendar, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Campaign } from "@/types/campaign";
import { useNavigate } from "react-router-dom";

interface CampaignListItemProps {
  campaign: Campaign;
  onCampaignClick: (id: string) => void;
  formatDate: (date: string) => string;
}

export const CampaignListItem = ({ 
  campaign, 
  onCampaignClick, 
  formatDate 
}: CampaignListItemProps) => {
  const navigate = useNavigate();
  
  const getStatusColor = (status: Campaign['status']) => {
    switch(status) {
      case 'active': return 'bg-green-500/10 text-green-500 hover:bg-green-500/20 border-green-500/20';
      case 'draft': return 'bg-gray-500/10 text-gray-500 hover:bg-gray-500/20 border-gray-500/20';
      case 'completed': return 'bg-blue-500/10 text-blue-500 hover:bg-blue-500/20 border-blue-500/20';
      case 'paused': return 'bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20 border-yellow-500/20';
    }
  };

  const handleViewDetails = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/campaigns/${campaign.id}`);
  };

  return (
    <Card 
      className="cursor-pointer hover:shadow-md transition-shadow"
      onClick={() => onCampaignClick(campaign.id)}
    >
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-medium">
            {campaign.title}
          </CardTitle>
          <Badge variant="outline" className={getStatusColor(campaign.status)}>
            {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Budget</span>
            <span className="font-medium">${campaign.budget.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Target Audience</span>
            <span className="font-medium">{campaign.audience}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Assigned KOLs</span>
            <span className="font-medium">{campaign.assignedKols.length}</span>
          </div>
          {campaign.status !== 'draft' && campaign.metrics && (
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Avg. Engagement</span>
              <span className="font-medium">{campaign.metrics.engagement}%</span>
            </div>
          )}
          <div className="flex justify-between items-center pt-2 border-t border-border">
            <div className="flex items-center text-xs text-muted-foreground">
              <Calendar className="mr-1 h-3 w-3" />
              <span>
                {formatDate(campaign.startDate)} - {formatDate(campaign.endDate)}
              </span>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-brand-pink"
              onClick={handleViewDetails}
            >
              Details <ArrowUpRight className="ml-1 h-3 w-3" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
