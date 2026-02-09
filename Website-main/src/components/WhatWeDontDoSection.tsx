import { X } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const WhatWeDontDoSection = () => {
  const { language } = useLanguage();
  const content = {
    en: {
      transparencyLabel: "Transparency",
      title: "What We Don't Do",
      item1: "We don't sell vendor-locked solutions that trap you with one provider",
      item2: "We don't implement AI for the sake of AI or because it's trendy",
      item3: "We don't promise quick fixes to complex business problems",
      item4: "We don't move forward with projects where we can't deliver real value",
    },
    fi: {
      transparencyLabel: "Avoimuus",
      title: "Mitä emme tee",
      item1: "Emme myy toimittajaan sidottuja ratkaisuja, jotka lukitsevat sinut yhden tarjoajan kanssa",
      item2: "Emme toteuta tekoälya tekoälyn vuoksi tai koska se on muodikasta",
      item3: "Emme lupaa pikaratkaisuja monimutkaisiin liiketoimintaongelmiin",
      item4: "Emme eeläöre projekteja, joissa emme pysty toimittamaan todellista arvoa",
    },
  } as const;
  const t = content[language];
  const items = [
    t.item1,
    t.item2,
    t.item3,
    t.item4,
  ];

  return (
    <section className="section-padding bg-secondary/30">
      <div className="section-container">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
        <span className="inline-block text-sm font-medium text-primary uppercase tracking-wider mb-4">
          {t.transparencyLabel}
        </span>
        <h2 className="text-3xl md:text-4xl font-semibold text-foreground tracking-tight">
          {t.title}
        </h2>
        </div>

        <div className="bg-card rounded-2xl p-8 shadow-card border border-border/50">
        <ul className="space-y-4">
          {items.map((item, index) => (
          <li
            key={index}
            className="flex items-center gap-4 group"
          >
            <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center flex-shrink-0 group-hover:bg-destructive/10 transition-colors">
            <X className="w-4 h-4 text-muted-foreground group-hover:text-destructive transition-colors" />
            </div>
            <span className="text-foreground leading-relaxed">{item}</span>
          </li>
          ))}
        </ul>
        </div>
      </div>
      </div>
    </section>
  );
};

export default WhatWeDontDoSection;
