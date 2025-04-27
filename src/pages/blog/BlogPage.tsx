
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText } from "lucide-react";

const BlogPage = () => {
  const posts = [
    {
      title: "Maximizing ROI with AI-Powered Influencer Selection",
      date: "April 25, 2025",
      readTime: "5 min read",
      preview: "Learn how our AI algorithms help brands find the perfect KOLs for their campaigns.",
      category: "AI & Analytics"
    },
    {
      title: "The Future of Creator Marketing: 2025 Trends",
      date: "April 23, 2025",
      readTime: "7 min read",
      preview: "Discover the emerging trends shaping the future of influencer collaborations.",
      category: "Industry Insights"
    },
    {
      title: "Case Study: How Brand X Achieved 300% ROI",
      date: "April 20, 2025",
      readTime: "6 min read",
      preview: "A detailed analysis of a successful campaign using Kolerr's platform.",
      category: "Case Studies"
    }
  ];

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Kolerr Blog</h1>
          <p className="text-xl text-muted-foreground">
            Insights, trends, and success stories from the world of influencer marketing
          </p>
        </div>

        <div className="grid gap-6">
          {posts.map((post, index) => (
            <Card key={index} className="hover:border-brand-pink/50 transition-colors">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <span className="text-sm text-brand-pink">{post.category}</span>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <FileText className="w-4 h-4 mr-2" />
                    {post.readTime}
                  </div>
                </div>
                <CardTitle className="text-2xl mb-2">{post.title}</CardTitle>
                <p className="text-muted-foreground">{post.preview}</p>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">{post.date}</span>
                  <button className="text-brand-pink hover:text-brand-pink/80 text-sm font-medium">
                    Read more →
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
