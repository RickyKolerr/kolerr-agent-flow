
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Book, Database, Search, Code, Play, Lightbulb, PenTool, FileSearch, Shield, Settings, DollarSign } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { SearchTips } from "@/components/docs/SearchTips";
import { SearchTutorial } from "@/components/docs/SearchTutorial";
import { CreditFAQ } from "@/components/docs/CreditFAQ";
import { FeatureComparison } from "@/components/docs/FeatureComparison";

const DocsPage = () => {
  const { t } = useLanguage();
  
  const gettingStartedGuides = [
    {
      title: "Platform Overview",
      description: "Learn about Kolerr's core features and capabilities for influencer marketing",
      icon: Book,
      timeToRead: "5 min read",
      href: "/docs/overview"
    },
    {
      title: "Campaign Creation",
      description: "Step-by-step guide to launching your first influencer marketing campaign",
      icon: PenTool,
      timeToRead: "8 min read",
      href: "/docs/create-campaign"
    },
    {
      title: "KOL Discovery",
      description: "How to find and connect with the right influencers for your brand",
      icon: Search,
      timeToRead: "6 min read",
      href: "/docs/kol-discovery"
    },
    {
      title: "Analytics Dashboard",
      description: "Understanding your campaign performance metrics and ROI tracking",
      icon: Database,
      timeToRead: "7 min read",
      href: "/docs/analytics"
    },
    {
      title: "Contract Management",
      description: "Creating, managing and tracking influencer agreements and payments",
      icon: FileText,
      timeToRead: "6 min read", 
      href: "/docs/contracts"
    },
    {
      title: "Messaging System",
      description: "Communicate effectively with influencers throughout your campaigns",
      icon: FileText,
      timeToRead: "4 min read",
      href: "/docs/messaging"
    }
  ];
  
  const videoTutorials = [
    {
      title: "Getting Started with Kolerr",
      duration: "4:32",
      description: "A complete overview of the platform's core functions and navigation",
      thumbnail: "/lovable-uploads/24be9cce-35ba-4568-9efb-436abe513e26.png"
    },
    {
      title: "Advanced KOL Filtering",
      duration: "6:15",
      description: "Master the search filters to find the perfect influencers for your campaigns",
      thumbnail: "/lovable-uploads/7532d8a9-3b4e-447b-a5b9-b44a86b7dfbf.png"
    },
    {
      title: "Campaign Analytics Deep Dive",
      duration: "8:47",
      description: "Learn how to analyze campaign performance and optimize future strategies",
      thumbnail: "/lovable-uploads/d4572dc9-629c-46f5-9256-41590c40e030.png"
    },
    {
      title: "Effective Influencer Negotiations",
      duration: "7:22",
      description: "Tips for successful contract negotiations with influencers",
      thumbnail: "/lovable-uploads/92eead47-3854-4a2d-a9ca-5b60716aaec4.png"
    }
  ];
  
  const bestPractices = [
    {
      title: "Defining Campaign Goals",
      description: "How to set clear, measurable objectives for your influencer campaigns"
    },
    {
      title: "Influencer Selection Criteria",
      description: "Key metrics to consider when choosing the right creators for your brand"
    },
    {
      title: "Content Briefing Excellence",
      description: "Creating comprehensive briefs that inspire great creator content"
    },
    {
      title: "Performance Tracking",
      description: "Setting up proper tracking to measure true campaign ROI"
    }
  ];
  
  const apiEndpoints = [
    {
      name: "Creators",
      endpoint: "/api/v1/creators",
      description: "Query and filter creators by demographics, engagement, and niche"
    },
    {
      name: "Campaigns",
      endpoint: "/api/v1/campaigns",
      description: "Create, update, and manage influencer marketing campaigns"
    },
    {
      name: "Analytics",
      endpoint: "/api/v1/analytics",
      description: "Retrieve performance metrics and ROI data for campaigns"
    },
    {
      name: "Contracts",
      endpoint: "/api/v1/contracts",
      description: "Create and manage influencer agreements and payment terms"
    },
    {
      name: "Messaging",
      endpoint: "/api/v1/messages",
      description: "Send and receive messages between brands and creators"
    }
  ];

  const complianceDocs = [
    {
      title: "FTC Disclosure Requirements",
      description: "Guidelines for proper disclosure in influencer marketing campaigns"
    },
    {
      title: "Regional Regulations",
      description: "Country-specific rules affecting influencer marketing campaigns"
    },
    {
      title: "Content Restrictions",
      description: "Platform-specific guidelines and prohibited content categories"
    },
    {
      title: "Data Privacy Compliance",
      description: "GDPR, CCPA and other privacy regulations affecting campaigns"
    }
  ];

  return (
    <div className="container mx-auto py-12">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Documentation</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need to know about using Kolerr's influencer marketing platform
          </p>
          
          <div className="relative max-w-2xl mx-auto mt-8">
            <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground pointer-events-none" />
            <Input 
              placeholder="Search documentation..." 
              className="pl-10 h-12" 
            />
          </div>
        </div>

        <Tabs defaultValue="guides" className="mb-12">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="guides">Getting Started</TabsTrigger>
            <TabsTrigger value="tutorials">Tutorials</TabsTrigger>
            <TabsTrigger value="best-practices">Best Practices</TabsTrigger>
            <TabsTrigger value="reference">API Reference</TabsTrigger>
          </TabsList>
          
          <TabsContent value="guides">
            <div className="grid md:grid-cols-2 gap-6">
              {gettingStartedGuides.map((guide, index) => (
                <Card key={index} className="hover:border-brand-pink/50 transition-colors">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 rounded-lg bg-brand-pink/10">
                        <guide.icon className="w-5 h-5 text-brand-pink" />
                      </div>
                      <CardTitle className="text-xl">{guide.title}</CardTitle>
                    </div>
                    <p className="text-muted-foreground text-sm">{guide.description}</p>
                  </CardHeader>
                  <CardContent className="flex items-center justify-between">
                    <a href={guide.href} className="text-brand-pink hover:text-brand-pink/80 text-sm font-medium">
                      Read documentation →
                    </a>
                    <span className="text-xs text-muted-foreground">{guide.timeToRead}</span>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="mt-8">
              <Card className="bg-brand-pink/5 border-brand-pink/20">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-full bg-brand-pink/10">
                      <Lightbulb className="w-6 h-6 text-brand-pink" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Need personalized guidance?</h3>
                      <p className="text-muted-foreground mb-4">
                        Our team of experts is ready to help you get the most out of the platform with tailored onboarding sessions.
                      </p>
                      <Button variant="outline" className="mt-2">Schedule a call</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6 mt-8">
              <SearchTips />
              <CreditFAQ />
            </div>
          </TabsContent>
          
          <TabsContent value="tutorials">
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-semibold mb-6">Video Tutorials</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {videoTutorials.map((video, index) => (
                    <Card key={index} className="overflow-hidden hover-scale">
                      <div className="aspect-video relative">
                        <img 
                          src={video.thumbnail} 
                          alt={video.title}
                          className="object-cover w-full h-full"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/50 hover:bg-black/30 transition-colors">
                          <div className="bg-white/90 rounded-full p-3">
                            <Play className="w-6 h-6 text-brand-pink" />
                          </div>
                        </div>
                        <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                          {video.duration}
                        </div>
                      </div>
                      <CardContent className="py-4">
                        <h3 className="font-medium">{video.title}</h3>
                        <p className="text-muted-foreground text-sm mt-1">{video.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
              
              <div>
                <h2 className="text-2xl font-semibold mb-6">Step-by-step Guides</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="hover:border-brand-pink/50 transition-colors">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <DollarSign className="h-5 w-5 text-brand-pink" />
                        ROI Calculation Guide
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">
                        Learn how to accurately measure and report on your influencer marketing ROI.
                      </p>
                      <SearchTutorial />
                    </CardContent>
                  </Card>
                  
                  <Card className="hover:border-brand-pink/50 transition-colors">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Shield className="h-5 w-5 text-brand-pink" />
                        Compliance Checklist
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">
                        Ensure your campaigns follow all legal regulations and platform guidelines.
                      </p>
                      <div className="space-y-3">
                        {complianceDocs.map((item, index) => (
                          <div key={index} className="space-y-1">
                            <h3 className="font-medium">{item.title}</h3>
                            <p className="text-sm text-muted-foreground">{item.description}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="best-practices">
            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5 text-brand-pink" />
                    Campaign Optimization
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-6">
                    Follow these industry best practices to maximize the effectiveness of your influencer campaigns.
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    {bestPractices.map((practice, index) => (
                      <div key={index} className="border border-muted rounded-md p-4">
                        <h3 className="font-medium mb-2">{practice.title}</h3>
                        <p className="text-sm text-muted-foreground">{practice.description}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <PenTool className="h-5 w-5 text-brand-pink" />
                      Content Strategy Guide
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      Develop effective content strategies for different social platforms and influencer types.
                    </p>
                    <div className="space-y-4">
                      <div className="border-l-2 border-brand-pink pl-4">
                        <h3 className="font-medium">Instagram Best Practices</h3>
                        <p className="text-sm text-muted-foreground">Strategic approaches for feed posts, stories, and reels</p>
                      </div>
                      <div className="border-l-2 border-muted pl-4">
                        <h3 className="font-medium">TikTok Engagement Tactics</h3>
                        <p className="text-sm text-muted-foreground">Optimize content for the TikTok algorithm</p>
                      </div>
                      <div className="border-l-2 border-muted pl-4">
                        <h3 className="font-medium">YouTube Campaign Structure</h3>
                        <p className="text-sm text-muted-foreground">Long-form content strategies for maximum impact</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileSearch className="h-5 w-5 text-brand-pink" />
                      Influencer Selection Framework
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      A comprehensive approach to evaluating and selecting the right influencers.
                    </p>
                    <FeatureComparison />
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="reference">
            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Code className="h-5 w-5 text-brand-pink" />
                    API Documentation
                  </CardTitle>
                </CardHeader>
                <CardContent className="prose prose-gray max-w-none">
                  <p className="text-muted-foreground mb-6">
                    Comprehensive API reference for integrating Kolerr into your applications and workflows.
                  </p>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-3">Authentication</h3>
                      <div className="bg-black/20 p-4 rounded-md">
                        <p className="text-sm font-mono mb-1">Bearer Token Authentication</p>
                        <code className="text-xs bg-black/30 p-1 rounded">
                          Authorization: Bearer YOUR_API_KEY
                        </code>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-3">Available Endpoints</h3>
                      {apiEndpoints.map((endpoint, index) => (
                        <div key={index} className="border border-muted rounded-md p-4 mb-3">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-medium">{endpoint.name}</h4>
                              <p className="text-muted-foreground text-sm mt-1">{endpoint.description}</p>
                            </div>
                            <code className="text-xs bg-black/30 p-1 rounded text-brand-pink">
                              {endpoint.endpoint}
                            </code>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mt-8">
                    <a href="/api" className="text-brand-pink hover:text-brand-pink/80 flex items-center gap-1">
                      View full API documentation
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                    </a>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>SDKs & Libraries</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="border border-muted rounded-md p-4 text-center">
                      <div className="font-medium">JavaScript</div>
                      <p className="text-xs text-muted-foreground mt-1">npm install kolerr-js</p>
                    </div>
                    <div className="border border-muted rounded-md p-4 text-center">
                      <div className="font-medium">Python</div>
                      <p className="text-xs text-muted-foreground mt-1">pip install kolerr</p>
                    </div>
                    <div className="border border-muted rounded-md p-4 text-center">
                      <div className="font-medium">Ruby</div>
                      <p className="text-xs text-muted-foreground mt-1">gem install kolerr</p>
                    </div>
                    <div className="border border-muted rounded-md p-4 text-center">
                      <div className="font-medium">PHP</div>
                      <p className="text-xs text-muted-foreground mt-1">composer require kolerr</p>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <h3 className="font-medium mb-3">Webhook Integration</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Set up webhooks to receive real-time updates about campaign activities, influencer applications, and contract changes.
                    </p>
                    <div className="bg-black/20 p-4 rounded-md">
                      <p className="text-sm font-mono mb-1">Example webhook payload</p>
                      <code className="text-xs bg-black/30 p-1 rounded block whitespace-pre overflow-x-auto">
{`{
  "event": "campaign.application.received",
  "data": {
    "campaign_id": "cam_12345",
    "creator_id": "kol_67890",
    "application_id": "app_54321",
    "status": "pending",
    "created_at": "2025-05-11T08:30:00Z"
  }
}`}
                      </code>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DocsPage;
