import { Sparkles } from "lucide-react";
interface DemoIndicatorProps {
  section: string;
}
export function DemoIndicator({
  section
}: DemoIndicatorProps) {
  return <div className="absolute top-0 left-0 bg-brand-pink/90 text-white text-xs px-2 py-1 rounded-br-md z-10 flex items-center">
      <Sparkles className="h-3 w-3 mr-1" />
      
    </div>;
}