
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, Medal, Star, ArrowLeft, Users, FileText, CheckCircle } from "lucide-react";
import { toast } from "sonner";

// Mock campaigns - same as in AvailableCampaigns.tsx
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
    fullDescription: "StyleCo is looking for fashion-forward creators to promote our Summer 2023 Collection. We're searching for authentic content that shows off our designs in real-world settings. This collection features lightweight, colorful pieces perfect for summer outings, beach days, and casual gatherings.\n\nWe're particularly interested in creators who can showcase versatility through styling different pieces together and demonstrating the quality and fit of our garments.",
    deliverables: [
      "1+ minute TikTok showcase video",
      "3+ in-feed posts featuring different outfits",
      "Story highlights of the collection",
      "Authentic reviews of fabric quality and fit"
    ],
    timeline: "Content should be created within 2 weeks of receiving products, with posting scheduled over the campaign period (June 10 - July 10, 2023).",
    brandInfo: "StyleCo is a sustainable fashion brand focused on creating timeless, versatile pieces for the modern individual. Our designs blend comfort with contemporary aesthetics, using ethically-sourced materials."
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
    fullDescription: "TechGear is launching a new line of premium gaming peripherals designed for professional and amateur gamers alike. We're seeking tech creators to provide honest, in-depth reviews of our products including gaming keyboards, mice, and headsets.\n\nWe value authentic opinions and detailed feedback that highlights both strengths and areas for improvement. Your review should cover design, build quality, performance, and overall user experience.",
    deliverables: [
      "Unboxing video showing packaging and first impressions",
      "Detailed review covering all product features",
      "Performance testing in real gaming scenarios",
      "Comparison with similar products (if applicable)"
    ],
    timeline: "Reviews should be published within 3 weeks of receiving products.",
    brandInfo: "TechGear specializes in creating cutting-edge gaming peripherals that combine functionality with aesthetic appeal. Our products are developed with input from professional esports players to ensure they meet the highest performance standards."
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
    fullDescription: "GreenEats is introducing a 3-day vegan meal kit designed to make plant-based eating accessible and delicious. We're looking for food and lifestyle creators to document their experience following our meal plan and sharing their honest thoughts.\n\nThe challenge includes breakfast, lunch, and dinner for three consecutive days, with all ingredients and recipes provided. We encourage creativity in presentation and sharing personal insights about how the meals made you feel.",
    deliverables: [
      "Daily posts showcasing each meal preparation",
      "Story highlights documenting the 3-day journey",
      "Final review/summary of the experience",
      "Optional: Your own creative spin on one of our recipes"
    ],
    timeline: "Content should be created during the 3-day challenge period and posted within one week of completion.",
    brandInfo: "GreenEats specializes in plant-based meal solutions that make vegan eating convenient without sacrificing taste. Our products focus on sustainable packaging and locally-sourced ingredients whenever possible."
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
    fullDescription: "FlexFit is launching a new line of performance-focused fitness apparel designed to enhance your workout experience. We're seeking fitness enthusiasts who can showcase our products in action during real workout routines.\n\nContent should highlight the functional aspects of the clothing such as stretch, moisture-wicking, comfort during movement, as well as the stylish design elements that make our line stand out.",
    deliverables: [
      "Complete workout routine wearing our apparel",
      "Close-up footage highlighting fabric and design features",
      "Feedback on performance during different exercise types",
      "Before/after comparison showing moisture-wicking properties"
    ],
    timeline: "Content should be produced and published within 2 weeks of receiving the products.",
    brandInfo: "FlexFit creates premium fitness apparel that combines cutting-edge fabric technology with contemporary designs. Our products are tested by professional athletes to ensure they perform under the most demanding conditions."
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
    fullDescription: "Wanderlust is introducing the ultimate travel backpack designed for adventurers who need versatility, durability, and smart organization. We're looking for travel content creators to feature our backpack in authentic travel scenarios.\n\nThe ideal content will showcase how the backpack fits into your travel lifestyle, highlighting specific features like water resistance, multiple compartments, hidden security pockets, and comfortable ergonomic design.",
    deliverables: [
      "Backpack featured in real travel settings",
      "Demonstration of key features and compartments",
      "Packing/unpacking demonstration showing capacity",
      "Testimonial about comfort during extended wear"
    ],
    timeline: "Content should be created during your next travel opportunity, with posting completed by August 10, 2023.",
    brandInfo: "Wanderlust creates travel gear for modern adventurers who demand quality, functionality, and style. Our products are designed by travelers, for travelers, with an emphasis on durability and thoughtful design details."
  }
];

