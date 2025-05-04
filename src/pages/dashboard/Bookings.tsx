import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Calendar, Clock, VideoIcon } from "lucide-react";
import { toast } from "sonner";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";

// Booking type definition
interface Booking {
  id: string;
  kol: {
    id: string;
    name: string;
    handle: string;
    avatar: string;
  };
  date: string;
  time: string;
  duration: string;
  type: "call" | "content" | "event";
  status: "upcoming" | "completed" | "canceled" | "rescheduled";
}

const BookingsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("upcoming");
  const navigate = useNavigate();
  const location = useLocation();

  // Check for success URL parameter
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const status = searchParams.get('status');
    
    if (status === 'success') {
      toast.success("Booking scheduled successfully!");
      // Clear the URL parameter
      navigate('/dashboard/bookings', { replace: true });
    }
  }, [location, navigate]);

  // Mock bookings data with real portrait images
  const mockBookings: Booking[] = [
    {
      id: "book1",
      kol: {
        id: "kol1",
        name: "Sophia Chen",
        handle: "@fashionwithsophia",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&auto=format&fit=crop"
      },
      date: "2023-06-15",
      time: "10:00 AM",
      duration: "30 min",
      type: "call",
      status: "upcoming"
    },
    {
      id: "book2",
      kol: {
        id: "kol2",
        name: "Jake Thomas",
        handle: "@jakeadventures",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&auto=format&fit=crop"
      },
      date: "2023-06-18",
      time: "2:30 PM",
      duration: "45 min",
      type: "content",
      status: "upcoming"
    },
    {
      id: "book3",
      kol: {
        id: "kol3",
        name: "Aisha Mohamed",
        handle: "@aisha_beauty",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&auto=format&fit=crop"
      },
      date: "2023-05-28",
      time: "11:15 AM",
      duration: "60 min",
      type: "call",
      status: "completed"
    },
    {
      id: "book4",
      kol: {
        id: "kol4",
        name: "Mike Wilson",
        handle: "@mike_fitness",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&auto=format&fit=crop"
      },
      date: "2023-06-12",
      time: "4:00 PM",
      duration: "30 min",
      type: "call",
      status: "canceled"
    },
    {
      id: "book5",
      kol: {
        id: "kol5",
        name: "Priya Singh",
        handle: "@priyacooks",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&auto=format&fit=crop"
      },
      date: "2023-06-20",
      time: "1:00 PM",
      duration: "120 min",
      type: "event",
      status: "upcoming"
    }
  ];

  // Filter bookings based on search and active tab
  const filteredBookings = mockBookings
    .filter(booking => 
      booking.kol.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.kol.handle.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter(booking => {
      if (activeTab === "upcoming") {
        return ["upcoming", "rescheduled"].includes(booking.status);
      }
      return booking.status === "completed" || booking.status === "canceled";
    });

  const handleScheduleBooking = () => {
    navigate('/dashboard/schedule-booking');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusColor = (status: Booking['status']) => {
    switch(status) {
      case 'upcoming': return 'bg-blue-500/10 text-blue-500 hover:bg-blue-500/20 border-blue-500/20';
      case 'completed': return 'bg-green-500/10 text-green-500 hover:bg-green-500/20 border-green-500/20';
      case 'canceled': return 'bg-red-500/10 text-red-500 hover:bg-red-500/20 border-red-500/20';
      case 'rescheduled': return 'bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20 border-yellow-500/20';
    }
  };

  const getTypeIcon = (type: Booking['type']) => {
    switch(type) {
      case 'call': return <VideoIcon className="h-4 w-4 text-blue-500" />;
      case 'content': return <Clock className="h-4 w-4 text-purple-500" />;
      case 'event': return <Calendar className="h-4 w-4 text-orange-500" />;
    }
  };

  const handleJoinCall = (booking: Booking) => {
    if (booking.status === 'upcoming') {
      toast.success(`Joining call with ${booking.kol.name}`);
    } else {
      toast.error("This booking is not available for joining");
    }
  };

  const handleReschedule = (booking: Booking) => {
    toast.info(`Rescheduling booking with ${booking.kol.name}`);
  };

  const handleCancel = (booking: Booking) => {
    if (booking.status === 'upcoming') {
      toast.info(`Canceling booking with ${booking.kol.name}`);
    } else {
      toast.error("This booking can't be canceled");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Bookings</h1>
        <Button onClick={handleScheduleBooking} className="bg-brand-pink hover:bg-brand-pink/90">
          <Plus className="mr-2 h-4 w-4" /> Schedule Booking
        </Button>
      </div>

      {/* Search section */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center space-x-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search bookings by KOL name or handle..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1"
            />
          </div>
        </CardContent>
      </Card>

      {/* Tabs for upcoming/past bookings */}
      <Tabs defaultValue="upcoming" value={activeTab} onValueChange={setActiveTab}>
        <div className="flex justify-between items-center">
          <TabsList>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="past">Past Bookings</TabsTrigger>
          </TabsList>
          <span className="text-sm text-muted-foreground">
            Showing {filteredBookings.length} results
          </span>
        </div>

        <TabsContent value="upcoming" className="mt-4">
          {/* Bookings table */}
          <BookingsTable 
            bookings={filteredBookings} 
            formatDate={formatDate}
            getStatusColor={getStatusColor}
            getTypeIcon={getTypeIcon}
            onJoinCall={handleJoinCall}
            onReschedule={handleReschedule}
            onCancel={handleCancel}
          />
        </TabsContent>

        <TabsContent value="past" className="mt-4">
          {/* Past Bookings table */}
          <BookingsTable 
            bookings={filteredBookings} 
            formatDate={formatDate}
            getStatusColor={getStatusColor}
            getTypeIcon={getTypeIcon}
            onJoinCall={handleJoinCall}
            onReschedule={handleReschedule}
            onCancel={handleCancel}
            isPast={true}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

interface BookingsTableProps {
  bookings: Booking[];
  formatDate: (date: string) => string;
  getStatusColor: (status: Booking['status']) => string;
  getTypeIcon: (type: Booking['type']) => JSX.Element;
  onJoinCall: (booking: Booking) => void;
  onReschedule: (booking: Booking) => void;
  onCancel: (booking: Booking) => void;
  isPast?: boolean;
}

const BookingsTable = ({
  bookings,
  formatDate,
  getStatusColor,
  getTypeIcon,
  onJoinCall,
  onReschedule,
  onCancel,
  isPast = false
}: BookingsTableProps) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>KOL</TableHead>
            <TableHead>Date & Time</TableHead>
            <TableHead>Duration</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bookings.length > 0 ? (
            bookings.map((booking) => (
              <TableRow key={booking.id}>
                <TableCell>
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarImage src={booking.kol.avatar} alt={booking.kol.name} />
                      <AvatarFallback>{booking.kol.name.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{booking.kol.name}</div>
                      <div className="text-sm text-muted-foreground">{booking.kol.handle}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="font-medium">{formatDate(booking.date)}</div>
                  <div className="text-sm text-muted-foreground">{booking.time}</div>
                </TableCell>
                <TableCell>{booking.duration}</TableCell>
                <TableCell>
                  <div className="flex items-center space-x-1">
                    {getTypeIcon(booking.type)}
                    <span className="capitalize">{booking.type}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className={getStatusColor(booking.status)}>
                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-2">
                    {!isPast && booking.status === 'upcoming' && (
                      <Button 
                        onClick={() => onJoinCall(booking)} 
                        className="bg-brand-pink hover:bg-brand-pink/90"
                        size="sm"
                      >
                        <VideoIcon className="mr-1 h-4 w-4" /> Join
                      </Button>
                    )}
                    {!isPast && booking.status === 'upcoming' && (
                      <>
                        <Button 
                          onClick={() => onReschedule(booking)} 
                          variant="outline" 
                          size="sm"
                        >
                          Reschedule
                        </Button>
                        <Button 
                          onClick={() => onCancel(booking)} 
                          variant="ghost" 
                          size="sm"
                        >
                          Cancel
                        </Button>
                      </>
                    )}
                    {isPast && booking.status === 'completed' && (
                      <Button variant="outline" size="sm">
                        View Summary
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="h-24 text-center">
                <div className="flex flex-col items-center">
                  <Search className="h-8 w-8 text-muted-foreground mb-2" />
                  <p className="text-muted-foreground">
                    {isPast 
                      ? "No past bookings found." 
                      : "No upcoming bookings found."}
                  </p>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default BookingsPage;
