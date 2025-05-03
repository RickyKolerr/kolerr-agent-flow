
import React from "react";
import { X, Home, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { useMobileDetection } from "@/hooks/use-mobile-detection";

interface ChatAgentHeaderProps {
  title: string;
  subtitle: string;
  onClose?: () => void;
}

export const ChatAgentHeader: React.FC<ChatAgentHeaderProps> = ({ title, subtitle, onClose }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { hasTouch } = useMobileDetection();
  
  // Get appropriate dashboard path based on user role
  const getDashboardPath = () => {
    return user?.role === 'kol' ? "/dashboard/kol" : "/dashboard";
  };

  return (
    <div className="flex justify-between items-center p-4 border-b border-white/10">
      <div>
        <h2 className="font-medium text-lg">{title}</h2>
        <p className="text-sm text-muted-foreground">{subtitle}</p>
      </div>
      <div className="flex items-center gap-2">
        {/* Navigation buttons */}
        <NavButton 
          icon={<LayoutDashboard className="h-5 w-5" />} 
          label="Dashboard" 
          hasTouch={hasTouch} 
          onClick={() => navigate(getDashboardPath())}
        />
        <NavButton 
          icon={<Home className="h-5 w-5" />} 
          label="Home" 
          hasTouch={hasTouch}
          onClick={() => navigate('/')}
        />
        {onClose && (
          <Button
            onClick={onClose}
            size="icon"
            variant="ghost"
            className="h-8 w-8 text-muted-foreground hover:text-brand-pink"
          >
            <X className="h-5 w-5" />
            <span className="sr-only">Close</span>
          </Button>
        )}
      </div>
    </div>
  );
};

// Navigation button component with tooltip for desktop
const NavButton = ({ 
  icon, 
  label, 
  hasTouch, 
  onClick 
}: { 
  icon: React.ReactNode, 
  label: string, 
  hasTouch: boolean, 
  onClick?: () => void 
}) => {
  // Don't use tooltips on touch devices to avoid interaction issues
  if (hasTouch) {
    return (
      <Button 
        variant="ghost" 
        size="icon" 
        className="h-10 w-10 md:h-8 md:w-8 text-muted-foreground hover:text-brand-pink touch-manipulation" 
        onClick={onClick}
      >
        {icon}
      </Button>
    );
  }
  
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 text-muted-foreground hover:text-brand-pink"
            onClick={onClick}
          >
            {icon}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
