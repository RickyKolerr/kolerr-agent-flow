
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { toast } from "sonner";

interface ContactHeaderProps {
  title: string;
  onAddContact: () => void;
}

const ContactHeader = ({ title, onAddContact }: ContactHeaderProps) => {
  return (
    <div className="flex justify-between items-center">
      <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
      <Button onClick={onAddContact} className="bg-brand-pink hover:bg-brand-pink/90">
        <Plus className="mr-2 h-4 w-4" /> Add Contact
      </Button>
    </div>
  );
};

export default ContactHeader;
