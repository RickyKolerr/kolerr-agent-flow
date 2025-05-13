
export interface Campaign {
  id: string;
  title: string;
  brandId: string;
  brandName: string;
  brandLogo: string;
  description: string;
  requirements: string[];
  categories: string[];
  platforms: string[];
  minFollowers: number;
  budget: {
    min: number;
    max: number;
    currency: string;
  };
  timeline: {
    startDate: string;
    endDate: string;
    applicationsEndDate: string;
  };
  status: "draft" | "published" | "completed" | "cancelled";
  location?: string;
  applicants?: number;
  slots?: number;
  createdAt: string;
  updatedAt: string;
  featured?: boolean;
}

export type ApplicationStatus = "pending" | "approved" | "hold" | "rejected";
