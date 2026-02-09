import { Users, Handshake, Award, Shield } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const ValuesSection = () => {
  const { language } = useLanguage();
  const content = {
    en: {
      valuesLabel: "What Drives Us",
      valuesTitle: "Our Values",
      value1Title: "Customer problem first – technology second",
      value1Desc: "We always understand your processes before proposing solutions. Technology is a tool, not a goal. We analyze and map your actual workflows before recommending any system.",
      value2Title: "Honest expert partnership",
      value2Desc: "We recommend what's best for you, even if it's not the easiest or most profitable option for us. Transparency and trust matter more than quick sales.",
      value3Title: "Proven excellence",
      value3Desc: "Our expertise shows through concrete results, client references, and continuous professional development. We back our recommendations with evidence and experience.",
      value4Title: "Responsible sales",
      value4Desc: "Every solution must create real, measurable value for you. We don't sell solutions for the sake of selling – if technology isn't the answer, we'll tell you.",
    },
    fi: {
      valuesLabel: "Mikä motivoi meitä",
      valuesTitle: "Arvomme",
      value1Title: "Asiakkaan ongelma ensin – teknologia toiseksi",
      value1Desc: "Ymmmärrämme aina prosessisi ennen ratkaisujen ehdottamista. Teknologia on työkalu, ei tavoite. Analysoimme ja kartoitamme todelliset työvirtaukset ennen järjestelmän suosittelua.",
      value2Title: "Rehellinen asiantuntijakyö",
      value2Desc: "Suosittelemme sinulle parhaimman vaihtoehdon, vaikka se ei olisikaan helpointa tai kannattavinta meille. Avoimuus ja luottamus ovat tärkeämpiä kuin nopea kauppa.",
      value3Title: "Todistettu osaaminen",
      value3Desc: "Asiantuntemuksemme näkyy konkreettisissa tuloksissa, asiakasreferensseissä ja jatkuvassa ammatillisessa kehityksessä. Perustamme suosituksemme todisteisiin ja kokemukseen.",
      value4Title: "Vastuullinen liiketoiminta",
      value4Desc: "Jokaisen ratkaisun täytyy luoda todellista, mitattavaa arvoa sinulle. Emme myy ratkaisuja myynnin vuoksi – jos teknologia ei ole vastaus, kerromme sen.",
    },
  } as const;
  const t = content[language];
  const values = [
    {
      icon: Users,
      title: t.value1Title,
      description: t.value1Desc,
    },
    {
      icon: Handshake,
      title: t.value2Title,
      description: t.value2Desc,
    },
    {
      icon: Award,
      title: t.value3Title,
      description: t.value3Desc,
    },
    {
      icon: Shield,
      title: t.value4Title,
      description: t.value4Desc,
    },
  ];

  return (
    <section id="values" className="section-padding bg-secondary/30">
      <div className="section-container">
        <div className="text-center mb-16">
          <span className="inline-block text-sm font-medium text-primary uppercase tracking-wider mb-4">
            {t.valuesLabel}
          </span>
          <h2 className="text-3xl md:text-4xl font-semibold text-foreground tracking-tight">
            {t.valuesTitle}
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {values.map((value, index) => (
            <div
              key={index}
              className="bg-card rounded-2xl p-8 shadow-card border border-border/50 hover:shadow-elevated hover:border-primary/20 transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/15 transition-colors">
                <value.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-3 leading-snug">
                {value.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValuesSection;
