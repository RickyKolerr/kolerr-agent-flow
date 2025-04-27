
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useCredits } from "@/contexts/CreditContext";
import { CreditCard } from "lucide-react";

interface CreditBadgeProps {
  variant?: "default" | "compact";
  showTooltip?: boolean;
}

export const CreditBadge = ({ variant = "default", showTooltip = true }: CreditBadgeProps) => {
  const { freeCredits, premiumCredits, timeUntilReset, hasPremiumPlan } = useCredits();
  
  const badgeContent = (
    <Badge 
      className={`bg-brand-pink/20 text-brand-pink hover:bg-brand-pink/30 flex items-center gap-1 ${
        variant === "compact" ? "px-2 py-0.5" : "px-3 py-1"
      }`}
    >
      <CreditCard className={variant === "compact" ? "h-3 w-3" : "h-4 w-4"} />
      <span>
        {variant === "compact" ? freeCredits : `${freeCredits} free credits`}
        {hasPremiumPlan && variant !== "compact" && ` + ${premiumCredits} premium`}
      </span>
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
          <div className="text-sm space-y-1">
            <p className="font-medium">Credits Summary</p>
            <p>{freeCredits} free daily credits left</p>
            {hasPremiumPlan && <p>{premiumCredits} premium credits left</p>}
            <p className="text-xs text-muted-foreground">Resets in {timeUntilReset}</p>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
