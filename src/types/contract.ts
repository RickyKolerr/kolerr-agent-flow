
export interface Contract {
  id: string;
  title: string;
  type: string;
  kol: {
    name: string;
    handle: string;
    avatar: string;
    email?: string; // Email needed for SignWell
  };
  brand?: {
    name: string;
    email?: string; // Email needed for SignWell
  };
  campaign?: string;
  campaignId?: string; // Added to connect contracts to campaigns
  createdDate: string;
  startDate?: string;
  endDate?: string;
  status: 'draft' | 'sent' | 'signed' | 'expired' | 'canceled';
  value?: number;
  terms?: string;
  signwellData?: {
    documentId?: string;
    signLink?: string;
    completedAt?: string;
    expiresAt?: string;
  };
  kolStatus?: 'pending' | 'viewed' | 'approved' | 'rejected'; // Added for KOL workflow
  earnings?: {
    status: 'pending' | 'processing' | 'paid';
    paidDate?: string;
    paymentMethod?: string;
  };
}

export interface SignatureField {
  type: 'signature' | 'initial' | 'date' | 'text';
  page: number;
  x: number;
  y: number;
  width: number;
  height: number;
  required: boolean;
  signer: 'kol' | 'brand';
}

export interface ContractFormValues {
  title: string;
  type: string;
  kolId: string;
  campaignId?: string;
  startDate: string;
  endDate: string;
  value?: string;
  terms: string;
  signatureFields?: SignatureField[];
}

// Add KOL contract analytics interface
export interface KOLContractAnalytics {
  totalContracts: number;
  totalEarnings: number;
  pendingContracts: number;
  pendingEarnings: number;
  completedContracts: number;
  averageValue: number;
  contractsByMonth: {
    month: string;
    count: number;
    value: number;
  }[];
}
