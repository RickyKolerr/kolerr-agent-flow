
import { useState } from "react";
import { 
  UserPlus, 
  Trash2, 
  Mail, 
  Check, 
  X, 
  Edit, 
  Shield, 
  UserCog 
} from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

type TeamMember = {
  id: string;
  name: string;
  email: string;
  role: "admin" | "editor" | "viewer";
  status: "active" | "invited" | "revoked";
  dateAdded: string;
}

export const TeamManagement = () => {
  const [members, setMembers] = useState<TeamMember[]>([
    { 
      id: "1", 
      name: "John Smith", 
      email: "john@example.com", 
      role: "admin", 
      status: "active",
      dateAdded: "2023-05-12"
    },
    { 
      id: "2", 
      name: "Sarah Johnson", 
      email: "sarah@example.com", 
      role: "editor", 
      status: "active",
      dateAdded: "2023-06-15"
    }
  ]);
  
  const [inviteDialogOpen, setInviteDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState<"admin" | "editor" | "viewer">("viewer");
  const [currentMember, setCurrentMember] = useState<TeamMember | null>(null);

  const handleInvite = () => {
    // Would connect to backend in a real implementation
    const newMember: TeamMember = {
      id: Date.now().toString(),
      name: inviteEmail.split('@')[0], // Temporary name based on email
      email: inviteEmail,
      role: inviteRole,
      status: "invited",
      dateAdded: new Date().toISOString().split('T')[0]
    };
    
    setMembers([...members, newMember]);
    setInviteEmail("");
    setInviteRole("viewer");
    setInviteDialogOpen(false);
    
    toast.success("Team invitation sent", {
      description: `An invitation has been sent to ${inviteEmail}`
    });
  };

  const handleEdit = () => {
    if (!currentMember) return;
    
    setMembers(members.map(member => 
      member.id === currentMember.id ? currentMember : member
    ));
    
    setCurrentMember(null);
    setEditDialogOpen(false);
    toast.success("Team member updated");
  };

  const handleRevoke = (id: string) => {
    setMembers(members.map(member => 
      member.id === id ? {...member, status: "revoked"} : member
    ));
    
    toast.success("Access revoked", {
      description: "Team member access has been revoked"
    });
  };

  const handleRemove = (id: string) => {
    setMembers(members.filter(member => member.id !== id));
    
    toast.success("Team member removed");
  };
  
  const getRoleIcon = (role: string) => {
    switch (role) {
      case "admin": return <Shield className="h-4 w-4 text-brand-pink" />;
      case "editor": return <Edit className="h-4 w-4 text-blue-500" />;
      default: return <UserCog className="h-4 w-4 text-green-500" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="flex items-center gap-2">
              Team Management
            </CardTitle>
            <CardDescription>
              Invite up to 10 team members to collaborate on campaigns
            </CardDescription>
          </div>
          <Button 
            onClick={() => setInviteDialogOpen(true)} 
            variant="outline"
            disabled={members.filter(m => m.status !== "revoked").length >= 10}
          >
            <UserPlus className="h-4 w-4 mr-2" />
            Invite Member
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date Added</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {members.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                  No team members yet. Invite someone to get started.
                </TableCell>
              </TableRow>
            ) : (
              members.map((member) => (
                <TableRow key={member.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{member.name}</p>
                      <p className="text-sm text-muted-foreground">{member.email}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      {getRoleIcon(member.role)}
                      <span className="capitalize">{member.role}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {member.status === "active" && (
                      <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">Active</Badge>
                    )}
                    {member.status === "invited" && (
                      <Badge variant="outline" className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20">Pending</Badge>
                    )}
                    {member.status === "revoked" && (
                      <Badge variant="outline" className="bg-red-500/10 text-red-500 border-red-500/20">Revoked</Badge>
                    )}
                  </TableCell>
                  <TableCell>{member.dateAdded}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      {member.status !== "revoked" && (
                        <>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => {
                              setCurrentMember(member);
                              setEditDialogOpen(true);
                            }}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => handleRevoke(member.id)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleRemove(member.id)}
                        className="text-red-500 hover:text-red-600 hover:bg-red-100/10"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
        
        <div className="mt-4 text-sm text-muted-foreground">
          {members.filter(m => m.status !== "revoked").length}/10 team members
        </div>
      </CardContent>
      
      {/* Invite Dialog */}
      <Dialog open={inviteDialogOpen} onOpenChange={setInviteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Invite Team Member</DialogTitle>
            <DialogDescription>
              Send an invitation to join your brand's team.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email Address
              </label>
              <div className="flex gap-2">
                <Input
                  id="email"
                  placeholder="colleague@example.com"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="role" className="text-sm font-medium">
                Role
              </label>
              <Select 
                value={inviteRole} 
                onValueChange={(value) => setInviteRole(value as "admin" | "editor" | "viewer")}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Access Level</SelectLabel>
                    <SelectItem value="admin">
                      <div className="flex items-center gap-2">
                        <Shield className="h-4 w-4" />
                        <span>Admin (Full access)</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="editor">
                      <div className="flex items-center gap-2">
                        <Edit className="h-4 w-4" />
                        <span>Editor (Can edit campaigns)</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="viewer">
                      <div className="flex items-center gap-2">
                        <UserCog className="h-4 w-4" />
                        <span>Viewer (Read-only)</span>
                      </div>
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setInviteDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleInvite} disabled={!inviteEmail}>
              <Mail className="h-4 w-4 mr-2" />
              Send Invitation
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Team Member</DialogTitle>
            <DialogDescription>
              Update role and permissions for {currentMember?.name}
            </DialogDescription>
          </DialogHeader>
          
          {currentMember && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Name
                </label>
                <Input
                  id="name"
                  value={currentMember.name}
                  onChange={(e) => setCurrentMember({...currentMember, name: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="edit-role" className="text-sm font-medium">
                  Role
                </label>
                <Select 
                  value={currentMember.role} 
                  onValueChange={(value) => setCurrentMember({
                    ...currentMember, 
                    role: value as "admin" | "editor" | "viewer"
                  })}
                >
                  <SelectTrigger id="edit-role">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Access Level</SelectLabel>
                      <SelectItem value="admin">
                        <div className="flex items-center gap-2">
                          <Shield className="h-4 w-4" />
                          <span>Admin (Full access)</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="editor">
                        <div className="flex items-center gap-2">
                          <Edit className="h-4 w-4" />
                          <span>Editor (Can edit campaigns)</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="viewer">
                        <div className="flex items-center gap-2">
                          <UserCog className="h-4 w-4" />
                          <span>Viewer (Read-only)</span>
                        </div>
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEdit}>
              <Check className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};
