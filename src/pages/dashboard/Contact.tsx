
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Search, MessageCircle, Mail, Phone } from "lucide-react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

// Contact type definition
interface Contact {
  id: string;
  name: string;
  avatar: string;
  email: string;
  phone: string;
  company: string;
  role: string;
  lastContact: string;
  status: "active" | "pending" | "inactive";
}

const ContactPage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Mock contacts data with real portrait images
  const mockContacts: Contact[] = [
    {
      id: "contact1",
      name: "Sophia Chen",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&auto=format&fit=crop",
      email: "sophia.chen@example.com",
      phone: "+1 (555) 123-4567",
      company: "Style Fashion Inc.",
      role: "Fashion Influencer",
      lastContact: "2023-06-10",
      status: "active"
    },
    {
      id: "contact2",
      name: "Jake Thomas",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&auto=format&fit=crop",
      email: "jake.thomas@example.com",
      phone: "+1 (555) 234-5678",
      company: "Adventure Tours",
      role: "Travel Blogger",
      lastContact: "2023-06-05",
      status: "active"
    },
    {
      id: "contact3",
      name: "Aisha Mohamed",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&auto=format&fit=crop",
      email: "aisha.mohamed@example.com",
      phone: "+1 (555) 345-6789",
      company: "Beauty Trends LLC",
      role: "Beauty Influencer",
      lastContact: "2023-05-28",
      status: "pending"
    },
    {
      id: "contact4",
      name: "Mike Wilson",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&auto=format&fit=crop",
      email: "mike.wilson@example.com",
      phone: "+1 (555) 456-7890",
      company: "FitLife Solutions",
      role: "Fitness Coach",
      lastContact: "2023-06-12",
      status: "inactive"
    },
    {
      id: "contact5",
      name: "Priya Singh",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&auto=format&fit=crop",
      email: "priya.singh@example.com",
      phone: "+1 (555) 567-8901",
      company: "Culinary Creations",
      role: "Food Blogger",
      lastContact: "2023-06-08",
      status: "active"
    }
  ];

  // Filter contacts based on search
  const filteredContacts = mockContacts.filter(contact => 
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.company.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusColor = (status: Contact['status']) => {
    switch(status) {
      case 'active': return 'bg-green-500/10 text-green-500 hover:bg-green-500/20 border-green-500/20';
      case 'pending': return 'bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20 border-yellow-500/20';
      case 'inactive': return 'bg-gray-500/10 text-gray-500 hover:bg-gray-500/20 border-gray-500/20';
    }
  };

  const handleAddContact = () => {
    toast.success("Opening new contact form...");
  };

  const handleContactEmail = (contact: Contact) => {
    toast.success(`Sending email to ${contact.name}`);
  };

  const handleContactCall = (contact: Contact) => {
    toast.success(`Calling ${contact.name} at ${contact.phone}`);
  };

  const handleContactMessage = (contact: Contact) => {
    toast.success(`Opening message composer for ${contact.name}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Contacts</h1>
        <Button onClick={handleAddContact} className="bg-brand-pink hover:bg-brand-pink/90">
          <Plus className="mr-2 h-4 w-4" /> Add Contact
        </Button>
      </div>

      {/* Search section */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center space-x-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search contacts by name, email, or company..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1"
            />
          </div>
        </CardContent>
      </Card>

      {/* Contacts table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Contact</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Last Contact</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredContacts.length > 0 ? (
              filteredContacts.map((contact) => (
                <TableRow key={contact.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarImage src={contact.avatar} alt={contact.name} />
                        <AvatarFallback>{contact.name.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{contact.name}</div>
                        <div className="text-sm text-muted-foreground">{contact.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{contact.company}</TableCell>
                  <TableCell>{contact.role}</TableCell>
                  <TableCell>{formatDate(contact.lastContact)}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getStatusColor(contact.status)}>
                      {contact.status.charAt(0).toUpperCase() + contact.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button 
                        onClick={() => handleContactEmail(contact)} 
                        variant="outline"
                        size="sm"
                      >
                        <Mail className="h-4 w-4" />
                      </Button>
                      <Button 
                        onClick={() => handleContactCall(contact)} 
                        variant="outline"
                        size="sm"
                      >
                        <Phone className="h-4 w-4" />
                      </Button>
                      <Button 
                        onClick={() => handleContactMessage(contact)} 
                        className="bg-brand-pink hover:bg-brand-pink/90"
                        size="sm"
                      >
                        <MessageCircle className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  <div className="flex flex-col items-center">
                    <Search className="h-8 w-8 text-muted-foreground mb-2" />
                    <p className="text-muted-foreground">No contacts found.</p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ContactPage;
