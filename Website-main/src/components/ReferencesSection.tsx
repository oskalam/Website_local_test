import { FolderOpen } from "lucide-react";
import React from "react";
import Carousel from "./Carousel";

const ReferencesSection = () => {
  return (
    <section id="references" className="section-padding">
      <div className="section-container">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-16 h-16 rounded-2xl bg-accent/50 border border-border flex items-center justify-center mx-auto mb-6">
            <FolderOpen className="w-7 h-7 text-primary" />
          </div>
          <h2 className="text-3xl md:text-4xl font-semibold text-foreground tracking-tight mb-6">
            Our Work
          </h2>
          <div className="space-y-4 text-muted-foreground">
            <p className="leading-relaxed">
              We're in the progress of building our public reference portfolio. Our concept library can be found below.
            </p>
            <p className="text-sm mb-0">
              Selected project examples and references available upon request.
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
