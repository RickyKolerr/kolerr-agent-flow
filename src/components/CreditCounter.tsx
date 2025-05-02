
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { CreditCard, MessageSquare, Search, Info } from "lucide-react";
import { useIntelligentCredits } from "@/hooks/useIntelligentCredits";
import { useCredits } from "@/contexts/CreditContext";

interface CreditCounterProps {
  variant?: "compact" | "standard" | "tooltip";
  className?: string;
}

export function CreditCounter({ variant = "standard", className = "" }: CreditCounterProps) {
  const { freeCredits: originalCredits, hasPremiumPlan } = useCredits();
  const { 
    freeCredits, 
    remainingGeneralQuestions, 
    generalQuestionsPerCredit 
  } = useIntelligentCredits(originalCredits, hasPremiumPlan);

  const calculateRemainingSearches = () => {
    return freeCredits;
  };

  const calculateRemainingGeneralQuestions = () => {
    return (freeCredits * generalQuestionsPerCredit) + remainingGeneralQuestions;
  };

  const remainingSearches = calculateRemainingSearches();
  const remainingGeneral = calculateRemainingGeneralQuestions();

  if (variant === "tooltip") {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className={`flex items-center bg-brand-pink/10 text-brand-pink rounded-full px-3 py-1 cursor-help ${className}`}>
              <Info className="h-4 w-4 mr-1" />
              <span>Credit Info</span>
            </div>
          </TooltipTrigger>
          <TooltipContent side="bottom" className="p-4 w-[280px]">
            <div className="space-y-3">
              <h4 className="font-medium">Kolerr Credit System</h4>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Search className="h-3.5 w-3.5 mr-1.5 text-brand-pink" />
                  <span>KOL Searches:</span>
                </div>
                <span className="font-medium">1 credit each</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <MessageSquare className="h-3.5 w-3.5 mr-1.5 text-brand-pink" />
                  <span>General Questions:</span>
                </div>
                <span className="font-medium">{generalQuestionsPerCredit}:1 ratio</span>
              </div>
              <div className="pt-2 border-t border-border">
                <div className="flex items-center justify-between">
                  <span>Daily credits:</span>
                  <Badge variant="outline" className="font-normal border-brand-pink/30 text-brand-pink">
                    5 (resets at 7AM)
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Remaining searches:</span>
                  <Badge variant="outline" className="font-normal border-brand-pink/30 text-brand-pink">
                    {remainingSearches}
                  </Badge>
                </div>
                <div className="flex items-center justify-between mt-1">
                  <span>Remaining general questions:</span>
                  <Badge variant="outline" className="font-normal border-brand-pink/30 text-brand-pink">
                    {remainingGeneral}
                  </Badge>
                </div>
              </div>
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  if (variant === "compact") {
    return (
      <div className={`flex items-center space-x-2 ${className}`}>
        <Badge variant="outline" className="flex items-center bg-brand-pink/5 border-brand-pink/20">
          <Search className="h-3 w-3 mr-1 text-brand-pink" />
          <span>{remainingSearches}</span>
        </Badge>
        <Badge variant="outline" className="flex items-center bg-brand-pink/5 border-brand-pink/20">
          <MessageSquare className="h-3 w-3 mr-1 text-brand-pink" />
          <span>{remainingGeneral}</span>
        </Badge>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="flex flex-col">
        <div className="flex items-center">
          <Search className="h-4 w-4 mr-1.5 text-brand-pink" />
          <span className="text-sm">KOL searches: <span className="font-medium">{remainingSearches} left</span></span>
        </div>
        <div className="flex items-center mt-1">
          <MessageSquare className="h-4 w-4 mr-1.5 text-brand-pink" />
          <span className="text-sm">General questions: <span className="font-medium">{remainingGeneral} left</span></span>
        </div>
        <div className="text-xs text-muted-foreground mt-1">
          {generalQuestionsPerCredit} general questions = 1 credit (resets at 7AM)
        </div>
      </div>
    </div>
  );
}
