
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Search, CheckCircle, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";

const KOLDiscoveryGuide = () => {
  return (
    <div className="container mx-auto py-12">
      <div className="max-w-4xl mx-auto px-4">
        <Link to="/docs">
          <Button variant="ghost" className="mb-8 -ml-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Documentation
          </Button>
        </Link>
        
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-brand-pink/10">
            <Search className="w-6 h-6 text-brand-pink" />
          </div>
          <h1 className="text-3xl font-bold">KOL Discovery</h1>
        </div>
        
        <div className="text-sm text-muted-foreground flex items-center gap-4 mb-8">
          <span>6 min read</span>
          <span>Last updated: May 3, 2025</span>
        </div>
        
        <img 
          src="https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=1200&h=500" 
          alt="KOL Discovery" 
          className="w-full rounded-lg object-cover mb-8"
        />

        <div className="prose prose-gray max-w-none dark:prose-invert">
          <p className="text-xl mb-8">
            Finding the right Key Opinion Leaders (KOLs) is crucial for campaign success. Kolerr's sophisticated 
            discovery tools help you identify creators who can authentically connect with your target audience.
          </p>
          
          <h2 className="text-2xl font-semibold mt-10 mb-4">Search Functionality</h2>
          <p>
            Kolerr's KOL discovery tool offers multiple ways to find the perfect creators for your campaigns:
          </p>
          
          <div className="grid md:grid-cols-2 gap-6 my-8">
            <Card className="border-brand-pink/20">
              <CardContent className="pt-6">
                <h3 className="text-lg font-medium mb-2">Keyword Search</h3>
                <p className="text-muted-foreground">
                  Find creators by searching their bio, content topics, hashtags, and captions they typically use.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-brand-pink/20">
              <CardContent className="pt-6">
                <h3 className="text-lg font-medium mb-2">Demographic Filters</h3>
                <p className="text-muted-foreground">
                  Filter by audience age, location, gender, language, and interests to reach your target market.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-brand-pink/20">
              <CardContent className="pt-6">
                <h3 className="text-lg font-medium mb-2">Performance Metrics</h3>
                <p className="text-muted-foreground">
                  Filter by engagement rate, follower count, average views, and other key performance indicators.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-brand-pink/20">
              <CardContent className="pt-6">
                <h3 className="text-lg font-medium mb-2">Niche Categories</h3>
                <p className="text-muted-foreground">
                  Browse creators by industry categories like fashion, beauty, gaming, fitness, tech, and more.
                </p>
              </CardContent>
            </Card>
          </div>
          
          <h2 className="text-2xl font-semibold mt-10 mb-4">Advanced Search Techniques</h2>
          
          <div className="space-y-6 mb-8">
            <div className="flex items-start gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-pink text-white font-medium">
                1
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">Boolean Operators</h3>
                <p className="text-muted-foreground">
                  Use AND, OR, and NOT operators to create more precise searches. 
                  For example: "fitness AND nutrition NOT supplements"
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-pink text-white font-medium">
                2
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">Audience Overlap Analysis</h3>
                <p className="text-muted-foreground">
                  Identify creators whose audiences overlap with your existing customers 
                  or with other creators you've successfully worked with.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-pink text-white font-medium">
                3
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">Content Analysis</h3>
                <p className="text-muted-foreground">
                  Search by content themes, visual style, or specific products/topics mentioned 
                  in creators' past content.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-pink text-white font-medium">
                4
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">Saved Search Templates</h3>
                <p className="text-muted-foreground">
                  Create and save complex search parameters for repeated use across campaigns.
                </p>
              </div>
            </div>
          </div>
          
          <h2 className="text-2xl font-semibold mt-10 mb-4">Evaluating KOLs</h2>
          
          <Card className="not-prose my-8 border-brand-pink/20">
            <CardContent className="p-6">
              <h3 className="text-lg font-medium mb-4">Key Metrics to Consider</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-2">Quantitative Metrics</h4>
                  <ul className="space-y-1 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 shrink-0" />
                      <span>Engagement rate (vs. industry average)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 shrink-0" />
                      <span>Audience growth trajectory</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 shrink-0" />
                      <span>Comment quality and sentiment</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 shrink-0" />
                      <span>Audience demographics alignment</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 shrink-0" />
                      <span>Content performance consistency</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Qualitative Factors</h4>
                  <ul className="space-y-1 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 shrink-0" />
                      <span>Content quality and production value</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 shrink-0" />
                      <span>Brand voice compatibility</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 shrink-0" />
                      <span>Authenticity and audience trust</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 shrink-0" />
                      <span>Previous brand collaboration quality</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 shrink-0" />
                      <span>Community interaction style</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="bg-orange-50 border-l-4 border-orange-500 p-4 my-8">
            <div className="flex">
              <div className="flex-shrink-0">
                <AlertTriangle className="h-5 w-5 text-orange-500" />
              </div>
              <div className="ml-3">
                <h3 className="text-base font-medium text-orange-800">Common Pitfalls to Avoid</h3>
                <div className="mt-2 text-sm text-orange-700">
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Focusing solely on follower count without considering engagement quality</li>
                    <li>Neglecting to verify audience authenticity (bot followers)</li>
                    <li>Overlooking creators' past brand collaborations for compatibility</li>
                    <li>Ignoring audience sentiment in comments and interactions</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          <h2 className="text-2xl font-semibold mt-10 mb-4">Outreach Best Practices</h2>
          <p>
            Once you've identified potential KOLs, follow these outreach guidelines for better response rates:
          </p>
          
          <ul className="space-y-3 my-6">
            <li className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
              <span><strong>Personalize Your Approach</strong>: Reference specific content they've created that you enjoyed</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
              <span><strong>Be Clear About Expectations</strong>: Outline campaign goals and deliverables upfront</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
              <span><strong>Highlight the Value Proposition</strong>: Explain what's in it for them beyond compensation</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
              <span><strong>Keep Initial Messages Concise</strong>: Save details for follow-up communications</span>
            </li>
          </ul>
          
          <div className="my-10 p-6 bg-black/10 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Next Steps</h3>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="flex-1">
                <Link to="/docs/guides/analytics-dashboard">
                  Analytics Dashboard Guide
                  <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
                </Link>
              </Button>
              
              <Button variant="outline" asChild size="lg" className="flex-1">
                <Link to="/docs">
                  Browse All Documentation
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KOLDiscoveryGuide;
