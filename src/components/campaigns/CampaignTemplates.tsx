
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import { CampaignStatus } from "@/types/campaign";

interface CampaignTemplate {
  id: string;
  title: string;
  description: string;
  defaultBudget: number;
  defaultAudience: string;
  status: CampaignStatus;
}

const defaultTemplates: CampaignTemplate[] = [
  {
    id: "influencer-campaign",
    title: "Influencer Product Launch",
    description: "Template for product launches with influencer partnerships",
    defaultBudget: 5000,
    defaultAudience: "Fashion & Lifestyle enthusiasts, 18-35",
    status: "draft"
  },
  {
    id: "brand-awareness",
    title: "Brand Awareness Campaign",
    description: "Template for increasing brand visibility and reach",
    defaultBudget: 3000,
    defaultAudience: "General audience, 25-45",
    status: "draft"
  }
];

interface CampaignTemplatesProps {
  onSelectTemplate: (template: CampaignTemplate) => void;
}

export const CampaignTemplates = ({ onSelectTemplate }: CampaignTemplatesProps) => {
  const [templates] = useState<CampaignTemplate[]>(defaultTemplates);

  const handleSelectTemplate = (template: CampaignTemplate) => {
    onSelectTemplate(template);
    toast.success(`Template "${template.title}" selected`);
  };

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {templates.map((template) => (
        <Card key={template.id} className="cursor-pointer hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">
              {template.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              {template.description}
            </p>
            <div className="space-y-2 text-sm">
              <p><span className="font-medium">Budget:</span> ${template.defaultBudget.toLocaleString()}</p>
              <p><span className="font-medium">Target Audience:</span> {template.defaultAudience}</p>
            </div>
            <Button 
              onClick={() => handleSelectTemplate(template)}
              className="w-full mt-4"
            >
              Use Template
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
