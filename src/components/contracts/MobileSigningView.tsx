
import React, { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Contract } from "@/types/contract";
import { FileCheck, ArrowLeft, FileText, Download, ChevronDown, ChevronUp } from "lucide-react";
import { toast } from "sonner";

interface MobileSigningViewProps {
  contract: Contract;
  onSign: (contractId: string) => void;
  onBack: () => void;
  onDownload?: (contractId: string) => void;
}

export function MobileSigningView({ contract, onSign, onBack, onDownload }: MobileSigningViewProps) {
  const [showDetails, setShowDetails] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  
  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A";
    
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  const handleSign = () => {
    onSign(contract.id);
    toast.success("Redirecting to signing page...");
  };
  
  const handleDownload = () => {
    if (onDownload && contract.signwellData?.documentId) {
      onDownload(contract.id);
    }
  };
  
  return (
    <div className="space-y-4 pb-20">
      <div className="flex items-center gap-2 sticky top-0 bg-background z-10 py-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={onBack}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-lg font-medium">{contract.title}</h1>
      </div>
      
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">Quick Summary</CardTitle>
            <Badge variant={contract.status === 'signed' ? 'outline' : 'default'} className={
              contract.status === 'signed' ? 'bg-green-500/10 text-green-500 border-green-500/20' : ''
            }>
              {contract.status === 'signed' ? 'Signed' : 'Action Required'}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Brand:</span>
            <span className="font-medium">{contract.brand?.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Value:</span>
            <span className="font-medium">{contract.value ? `$${contract.value.toLocaleString()}` : "N/A"}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Duration:</span>
            <span className="font-medium text-right">{
              contract.startDate && contract.endDate ? 
                `${formatDate(contract.startDate)} - ${formatDate(contract.endDate)}` : 
                "Not specified"
            }</span>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          {contract.status === 'sent' ? (
            <Button 
              className="bg-brand-pink hover:bg-brand-pink/90 w-full"
              onClick={handleSign}
            >
              <FileCheck className="h-4 w-4 mr-2" /> Sign Now
            </Button>
          ) : (
            <Button 
              variant="outline" 
              className="w-full"
              onClick={handleDownload}
              disabled={!contract.signwellData?.documentId}
            >
              <Download className="h-4 w-4 mr-2" /> Download Contract
            </Button>
          )}
        </CardFooter>
      </Card>
      
      {/* Details accordion */}
      <Card>
        <div
          className="flex items-center justify-between p-4 cursor-pointer"
          onClick={() => setShowDetails(!showDetails)}
        >
          <div className="flex items-center">
            <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
            <h3 className="font-medium">Contract Details</h3>
          </div>
          {showDetails ? (
            <ChevronUp className="h-4 w-4 text-muted-foreground" />
          ) : (
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          )}
        </div>
        
        {showDetails && (
          <CardContent className="pt-0 space-y-4">
            <Separator />
            <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
              <div>
                <p className="text-muted-foreground">Contract ID</p>
                <p>{contract.id}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Created</p>
                <p>{formatDate(contract.createdDate)}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Type</p>
                <p>{contract.type.charAt(0).toUpperCase() + contract.type.slice(1)}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Campaign</p>
                <p>{contract.campaign || "N/A"}</p>
              </div>
              <div className="col-span-2">
                <p className="text-muted-foreground">Status</p>
                <p>{contract.status.charAt(0).toUpperCase() + contract.status.slice(1)}</p>
              </div>
            </div>
          </CardContent>
        )}
      </Card>
      
      {/* Terms accordion */}
      <Card>
        <div
          className="flex items-center justify-between p-4 cursor-pointer"
          onClick={() => setShowTerms(!showTerms)}
        >
          <div className="flex items-center">
            <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
            <h3 className="font-medium">Contract Terms</h3>
          </div>
          {showTerms ? (
            <ChevronUp className="h-4 w-4 text-muted-foreground" />
          ) : (
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          )}
        </div>
        
        {showTerms && (
          <CardContent className="pt-0">
            <Separator className="my-4" />
            <div className="whitespace-pre-wrap text-sm">
              {contract.terms || "No terms specified"}
            </div>
          </CardContent>
        )}
      </Card>
      
      {/* Fixed mobile action bar */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background border-t z-20">
        {contract.status === 'sent' ? (
          <Button 
            className="bg-brand-pink hover:bg-brand-pink/90 w-full"
            onClick={handleSign}
          >
            <FileCheck className="h-4 w-4 mr-2" /> Sign Contract
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button variant="outline" className="flex-1" onClick={onBack}>
              Back
            </Button>
            {contract.status === 'signed' && (
              <Button variant="outline" className="flex-1" onClick={handleDownload}>
                <Download className="h-4 w-4 mr-2" /> Download
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
