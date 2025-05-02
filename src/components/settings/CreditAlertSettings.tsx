
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Bell, Info } from "lucide-react";
import { useState } from "react";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useCredits } from "@/contexts/CreditContext";
import { toast } from "sonner";

export const CreditAlertSettings = () => {
  const { hasPremiumPlan } = useCredits();
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [appAlerts, setAppAlerts] = useState(true);
  const [threshold, setThreshold] = useState(20);
  const [notificationType, setNotificationType] = useState<"percentage" | "absolute">("percentage");

  const handleSaveChanges = () => {
    toast.success("Alert preferences saved", {
      description: `You'll now receive alerts when credits are running ${
        notificationType === "percentage" 
          ? `below ${threshold}%` 
          : `low (${threshold} credits remaining)`
      }`
    });
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center space-x-2">
          <Bell className="h-5 w-5 text-muted-foreground" />
          <h3 className="font-medium">Credit Alert Settings</h3>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Email Alerts */}
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="email-alerts">Email Alerts</Label>
            <p className="text-sm text-muted-foreground">
              Receive notifications by email when credits are running low
            </p>
          </div>
          <Switch
            id="email-alerts"
            checked={emailAlerts}
            onCheckedChange={setEmailAlerts}
          />
        </div>
        
        {/* In-app Alerts */}
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="app-alerts">In-app Alerts</Label>
            <p className="text-sm text-muted-foreground">
              Show toast notifications when credits are running low
            </p>
          </div>
          <Switch
            id="app-alerts"
            checked={appAlerts}
            onCheckedChange={setAppAlerts}
          />
        </div>
        
        {(emailAlerts || appAlerts) && (
          <>
            <div className="space-y-3">
              <div className="flex items-center">
                <Label className="mr-2">Alert Type</Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-xs max-w-[250px]">
                        Choose whether to receive alerts based on a percentage of your total credits
                        or when a specific number of credits is remaining.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              
              <RadioGroup 
                value={notificationType} 
                onValueChange={(val) => setNotificationType(val as "percentage" | "absolute")}
                className="flex flex-col space-y-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="percentage" id="percentage" />
                  <Label htmlFor="percentage">Percentage based</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="absolute" id="absolute" />
                  <Label htmlFor="absolute">Fixed amount</Label>
                </div>
              </RadioGroup>
            </div>
            
            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
              <div className="space-y-1 mb-2 sm:mb-0">
                <Label htmlFor="threshold">
                  Alert {notificationType === "percentage" ? "Threshold (%)" : "when credits below"}
                </Label>
                <div className="flex items-center">
                  <Input
                    id="threshold"
                    type="number"
                    min={notificationType === "percentage" ? "1" : "1"}
                    max={notificationType === "percentage" ? "100" : "100"}
                    value={threshold}
                    onChange={(e) => setThreshold(Number(e.target.value))}
                    className="w-20 mr-2"
                  />
                  <span className="text-sm text-muted-foreground">
                    {notificationType === "percentage" ? "%" : "credits"}
                  </span>
                </div>
              </div>
              <div className="text-sm text-muted-foreground mt-2 sm:mt-0">
                {notificationType === "percentage"
                  ? `You'll be notified when your credits fall below ${threshold}% of your total allocation`
                  : `You'll be notified when your credits fall below ${threshold}`}
              </div>
            </div>
            
            <div className="pt-4 flex justify-end">
              <Button
                onClick={handleSaveChanges}
                className="bg-brand-pink hover:bg-brand-pink/90"
              >
                Save Preferences
              </Button>
            </div>
          </>
        )}
        
        {hasPremiumPlan && (
          <div className="p-3 bg-brand-pink/10 border border-brand-pink/20 rounded-md text-sm">
            <p className="flex items-center">
              <Info className="h-4 w-4 mr-2 text-brand-pink" />
              <span>As a premium user, you don't need to worry about free credit limits.</span>
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
