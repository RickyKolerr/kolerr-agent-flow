import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Rss } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/contexts/LanguageContext";

const BlogPage = () => {
  const { t } = useLanguage();
  
  // Sample blog posts data
  const featuredPost = {
    title: "How AI is Revolutionizing Influencer Marketing in 2025",
    excerpt: "Discover how artificial intelligence is transforming creator discovery, campaign management, and ROI tracking for brands.",
    image: "/lovable-uploads/24be9cce-35ba-4568-9efb-436abe513e26.png",
    date: "April 28, 2025",
    readTime: "6 min read",
    author: {
      name: "Sarah Johnson",
      role: "Head of Marketing",
      avatar: "/lovable-uploads/92eead47-3854-4a2d-a9ca-5b60716aaec4.png"
    },
    tags: ["AI", "Marketing", "Technology"]
  };
  
  const recentPosts = [
    {
      title: "5 Ways to Improve Your Creator Collaboration Strategy",
      excerpt: "Effective partnerships start with clear communication and aligned goals. Learn our proven approach.",
      image: "/lovable-uploads/7532d8a9-3b4e-447b-a5b9-b44a86b7dfbf.png",
      date: "April 22, 2025",
      readTime: "4 min read",
      author: {
        name: "Michael Chen",
        role: "Creator Success Manager",
        avatar: "/lovable-uploads/92eead47-3854-4a2d-a9ca-5b60716aaec4.png"
      },
      category: "Strategy"
    },
    {
      title: "The Rise of Micro-Influencers: Quality Over Quantity",
      excerpt: "Why brands are shifting budgets toward creators with smaller but more engaged audiences.",
      image: "/lovable-uploads/d4572dc9-629c-46f5-9256-41590c40e030.png",
      date: "April 15, 2025",
      readTime: "5 min read",
      author: {
        name: "Jessica Rivera",
        role: "Data Analyst",
        avatar: "/lovable-uploads/92eead47-3854-4a2d-a9ca-5b60716aaec4.png"
      },
      category: "Trends"
    },
    {
      title: "Measuring Campaign ROI: Beyond Likes and Comments",
      excerpt: "How to establish meaningful KPIs that align with your business objectives and track real results.",
      image: "/lovable-uploads/d4572dc9-629c-46f5-9256-41590c40e030.png",
      date: "April 8, 2025",
      readTime: "7 min read",
      author: {
        name: "David Park",
        role: "Analytics Lead",
        avatar: "/lovable-uploads/92eead47-3854-4a2d-a9ca-5b60716aaec4.png"
      },
      category: "Analytics"
    }
  ];
  
  const categories = [
    "All",
    "Strategy",
    "Analytics",
    "Trends",
    "Case Studies",
    "Platform Updates"
  ];

  return (
    <div className="container mx-auto py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Rss className="h-5 w-5 text-brand-pink" />
              <h1 className="text-3xl font-bold">Kolerr Blog</h1>
            </div>
            <p className="text-muted-foreground">
              Insights, trends, and best practices in influencer marketing
            </p>
          </div>
          
          <div className="w-full md:w-auto">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search articles..."
                className="pl-9 md:w-64"
              />
            </div>
          </div>
        </div>
        
        {/* Featured Article */}
        <div className="mb-12">
          <Card className="overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2">
                <img 
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  className="h-full w-full object-cover aspect-video md:aspect-auto"
                />
              </div>
              <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="bg-brand-pink text-white text-xs font-medium px-2.5 py-0.5 rounded">Featured</span>
                    <span className="text-xs text-muted-foreground">{featuredPost.date} · {featuredPost.readTime}</span>
                  </div>
                  
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">
                    {featuredPost.title}
                  </h2>
                  
                  <p className="text-muted-foreground mb-6">
                    {featuredPost.excerpt}
                  </p>
                  
                  <div className="space-x-2 mb-6">
                    {featuredPost.tags.map((tag, index) => (
                      <span key={index} className="inline-block bg-black/20 text-xs px-2.5 py-1 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={featuredPost.author.avatar} />
                      <AvatarFallback>{featuredPost.author.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{featuredPost.author.name}</p>
                      <p className="text-xs text-muted-foreground">{featuredPost.author.role}</p>
                    </div>
                  </div>
                  
                  <Button size="sm">Read More</Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
        
        {/* Categories */}
        <div className="mb-8">
          <Tabs defaultValue="All">
            <TabsList className="mb-8 flex flex-wrap h-auto">
              {categories.map((category, index) => (
                <TabsTrigger key={index} value={category} className="mb-2">
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
            
            <TabsContent value="All" className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentPosts.map((post, index) => (
                <Card key={index} className="overflow-hidden flex flex-col h-full hover-scale">
                  <div className="aspect-video relative">
                    <img 
                      src={post.image}
                      alt={post.title}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute top-2 right-2">
                      <span className="bg-black/60 backdrop-blur-sm text-white text-xs px-2 py-1 rounded">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  
                  <CardHeader className="pb-2">
                    <div className="text-xs text-muted-foreground mb-2">
                      {post.date} · {post.readTime}
                    </div>
                    <h3 className="text-lg font-bold line-clamp-2">{post.title}</h3>
                  </CardHeader>
                  
                  <CardContent className="pb-4">
                    <p className="text-muted-foreground text-sm line-clamp-3">
                      {post.excerpt}
                    </p>
                  </CardContent>
                  
                  <CardFooter className="pt-2 mt-auto border-t border-border">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={post.author.avatar} />
                        <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span className="text-xs">{post.author.name}</span>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </TabsContent>
            
            {/* Other tabs would have similar structure but filtered content */}
            {categories.slice(1).map((category) => (
              <TabsContent key={category} value={category}>
                <div className="text-center py-12">
                  <h3 className="text-xl mb-2">Showing articles in {category}</h3>
                  <p className="text-muted-foreground">This is a placeholder for filtered content</p>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
        
        {/* Newsletter subscription */}
        <div className="mt-16 bg-brand-pink/5 border border-brand-pink/20 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-2">Subscribe to our newsletter</h2>
          <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
            Get the latest industry insights and Kolerr updates delivered straight to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input placeholder="Enter your email address" className="h-12" />
            <Button className="shrink-0">Subscribe</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
