
import React from 'react';
import { Calendar, Users, Star, Medal, Eye } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Campaign {
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
}

interface CampaignCardProps {
  campaign: Campaign;
  onApply: (campaign: Campaign) => void;
  onViewCampaign?: (campaignId: string) => void;
}

export const CampaignCard = ({ campaign, onApply, onViewCampaign }: CampaignCardProps) => {
  return (
    <Card key={campaign.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <CardContent className="p-0">
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-2/3 p-6">
            <div className="flex items-center space-x-3 mb-3">
              <Avatar>
                <AvatarImage src={campaign.brandLogo} alt={campaign.brand} />
                <AvatarFallback>{campaign.brand.substring(0, 2)}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-lg font-bold">{campaign.title}</h3>
                <p className="text-sm text-muted-foreground">by {campaign.brand}</p>
              </div>
            </div>
            
            <p className="text-muted-foreground mb-4">
              {campaign.description}
            </p>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {campaign.platforms.map(platform => (
                <Badge key={platform} variant="outline" className="capitalize">
                  {platform}
                </Badge>
              ))}
              
              {campaign.categories.map(category => (
                <Badge key={category} className="bg-brand-pink/20 text-brand-pink capitalize">
                  {category}
                </Badge>
              ))}
            </div>
            
            <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1 text-brand-pink" />
                <span>Deadline: {campaign.deadline}</span>
              </div>
              
              {campaign.requirements && (
                <div className="flex items-center">
                  <Medal className="h-4 w-4 mr-1 text-brand-pink" />
                  <span>{campaign.requirements.join(", ")}</span>
                </div>
              )}
            </div>
          </div>
          
          <div className="w-full md:w-1/3 bg-black/5 p-6 flex flex-col justify-between">
            <div>
              <div className="mb-4">
                <h4 className="font-medium text-sm mb-1">Budget:</h4>
                <p className="text-xl font-bold">${campaign.budget}</p>
              </div>
              
              <div className="mb-6">
                <div className="flex items-center space-x-1 mb-1">
                  <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                  <h4 className="font-medium text-sm">Match Score:</h4>
                </div>
                <div className="flex items-center">
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                    <div 
                      className={`h-2.5 rounded-full ${
                        campaign.compatibility > 90 ? 'bg-green-500' : 
                        campaign.compatibility > 75 ? 'bg-yellow-500' : 'bg-orange-500'
                      }`}
                      style={{ width: `${campaign.compatibility}%` }}
                    ></div>
                  </div>
                  <span className={`text-sm font-medium ${
                    campaign.compatibility > 90 ? 'text-green-500' : 
                    campaign.compatibility > 75 ? 'text-yellow-500' : 'text-orange-500'
                  }`}>{campaign.compatibility}%</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              {onViewCampaign && (
                <Button 
                  variant="ghost" 
                  className="w-full flex items-center justify-center" 
                  onClick={() => onViewCampaign(campaign.id)}
                >
                  <Eye className="h-4 w-4 mr-2" />
                  View Campaign
                </Button>
              )}
              
              <Button 
                className="w-full bg-brand-pink hover:bg-brand-pink/90"
                onClick={() => onApply(campaign)}
              >
                Apply Now
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
