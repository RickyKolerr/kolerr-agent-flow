
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
  }
};
