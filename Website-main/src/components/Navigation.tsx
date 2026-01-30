import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const throttledHandleScroll = useCallback(() => {
    let ticking = false;
    
    const updateScrollState = () => {
      setIsScrolled(window.scrollY > 20);
      ticking = false;
    };
    
    return () => {
      if (!ticking) {
        requestAnimationFrame(updateScrollState);
        ticking = true;
      }
    };
  }, []);
  
  useEffect(() => {
    const handleScroll = throttledHandleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [throttledHandleScroll]);
  const navLinks = [{
    href: "#about",
    label: "About"
  }, {
    href: "#mission",
    label: "Mission"
  }, {
    href: "#values",
    label: "Values"
  }, {
    href: "#process",
    label: "How we work"
  }, {
    href: "#references",
    label: "References"
  }];
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth"
      });
    }
    setIsMobileMenuOpen(false);
  };
  return <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-background/80 backdrop-blur-lg border-b border-border shadow-soft" : "bg-transparent"}`}>
      <div className="section-container">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <a
            href="#"
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              })
            }
            className="flex items-center gap-3"
            aria-label="Go to top"
          >
            <img
              src="/querit-logo.svg"
              alt="Querit logo"
              className="h-10 w-10 md:h-12 md:w-12"
            />
            <span className="font-semibold text-foreground tracking-tight text-3xl">Querit</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(link => <button key={link.href} onClick={() => scrollToSection(link.href)} className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200">
                {link.label}
              </button>)}
            <Button variant="hero" size="sm" onClick={() => scrollToSection("#contact")} className="ml-2">
              Let's Talk
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2 text-foreground" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} aria-label="Toggle menu">
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && <div className="md:hidden absolute top-full left-0 right-0 bg-background border-b border-border shadow-card animate-fade-in">
            <div className="flex flex-col py-4 px-6 gap-2">
              {navLinks.map(link => <button key={link.href} onClick={() => scrollToSection(link.href)} className="py-3 text-left text-muted-foreground hover:text-foreground transition-colors">
                  {link.label}
                </button>)}
              <Button variant="hero" className="mt-4" onClick={() => scrollToSection("#contact")}>
                Let's talk
              </Button>
            </div>
          </div>}
      </div>
    </nav>;
};
export default Navigation;