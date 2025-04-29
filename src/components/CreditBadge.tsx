
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useCredits } from "@/contexts/CreditContext";
import { CreditCard, HelpCircle } from "lucide-react";
import { useIntelligentCredits } from "@/hooks/useIntelligentCredits";

interface CreditBadgeProps {
  variant?: "default" | "compact" | "detailed";
  showTooltip?: boolean;
}

export const CreditBadge = ({ variant = "default", showTooltip = true }: CreditBadgeProps) => {
  const { freeCredits: originalCredits, premiumCredits, timeUntilReset, hasPremiumPlan } = useCredits();
  
  // Use the intelligent credits hook to get the updated credit count and general question counter
  const { 
    freeCredits, 
    generalQuestionCounter,
    remainingGeneralQuestions,
    generalQuestionsPerCredit
  } = useIntelligentCredits(originalCredits, hasPremiumPlan);
  
  // Prepare detailed credit usage information
  const creditDetails = [
    { label: "KOL/Campaign Specific", usage: "1 credit per query" },
    { label: "General Questions", usage: `${generalQuestionsPerCredit} questions = 1 credit` },
    { label: "Remaining Questions", usage: `${remainingGeneralQuestions} before next credit use` }
  ];
  
  const badgeContent = (
    <Badge 
      className={`${
        variant === "compact" ? "px-2 py-0.5" : "px-3 py-1"
      } ${
        variant === "detailed" ? "bg-brand-pink hover:bg-brand-pink/90 text-white" : "bg-brand-pink/20 text-brand-pink hover:bg-brand-pink/30"
      } flex items-center gap-1`}
    >
      <CreditCard className={variant === "compact" ? "h-3 w-3" : "h-4 w-4"} />
      <span>
        {variant === "compact" ? freeCredits : `${freeCredits} free credits`}
        {hasPremiumPlan && variant !== "compact" && ` + ${premiumCredits} premium`}
      </span>
      {variant === "detailed" && (
        <HelpCircle className="h-3 w-3 ml-1 opacity-70" />
      )}
    </Badge>
  );
  
  if (!showTooltip) {
    return badgeContent;
  }
  
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          {badgeContent}
        </TooltipTrigger>
        <TooltipContent>
          <div className="text-sm space-y-2">
            <p className="font-medium">Credits Summary</p>
            <p>{freeCredits} free daily credits left</p>
            {hasPremiumPlan && <p>{premiumCredits} premium credits left</p>}
            
            {!hasPremiumPlan && (
              <>
                <div className="text-xs pt-1 border-t border-border">
                  <p className="font-medium mb-1">Credit Usage</p>
                  {creditDetails.map((detail, i) => (
                    <div key={i} className="flex justify-between">
                      <span>{detail.label}:</span>
                      <span className="text-muted-foreground">{detail.usage}</span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground pt-1 border-t border-border">Resets in {timeUntilReset}</p>
              </>
            )}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
