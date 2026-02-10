import { Link } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";
import { Button } from "@/components/ui/button";

const Footer = () => {
  const { language } = useLanguage();
  const content = {
    en: {
      company: "Querit Oy",
      copyright: "All rights reserved.",
      privacyLabel: "Privacy Statement",
      cookiesLabel: "Cookies",
    },
    fi: {
      company: "Querit Oy",
      copyright: "Kaikki oikeudet pidätetään.",
      privacyLabel: "Tietoturvaseloste",
      cookiesLabel: "Evästeet",
    },
  } as const;
  const t = content[language];
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 border-t border-border">
      <div className="section-container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-3">
            <img
              src="/querit-logo.svg"
              alt="Querit logo"
              className="h-10 w-10 md:h-12 md:w-12"
              loading="lazy"
            />
            <div className="flex flex-col items-center md:items-start gap-0">
              <span className="text-lg font-bold text-foreground">Querit Oy</span>
              <span className="text-sm font-semibold text-foreground">3594237-2</span>
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link to="/privacy">{t.privacyLabel}</Link>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link to="/cookies">{t.cookiesLabel}</Link>
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">
            © {currentYear} Querit. {t.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
