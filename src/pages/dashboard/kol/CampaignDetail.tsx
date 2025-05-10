
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Calendar,
  DollarSign,
  Users,
  Clock,
  ArrowLeft,
  Send,
  CheckCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import { Campaign } from "@/types/campaign";

const CampaignDetail = () => {
  const { campaignId } = useParams();
  const navigate = useNavigate();
  const [applicationMessage, setApplicationMessage] = useState("");
  const [isApplying, setIsApplying] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);

  // Mock data for campaign details - in a real app, you would fetch this data
  const campaign = {
    id: campaignId || "unknown",
    title: "Summer Fashion Collection",
    brand: "StyleCo",
    brandLogo: "https://ui-avatars.com/api/?name=SC&background=0D8ABC&color=fff",
    description: "Promote our new summer fashion collection across your TikTok channel. Looking for authentic content that showcases our products in real-life situations. We're focused on sustainable fashion and want to highlight eco-friendly materials.",
    budget: "$500-1000",
    compatibility: 85,
    deadline: "2023-07-15",
    platforms: ["tiktok"],
    categories: ["Fashion", "Lifestyle"],
    requirements: ["15-60 second video", "Product showcase", "Mention eco-friendly materials"],
    status: "active",
    fullRequirements: [
      {
        title: "Content Format",
        details: "15-60 second TikTok video showcasing at least 2 items from the collection"
      },
      {
        title: "Key Messages",
        details: "Highlight sustainable materials, summer vibes, comfort and style"
      },
      {
        title: "Caption Requirements",
        details: "Include the hashtags #StyleCoSummer #SustainableFashion and tag @StyleCo"
      },
      {
        title: "Timeline",
        details: "Content must be posted between July 1-15, 2023"
      }
    ],
    brandInfo: {
      name: "StyleCo",
      description: "StyleCo is a sustainable fashion brand focused on creating eco-friendly clothing without compromising on style.",
      website: "https://styleco-example.com",
      foundedYear: 2018
    }
  };

  const handleApply = () => {
    if (!applicationMessage.trim()) {
      toast.error("Please add a message to your application");
      return;
    }
    
    setIsApplying(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsApplying(false);
      setHasApplied(true);
      toast.success("Application submitted successfully!");
    }, 1000);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-3xl font-bold">{campaign.title}</h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-2 space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={campaign.brandLogo} alt={campaign.brand} />
                  <AvatarFallback>{campaign.brand.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-xl">{campaign.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">{campaign.brand}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-medium mb-2">Campaign Description</h3>
                <p className="text-muted-foreground">{campaign.description}</p>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="flex flex-col items-center justify-center p-3 border rounded-lg">
                  <DollarSign className="h-5 w-5 text-green-500 mb-2" />
                  <span className="text-sm font-medium">{campaign.budget}</span>
                  <span className="text-xs text-muted-foreground">Budget</span>
                </div>
                <div className="flex flex-col items-center justify-center p-3 border rounded-lg">
                  <Clock className="h-5 w-5 text-amber-500 mb-2" />
                  <span className="text-sm font-medium">{new Date(campaign.deadline).toLocaleDateString()}</span>
                  <span className="text-xs text-muted-foreground">Deadline</span>
                </div>
                <div className="flex flex-col items-center justify-center p-3 border rounded-lg">
                  <Calendar className="h-5 w-5 text-blue-500 mb-2" />
                  <span className="text-sm font-medium">July 2023</span>
                  <span className="text-xs text-muted-foreground">Campaign Period</span>
                </div>
                <div className="flex flex-col items-center justify-center p-3 border rounded-lg">
                  <Users className="h-5 w-5 text-purple-500 mb-2" />
                  <span className="text-sm font-medium">10-15</span>
                  <span className="text-xs text-muted-foreground">KOLs Needed</span>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Platforms & Categories</h3>
                <div className="flex flex-wrap gap-2">
                  {campaign.platforms.map(platform => (
                    <Badge key={platform} variant="outline" className="bg-blue-500/10 text-blue-500 border-blue-500/20">
                      {platform}
                    </Badge>
                  ))}
                  {campaign.categories.map(category => (
                    <Badge key={category} variant="outline" className="capitalize">
                      {category}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="font-medium mb-3">Campaign Requirements</h3>
                <div className="space-y-4">
                  {campaign.fullRequirements.map((req, index) => (
                    <div key={index}>
                      <h4 className="text-sm font-medium">{req.title}</h4>
                      <p className="text-sm text-muted-foreground">{req.details}</p>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
          
          {!hasApplied ? (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Apply to this Campaign</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Write a message to accompany your application. Explain why you're a good fit for this campaign..."
                  value={applicationMessage}
                  onChange={(e) => setApplicationMessage(e.target.value)}
                  className="min-h-[120px]"
                />
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button variant="outline" className="mr-2" onClick={() => navigate(-1)}>
                  Cancel
                </Button>
                <Button 
                  disabled={isApplying || applicationMessage.trim() === ""} 
                  onClick={handleApply}
                >
                  <Send className="h-4 w-4 mr-2" />
                  Submit Application
                </Button>
              </CardFooter>
            </Card>
          ) : (
            <Card className="bg-green-50 border-green-100">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="bg-green-100 p-2 rounded-full">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-green-800">Application Submitted</h3>
                    <p className="text-sm text-green-600">You've successfully applied to this campaign. You'll be notified if you're selected.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">About {campaign.brandInfo.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-center mb-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={campaign.brandLogo} alt={campaign.brand} />
                  <AvatarFallback className="text-xl">{campaign.brand.substring(0, 2)}</AvatarFallback>
                </Avatar>
              </div>
              
              <p className="text-sm text-muted-foreground">{campaign.brandInfo.description}</p>
              
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <p className="text-muted-foreground">Website</p>
                  <p className="font-medium">{campaign.brandInfo.website}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Founded</p>
                  <p className="font-medium">{campaign.brandInfo.foundedYear}</p>
                </div>
              </div>
              
              <div className="pt-2">
                <Button variant="outline" className="w-full" asChild>
                  <a href={campaign.brandInfo.website} target="_blank" rel="noopener noreferrer">
                    Visit Website
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Match Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center">
                <div className="text-4xl font-bold text-brand-pink">
                  {campaign.compatibility}%
                </div>
                <p className="text-sm text-muted-foreground mt-1">Compatibility with your profile</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CampaignDetail;
