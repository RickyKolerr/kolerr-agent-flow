
import React from "react";
import { Toggle } from "@/components/ui/toggle";
import { LightbulbIcon, Search } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useCredits } from "@/contexts/CreditContext";

interface ChatToggleProps {
  isSearchMode: boolean;
  onToggle: (isSearchMode: boolean) => void;
  variant?: "default" | "pill";
  showLabels?: boolean;
}

export const ChatToggle: React.FC<ChatToggleProps> = ({
  isSearchMode,
  onToggle,
  variant = "default",
  showLabels = true
}) => {
  const { hasPremiumPlan } = useCredits();
  
  const handleToggle = () => {
    onToggle(!isSearchMode);
  };

  // Generate appropriate tooltip text based on user's plan
  const getTooltipText = () => {
    if (isSearchMode) {
      return hasPremiumPlan 
        ? "Search Mode (1 premium credit per search)" 
        : "Search Mode (1 credit per search)";
    } else {
      return hasPremiumPlan
        ? "Normal Mode (uses fewer premium credits)"
        : "Normal Mode (1 credit per 2 questions)"; // Updated from 3 to 2
    }
  };

  // Pill variant similar to the screenshot
  if (variant === "pill") {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={handleToggle}
              className={`flex items-center gap-2 rounded-full px-4 py-2 transition-all ${
                isSearchMode
                  ? "bg-brand-pink/90 text-white hover:bg-brand-pink"
                  : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
            >
              {isSearchMode ? (
                <Search className="h-4 w-4" />
              ) : (
                <LightbulbIcon className="h-4 w-4" />
              )}
              <span>Chat</span>
            </button>
          </TooltipTrigger>
          <TooltipContent side="top">
            <p>{getTooltipText()}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  // Default toggle style
  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center space-x-2 rounded-md border p-1">
        <Toggle
          pressed={!isSearchMode}
          onPressedChange={() => onToggle(false)}
          className={`flex gap-1 items-center data-[state=on]:bg-blue-500 data-[state=on]:text-white ${!isSearchMode ? "bg-blue-500 text-white" : ""}`}
        >
          <LightbulbIcon className="h-4 w-4" />
          {showLabels && <span className="text-xs">Normal</span>}
        </Toggle>
        <Toggle
          pressed={isSearchMode}
          onPressedChange={() => onToggle(true)}
          className={`flex gap-1 items-center data-[state=on]:bg-brand-pink data-[state=on]:text-white ${isSearchMode ? "bg-brand-pink text-white" : ""}`}
        >
          <Search className="h-4 w-4" />
          {showLabels && <span className="text-xs">Search</span>}
        </Toggle>
      </div>
      <div className="mt-1 text-xs text-muted-foreground">
        {isSearchMode ? "1:1 credit ratio" : "2:1 credit ratio"} {/* Updated from 3:1 to 2:1 */}
      </div>
    </div>
  );
};
