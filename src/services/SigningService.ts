
import { Contract, SignatureField } from "@/types/contract";

// This is a mock service that would be replaced with actual SignWell API calls
export const SigningService = {
  /**
   * Prepares a contract for signing
   */
  prepareContract: async (contract: Contract, signatureFields: SignatureField[] = []): Promise<Contract> => {
    console.log("Preparing contract for SignWell:", contract, signatureFields);
    
    // In a real implementation, this would call SignWell API to create a document
    // For now, we'll mock the SignWell response
    
    // Mock response delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      ...contract,
      status: 'sent',
      signwellData: {
        documentId: `doc-${Math.random().toString(36).substring(2, 9)}`,
        signLink: `https://app.signwell.com/sign/${Math.random().toString(36).substring(2, 9)}`,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
      }
    };
  },
  
  /**
   * Gets the status of a signing document
   */
  getStatus: async (documentId: string): Promise<'sent' | 'signed' | 'expired'> => {
    console.log("Getting status for document:", documentId);
    
    // Mock response delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Randomly return a status for demo purposes
    const statuses: ('sent' | 'signed' | 'expired')[] = ['sent', 'signed', 'expired'];
    return statuses[Math.floor(Math.random() * statuses.length)];
  },
  
  /**
   * Downloads a completed contract
   */
  downloadContract: async (documentId: string): Promise<string> => {
    console.log("Downloading contract:", documentId);
    
    // Mock response delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // In a real implementation, this would download the PDF
    return "mock-download-url.pdf";
  },
  
  /**
   * Sends reminder to signers
   */
  sendReminder: async (documentId: string): Promise<void> => {
    console.log("Sending reminder for document:", documentId);
    
    // Mock response delay
    await new Promise(resolve => setTimeout(resolve, 800));
  },

  /**
   * KOL specific - View a contract (marks it as viewed)
   */
  kolViewContract: async (contractId: string): Promise<Contract> => {
    console.log("KOL viewed contract:", contractId);
    
    // Mock response delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // In a real implementation, this would update the contract status
    return {
      ...mockViewedContract,
      kolStatus: 'viewed',
    };
  },
  
  /**
   * KOL specific - Get contracts for a KOL
   */
  getKOLContracts: async (kolId: string): Promise<Contract[]> => {
    console.log("Getting contracts for KOL:", kolId);
    
    // Mock response delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // In a real implementation, this would fetch contracts from the server
    return mockKOLContracts;
  },
  
  /**
   * KOL specific - Get contract analytics
   */
  getKOLContractAnalytics: async (kolId: string) => {
    console.log("Getting contract analytics for KOL:", kolId);
    
    // Mock response delay
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    // In a real implementation, this would calculate analytics from actual data
    return mockKOLAnalytics;
  }
};

// Mock data for KOL contracts
const mockViewedContract: Contract = {
  id: "CT-2023-002",
  title: "Product Review Agreement",
  type: "review",
  kol: {
    name: "Jake Thomas",
    handle: "@jakeadventures",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&auto=format&fit=crop",
    email: "jake@example.com"
  },
  brand: {
    name: "Tech Brand Inc.",
    email: "contracts@techbrand.com"
  },
  campaign: "New Product Teaser",
  campaignId: "camp2",
  createdDate: "2023-06-05",
  startDate: "2023-07-15",
  endDate: "2023-08-15",
  status: 'sent',
  value: 800,
  terms: "This agreement outlines the terms for the product review collaboration.",
  kolStatus: 'pending',
  signwellData: {
    documentId: "doc-456def",
    signLink: "https://app.signwell.com/sign/abc123",
    expiresAt: "2023-07-05"
  }
};

const mockKOLContracts: Contract[] = [
  {
    id: "CT-2023-001",
    title: "Summer Collection Promo",
    type: "standard",
    kol: {
      name: "Jake Thomas",
      handle: "@jakeadventures",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&auto=format&fit=crop",
      email: "jake@example.com"
    },
    brand: {
      name: "Fashion Brand Co",
      email: "contracts@fashionbrand.com"
    },
    campaign: "Summer Collection Launch",
    campaignId: "camp1",
    createdDate: "2023-06-02",
    startDate: "2023-07-01",
    endDate: "2023-08-30",
    status: 'signed',
    value: 1500,
    kolStatus: 'approved',
    earnings: {
      status: 'paid',
      paidDate: '2023-09-05',
      paymentMethod: 'Direct Deposit'
    },
    signwellData: {
      documentId: "doc-123abc",
      completedAt: "2023-06-05"
    }
  },
  {
    id: "CT-2023-002",
    title: "Product Review Agreement",
    type: "review",
    kol: {
      name: "Jake Thomas",
      handle: "@jakeadventures",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&auto=format&fit=crop",
      email: "jake@example.com"
    },
    brand: {
      name: "Tech Brand Inc.",
      email: "contracts@techbrand.com"
    },
    campaign: "New Product Teaser",
    campaignId: "camp2",
    createdDate: "2023-06-05",
    startDate: "2023-07-15",
    endDate: "2023-08-15",
    status: 'sent',
    value: 800,
    kolStatus: 'pending',
    signwellData: {
      documentId: "doc-456def",
      signLink: "https://app.signwell.com/sign/abc123",
      expiresAt: "2023-07-05"
    }
  },
  {
    id: "CT-2023-003",
    title: "Holiday Promotion",
    type: "standard",
    kol: {
      name: "Jake Thomas",
      handle: "@jakeadventures",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&auto=format&fit=crop",
      email: "jake@example.com"
    },
    brand: {
      name: "Retail Company",
      email: "legal@retailcompany.com"
    },
    campaign: "Holiday Special",
    campaignId: "camp3",
    createdDate: "2023-05-20",
    startDate: "2023-11-01",
    endDate: "2023-12-31",
    status: 'signed',
    value: 2000,
    kolStatus: 'approved',
    earnings: {
      status: 'pending',
    },
    signwellData: {
      documentId: "doc-789ghi",
      completedAt: "2023-05-25"
    }
  }
];

const mockKOLAnalytics = {
  totalContracts: 12,
  totalEarnings: 15300,
  pendingContracts: 2,
  pendingEarnings: 2800,
  completedContracts: 10,
  averageValue: 1275,
  contractsByMonth: [
    { month: 'Jan', count: 1, value: 1200 },
    { month: 'Feb', count: 2, value: 1800 },
    { month: 'Mar', count: 1, value: 1000 },
    { month: 'Apr', count: 2, value: 2500 },
    { month: 'May', count: 3, value: 3800 },
    { month: 'Jun', count: 3, value: 5000 }
  ]
};
