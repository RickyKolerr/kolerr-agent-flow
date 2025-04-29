
import { CollaborationOpportunityCard } from "./CollaborationOpportunityCard";
import { CreateCollaborationCard } from "./CreateCollaborationCard";

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

interface OpportunitiesTabProps {
  opportunities: CollaborationOpportunity[];
  onJoinCollaboration: (opportunity: CollaborationOpportunity) => void;
}

export const OpportunitiesTab = ({ opportunities, onJoinCollaboration }: OpportunitiesTabProps) => {
  return (
    <div className="space-y-6">
      {/* Collaboration opportunities */}
      <div className="grid gap-4">
        {opportunities.map((opportunity) => (
          <CollaborationOpportunityCard
            key={opportunity.id}
            opportunity={opportunity}
            onJoin={onJoinCollaboration}
          />
        ))}
      </div>
      
      {/* Create collaboration */}
      <CreateCollaborationCard />
    </div>
  );
};
