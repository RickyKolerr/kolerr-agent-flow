
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Contract } from "@/types/contract";
import { Clock, FileCheck, FileText, Calendar, DollarSign, Building, CheckCircle2 } from "lucide-react";

interface KOLContractReviewProps {
  contract: Contract;
  onSign: (contractId: string) => void;
  onDecline?: (contractId: string) => void;
}

export function KOLContractReview({ contract, onSign, onDecline }: KOLContractReviewProps) {
  const [isReviewing, setIsReviewing] = useState(false);

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
  };
  
  const handleDecline = () => {
    if (onDecline) {
      onDecline(contract.id);
    } else {
      toast.error("This action is not available");
    }
  };
  
  const handleToggleReview = () => {
    setIsReviewing(!isReviewing);
  };
  
  const getStatusBadge = (status: Contract['status']) => {
    switch (status) {
      case 'draft':
        return (
          <Badge variant="outline" className="bg-gray-500/10 text-gray-500 border-gray-500/20">
            <FileText className="h-3.5 w-3.5 mr-1" /> Draft
          </Badge>
        );
      case 'sent':
        return (
          <Badge variant="outline" className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20">
            <Clock className="h-3.5 w-3.5 mr-1" /> Awaiting Signature
          </Badge>
        );
      case 'signed':
        return (
          <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
            <CheckCircle2 className="h-3.5 w-3.5 mr-1" /> Signed
          </Badge>
        );
      default:
        return (
          <Badge variant="outline">
            {String(status).charAt(0).toUpperCase() + String(status).slice(1)}
          </Badge>
        );
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>{contract.title}</CardTitle>
            <CardDescription className="mt-1">
              {`From ${contract.brand?.name || 'Brand'} • ${contract.campaign ? `Campaign: ${contract.campaign}` : ''}`}
            </CardDescription>
          </div>
          {getStatusBadge(contract.status)}
        </div>
      </CardHeader>
      
      {!isReviewing ? (
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Contract ID</p>
              <p className="text-sm">{contract.id}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Created Date</p>
              <p className="text-sm">{formatDate(contract.createdDate)}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Start Date</p>
              <div className="flex items-center text-sm">
                <Calendar className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                {formatDate(contract.startDate)}
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">End Date</p>
              <div className="flex items-center text-sm">
                <Calendar className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                {formatDate(contract.endDate)}
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Value</p>
              <div className="flex items-center text-sm">
                <DollarSign className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                {contract.value ? `$${contract.value.toLocaleString()}` : 'Not specified'}
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Brand</p>
              <div className="flex items-center text-sm">
                <Building className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                {contract.brand?.name || 'Not specified'}
              </div>
            </div>
          </div>

          <div>
            <Button variant="outline" size="sm" onClick={handleToggleReview}>
              <FileText className="h-3.5 w-3.5 mr-2" /> Review Full Contract
            </Button>
          </div>
        </CardContent>
      ) : (
        <CardContent className="space-y-6">
          <Button variant="outline" size="sm" onClick={handleToggleReview}>
            Hide Full Contract
          </Button>
          
          <Separator />
          
          <div>
            <h3 className="text-lg font-medium mb-2">Contract Terms</h3>
            <div className="bg-muted/40 p-4 rounded-md whitespace-pre-wrap max-h-[300px] overflow-y-auto">
              {contract.terms || 'No terms specified'}
            </div>
          </div>

          <Separator />
          
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Key Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Contract Type</p>
                <p>{typeof contract.type === 'string' ? contract.type.charAt(0).toUpperCase() + contract.type.slice(1) : contract.type}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Campaign</p>
                <p>{contract.campaign || "N/A"}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Value</p>
                <p>{contract.value ? `$${contract.value.toLocaleString()}` : "N/A"}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Duration</p>
                <p>{
                  contract.startDate && contract.endDate ? 
                  `${formatDate(contract.startDate)} to ${formatDate(contract.endDate)}` : 
                  "Not specified"
                }</p>
              </div>
            </div>
          </div>
        </CardContent>
      )}
      
      {contract.status === 'sent' && (
        <CardFooter className="flex justify-between border-t p-6 gap-4">
          {onDecline && (
            <Button variant="outline" onClick={handleDecline}>Decline</Button>
          )}
          <Button className="bg-brand-pink hover:bg-brand-pink/90 flex-1" onClick={handleSign}>
            <FileCheck className="h-4 w-4 mr-2" /> Sign Contract
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
