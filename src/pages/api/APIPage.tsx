
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Copy, FileCode, CheckCircle, Code, AlertTriangle, Info } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState } from "react";

const APIPage = () => {
  const { t } = useLanguage();
  const [copiedEndpoint, setCopiedEndpoint] = useState<string | null>(null);
  
  const copyToClipboard = (text: string, endpoint: string) => {
    navigator.clipboard.writeText(text);
    setCopiedEndpoint(endpoint);
    setTimeout(() => setCopiedEndpoint(null), 2000);
  };
  
  const apiEndpoints = [
    {
      id: "creators",
      name: "Creators",
      description: "Access and filter the creator database",
      methods: [
        {
          method: "GET",
          endpoint: "/api/v1/creators",
          description: "List creators with optional filtering parameters",
          parameters: [
            { name: "page", type: "integer", required: false, description: "Page number for pagination" },
            { name: "limit", type: "integer", required: false, description: "Number of results per page" },
            { name: "niche", type: "string", required: false, description: "Filter by content niche" },
            { name: "followers_min", type: "integer", required: false, description: "Minimum follower count" },
            { name: "followers_max", type: "integer", required: false, description: "Maximum follower count" },
            { name: "engagement_min", type: "float", required: false, description: "Minimum engagement rate" }
          ],
          response: `{
  "data": [
    {
      "id": "crt_12345",
      "name": "Alex Johnson",
      "username": "alexcreates",
      "niche": "Fitness",
      "followers": 125000,
      "engagement_rate": 3.2,
      "platforms": ["instagram", "tiktok"]
    },
    // More creators...
  ],
  "meta": {
    "total": 1250,
    "page": 1,
    "limit": 10
  }
}`
        },
        {
          method: "GET",
          endpoint: "/api/v1/creators/{id}",
          description: "Get detailed information about a specific creator",
          parameters: [
            { name: "id", type: "string", required: true, description: "Creator unique identifier" }
          ],
          response: `{
  "id": "crt_12345",
  "name": "Alex Johnson",
  "username": "alexcreates",
  "bio": "Fitness coach and lifestyle content creator",
  "niche": "Fitness",
  "followers": 125000,
  "engagement_rate": 3.2,
  "platforms": [
    {
      "name": "instagram",
      "url": "https://instagram.com/alexcreates",
      "followers": 85000
    },
    {
      "name": "tiktok",
      "url": "https://tiktok.com/@alexcreates",
      "followers": 40000
    }
  ],
  "demographics": {
    "age_ranges": [
      {"range": "18-24", "percentage": 45},
      {"range": "25-34", "percentage": 32}
    ],
    "gender": [
      {"type": "female", "percentage": 65},
      {"type": "male", "percentage": 35}
    ],
    "top_locations": [
      {"country": "United States", "percentage": 72},
      {"country": "Canada", "percentage": 12}
    ]
  },
  "content_categories": ["workout", "nutrition", "lifestyle"],
  "avg_likes": 4200,
  "avg_comments": 320
}`
        }
      ]
    },
    {
      id: "campaigns",
      name: "Campaigns",
      description: "Manage influencer marketing campaigns",
      methods: [
        {
          method: "POST",
          endpoint: "/api/v1/campaigns",
          description: "Create a new campaign",
          parameters: [
            { name: "name", type: "string", required: true, description: "Campaign name" },
            { name: "budget", type: "number", required: true, description: "Campaign budget" },
            { name: "start_date", type: "string", required: true, description: "Campaign start date (YYYY-MM-DD)" },
            { name: "end_date", type: "string", required: true, description: "Campaign end date (YYYY-MM-DD)" },
            { name: "brief", type: "string", required: true, description: "Campaign brief" },
            { name: "goals", type: "array", required: true, description: "Campaign goals and KPIs" }
          ],
          request: `{
  "name": "Summer Product Launch",
  "budget": 50000,
  "start_date": "2025-06-01",
  "end_date": "2025-06-30",
  "brief": "Promote our new summer collection with lifestyle content",
  "goals": ["brand_awareness", "engagement", "sales"],
  "target_audience": {
    "age_range": ["18-24", "25-34"],
    "interests": ["fashion", "lifestyle", "travel"],
    "locations": ["US", "CA", "UK"]
  }
}`,
          response: `{
  "id": "camp_78910",
  "name": "Summer Product Launch",
  "status": "draft",
  "created_at": "2025-05-01T14:30:00Z",
  "budget": 50000,
  "start_date": "2025-06-01",
  "end_date": "2025-06-30",
  "brief": "Promote our new summer collection with lifestyle content",
  "goals": ["brand_awareness", "engagement", "sales"]
}`
        }
      ]
    },
    {
      id: "analytics",
      name: "Analytics",
      description: "Access campaign performance data",
      methods: [
        {
          method: "GET",
          endpoint: "/api/v1/analytics/campaigns/{id}",
          description: "Get performance metrics for a specific campaign",
          parameters: [
            { name: "id", type: "string", required: true, description: "Campaign unique identifier" },
            { name: "period", type: "string", required: false, description: "Time period (daily, weekly, monthly)" }
          ],
          response: `{
  "campaign_id": "camp_78910",
  "name": "Summer Product Launch",
  "metrics": {
    "impressions": 1250000,
    "reach": 950000,
    "engagement": 85000,
    "engagement_rate": 8.95,
    "clicks": 32500,
    "ctr": 2.6,
    "conversions": 1850,
    "roi": 2.4
  },
  "creators": [
    {
      "id": "crt_12345",
      "name": "Alex Johnson",
      "metrics": {
        "impressions": 320000,
        "engagement": 24000,
        "engagement_rate": 7.5
      }
    }
  ],
  "performance_by_day": [
    {
      "date": "2025-06-01",
      "impressions": 42000,
      "engagement": 3600
    }
    // More days...
  ]
}`
        }
      ]
    }
  ];

  return (
    <div className="container mx-auto py-12">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 rounded-lg bg-brand-pink/10">
            <FileCode className="h-6 w-6 text-brand-pink" />
          </div>
          <h1 className="text-3xl font-bold">API Documentation</h1>
        </div>
        
        <div className="mb-12">
          <Card>
            <CardContent className="pt-6">
              <div className="prose prose-gray max-w-none">
                <h2 className="text-2xl font-semibold mb-4">Overview</h2>
                <p className="text-muted-foreground">
                  The Kolerr API allows you to programmatically access creator data, manage campaigns, and retrieve analytics. 
                  This RESTful API uses standard HTTP response codes and returns data in JSON format.
                </p>
                
                <div className="bg-brand-pink/5 border border-brand-pink/20 rounded-lg p-4 mt-6 flex gap-4 items-start">
                  <Info className="h-5 w-5 text-brand-pink mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-lg">Base URL</h3>
                    <p className="text-sm text-muted-foreground">All API requests should be made to:</p>
                    <code className="bg-black/20 p-2 rounded block mt-2">https://api.kolerr.ai/v1</code>
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold mt-8 mb-4">Authentication</h3>
                <p className="text-muted-foreground mb-4">
                  All API endpoints require authentication using API keys. You can generate and manage your API keys in the 
                  <a href="/dashboard/settings" className="text-brand-pink hover:text-brand-pink/80"> dashboard settings</a>.
                </p>
                
                <div className="bg-black/20 p-4 rounded-md font-mono text-sm overflow-x-auto whitespace-nowrap">
                  <span className="text-gray-400">Authorization:</span> Bearer YOUR_API_KEY
                </div>
                
                <h3 className="text-xl font-semibold mt-8 mb-4">Rate Limiting</h3>
                <p className="text-muted-foreground">
                  The API is rate-limited to ensure fair usage. Standard accounts are limited to 100 requests per minute.
                  Enterprise plans have higher limits. Rate limit information is included in the response headers.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  <div className="bg-black/20 p-4 rounded-md">
                    <h4 className="font-medium mb-2">Response Headers</h4>
                    <div className="text-xs">
                      <div className="grid grid-cols-2 gap-2">
                        <div className="text-gray-400">X-RateLimit-Limit:</div>
                        <div>100</div>
                        <div className="text-gray-400">X-RateLimit-Remaining:</div>
                        <div>99</div>
                        <div className="text-gray-400">X-RateLimit-Reset:</div>
                        <div>1619683200</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-black/20 p-4 rounded-md flex gap-3 items-start">
                    <AlertTriangle className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium mb-1">Rate Limit Exceeded</h4>
                      <p className="text-xs text-muted-foreground">
                        If you exceed the rate limit, you'll receive a 429 Too Many Requests response.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">API Reference</h2>
          
          <Tabs defaultValue={apiEndpoints[0].id} className="w-full">
            <TabsList className="mb-8">
              {apiEndpoints.map(endpoint => (
                <TabsTrigger key={endpoint.id} value={endpoint.id}>
                  {endpoint.name}
                </TabsTrigger>
              ))}
            </TabsList>
            
            {apiEndpoints.map(endpoint => (
              <TabsContent key={endpoint.id} value={endpoint.id}>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Code className="h-5 w-5 text-brand-pink" />
                      {endpoint.name}
                    </CardTitle>
                    <CardDescription>
                      {endpoint.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-8">
                      {endpoint.methods.map((method, methodIndex) => (
                        <div key={methodIndex} className="border border-muted rounded-md overflow-hidden">
                          <div className="bg-black/20 p-4 flex justify-between items-center">
                            <div className="flex items-center gap-3">
                              <Badge variant={method.method === "GET" ? "outline" : "default"} className={method.method === "GET" ? "bg-blue-500/20 text-blue-300 hover:bg-blue-500/20" : ""}>
                                {method.method}
                              </Badge>
                              <code className="text-sm">{method.endpoint}</code>
                            </div>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-8 text-xs"
                              onClick={() => copyToClipboard(`https://api.kolerr.ai/v1${method.endpoint}`, method.endpoint)}
                            >
                              {copiedEndpoint === method.endpoint ? (
                                <CheckCircle className="h-3.5 w-3.5 mr-1" />
                              ) : (
                                <Copy className="h-3.5 w-3.5 mr-1" />
                              )}
                              {copiedEndpoint === method.endpoint ? "Copied" : "Copy"}
                            </Button>
                          </div>
                          
                          <div className="p-4">
                            <p className="text-muted-foreground mb-4">{method.description}</p>
                            
                            {method.parameters.length > 0 && (
                              <div className="mb-6">
                                <h4 className="font-medium mb-2">Parameters</h4>
                                <div className="overflow-x-auto">
                                  <table className="min-w-full divide-y divide-border text-sm">
                                    <thead>
                                      <tr>
                                        <th className="px-4 py-2 text-left font-medium">Name</th>
                                        <th className="px-4 py-2 text-left font-medium">Type</th>
                                        <th className="px-4 py-2 text-left font-medium">Required</th>
                                        <th className="px-4 py-2 text-left font-medium">Description</th>
                                      </tr>
                                    </thead>
                                    <tbody className="divide-y divide-border">
                                      {method.parameters.map((param, paramIndex) => (
                                        <tr key={paramIndex}>
                                          <td className="px-4 py-2 font-mono text-xs">{param.name}</td>
                                          <td className="px-4 py-2 font-mono text-xs">{param.type}</td>
                                          <td className="px-4 py-2">
                                            {param.required ? (
                                              <Badge variant="outline" className="bg-brand-pink/20 text-brand-pink hover:bg-brand-pink/20">
                                                Required
                                              </Badge>
                                            ) : (
                                              <Badge variant="outline" className="bg-black/20 hover:bg-black/20">
                                                Optional
                                              </Badge>
                                            )}
                                          </td>
                                          <td className="px-4 py-2 text-xs text-muted-foreground">{param.description}</td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            )}
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {method.request && (
                                <div>
                                  <h4 className="font-medium mb-2">Request Body</h4>
                                  <div className="bg-black/20 p-3 rounded-md overflow-x-auto">
                                    <pre className="text-xs whitespace-pre font-mono">{method.request}</pre>
                                  </div>
                                </div>
                              )}
                              
                              <div className={method.request ? "" : "md:col-span-2"}>
                                <h4 className="font-medium mb-2">Response</h4>
                                <div className="bg-black/20 p-3 rounded-md overflow-x-auto">
                                  <pre className="text-xs whitespace-pre font-mono">{method.response}</pre>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </div>
        
        <div className="mt-12">
          <Card>
            <CardHeader>
              <CardTitle>SDKs & Libraries</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-6">
                We provide official client libraries to help you integrate with the Kolerr API more easily.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <Card className="border border-brand-pink/20 bg-brand-pink/5">
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <h3 className="font-semibold mb-1">JavaScript</h3>
                      <p className="text-xs text-muted-foreground mb-3">For Node.js and browser applications</p>
                      <code className="bg-black/20 px-2 py-1 rounded text-xs">npm install kolerr-js</code>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <h3 className="font-semibold mb-1">Python</h3>
                      <p className="text-xs text-muted-foreground mb-3">For Python applications</p>
                      <code className="bg-black/20 px-2 py-1 rounded text-xs">pip install kolerr</code>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <h3 className="font-semibold mb-1">Ruby</h3>
                      <p className="text-xs text-muted-foreground mb-3">For Ruby applications</p>
                      <code className="bg-black/20 px-2 py-1 rounded text-xs">gem install kolerr</code>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="mt-12 text-center">
          <h2 className="text-2xl font-bold mb-4">Need Help?</h2>
          <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
            If you have any questions or need support with the API, our developer team is here to help.
          </p>
          <div className="flex justify-center gap-4">
            <Button>Contact API Support</Button>
            <Button variant="outline">View GitHub Repo</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default APIPage;
