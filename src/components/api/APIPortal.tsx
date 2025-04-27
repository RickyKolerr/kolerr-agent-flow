
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User } from "lucide-react";
import { toast } from "sonner";

export const APIPortal = () => {
  const handleRegenerateKey = () => {
    toast.success("API key regenerated successfully");
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center space-x-2">
          <User className="h-5 w-5 text-muted-foreground" />
          <CardTitle>API Access</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="api-key">API Key</Label>
          <div className="flex space-x-2">
            <Input
              id="api-key"
              type="password"
              value="••••••••••••••••••••••"
              readOnly
              className="font-mono"
            />
            <Button variant="outline" onClick={() => handleRegenerateKey()}>
              Regenerate
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">
            Use this key to authenticate API requests
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