const CampaignDetail = () => {
  const { campaignId } = useParams<{ campaignId: string }>();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  
  // Find the campaign by id
  const campaign = mockCampaigns.find(c => c.id === campaignId);
  
  if (!campaign) {
    return (
      <div className="container mx-auto py-12 px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Campaign Not Found</h1>
          <p className="text-muted-foreground mb-6">The campaign you're looking for doesn't exist or has been removed.</p>
          <Button onClick={() => navigate(-1)}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Go Back
          </Button>
        </div>
      </div>
    );
  }
  
  const handleApplyToCampaign = () => {
    if (isAuthenticated) {
      toast.success(`Applied to "${campaign.title}"`, {
        description: "Your application has been submitted successfully.",
      });
    } else {
      toast.error("Sign up to apply for this campaign", {
        description: "Create a creator account to submit your application for this campaign.",
        action: {
          label: "Sign Up",
          onClick: () => navigate("/signup"),
        },
      });
    }
  };
  
  return (
    <div className="container mx-auto py-12 px-4">
      <Button variant="outline" className="mb-6" onClick={() => navigate(-1)}>
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Campaigns
      </Button>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-6">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={campaign.brandLogo} alt={campaign.brand} />
                  <AvatarFallback className="text-lg">{campaign.brand.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <div>
                  <h1 className="text-3xl font-bold">{campaign.title}</h1>
                  <p className="text-muted-foreground">by {campaign.brand}</p>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {campaign.platforms.map(platform => (
                  <Badge key={platform} variant="outline" className="capitalize">
                    {platform}
                  </Badge>
                ))}
                
                {campaign.categories.map(category => (
                  <Badge key={category} className="bg-brand-pink/20 text-brand-pink capitalize">
                    {category}
                  </Badge>
                ))}
                
                <Badge variant="secondary">
                  <Calendar className="h-3 w-3 mr-1" />
                  Deadline: {campaign.deadline}
                </Badge>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold mb-3">Campaign Description</h2>
                  <p className="text-muted-foreground whitespace-pre-line">
                    {campaign.fullDescription}
                  </p>
                </div>
                
                <div>
                  <h2 className="text-xl font-semibold mb-3">Deliverables</h2>
                  <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                    {campaign.deliverables?.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h2 className="text-xl font-semibold mb-3">Timeline</h2>
                  <p className="text-muted-foreground">
                    {campaign.timeline}
                  </p>
                </div>
                
                <div>
                  <h2 className="text-xl font-semibold mb-3">About {campaign.brand}</h2>
                  <p className="text-muted-foreground">
                    {campaign.brandInfo}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card className="sticky top-6">
            <CardContent className="p-6">
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-1">Budget</h3>
                <p className="text-3xl font-bold text-brand-pink">${campaign.budget}</p>
                <p className="text-sm text-muted-foreground">Payment upon successful completion</p>
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Requirements</h3>
                <ul className="space-y-2">
                  {campaign.requirements.map((req, index) => (
                    <li key={index} className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      {req}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-2">Match Score</h3>
                <div className="flex items-center">
                  <div className="w-full bg-gray-200 rounded-full h-3 mr-2">
                    <div 
                      className={`h-3 rounded-full ${
                        campaign.compatibility > 90 ? 'bg-green-500' : 
                        campaign.compatibility > 75 ? 'bg-yellow-500' : 'bg-orange-500'
                      }`}
                      style={{ width: `${campaign.compatibility}%` }}
                    ></div>
                  </div>
                  <span className="font-medium">{campaign.compatibility}%</span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Based on your creator profile
                </p>
              </div>
              
              <Button 
                className="w-full bg-brand-pink hover:bg-brand-pink/90 mb-3"
                onClick={handleApplyToCampaign}
              >
                Apply for Campaign
              </Button>
              
              {!isAuthenticated && (
                <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-md text-sm text-center text-muted-foreground">
                  <Users className="h-5 w-5 mx-auto mb-2 text-brand-pink" />
                  <p className="font-medium mb-1">Sign up to apply</p>
                  <p>Create a creator account to apply for campaigns and start earning</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CampaignDetail;
