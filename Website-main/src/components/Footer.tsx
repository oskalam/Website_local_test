import { Link } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";

const Footer = () => {
  const { language } = useLanguage();
  const content = {
    en: {
      company: "Querit Oy",
      copyright: "All rights reserved.",
      privacyLabel: "Privacy Statement",
      cookiesLabel: "Cookies",
      cookiesManageLabel: "Cookie settings",
    },
    fi: {
      company: "Querit Oy",
      copyright: "Kaikki oikeudet pidätetään.",
      privacyLabel: "Tietoturvaseloste",
      cookiesLabel: "Evästeet",
      cookiesManageLabel: "Evästeasetukset",
    },
  } as const;
  const t = content[language];
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 border-t border-border">
      <div className="section-container">
        <div className="flex flex-col items-center gap-4">
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
          <div className="flex flex-col items-center gap-2">
            <p className="text-sm text-muted-foreground">
              © {currentYear} Querit. {t.copyright}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 text-sm text-muted-foreground">
              <Link to="/privacy" className="hover:text-foreground transition-colors">
                {t.privacyLabel}
              </Link>
              <span className="text-muted-foreground/50">•</span>
              <Link to="/cookies" className="hover:text-foreground transition-colors">
                {t.cookiesLabel}
              </Link>
              <span className="text-muted-foreground/50">•</span>
              <button
                type="button"
                onClick={() => window.dispatchEvent(new Event("cookie-settings-open"))}
                className="hover:text-foreground transition-colors"
              >
                {t.cookiesManageLabel}
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
