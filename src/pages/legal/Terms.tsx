
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const TermsPage = () => {
  return (
    <div className="container mx-auto py-12">
      <Card>
        <CardHeader>
          <CardTitle>Terms of Service</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="prose prose-gray max-w-none">
            <p className="text-muted-foreground">
              By accessing and using Kolerr's services, you agree to comply with and be bound by these Terms of Service.
            </p>
            
            <h3 className="text-xl font-semibold mt-6">1. Account Terms</h3>
            <p className="text-muted-foreground">
              You must create an account to access Kolerr's services. You are responsible for maintaining 
              the security of your account and any activities that occur under your account.
            </p>

            <h3 className="text-xl font-semibold mt-6">2. Service Terms</h3>
            <p className="text-muted-foreground">
              Our services are provided "as is". We reserve the right to modify or discontinue any 
              service at any time, with or without notice.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TermsPage;
