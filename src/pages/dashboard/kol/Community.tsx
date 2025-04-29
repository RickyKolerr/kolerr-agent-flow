
import { useState } from "react";
import { MessageCircle } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { CreatorsTab } from "@/components/community/CreatorsTab";
import { GroupsTab } from "@/components/community/GroupsTab";
import { OpportunitiesTab } from "@/components/community/OpportunitiesTab";

// Mock creators data
const mockCreators = [
  {
    id: "c1",
    name: "Alex Thompson",
    username: "@alexcreates",
    avatar: "https://ui-avatars.com/api/?name=Alex+Thompson&background=random",
    followers: 245000,
    niche: ["fashion", "lifestyle"],
    tier: "Gold",
    bio: "Fashion blogger and lifestyle influencer based in New York. Sharing daily outfit inspirations and fashion tips.",
    compatibility: 92,
    platforms: ["tiktok", "instagram"],
    connected: false
  },
  {
    id: "c2",
    name: "Maria Rodriguez",
    username: "@mariarodriguezbeauty",
    avatar: "https://ui-avatars.com/api/?name=Maria+Rodriguez&background=random",
    followers: 189000,
    niche: ["beauty", "skincare", "lifestyle"],
    tier: "Gold",
    bio: "Beauty expert and skincare enthusiast. Creating content to help you look and feel your best.",
    compatibility: 85,
    platforms: ["instagram", "youtube"],
    connected: true
  },
  {
    id: "c3",
    name: "David Kim",
    username: "@davidgaming",
    avatar: "https://ui-avatars.com/api/?name=David+Kim&background=random",
    followers: 320000,
    niche: ["gaming", "tech"],
    tier: "Platinum",
    bio: "Gaming content creator and tech enthusiast. Weekly game reviews and tech tips.",
    compatibility: 65,
    platforms: ["tiktok", "youtube", "twitch"],
    connected: false
  },
  {
    id: "c4",
    name: "Sarah Johnson",
    username: "@sarahtravels",
    avatar: "https://ui-avatars.com/api/?name=Sarah+Johnson&background=random",
    followers: 175000,
    niche: ["travel", "photography"],
    tier: "Silver",
    bio: "Travel vlogger exploring new destinations every month. Sharing travel tips and photography insights.",
    compatibility: 78,
    platforms: ["instagram", "youtube"],
    connected: false
  },
  {
    id: "c5",
    name: "James Wilson",
    username: "@fitwithjames",
    avatar: "https://ui-avatars.com/api/?name=James+Wilson&background=random",
    followers: 210000,
    niche: ["fitness", "wellness", "nutrition"],
    tier: "Gold",
    bio: "Certified fitness trainer sharing workout routines, wellness tips, and healthy recipes.",
    compatibility: 90,
    platforms: ["instagram", "tiktok"],
    connected: true
  },
  {
    id: "c6",
    name: "Emma Davis",
    username: "@emmacooks",
    avatar: "https://ui-avatars.com/api/?name=Emma+Davis&background=random",
    followers: 165000,
    niche: ["food", "cooking", "wellness"],
    tier: "Silver",
    bio: "Recipe developer and home cook. Sharing quick, healthy, and delicious recipes for busy people.",
    compatibility: 75,
    platforms: ["instagram", "tiktok", "youtube"],
    connected: false
  }
];

// Mock collaboration groups
const collaborationGroups = [
  {
    id: "g1",
    name: "Fashion & Beauty Creators",
    description: "A group for fashion and beauty creators to collaborate, share tips, and support each other.",
    members: 24,
    category: "fashion",
    recentActivity: "15 min ago"
  },
  {
    id: "g2",
    name: "Travel Content Collective",
    description: "Connect with fellow travel content creators for collaborations, location tips, and content strategies.",
    members: 18,
    category: "travel",
    recentActivity: "2 hours ago"
  },
  {
    id: "g3",
    name: "Fitness Influencer Network",
    description: "For fitness creators to discuss workout trends, nutrition tips, and potential cross-promotions.",
    members: 31,
    category: "fitness",
    recentActivity: "1 day ago"
  }
];

// Mock collaboration opportunities
const collaborationOpportunities = [
  {
    id: "o1",
    title: "Joint Fashion Haul",
    creator: "Alex Thompson",
    creatorAvatar: "https://ui-avatars.com/api/?name=Alex+Thompson&background=random",
    description: "Looking for 1-2 other fashion creators for a collaborative try-on haul featuring sustainable brands.",
    platforms: ["tiktok", "instagram"],
    deadline: "2023-08-10",
    participants: 1,
    maxParticipants: 3
  },
  {
    id: "o2",
    title: "Travel Vlog Series",
    creator: "Sarah Johnson",
    creatorAvatar: "https://ui-avatars.com/api/?name=Sarah+Johnson&background=random",
    description: "Planning a collaborative travel series with 2-3 other travel creators. Each episode will feature a different destination.",
    platforms: ["youtube"],
    deadline: "2023-08-20",
    participants: 2,
    maxParticipants: 4
  },
  {
    id: "o3",
    title: "Fitness Challenge",
    creator: "James Wilson",
    creatorAvatar: "https://ui-avatars.com/api/?name=James+Wilson&background=random",
    description: "Creating a 7-day fitness challenge with multiple trainers. Each day features a different workout style.",
    platforms: ["instagram", "tiktok"],
    deadline: "2023-08-15",
    participants: 3,
    maxParticipants: 5
  }
];

const Community = () => {
  const [activeTab, setActiveTab] = useState("creators");
  
  const handleConnectCreator = (creator: any) => {
    toast.success(`Connection request sent to ${creator.name}`, {
      description: "You'll be notified when they respond."
    });
  };
  
  const handleJoinGroup = (group: any) => {
    toast.success(`Joined ${group.name}`, {
      description: "You can now participate in group discussions."
    });
  };
  
  const handleJoinCollaboration = (opportunity: any) => {
    toast.success(`Joined collaboration: ${opportunity.title}`, {
      description: `You'll be connected with ${opportunity.creator} to discuss details.`
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <MessageCircle className="h-6 w-6 text-brand-pink" />
        <h1 className="text-2xl font-bold tracking-tight">Creator Community</h1>
      </div>
      
      <Tabs defaultValue="creators" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="creators">Creators</TabsTrigger>
          <TabsTrigger value="groups">Collaboration Groups</TabsTrigger>
          <TabsTrigger value="opportunities">Collaboration Opportunities</TabsTrigger>
        </TabsList>
        
        <TabsContent value="creators" className="space-y-6 mt-6">
          <CreatorsTab creators={mockCreators} onConnectCreator={handleConnectCreator} />
        </TabsContent>
        
        <TabsContent value="groups" className="space-y-6 mt-6">
          <GroupsTab groups={collaborationGroups} onJoinGroup={handleJoinGroup} />
        </TabsContent>
        
        <TabsContent value="opportunities" className="space-y-6 mt-6">
          <OpportunitiesTab opportunities={collaborationOpportunities} onJoinCollaboration={handleJoinCollaboration} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Community;
