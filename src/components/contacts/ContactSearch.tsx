
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface ContactSearchProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const ContactSearch = ({ searchQuery, onSearchChange }: ContactSearchProps) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center space-x-2">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search contacts by name, email, or company..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="flex-1"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default ContactSearch;
