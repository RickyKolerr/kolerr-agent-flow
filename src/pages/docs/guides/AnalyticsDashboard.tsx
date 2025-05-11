
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Database, BarChart2, LineChart, PieChart } from "lucide-react";
import { Link } from "react-router-dom";

const AnalyticsDashboardGuide = () => {
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
            <Database className="w-6 h-6 text-brand-pink" />
          </div>
          <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
        </div>
        
        <div className="text-sm text-muted-foreground flex items-center gap-4 mb-8">
          <span>7 min read</span>
          <span>Last updated: May 10, 2025</span>
        </div>
        
        <img 
          src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200&h=500" 
          alt="Analytics Dashboard" 
          className="w-full rounded-lg object-cover mb-8"
        />

        <div className="prose prose-gray max-w-none dark:prose-invert">
          <p className="text-xl mb-8">
            The Analytics Dashboard provides comprehensive insights into your influencer marketing performance, 
            helping you measure ROI, optimize campaigns, and make data-driven decisions.
          </p>
          
          <h2 className="text-2xl font-semibold mt-10 mb-4">Dashboard Overview</h2>
          
          <div className="grid md:grid-cols-3 gap-4 my-8">
            <Card className="border-brand-pink/20">
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 mb-3">
                  <BarChart2 className="h-5 w-5 text-brand-pink" />
                  <h3 className="font-medium">Campaign Performance</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Track key metrics across all campaigns including reach, engagement, and conversion metrics.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-brand-pink/20">
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 mb-3">
                  <LineChart className="h-5 w-5 text-brand-pink" />
                  <h3 className="font-medium">Creator Analytics</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Compare performance across creators to identify top performers and optimization opportunities.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-brand-pink/20">
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 mb-3">
                  <PieChart className="h-5 w-5 text-brand-pink" />
                  <h3 className="font-medium">ROI Tracking</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Calculate return on investment with conversion tracking and attribution modeling.
                </p>
              </CardContent>
            </Card>
          </div>
          
          <h2 className="text-2xl font-semibold mt-10 mb-4">Key Performance Metrics</h2>
          
          <div className="space-y-6 mb-10">
            <div>
              <h3 className="text-lg font-medium mb-2">Reach & Awareness Metrics</h3>
              <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                <li>Impressions (total, unique, frequency)</li>
                <li>Audience growth (follower increase)</li>
                <li>Content views (total and completion rate)</li>
                <li>Brand mention tracking</li>
                <li>Hashtag performance</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-2">Engagement Metrics</h3>
              <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                <li>Engagement rate (by followers and reach)</li>
                <li>Interactions by type (likes, comments, shares, saves)</li>
                <li>Comment sentiment analysis</li>
                <li>Interaction growth compared to creator's average</li>
                <li>User-generated content tracking</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-2">Conversion Metrics</h3>
              <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                <li>Click-through rate to destination</li>
                <li>Coupon/promo code usage</li>
                <li>Attributed sales and revenue</li>
                <li>Cost per acquisition (CPA)</li>
                <li>Return on ad spend (ROAS)</li>
              </ul>
            </div>
          </div>
          
          <h2 className="text-2xl font-semibold mt-10 mb-4">Custom Report Builder</h2>
          <p>
            The Kolerr Analytics Dashboard includes a powerful custom report builder that allows you to:
          </p>
          
          <div className="grid md:grid-cols-2 gap-6 my-8">
            <Card className="border-brand-pink/20">
              <CardContent className="pt-6">
                <h3 className="text-lg font-medium mb-2">Metric Selection</h3>
                <p className="text-muted-foreground text-sm">
                  Choose from over 50 metrics to include in your custom reports, combining data points 
                  across campaigns, creators, and platforms.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-brand-pink/20">
              <CardContent className="pt-6">
                <h3 className="text-lg font-medium mb-2">Visualization Options</h3>
                <p className="text-muted-foreground text-sm">
                  Select from various chart types (line, bar, pie, scatter) to visualize your data 
                  in the most meaningful way.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-brand-pink/20">
              <CardContent className="pt-6">
                <h3 className="text-lg font-medium mb-2">Comparative Analysis</h3>
                <p className="text-muted-foreground text-sm">
                  Compare performance across different time periods, campaigns, or creator groups 
                  to identify trends and patterns.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-brand-pink/20">
              <CardContent className="pt-6">
                <h3 className="text-lg font-medium mb-2">Export & Scheduling</h3>
                <p className="text-muted-foreground text-sm">
                  Export reports in multiple formats (PDF, CSV, PPTX) or schedule automated report 
                  delivery to stakeholders.
                </p>
              </CardContent>
            </Card>
          </div>
          
          <h2 className="text-2xl font-semibold mt-10 mb-4">Setting Up Conversion Tracking</h2>
          <p>
            To get the most value from your analytics, we recommend setting up conversion tracking:
          </p>
          
          <div className="space-y-6 my-8">
            <div className="flex items-start gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-pink text-white font-medium">
                1
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">Integration Setup</h3>
                <p className="text-muted-foreground">
                  Connect your e-commerce platform, CRM, or analytics tools to Kolerr using our available 
                  integrations or API.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-pink text-white font-medium">
                2
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">UTM Parameters</h3>
                <p className="text-muted-foreground">
                  Implement unique tracking parameters for each creator and content piece to track 
                  traffic sources accurately.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-pink text-white font-medium">
                3
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">Promo Codes</h3>
                <p className="text-muted-foreground">
                  Generate unique discount codes for each creator to track direct sales attribution 
                  beyond click-through measurement.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-pink text-white font-medium">
                4
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">Conversion Events</h3>
                <p className="text-muted-foreground">
                  Define key conversion events (purchases, sign-ups, downloads) that will be tracked 
                  and attributed to creator content.
                </p>
              </div>
            </div>
          </div>
          
          <h2 className="text-2xl font-semibold mt-10 mb-4">Data-Driven Optimization</h2>
          <p>
            Here's how leading brands use Kolerr's analytics to optimize their influencer marketing strategy:
          </p>
          
          <ul className="space-y-4 my-6">
            <li className="pl-5 relative before:absolute before:top-2 before:left-0 before:w-3 before:h-3 before:bg-brand-pink before:rounded-full">
              <span className="font-medium">Creator Performance Benchmarking</span>
              <p className="text-sm text-muted-foreground mt-1">
                Compare metrics across creators to identify top performers and reallocate budget toward 
                highest-performing partnerships.
              </p>
            </li>
            
            <li className="pl-5 relative before:absolute before:top-2 before:left-0 before:w-3 before:h-3 before:bg-brand-pink before:rounded-full">
              <span className="font-medium">Content Format Testing</span>
              <p className="text-sm text-muted-foreground mt-1">
                Analyze which content formats (video, static posts, stories, etc.) drive the best results 
                for your specific campaign objectives.
              </p>
            </li>
            
            <li className="pl-5 relative before:absolute before:top-2 before:left-0 before:w-3 before:h-3 before:bg-brand-pink before:rounded-full">
              <span className="font-medium">Audience Insights</span>
              <p className="text-sm text-muted-foreground mt-1">
                Use demographic and engagement data to refine your target audience profile and improve 
                creator selection for future campaigns.
              </p>
            </li>
            
            <li className="pl-5 relative before:absolute before:top-2 before:left-0 before:w-3 before:h-3 before:bg-brand-pink before:rounded-full">
              <span className="font-medium">Budget Allocation Modeling</span>
              <p className="text-sm text-muted-foreground mt-1">
                Model different budget allocation scenarios to maximize ROI based on historical performance data.
              </p>
            </li>
          </ul>
          
          <div className="my-10 p-6 bg-black/10 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Next Steps</h3>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="flex-1">
                <Link to="/docs/guides/platform-overview">
                  Platform Overview
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

export default AnalyticsDashboardGuide;
