
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, TrendingUp, Users } from "lucide-react";
import { Creator } from "@/types/creator"; // We'll create this type file next

interface CreatorSectionProps {
  title: string;
  icon: React.ElementType;
  creators: Creator[];
}

export const CreatorSection: React.FC<CreatorSectionProps> = ({ 
  title, 
  icon: Icon, 
  creators 
}) => {
  return (
    <div className="glass-panel rounded-2xl p-6 shadow-2xl h-full">
      <div className="flex items-center gap-3 mb-6">
        <Icon className="h-8 w-8 text-brand-pink" />
        <h2 className="text-2xl font-bold">{title}</h2>
      </div>
      <div className="space-y-4">
        {creators.slice(0, 3).map(creator => (
          <Card key={creator.id} className="bg-black/40 hover:bg-black/50 transition-all">
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <img 
                  src={creator.avatar} 
                  alt={creator.fullName} 
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{creator.fullName}</h3>
                  <CreatorMetrics creator={creator} type={title} />
                  <div className="flex flex-wrap gap-2 mt-2">
                    {creator.niche.slice(0, 2).map(tag => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

interface CreatorMetricsProps {
  creator: Creator;
  type: string;
}

const CreatorMetrics: React.FC<CreatorMetricsProps> = ({ creator, type }) => {
  if (type === "Top Performers") {
    return (
      <p className="text-brand-pink font-medium">
        {(creator.followers / 1000000).toFixed(1)}M Followers
      </p>
    );
  }

  if (type === "Trending Now") {
    return (
      <div className="flex items-center text-brand-pink font-medium">
        <TrendingUp className="h-4 w-4 mr-1" />
        {(creator.engagementRate * 100).toFixed(1)}% Engagement
      </div>
    );
  }

  // Default for "Viral Stars" or any other type
  return (
    <p className="text-brand-pink font-medium">
      {creator.avgViews} Avg. Views
    </p>
  );
};

export const CreatorsGrid: React.FC<{ 
  topPerformers: Creator[],
  trendingCreators: Creator[],
  viralCreators: Creator[]
}> = ({ 
  topPerformers, 
  trendingCreators, 
  viralCreators 
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12 w-full">
      <CreatorSection
        title="Top Performers"
        icon={Star}
        creators={topPerformers}
      />
      
      <CreatorSection
        title="Trending Now"
        icon={TrendingUp}
        creators={trendingCreators}
      />
      
      <CreatorSection
        title="Viral Stars"
        icon={Users}
        creators={viralCreators}
      />
    </div>
  );
};
