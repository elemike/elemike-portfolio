'use client';

import { useLayoutEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const navLinks = [
  { name: 'Inicio', href: '#inicio' },
  { name: 'Sobre mí', href: '#sobre-mi' },
  { name: 'Servicios', href: '#servicios' },
  { name: 'Proyectos', href: '#proyectos' },
];

const socialLinks = [
  { name: 'GitHub', href: 'https://github.com/elemike' },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/michaelsct/' },
];

export default function Footer() {
  const footerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Animación del encabezado y botones
      gsap.from('.footer-cta-header', {
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 80%',
          once: true,
        },
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power3.out',
      });

      // 2. Animación de la imagen panorámica
      gsap.from('.footer-banner-image', {
        scrollTrigger: {
          trigger: '.footer-banner-container',
          start: 'top 85%',
          once: true,
        },
        opacity: 0,
        scale: 0.97,
        duration: 1,
        ease: 'power3.out',
      });

      // 3. Barra inferior de navegación
      gsap.from('.footer-bottom-nav', {
        scrollTrigger: {
          trigger: '.footer-bottom-nav',
          start: 'top 95%',
          once: true,
        },
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: 'power3.out',
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      id="contacto"
      className="w-full bg-[#FFF8EB] text-[#0A1128] select-none pt-20 pb-12"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-12 flex flex-col gap-12 md:gap-16">
        {/* SECCIÓN SUPERIOR: TITULAR Y BOTONES CTA */}
        <div className="footer-cta-header flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          {/* TÍTULO Y DESCRIPCIÓN */}
          <div className="flex flex-col gap-3 max-w-2xl">
            <h2 className="text-4xl font-extrabold tracking-tight text-[#0A1128] sm:text-5xl md:text-6xl lg:text-7xl">
              Iniciemos tu proyecto <span className="text-[#034078]">en minutos</span>
            </h2>
            <p className="text-base font-medium leading-relaxed text-[#034078] md:text-lg">
              Diseñemos, desarrollemos e implementemos soluciones a medida con arquitectura limpia y tecnología de vanguardia.
            </p>
          </div>

          {/* BOTONES DE ACCIÓN */}
          <div className="flex flex-wrap items-center gap-4 shrink-0">
            {/* BOTÓN 1: CONTÁCTAME */}
            <a
              href="mailto:elemike2004@gmail.com"
              className="inline-flex items-center gap-2 rounded-lg bg-[#001F54] px-6 py-3.5 font-mono text-xs font-bold  tracking-wider text-[#FFF8EB] shadow-md transition-all hover:bg-[#0A1128] hover:scale-105 active:scale-95 md:text-sm"
            >
              <span>Contáctame</span>
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
                />
              </svg>
            </a>

            {/* BOTÓN 2: DESCARGAR CV */}
            <a
              href="/cv.pdf"
              target="_blank"
              download
              className="inline-flex items-center gap-2 rounded-lg bg-[#001F54]/10 px-6 py-3.5 font-mono text-xs font-bold  tracking-wider text-[#001F54] transition-all hover:bg-[#001F54]/20 hover:scale-105 active:scale-95 md:text-sm"
            >
              <span>Descargar CV</span>
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
                />
              </svg>
            </a>
          </div>
        </div>

        {/* IMAGEN PANORÁMICA AGTECH */}
        <div className="footer-banner-container relative w-full aspect-[21/6] overflow-hidden rounded-xl bg-[#001F54]/10 shadow-sm">
          <Image
            src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=90&w=2000&auto=format&fit=crop"
            alt="AgTech Technology Banner"
            fill
            className="footer-banner-image object-cover grayscale contrast-125 opacity-90"
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 90vw, 1280px"
          />
        </div>

        {/* BARRA INFERIOR: ALINEADA EN EL CENTRO VERTICAL (items-center) */}
        <div className="footer-bottom-nav flex flex-col items-center justify-between gap-6 pt-6 md:flex-row border-t border-[#001F54]/15">
          {/* NOMBRE / BRANDING */}
          <a
            href="#inicio"
            className="font-mono text-lg font-black tracking-tight text-[#0A1128] hover:text-[#034078] transition-colors shrink-0"
          >
            Michael Cruz
          </a>

          {/* NAVEGACIÓN Y UBICACIÓN (CENTRADO VERTICAL Y HORIZONTAL) */}
          <div className="flex flex-col items-center gap-1.5 font-mono text-xs font-bold tracking-widest text-[#034078]">
            <nav className="flex flex-wrap items-center justify-center gap-6">
              {navLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="transition-colors hover:text-[#0A1128]"
                >
                  {link.name}
                </a>
              ))}
            </nav>

            {/* UBICACIÓN Y MODALIDAD */}
            <span className="text-[11px] font-medium tracking-wider text-[#034078]/80">
              Bogotá, Colombia • Remoto & On-site
            </span>
          </div>

          {/* REDES SOCIALES */}
          <div className="flex items-center gap-6 font-mono text-xs font-bold tracking-wider text-[#0A1128] shrink-0">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-[#034078]"
              >
                {social.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}