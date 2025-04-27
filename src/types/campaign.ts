
export type CampaignStatus = "draft" | "active" | "paused" | "completed";

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
  createdAt: string;
  updatedAt: string;
}
