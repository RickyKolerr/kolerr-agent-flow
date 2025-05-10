
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { CreatorSelector } from "@/components/contracts/CreatorSelector";

// Contract templates
const contractTemplates = [
  {
    id: "product-review",
    title: "Product Review Agreement",
    description: "Terms for honest product reviews",
    icon: "📝"
  },
  {
    id: "brand-ambassador",
    title: "Brand Ambassador Contract",
    description: "Long-term brand representation",
    icon: "🏆"
  },
  {
    id: "event-appearance",
    title: "Event Appearance Contract",
    description: "Terms for in-person events",
    icon: "🎪"
  }
];

const CreateContract: React.FC = () => {
  const navigate = useNavigate();
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [step, setStep] = useState<'template' | 'creator'>('template');
  const [selectedCreator, setSelectedCreator] = useState<string | null>(null);

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId);
  };

  const handleContinue = () => {
    if (!selectedTemplate) {
      toast.error("Please select a contract template");
      return;
    }
    setStep('creator');
  };

  const handleCreateContract = () => {
    if (!selectedCreator) {
      toast.error("Please select a creator");
      return;
    }

    toast.success("Contract created successfully", {
      description: "Your contract has been created and is ready for review"
    });

    // Generate a mock contract ID and navigate to it
    const mockContractId = `contract-${Date.now()}`;
    navigate(`/dashboard/contracts/${mockContractId}?creator=${selectedCreator}`);
  };

  const handleBackToTemplates = () => {
    setStep('template');
  };

  const handleCreatorSelect = (creatorId: string) => {
    setSelectedCreator(creatorId);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Create Contract</h1>
      </div>

      {step === 'template' ? (
        <div className="grid gap-6">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Select a Contract Template</h2>
            <p className="text-muted-foreground">Choose a contract template to get started</p>
          </div>

          <div className="grid gap-4">
            {contractTemplates.map((template) => (
              <Card
                key={template.id}
                className={`cursor-pointer transition-all ${
                  selectedTemplate === template.id
                    ? "border-2 border-brand-pink"
                    : "border border-border hover:border-brand-pink/50"
                }`}
                onClick={() => handleTemplateSelect(template.id)}
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="text-4xl">{template.icon}</div>
                    <div>
                      <CardTitle className="text-xl mb-1">{template.title}</CardTitle>
                      <p className="text-muted-foreground">{template.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Button 
            size="lg" 
            onClick={handleContinue}
            disabled={!selectedTemplate}
            className="mt-4"
          >
            Continue to Select Creator
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          <Button 
            variant="outline" 
            onClick={handleBackToTemplates}
            className="mb-4"
          >
            ← Back to Templates
          </Button>

          <CreatorSelector 
            contractType={selectedTemplate || ''} 
            onCreatorSelect={handleCreatorSelect}
          />

          <div className="flex justify-end mt-6">
            <Button
              size="lg"
              onClick={handleCreateContract}
              disabled={!selectedCreator}
            >
              Create Contract
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateContract;
