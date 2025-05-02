
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download, Link, Mail } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const PressPage = () => {
  const { t } = useLanguage();
  
  // Sample press releases
  const pressReleases = [
    {
      title: "Kolerr Secures $12M Series A Funding",
      date: "April 17, 2025",
      excerpt: "Funding will accelerate platform development and global expansion of our influencer marketing solution.",
      link: "#"
    },
    {
      title: "New AI-Powered Creator Matching Algorithm Launches",
      date: "March 8, 2025",
      excerpt: "Our new algorithm improves brand-creator matching accuracy by 78%, delivering better ROI for campaigns.",
      link: "#"
    },
    {
      title: "Kolerr Partners with Major Social Media Platform",
      date: "February 22, 2025",
      excerpt: "Strategic partnership provides brands with exclusive creator insights and promotional opportunities.",
      link: "#"
    }
  ];

  return (
    <div className="container mx-auto py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">{t('company.press.title')}</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('company.press.description')}
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-6 mb-12">
          <Card className="flex-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-brand-pink" />
                {t('company.press.mediaKit')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                {t('company.press.mediaKitDesc')}
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                <Download className="mr-2 h-4 w-4" />
                {t('company.press.download')}
              </Button>
            </CardFooter>
          </Card>
          
          <Card className="flex-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Link className="h-5 w-5 text-brand-pink" />
                {t('company.press.brandAssets')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                {t('company.press.brandAssetsDesc')}
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                <Download className="mr-2 h-4 w-4" />
                {t('company.press.downloadAssets')}
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        <h2 className="text-2xl font-bold mb-6">{t('company.press.recentReleases')}</h2>
        
        <div className="space-y-6 mb-12">
          {pressReleases.map((release, index) => (
            <Card key={index} className="hover-scale">
              <CardHeader>
                <CardDescription>{release.date}</CardDescription>
                <CardTitle>{release.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{release.excerpt}</p>
              </CardContent>
              <CardFooter>
                <Button variant="default" size="sm" asChild>
                  <a href={release.link}>{t('company.press.readFull')}</a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <Card className="border-brand-pink/20 bg-brand-pink/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-brand-pink" />
              {t('company.press.contact')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              {t('company.press.contactDesc')}
            </p>
            <p className="font-medium">
              {t('company.press.email')}: <a href="mailto:press@kolerr.ai" className="text-brand-pink hover:underline">press@kolerr.ai</a>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PressPage;
