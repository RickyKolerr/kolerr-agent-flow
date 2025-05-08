
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

interface ProjectFormData {
  title: string;
  description: string;
  type: string;
  dueDate: string;
  maxParticipants: string;
}

interface CreateProjectFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (project: ProjectFormData) => void;
}

// Project types for dropdown
const projectTypes = [
  "Fashion", "Beauty", "Travel", "Fitness", "Food", "Gaming", 
  "Tech", "Lifestyle", "Education", "Music", "Art", "Other"
];

export const CreateProjectForm: React.FC<CreateProjectFormProps> = ({
  isOpen,
  onClose,
  onSubmit
}) => {
  const [projectForm, setProjectForm] = useState<ProjectFormData>({
    title: "",
    description: "",
    type: "",
    dueDate: "",
    maxParticipants: "5"
  });
  
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!projectForm.title || !projectForm.description || !projectForm.type) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    onSubmit(projectForm);
    
    // Reset form
    setProjectForm({
      title: "",
      description: "",
      type: "",
      dueDate: "",
      maxParticipants: "5"
    });
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create New Collaboration Project</DialogTitle>
          <DialogDescription>
            Create a project to collaborate with other creators. Fill in the details below to get started.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleFormSubmit} className="space-y-6 py-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Project Title <span className="text-red-500">*</span></Label>
              <Input 
                id="title"
                placeholder="Enter a catchy title for your project"
                value={projectForm.title}
                onChange={(e) => setProjectForm({...projectForm, title: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description <span className="text-red-500">*</span></Label>
              <Textarea 
                id="description"
                placeholder="Describe what your project is about and what you're looking for"
                className="min-h-[100px]"
                value={projectForm.description}
                onChange={(e) => setProjectForm({...projectForm, description: e.target.value})}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="type">Project Type <span className="text-red-500">*</span></Label>
                <Select 
                  value={projectForm.type}
                  onValueChange={(value) => setProjectForm({...projectForm, type: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a project type" />
                  </SelectTrigger>
                  <SelectContent>
                    {projectTypes.map((type) => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="dueDate">Due Date</Label>
                <Input 
                  id="dueDate"
                  type="date"
                  value={projectForm.dueDate}
                  onChange={(e) => setProjectForm({...projectForm, dueDate: e.target.value})}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="maxParticipants">Maximum Participants</Label>
              <Select 
                value={projectForm.maxParticipants} 
                onValueChange={(value) => setProjectForm({...projectForm, maxParticipants: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select maximum participants" />
                </SelectTrigger>
                <SelectContent>
                  {[2, 3, 5, 8, 10, 15, 20].map((num) => (
                    <SelectItem key={num} value={num.toString()}>
                      {num} participants
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Create Project</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
