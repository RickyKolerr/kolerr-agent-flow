
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Slot } from "@/types/campaign";
import { PlusCircle, Users, Target, Calendar, DollarSign } from "lucide-react";
import { toast } from "sonner";

interface SlotManagementProps {
  campaignId: string;
  slots: Slot[];
  onAddSlot: (slot: Omit<Slot, "id">) => void;
  onUpdateSlot?: (id: string, slot: Partial<Slot>) => void;
  onRemoveSlot?: (id: string) => void;
}

export const SlotManagement = ({ 
  campaignId, 
  slots = [], 
  onAddSlot,
  onUpdateSlot,
  onRemoveSlot
}: SlotManagementProps) => {
  const [isAddingSlot, setIsAddingSlot] = useState(false);
  const [newSlot, setNewSlot] = useState<Partial<Omit<Slot, "id">>>({
    name: "",
    targetKOLs: 1,
    minEngagement: 3,
    maxBudget: 500,
    targetAudience: [],
    requirements: [],
    status: "open",
    assignedKols: []
  });

  const handleAddSlot = () => {
    if (!newSlot.name) {
      toast.error("Please provide a name for the slot");
      return;
    }
    
    // Format the slot data
    const slotData = {
      ...newSlot,
      name: newSlot.name || "Unnamed Slot",
      targetKOLs: newSlot.targetKOLs || 1,
      minEngagement: newSlot.minEngagement || 3,
      maxBudget: newSlot.maxBudget || 500,
      targetAudience: newSlot.targetAudience || [],
      startDate: newSlot.startDate || new Date().toISOString(),
      endDate: newSlot.endDate || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      requirements: newSlot.requirements || [],
      status: "open",
      assignedKols: []
    } as Omit<Slot, "id">;
    
    onAddSlot(slotData);
    setIsAddingSlot(false);
    setNewSlot({
      name: "",
      targetKOLs: 1,
      minEngagement: 3,
      maxBudget: 500,
      targetAudience: [],
      requirements: []
    });
    
    toast.success("Slot added successfully");
  };

  const getStatusColor = (status: Slot['status']) => {
    switch (status) {
      case 'open': return "bg-green-500/10 text-green-500 border-green-500/20";
      case 'filled': return "bg-blue-500/10 text-blue-500 border-blue-500/20";
      case 'in-progress': return "bg-amber-500/10 text-amber-500 border-amber-500/20";
      case 'completed': return "bg-purple-500/10 text-purple-500 border-purple-500/20";
      default: return "";
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">SLOT Management</h3>
        <Button 
          onClick={() => setIsAddingSlot(!isAddingSlot)}
          variant="outline"
          size="sm"
        >
          <PlusCircle className="h-4 w-4 mr-2" />
          {isAddingSlot ? "Cancel" : "Add Slot"}
        </Button>
      </div>
      
      {isAddingSlot && (
        <Card className="border-dashed border-2 border-muted">
          <CardHeader>
            <CardTitle className="text-lg">New SLOT</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Name</label>
                <Input 
                  placeholder="Slot name"
                  value={newSlot.name}
                  onChange={(e) => setNewSlot({...newSlot, name: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Target KOLs</label>
                <Input 
                  type="number"
                  placeholder="Number of KOLs"
                  value={newSlot.targetKOLs}
                  onChange={(e) => setNewSlot({...newSlot, targetKOLs: parseInt(e.target.value) || 1})}
                  min={1}
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Min. Engagement (%)</label>
                <Input 
                  type="number"
                  placeholder="Minimum engagement rate"
                  value={newSlot.minEngagement}
                  onChange={(e) => setNewSlot({...newSlot, minEngagement: parseFloat(e.target.value) || 0})}
                  min={0}
                  step={0.1}
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Max Budget ($)</label>
                <Input 
                  type="number"
                  placeholder="Maximum budget"
                  value={newSlot.maxBudget}
                  onChange={(e) => setNewSlot({...newSlot, maxBudget: parseInt(e.target.value) || 0})}
                  min={0}
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Start Date</label>
                <Input 
                  type="date"
                  value={newSlot.startDate ? new Date(newSlot.startDate).toISOString().split('T')[0] : ""}
                  onChange={(e) => setNewSlot({...newSlot, startDate: new Date(e.target.value).toISOString()})}
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">End Date</label>
                <Input 
                  type="date"
                  value={newSlot.endDate ? new Date(newSlot.endDate).toISOString().split('T')[0] : ""}
                  onChange={(e) => setNewSlot({...newSlot, endDate: new Date(e.target.value).toISOString()})}
                />
              </div>
            </div>
            
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setIsAddingSlot(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleAddSlot}>
                Add SLOT
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
      
      {slots.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {slots.map((slot) => (
            <Card key={slot.id}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg">{slot.name}</CardTitle>
                  <Badge variant="outline" className={getStatusColor(slot.status)}>
                    {slot.status.charAt(0).toUpperCase() + slot.status.slice(1)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1 text-muted-foreground" />
                    <span>{slot.targetKOLs} KOLs</span>
                  </div>
                  <div className="flex items-center">
                    <Target className="h-4 w-4 mr-1 text-muted-foreground" />
                    <span>{slot.minEngagement}% Engagement</span>
                  </div>
                  <div className="flex items-center">
                    <DollarSign className="h-4 w-4 mr-1 text-muted-foreground" />
                    <span>${slot.maxBudget}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                    <span>{formatDate(slot.startDate)} - {formatDate(slot.endDate)}</span>
                  </div>
                </div>
                
                <div className="flex justify-between pt-2 border-t border-border">
                  <span className="text-sm">{slot.assignedKols.length}/{slot.targetKOLs} KOLs Assigned</span>
                  <div className="flex gap-2">
                    {onRemoveSlot && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 px-2 text-red-500 hover:text-red-600"
                        onClick={() => onRemoveSlot(slot.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-muted-foreground border rounded-md bg-muted/30">
          <p>No slots have been added yet.</p>
          <p className="text-sm">Create SLOT to micromanage your campaign requirements.</p>
        </div>
      )}
    </div>
  );
};
