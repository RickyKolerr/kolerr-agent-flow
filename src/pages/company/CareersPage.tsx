
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, MapPin, Heart } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const CareersPage = () => {
  const { t } = useLanguage();
  
  // Sample job listings
  const jobs = [
    {
      title: "Senior Frontend Developer",
      location: "Remote",
      department: "Engineering",
      description: "Join our team to build cutting-edge UI components for our influencer marketing platform."
    },
    {
      title: "Product Manager",
      location: "Ho Chi Minh City",
      department: "Product",
      description: "Lead the vision and roadmap for our creator analytics tools."
    },
    {
      title: "Marketing Specialist",
      location: "Singapore",
      department: "Marketing",
      description: "Drive growth strategies and campaigns for our platform in the APAC region."
    }
  ];

  return (
    <div className="container mx-auto py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">{t('company.careers.title')}</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('company.careers.description')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="text-center p-6">
            <CardHeader className="pb-2">
              <div className="mx-auto bg-brand-pink/10 p-3 rounded-full mb-4">
                <Briefcase className="h-6 w-6 text-brand-pink" />
              </div>
              <CardTitle>{t('company.careers.innovative')}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                {t('company.careers.innovativeDesc')}
              </p>
            </CardContent>
          </Card>
          
          <Card className="text-center p-6">
            <CardHeader className="pb-2">
              <div className="mx-auto bg-brand-pink/10 p-3 rounded-full mb-4">
                <MapPin className="h-6 w-6 text-brand-pink" />
              </div>
              <CardTitle>{t('company.careers.flexible')}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                {t('company.careers.flexibleDesc')}
              </p>
            </CardContent>
          </Card>
          
          <Card className="text-center p-6">
            <CardHeader className="pb-2">
              <div className="mx-auto bg-brand-pink/10 p-3 rounded-full mb-4">
                <Heart className="h-6 w-6 text-brand-pink" />
              </div>
              <CardTitle>{t('company.careers.supportive')}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                {t('company.careers.supportiveDesc')}
              </p>
            </CardContent>
          </Card>
        </div>
        
        <h2 className="text-2xl font-bold mb-6">{t('company.careers.openPositions')}</h2>
        
        <div className="space-y-4">
          {jobs.map((job, index) => (
            <Card key={index} className="hover-scale">
              <CardHeader>
                <CardTitle>{job.title}</CardTitle>
                <CardDescription className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>{job.location}</span>
                  <span className="mx-2">•</span>
                  <span>{job.department}</span>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{job.description}</p>
              </CardContent>
              <CardFooter>
                <Button variant="default" size="sm">
                  {t('company.careers.apply')}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <h3 className="text-xl font-semibold mb-4">{t('company.careers.noPositions')}</h3>
          <p className="text-muted-foreground mb-6">
            {t('company.careers.speculative')}
          </p>
          <Button variant="outline" className="mx-auto">
            {t('company.careers.sendCV')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CareersPage;
