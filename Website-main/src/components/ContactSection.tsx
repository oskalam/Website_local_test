import { MapPin, Clock, PhoneCall, MessageSquare, Sparkles, Calendar } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const ContactSection = () => {
  const { language } = useLanguage();
  const content = {
    en: {
      touchLabel: "Get in Touch",
      talkTitle: "Let's Talk",
      talkDesc: "Whether you're certain you need technology or just exploring options, we're happy to talk. No pressure, no sales pitch – just an honest conversation about whether we can help.",
      agentTitle: "Onboarding Agent",
      agentSubtitle: "Your intelligent assistant for seamless onboarding",
      agentDesc: "Get started instantly with our AI-powered consultation agent. Simply describe your needs, and our intelligent assistant will guide you through a personalized discovery process.",
      step1Label: "STEP 1",
      step1Title: "Smart Discovery",
      step1Desc: "Answer a few targeted questions about your challenge or project goals",
      step2Label: "STEP 2",
      step2Title: "AI Recommendations",
      step2Desc: "Receive tailored suggestions on how we can help solve your specific problem",
      step3Label: "STEP 3",
      step3Title: "Instant Booking",
      step3Desc: "Schedule automatically and receive a calendar invitation in your email",
      consultButton: "Start Consultation",
      locationTitle: "Location",
      locationText: "Helsinki, Finland",
      expectTitle: "What to expect",
      expectText: "We'll respond within 24 hours with honest feedback on whether we're the right fit for your needs.",
      contactTitle: "Contact",
      emailLabel: "Email:",
      phoneLabel: "Phone:",
    },
    fi: {
      touchLabel: "Ota yhteyttä",
      talkTitle: "Keskustellaan",
      talkDesc: "Olit sitten varma, että tarvitset teknologiaa vai vasta tutkimassa vaihtoehtoja, olemme iloisia keskustelemaan kanssasi. Ei paineita, ei myyntipuhe – vain rehellinen keskustelu siitä, voimmeko auttaa.",
      agentTitle: "Perehdytysagentti",
      agentSubtitle: "Älykäs avustajasi saumattomaan perehdytykseen",
      agentDesc: "Aloita heti tekoaly-pohjaisen konsultaatioagentin avulla. Kuvaa yksinkertaisesti tarpeesi, ja älykkkä avustajamme ohjaa sinut personoidun tutkimisprosessin läpi.",
      step1Label: "VAIHE 1",
      step1Title: "Älykkkä tutkimus",
      step1Desc: "Vastaa muutamiin kohdennettuihin kysymyksiin haasteestasi tai projektitavoitteistasi",
      step2Label: "VAIHE 2",
      step2Title: "Tekoälyn suositukset",
      step2Desc: "Saa räätälöitujä ehdotuksia siitä, kuinka voimme auttaa ratkaisemaan tietyn ongelmasi",
      step3Label: "VAIHE 3",
      step3Title: "Pikavaus",
      step3Desc: "Varaa automaattisesti ja saa kalenterikutsu sähköpostiisi",
      consultButton: "Aloita neuvonta",
      locationTitle: "Sijainti",
      locationText: "Helsinki, Suomi",
      expectTitle: "Mitä odottaa",
      expectText: "Vastaamme 24 tunnissa rehellisellä palautteella siitä, olemmeko sopiva vaihtoehto tarpeillesi.",
      contactTitle: "Yhteydenottotiedot",
      emailLabel: "Sähköposti:",
      phoneLabel: "Puhelin:",
    },
  } as const;
  const t = content[language];
  return (
    <section id="contact" className="section-padding bg-secondary/30">
      <div className="section-container">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block text-sm font-medium text-primary uppercase tracking-wider mb-4">
              {t.touchLabel}
            </span>
            <h2 className="text-3xl md:text-4xl font-semibold text-foreground tracking-tight mb-4">
              {t.talkTitle}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {t.talkDesc}
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* AI Hotline Card */}
            <div className="lg:col-span-2">
              <div className="bg-card rounded-2xl p-6 shadow-card border border-border/50">
                <div className="flex items-start gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <PhoneCall className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-1">{t.agentTitle}</h3>
                    <p className="text-sm text-muted-foreground">{t.agentSubtitle}</p>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                  {t.agentDesc}
                </p>

                {/* Visual Process Flow */}
                <div className="relative">   
                  <div className="space-y-6">
                    <div className="flex items-start gap-3 relative">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shadow-soft z-10 flex-shrink-0">
                        <MessageSquare className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1 pt-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">{t.step1Label}</span>
                          <h4 className="font-semibold text-sm text-foreground">{t.step1Title}</h4>
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          {t.step1Desc}
                        </p>
                      </div>
                    </div>

                    {/* Step 2 */}
                    <div className="flex items-start gap-3 relative">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shadow-soft z-10 flex-shrink-0">
                        <Sparkles className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1 pt-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">{t.step2Label}</span>
                          <h4 className="font-semibold text-sm text-foreground">{t.step2Title}</h4>
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          {t.step2Desc}
                        </p>
                      </div>
                    </div>

                    {/* Step 3 */}
                    <div className="flex items-start gap-3 relative">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shadow-soft z-10 flex-shrink-0">
                        <Calendar className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1 pt-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">{t.step3Label}</span>
                          <h4 className="font-semibold text-sm text-foreground">{t.step3Title}</h4>
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          {t.step3Desc}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-border/50">
                  <button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-soft text-sm">
                    <PhoneCall className="w-4 h-4" />
                    {t.consultButton}
                  </button>
                </div>
              </div>
            </div>

            {/* Info */}
            <div className="space-y-6">
              <div className="bg-card rounded-2xl p-6 shadow-soft border border-border/50">
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground">{t.locationTitle}</h3>
                </div>
                <p className="text-muted-foreground">{t.locationText}</p>
              </div>

              <div className="bg-card rounded-2xl p-6 shadow-soft border border-border/50">
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground">{t.expectTitle}</h3>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {t.expectText}
                </p>
              </div>

              <div className="bg-card rounded-2xl p-6 shadow-soft border border-border/50">
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <PhoneCall className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground">{t.contactTitle}</h3>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground text-sm leading-relaxed">{t.emailLabel}</span>
                    <a
                      href="mailto:hello@processpartners.fi"
                      className="text-primary hover:underline break-all"
                    >
                      info@querit.com
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground text-sm leading-relaxed">{t.phoneLabel}</span>
                    <a
                      href="tel:+358401234567"
                      className="text-primary hover:underline"
                    >
                      +358 40 123 4567
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;