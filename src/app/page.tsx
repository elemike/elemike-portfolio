'use client';

import { useEffect } from 'react';
import HeroSection from "@/components/HeroSection";
import AboutStatsSection from "@/components/AboutStatsSection";
import ProjectsCarousel from "@/components/ProjectsCarousel";
import TechMarquee from "@/components/TechMarquee";
import ServicesSection from "@/components/ServicesSection";
import Footer from "@/components/Footer";
import FloatingScrollTop from "@/components/FloatingScrollTop";

export default function Home() {
  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-[#FFF8EB] overflow-x-hidden relative">
      {/* 01. HERO */}
      <HeroSection />

      {/* 02. ABOUT ME + STATS */}
      <AboutStatsSection />

      {/* 03. PROYECTOS */}
      <section id="proyectos" className="py-20">
        <ProjectsCarousel />
      </section>

      {/* 04. TECH MARQUEE */}
      <div className="py-8">
        <TechMarquee />
      </div>

      {/* 05. SERVICIOS */}
      <ServicesSection />

      {/* 06. FOOTER */}
      <Footer />

      {/* BOTÓN FLOTANTE VOLVER ARRIBA */}
      <FloatingScrollTop />
    </div>
  );
}