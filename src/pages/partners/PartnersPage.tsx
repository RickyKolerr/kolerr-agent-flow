
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const PartnersPage = () => {
  return (
    <div className="container mx-auto py-12">
      <Card>
        <CardHeader>
          <CardTitle>Our Partners</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="prose prose-gray max-w-none">
            <p className="text-lg text-muted-foreground">
              Join our growing network of partners and help shape the future of influencer marketing.
            </p>
            
            <h3 className="text-xl font-semibold mt-6">Technology Partners</h3>
            <p className="text-muted-foreground">
              We work with leading technology providers to deliver the best possible experience for our users.
            </p>

            <h3 className="text-xl font-semibold mt-6">Agency Partners</h3>
            <p className="text-muted-foreground">
              Partner with us to offer your clients access to our network of verified KOLs and influencers.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PartnersPage;
