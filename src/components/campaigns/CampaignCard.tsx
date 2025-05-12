
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Calendar, Clock, Users, ChevronRight, DollarSign, Edit, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface CampaignProps {
  id: string;
  title: string;
  brand: string;
  brandLogo: string;
  description: string;
  budget: string;
  compatibility: number;
  deadline: string;
  platforms: string[];
  categories: string[];
  requirements: string[];
  status: string;
  applications?: number;
  kols?: number;
  startDate?: string;
  endDate?: string;
  goals?: string[];
  progress?: number;
}

interface CampaignCardProps {
  campaign: CampaignProps;
  onApply: (campaign: CampaignProps) => void;
  disableApply?: boolean;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export const CampaignCard = ({ 
  campaign, 
  onApply, 
  disableApply = false,
  onEdit,
  onDelete
}: CampaignCardProps) => {
  const navigate = useNavigate();
  const {
    id,
    title,
    brand,
    brandLogo,
    description,
    budget,
    compatibility,
    deadline,
    platforms,
    categories,
    requirements,
    status,
    applications,
    kols,
    progress
  } = campaign;
  
  // Truncate description if it's too long
  const truncatedDescription = description.length > 100 
    ? `${description.substring(0, 100)}...` 
    : description;
    
  // Format the compatibility score color
  const getCompatibilityColor = () => {
    if (compatibility >= 90) return "text-green-500";
    if (compatibility >= 70) return "text-amber-500";
    return "text-red-500";
  };

  // Navigate to campaign details page
  const handleViewDetails = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click event
    navigate(`/campaigns/${id}`);
  };

  // Handle edit button click
  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onEdit) onEdit(id);
  };

  // Handle delete button click
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onDelete) onDelete(id);
  };

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <img 
              src={brandLogo} 
              alt={brand} 
              className="h-10 w-10 rounded-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "https://ui-avatars.com/api/?name=" + encodeURIComponent(brand) + "&background=0D8ABC&color=fff";
              }}
            />
            <div>
              <h3 className="font-bold text-lg">{title}</h3>
              <p className="text-sm text-muted-foreground">{brand}</p>
            </div>
          </div>
          
          <p className="text-sm text-muted-foreground mb-4">{truncatedDescription}</p>
          
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="flex items-center text-sm">
              <DollarSign className="h-4 w-4 mr-1 text-green-600" />
              <span>{budget}</span>
            </div>
            <div className="flex items-center text-sm">
              <Clock className="h-4 w-4 mr-1 text-amber-500" />
              <span>Due {new Date(deadline).toLocaleDateString()}</span>
            </div>
            
            {(applications !== undefined && kols !== undefined) && (
              <>
                <div className="flex items-center text-sm">
                  <Users className="h-4 w-4 mr-1 text-blue-500" />
                  <span>{applications} Applications</span>
                </div>
                <div className="flex items-center text-sm">
                  <Users className="h-4 w-4 mr-1 text-purple-500" />
                  <span>{kols} KOLs Selected</span>
                </div>
              </>
            )}
          </div>
          
          <div className="flex flex-wrap gap-1 mb-4">
            {platforms.map((platform) => (
              <Badge key={platform} variant="outline" className="bg-blue-500/10 text-blue-500 border-blue-500/20">
                {platform}
              </Badge>
            ))}
            {categories.slice(0, 2).map((category) => (
              <Badge key={category} variant="outline" className="capitalize">
                {category}
              </Badge>
            ))}
          </div>
          
          {progress !== undefined && (
            <div className="mb-4">
              <div className="flex justify-between text-sm mb-1">
                <span>Campaign Progress</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          )}
          
          <div className="flex justify-between mt-6">
            {!disableApply ? (
              <>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1 mr-2"
                  onClick={handleViewDetails}
                >
                  Details
                </Button>
                <Button 
                  size="sm" 
                  className="flex-1 bg-brand-pink hover:bg-brand-pink/90"
                  onClick={(e) => {
                    e.stopPropagation();
                    onApply(campaign);
                  }}
                >
                  Apply Now
                </Button>
              </>
            ) : (
              // For brands - show management buttons
              <div className="w-full flex gap-2">
                <Button 
                  variant="default" 
                  size="sm"
                  className="flex-1"
                  onClick={handleViewDetails}
                >
                  View Details
                </Button>
                {onEdit && (
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={handleEdit}
                    className="px-3"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                )}
                {onDelete && (
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={handleDelete}
                    className="px-3 text-red-500 hover:text-red-600"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
