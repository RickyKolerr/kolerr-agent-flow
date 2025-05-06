
import React from 'react';
import { Task } from '@/utils/taskHandler';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { User, Contact, MessageSquare, Info, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface TaskResultsDisplayProps {
  task: Task;
}

export const TaskResultsDisplay: React.FC<TaskResultsDisplayProps> = ({ task }) => {
  const navigate = useNavigate();
  
  if (task.status !== 'completed' || !task.result) {
    return null;
  }
  
  const handleViewProfile = (id: string) => {
    navigate(`/creators/${id}`);
  };
  
  const handleContactCreator = (id: string) => {
    toast.info("Premium feature", {
      description: "Upgrade to premium to contact creators directly",
      action: {
        label: "Upgrade",
        onClick: () => navigate("/pricing")
      }
    });
  };
  
  // Display creator search results
  if (Array.isArray(task.result) && task.result.length > 0 && task.result[0].fullName) {
    return (
      <div className="space-y-4 mt-4">
        <h3 className="text-lg font-medium">Results ({task.result.length} creators found)</h3>
        
        {task.result.slice(0, 5).map(creator => (
          <Card key={creator.id} className="overflow-hidden hover:shadow-md transition-shadow">
            <CardContent className="p-0">
              <div className="flex items-center p-4">
                <div className="flex-shrink-0 mr-4">
                  <div className="h-16 w-16 rounded-full overflow-hidden bg-muted">
                    <img 
                      src={creator.avatar || "/placeholder.svg"} 
                      alt={creator.username} 
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center mb-1">
                    <h3 className="font-medium">{creator.fullName}</h3>
                    <span className="text-muted-foreground text-sm ml-2">@{creator.username}</span>
                  </div>
                  
                  <div className="flex items-center text-sm text-muted-foreground mb-2">
                    <span className="mr-4">{(creator.followers / 1000).toFixed(0)}K followers</span>
                    <span>{(creator.engagementRate * 100).toFixed(2)}% engagement</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {creator.niche.map(niche => (
                      <Badge key={niche} variant="secondary" className="text-xs">
                        {niche}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button 
                    onClick={() => handleContactCreator(creator.id)}
                    variant="gradient"
                    className="flex items-center"
                  >
                    <Contact className="h-4 w-4 mr-2" />
                    Contact
                  </Button>
                  
                  <Button 
                    onClick={() => handleViewProfile(creator.id)}
                    className="bg-brand-pink hover:bg-brand-pink/90"
                  >
                    <User className="h-4 w-4 mr-2" />
                    View Profile
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        
        {task.result.length > 5 && (
          <div className="text-center">
            <Button 
              onClick={() => navigate(`/search?q=custom`)}
              variant="outline"
            >
              View All {task.result.length} Results
            </Button>
          </div>
        )}
      </div>
    );
  }
  
  // Display contact requests
  if (Array.isArray(task.result) && task.result.length > 0 && task.result[0].requestStatus) {
    return (
      <div className="space-y-4 mt-4">
        <h3 className="text-lg font-medium">Contact Requests Prepared</h3>
        
        <div className="border border-white/10 bg-black/20 rounded-lg overflow-hidden">
          <div className="p-3 bg-black/40 border-b border-white/10 flex justify-between items-center">
            <div className="text-sm font-medium">{task.result.length} messages ready to send</div>
            <Badge variant="secondary">Premium Feature</Badge>
          </div>
          
          <div className="divide-y divide-white/10">
            {task.result.map((request, index) => (
              <div key={index} className="p-3 flex justify-between items-center">
                <div className="flex items-center">
                  <MessageSquare className="h-4 w-4 text-brand-pink mr-2" />
                  <span>Message to {request.creatorName}</span>
                </div>
                <Button size="sm" variant="outline">Preview</Button>
              </div>
            ))}
          </div>
          
          <div className="p-3 bg-black/20 border-t border-white/10 flex justify-end">
            <Button 
              variant="gradient" 
              onClick={() => navigate('/pricing')}
            >
              Upgrade to Send Messages
            </Button>
          </div>
        </div>
      </div>
    );
  }
  
  // Display analysis results
  if (task.result && typeof task.result === 'object' && task.result.averageEngagement) {
    const analysis = task.result;
    
    return (
      <div className="space-y-4 mt-4">
        <h3 className="text-lg font-medium">Campaign Analysis</h3>
        
        <Card>
          <CardContent className="p-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-black/20 rounded-lg">
                <div className="text-xs text-gray-400">Total Creators</div>
                <div className="text-xl font-semibold">{analysis.totalCount}</div>
              </div>
              
              <div className="p-3 bg-black/20 rounded-lg">
                <div className="text-xs text-gray-400">Avg. Engagement</div>
                <div className="text-xl font-semibold">
                  {(analysis.averageEngagement * 100).toFixed(2)}%
                </div>
              </div>
              
              <div className="p-3 bg-black/20 rounded-lg">
                <div className="text-xs text-gray-400">Top Category</div>
                <div className="text-xl font-semibold">{analysis.topCategory}</div>
              </div>
              
              <div className="p-3 bg-black/20 rounded-lg">
                <div className="text-xs text-gray-400">Potential Reach</div>
                <div className="text-xl font-semibold">{analysis.potentialReach}</div>
              </div>
            </div>
            
            <div className="mt-4 p-3 bg-black/20 rounded-lg">
              <div className="text-xs text-gray-400 mb-1">Estimated Budget</div>
              <div className="text-2xl font-semibold text-brand-pink">{analysis.estimatedCost}</div>
            </div>
            
            <div className="flex justify-end mt-4">
              <Button onClick={() => navigate('/pricing')} className="bg-brand-pink hover:bg-brand-pink/90">
                <Info className="h-4 w-4 mr-2" />
                Get Detailed Report
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  // Default fallback for other result types
  return (
    <div className="mt-4 p-3 bg-black/20 border border-white/10 rounded-lg">
      <div className="text-sm">Task completed successfully</div>
    </div>
  );
};
