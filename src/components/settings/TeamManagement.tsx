
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PlusIcon, MoreHorizontal, TrashIcon, Send, UserPlus } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";

// Mock team members for the demo
const MOCK_TEAM_MEMBERS = [
  {
    id: 1,
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    role: "Admin",
    avatar: null,
  },
  {
    id: 2,
    name: "Sarah Williams",
    email: "sarah.williams@example.com",
    role: "Editor",
    avatar: null,
  },
  {
    id: 3,
    name: "Michael Brown",
    email: "michael.brown@example.com",
    role: "Viewer",
    avatar: null,
  },
];

// Role options
const ROLES = [
  { value: "Admin", label: "Admin - Full access to all features" },
  { value: "Editor", label: "Editor - Can edit but not delete" },
  { value: "Viewer", label: "Viewer - View-only access" },
];

export function TeamManagement() {
  const [teamMembers, setTeamMembers] = useState(MOCK_TEAM_MEMBERS);
  const [inviteDialogOpen, setInviteDialogOpen] = useState(false);
  const [emailInput, setEmailInput] = useState("");
  const [selectedRole, setSelectedRole] = useState("Viewer");
  
  const handleInvite = () => {
    // In a real app, this would send an invitation to the email
    if (!emailInput.includes('@')) {
      toast.error("Please enter a valid email address");
      return;
    }
    
    toast.success(`Invitation sent to ${emailInput}`);
    setInviteDialogOpen(false);
    setEmailInput("");
  };
  
  const handleRemoveMember = (id: number) => {
    setTeamMembers(teamMembers.filter(member => member.id !== id));
    toast.success("Team member removed");
  };
  
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map(part => part[0])
      .join("")
      .toUpperCase();
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Team Members</h2>
          <p className="text-muted-foreground">
            Manage who has access to your brand's Kolerr account
          </p>
        </div>
        
        <Dialog open={inviteDialogOpen} onOpenChange={setInviteDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="default" className="whitespace-nowrap">
              <UserPlus className="mr-2 h-4 w-4" />
              Invite Member
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Invite a team member</DialogTitle>
              <DialogDescription>
                Send an invitation email to add a new team member.
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email address
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="colleague@example.com"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="role" className="text-sm font-medium">
                  Role
                </label>
                <select
                  id="role"
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  {ROLES.map((role) => (
                    <option key={role.value} value={role.value}>
                      {role.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            <DialogFooter>
              <Button type="submit" onClick={handleInvite}>
                <Send className="mr-2 h-4 w-4" />
                Send Invitation
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <Card>
        <CardContent className="p-0">
          <div className="divide-y">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="flex items-center justify-between p-4"
              >
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src={member.avatar || undefined} />
                    <AvatarFallback>{getInitials(member.name)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{member.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {member.email}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge
                    variant={
                      member.role === "Admin"
                        ? "default"
                        : member.role === "Editor"
                        ? "secondary"
                        : "outline"
                    }
                  >
                    {member.role}
                  </Badge>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Actions</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem 
                        onClick={() => handleRemoveMember(member.id)}
                        className="text-destructive focus:text-destructive"
                      >
                        <TrashIcon className="mr-2 h-4 w-4" />
                        Remove
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
