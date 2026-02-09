import { FolderOpen } from "lucide-react";
import React from "react";
import Carousel from "./Carousel";
import { useLanguage } from "@/context/LanguageContext";

const ReferencesSection = () => {
  const { language } = useLanguage();
  const content = {
    en: {
      title: "Our Work",
      description1: "We're in the progress of building our public reference portfolio. Our concept library can be found below.",
      description2: "Selected project examples and references available upon request.",
    },
    fi: {
      title: "Työmme",
      description1: "Rakennamme julkista referenssiportfoliotamme. Konseptiksi rakentamamme kirjasto löytyy alta.",
      description2: "Valitut projektit ja referenssit saatavilla pyynnistä.",
    },
  } as const;
  const t = content[language];
  return (
    <section id="references" className="section-padding">
      <div className="section-container">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-16 h-16 rounded-2xl bg-accent/50 border border-border flex items-center justify-center mx-auto mb-6">
            <FolderOpen className="w-7 h-7 text-primary" />
          </div>
          <h2 className="text-3xl md:text-4xl font-semibold text-foreground tracking-tight mb-6">
            {t.title}
          </h2>
          <div className="space-y-4 text-muted-foreground">
            <p className="leading-relaxed">
              {t.description1}
            </p>
            <p className="text-sm mb-0">
              {t.description2}
            </p>
          </div>
        </div>
        {/* Carousel subsection */}
        <div className="mt-0">
          <Carousel />
        </div>
      </div>
    </section>
  );
};

export default ReferencesSection;
