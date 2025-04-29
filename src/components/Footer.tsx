
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

export const Footer = () => {
  const { t } = useLanguage();
  
  return (
    <footer className="border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-semibold mb-4">{t('footer.product')}</h3>
            <ul className="space-y-2">
              <li><Link to="/features" className="text-muted-foreground hover:text-foreground">{t('footer.features')}</Link></li>
              <li><Link to="/pricing" className="text-muted-foreground hover:text-foreground">{t('footer.pricing')}</Link></li>
              <li><Link to="/about" className="text-muted-foreground hover:text-foreground">{t('footer.about')}</Link></li>
              <li><Link to="/partners" className="text-muted-foreground hover:text-foreground">Partners</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">{t('footer.resources')}</h3>
            <ul className="space-y-2">
              <li><Link to="/docs" className="text-muted-foreground hover:text-foreground">{t('footer.documentation')}</Link></li>
              <li><Link to="/api" className="text-muted-foreground hover:text-foreground">API</Link></li>
              <li><Link to="/blog" className="text-muted-foreground hover:text-foreground">{t('footer.blog')}</Link></li>
              <li><Link to="/help" className="text-muted-foreground hover:text-foreground">{t('footer.help')}</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">{t('footer.legal')}</h3>
            <ul className="space-y-2">
              <li><Link to="/privacy" className="text-muted-foreground hover:text-foreground">{t('footer.privacy')}</Link></li>
              <li><Link to="/terms" className="text-muted-foreground hover:text-foreground">{t('footer.terms')}</Link></li>
              <li><Link to="/security" className="text-muted-foreground hover:text-foreground">{t('footer.security')}</Link></li>
              <li><Link to="/compliance" className="text-muted-foreground hover:text-foreground">Compliance</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link to="/contact" className="text-muted-foreground hover:text-foreground">Contact</Link></li>
              <li><Link to="/careers" className="text-muted-foreground hover:text-foreground">Careers</Link></li>
              <li><Link to="/press" className="text-muted-foreground hover:text-foreground">Press</Link></li>
              <li><Link to="/sustainability" className="text-muted-foreground hover:text-foreground">Sustainability</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>{t('footer.copyright')}</p>
        </div>
      </div>
    </footer>
  );
};
