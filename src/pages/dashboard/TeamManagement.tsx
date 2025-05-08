
import { useState } from "react";
import { Users, UserPlus, UserCheck, UserX, Mail, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

// Mock team data
const mockTeamMembers = [
  {
    id: "user1",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    role: "admin",
    avatar: "https://ui-avatars.com/api/?name=Jane+Smith&background=FF5722&color=fff",
    status: "active",
    invitedAt: "2023-05-15T10:30:00"
  },
  {
    id: "user2",
    name: "Michael Johnson",
    email: "michael.johnson@example.com",
    role: "manager",
    avatar: "https://ui-avatars.com/api/?name=Michael+Johnson&background=4CAF50&color=fff",
    status: "active",
    invitedAt: "2023-06-22T14:15:00"
  },
  {
    id: "user3",
    name: "Emily Davis",
    email: "emily.davis@example.com",
    role: "viewer",
    avatar: "https://ui-avatars.com/api/?name=Emily+Davis&background=2196F3&color=fff",
    status: "pending",
    invitedAt: "2023-08-01T09:45:00"
  }
];

// Team roles with descriptions
const teamRoles = [
  {
    value: "admin",
    label: "Admin",
    description: "Full access to all settings and campaigns"
  },
  {
    value: "manager",
    label: "Manager",
    description: "Can manage campaigns and applications"
  },
  {
    value: "editor",
    label: "Editor",
    description: "Can edit campaigns but cannot create new ones"
  },
  {
    value: "viewer",
    label: "Viewer",
    description: "View-only access to campaigns and analytics"
  }
];

const TeamManagement = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [teamMembers, setTeamMembers] = useState(mockTeamMembers);
  const [isAddMemberOpen, setIsAddMemberOpen] = useState(false);
  const [isEditMemberOpen, setIsEditMemberOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  
  // New member form state
  const [newMemberEmail, setNewMemberEmail] = useState("");
  const [newMemberRole, setNewMemberRole] = useState("viewer");
  
  // Filter team members based on tab
  const filteredMembers = teamMembers.filter(member => {
    if (activeTab === "all") return true;
    return member.status === activeTab;
  });
  
  // Function to handle inviting a new team member
  const handleInviteTeamMember = () => {
    if (!newMemberEmail.trim() || !newMemberEmail.includes('@')) {
      toast.error("Please enter a valid email address");
      return;
    }
    
    // Check if we've reached the limit of 10 team members
    if (teamMembers.length >= 10) {
      toast.error("Team size limit reached (maximum 10 members)");
      return;
    }
    
    // In a real app, this would make an API call
    const newMember = {
      id: `user${teamMembers.length + 1}`,
      name: newMemberEmail.split('@')[0].replace('.', ' '),
      email: newMemberEmail,
      role: newMemberRole,
      avatar: `https://ui-avatars.com/api/?name=${newMemberEmail.split('@')[0]}&background=6D28D9&color=fff`,
      status: "pending",
      invitedAt: new Date().toISOString()
    };
    
    setTeamMembers([...teamMembers, newMember]);
    
    toast.success("Invitation sent", {
      description: `An invitation has been sent to ${newMemberEmail}`
    });
    
    setNewMemberEmail("");
    setNewMemberRole("viewer");
    setIsAddMemberOpen(false);
  };
  
  // Function to handle editing a team member's role
  const handleEditMember = () => {
    if (!selectedMember) return;
    
    const updatedMembers = teamMembers.map(member => 
      member.id === selectedMember.id ? selectedMember : member
    );
    
    setTeamMembers(updatedMembers);
    
    toast.success("Team member updated", {
      description: `${selectedMember.name}'s role has been updated`
    });
    
    setIsEditMemberOpen(false);
  };
  
  // Function to handle removing a team member
  const handleRemoveMember = (memberId) => {
    const memberToRemove = teamMembers.find(member => member.id === memberId);
    
    if (!memberToRemove) return;
    
    const updatedMembers = teamMembers.filter(member => member.id !== memberId);
    setTeamMembers(updatedMembers);
    
    toast.success("Team member removed", {
      description: `${memberToRemove.name} has been removed from your team`
    });
  };
  
  // Function to handle resending an invitation
  const handleResendInvite = (memberId) => {
    const memberToResend = teamMembers.find(member => member.id === memberId);
    
    if (!memberToResend) return;
    
    toast.success("Invitation resent", {
      description: `A new invitation has been sent to ${memberToResend.email}`
    });
  };
  
  // Helper function to get initials from name
  const getInitials = (name) => {
    return name.split(' ').map(part => part[0]).join('').toUpperCase();
  };
  
  // Helper function to format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Users className="h-6 w-6 text-brand-pink" />
          <h1 className="text-2xl font-bold tracking-tight">Team Management</h1>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button 
            variant="default" 
            onClick={() => setIsAddMemberOpen(true)}
            disabled={teamMembers.length >= 10}
          >
            <UserPlus className="h-4 w-4 mr-2" />
            Invite Team Member
          </Button>
        </div>
      </div>
      
      {/* Team size indicator */}
      <div className="flex items-center justify-between mb-4 bg-muted/50 rounded-lg px-4 py-2">
        <div>
          <p className="text-sm font-medium">Team Size</p>
          <p className="text-xs text-muted-foreground">Maximum 10 members per brand account</p>
        </div>
        <div className="flex items-center">
          <span className="text-lg font-bold mr-1">{teamMembers.length}</span>
          <span className="text-sm text-muted-foreground">/ 10</span>
        </div>
      </div>
      
      <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="all" className="text-sm">
            All Members
          </TabsTrigger>
          <TabsTrigger value="active" className="text-sm">
            Active
          </TabsTrigger>
          <TabsTrigger value="pending" className="text-sm">
            Pending
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value={activeTab} className="mt-0">
          <Card>
            <CardHeader className="px-6">
              <CardTitle>Team Members</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {filteredMembers.length > 0 ? (
                <ul className="divide-y">
                  {filteredMembers.map(member => (
                    <li key={member.id} className="px-6 py-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <Avatar>
                            <AvatarImage src={member.avatar} alt={member.name} />
                            <AvatarFallback>{getInitials(member.name)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{member.name}</p>
                            <p className="text-sm text-muted-foreground">{member.email}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-6">
                          <div className="hidden md:block text-right">
                            <div className="flex items-center space-x-2">
                              <Badge 
                                variant={member.status === 'active' ? 'outline' : 'secondary'}
                                className={`${member.status === 'active' ? 'bg-green-500/10 text-green-500 border-green-500/20' : 'bg-amber-500/10 text-amber-500 border-amber-500/20'}`}
                              >
                                {member.status === 'active' ? (
                                  <UserCheck className="h-3 w-3 mr-1" />
                                ) : (
                                  <Mail className="h-3 w-3 mr-1" />
                                )}
                                {member.status === 'active' ? 'Active' : 'Invitation Sent'}
                              </Badge>
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">
                              {member.status === 'active' ? 'Team Member' : `Invited on ${formatDate(member.invitedAt)}`}
                            </p>
                          </div>
                          
                          <div className="text-right">
                            <p className="text-sm font-medium capitalize">{teamRoles.find(role => role.value === member.role)?.label}</p>
                            <p className="text-xs text-muted-foreground hidden md:block">
                              {teamRoles.find(role => role.value === member.role)?.description}
                            </p>
                          </div>
                          
                          <div className="flex space-x-2">
                            {member.status === 'pending' ? (
                              <Button 
                                size="sm" 
                                variant="ghost" 
                                onClick={() => handleResendInvite(member.id)}
                                className="text-brand-pink hover:text-brand-pink/80 hover:bg-brand-pink/10"
                              >
                                Resend
                              </Button>
                            ) : (
                              <Button 
                                size="sm" 
                                variant="ghost"
                                onClick={() => {
                                  setSelectedMember(member);
                                  setIsEditMemberOpen(true);
                                }}
                              >
                                Edit
                              </Button>
                            )}
                            
                            <Button 
                              size="sm" 
                              variant="ghost" 
                              onClick={() => handleRemoveMember(member.id)}
                              className="text-red-500 hover:text-red-600 hover:bg-red-50"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="text-center py-12">
                  <UserX className="mx-auto h-12 w-12 text-muted-foreground mb-3" />
                  <h3 className="text-xl font-medium mb-2">No team members found</h3>
                  <p className="text-muted-foreground mb-4">
                    {activeTab === 'all' 
                      ? "You haven't added any team members yet." 
                      : activeTab === 'active' 
                        ? "You don't have any active team members."
                        : "You don't have any pending invitations."}
                  </p>
                  <Button onClick={() => setIsAddMemberOpen(true)}>
                    <UserPlus className="h-4 w-4 mr-2" />
                    Invite Team Member
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Add Team Member Dialog */}
      <Dialog open={isAddMemberOpen} onOpenChange={setIsAddMemberOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Invite Team Member</DialogTitle>
            <DialogDescription>
              Invite a new member to join your team. They will receive an email invitation.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email Address
              </label>
              <Input 
                id="email" 
                placeholder="colleague@example.com" 
                type="email" 
                value={newMemberEmail}
                onChange={(e) => setNewMemberEmail(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="role" className="text-sm font-medium">
                Role
              </label>
              <Select value={newMemberRole} onValueChange={setNewMemberRole}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  {teamRoles.map(role => (
                    <SelectItem key={role.value} value={role.value}>
                      <div className="flex flex-col">
                        <span>{role.label}</span>
                        <span className="text-xs text-muted-foreground">{role.description}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddMemberOpen(false)}>Cancel</Button>
            <Button onClick={handleInviteTeamMember}>
              <UserPlus className="h-4 w-4 mr-2" />
              Send Invitation
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Edit Team Member Dialog */}
      <Dialog open={isEditMemberOpen} onOpenChange={setIsEditMemberOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Team Member</DialogTitle>
            <DialogDescription>
              Change role and permissions for this team member.
            </DialogDescription>
          </DialogHeader>
          
          {selectedMember && (
            <div className="space-y-4 py-4">
              <div className="flex items-center space-x-4 mb-4">
                <Avatar>
                  <AvatarImage src={selectedMember.avatar} alt={selectedMember.name} />
                  <AvatarFallback>{getInitials(selectedMember.name)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{selectedMember.name}</p>
                  <p className="text-sm text-muted-foreground">{selectedMember.email}</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="edit-role" className="text-sm font-medium">
                  Role
                </label>
                <Select 
                  value={selectedMember.role} 
                  onValueChange={(value) => setSelectedMember({...selectedMember, role: value})}
                >
                  <SelectTrigger id="edit-role">
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    {teamRoles.map(role => (
                      <SelectItem key={role.value} value={role.value}>
                        <div className="flex flex-col">
                          <span>{role.label}</span>
                          <span className="text-xs text-muted-foreground">{role.description}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditMemberOpen(false)}>Cancel</Button>
            <Button onClick={handleEditMember}>
              <Check className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TeamManagement;
