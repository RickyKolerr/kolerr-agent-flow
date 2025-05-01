import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  BadgeDollarSign, 
  Calendar, 
  FileText, 
  Check, 
  Loader2, 
  ArrowLeft, 
  Building,
  Clock,
  Globe,
  Share2,
  ChevronDown,
  ChevronUp,
  BarChart,
  Users,
  Target
} from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { useUserAccess } from "@/hooks/useUserAccess";

// Sample campaign data (in a real app, this would come from an API)
const mockCampaigns = [
  {
    id: "c1",
    title: "Summer Fashion Collection",
    brand: "StyleCo",
    brandLogo: "https://ui-avatars.com/api/?name=StyleCo&background=0D8ABC&color=fff",
    description: "Promote our new summer fashion collection across your TikTok channel. Looking for authentic content showcasing our newest styles.",
    budget: "500-1000",
    compatibility: 95,
    deadline: "2023-07-15",
    platforms: ["tiktok"],
    categories: ["fashion", "lifestyle"],
    requirements: ["1+ min video", "3+ posts"],
    status: "open",
    detailedDescription: "We're looking for creators who can authentically showcase our summer fashion collection. We want to highlight the versatility and comfort of our pieces while maintaining a casual, relatable vibe. Our target audience is primarily young adults between 18-30 who are fashion-conscious but value comfort and practicality.",
    brandInfo: "StyleCo is a modern fashion brand focused on sustainable, comfortable clothing for young adults. We prioritize ethical manufacturing and eco-friendly materials.",
    deliverables: [
      "1 unboxing video (minimum 1 minute)",
      "3 outfit styling posts",
      "1 Instagram/TikTok story series showing a 'day in the life' with our pieces"
    ],
    timeline: "Content creation period: 2 weeks after product delivery. All content must be submitted by the deadline for review."
  },
  {
    id: "c2",
    title: "Gaming Peripherals Review",
    brand: "TechGear",
    brandLogo: "https://ui-avatars.com/api/?name=TechGear&background=9C27B0&color=fff",
    description: "Looking for tech influencers to review our new line of gaming keyboards, mouse, and headsets. Honest reviews appreciated.",
    budget: "300-600",
    compatibility: 75,
    deadline: "2023-07-20",
    platforms: ["youtube", "tiktok"],
    categories: ["tech", "gaming"],
    requirements: ["Unboxing", "Detailed review"],
    status: "open",
    detailedDescription: "We're launching a new series of gaming peripherals and looking for authentic reviews from tech creators. We're confident in our products and value honest feedback that highlights both strengths and areas for improvement. We're particularly interested in feedback on responsiveness, comfort during extended play, and durability.",
    brandInfo: "TechGear develops high-performance gaming peripherals that balance quality with affordability. We're dedicated to creating products that enhance the gaming experience for casual and competitive gamers alike.",
    deliverables: [
      "Unboxing video showing first impressions",
      "Detailed review after at least 1 week of use",
      "Specific feedback on key features we've highlighted in brief"
    ],
    timeline: "Products will be shipped within 3 days of campaign acceptance. Content should be published within 2 weeks of receiving the products."
  },
  {
    id: "c3",
    title: "Vegan Food Challenge",
    brand: "GreenEats",
    brandLogo: "https://ui-avatars.com/api/?name=GreenEats&background=4CAF50&color=fff",
    description: "Participate in our 3-day vegan challenge and share your experience with our meal kits. Looking for authentic reactions and recipes.",
    budget: "200-400",
    compatibility: 88,
    deadline: "2023-07-25",
    platforms: ["instagram", "tiktok"],
    categories: ["food", "lifestyle", "health"],
    requirements: ["3+ posts", "Story highlights"],
    status: "open",
    detailedDescription: "Our 3-day vegan challenge is designed to show how easy and delicious plant-based eating can be. We're looking for creators to document their journey, share their honest reactions to our meal kits, and potentially create their own recipes using our base ingredients.",
    brandInfo: "GreenEats delivers pre-portioned plant-based meal kits that make vegan cooking accessible and delicious for everyone, regardless of cooking experience.",
    deliverables: [
      "Day 1: Unboxing and first meal preparation",
      "Day 2-3: At least 2 more posts showing meal preparation and reactions",
      "Instagram/TikTok story highlights throughout the 3-day period",
      "Optional: One original recipe created with our ingredients"
    ],
    timeline: "Meal kits will be delivered on your preferred start date. Content should be posted on each day of the 3-day challenge."
  },
  {
    id: "c4",
    title: "Fitness Apparel Showcase",
    brand: "FlexFit",
    brandLogo: "https://ui-avatars.com/api/?name=FlexFit&background=FF5722&color=fff",
    description: "Show off your workout routine wearing our new fitness apparel line. Looking for dynamic content highlighting durability and style.",
    budget: "400-800",
    compatibility: 92,
    deadline: "2023-08-01",
    platforms: ["instagram", "tiktok"],
    categories: ["fitness", "fashion"],
    requirements: ["Workout demo", "Product features highlight"],
    status: "open",
    detailedDescription: "We want to showcase how our fitness apparel performs during real workouts. We're looking for content that highlights the functionality, comfort, and style of our new line. This campaign is ideal for fitness enthusiasts who can demonstrate the apparel's performance during various types of workouts.",
    brandInfo: "FlexFit creates premium fitness apparel that combines performance technology with contemporary style. Our products are designed to enhance athletic performance while looking great in and out of the gym.",
    deliverables: [
      "1 workout routine video featuring our apparel (1-3 minutes)",
      "2 static posts highlighting specific features of the apparel",
      "Instagram/TikTok stories showing the apparel in day-to-day contexts"
    ],
    timeline: "Products will be shipped within 5 business days of campaign acceptance. Content should be published within 3 weeks of receiving the products."
  },
  {
    id: "c5",
    title: "Travel Backpack Feature",
    brand: "Wanderlust",
    brandLogo: "https://ui-avatars.com/api/?name=Wanderlust&background=607D8B&color=fff",
    description: "Feature our adventure-ready backpack in your travel content. Looking for authentic integrations showing versatility and durability.",
    budget: "300-700",
    compatibility: 80,
    deadline: "2023-08-10",
    platforms: ["instagram", "youtube"],
    categories: ["travel", "lifestyle"],
    requirements: ["Product placement", "Feature highlight"],
    status: "open",
    detailedDescription: "Our adventure-ready backpack is designed for travelers who need versatility and durability. We're looking for content that naturally integrates our backpack into your travel adventures, highlighting how it meets the needs of real travelers through its various features and compartments.",
    brandInfo: "Wanderlust creates travel gear for the modern adventurer. Our products combine durability with thoughtful design features that make travel more convenient and enjoyable.",
    deliverables: [
      "1 main feature video/post showing the backpack in a travel context",
      "2 additional posts highlighting specific features (compartments, materials, comfort, etc.)",
      "Travel stories showing the backpack in use during your journey"
    ],
    timeline: "Backpack will be shipped immediately upon campaign acceptance. Content should be published within 1 month, ideally during an actual travel experience."
  }
];

