
import React, { useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { mockCreatorData } from "@/data/mockCreators";
import { Search, MessageSquare, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";

interface NewConversationProps {
  open: boolean;
  onClose: () => void;
}

const NewConversation: React.FC<NewConversationProps> = ({ open, onClose }) => {
  const [selectedCreator, setSelectedCreator] = useState("");
  const [message, setMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const filteredCreators = mockCreatorData ? 
    mockCreatorData.filter(creator => 
      creator.fullName.toLowerCase().includes(searchQuery.toLowerCase()) || 
      creator.username.toLowerCase().includes(searchQuery.toLowerCase())
    ) : [];

  const handleStartConversation = () => {
    if (!selectedCreator) {
      toast.error("Please select a creator to start a conversation with");
      return;
    }

    // Get the selected creator details
    const creator = mockCreatorData.find(c => c.id === selectedCreator);
    
    if (!creator) {
      toast.error("Creator not found");
      return;
    }

    // Close the modal
    onClose();
    
    // Navigate to the chat with URL parameters
    const params = new URLSearchParams();
    params.append('recipient', creator.id);
    params.append('name', creator.fullName);
    if (message.trim()) {
      params.append('message', message.trim());
    }
    
    navigate(`/chat?${params.toString()}`);
    toast.success(`Started conversation with ${creator.fullName}`);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <MessageSquare className="mr-2 h-5 w-5 text-brand-pink" />
            New Conversation
          </DialogTitle>
          <DialogDescription>
            Start a conversation with a creator
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-2">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search creators..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="creator-select" className="text-sm font-medium">
              Select Creator
            </label>
            <Select value={selectedCreator} onValueChange={setSelectedCreator}>
              <SelectTrigger id="creator-select">
                <SelectValue placeholder="Select a creator" />
              </SelectTrigger>
              <SelectContent>
                {filteredCreators.map((creator) => (
                  <SelectItem key={creator.id} value={creator.id}>
                    <div className="flex items-center">
                      <Avatar className="h-6 w-6 mr-2">
                        <AvatarImage src={creator.avatar} alt={creator.fullName} />
                        <AvatarFallback>{creator.fullName.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      {creator.fullName} ({creator.niche[0]})
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="initial-message" className="text-sm font-medium">
              Initial Message (Optional)
            </label>
            <Textarea
              id="initial-message"
              placeholder="Write your message here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="min-h-[100px]"
            />
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            onClick={handleStartConversation} 
            className="bg-brand-pink hover:bg-brand-pink/90"
            disabled={!selectedCreator}
          >
            <MessageSquare className="mr-2 h-4 w-4" />
            Start Conversation
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NewConversation;
