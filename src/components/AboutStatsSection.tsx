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

  // Párrafo 1: Responde quién eres, qué construyes y cuál es el beneficio directo (software escalable/Clean Architecture).
  const paragraph1 =
    'Ingeniero de Software Full Stack especializado en el desarrollo de aplicaciones web de alto rendimiento, escalables y estructuradas bajo Clean Architecture. Ayudo a empresas a transformar sus procesos mediante sistemas digitales robustos, código limpio y optimización en cada capa de la arquitectura.';

  // Párrafo 2: Responde a la intención técnica de stack + innovación (Backend, Frontend e IA/Computer Vision).
  const paragraph2 =
    'Mi stack principal abarca el desarrollo backend en ASP.NET Core y NestJS, combinado con interfaces modernas en Angular, React y Next.js. Además, integro modelos de Inteligencia Artificial y Visión por Computador para resolver desafíos operativos complejos con tecnología de vanguardia.';

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
          y: 30,
          rotateX: -90,
          transformOrigin: '50% 100%',
        },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          stagger: 0.01,
          duration: 0.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.about-text-container',
            start: 'top 80%',
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

  // AGRUPA LETRAS EN PALABRAS INSEPARABLES
  const splitTextToWordsAndChars = (text: string) => {
    return text.split(' ').map((word, wIdx) => (
      <span key={wIdx} className="inline-block whitespace-nowrap">
        {word.split('').map((char, cIdx) => (
          <span
            key={cIdx}
            className="about-char inline-block [will-change:transform,opacity]"
          >
            {char}
          </span>
        ))}
        {/* Espacio entre palabras */}
        <span className="inline-block">&nbsp;</span>
      </span>
    ));
  };

  return (
    <section
      ref={containerRef}
      id="sobre-mi"
      className="w-full py-12 xs:py-16 sm:py-20 select-none bg-[#FFF8EB] [perspective:1000px]"
    >
      <div className="mx-auto max-w-7xl px-4 xs:px-6 md:px-12">
        <div className="flex flex-col gap-10 sm:gap-16 md:gap-20">
          {/* HEADER DE LA SECCIÓN */}
          <div className="about-header flex flex-col items-start gap-1 sm:gap-2">
            <span className="font-mono text-xs sm:text-sm font-bold uppercase tracking-[0.25em] text-[#034078]">
              SOBRE MÍ
            </span>
            <h2 className="text-2xl xs:text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-[#0A1128] leading-tight">
              Desarrollo de Software e Inteligencia Artificial
            </h2>
          </div>

          {/* PÁRRAFOS ANIMADOS Y CTA */}
          <div className="flex flex-col items-start gap-6 sm:gap-8">
            <div className="about-text-container space-y-4 sm:space-y-8 text-base xs:text-lg sm:text-2xl md:text-3xl font-normal leading-relaxed text-[#0A1128] md:leading-normal">
              <p className="[perspective:1000px]">
                {splitTextToWordsAndChars(paragraph1)}
              </p>
              <p className="[perspective:1000px]">
                {splitTextToWordsAndChars(paragraph2)}
              </p>
            </div>

            {/* BOTÓN CTA */}
            <div className="about-cta pt-2">
              <a
                href="/sobre-mi"
                className="inline-flex items-center gap-2.5 rounded-full bg-[#001F54] px-5 py-3 sm:px-7 sm:py-3.5 font-mono text-xs font-bold tracking-wider text-[#FFF8EB] shadow-md transition-all hover:scale-105 hover:bg-[#0A1128] active:scale-95 md:text-sm"
              >
                <span>Trabajemos juntos</span>
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
          <div className="stats-container grid grid-cols-2 gap-y-8 gap-x-4 border-t border-[#001F54]/15 pt-10 sm:pt-16 sm:grid-cols-4 sm:gap-y-12 md:gap-x-12">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="stat-item flex flex-col items-start [perspective:1000px]"
              >
                <div className="flex items-baseline font-black text-3xl xs:text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-[#0A1128]">
                  <span>{stat.prefix}</span>
                  <span
                    className="stat-number"
                    data-target={stat.numericValue}
                  >
                    0
                  </span>
                  <span>{stat.displaySuffix || stat.suffix}</span>
                </div>

                <span className="mt-2 sm:mt-3 font-mono text-[10px] xs:text-xs font-bold tracking-widest text-[#034078] md:text-sm">
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