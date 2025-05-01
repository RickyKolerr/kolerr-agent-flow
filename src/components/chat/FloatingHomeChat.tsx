
import React from "react";
import { CreditCard, MessageCircle, MessageSquare, Paperclip, Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useCredits } from "@/contexts/CreditContext";
import { CreditBadge } from "@/components/CreditBadge";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useMobileDetection } from "@/hooks/use-mobile-detection";

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
  generalQuestionsPerCredit
}) => {
  const navigate = useNavigate();
  const { freeCredits, hasPremiumPlan } = useCredits();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const { isStandalone, hasSafeArea, isIOSDevice } = useMobileDetection();

  // Dynamic height based on viewport and PWA context
  const messageAreaHeight = isMobile ? "280px" : "350px";
  
  // Adjust classes for PWA standalone mode and fix mobile positioning
  const containerClasses = isMobile 
    ? `fixed bottom-0 left-0 right-0 w-full border-t-2 border-t-black/40 z-50 fixed-element-class ${isStandalone ? 'pb-[env(safe-area-inset-bottom,0)]' : ''}` 
    : "fixed bottom-4 right-4 z-50 max-w-[550px] w-full rounded-2xl overflow-hidden";

  // Handle keyboard enter key
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Focus handling for better input experience on mobile
  const inputRef = React.useRef<HTMLInputElement>(null);
  
  // Improve scrolling behavior
  React.useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);
  
  // Prevent body scroll when interacting with chat on mobile
  const preventBodyScroll = (prevent: boolean) => {
    if (!isMobile) return;
    
    if (prevent) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  };

  return (
    <div 
      className={containerClasses} 
      style={isIOSDevice && isStandalone ? { paddingBottom: 'env(safe-area-inset-bottom, 0)' } : {}}
    >
      <div className="glass-panel shadow-2xl flex flex-col w-full">
        <div className="bg-black/70 p-4 border-b border-white/10 flex justify-between items-center w-full">
          <div className="flex items-center">
            <div className="h-10 w-10 rounded-full bg-brand-pink flex items-center justify-center mr-3">
              <MessageCircle className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="font-bold text-lg">AI KOL Discovery Agent</h2>
              <p className="text-sm text-muted-foreground">
                {hasPremiumPlan ? "Premium plan activated" : `${freeCredits} free ${freeCredits === 1 ? 'search' : 'searches'} remaining`}
              </p>
            </div>
          </div>
          {!hasPremiumPlan && (
            <CreditBadge variant="compact" />
          )}
        </div>

        <div className="bg-black/40 p-3 border-b border-white/10">
          <div className="rounded-md bg-brand-pink/10 p-2 border border-brand-pink/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <CreditCard className="h-3 w-3 text-brand-pink mr-2" />
                <span className="font-medium text-xs">Credit Usage</span>
              </div>
            </div>
            <div className="mt-1 text-xs grid grid-cols-2 gap-1">
              <div className="flex items-center">
                <Badge variant="outline" className="flex items-center mr-1 bg-brand-pink/5 border-brand-pink/20 h-5">
                  <Search className="h-2 w-2 mr-1 text-brand-pink" />
                </Badge>
                <span className="text-xs">KOL specific: 1 credit</span>
              </div>
              <div className="flex items-center">
                <Badge variant="outline" className="flex items-center mr-1 bg-brand-pink/5 border-brand-pink/20 h-5">
                  <MessageSquare className="h-2 w-2 mr-1 text-brand-pink" />
                </Badge>
                <span className="text-xs">General: {generalQuestionsPerCredit} questions = 1 credit</span>
              </div>
            </div>
          </div>
        </div>

        <ScrollArea 
          className="flex-1 p-4 bg-black/20" 
          style={{ height: messageAreaHeight }}
          onMouseEnter={() => preventBodyScroll(true)}
          onMouseLeave={() => preventBodyScroll(false)}
        >
          <div className="pb-2">
            {messages.map(message => (
              <div key={message.id} className={`mb-4 flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
                {message.type === "bot" && (
                  <div className="h-8 w-8 rounded-full bg-brand-pink flex items-center justify-center mr-3 flex-shrink-0">
                    <MessageCircle className="h-4 w-4 text-white" />
                  </div>
                )}
                <div 
                  className={`p-3 rounded-lg max-w-[80%] ${
                    message.type === "user" ? "bg-brand-navy text-white" : "bg-secondary"
                  }`}
                >
                  {message.content}
                  {message.isTyping && (
                    <span className="inline-block ml-1 animate-pulse">▌</span>
                  )}
                  {message.isKOLSpecific && !hasPremiumPlan && message.type === "user" && (
                    <span className="block text-xs italic mt-1 opacity-70">Uses 1 credit</span>
                  )}
                  {!message.isKOLSpecific && !hasPremiumPlan && message.type === "user" && (
                    <span className="block text-xs italic mt-1 opacity-70">General question ({generalQuestionsPerCredit} = 1 credit)</span>
                  )}
                </div>
                {message.type === "user" && (
                  <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center ml-3 flex-shrink-0">
                    <User className="h-4 w-4" />
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        <div className="p-3 border-t border-white/10 bg-black/40">
          <div className="flex gap-2">
            <Input 
              ref={inputRef}
              placeholder={isMobile ? "Ask about creators..." : "Ask about specific creator types, niches, or requirements..."} 
              value={inputValue} 
              onChange={e => setInputValue(e.target.value)} 
              onKeyPress={handleKeyPress}
              className="bg-black/60" 
              onFocus={() => preventBodyScroll(true)}
              onBlur={() => preventBodyScroll(false)}
              style={{ touchAction: 'manipulation' }}
            />
            <Button 
              onClick={handleSendMessage} 
              className={`${isMobile ? "px-3" : ""} whitespace-nowrap touch-manipulation`}
              style={{ minHeight: isMobile ? '44px' : undefined }}
            >
              Send
            </Button>
          </div>
          <div className="flex items-center justify-between mt-2 px-1">
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-muted-foreground p-1 h-7 touch-manipulation"
              style={isMobile ? { minHeight: '36px' } : {}}
            >
              <Paperclip className="h-3 w-3 mr-1" />
              <span className={isMobile ? "sr-only" : ""}>Attach</span>
            </Button>
            
            {!hasPremiumPlan && (
              <div className="text-xs text-muted-foreground flex items-center gap-2">
                <span className={isMobile ? "hidden" : ""}>
                  {isKOLSpecificQuery(inputValue) 
                    ? "KOL question: Uses 1 credit" 
                    : `General question: ${generalQuestionCounter}/${generalQuestionsPerCredit}`}
                </span>
                <Button 
                  variant="link" 
                  size="sm" 
                  className="text-brand-pink p-0 h-auto text-xs touch-manipulation" 
                  onClick={() => navigate("/pricing")}
                  style={isMobile ? { minHeight: '36px' } : {}}
                >
                  Upgrade
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
