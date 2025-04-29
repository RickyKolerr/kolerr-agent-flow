
import { Award, Calendar, Heart, Star, Users } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface CollaborationOpportunity {
  id: string;
  title: string;
  creator: string;
  creatorAvatar: string;
  description: string;
  platforms: string[];
  deadline: string;
  participants: number;
  maxParticipants: number;
}

interface CollaborationOpportunityCardProps {
  opportunity: CollaborationOpportunity;
  onJoin: (opportunity: CollaborationOpportunity) => void;
}

export const CollaborationOpportunityCard = ({ opportunity, onJoin }: CollaborationOpportunityCardProps) => {
  return (
    <Card key={opportunity.id} className="hover-scale">
      <CardContent className="p-0">
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-2/3 p-6">
            <div className="flex items-center space-x-3 mb-3">
              <Avatar>
                <AvatarImage src={opportunity.creatorAvatar} alt={opportunity.creator} />
                <AvatarFallback>{opportunity.creator.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-xl font-bold">{opportunity.title}</h3>
                <p className="text-sm text-muted-foreground">By {opportunity.creator}</p>
              </div>
            </div>
            
            <p className="text-muted-foreground mb-4">
              {opportunity.description}
            </p>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {opportunity.platforms.map(platform => (
                <Badge key={platform} className="bg-brand-pink text-white capitalize">
                  {platform}
                </Badge>
              ))}
            </div>
            
            <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1 text-brand-pink" />
                <span>Deadline: {new Date(opportunity.deadline).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-1 text-brand-pink" />
                <span>{opportunity.participants}/{opportunity.maxParticipants} Participants</span>
              </div>
            </div>
          </div>
          
          <div className="w-full md:w-1/3 bg-black/10 p-6 flex flex-col justify-between">
            <div>
              <div className="mb-4">
                <h4 className="font-medium text-sm mb-1">Benefits:</h4>
                <ul className="space-y-1">
                  <li className="text-sm flex items-center">
                    <Heart className="h-3 w-3 mr-1 text-brand-pink" />
                    Expanded audience reach
                  </li>
                  <li className="text-sm flex items-center">
                    <Star className="h-3 w-3 mr-1 text-brand-pink" />
                    Cross-promotion
                  </li>
                  <li className="text-sm flex items-center">
                    <Award className="h-3 w-3 mr-1 text-brand-pink" />
                    Collaboration points
                  </li>
                </ul>
              </div>
            </div>
            
            {opportunity.participants < opportunity.maxParticipants ? (
              <Button 
                className="w-full mt-6"
                onClick={() => onJoin(opportunity)}
              >
                Join Collaboration
              </Button>
            ) : (
              <Button 
                className="w-full mt-6"
                variant="outline"
                disabled
              >
                Collaboration Full
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
