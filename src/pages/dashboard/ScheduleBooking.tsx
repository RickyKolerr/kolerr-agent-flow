
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { format } from "date-fns";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { cn } from "@/lib/utils";
import { CalendarIcon, Clock, ChevronLeft } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Define schema for booking form validation
const bookingFormSchema = z.object({
  kolId: z.string({
    required_error: "Please select a KOL to book",
  }),
  date: z.date({
    required_error: "Please select a date for the booking",
  }),
  time: z.string({
    required_error: "Please select a time slot",
  }),
  duration: z.string({
    required_error: "Please select a duration",
  }),
  type: z.enum(["call", "content", "event"], {
    required_error: "Please select a booking type",
  }),
  description: z.string().optional(),
});

type BookingFormValues = z.infer<typeof bookingFormSchema>;

// Mock KOL data
const mockKOLs = [
  {
    id: "kol1",
    name: "Sophia Chen",
    handle: "@fashionwithsophia",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&auto=format&fit=crop",
    category: "Fashion"
  },
  {
    id: "kol2",
    name: "Jake Thomas",
    handle: "@jakeadventures",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&auto=format&fit=crop",
    category: "Travel"
  },
  {
    id: "kol3",
    name: "Aisha Mohamed",
    handle: "@aisha_beauty",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&auto=format&fit=crop",
    category: "Beauty"
  },
  {
    id: "kol4",
    name: "Mike Wilson",
    handle: "@mike_fitness",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&auto=format&fit=crop",
    category: "Fitness"
  },
  {
    id: "kol5",
    name: "Priya Singh",
    handle: "@priyacooks",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&auto=format&fit=crop",
    category: "Food"
  }
];

// Available time slots
const availableTimeSlots = [
  "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM",
  "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM",
  "01:00 PM", "01:30 PM", "02:00 PM", "02:30 PM",
  "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM"
];

const ScheduleBookingPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<'select_kol' | 'booking_details' | 'review'>('select_kol');
  const [selectedKOL, setSelectedKOL] = useState<typeof mockKOLs[0] | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Filter creators based on search query
  const filteredKOLs = mockKOLs.filter(kol => 
    kol.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    kol.handle.toLowerCase().includes(searchQuery.toLowerCase()) ||
    kol.category.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Initialize form
  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      kolId: "",
      duration: "30",
      type: "call",
      description: "",
    },
  });

  // Watch for form value changes
  const watchedKolId = form.watch("kolId");
  
  // Update selected KOL when form value changes
  useEffect(() => {
    if (watchedKolId) {
      const kol = mockKOLs.find(k => k.id === watchedKolId);
      setSelectedKOL(kol || null);
    }
  }, [watchedKolId]);

  // Form submission handler
  const onSubmit = (data: BookingFormValues) => {
    if (step === 'select_kol') {
      setStep('booking_details');
    } else if (step === 'booking_details') {
      setStep('review');
    } else {
      // Submit the booking
      console.log("Submitting booking:", data);
      toast.success("Booking scheduled successfully!");
      navigate("/dashboard/bookings?status=success");
    }
  };

  // Go back to previous step
  const handleBack = () => {
    if (step === 'booking_details') {
      setStep('select_kol');
    } else if (step === 'review') {
      setStep('booking_details');
    }
  };

  // Calculate booking cost based on duration
  const calculateBookingCost = () => {
    const duration = form.getValues("duration");
    const baseRate = 100;
    const minutes = parseInt(duration);
    return baseRate * (minutes / 30);
  };

  // Handle direct selection of a KOL
  const handleKOLSelect = (kolId: string) => {
    form.setValue("kolId", kolId);
    onSubmit(form.getValues());
  };

  return (
    <div className="max-w-2xl mx-auto py-6">
      <div className="flex items-center mb-6">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => navigate('/dashboard/bookings')}
          className="mr-2"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to Bookings
        </Button>
        <h1 className="text-2xl font-bold">Schedule Booking</h1>
      </div>
      
      <Card className="bg-black/80 border-white/10">
        <CardHeader>
          <CardTitle>
            {step === 'select_kol' ? "Select Creator" : 
             step === 'booking_details' ? "Booking Details" : 
             "Review & Confirm"}
          </CardTitle>
          <CardDescription>
            {step === 'select_kol' ? "Choose a creator to book a session with" : 
             step === 'booking_details' ? "Select your preferred date and time" : 
             "Review your booking details before confirming"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {step === 'select_kol' && (
                <>
                  <div>
                    <div className="mb-4">
                      <Input 
                        placeholder="Search creators by name, handle, or category..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="bg-black/50 border-white/20"
                      />
                    </div>
                    <div className="space-y-3">
                      {filteredKOLs.map(kol => (
                        <div 
                          key={kol.id} 
                          className={`p-3 border border-white/10 rounded-lg cursor-pointer hover:bg-black/30 flex items-center ${
                            kol.id === watchedKolId ? 'bg-brand-pink/20 border-brand-pink/30' : ''
                          }`}
                          onClick={() => handleKOLSelect(kol.id)}
                        >
                          <Avatar className="h-12 w-12 mr-3 border border-white/20">
                            <AvatarImage src={kol.avatar} alt={kol.name} />
                            <AvatarFallback>{kol.name.substring(0, 2)}</AvatarFallback>
                          </Avatar>
                          <div className="flex flex-col">
                            <span className="font-medium">{kol.name}</span>
                            <span className="text-sm text-muted-foreground">{kol.handle}</span>
                            <span className="text-xs px-2 py-0.5 rounded-full bg-brand-pink/20 text-brand-pink w-fit mt-1">{kol.category}</span>
                          </div>
                        </div>
                      ))}
                      
                      {filteredKOLs.length === 0 && (
                        <div className="text-center py-8 text-muted-foreground">
                          No creators found matching your search.
                        </div>
                      )}
                    </div>
                  </div>
                </>
              )}

              {step === 'booking_details' && (
                <>
                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Date</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) =>
                                date < new Date() || date > new Date(new Date().setMonth(new Date().getMonth() + 3))
                              }
                              initialFocus
                              className="p-3 pointer-events-auto"
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="time"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Time</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a time slot" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {availableTimeSlots.map(timeSlot => (
                              <SelectItem key={timeSlot} value={timeSlot}>
                                {timeSlot}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="duration"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Duration</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select duration" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="15">15 minutes</SelectItem>
                            <SelectItem value="30">30 minutes</SelectItem>
                            <SelectItem value="45">45 minutes</SelectItem>
                            <SelectItem value="60">60 minutes</SelectItem>
                            <SelectItem value="90">90 minutes</SelectItem>
                            <SelectItem value="120">120 minutes</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Booking Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select booking type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="call">Video Call</SelectItem>
                            <SelectItem value="content">Content Creation</SelectItem>
                            <SelectItem value="event">Event</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description (Optional)</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Add any specific details or requests here..." 
                            {...field} 
                            className="min-h-[100px]"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}

              {step === 'review' && selectedKOL && (
                <div className="space-y-4">
                  <div className="flex items-center space-x-4 p-4 bg-muted rounded-lg">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={selectedKOL.avatar} alt={selectedKOL.name} />
                      <AvatarFallback>{selectedKOL.name.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-medium">{selectedKOL.name}</h3>
                      <p className="text-sm text-muted-foreground">{selectedKOL.handle}</p>
                    </div>
                  </div>
                  
                  <div className="border rounded-lg">
                    <div className="grid grid-cols-2 p-4 border-b">
                      <div className="text-muted-foreground">Date:</div>
                      <div>{form.getValues("date") ? format(form.getValues("date"), "MMMM d, yyyy") : "Not selected"}</div>
                    </div>
                    <div className="grid grid-cols-2 p-4 border-b">
                      <div className="text-muted-foreground">Time:</div>
                      <div>{form.getValues("time")}</div>
                    </div>
                    <div className="grid grid-cols-2 p-4 border-b">
                      <div className="text-muted-foreground">Duration:</div>
                      <div>{form.getValues("duration")} minutes</div>
                    </div>
                    <div className="grid grid-cols-2 p-4 border-b">
                      <div className="text-muted-foreground">Type:</div>
                      <div className="capitalize">{form.getValues("type")}</div>
                    </div>
                    <div className="grid grid-cols-2 p-4">
                      <div className="text-muted-foreground">Total Cost:</div>
                      <div className="font-semibold">${calculateBookingCost().toFixed(2)}</div>
                    </div>
                  </div>
                  
                  {form.getValues("description") && (
                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-2">Description:</h4>
                      <p className="text-sm text-muted-foreground">{form.getValues("description")}</p>
                    </div>
                  )}
                </div>
              )}
              
              <div className="pt-4 space-x-3 flex justify-end">
                {step !== 'select_kol' && (
                  <Button type="button" variant="outline" onClick={handleBack}>
                    Back
                  </Button>
                )}
                <Button type="submit" className="bg-brand-pink hover:bg-brand-pink/90">
                  {step === 'select_kol' ? 'Continue' : 
                   step === 'booking_details' ? 'Review' : 
                   'Confirm & Schedule'}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ScheduleBookingPage;
