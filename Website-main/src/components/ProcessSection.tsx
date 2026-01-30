import { Search, BarChart3, BookOpen, CheckCircle2, Lightbulb } from "lucide-react";
const ProcessSection = () => {
  const steps = [{
    number: "01",
    icon: Search,
    title: "We start with your problem, not our solutions",
    description: "Every project begins with understanding your actual business challenge and current processes."
  }, {
    number: "02",
    icon: BarChart3,
    title: "We evaluate by business value",
    description: "Solutions are judged by whether they solve your problem, not by technical sophistication."
  }, {
    number: "03",
    icon: BookOpen,
    title: "We educate, not just implement",
    description: "You'll understand the choices we make and why, so you can maintain and evolve the solution."
  }, {
    number: "04",
    icon: CheckCircle2,
    title: "We measure success honestly",
    description: "After implementation, we ask: Did this solve the original problem?"
  }];
  return <section id="process" className="section-padding">
      <div className="section-container">
        <div className="text-center mb-16">
          <span className="inline-block text-sm font-medium text-primary uppercase tracking-wider mb-4">
            Our Approach
          </span>
          <h2 className="text-3xl md:text-4xl font-semibold text-foreground tracking-tight">
            How We Work
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
                  Concrete Example
                </h4>
                <p className="text-muted-foreground italic leading-relaxed">"We might recommend improving an existing workflow over implementing a complex AI system – if that actually solves your problem better."</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default ProcessSection;