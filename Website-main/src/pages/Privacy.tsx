import { useLanguage } from "@/context/LanguageContext";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Privacy = () => {
  const { language } = useLanguage();
  const content = {
    en: {
      title: "Privacy Statement",
      body: "We are preparing our privacy policy. For questions, contact info@querit.com.",
      back: "Back to Home",
    },
    fi: {
      title: "Tietosuojaseloste",
      body: "Valmistelemme tietosuojaselostetta. Kysymyksissä: info@querit.com.",
      back: "Takaisin etusivulle",
    },
  } as const;
  const t = content[language];

  return (
    <main className="min-h-screen bg-background">
      <div className="section-container py-16">
        <div className="max-w-3xl">
          <div className="flex items-center gap-3 mb-6">
            <img
              src="/querit-logo.svg"
              alt="Querit logo"
              className="h-10 w-10 md:h-12 md:w-12"
              loading="lazy"
            />
            <span className="text-3xl font-semibold text-foreground tracking-tight">Querit</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-semibold text-foreground mb-4">
            {t.title}
          </h1>
          <p className="text-muted-foreground leading-relaxed mb-8">{t.body}</p>
          <Button variant="outline" size="sm" asChild>
            <Link to="/">{t.back}</Link>
          </Button>
        </div>
      </div>
    </main>
  );
};

export default Privacy;
