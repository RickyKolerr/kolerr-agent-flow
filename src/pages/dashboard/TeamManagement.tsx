
import { useState } from "react";
import { Users, Plus, Mail, Trash2 } from "lucide-react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";

// Mock team data
const mockTeamMembers = [
  {
    id: 1,
    name: "Alex Johnson",
    email: "alex@example.com",
    role: "admin",
    status: "active"
  },
  {
    id: 2,
    name: "Jamie Smith",
    email: "jamie@example.com",
    role: "editor",
    status: "active"
  },
  {
    id: 3,
    name: "Morgan Lee",
    email: "morgan@example.com",
    role: "viewer",
    status: "pending"
  }
];

const TeamManagement = () => {
  const { user } = useAuth();
  const [teamMembers, setTeamMembers] = useState(mockTeamMembers);
  const [newMember, setNewMember] = useState({ name: "", email: "", role: "viewer" });
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAddMember = () => {
    // Validate form
    if (!newMember.name || !newMember.email) {
      toast.error("Please fill in all required fields");
      return;
    }

    // Email validation
    if (!/^\S+@\S+\.\S+$/.test(newMember.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    // Check if email already exists
    if (teamMembers.some(member => member.email === newMember.email)) {
      toast.error("A team member with this email already exists");
      return;
    }

    // Add new member
    const updatedMembers = [
      ...teamMembers,
      {
        id: Date.now(),
        name: newMember.name,
        email: newMember.email,
        role: newMember.role,
        status: "pending"
      }
    ];

    // Check if we've reached the limit
    if (updatedMembers.length > 10) {
      toast.error("Your plan allows a maximum of 10 team members");
      return;
    }

    setTeamMembers(updatedMembers);
    setNewMember({ name: "", email: "", role: "viewer" });
    setIsDialogOpen(false);

    toast.success("Team member invitation sent", {
      description: `An invitation has been sent to ${newMember.email}`
    });
  };

  const handleDeleteMember = (id: number) => {
    // Can't delete yourself
    const memberToDelete = teamMembers.find(member => member.id === id);
    if (memberToDelete?.email === user?.email) {
      toast.error("You cannot remove yourself from the team");
      return;
    }

    setTeamMembers(teamMembers.filter(member => member.id !== id));
    toast.success("Team member removed");
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "admin":
        return <Badge className="bg-blue-500">Admin</Badge>;
      case "editor":
        return <Badge className="bg-green-500">Editor</Badge>;
      case "viewer":
        return <Badge variant="outline">Viewer</Badge>;
      default:
        return <Badge variant="outline">{role}</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">Active</Badge>;
      case "pending":
        return <Badge variant="outline" className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20">Pending</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Users className="h-6 w-6 text-brand-pink" />
          <h1 className="text-2xl font-bold tracking-tight">Team Management</h1>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Team Member
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Team Member</DialogTitle>
              <DialogDescription>
                Invite a new team member to help manage your campaigns. 
                Your plan allows up to 10 team members.
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input 
                  id="name" 
                  value={newMember.name} 
                  onChange={(e) => setNewMember({...newMember, name: e.target.value})}
                  placeholder="Enter team member's name"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email"
                  value={newMember.email} 
                  onChange={(e) => setNewMember({...newMember, email: e.target.value})}
                  placeholder="Enter team member's email"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Select 
                  value={newMember.role} 
                  onValueChange={(value) => setNewMember({...newMember, role: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin (Full Access)</SelectItem>
                    <SelectItem value="editor">Editor (Can Edit Campaigns)</SelectItem>
                    <SelectItem value="viewer">Viewer (Read Only)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleAddMember}>Send Invitation</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {teamMembers.map((member) => (
              <TableRow key={member.id}>
                <TableCell className="font-medium">{member.name}</TableCell>
                <TableCell>{member.email}</TableCell>
                <TableCell>{getRoleBadge(member.role)}</TableCell>
                <TableCell>{getStatusBadge(member.status)}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => {
                        toast.success("Invitation resent", {
                          description: `A new invitation has been sent to ${member.email}`
                        });
                      }}
                      disabled={member.status !== "pending"}
                    >
                      <Mail className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => handleDeleteMember(member.id)}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            
            {teamMembers.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  No team members found. Add your first team member to get started.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      
      <div className="text-sm text-muted-foreground">
        <p>You are currently using {teamMembers.length} of 10 available team seats.</p>
      </div>
    </div>
  );
};

export default TeamManagement;
