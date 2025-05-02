
export interface IntelligentCreditStore {
  freeCredits: number;
  generalQuestionCounter: number;
  lastReset: string;
}

export interface IntelligentCreditResult {
  freeCredits: number;
  generalQuestionCounter: number;
  remainingGeneralQuestions: number;
  useIntelligentCredit: (message: string) => boolean;
  isKOLSpecificQuery: (message: string) => boolean;
  timeUntilReset: string;
  resetHour: number;
  generalQuestionsPerCredit: number;
  resetCredits: (amount: number) => void;
  setCredits: (amount: number) => void;
  addCredits: (amount: number) => void;
}
