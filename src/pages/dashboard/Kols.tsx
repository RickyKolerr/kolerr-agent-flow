
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Search, Filter } from "lucide-react";

const mockKols = [
  {
    id: "1",
    name: "Emma Johnson",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=emma",
    handle: "@emma_travel",
    category: "Travel",
    followers: "450K",
    engagement: "3.8%",
  },
  {
    id: "2",
    name: "Michael Chen",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=michael",
    handle: "@michaeltech",
    category: "Technology",
    followers: "1.2M",
    engagement: "4.2%",
  },
  {
    id: "3",
    name: "Sofia Rodriguez",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sofia",
    handle: "@sofiafashion",
    category: "Fashion",
    followers: "820K",
    engagement: "5.1%",
  }
];

const Kols = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredKols = mockKols.filter(kol => 
    kol.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    kol.handle.toLowerCase().includes(searchQuery.toLowerCase()) ||
    kol.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">KOL Discovery</h1>
        <Button>New Campaign</Button>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search by name, handle, or category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline" className="gap-2">
          <Filter className="h-4 w-4" /> Filters
        </Button>
      </div>

      <div className="grid gap-4">
        {filteredKols.map(kol => (
          <Card key={kol.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <Avatar className="h-14 w-14">
                  <AvatarImage src={kol.avatar} />
                  <AvatarFallback>{kol.name.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{kol.name}</h3>
                      <p className="text-sm text-muted-foreground">{kol.handle}</p>
                    </div>
                    <Badge variant="outline" className="bg-secondary/50">
                      {kol.category}
                    </Badge>
                  </div>
                  <div className="flex gap-4 mt-2 text-sm">
                    <div>
                      <span className="font-medium">{kol.followers}</span>{" "}
                      <span className="text-muted-foreground">followers</span>
                    </div>
                    <div>
                      <span className="font-medium">{kol.engagement}</span>{" "}
                      <span className="text-muted-foreground">engagement</span>
                    </div>
                  </div>
                </div>
                <Button size="sm">View Profile</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Kols;
