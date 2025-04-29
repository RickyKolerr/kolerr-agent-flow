
import { Check } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const ResetSuccessView = () => {
  const navigate = useNavigate();
  
  return (
    <div className="space-y-4">
      <div className="flex justify-center mb-4">
        <div className="h-16 w-16 rounded-full bg-brand-pink/20 flex items-center justify-center">
          <Check className="h-8 w-8 text-brand-pink" />
        </div>
      </div>
      <div className="text-center space-y-2">
        <p className="text-muted-foreground">
          You will be redirected to the login page shortly.
        </p>
        <Progress value={100} className="my-4" />
        <Button 
          onClick={() => navigate("/login")} 
          className="mt-2 w-full bg-brand-pink hover:bg-brand-pink/90"
        >
          Go to Login Now
        </Button>
      </div>
    </div>
  );
};
