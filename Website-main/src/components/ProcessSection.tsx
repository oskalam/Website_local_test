import { Search, BarChart3, BookOpen, CheckCircle2, Lightbulb } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const ProcessSection = () => {
  const { language } = useLanguage();
  const content = {
    en: {
      approachLabel: "Our Approach",
      processTitle: "How We Work",
      step1Title: "We start with your problem, not our solutions",
      step1Desc: "Every project begins with understanding your actual business challenge and current processes.",
      step2Title: "We evaluate by business value",
      step2Desc: "Solutions are judged by whether they solve your problem, not by technical sophistication.",
      step3Title: "We educate, not just implement",
      step3Desc: "You'll understand the choices we make and why, so you can maintain and evolve the solution.",
      step4Title: "We measure success honestly",
      step4Desc: "After implementation, we ask: Did this solve the original problem?",
      exampleTitle: "Concrete Example",
      exampleText: "We might recommend improving an existing workflow over implementing a complex AI system – if that actually solves your problem better.",
    },
    fi: {
      approachLabel: "Lähestymistapamme",
      processTitle: "Kuinka toimimme",
      step1Title: "Aloitamme sinun ongelmastasi, ei omista ratkaisuistamme",
      step1Desc: "Jokainen projekti alkaa todellisen liiketoimintahaasteen ja nykyisten prosessien ymmärtämisestä.",
      step2Title: "Arvioimme liiketoiminnallisen arvon perusteella",
      step2Desc: "Ratkaisuja arvioidaan sen perusteella, ratkaistavatko ne ongelmasi, ei teknisen kehittyneisyyden perusteella.",
      step3Title: "Koulutamme, emme vain toteuta",
      step3Desc: "Ymmärrät valinnat, joita teemme, ja miksi, joten voit ylläpitää ja kehittää ratkaisua.",
      step4Title: "Mittaamme menestystä rehellisesti",
      step4Desc: "Toteutuksen jälkeen kyselemme: Ratkaisiko tämä alkuperäisen ongelman?",
      exampleTitle: "Käytännön esimerkki",
      exampleText: "Voisimme suositella olemassa olevan työnkulun parantamista monimutkaisen AI-järjestelmän toteuttamisen sijaan, jos se ratkaisee ongelmasi paremmin.",
    },
  } as const;
  const t = content[language];
    number: "01",
    icon: Search,
    title: t.step1Title,
    description: t.step1Desc,
  }, {
    number: "02",
    icon: BarChart3,
    title: t.step2Title,
    description: t.step2Desc,
  }, {
    number: "03",
    icon: BookOpen,
    title: t.step3Title,
    description: t.step3Desc,
  }, {
    number: "04",
    icon: CheckCircle2,
    title: t.step4Title,
    description: t.step4Desc,
  }];
  return <section id="process" className="section-padding">
      <div className="section-container">
        <div className="text-center mb-16">
          <span className="inline-block text-sm font-medium text-primary uppercase tracking-wider mb-4">
            {t.approachLabel}
          </span>
          <h2 className="text-3xl md:text-4xl font-semibold text-foreground tracking-tight">
            {t.processTitle}
          </h2>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Process steps */}
          <div className="relative">
            {/* Connecting line */}
            <div className="hidden md:block absolute left-[2.75rem] top-12 bottom-12 w-px bg-border" />
            
            <div className="space-y-8">
              {steps.map((step, index) => <div key={index} className="relative flex gap-6 group">
                  {/* Step indicator */}
                  <div className="flex-shrink-0 relative z-10">
                    <div className="w-14 h-14 rounded-2xl bg-card border border-border shadow-soft flex items-center justify-center group-hover:border-primary/30 group-hover:shadow-card transition-all duration-300">
                      <step.icon className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 bg-card rounded-2xl p-6 shadow-soft border border-border/50 group-hover:shadow-card group-hover:border-primary/20 transition-all duration-300">
                    <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                      Step {step.number}
                    </span>
                    <h3 className="text-lg font-semibold text-foreground mt-2 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </div>)}
            </div>
          </div>

          {/* Example callout */}
          <div className="mt-12 bg-accent/30 border border-border rounded-2xl p-6 md:p-8">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Lightbulb className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-foreground uppercase tracking-wide mb-2">
                  {t.exampleTitle}
                </h4>
                <p className="text-muted-foreground italic leading-relaxed">"{t.exampleText}"</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default ProcessSection;