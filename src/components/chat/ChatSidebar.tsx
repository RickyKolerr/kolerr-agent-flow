
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, Plus } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { mockConversations } from "./mockChatData";
import { OnlineIndicator } from "./OnlineIndicator";
import { useNavigate, useParams } from "react-router-dom";

export const ChatSidebar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { conversationId } = useParams();
  const navigate = useNavigate();
  
  const filteredConversations = mockConversations.filter(
    (conversation) =>
      conversation.participants.some((participant) =>
        participant.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  return (
    <div className="w-80 border-r border-white/10 flex flex-col h-full">
      <div className="p-4 border-b border-white/10">
        <h2 className="text-xl font-bold mb-4">Messages</h2>
        <div className="relative">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search conversations..."
            className="pl-8 bg-black/20 border-white/10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      <ScrollArea className="flex-1">
        <div className="p-2 space-y-1">
          {filteredConversations.map((conversation) => {
            const otherParticipant = conversation.participants.find(p => p.id !== "current-user");
            const isActive = conversation.id === conversationId;
            
            return (
              <div
                key={conversation.id}
                className={`p-3 rounded-md cursor-pointer flex items-center gap-3 transition-colors ${
                  isActive ? "bg-brand-pink/20" : "hover:bg-black/20"
                }`}
                onClick={() => navigate(`/chat/${conversation.id}`)}
              >
                <div className="relative">
                  <Avatar className="h-10 w-10 border border-white/10">
                    <img src={otherParticipant?.avatar} alt={otherParticipant?.name} />
                  </Avatar>
                  <OnlineIndicator status={otherParticipant?.status || "offline"} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between">
                    <p className="font-medium truncate">{otherParticipant?.name}</p>
                    <span className="text-xs text-gray-400">
                      {conversation.lastMessage?.timestamp 
                        ? new Date(conversation.lastMessage.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
                        : ''}
                    </span>
                  </div>
                  <p className="text-sm text-gray-400 truncate">
                    {conversation.lastMessage?.content || "No messages yet"}
                  </p>
                </div>
                {conversation.unreadCount > 0 && (
                  <Badge className="bg-brand-pink text-white">{conversation.unreadCount}</Badge>
                )}
              </div>
            );
          })}
        </div>
      </ScrollArea>
      
      <div className="p-4 border-t border-white/10">
        <Button className="w-full" variant="outline">
          <Plus className="h-4 w-4 mr-2" />
          New Conversation
        </Button>
      </div>
    </div>
  );
};
