
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const PartnersPage = () => {
  const partnerTypes = [
    {
      title: "Technology Partners",
      description: "We work with leading technology providers to deliver the best possible experience for our users.",
      benefits: [
        "API integration support",
        "Co-marketing opportunities",
        "Joint product development",
        "Technical documentation",
        "Dedicated partner support"
      ]
    },
    {
      title: "Agency Partners",
      description: "Partner with us to offer your clients access to our network of verified KOLs and influencers.",
      benefits: [
        "Revenue sharing model",
        "White-label solutions",
        "Training resources",
        "Priority support",
        "Campaign management tools"
      ]
    }
  ];

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Partner with Kolerr</h1>
          <p className="text-xl text-muted-foreground">
            Join our growing network of partners and help shape the future of influencer marketing
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {partnerTypes.map((type, index) => (
            <Card key={index} className="flex flex-col">
              <CardHeader>
                <CardTitle className="text-2xl mb-4">{type.title}</CardTitle>
                <p className="text-muted-foreground mb-6">
                  {type.description}
                </p>
              </CardHeader>
              <CardContent className="flex-1">
                <h3 className="font-semibold mb-4">Partner Benefits:</h3>
                <ul className="space-y-3 mb-6">
                  {type.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start">
                      <span className="text-brand-pink mr-2">•</span>
                      <span className="text-muted-foreground">{benefit}</span>
                    </li>
                  ))}
                </ul>
                <Button className="w-full mt-4">
                  Become a {type.title.split(" ")[0]} Partner
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="mt-12">
          <CardContent className="pt-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">Ready to Partner?</h2>
              <p className="text-muted-foreground mb-6">
                Get in touch with our partnership team to discuss collaboration opportunities
              </p>
              <Button size="lg" className="bg-brand-pink hover:bg-brand-pink/90">
                Contact Partnership Team
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PartnersPage;
