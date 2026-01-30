import { Target, Eye } from "lucide-react";

const MissionSection = () => {
  return (
    <section id="mission" className="section-padding">
      <div className="section-container">
        <div className="text-center mb-16">
          <span className="inline-block text-sm font-medium text-primary uppercase tracking-wider mb-4">
            Our Purpose
          </span>
          <h2 className="text-3xl md:text-4xl font-semibold text-foreground tracking-tight">
            Mission & Vision
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Mission */}
          <div className="relative bg-card rounded-2xl p-8 lg:p-10 shadow-card border border-border/50 group hover:shadow-elevated transition-all duration-300">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/0 via-primary to-primary/0 rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="w-14 h-14 rounded-xl bg-accent/50 border border-border flex items-center justify-center mb-6 group-hover:bg-primary/10 group-hover:border-primary/20 transition-colors">
              <Target className="w-6 h-6 text-primary" />
            </div>
            
            <h3 className="text-xl font-semibold text-foreground mb-4">Mission</h3>
            <p className="text-muted-foreground leading-relaxed">
              We help companies build systems that actually work – sustainably and aligned 
              with their business needs. We enable the use of AI and technology in ways 
              that support processes, independent of specific vendors or technologies.
            </p>
          </div>

          {/* Vision */}
          <div className="relative bg-card rounded-2xl p-8 lg:p-10 shadow-card border border-border/50 group hover:shadow-elevated transition-all duration-300">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/0 via-primary to-primary/0 rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="w-14 h-14 rounded-xl bg-accent/50 border border-border flex items-center justify-center mb-6 group-hover:bg-primary/10 group-hover:border-primary/20 transition-colors">
              <Eye className="w-6 h-6 text-primary" />
            </div>
            
            <h3 className="text-xl font-semibold text-foreground mb-4">Vision</h3>
            <p className="text-muted-foreground leading-relaxed">
              To be the most trusted AI and IT partner for companies that want to solve 
              real problems with technology. Known for honesty, proven expertise, and 
              solutions that stand the test of time.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionSection;
