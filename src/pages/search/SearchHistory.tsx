
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Clock,
  Search,
  Trash2,
  User,
  Filter,
  X,
} from "lucide-react";
import { toast } from "sonner";

interface SearchEntry {
  id: string;
  query: string;
  timestamp: Date;
  type: "creator" | "niche" | "category";
  results: number;
  creditCost: number;
}

const SearchHistory = () => {
  const navigate = useNavigate();
  const [searchEntries, setSearchEntries] = useState<SearchEntry[]>([]);
  const [filteredEntries, setFilteredEntries] = useState<SearchEntry[]>([]);
  const [filterValue, setFilterValue] = useState("");
  const [filterType, setFilterType] = useState<string | null>(null);
  
  // Load search history
  useEffect(() => {
    // In a real app, this would fetch from an API or local storage
    const mockHistory: SearchEntry[] = [
      {
        id: "1",
        query: "Fitness influencer",
        timestamp: new Date(Date.now() - 1000 * 60 * 30),
        type: "niche",
        results: 24,
        creditCost: 1
      },
      {
        id: "2",
        query: "Tech reviewers",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
        type: "niche",
        results: 16,
        creditCost: 1
      },
      {
        id: "3",
        query: "@techguru",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
        type: "creator",
        results: 1,
        creditCost: 1
      },
      {
        id: "4",
        query: "Fashion trends",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
        type: "category",
        results: 42,
        creditCost: 1
      },
      {
        id: "5",
        query: "Beauty tutorials",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
        type: "niche",
        results: 28,
        creditCost: 1
      }
    ];
    
    setSearchEntries(mockHistory);
    setFilteredEntries(mockHistory);
  }, []);
  
  // Apply filters
  useEffect(() => {
    let results = [...searchEntries];
    
    if (filterValue) {
      results = results.filter(entry => 
        entry.query.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    
    if (filterType) {
      results = results.filter(entry => entry.type === filterType);
    }
    
    setFilteredEntries(results);
  }, [searchEntries, filterValue, filterType]);
  
  // Format date relative to now
  const formatRelativeTime = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffMins < 60) {
      return `${diffMins} minute${diffMins !== 1 ? 's' : ''} ago`;
    } else if (diffHours < 24) {
      return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
    } else {
      return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
    }
  };
  
  // Delete a search entry
  const handleDeleteEntry = (id: string) => {
    setSearchEntries(searchEntries.filter(entry => entry.id !== id));
    toast.success("Search entry deleted");
  };
  
  // Clear all search history
  const handleClearHistory = () => {
    setSearchEntries([]);
    toast.success("Search history cleared");
  };
  
  // Repeat a search
  const handleRepeatSearch = (query: string) => {
    navigate(`/search?q=${encodeURIComponent(query)}`);
  };
  
  // Set type filter
  const handleTypeFilter = (type: string | null) => {
    setFilterType(type === filterType ? null : type);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold tracking-tight flex items-center">
          <Clock className="mr-2 h-6 w-6" />
          Search History
        </h1>
        
        <Button 
          variant="outline" 
          onClick={handleClearHistory}
          disabled={searchEntries.length === 0}
        >
          <Trash2 className="h-4 w-4 mr-2" />
          Clear History
        </Button>
      </div>
      
      <Card className="mb-6">
        <CardHeader className="pb-3">
          <CardTitle>Recent Searches</CardTitle>
          <CardDescription>
            View and manage your previous search queries
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Filter searches..."
                className="pl-9"
                value={filterValue}
                onChange={(e) => setFilterValue(e.target.value)}
              />
              {filterValue && (
                <button
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                  onClick={() => setFilterValue("")}
                >
                  <X className="h-4 w-4 text-muted-foreground" />
                </button>
              )}
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground whitespace-nowrap">
                <Filter className="h-4 w-4 inline mr-1" />
                Filter by:
              </span>
              
              <Badge
                variant={filterType === "creator" ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => handleTypeFilter("creator")}
              >
                <User className="h-3 w-3 mr-1" />
                Creator
              </Badge>
              
              <Badge
                variant={filterType === "niche" ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => handleTypeFilter("niche")}
              >
                Niche
              </Badge>
              
              <Badge
                variant={filterType === "category" ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => handleTypeFilter("category")}
              >
                Category
              </Badge>
            </div>
          </div>
          
          {filteredEntries.length > 0 ? (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Search Query</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Results</TableHead>
                    <TableHead>Credits</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredEntries.map((entry) => (
                    <TableRow key={entry.id}>
                      <TableCell className="font-medium">{entry.query}</TableCell>
                      <TableCell>
                        <Badge variant="secondary">
                          {entry.type === "creator" ? (
                            <User className="h-3 w-3 mr-1" />
                          ) : null}
                          {entry.type.charAt(0).toUpperCase() + entry.type.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>{formatRelativeTime(entry.timestamp)}</TableCell>
                      <TableCell>{entry.results}</TableCell>
                      <TableCell>-{entry.creditCost}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button 
                            size="sm" 
                            variant="ghost"
                            onClick={() => handleRepeatSearch(entry.query)}
                          >
                            <Search className="h-4 w-4" />
                            <span className="sr-only">Search again</span>
                          </Button>
                          
                          <Button 
                            size="sm" 
                            variant="ghost"
                            onClick={() => handleDeleteEntry(entry.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Delete</span>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="text-center py-10">
              <Clock className="h-12 w-12 mx-auto text-muted-foreground" />
              <h3 className="mt-4 font-medium">No search history found</h3>
              <p className="text-muted-foreground mt-1 mb-4">
                {searchEntries.length > 0 
                  ? "Try adjusting your filters" 
                  : "Your search history will appear here"}
              </p>
              {searchEntries.length === 0 && (
                <Button onClick={() => navigate("/")}>Start Searching</Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>
      
      <div className="text-sm text-muted-foreground">
        <p>Note: Search history is stored locally on your device and will be deleted when you clear your browser data.</p>
      </div>
    </div>
  );
};

export default SearchHistory;
