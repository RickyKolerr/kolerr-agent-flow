
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, PenTool, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const CampaignCreationGuide = () => {
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
            <PenTool className="w-6 h-6 text-brand-pink" />
          </div>
          <h1 className="text-3xl font-bold">Campaign Creation</h1>
        </div>
        
        <div className="text-sm text-muted-foreground flex items-center gap-4 mb-8">
          <span>8 min read</span>
          <span>Last updated: May 7, 2025</span>
        </div>
        
        <img 
          src="https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?auto=format&fit=crop&q=80&w=1200&h=500" 
          alt="Campaign Creation" 
          className="w-full rounded-lg object-cover mb-8"
        />

        <div className="prose prose-gray max-w-none dark:prose-invert">
          <p className="text-xl mb-8">
            Creating effective influencer marketing campaigns requires careful planning, clear objectives, and the right tools. 
            This guide walks you through the step-by-step process of launching successful campaigns on Kolerr.
          </p>
          
          <h2 className="text-2xl font-semibold mt-10 mb-4">Campaign Setup Process</h2>
          
          <div className="space-y-6 mb-10">
            <div className="flex items-start gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-pink text-white font-medium">
                1
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">Define Campaign Objectives</h3>
                <p className="text-muted-foreground">
                  Start by clearly defining what you want to achieve with your campaign – brand awareness, 
                  audience growth, direct sales, or content creation. Your objectives will guide all subsequent decisions.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-pink text-white font-medium">
                2
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">Set Campaign Parameters</h3>
                <p className="text-muted-foreground">
                  Determine your campaign timeline, budget allocation, and key performance indicators (KPIs) 
                  that will help you measure success.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-pink text-white font-medium">
                3
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">Create Campaign Brief</h3>
                <p className="text-muted-foreground">
                  Develop a comprehensive brief that outlines your brand guidelines, messaging requirements, 
                  content expectations, and deliverables for creators.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-pink text-white font-medium">
                4
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">Select Creators</h3>
                <p className="text-muted-foreground">
                  Use Kolerr's discovery tools to find and invite creators who align with your brand values 
                  and can effectively reach your target audience.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-pink text-white font-medium">
                5
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">Finalize Agreements</h3>
                <p className="text-muted-foreground">
                  Establish clear terms with creators, including compensation, content rights, publishing schedule, 
                  and performance expectations.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-pink text-white font-medium">
                6
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">Launch and Monitor</h3>
                <p className="text-muted-foreground">
                  Activate your campaign and use Kolerr's analytics dashboard to track performance in real-time.
                </p>
              </div>
            </div>
          </div>
          
          <h2 className="text-2xl font-semibold mt-10 mb-4">Campaign Brief Template</h2>
          
          <Card className="not-prose my-6 border-brand-pink/20">
            <CardContent className="p-6">
              <h3 className="text-lg font-medium mb-4">Essential Elements for Your Campaign Brief</h3>
              
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                  <span><strong>Brand Overview</strong>: Brief background about your company, values, and mission</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                  <span><strong>Campaign Goals</strong>: What you hope to achieve with this specific campaign</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                  <span><strong>Target Audience</strong>: Detailed description of who you want to reach</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                  <span><strong>Content Guidelines</strong>: Style, tone, key messages, and required elements</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                  <span><strong>Deliverables</strong>: Specific content formats, posting requirements, and timelines</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                  <span><strong>Do's and Don'ts</strong>: Clear boundaries for creator content</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                  <span><strong>Approval Process</strong>: How and when content will be reviewed</span>
                </li>
              </ul>
            </CardContent>
          </Card>
          
          <h2 className="text-2xl font-semibold mt-10 mb-4">Best Practices for Campaign Success</h2>
          <p>
            Based on thousands of successful campaigns run through Kolerr, we've identified these key best practices:
          </p>
          
          <ul className="space-y-3 my-6">
            <li className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
              <span><strong>Prioritize Creator Fit</strong>: Choose creators who genuinely align with your brand values</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
              <span><strong>Balance Creative Freedom</strong>: Give guidelines without restricting creators' authentic voice</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
              <span><strong>Stagger Content Publishing</strong>: Space out posts to maintain longer campaign visibility</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
              <span><strong>Leverage Multiple Formats</strong>: Combine stories, posts, reels, and other content types</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
              <span><strong>Build Long-term Relationships</strong>: Consider ongoing partnerships with top-performing creators</span>
            </li>
          </ul>
          
          <div className="my-10 p-6 bg-black/10 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Next Steps</h3>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="flex-1">
                <Link to="/docs/guides/kol-discovery">
                  KOL Discovery Guide
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

export default CampaignCreationGuide;
