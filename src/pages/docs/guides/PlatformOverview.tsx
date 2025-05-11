
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Book, CheckCircle, FileText } from "lucide-react";
import { Link } from "react-router-dom";

const PlatformOverviewGuide = () => {
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
            <Book className="w-6 h-6 text-brand-pink" />
          </div>
          <h1 className="text-3xl font-bold">Platform Overview</h1>
        </div>
        
        <div className="text-sm text-muted-foreground flex items-center gap-4 mb-8">
          <span>5 min read</span>
          <span>Last updated: May 5, 2025</span>
        </div>
        
        <img 
          src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=1200&h=500" 
          alt="Kolerr Platform" 
          className="w-full rounded-lg object-cover mb-8"
        />

        <div className="prose prose-gray max-w-none dark:prose-invert">
          <p className="text-xl mb-8">
            The Kolerr platform helps brands discover, connect with, and manage influencer marketing campaigns 
            at scale through an integrated suite of tools.
          </p>
          
          <h2 className="text-2xl font-semibold mt-10 mb-4">Core Features</h2>
          
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card className="border-brand-pink/20">
              <CardContent className="pt-6">
                <h3 className="text-lg font-medium mb-2">KOL Discovery</h3>
                <p className="text-muted-foreground">
                  Advanced search and filtering tools to find the perfect creators for your brand based on audience 
                  demographics, engagement rates, and content style.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-brand-pink/20">
              <CardContent className="pt-6">
                <h3 className="text-lg font-medium mb-2">Campaign Management</h3>
                <p className="text-muted-foreground">
                  End-to-end campaign creation, tracking, and reporting tools to streamline your influencer marketing workflow.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-brand-pink/20">
              <CardContent className="pt-6">
                <h3 className="text-lg font-medium mb-2">Analytics Dashboard</h3>
                <p className="text-muted-foreground">
                  Comprehensive performance metrics to measure ROI and optimize future campaigns.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-brand-pink/20">
              <CardContent className="pt-6">
                <h3 className="text-lg font-medium mb-2">Contract Management</h3>
                <p className="text-muted-foreground">
                  Digital contract creation, signing, and management to formalize creator relationships.
                </p>
              </CardContent>
            </Card>
          </div>
          
          <h2 className="text-2xl font-semibold mt-10 mb-4">Platform Architecture</h2>
          <p>
            Kolerr is built on a modern technology stack that ensures fast search results, reliable data, 
            and a seamless user experience. Our platform consists of:
          </p>
          
          <ul className="space-y-3 my-6">
            <li className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
              <span><strong>Creator Database</strong>: Over 2 million vetted influencers across major social platforms</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
              <span><strong>Campaign Tools</strong>: Workflow management for briefing, content approval, and scheduling</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
              <span><strong>Analytics Engine</strong>: Real-time data collection and performance tracking</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
              <span><strong>Messaging System</strong>: Secure communication between brands and creators</span>
            </li>
          </ul>
          
          <h2 className="text-2xl font-semibold mt-10 mb-4">Getting Started</h2>
          <p>
            To make the most of Kolerr's platform, we recommend following these initial steps:
          </p>
          
          <ol className="space-y-4 my-6 list-decimal ml-6">
            <li className="pl-2">
              <span className="font-medium">Complete your brand profile</span> with detailed information to help match with relevant creators
            </li>
            <li className="pl-2">
              <span className="font-medium">Set up your team members</span> with appropriate access permissions
            </li>
            <li className="pl-2">
              <span className="font-medium">Define your campaign goals</span> to better measure success
            </li>
            <li className="pl-2">
              <span className="font-medium">Explore the KOL discovery tool</span> to understand available search filters
            </li>
          </ol>
          
          <div className="my-10 p-6 bg-black/10 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Next Steps</h3>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="flex-1">
                <Link to="/docs/guides/campaign-creation">
                  Campaign Creation Guide
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

export default PlatformOverviewGuide;
