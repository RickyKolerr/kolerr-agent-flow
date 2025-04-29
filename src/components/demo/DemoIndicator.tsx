
import { Sparkles, Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface DemoIndicatorProps {
  section: string;
  tooltip?: React.ReactNode;
  icon?: "sparkles" | "info";
}

export function DemoIndicator({
  section,
  tooltip,
  icon = "sparkles"
}: DemoIndicatorProps) {
  const IconComponent = icon === "sparkles" ? Sparkles : Info;
  
  if (tooltip) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="absolute top-0 left-0 bg-brand-pink/90 text-white text-xs px-2 py-1 rounded-br-md z-10 flex items-center">
              <IconComponent className="h-3 w-3 mr-1" />
              <span>{section}</span>
            </div>
          </TooltipTrigger>
          <TooltipContent side="bottom" className="max-w-[250px]">
            {tooltip}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }
  
  return (
    <div className="absolute top-0 left-0 bg-brand-pink/90 text-white text-xs px-2 py-1 rounded-br-md z-10 flex items-center">
      <IconComponent className="h-3 w-3 mr-1" />
      <span>{section}</span>
    </div>
  );
}
