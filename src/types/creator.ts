
export interface Creator {
  id: string;
  fullName: string;
  avatar: string;
  followers: number;
  engagementRate: number;
  niche: string[];
  avgViews: string;
  trending?: boolean;
}
