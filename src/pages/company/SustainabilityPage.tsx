
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Leaf, Globe, Users } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const SustainabilityPage = () => {
  const { t } = useLanguage();
  
  const initiatives = [
    {
      icon: Leaf,
      title: t('company.sustainability.environmental.title'),
      description: t('company.sustainability.environmental.description'),
      goals: [
        t('company.sustainability.environmental.goal1'),
        t('company.sustainability.environmental.goal2'),
        t('company.sustainability.environmental.goal3')
      ]
    },
    {
      icon: Users,
      title: t('company.sustainability.social.title'),
      description: t('company.sustainability.social.description'),
      goals: [
        t('company.sustainability.social.goal1'),
        t('company.sustainability.social.goal2'),
        t('company.sustainability.social.goal3')
      ]
    },
    {
      icon: Globe,
      title: t('company.sustainability.governance.title'),
      description: t('company.sustainability.governance.description'),
      goals: [
        t('company.sustainability.governance.goal1'),
        t('company.sustainability.governance.goal2'),
        t('company.sustainability.governance.goal3')
      ]
    }
  ];

  return (
    <div className="container mx-auto py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">{t('company.sustainability.title')}</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('company.sustainability.description')}
          </p>
        </div>
        
        <div className="mb-12">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="bg-brand-pink/10 p-6 rounded-full">
                  <Leaf className="h-12 w-12 text-brand-pink" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-4">{t('company.sustainability.commitment')}</h2>
                  <p className="text-muted-foreground">
                    {t('company.sustainability.commitmentDesc1')}
                  </p>
                  <p className="text-muted-foreground mt-4">
                    {t('company.sustainability.commitmentDesc2')}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-8">
          {initiatives.map((initiative, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-brand-pink/10">
                    <initiative.icon className="h-5 w-5 text-brand-pink" />
                  </div>
                  <CardTitle>{initiative.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{initiative.description}</p>
                <ul className="space-y-2">
                  {initiative.goals.map((goal, goalIndex) => (
                    <li key={goalIndex} className="flex items-start">
                      <div className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-brand-pink flex-shrink-0" />
                      <span className="text-muted-foreground">{goal}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-muted-foreground">
            {t('company.sustainability.progress')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SustainabilityPage;
