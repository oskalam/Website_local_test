import { X } from "lucide-react";

const WhatWeDontDoSection = () => {
  const items = [
    "We don't sell vendor-locked solutions that trap you with one provider",
    "We don't implement AI for the sake of AI or because it's trendy",
    "We don't promise quick fixes to complex business problems",
    "We don't move forward with projects where we can't deliver real value",
  ];

  return (
    <section className="section-padding bg-secondary/30">
      <div className="section-container">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
        <span className="inline-block text-sm font-medium text-primary uppercase tracking-wider mb-4">
          Transparency
        </span>
        <h2 className="text-3xl md:text-4xl font-semibold text-foreground tracking-tight">
          What We Don't Do
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
