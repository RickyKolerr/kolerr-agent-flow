
export interface Contact {
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
