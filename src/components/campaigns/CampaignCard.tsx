
import { BadgeDollarSign, Calendar, FileText, Check, Loader2, Eye } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface CampaignCardProps {
  campaign: {
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
  };
  onApply: (campaign: any) => void;
}

export function CampaignCard({ campaign, onApply }: CampaignCardProps) {
  const [isApplying, setIsApplying] = useState(false);
  const navigate = useNavigate();
  
  const handleApply = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent navigation when clicking apply button
    setIsApplying(true);
    
    // Simulate API call delay to show loading state
    setTimeout(() => {
      onApply(campaign);
      setIsApplying(false);
    }, 800);
    
    // When implementing real backend:
    // try {
    //   await applyToCampaign(campaign.id);
    //   onApply(campaign);
    // } catch (error) {
    //   console.error("Failed to apply:", error);
    //   // Handle error with toast notification
    // } finally {
    //   setIsApplying(false);
    // }
  };
  
  const handleViewCampaign = () => {
    navigate(`/campaigns/${campaign.id}`);
  };
  
  return (
    <Card className="overflow-hidden hover-scale cursor-pointer" onClick={handleViewCampaign}>
      <CardContent className="p-0">
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-2/3 p-6">
            <div className="flex items-center space-x-3 mb-3">
              <img 
                src={campaign.brandLogo} 
                alt={campaign.brand} 
                className="h-10 w-10 rounded-full"
              />
              <div>
                <h3 className="text-xl font-bold">{campaign.title}</h3>
                <p className="text-sm text-muted-foreground">{campaign.brand}</p>
              </div>
            </div>
            
            <p className="text-muted-foreground mb-4">{campaign.description}</p>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {campaign.categories.map(category => (
                <Badge key={category} variant="outline" className="capitalize">
                  {category}
                </Badge>
              ))}
              {campaign.platforms.map(platform => (
                <Badge key={platform} className="bg-brand-pink text-white capitalize">
                  {platform}
                </Badge>
              ))}
            </div>
            
            <div className="flex flex-wrap gap-x-4 gap-y-2 mt-2 text-sm">
              <div className="flex items-center">
                <BadgeDollarSign className="h-4 w-4 mr-1 text-brand-pink" />
                <span>${campaign.budget}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1 text-brand-pink" />
                <span>Due {new Date(campaign.deadline).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
          
          <div className="w-full md:w-1/3 bg-black/10 p-6 flex flex-col justify-between">
            <div>
              <div className="mb-4">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex items-center mb-2">
                        <FileText className="h-5 w-5 text-brand-pink mr-2" />
                        <span className="font-semibold">Compatibility Score</span>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>How well this campaign matches your profile and audience</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                
                <div className="w-full bg-gray-200 rounded-full h-2.5 mb-1">
                  <div 
                    className="bg-brand-pink h-2.5 rounded-full" 
                    style={{ width: `${campaign.compatibility}%` }}
                  />
                </div>
                <p className="text-sm text-right">{campaign.compatibility}%</p>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-medium">Requirements:</h4>
                <ul className="space-y-1">
                  {campaign.requirements.map((req, index) => (
                    <li key={index} className="flex items-center text-sm">
                      <Check className="h-4 w-4 mr-2 text-green-400" />
                      {req}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="mt-6 space-y-2">
              <Button 
                className="w-full bg-brand-pink hover:bg-brand-pink/90 text-white font-medium py-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
                onClick={handleApply}
                disabled={isApplying}
              >
                {isApplying ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Applying...
                  </>
                ) : (
                  "Apply Now"
                )}
              </Button>
              
              <Button 
                variant="outline"
                className="w-full flex items-center justify-center gap-2"
                onClick={(e) => {
                  e.stopPropagation();
                  handleViewCampaign();
                }}
              >
                <Eye className="h-4 w-4" />
                View Details
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
