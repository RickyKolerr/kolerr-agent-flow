
import { Button } from "@/components/ui/button";
import { Mail, Phone, MessageCircle, Calendar, Eye } from "lucide-react";
import { Contact } from "@/types/contact";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

interface ContactActionsProps {
  contact: Contact;
  onBookContact: (contact: Contact) => void;
}

const ContactActions = ({ contact, onBookContact }: ContactActionsProps) => {
  const navigate = useNavigate();
  
  const handleContactEmail = () => {
    toast.success(`Sending email to ${contact.name}`);
  };

  const handleContactCall = () => {
    toast.success(`Calling ${contact.name} at ${contact.phone}`);
  };

  const handleContactMessage = () => {
    toast.success(`Opening message composer for ${contact.name}`);
  };

  const handleViewProfile = () => {
    navigate(`/creators/${contact.id}`);
  };

  return (
    <div className="flex justify-end space-x-2">
      <Button 
        onClick={handleViewProfile} 
        variant="outline"
        size="sm"
      >
        <Eye className="h-4 w-4" />
      </Button>
      <Button 
        onClick={handleContactEmail} 
        variant="outline"
        size="sm"
      >
        <Mail className="h-4 w-4" />
      </Button>
      <Button 
        onClick={handleContactCall} 
        variant="outline"
        size="sm"
      >
        <Phone className="h-4 w-4" />
      </Button>
      <Button 
        onClick={handleContactMessage} 
        variant="outline"
        size="sm"
      >
        <MessageCircle className="h-4 w-4" />
      </Button>
      <Button 
        onClick={() => onBookContact(contact)} 
        className="bg-brand-pink hover:bg-brand-pink/90"
        size="sm"
      >
        <Calendar className="mr-1 h-4 w-4" /> Book
      </Button>
    </div>
  );
};

export default ContactActions;
