
import React, { useState } from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { X, Send, Search, MessageCircle } from 'lucide-react';
import { CreditBadge } from '@/components/CreditBadge';
import { useUserAccess } from '@/hooks/useUserAccess';
import { useCredits } from '@/contexts/CreditContext';
import { ChatToggle } from './ChatToggle';
import { toast } from 'sonner';

interface Message {
  id: string;
  type: "user" | "bot";
  content: string;
  isTyping?: boolean;
  isKOLSpecific?: boolean;
}

interface FloatingHomeChatProps {
  messages: Message[];
  inputValue: string;
  setInputValue: (value: string) => void;
  handleSendMessage: () => void;
  messagesEndRef: React.RefObject<HTMLDivElement>;
  generalQuestionCounter: number;
  generalQuestionsPerCredit: number;
  isKOLSpecificQuery: (message: string) => boolean;
  isSearchMode?: boolean;
  setIsSearchMode?: (isSearchMode: boolean) => void;
}

export const FloatingHomeChat: React.FC<FloatingHomeChatProps> = ({
  messages,
  inputValue,
  setInputValue,
  handleSendMessage,
  messagesEndRef,
  generalQuestionCounter,
  generalQuestionsPerCredit,
  isKOLSpecificQuery,
  isSearchMode = false,
  setIsSearchMode
}) => {
  const [minimized, setMinimized] = useState(false);
  const { isAuthenticated } = useUserAccess();
  const { freeCredits, hasPremiumPlan } = useCredits();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim() !== '') {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  const handleToggleSearchMode = (newMode: boolean) => {
    if (setIsSearchMode) {
      setIsSearchMode(newMode);
      toast.info(
        newMode ? "Switched to Search Mode" : "Switched to Normal Mode", 
        {
          description: newMode
            ? "Each search uses 1 credit. Use this for finding specific KOLs or campaigns."
            : `Normal chat uses 1 credit for every ${generalQuestionsPerCredit} questions.`
        }
      );
    }
  };

  if (minimized) {
    return (
      <div className="fixed bottom-24 right-4 z-40">
        <Button 
          onClick={() => setMinimized(false)}
          className="rounded-full py-3 px-5 shadow-lg bg-gradient-to-r from-brand-pink to-purple-600"
        >
          Continue Chat
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-24 right-4 z-40">
      <Card className="w-80 md:w-96 shadow-2xl border border-white/10 bg-gradient-to-br from-black/80 to-black/60 backdrop-blur-xl">
        <CardHeader className="p-3 flex flex-row justify-between items-center space-y-0 border-b border-white/10">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-full bg-brand-pink flex items-center justify-center">
              {isSearchMode ? (
                <Search className="h-5 w-5 text-white" />
              ) : (
                <MessageCircle className="h-5 w-5 text-white" />
              )}
            </div>
            <div>
              <div className="font-semibold">{isSearchMode ? "Search Agent" : "Kolerr Assistant"}</div>
              <div className="text-xs text-muted-foreground">
                {!hasPremiumPlan && (
                  <div className="flex items-center">
                    <Badge variant="outline" className="text-xs font-normal text-muted-foreground border-white/10">
                      {isSearchMode 
                        ? `${freeCredits} search${freeCredits !== 1 ? 'es' : ''} left` 
                        : `${generalQuestionsPerCredit - generalQuestionCounter}/${generalQuestionsPerCredit} questions left`}
                    </Badge>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            {!hasPremiumPlan && (
              <ChatToggle 
                isSearchMode={isSearchMode} 
                onToggle={handleToggleSearchMode}
                variant="pill" 
                showLabels={false}
              />
            )}
            <Button variant="ghost" size="icon" onClick={() => setMinimized(true)}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="h-[300px] p-4">
            {messages.map(message => (
              <div
                key={message.id}
                className={`mb-4 max-w-[90%] ${
                  message.type === 'user' ? 'ml-auto text-right' : ''
                }`}
              >
                <div
                  className={`inline-block rounded-2xl px-4 py-2 ${
                    message.type === 'user'
                      ? 'bg-brand-pink text-white rounded-tr-none'
                      : 'bg-white/5 border border-white/10 rounded-tl-none'
                  }`}
                >
                  {message.content}
                  {message.isTyping && (
                    <span className="typing-indicator ml-1">
                      <span className="dot"></span>
                      <span className="dot"></span>
                      <span className="dot"></span>
                    </span>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </ScrollArea>
        </CardContent>
        <CardFooter className="p-3 pt-2 border-t border-white/10">
          <div className="flex w-full gap-2">
            <Input
              placeholder={isSearchMode ? "Search for KOLs or campaigns..." : "Ask a question..."}
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyPress}
              className="flex-1"
            />
            <Button 
              onClick={handleSendMessage} 
              disabled={!inputValue.trim()} 
              className={isSearchMode ? "bg-brand-pink hover:bg-brand-pink/90" : ""}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};
