
export interface Creator {
  id: string;
  name: string;
  username: string;
  avatar: string;
  followers: number;
  niche: string[];
  tier: string;
  bio: string;
  compatibility: number;
  platforms: string[];
  connected: boolean;
}
