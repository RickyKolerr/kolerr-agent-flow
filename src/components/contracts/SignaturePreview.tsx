
import React, { useState } from "react";
import { SignatureField } from "@/types/contract";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Pencil, Signature } from "lucide-react";

interface SignaturePreviewProps {
  contractTerms: string;
  signatureFields: SignatureField[];
  onAddSignatureField: (field: SignatureField) => void;
  onRemoveSignatureField: (index: number) => void;
}

export function SignaturePreview({
  contractTerms,
  signatureFields,
  onAddSignatureField,
  onRemoveSignatureField
}: SignaturePreviewProps) {
  const [activeField, setActiveField] = useState<'signature' | 'initial' | 'date' | 'text'>('signature');
  const [activeSigner, setActiveSigner] = useState<'kol' | 'brand'>('kol');
  
  // Mock PDF pages - in a real app, you'd render the actual PDF
  const pages = contractTerms.split('\n\n').filter(p => p.trim().length > 0);
  
  const handleAddField = (pageIndex: number, event: React.MouseEvent<HTMLDivElement>) => {
    // Get click position relative to the page
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    
    const newField: SignatureField = {
      type: activeField,
      page: pageIndex,
      x: x,
      y: y,
      width: activeField === 'signature' ? 20 : 10,
      height: activeField === 'signature' ? 10 : 5,
      required: true,
      signer: activeSigner
    };
    
    onAddSignatureField(newField);
  };
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h3 className="text-lg font-medium">Signature Fields</h3>
          <p className="text-sm text-muted-foreground">
            Place signature fields where signers should sign
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <div>
            <Button 
              variant={activeField === 'signature' ? "default" : "outline"} 
              size="sm" 
              onClick={() => setActiveField('signature')}
            >
              <Signature className="mr-1 h-4 w-4" /> Signature
            </Button>
          </div>
          <div>
            <Button 
              variant={activeField === 'date' ? "default" : "outline"} 
              size="sm"
              onClick={() => setActiveField('date')}
            >
              Date
            </Button>
          </div>
        </div>
      </div>
      
      <div className="flex gap-2 mb-2">
        <Badge 
          variant={activeSigner === 'kol' ? "default" : "outline"}
          className="cursor-pointer"
          onClick={() => setActiveSigner('kol')}
        >
          Creator Signer
        </Badge>
        <Badge 
          variant={activeSigner === 'brand' ? "default" : "outline"}
          className="cursor-pointer"
          onClick={() => setActiveSigner('brand')}
        >
          Brand Signer
        </Badge>
      </div>
      
      <div className="space-y-4">
        {pages.map((page, pageIndex) => (
          <Card 
            key={pageIndex} 
            className="relative p-6 min-h-[400px] cursor-crosshair"
            onClick={(e) => handleAddField(pageIndex, e)}
          >
            <div className="absolute top-2 right-2 text-xs text-muted-foreground">
              Page {pageIndex + 1}
            </div>
            
            <div className="whitespace-pre-wrap">{page}</div>
            
            {/* Render signature fields for this page */}
            {signatureFields
              .filter(field => field.page === pageIndex)
              .map((field, index) => (
                <div 
                  key={index}
                  className={`absolute border-2 ${
                    field.signer === 'kol' ? 'border-blue-500' : 'border-green-500'
                  } bg-opacity-20 ${
                    field.signer === 'kol' ? 'bg-blue-100' : 'bg-green-100'
                  } rounded-md flex items-center justify-center`}
                  style={{
                    left: `${field.x}%`,
                    top: `${field.y}%`,
                    width: `${field.width}%`,
                    height: `${field.height}%`,
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemoveSignatureField(signatureFields.indexOf(field));
                  }}
                >
                  {field.type === 'signature' && <Signature className="h-6 w-6 text-muted-foreground opacity-50" />}
                  {field.type === 'date' && <span className="text-xs text-muted-foreground">Date</span>}
                  {field.type === 'text' && <Pencil className="h-4 w-4 text-muted-foreground opacity-50" />}
                </div>
              ))}
          </Card>
        ))}
      </div>
    </div>
  );
}
