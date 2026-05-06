"use client";
import { useState, useEffect } from "react";
import ModernHeader from "@/components/mainPage/ModernHeader";
import { GridPattern } from "@/components/mainPage/GridPattern";
import MainPageSectionWise from "./overviewpage/lyout";
import SerpentineWaveWithStars from "@/components/mainPage/SerpentineWaveBackground";
import { useTheme } from "@/lib/contexts/ThemeContext";

const SECTIONS = ["overview", "about", "projects", "case-studies", "tech-stack", "achievements", "contact"];

export default function MainPage() {
  const [activeSection, setActiveSection] = useState("overview");
  const { resolvedTheme } = useTheme();

  // Scroll-spy: update active nav item based on which section is in view
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { threshold: 0.4 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <main className="relative min-h-screen bg-background text-foreground">
      <div className="fixed inset-0 z-0">
        {resolvedTheme === "light" ? <GridPattern /> : <SerpentineWaveWithStars />}
      </div>
      <div className="relative z-10">
        <ModernHeader
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        />
        <MainPageSectionWise />
      </div>
    </main>
  );
}
