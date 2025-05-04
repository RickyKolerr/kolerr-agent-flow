
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, BookmarkIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const SearchPreferences = () => {
  const [autoSave, setAutoSave] = useState(true);
  const [defaultSort, setDefaultSort] = useState("relevance");
  const navigate = useNavigate();

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
        
        <div className="pt-4 flex flex-col space-y-2">
          <Button 
            variant="outline" 
            className="w-full flex items-center justify-center"
            onClick={() => navigate("/search/history")}
          >
            <BookmarkIcon className="h-4 w-4 mr-2" />
            View Saved Searches
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => navigate("/search/advanced")}
          >
            <Search className="h-4 w-4 mr-2" />
            Advanced Search
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
