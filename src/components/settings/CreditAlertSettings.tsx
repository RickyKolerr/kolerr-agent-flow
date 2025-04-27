
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Bell } from "lucide-react";
import { useState } from "react";

export const CreditAlertSettings = () => {
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [threshold, setThreshold] = useState(20);

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center space-x-2">
          <Bell className="h-5 w-5 text-muted-foreground" />
          <h3 className="font-medium">Credit Alert Settings</h3>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="email-alerts">Email Alerts</Label>
            <p className="text-sm text-muted-foreground">
              Receive notifications when credits are running low
            </p>
          </div>
          <Switch
            id="email-alerts"
            checked={emailAlerts}
            onCheckedChange={setEmailAlerts}
          />
        </div>
        
        {emailAlerts && (
          <div className="flex items-center space-x-4">
            <div className="space-y-1 flex-1">
              <Label htmlFor="threshold">Alert Threshold (%)</Label>
              <div className="flex items-center">
                <Input
                  id="threshold"
                  type="number"
                  min="1"
                  max="100"
                  value={threshold}
                  onChange={(e) => setThreshold(Number(e.target.value))}
                  className="w-20 mr-2"
                />
                <span className="text-sm text-muted-foreground">%</span>
              </div>
            </div>
            <div className="text-sm text-muted-foreground hidden sm:block max-w-[60%]">
              You'll be notified when your credits fall below {threshold}% of your total allocation
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
