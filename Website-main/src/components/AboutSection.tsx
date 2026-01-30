import { Linkedin } from "lucide-react";

const AboutSection = () => {
  const founders = [
    {
      name: "Oskari Alamäki",
      title: "Co-founder & CFO",
      bio: "Expert in business process optimization and analytics. Background in CRM engineering with a focus on practical, scalable and sustainable solutions. MSc in Industrial Engineering and Management from LUT University.",
      linkedin: "#https://www.linkedin.com/in/oskari-alam%C3%A4ki/",
    },
    {
      name: "Eemil Aspholm",
      title: "Co-founder & CTO",
      bio: "Expert in AI implementation and process automation. Previously led CRM related AI initiatives in Nordic companies. MSc in Industrial Engineering and Management from LUT University.",
      linkedin: "#https://www.linkedin.com/in/eemil-aspholm/",
    },
  ];

  return (
    <section id="about" className="section-padding bg-secondary/30">
      <div className="section-container">
        {/* About Querit */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <span className="inline-block text-sm font-medium text-primary uppercase tracking-wider mb-4">
            About Us
          </span>
          <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-6 tracking-tight">
            Who We Are
          </h2>
          <div className="space-y-5 text-muted-foreground text-lg leading-relaxed">
            <p>
              Querit is a Finland-based consulting company with deep expertise in business 
              processes, systems, and technology.
            </p>
            <p>
              We use AI where it creates real value – not because it's trendy. Our approach 
              is technology-agnostic: we recommend what actually solves your problem, whether 
              that's AI, a simple process change, or something in between.
            </p>
            <p>
              Our focus is on building solutions that last, work in practice, and support 
              your business over time.
            </p>
          </div>
        </div>

        {/* Founders */}
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-semibold text-foreground text-center mb-12 tracking-tight">
            Our Founders
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            {founders.map((founder, index) => (
              <div
                key={index}
                className="bg-card rounded-2xl p-8 shadow-card border border-border/50 hover:shadow-elevated transition-all duration-300 group"
              >
                {/* Photo placeholder */}
                <div className="w-24 h-24 rounded-full bg-accent/50 border-2 border-border mx-auto mb-6 flex items-center justify-center overflow-hidden group-hover:border-primary/30 transition-colors">
                  <span className="text-3xl text-muted-foreground">
                    {founder.name.charAt(1)}
                  </span>
                </div>
                
                <div className="text-center">
                  <h4 className="text-xl font-semibold text-foreground mb-1">
                    {founder.name}
                  </h4>
                  <p className="text-primary text-sm font-medium mb-4">
                    {founder.title}
                  </p>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {founder.bio}
                  </p>
                  <a
                    href={founder.linkedin}
                    className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                    aria-label={`${founder.name}'s LinkedIn profile`}
                  >
                    <Linkedin size={18} />
                    <span>LinkedIn</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
