
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Book, Database, Search, Code, Play, Lightbulb, PenTool } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { SearchTips } from "@/components/docs/SearchTips";
import { CreditFAQ } from "@/components/docs/CreditFAQ";
import { SearchTutorial } from "@/components/docs/SearchTutorial";
import { FeatureComparison } from "@/components/docs/FeatureComparison";

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
            <TabsTrigger value="bestpractices">Best Practices</TabsTrigger>
            <TabsTrigger value="reference">API Reference</TabsTrigger>
          </TabsList>
          
          <TabsContent value="guides">
            <div className="mb-8">
              <img 
                src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&q=80&w=1200&h=400" 
                alt="Documentation" 
                className="w-full h-64 object-cover rounded-lg mb-8"
              />
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {gettingStartedGuides.map((guide, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
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
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <img 
                  src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80&w=600&h=400" 
                  alt="Tutorials" 
                  className="w-full h-64 object-cover rounded-lg mb-6"
                />
                <h2 className="text-2xl font-semibold mb-2">Video Tutorials</h2>
                <p className="text-muted-foreground mb-6">
                  Watch step-by-step video guides to get the most out of Kolerr's platform features.
                </p>
                <SearchTutorial />
              </div>
              
              <div>
                <img 
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=600&h=400" 
                  alt="Guides" 
                  className="w-full h-64 object-cover rounded-lg mb-6"
                />
                <h2 className="text-2xl font-semibold mb-2">Interactive Guides</h2>
                <p className="text-muted-foreground mb-6">
                  Learn how to maximize your influencer marketing results with our interactive tutorials.
                </p>
                <CreditFAQ />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="bestpractices">
            <div className="mb-8">
              <img 
                src="https://images.unsplash.com/photo-1500673922987-e212871fec22?auto=format&fit=crop&q=80&w=1200&h=400" 
                alt="Best Practices" 
                className="w-full h-64 object-cover rounded-lg mb-8"
              />
              <h2 className="text-2xl font-semibold mb-4">Best Practices</h2>
              <p className="text-muted-foreground mb-8">
                Optimize your influencer marketing strategy with our proven best practices and expert recommendations.
              </p>
              
              <div className="grid md:grid-cols-2 gap-8">
                <SearchTips />
                <FeatureComparison />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="reference">
            <div className="mb-8">
              <img 
                src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1200&h=400" 
                alt="API Reference" 
                className="w-full h-64 object-cover rounded-lg mb-8"
              />
              
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
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-medium mb-3">Available Endpoints</h3>
                      <div className="space-y-3">
                        <div className="border border-muted rounded-md p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-medium">Creators</h4>
                              <p className="text-muted-foreground text-sm mt-1">Query and filter creators by demographics, engagement, and niche</p>
                            </div>
                            <code className="text-xs bg-black/30 p-1 rounded text-brand-pink">
                              /api/v1/creators
                            </code>
                          </div>
                        </div>
                        <div className="border border-muted rounded-md p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-medium">Campaigns</h4>
                              <p className="text-muted-foreground text-sm mt-1">Create, update, and manage influencer marketing campaigns</p>
                            </div>
                            <code className="text-xs bg-black/30 p-1 rounded text-brand-pink">
                              /api/v1/campaigns
                            </code>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-3">SDKs & Libraries</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="border border-muted rounded-md p-4 text-center">
                          <div className="font-medium">JavaScript</div>
                          <p className="text-xs text-muted-foreground mt-1">npm install kolerr-js</p>
                        </div>
                        <div className="border border-muted rounded-md p-4 text-center">
                          <div className="font-medium">Python</div>
                          <p className="text-xs text-muted-foreground mt-1">pip install kolerr</p>
                        </div>
                      </div>
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
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DocsPage;
