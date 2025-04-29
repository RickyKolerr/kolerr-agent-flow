
import { Search, Users } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CreatorCard } from "./CreatorCard";
import { useState } from "react";

interface Creator {
  id: string;
  name: string;
  username: string;
  avatar: string;
  followers: number;
  niche: string[];
  tier: string;
  bio: string;
  compatibility: number;
  platforms: string[];
  connected: boolean;
}

interface CreatorsTabProps {
  creators: Creator[];
  onConnectCreator: (creator: Creator) => void;
}

export const CreatorsTab = ({ creators, onConnectCreator }: CreatorsTabProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  
  const filteredCreators = creators.filter(creator => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      if (!creator.name.toLowerCase().includes(query) && 
          !creator.username.toLowerCase().includes(query) && 
          !creator.bio.toLowerCase().includes(query) &&
          !creator.niche.some(n => n.toLowerCase().includes(query))) {
        return false;
      }
    }
    
    if (categoryFilter && !creator.niche.includes(categoryFilter)) {
      return false;
    }
    
    return true;
  });
  
  return (
    <div className="space-y-6">
      {/* Search and filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative w-full md:w-2/3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search creators by name, niche, or username..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-full md:w-1/3">
            <SelectValue placeholder="Filter by niche" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Niches</SelectItem>
            <SelectItem value="fashion">Fashion</SelectItem>
            <SelectItem value="beauty">Beauty</SelectItem>
            <SelectItem value="gaming">Gaming</SelectItem>
            <SelectItem value="tech">Tech</SelectItem>
            <SelectItem value="travel">Travel</SelectItem>
            <SelectItem value="fitness">Fitness</SelectItem>
            <SelectItem value="food">Food</SelectItem>
            <SelectItem value="wellness">Wellness</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      {/* Creator cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredCreators.length > 0 ? filteredCreators.map((creator) => (
          <CreatorCard 
            key={creator.id}
            creator={creator} 
            onConnect={onConnectCreator}
          />
        )) : (
          <div className="col-span-full text-center py-12">
            <Users className="mx-auto h-12 w-12 text-muted-foreground mb-3" />
            <h3 className="text-xl font-medium mb-2">No matching creators found</h3>
            <p className="text-muted-foreground">Try adjusting your filters or search term</p>
          </div>
        )}
      </div>
    </div>
  );
};
