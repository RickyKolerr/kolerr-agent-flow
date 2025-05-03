
import { Contact } from "@/types/contact";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Search } from "lucide-react";
import ContactActions from "./ContactActions";

interface ContactListProps {
  contacts: Contact[];
  onBookContact: (contact: Contact) => void;
}

const ContactList = ({ contacts, onBookContact }: ContactListProps) => {
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

  return (
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
          {contacts.length > 0 ? (
            contacts.map((contact) => (
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
                  <ContactActions contact={contact} onBookContact={onBookContact} />
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
  );
};

export default ContactList;
