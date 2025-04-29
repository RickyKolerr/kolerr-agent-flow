
import React, { useEffect, useRef, useState } from 'react';
import { Send, X, Paperclip, Image } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ChatMessage } from '@/services/ChatService';
import { format } from 'date-fns';
import { useChat } from '@/contexts/ChatContext';

interface ChatWindowProps {
  onClose: () => void;
  minimized?: boolean;
  toggleMinimize?: () => void;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({ 
  onClose, 
  minimized = false,
  toggleMinimize
}) => {
  const { 
    currentConversationId, 
    currentMessages, 
    conversations, 
    sendMessage 
  } = useChat();
  
  const [inputValue, setInputValue] = useState('');
  const messageEndRef = useRef<HTMLDivElement>(null);
  
  // Find current conversation from ID
  const currentConversation = conversations.find(
    conv => conv.id === currentConversationId
  );
  
  // Auto-scroll to the latest message
  useEffect(() => {
    if (messageEndRef.current && !minimized) {
      messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [currentMessages, minimized]);
  
  // Handle sending a message
  const handleSendMessage = () => {
    if (!inputValue.trim() || !currentConversationId) return;
    
    sendMessage(inputValue);
    setInputValue('');
  };
  
  // Handle input key press (Enter to send)
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  // If minimized, show compact version
  if (minimized) {
    return (
      <div className="bg-background border rounded-t-lg shadow-lg flex items-center justify-between p-2 cursor-pointer"
           onClick={toggleMinimize}>
        <div className="flex items-center space-x-2">
          <div className="h-2 w-2 rounded-full bg-green-500"></div>
          <span className="font-medium text-sm">
            {currentConversation ? (
              currentConversation.participants.find(p => p.id !== (currentConversation.participants[0]?.id))?.name
            ) : 'Chat'}
          </span>
        </div>
        <Button variant="ghost" size="sm" className="h-5 w-5 p-0" onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}>
          <X className="h-3 w-3" />
        </Button>
      </div>
    );
  }
  
  // Get other participant (not the current user)
  const otherParticipant = currentConversation?.participants.find(
    p => p.id !== (currentConversation.participants[0]?.id)
  );
  
  return (
    <div className="flex flex-col bg-background border rounded-t-lg shadow-lg w-full h-full overflow-hidden">
      {/* Chat header */}
      <div className="border-b p-3 flex items-center justify-between bg-muted/30">
        <div className="flex items-center space-x-2">
          {otherParticipant && (
            <Avatar className="h-8 w-8">
              <AvatarImage src={otherParticipant.avatar} alt={otherParticipant.name} />
              <AvatarFallback>{otherParticipant.name.charAt(0)}</AvatarFallback>
            </Avatar>
          )}
          <div>
            <p className="font-medium text-sm">{otherParticipant?.name || 'Chat'}</p>
            <div className="flex items-center space-x-1">
              <div className={`h-1.5 w-1.5 rounded-full ${otherParticipant?.isOnline ? 'bg-green-500' : 'bg-gray-300'}`}></div>
              <p className="text-xs text-muted-foreground">
                {otherParticipant?.isOnline ? 'Online' : 'Offline'}
              </p>
            </div>
          </div>
        </div>
        <div className="flex space-x-1">
          <Button variant="ghost" size="sm" onClick={toggleMinimize}>
            <span className="sr-only">Minimize</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/></svg>
          </Button>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <span className="sr-only">Close</span>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {/* Campaign info if available */}
      {currentConversation?.campaignTitle && (
        <div className="bg-muted/20 p-2 text-sm border-b">
          <span className="font-medium">Campaign: </span>
          <span className="text-muted-foreground">{currentConversation.campaignTitle}</span>
        </div>
      )}
      
      {/* Messages area */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {currentMessages.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No messages yet. Start the conversation!
            </div>
          ) : (
            currentMessages.map((message, index) => {
              const isCurrentUser = message.senderId === currentConversation?.participants[0].id;
              const showAvatar = index === 0 || currentMessages[index - 1].senderId !== message.senderId;
              
              // Handle typing indicator separately
              if (message.isTyping) {
                return (
                  <div key={message.id} className="flex items-end space-x-2">
                    {!isCurrentUser && (
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={message.senderAvatar} alt={message.senderName} />
                        <AvatarFallback>{message.senderName.charAt(0)}</AvatarFallback>
                      </Avatar>
                    )}
                    <div className={`max-w-[80%] bg-muted rounded-xl p-2 flex items-center`}>
                      <div className="typing-indicator">
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                    </div>
                  </div>
                );
              }
              
              return (
                <div key={message.id} className={`flex items-end ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
                  {!isCurrentUser && showAvatar && (
                    <Avatar className="h-8 w-8 mr-2 flex-shrink-0">
                      <AvatarImage src={message.senderAvatar} alt={message.senderName} />
                      <AvatarFallback>{message.senderName.charAt(0)}</AvatarFallback>
                    </Avatar>
                  )}
                  {!isCurrentUser && !showAvatar && <div className="w-10" />}
                  <div className="space-y-1 max-w-[80%]">
                    <div className={`inline-block rounded-xl py-2 px-3 ${
                      isCurrentUser ? 'bg-brand-pink text-white' : 'bg-muted'
                    }`}>
                      {message.content}
                    </div>
                    <div className={`text-xs text-muted-foreground ${isCurrentUser ? 'text-right' : ''}`}>
                      {format(new Date(message.timestamp), 'h:mm a')}
                      {isCurrentUser && (
                        <span className="ml-1">
                          {message.status === 'sent' && '✓'}
                          {message.status === 'delivered' && '✓✓'}
                          {message.status === 'read' && (
                            <span className="text-brand-pink">✓✓</span>
                          )}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
          <div ref={messageEndRef} />
        </div>
      </ScrollArea>
      
      {/* Message input area */}
      <div className="p-3 border-t">
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" className="rounded-full">
            <Paperclip className="h-4 w-4" />
            <span className="sr-only">Attach</span>
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full">
            <Image className="h-4 w-4" />
            <span className="sr-only">Image</span>
          </Button>
          <Input
            placeholder="Type a message..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyPress}
            className="flex-1"
          />
          <Button 
            onClick={handleSendMessage} 
            size="icon"
            disabled={!inputValue.trim()}
            className="rounded-full bg-brand-pink hover:bg-brand-pink/90"
          >
            <Send className="h-4 w-4" />
            <span className="sr-only">Send</span>
          </Button>
        </div>
      </div>
    </div>
  );
};
