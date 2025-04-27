
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AboutPage = () => {
  return (
    <div className="container mx-auto py-12">
      <Card>
        <CardHeader>
          <CardTitle>About Kolerr</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="prose prose-gray max-w-none">
            <p className="text-lg text-muted-foreground">
              Kolerr is a leading platform connecting brands with key opinion leaders (KOLs) 
              to create impactful marketing campaigns.
            </p>
            
            <h3 className="text-xl font-semibold mt-6">Our Mission</h3>
            <p className="text-muted-foreground">
              To revolutionize influencer marketing by providing transparent, efficient, 
              and measurable collaboration opportunities between brands and KOLs.
            </p>

            <h3 className="text-xl font-semibold mt-6">Our Vision</h3>
            <p className="text-muted-foreground">
              To become the global standard for influencer marketing, enabling authentic 
              connections between brands and their audiences through trusted KOLs.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AboutPage;
