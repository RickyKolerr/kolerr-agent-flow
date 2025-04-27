
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";
import { useState } from "react";

export const SearchPreferences = () => {
  const [autoSave, setAutoSave] = useState(true);
  const [defaultSort, setDefaultSort] = useState("relevance");

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center space-x-2">
          <Search className="h-5 w-5 text-muted-foreground" />
          <CardTitle>Search Preferences</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="auto-save">Auto-save Searches</Label>
            <p className="text-sm text-muted-foreground">
              Automatically save your search history
            </p>
          </div>
          <Switch
            id="auto-save"
            checked={autoSave}
            onCheckedChange={setAutoSave}
          />
        </div>
        
        <div className="space-y-2">
          <Label>Default Sort Order</Label>
          <Select value={defaultSort} onValueChange={setDefaultSort}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select sort order" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="relevance">Relevance</SelectItem>
              <SelectItem value="date">Date</SelectItem>
              <SelectItem value="followers">Followers</SelectItem>
              <SelectItem value="engagement">Engagement Rate</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
};
