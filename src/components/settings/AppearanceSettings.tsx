
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export const AppearanceSettings = () => {
  const [theme, setTheme] = useState("system");

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Palette className="h-5 w-5" />
          Appearance
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <RadioGroup defaultValue="system" value={theme} onValueChange={setTheme}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="light" id="light" />
            <Label htmlFor="light">Light</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="dark" id="dark" />
            <Label htmlFor="dark">Dark</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="system" id="system" />
            <Label htmlFor="system">System</Label>
          </div>
        </RadioGroup>
        
        <div className="pt-4 border-t">
          <h3 className="text-sm font-medium mb-3">Color Theme Preview</h3>
          <div className="grid grid-cols-2 gap-2">
            <Button variant="navy">Navy</Button>
            <Button variant="cyan">Cyan</Button>
            <Button variant="navy-cyan">Navy-Cyan</Button>
            <Button variant="navy-outline">Navy Outline</Button>
            <Button variant="cyan-outline">Cyan Outline</Button>
            <Button variant="save">Save</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
