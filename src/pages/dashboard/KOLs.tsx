
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, Filter, Star, Users, BarChart3, Calendar, Plus, Eye } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import BookingModal from "@/components/booking/BookingModal";

// Define KOL interface
interface KOL {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  category: string;
  followers: number;
  engagement: number;
  bookingRate: number;
  location: string;
  tags: string[];
  verified: boolean;
  rating: number;
}

const KOLsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [activeView, setActiveView] = useState("all");
  const navigate = useNavigate();
  const [selectedKOL, setSelectedKOL] = useState<KOL | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  // Mock KOL data with real portrait images from Unsplash
  const mockKOLs: KOL[] = [
    {
      id: "kol1",
      name: "Sophia Chen",
      handle: "@fashionwithsophia",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&auto=format&fit=crop",
      category: "Fashion",
      followers: 2500000,
      engagement: 4.2,
      bookingRate: 4500,
      location: "New York, USA",
      tags: ["fashion", "style", "beauty"],
      verified: true,
      rating: 4.8
    },
    {
      id: "kol2",
      name: "Jake Thomas",
      handle: "@jakeadventures",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&auto=format&fit=crop",
      category: "Travel",
      followers: 1800000,
      engagement: 5.1,
      bookingRate: 3200,
      location: "Los Angeles, USA",
      tags: ["travel", "adventure", "lifestyle"],
      verified: true,
      rating: 4.6
    },
    {
      id: "kol3",
      name: "Aisha Mohamed",
      handle: "@aisha_beauty",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&auto=format&fit=crop",
      category: "Beauty",
      followers: 3200000,
      engagement: 6.4,
      bookingRate: 5500,
      location: "London, UK",
      tags: ["makeup", "skincare", "tutorials"],
      verified: true,
      rating: 4.9
    },
    {
      id: "kol4",
      name: "Mike Wilson",
      handle: "@mike_fitness",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&auto=format&fit=crop",
      category: "Fitness",
      followers: 1500000,
      engagement: 3.8,
      bookingRate: 2800,
      location: "Miami, USA",
      tags: ["fitness", "health", "nutrition"],
      verified: false,
      rating: 4.3
    },
    {
      id: "kol5",
      name: "Priya Singh",
      handle: "@priyacooks",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&auto=format&fit=crop",
      category: "Food",
      followers: 1300000,
      engagement: 4.7,
      bookingRate: 2200,
      location: "Toronto, Canada",
      tags: ["recipes", "cooking", "food"],
      verified: true,
      rating: 4.7
    },
    {
      id: "kol6",
      name: "David Park",
      handle: "@techwithdavid",
      avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=150&h=150&auto=format&fit=crop",
      category: "Tech",
      followers: 950000,
      engagement: 3.5,
      bookingRate: 3000,
      location: "Seoul, South Korea",
      tags: ["tech", "gadgets", "reviews"],
      verified: false,
      rating: 4.2
    },
    {
      id: "kol7",
      name: "Zara Lewis",
      handle: "@zara_artlife",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&auto=format&fit=crop",
      category: "Art",
      followers: 700000,
      engagement: 5.5,
      bookingRate: 1800,
      location: "Berlin, Germany",
      tags: ["art", "crafts", "diy"],
      verified: false,
      rating: 4.4
    },
    {
      id: "kol8",
      name: "Leo Martinez",
      handle: "@leo_gaming",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&auto=format&fit=crop",
      category: "Gaming",
      followers: 4100000,
      engagement: 7.2,
      bookingRate: 6500,
      location: "Madrid, Spain",
      tags: ["gaming", "esports", "reviews"],
      verified: true,
      rating: 4.9
    }
  ];

  // Filter based on search query, category and view
  const filteredKOLs = mockKOLs
    .filter(kol => 
      kol.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      kol.handle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      kol.tags.some(tag => tag.includes(searchQuery.toLowerCase()))
    )
    .filter(kol => selectedCategory === "all" || kol.category.toLowerCase() === selectedCategory.toLowerCase())
    .filter(kol => {
      if (activeView === "all") return true;
      if (activeView === "verified") return kol.verified;
      if (activeView === "saved") return [1, 2, 5].includes(Number(kol.id.replace("kol", ""))); // Mock saved KOLs
      return true;
    });

  const formatFollowers = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  const handleAddToList = (kolId: string, listName: string = "Potential collaborators") => {
    toast.success(`Added to ${listName}`);
  };

  const handleContactKOL = (kolId: string) => {
    toast.success("Contact request sent");
  };

  const handleBookSlot = (kol: KOL) => {
    setSelectedKOL(kol);
    setIsBookingModalOpen(true);
  };
  
  const handleViewProfile = (kolId: string) => {
    navigate(`/creators/${kolId}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">KOLs</h1>
      </div>

      {/* Search and filter section */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
            <div className="flex items-center space-x-2 flex-1">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search KOLs by name, handle, or tag..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1"
              />
            </div>
            <div className="flex space-x-2">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Fashion">Fashion</SelectItem>
                  <SelectItem value="Travel">Travel</SelectItem>
                  <SelectItem value="Beauty">Beauty</SelectItem>
                  <SelectItem value="Fitness">Fitness</SelectItem>
                  <SelectItem value="Food">Food</SelectItem>
                  <SelectItem value="Tech">Tech</SelectItem>
                  <SelectItem value="Art">Art</SelectItem>
                  <SelectItem value="Gaming">Gaming</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs for different views */}
      <Tabs defaultValue="all" value={activeView} onValueChange={setActiveView}>
        <div className="flex justify-between items-center">
          <TabsList>
            <TabsTrigger value="all">All KOLs</TabsTrigger>
            <TabsTrigger value="verified">Verified</TabsTrigger>
            <TabsTrigger value="saved">Saved</TabsTrigger>
          </TabsList>
          <span className="text-sm text-muted-foreground">
            Showing {filteredKOLs.length} results
          </span>
        </div>

        <TabsContent value="all" className="mt-4">
          <KOLsTable 
            kols={filteredKOLs} 
            formatFollowers={formatFollowers} 
            onAddToList={handleAddToList}
            onContactKOL={handleContactKOL}
            onBookSlot={handleBookSlot}
            onViewProfile={handleViewProfile}
          />
        </TabsContent>

        <TabsContent value="verified" className="mt-4">
          <KOLsTable 
            kols={filteredKOLs} 
            formatFollowers={formatFollowers}
            onAddToList={handleAddToList}
            onContactKOL={handleContactKOL}
            onBookSlot={handleBookSlot}
            onViewProfile={handleViewProfile}
          />
        </TabsContent>

        <TabsContent value="saved" className="mt-4">
          <KOLsTable 
            kols={filteredKOLs} 
            formatFollowers={formatFollowers}
            onAddToList={handleAddToList}
            onContactKOL={handleContactKOL}
            onBookSlot={handleBookSlot}
            onViewProfile={handleViewProfile}
          />
        </TabsContent>
      </Tabs>

      {/* Booking Modal */}
      {selectedKOL && (
        <BookingModal
          open={isBookingModalOpen}
          onClose={() => setIsBookingModalOpen(false)}
          contactName={selectedKOL.name}
        />
      )}
    </div>
  );
};

interface KOLsTableProps {
  kols: KOL[];
  formatFollowers: (num: number) => string;
  onAddToList: (kolId: string) => void;
  onContactKOL: (kolId: string) => void;
  onBookSlot: (kol: KOL) => void;
  onViewProfile: (kolId: string) => void;
}

const KOLsTable = ({ kols, formatFollowers, onAddToList, onContactKOL, onBookSlot, onViewProfile }: KOLsTableProps) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[250px]">Influencer</TableHead>
            <TableHead>Category</TableHead>
            <TableHead><Users className="h-4 w-4" /></TableHead>
            <TableHead><BarChart3 className="h-4 w-4" /></TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Rating</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {kols.length > 0 ? (
            kols.map((kol) => (
              <TableRow key={kol.id}>
                <TableCell>
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarImage src={kol.avatar} alt={kol.name} />
                      <AvatarFallback>{kol.name.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{kol.name}</div>
                      <div className="text-sm text-muted-foreground flex items-center">
                        {kol.handle}
                        {kol.verified && (
                          <Badge variant="outline" className="ml-2 bg-blue-500/10 text-blue-500 hover:bg-blue-500/20 border-blue-500/20">
                            Verified
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{kol.category}</TableCell>
                <TableCell>{formatFollowers(kol.followers)}</TableCell>
                <TableCell>{kol.engagement}%</TableCell>
                <TableCell>{kol.location}</TableCell>
                <TableCell className="flex items-center">
                  <Star className="h-3 w-3 text-yellow-500 mr-1" fill="currentColor" />
                  {kol.rating}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-2">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => onViewProfile(kol.id)}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                    
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => onAddToList(kol.id)}
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      List
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => onContactKOL(kol.id)}
                    >
                      Contact
                    </Button>
                    
                    <Button 
                      size="sm"
                      className="bg-brand-pink hover:bg-brand-pink/90"
                      onClick={() => onBookSlot(kol)}
                    >
                      <Calendar className="h-4 w-4 mr-1" />
                      Book
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-8">
                <div className="flex flex-col items-center">
                  <Search className="h-10 w-10 text-muted-foreground mb-2" />
                  <p className="text-muted-foreground">No KOLs found matching your search criteria</p>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default KOLsPage;
