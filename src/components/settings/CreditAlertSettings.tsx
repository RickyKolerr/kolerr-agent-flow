
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell } from "lucide-react";
import { useState } from "react";

export const CreditAlertSettings = () => {
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [threshold, setThreshold] = useState(20);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center space-x-2">
          <Bell className="h-5 w-5 text-muted-foreground" />
          <CardTitle>Credit Alert Settings</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
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
        
        <div className="space-y-2">
          <Label htmlFor="threshold">Alert Threshold (%)</Label>
          <Input
            id="threshold"
            type="number"
            min="1"
            max="100"
            value={threshold}
            onChange={(e) => setThreshold(Number(e.target.value))}
            className="w-24"
          />
          <p className="text-sm text-muted-foreground">
            Get notified when credits fall below this percentage
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
