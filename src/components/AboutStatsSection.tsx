'use client';

import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { numericValue: 4, prefix: '+', suffix: '', label: 'Años de Experiencia' },
  { numericValue: 15, prefix: '+', suffix: '', label: 'Proyectos Completados' },
  { numericValue: 2000, prefix: '+', displaySuffix: 'K', label: 'Clientes Atendidos' },
  { numericValue: 100, prefix: '', suffix: '%', label: 'Compromiso & Calidad' },
];

export default function AboutStatsSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const paragraph1 =
    'Desarrollador Full Stack con experiencia en el diseño y desarrollo de aplicaciones web robustas, escalables y orientadas a Clean Architecture. Apasionado por construir productos digitales eficientes, aplicando buenas prácticas de código y optimizando cada capa del sistema.';

  const paragraph2 =
    'Mi enfoque combina el desarrollo backend sólido en ASP.NET Core y NestJS, con la creación de interfaces dinámicas e interactivas utilizando Angular, React y Next.js. Además, cuento con experiencia integrando modelos de Inteligencia Artificial y Visión por Computador para resolver problemas complejos mediante tecnología.';

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Animación del Encabezado
      gsap.from('.about-header', {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          once: true,
        },
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power3.out',
      });

      // 2. Revelado 3D para los caracteres del texto
      gsap.fromTo(
        '.about-char',
        {
          opacity: 0,
          y: 40,
          rotateX: -90,
          transformOrigin: '50% 100%',
        },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          stagger: 0.015,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.about-text-container',
            start: 'top 75%',
            once: true,
          },
        }
      );

      // 3. CTA Fade-in
      gsap.from('.about-cta', {
        scrollTrigger: {
          trigger: '.about-cta',
          start: 'top 85%',
          once: true,
        },
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: 'power3.out',
      });

      // 4. Conteo animado para las Stats
      const statElements = gsap.utils.toArray<HTMLElement>('.stat-number');
      statElements.forEach((el) => {
        const targetValue = parseInt(el.getAttribute('data-target') || '0', 10);
        const isKFormat = targetValue >= 1000;

        gsap.fromTo(
          el,
          { textContent: 0 },
          {
            textContent: isKFormat ? targetValue / 1000 : targetValue,
            duration: 2,
            ease: 'power1.out',
            snap: { textContent: 1 },
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              once: true,
            },
          }
        );
      });

      // Animación de entrada de las Stats
      gsap.from('.stat-item', {
        scrollTrigger: {
          trigger: '.stats-container',
          start: 'top 85%',
          once: true,
        },
        opacity: 0,
        y: 40,
        rotateX: -45,
        stagger: 0.15,
        duration: 0.8,
        ease: 'power3.out',
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const splitTextToChars = (text: string) =>
    text.split('').map((char, index) => (
      <span
        key={index}
        className="about-char inline-block"
        style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}
      >
        {char}
      </span>
    ));

  return (
    <section
      ref={containerRef}
      id="sobre-mi"
      className="w-full py-20 select-none bg-[#FFF8EB] [perspective:1000px]"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="flex flex-col gap-16 md:gap-20">
          {/* HEADER DE LA SECCIÓN (IDÉNTICO A TECH STACK Y SERVICIOS) */}
          <div className="about-header flex flex-col items-start gap-2">
            <span className="font-mono text-sm font-bold uppercase tracking-[0.25em] text-[#034078]">
              SOBRE MÍ
            </span>
            <h2 className="text-4xl font-extrabold tracking-tight text-[#0A1128] sm:text-5xl md:text-6xl lg:text-7xl">
              Pasión por el código y el impacto
            </h2>
          </div>

          {/* PÁRRAFOS ANIMADOS Y CTA */}
          <div className="flex flex-col items-start gap-8">
            <div className="about-text-container space-y-8 text-xl font-normal leading-relaxed text-[#0A1128] sm:text-2xl md:text-3xl md:leading-normal">
              <p className="[perspective:1000px]">{splitTextToChars(paragraph1)}</p>
              <p className="[perspective:1000px]">{splitTextToChars(paragraph2)}</p>
            </div>

            {/* BOTÓN CTA */}
            <div className="about-cta pt-2">
              <a
                href="#contacto"
                className="inline-flex items-center gap-3 rounded-full bg-[#001F54] px-7 py-3.5 font-mono text-xs font-bold  tracking-wider text-[#FFF8EB] shadow-md transition-all hover:scale-105 hover:bg-[#0A1128] active:scale-95 md:text-sm"
              >
                <span>Más sobre mí</span>
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
                    d="M13.5 4.5L21 12m0 0l-7.5-7.5M21 12H3"
                  />
                </svg>
              </a>
            </div>
          </div>

          {/* ESTADÍSTICAS */}
          <div className="stats-container grid grid-cols-2 gap-y-12 gap-x-8 border-t border-[#001F54]/15 pt-16 sm:grid-cols-4 md:gap-x-12">
            {stats.map((stat, index) => (
              <div key={index} className="stat-item flex flex-col items-start [perspective:1000px]">
                <div className="flex items-baseline font-black text-5xl tracking-tight text-[#0A1128] sm:text-6xl md:text-7xl lg:text-8xl">
                  <span>{stat.prefix}</span>
                  <span
                    className="stat-number"
                    data-target={stat.numericValue}
                  >
                    0
                  </span>
                  <span>{stat.displaySuffix || stat.suffix}</span>
                </div>

                <span className="mt-3 font-mono text-xs font-bold  tracking-widest text-[#034078] md:text-sm">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}