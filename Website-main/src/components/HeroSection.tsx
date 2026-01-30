import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
import HeroBackground from "@/components/HeroBackground";
const HeroSection = () => {
  const scrollToContact = () => {
    const element = document.querySelector("#contact");
    if (element) {
      element.scrollIntoView({
        behavior: "smooth"
      });
    }
  };
  const scrollToAbout = () => {
    const element = document.querySelector("#about");
    if (element) {
      element.scrollIntoView({
        behavior: "smooth"
      });
    }
  };
  return <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 opacity-60" style={{
      background: "radial-gradient(ellipse 80% 50% at 50% -20%, hsl(175 35% 35% / 0.08), transparent)"
    }} />
      
      {/* Animated interactive background */}
      <HeroBackground />

      {/* Geometric accent shapes */}
      <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-primary/5 blur-3xl animate-float" />
      <div className="absolute bottom-1/3 left-1/4 w-48 h-48 rounded-full bg-accent/30 blur-2xl animate-float" style={{
      animationDelay: "2s"
    }} />
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-[0.015]" style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
    }} />

      <div className="section-container relative z-10 text-center pt-20">
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          

          {/* Main headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground leading-tight tracking-tight mb-6 opacity-0 animate-fade-up stagger-1 text-balance">
            Process consulting with{" "}
            <span className="text-primary">technology</span> and{" "}
            <span className="text-primary">AI expertise</span>
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 opacity-0 animate-fade-up stagger-2 text-balance leading-relaxed">
            We help companies solve real business problems – sustainably and responsibly. 
            Technology is our tool, not our product.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0 animate-fade-up stagger-3">
            <Button variant="hero" size="lg" onClick={scrollToContact}>
              Let's talk
            </Button>
            <Button variant="outline" size="lg" onClick={scrollToAbout}>
              Learn more
            </Button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 opacity-0 animate-fade-in" style={{
        animationDelay: "0.8s"
      }}>
          
        </div>
      </div>
    </section>;
};
export default HeroSection;