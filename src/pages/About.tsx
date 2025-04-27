import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
const AboutPage = () => {
  const stats = [{
    number: "50K+",
    label: "Active Creators"
  }, {
    number: "1M+",
    label: "Campaigns Completed"
  }, {
    number: "95%",
    label: "Client Satisfaction"
  }, {
    number: "150+",
    label: "Countries Reached"
  }];
  return <div className="container mx-auto py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">About Kolerr</h1>
          <p className="text-xl text-muted-foreground">
            Revolutionizing influencer marketing through AI and automation
          </p>
        </div>

        <Card className="mb-12">
          <CardContent className="pt-6">
            <div className="prose prose-gray max-w-none">
              <p className="text-lg leading-relaxed mb-6">Founded in 2025, Kolerr has quickly become the leading platform connecting brands with key opinion leaders (KOLs) to create impactful marketing campaigns. Our AI-powered platform simplifies the entire influencer marketing process, from discovery to execution and analysis.</p>
              
              <div className="grid md:grid-cols-2 gap-8 my-12">
                <div>
                  <h3 className="text-2xl font-semibold mb-4">Our Mission</h3>
                  <p className="text-muted-foreground">
                    To revolutionize influencer marketing by providing transparent, efficient, 
                    and measurable collaboration opportunities between brands and KOLs. We're 
                    committed to creating authentic connections that drive real results.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-2xl font-semibold mb-4">Our Vision</h3>
                  <p className="text-muted-foreground">
                    To become the global standard for influencer marketing, enabling authentic 
                    connections between brands and their audiences through trusted KOLs, powered 
                    by cutting-edge AI technology.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
                {stats.map((stat, index) => <div key={index} className="text-center">
                    <div className="text-3xl font-bold text-brand-pink mb-2">
                      {stat.number}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {stat.label}
                    </div>
                  </div>)}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>;
};
export default AboutPage;