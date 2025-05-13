
export type CampaignStatus = "draft" | "active" | "paused" | "completed";
export type ApplicationStatus = "pending" | "approved" | "hold" | "rejected";

export interface CampaignMetrics {
  views: number;
  engagement: number;
  conversions: number;
  roi: number;
}

export interface AssignedKOL {
  id: string;
  name: string;
  status: "pending" | "accepted" | "declined";
  metrics?: {
    views: number;
    engagement: number;
  };
}

export interface Slot {
  id: string;
  name: string;
  targetKOLs: number;
  minEngagement: number;
  maxBudget: number;
  targetAudience: string[];
  startDate: string;
  endDate: string;
  requirements: string[];
  status: "open" | "filled" | "in-progress" | "completed";
  assignedKols: AssignedKOL[];
}

export interface Campaign {
  id: string;
  title: string;
  description: string;
  status: CampaignStatus;
  budget: number;
  audience: string;
  startDate: string;
  endDate: string;
  metrics: CampaignMetrics;
  assignedKols: AssignedKOL[];
  slots?: Slot[];
  createdAt: string;
  updatedAt: string;
}

export interface Application {
  id: string;
  kolId: string;
  campaignId: string;
  campaignName: string;
  status: ApplicationStatus;
  dateApplied: string;
  message: string;
}
