import { Users, Handshake, Award, Shield } from "lucide-react";

const ValuesSection = () => {
  const values = [
    {
      icon: Users,
      title: "Customer problem first – technology second",
      description:
        "We always understand your processes before proposing solutions. Technology is a tool, not a goal. We analyze and map your actual workflows before recommending any system.",
    },
    {
      icon: Handshake,
      title: "Honest expert partnership",
      description:
        "We recommend what's best for you, even if it's not the easiest or most profitable option for us. Transparency and trust matter more than quick sales.",
    },
    {
      icon: Award,
      title: "Proven excellence",
      description:
        "Our expertise shows through concrete results, client references, and continuous professional development. We back our recommendations with evidence and experience.",
    },
    {
      icon: Shield,
      title: "Responsible sales",
      description:
        "Every solution must create real, measurable value for you. We don't sell solutions for the sake of selling – if technology isn't the answer, we'll tell you.",
    },
  ];

  return (
    <section id="values" className="section-padding bg-secondary/30">
      <div className="section-container">
        <div className="text-center mb-16">
          <span className="inline-block text-sm font-medium text-primary uppercase tracking-wider mb-4">
            What Drives Us
          </span>
          <h2 className="text-3xl md:text-4xl font-semibold text-foreground tracking-tight">
            Our Values
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
