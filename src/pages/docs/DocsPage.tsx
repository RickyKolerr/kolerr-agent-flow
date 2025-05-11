
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Book, Database, Search, Code, Play, Lightbulb, PenTool } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

const DocsPage = () => {
  const { t } = useLanguage();
  
  const gettingStartedGuides = [
    {
      title: "Platform Overview",
      description: "Learn about Kolerr's core features and capabilities for influencer marketing",
      icon: Book,
      timeToRead: "5 min read"
    },
    {
      title: "Campaign Creation",
      description: "Step-by-step guide to launching your first influencer marketing campaign",
      icon: PenTool,
      timeToRead: "8 min read"
    },
    {
      title: "KOL Discovery",
      description: "How to find and connect with the right influencers for your brand",
      icon: Search,
      timeToRead: "6 min read"
    },
    {
      title: "Analytics Dashboard",
      description: "Understanding your campaign performance metrics and ROI tracking",
      icon: Database,
      timeToRead: "7 min read"
    }
  ];
  
  const videoTutorials = [
    {
      title: "Getting Started with Kolerr",
      duration: "4:32",
      thumbnail: "/lovable-uploads/24be9cce-35ba-4568-9efb-436abe513e26.png"
    },
    {
      title: "Advanced KOL Filtering",
      duration: "6:15",
      thumbnail: "/lovable-uploads/7532d8a9-3b4e-447b-a5b9-b44a86b7dfbf.png"
    },
    {
      title: "Campaign Analytics Deep Dive",
      duration: "8:47",
      thumbnail: "/lovable-uploads/d4572dc9-629c-46f5-9256-41590c40e030.png"
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
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="guides">Getting Started</TabsTrigger>
            <TabsTrigger value="tutorials">Tutorials</TabsTrigger>
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
                    <button className="text-brand-pink hover:text-brand-pink/80 text-sm font-medium">
                      Read documentation →
                    </button>
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
          </TabsContent>
          
          <TabsContent value="tutorials">
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-semibold mb-6">Video Tutorials</h2>
                <div className="grid md:grid-cols-3 gap-6">
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
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
              
              <div>
                <h2 className="text-2xl font-semibold mb-6">Step-by-step Guides</h2>
                <Card>
                  <CardContent className="pt-6">
                    <div className="prose prose-gray max-w-none">
                      <h3 className="text-xl font-semibold mb-4">Interactive Walkthroughs</h3>
                      <p className="text-muted-foreground">
                        Follow our interactive guides to master key platform features:
                      </p>
                      <ul className="mt-4 space-y-3">
                        <li className="flex items-center gap-2">
                          <FileText className="w-5 h-5 text-brand-pink" />
                          <span className="text-muted-foreground">Setting up your first campaign</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <FileText className="w-5 h-5 text-brand-pink" />
                          <span className="text-muted-foreground">Advanced KOL filtering techniques</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <FileText className="w-5 h-5 text-brand-pink" />
                          <span className="text-muted-foreground">Analytics and reporting deep dive</span>
                        </li>
                      </ul>
                    </div>
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
