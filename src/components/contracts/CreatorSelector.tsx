
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

// Mock creators data
const mockCreators = [
  {
    id: 'c1',
    name: 'Sophia Chen',
    handle: '@fashionwithsophia',
    avatar: 'https://ui-avatars.com/api/?name=SC&background=FF5722&color=fff',
    category: 'Fashion',
    followers: '250K',
    engagement: '4.2%',
    recommended: true
  },
  {
    id: 'c2',
    name: 'Jake Thomas',
    handle: '@jakeadventures',
    avatar: 'https://ui-avatars.com/api/?name=JT&background=3F51B5&color=fff',
    category: 'Adventure',
    followers: '180K',
    engagement: '5.1%',
    recommended: true
  },
  {
    id: 'c3',
    name: 'Aisha Mohamed',
    handle: '@aisha_beauty',
    avatar: 'https://ui-avatars.com/api/?name=AM&background=9C27B0&color=fff',
    category: 'Beauty',
    followers: '320K',
    engagement: '3.8%',
    recommended: true
  },
  {
    id: 'c4',
    name: 'Marco Rivera',
    handle: '@marcofitness',
    avatar: 'https://ui-avatars.com/api/?name=MR&background=4CAF50&color=fff',
    category: 'Fitness',
    followers: '420K',
    engagement: '4.5%',
    recommended: false
  },
  {
    id: 'c5',
    name: 'Lily Zhang',
    handle: '@travelwithlily',
    avatar: 'https://ui-avatars.com/api/?name=LZ&background=FF9800&color=fff',
    category: 'Travel',
    followers: '290K',
    engagement: '4.9%',
    recommended: false
  }
];

interface CreatorSelectorProps {
  contractType: string;
  contractId?: string;
  onCreatorSelect?: (creatorId: string) => void;
}

export const CreatorSelector = ({ 
  contractType, 
  contractId,
  onCreatorSelect 
}: CreatorSelectorProps) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('recommended');
  const [selectedCreator, setSelectedCreator] = useState<string | null>(null);

  const handleCreatorSelect = (creatorId: string) => {
    setSelectedCreator(creatorId);
    
    if (onCreatorSelect) {
      onCreatorSelect(creatorId);
    }
    
    // If this is a contract view with a specific ID, navigate to next step
    if (contractId) {
      toast.success('Creator selected successfully', {
        description: 'Preparing contract for review...'
      });
      
      // Navigate to contract details with creator
      setTimeout(() => {
        navigate(`/dashboard/contracts/${contractId}?creator=${creatorId}`);
      }, 500);
    }
  };

  const filteredCreators = activeTab === 'recommended' 
    ? mockCreators.filter(creator => creator.recommended)
    : mockCreators;

  return (
    <Card className="border-white/10 bg-zinc-900 text-white">
      <CardHeader>
        <CardTitle className="text-xl">Select Creator</CardTitle>
        <CardDescription className="text-gray-400">Choose a creator for this contract</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="recommended" className="mb-6" onValueChange={setActiveTab}>
          <TabsList className="bg-zinc-800 text-gray-400">
            <TabsTrigger 
              value="recommended" 
              className="data-[state=active]:bg-zinc-700 data-[state=active]:text-white"
            >
              Recommended
            </TabsTrigger>
            <TabsTrigger 
              value="all" 
              className="data-[state=active]:bg-zinc-700 data-[state=active]:text-white"
            >
              All Creators
            </TabsTrigger>
          </TabsList>

          <TabsContent value="recommended">
            <div className="space-y-4 mt-4">
              {filteredCreators.map(creator => (
                <CreatorCard 
                  key={creator.id}
                  creator={creator}
                  isSelected={selectedCreator === creator.id}
                  onSelect={handleCreatorSelect}
                />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="all">
            <div className="space-y-4 mt-4">
              {mockCreators.map(creator => (
                <CreatorCard 
                  key={creator.id}
                  creator={creator}
                  isSelected={selectedCreator === creator.id}
                  onSelect={handleCreatorSelect}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

interface Creator {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  category: string;
  followers: string;
  engagement: string;
  recommended: boolean;
}

interface CreatorCardProps {
  creator: Creator;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

const CreatorCard = ({ creator, isSelected, onSelect }: CreatorCardProps) => {
  return (
    <div 
      className={`p-4 rounded-lg cursor-pointer transition-all ${
        isSelected 
          ? 'bg-brand-pink/20 border border-brand-pink' 
          : 'bg-zinc-800 border border-zinc-700 hover:bg-zinc-700'
      }`}
      onClick={() => onSelect(creator.id)}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar className="h-12 w-12 border-2 border-white/10">
            <img src={creator.avatar} alt={creator.name} className="object-cover" />
          </Avatar>
          
          <div>
            <h3 className="font-medium text-lg">{creator.name}</h3>
            <p className="text-sm text-gray-400">{creator.handle}</p>
          </div>
        </div>
        
        <Badge variant="outline" className="bg-zinc-700 text-gray-200">
          {creator.category}
        </Badge>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mt-4 text-sm text-gray-300">
        <div>
          <span className="text-gray-400">Followers:</span> {creator.followers}
        </div>
        <div>
          <span className="text-gray-400">Engagement:</span> {creator.engagement}
        </div>
      </div>
      
      <div className="mt-3">
        <Button 
          variant={isSelected ? "default" : "outline"} 
          size="sm" 
          className={`w-full ${isSelected ? 'bg-brand-pink hover:bg-brand-pink/90' : 'border-white/20'}`}
          onClick={(e) => {
            e.stopPropagation();
            onSelect(creator.id);
          }}
        >
          {isSelected ? 'Selected' : 'Select Creator'}
        </Button>
      </div>
    </div>
  );
};
