
import React, { useState } from 'react';
import { Search, MessageCircle } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { useChat } from '@/contexts/ChatContext';
import { format, isToday, isYesterday, formatDistance } from 'date-fns';

interface ChatSidebarProps {
  onSelectConversation: (id: string) => void;
  currentConversationId: string | null;
}

export const ChatSidebar: React.FC<ChatSidebarProps> = ({ 
  onSelectConversation, 
  currentConversationId 
}) => {
  const { conversations, searchConversations } = useChat();
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter conversations based on search
  const filteredConversations = searchQuery 
    ? searchConversations(searchQuery) 
    : conversations;
  
  // Format timestamp for display
  const formatTimestamp = (date: Date) => {
    if (isToday(date)) {
      return format(date, 'h:mm a');
    } else if (isYesterday(date)) {
      return 'Yesterday';
    } else {
      return format(date, 'MMM d');
    }
  };

  // Get brief message preview
  const getMessagePreview = (content: string) => {
    return content.length > 30 ? `${content.substring(0, 30)}...` : content;
  };

  return (
    <div className="flex flex-col h-full border-r bg-background">
      <div className="p-3 border-b">
        <h2 className="font-semibold flex items-center mb-3">
          <MessageCircle className="h-4 w-4 text-brand-pink mr-2" />
          Messages
        </h2>
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search messages..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      <ScrollArea className="flex-1">
        {filteredConversations.length > 0 ? (
          <div className="divide-y divide-border">
            {filteredConversations.map((conversation) => {
              // Find the other participant (not the current user)
              const otherParticipant = conversation.participants.find(
                p => p.id !== conversation.participants[0].id
              );
              
              const lastMessage = conversation.lastMessage;
              const isSelected = conversation.id === currentConversationId;
              
              return (
                <div
                  key={conversation.id}
                  onClick={() => onSelectConversation(conversation.id)}
                  className={`p-3 flex items-start space-x-3 cursor-pointer hover:bg-muted/50 ${
                    isSelected ? 'bg-muted/50' : ''
                  }`}
                >
                  <Avatar className="h-10 w-10 flex-shrink-0 mt-0.5">
                    <AvatarImage src={otherParticipant?.avatar} alt={otherParticipant?.name} />
                    <AvatarFallback>{otherParticipant?.name?.charAt(0) || 'U'}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-sm truncate">
                        {otherParticipant?.name}
                      </h3>
                      <span className="text-xs text-muted-foreground">
                        {lastMessage ? formatTimestamp(new Date(lastMessage.timestamp)) : ''}
                      </span>
                    </div>
                    {conversation.campaignTitle && (
                      <div className="mt-0.5 mb-1">
                        <Badge variant="outline" className="text-xs bg-muted/50 font-normal">
                          {conversation.campaignTitle}
                        </Badge>
                      </div>
                    )}
                    <p className={`text-xs truncate ${
                      conversation.unreadCount > 0 ? 'font-medium' : 'text-muted-foreground'
                    }`}>
                      {lastMessage ? getMessagePreview(lastMessage.content) : 'No messages yet'}
                    </p>
                    {conversation.unreadCount > 0 && (
                      <Badge className="mt-1 bg-brand-pink text-xs">{conversation.unreadCount}</Badge>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="p-6 text-center text-muted-foreground">
            {searchQuery ? 'No matching conversations' : 'No conversations yet'}
          </div>
        )}
      </ScrollArea>
    </div>
  );
};
