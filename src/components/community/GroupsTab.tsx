
import { CollaborationGroupCard } from "./CollaborationGroupCard";
import { CreateGroupCard } from "./CreateGroupCard";
import { PopularDiscussions } from "./PopularDiscussions";

interface CollaborationGroup {
  id: string;
  name: string;
  description: string;
  members: number;
  category: string;
  recentActivity: string;
}

interface GroupsTabProps {
  groups: CollaborationGroup[];
  onJoinGroup: (group: CollaborationGroup) => void;
}

export const GroupsTab = ({ groups, onJoinGroup }: GroupsTabProps) => {
  return (
    <div className="space-y-6">
      {/* Collaboration groups */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {groups.map((group) => (
          <CollaborationGroupCard 
            key={group.id}
            group={group} 
            onJoin={onJoinGroup}
          />
        ))}
        
        {/* Create new group card */}
        <CreateGroupCard />
      </div>
      
      {/* Popular discussions */}
      <PopularDiscussions />
    </div>
  );
};
