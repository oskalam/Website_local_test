import { useEffect, lazy, Suspense } from "react";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";

// Lazy load below-the-fold components
const AboutSection = lazy(() => import("@/components/AboutSection"));
const MissionSection = lazy(() => import("@/components/MissionSection"));
const ValuesSection = lazy(() => import("@/components/ValuesSection"));
const ProcessSection = lazy(() => import("@/components/ProcessSection"));
const WhatWeDontDoSection = lazy(() => import("@/components/WhatWeDontDoSection"));
const ReferencesSection = lazy(() => import("@/components/ReferencesSection"));
const ContactSection = lazy(() => import("@/components/ContactSection"));
const Footer = lazy(() => import("@/components/Footer"));

// Loading component for suspense
const SectionSkeleton = () => (
  <div className="section-padding">
    <div className="section-container">
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/4 mx-auto mb-4"></div>
        <div className="h-12 bg-gray-200 rounded w-1/2 mx-auto mb-8"></div>
        <div className="space-y-4">
          <div className="h-4 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          <div className="h-4 bg-gray-200 rounded w-4/6"></div>
        </div>
      </div>
    </div>
  </div>
);

const Index = () => {
  useEffect(() => {
    // Update document title
    document.title = "Querit | Process Consulting with Technology & AI Expertise";
    
    // Add meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Querit is a Finland-based consulting company specializing in process consulting with technology and AI expertise. We help companies solve real business problems sustainably."
      );
    } else {
      const meta = document.createElement("meta");
      meta.name = "description";
      meta.content =
        "Querit is a Finland-based consulting company specializing in process consulting with technology and AI expertise. We help companies solve real business problems sustainably.";
      document.head.appendChild(meta);
    }
  }, []);

  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <Suspense fallback={<SectionSkeleton />}>
        <AboutSection />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <MissionSection />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <ValuesSection />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <ProcessSection />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <WhatWeDontDoSection />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <ReferencesSection />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <ContactSection />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <Footer />
      </Suspense>
    </main>
  );
};

export default Index;