const CampaignDetail = () => {
  const { campaignId } = useParams();
  const navigate = useNavigate();
  const [campaign, setCampaign] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isApplying, setIsApplying] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("overview");
  const { isAuthenticated, user, getRedirectPath } = useUserAccess();
  
  useEffect(() => {
    // Simulate API call to fetch campaign details
    setLoading(true);
    setTimeout(() => {
      const foundCampaign = mockCampaigns.find(c => c.id === campaignId);
      if (foundCampaign) {
        setCampaign(foundCampaign);
      }
      setLoading(false);
    }, 800);
  }, [campaignId]);
  
  const handleApply = async () => {
    // Check if user is authenticated
    if (!isAuthenticated) {
      // Redirect to login page and store the campaign ID to return to
      toast.info("Please sign in to apply for this campaign");
      navigate(`/login?redirect=/campaigns/${campaignId}&action=apply`);
      return;
    }
    
    // Check if user has completed their profile
    if (user && (!user.onboardingStatus || user.onboardingStatus === "incomplete")) {
      toast.info("Please complete your profile before applying to campaigns");
      navigate(getRedirectPath());
      return;
    }
    
    // User is authenticated and has completed onboarding, proceed with application
    setIsApplying(true);
    
    // Simulate API call delay
    setTimeout(() => {
      toast.success("Your application has been submitted", {
        description: "The brand will review your application shortly."
      });
      setIsApplying(false);
    }, 1000);
  };
  
  const handleBack = () => {
    navigate(-1);
  };
  
  if (loading) {
    return (
      <div className="container max-w-5xl mx-auto py-8 px-4 flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <Loader2 className="h-10 w-10 mx-auto animate-spin text-brand-pink" />
          <p className="mt-4 text-lg">Loading campaign details...</p>
        </div>
      </div>
    );
  }
  
  if (!campaign) {
    return (
      <div className="container max-w-5xl mx-auto py-8 px-4">
        <Button variant="ghost" onClick={handleBack} className="mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" /> Back
        </Button>
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-2">Campaign Not Found</h2>
          <p className="text-muted-foreground mb-6">The campaign you're looking for doesn't exist or has been removed.</p>
          <Button onClick={() => navigate("/dashboard/kol/campaigns")}>
            Browse Available Campaigns
          </Button>
        </div>
      </div>
    );
  }
  
  // Enhanced hero banner
  const getStatusColor = (status: string) => {
    switch(status) {
      case 'active': return 'bg-green-500 text-white';
      case 'draft': return 'bg-gray-500 text-white';
      case 'completed': return 'bg-blue-500 text-white';
      case 'paused': return 'bg-yellow-500 text-black';
      case 'open': return 'bg-green-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };
  
  return (
    <div className="bg-background min-h-screen pb-12">
      {/* Hero Banner */}
      <div className="bg-zinc-900 border-b border-white/10">
        <div className="container max-w-6xl mx-auto py-8 px-4">
          <Button variant="outline" onClick={handleBack} className="mb-6 border-white/20 text-white hover:bg-white/10">
            <ArrowLeft className="h-4 w-4 mr-2" /> Back
          </Button>
          
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <Avatar className="h-16 w-16 rounded-md">
                <img 
                  src={campaign.brandLogo} 
                  alt={campaign.brand} 
                  className="h-full w-full object-cover"
                />
              </Avatar>
              <div>
                <h1 className="text-3xl font-bold text-white mb-1">{campaign.title}</h1>
                <p className="text-gray-400">By {campaign.brand}</p>
                
                <div className="flex flex-wrap gap-2 mt-3">
                  {campaign.platforms?.map((platform: string) => (
                    <Badge key={platform} className="bg-brand-pink text-white capitalize">
                      {platform}
                    </Badge>
                  ))}
                  {campaign.categories?.map((category: string) => (
                    <Badge key={category} variant="outline" className="capitalize text-white border-white/20">
                      {category}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="flex flex-col items-end">
              <Badge className={`${getStatusColor(campaign.status)} px-4 py-1 text-sm font-medium mb-2`}>
                {campaign.status.toUpperCase()}
              </Badge>
              <div className="text-sm text-gray-400 flex items-center">
                <Clock className="h-3 w-3 mr-1" />
                <span>Due {new Date(campaign.deadline).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container max-w-6xl mx-auto py-8 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Campaign Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Campaign Description */}
            <Card className="bg-zinc-900 border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Campaign Description</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-gray-300">
                <p>{campaign.description}</p>
                {campaign.detailedDescription && <p>{campaign.detailedDescription}</p>}
              </CardContent>
            </Card>
            
            {/* Key Campaign Information with Accordion */}
            <Accordion type="single" collapsible className="w-full">
              {campaign.deliverables && (
                <AccordionItem value="deliverables" className="bg-zinc-900 border-white/10 rounded-md mb-3">
                  <AccordionTrigger className="px-6 py-4 text-white hover:no-underline">
                    <div className="flex items-center">
                      <FileText className="h-5 w-5 mr-2 text-brand-pink" />
                      <span className="font-semibold">Deliverables</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4 pt-0">
                    <ul className="space-y-2 text-gray-300">
                      {campaign.deliverables?.map((deliverable: string, index: number) => (
                        <li key={index} className="flex items-start">
                          <Check className="h-5 w-5 mr-2 text-green-500 flex-shrink-0 mt-0.5" />
                          <span>{deliverable}</span>
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              )}
              
              <AccordionItem value="timeline" className="bg-zinc-900 border-white/10 rounded-md mb-3">
                <AccordionTrigger className="px-6 py-4 text-white hover:no-underline">
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 mr-2 text-brand-pink" />
                    <span className="font-semibold">Timeline</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 pt-0">
                  <div className="space-y-4 text-gray-300">
                    <div className="flex items-center">
                      <Calendar className="h-5 w-5 mr-2 text-brand-pink" />
                      <span>Deadline: {new Date(campaign.deadline).toLocaleDateString()}</span>
                    </div>
                    {campaign.timeline && <p>{campaign.timeline}</p>}
                    {!campaign.timeline && (
                      <p>Content should be submitted by the deadline date for review and approval.</p>
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>
              
              {campaign.brandInfo && (
                <AccordionItem value="brand" className="bg-zinc-900 border-white/10 rounded-md">
                  <AccordionTrigger className="px-6 py-4 text-white hover:no-underline">
                    <div className="flex items-center">
                      <Building className="h-5 w-5 mr-2 text-brand-pink" />
                      <span className="font-semibold">About {campaign.brand}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4 pt-0">
                    <div className="flex items-center mb-4">
                      <Avatar className="h-10 w-10 mr-3">
                        <img 
                          src={campaign.brandLogo} 
                          alt={campaign.brand}
                          className="h-full w-full object-cover" 
                        />
                      </Avatar>
                      <div>
                        <h3 className="font-semibold text-white">{campaign.brand}</h3>
                        <div className="flex items-center text-sm text-gray-400">
                          <Building className="h-3 w-3 mr-1" />
                          <span>Verified Brand</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-300">{campaign.brandInfo}</p>
                  </AccordionContent>
                </AccordionItem>
              )}
            </Accordion>
            
            {/* Campaign Metrics Panel (only for non-draft campaigns) */}
            {campaign && campaign.metrics && campaign.status !== 'draft' && (
              <Card className="bg-zinc-900 border-white/10 overflow-hidden">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <BarChart className="h-5 w-5 mr-2 text-brand-pink" />
                    Campaign Performance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-gray-400">Views</span>
                          <span className="text-white font-medium">{campaign.metrics.views?.toLocaleString()}</span>
                        </div>
                        <Progress value={75} className="h-2 bg-gray-700" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-gray-400">Engagement</span>
                          <span className="text-white font-medium">{campaign.metrics.engagement}%</span>
                        </div>
                        <Progress value={campaign.metrics.engagement * 10} className="h-2 bg-gray-700" />
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-gray-400">Conversions</span>
                          <span className="text-white font-medium">{campaign.metrics.conversions?.toLocaleString()}</span>
                        </div>
                        <Progress value={60} className="h-2 bg-gray-700" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-gray-400">ROI</span>
                          <span className="text-white font-medium">{campaign.metrics.roi}x</span>
                        </div>
                        <Progress value={campaign.metrics.roi * 20} className="h-2 bg-gray-700" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
          
          {/* Right Column - Apply Section */}
          <div>
            <Card className="sticky top-6 bg-zinc-900 border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Campaign Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Budget */}
                <div>
                  <h3 className="font-medium mb-2 flex items-center text-white">
                    <BadgeDollarSign className="h-4 w-4 mr-2 text-brand-pink" />
                    Budget
                  </h3>
                  <div className="text-xl font-semibold text-white">${campaign.budget}</div>
                </div>
                
                <Separator className="bg-white/10" />
                
                {/* Target Audience */}
                <div>
                  <h3 className="font-medium mb-2 flex items-center text-white">
                    <Target className="h-4 w-4 mr-2 text-brand-pink" />
                    Target Audience
                  </h3>
                  <div className="text-white">{campaign.audience || "All audiences"}</div>
                </div>
                
                <Separator className="bg-white/10" />
                
                {/* Requirements */}
                <div>
                  <h3 className="font-medium mb-2 flex items-center text-white">
                    <FileText className="h-4 w-4 mr-2 text-brand-pink" />
                    Requirements
                  </h3>
                  <ul className="space-y-2 text-gray-300">
                    {campaign.requirements.map((req: string, index: number) => (
                      <li key={index} className="flex items-center">
                        <Check className="h-4 w-4 mr-2 text-green-500" />
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <Separator className="bg-white/10" />
                
                {/* Platforms */}
                <div>
                  <h3 className="font-medium mb-2 flex items-center text-white">
                    <Globe className="h-4 w-4 mr-2 text-brand-pink" />
                    Platforms
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {campaign.platforms.map((platform: string) => (
                      <Badge key={platform} variant="outline" className="capitalize text-white border-white/20">
                        {platform}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                {/* Apply Button */}
                <div className="pt-4">
                  <Button 
                    className="w-full bg-brand-pink hover:bg-brand-pink/90 text-white font-medium py-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
                    onClick={handleApply}
                    disabled={isApplying}
                  >
                    {isApplying ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Applying...
                      </>
                    ) : (
                      <>
                        {isAuthenticated ? "Apply Now" : "Sign in to Apply"}
                      </>
                    )}
                  </Button>
                </div>
                
                {/* Auth Notice */}
                {!isAuthenticated && (
                  <div className="text-sm text-center text-gray-400">
                    <p>You need an account to apply for campaigns</p>
                    <Button 
                      variant="link" 
                      className="text-brand-pink p-0 h-auto"
                      onClick={() => navigate("/signup")}
                    >
                      Sign up now
                    </Button>
                  </div>
                )}
                
                {/* Share Campaign */}
                <div className="pt-2">
                  <Button 
                    variant="outline" 
                    className="w-full flex items-center justify-center gap-2 border-white/20 text-white hover:bg-white/10"
                    onClick={() => {
                      navigator.clipboard.writeText(window.location.href);
                      toast.success("Campaign link copied to clipboard");
                    }}
                  >
                    <Share2 className="h-4 w-4" />
                    Share Campaign
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignDetail;
