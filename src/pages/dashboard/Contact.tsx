
import { useState } from "react";
import { BookingModal } from "@/components/booking/BookingModal";
import { mockContacts } from "@/data/mockContacts";
import { Contact } from "@/types/contact";
import { toast } from "sonner";
import ContactHeader from "@/components/contacts/ContactHeader";
import ContactSearch from "@/components/contacts/ContactSearch";
import ContactList from "@/components/contacts/ContactList";

const ContactPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  // Filter contacts based on search
  const filteredContacts = mockContacts.filter(contact => 
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.company.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddContact = () => {
    toast.success("Opening new contact form...");
  };

  const handleBookContact = (contact: Contact) => {
    setSelectedContact(contact);
    setIsBookingModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <ContactHeader title="Contacts" onAddContact={handleAddContact} />
      <ContactSearch searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      <ContactList contacts={filteredContacts} onBookContact={handleBookContact} />

      {/* Booking Modal */}
      {selectedContact && (
        <BookingModal
          open={isBookingModalOpen}
          onClose={() => setIsBookingModalOpen(false)}
          contactName={selectedContact.name}
        />
      )}
    </div>
  );
};

export default ContactPage;
