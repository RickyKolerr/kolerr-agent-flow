
// Credit system constants
export const GENERAL_QUESTIONS_PER_CREDIT = 2; // Changed from 3 to 2
export const RESET_HOUR = 4; // 4:00 AM

// KOL-related patterns for detecting specific queries
export const KOL_PATTERNS = [
  // Core KOL-related terms
  'kol', 'creator', 'influencer', 'tiktok', 'search', 'find', 'campaign',
  'follower', 'niche', 'engagement',
  
  // Industry/category terms that indicate KOL search
  'fashion', 'beauty', 'gaming', 'tech', 'travel', 'food', 'fitness', 
  'lifestyle', 'music', 'sports', 'comedy',
  
  // Action words indicating search intent
  'recommend', 'suggest', 'locate', 'identify', 'discover', 'show me',
  
  // Monetary terms indicating commercial intent
  'sponsor', 'promote', 'advertise', 'collaborate', 'partnership', 'deal', 'cost',
  
  // Specific metrics
  'views', 'likes', 'followers', 'engagement rate', 'audience'
];

// Phrases that suggest looking for specific creators
export const FINDING_PHRASES = [
  "who can", "who should", "looking for someone", "need a creator", 
  "best creator", "top influencer", "recommend", "suggestion"
];

// Metrics patterns for query detection
export const METRIC_PATTERNS = [
  "followers", "engagement", "audience", "demographic", "reach", "views"
];
