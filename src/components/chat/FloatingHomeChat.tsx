
import React, { useRef } from "react";
import { MessageCircle } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

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
  isKOLSpecificQuery: (input: string) => boolean;
  generalQuestionCounter: number;
  generalQuestionsPerCredit: number;
}

export const FloatingHomeChat: React.FC<FloatingHomeChatProps> = ({
  messages,
  inputValue,
  setInputValue,
  handleSendMessage,
  messagesEndRef,
  isKOLSpecificQuery,
  generalQuestionCounter,
  generalQuestionsPerCredit,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      handleSendMessage();
    }
  };
  
  return (
    <div className="fixed bottom-0 left-0 w-full md:w-2/3 lg:w-1/2 max-w-3xl mx-auto px-4">
      <div className="bg-black/70 backdrop-blur-lg rounded-t-2xl shadow-2xl border border-white/10 overflow-hidden">
        {/* New tagline header */}
        <div className="bg-gradient-to-r from-brand-gradient-from to-brand-gradient-to p-3 border-b border-white/10">
          <h2 className="text-center font-bold text-white">Kolerr IM Agent- Less navigation, more interaction.</h2>
        </div>
        
        <ScrollArea className="h-80 lg:h-96">
          <div className="p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.type === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] px-4 py-2 rounded-xl ${
                    message.type === "user"
                      ? "bg-gradient-to-r from-brand-gradient-from to-brand-gradient-to text-white"
                      : "bg-white/10 backdrop-blur-sm"
                  }`}
                >
                  {message.content}
                  {message.isTyping && (
                    <span className="inline-block ml-1 animate-pulse">...</span>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
        
        <div className="p-3 bg-black/50 border-t border-white/10 flex items-center gap-2">
          {isKOLSpecificQuery(inputValue) && inputValue.length > 0 && (
            <Badge className="bg-brand-pink/90">
              Uses 1 search credit
            </Badge>
          )}
          
          {!isKOLSpecificQuery(inputValue) && inputValue.length > 0 && (
            <Badge variant="outline" className="border-white/20">
              {generalQuestionCounter}/{generalQuestionsPerCredit} to 1 credit
            </Badge>
          )}
          
          <Input
            ref={inputRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about KOLs, campaigns, or TikTok marketing..."
            className="flex-1 bg-black/40 border-white/10 placeholder-white/50"
          />
          <Button
            onClick={handleSendMessage}
            disabled={inputValue.trim() === ""}
            className="bg-brand-pink hover:bg-brand-pink/90"
          >
            <MessageCircle className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};
