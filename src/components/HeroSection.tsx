'use client';

import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';

export default function HeroHome() {
  const containerRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);

  const firstName = 'Michael';
  const lastName = 'Cruz';
  const roleText = 'Full Stack Developer';

  useLayoutEffect(() => {
    if (typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      // 1. Estado Inicial
      gsap.set('.hero-sub', { opacity: 0, y: 20 });
      gsap.set('.hero-name-char', {
        opacity: 0,
        y: 80,
        rotateX: -90,
        transformOrigin: '50% 100%',
      });
      gsap.set('.hero-role-char', { opacity: 0, y: 30 });
      gsap.set('.hero-divider', {
        opacity: 0,
        scaleX: 0,
        transformOrigin: 'left center',
      });
      gsap.set('.hero-location', { opacity: 0, y: 15 });
      gsap.set('.hero-footer', { opacity: 0, y: 20 });

      // 2. Timeline Principal
      const tl = gsap.timeline();

      tl.to('.hero-sub', {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: 'power3.out',
      })
        .to(
          '.hero-name-char',
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.8,
            stagger: 0.04,
            ease: 'power3.out',
          },
          '+=0.1'
        )
        .to(
          '.hero-role-char',
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.025,
            ease: 'power3.out',
          },
          '-=0.3'
        )
        .to(
          '.hero-divider',
          {
            opacity: 1,
            scaleX: 1,
            duration: 0.5,
            ease: 'power2.out',
          },
          '-=0.15'
        )
        .to(
          '.hero-location',
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power3.out',
          },
          '-=0.2'
        )
        .to(
          '.hero-footer',
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
          },
          '+=0.1'
        );

      // 3. Animación de rebote de la Flecha
      if (arrowRef.current) {
        gsap.to(arrowRef.current, {
          y: 8,
          repeat: -1,
          yoyo: true,
          duration: 0.9,
          ease: 'sine.inOut',
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleScrollDown = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth',
    });
  };

  const splitToSpans = (text: string, className: string) =>
    text.split('').map((char, i) => (
      <span
        key={`${char}-${i}`}
        className={`${className} inline-block [will-change:transform,opacity] ${
          char === ' ' ? 'w-[0.2em]' : ''
        }`}
      >
        {char}
      </span>
    ));

  return (
    <section
      ref={containerRef}
      className="relative z-10 flex min-h-screen w-full flex-col justify-between overflow-hidden bg-[#FFF8EB] px-4 pt-20 pb-8 text-center text-[#0A1128] select-none [perspective:1000px] sm:px-6 md:px-12 md:pt-24 md:pb-12"
    >
      {/* MARGEN SUPERIOR */}
      <div className="w-full" />

      {/* BLOQUE CENTRAL */}
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-center my-auto w-full">
        <span className="hero-sub font-mono text-[10px] xs:text-xs font-bold tracking-[0.25em] text-[#034078] md:text-sm">
          Portafolio 2026
        </span>

        {/* NOMBRE ADAPTATIVO SIN PALABRAS ROTAS */}
        <h1 className="mt-2 text-4xl xs:text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tight text-[#0A1128] leading-[1.05] whitespace-nowrap">
          <span className="inline-block">
            {splitToSpans(firstName, 'hero-name-char')}
          </span>
          <br className="sm:hidden" />
          <span className="inline-block sm:ml-4">
            {splitToSpans(lastName, 'hero-name-char')}
          </span>
        </h1>

        <div className="mt-4 flex flex-col items-center justify-center gap-1.5 sm:flex-row sm:gap-4">
          <p className="font-mono text-sm xs:text-base font-extrabold tracking-wider text-[#001F54] md:text-xl">
            {splitToSpans(roleText, 'hero-role-char')}
          </p>

          <span className="hero-divider hidden h-px w-5 bg-[#034078]/30 sm:inline-block" />

          <p className="hero-location font-mono text-xs xs:text-sm font-bold tracking-widest text-[#034078] md:text-base">
            Bogotá, Colombia
          </p>
        </div>
      </div>

      {/* PIE DEL HERO */}
      <div className="hero-footer flex w-full justify-center pt-6">
        <button
          onClick={handleScrollDown}
          type="button"
          aria-label="Desplazarse hacia la siguiente sección"
          className="group flex cursor-pointer flex-col items-center gap-1.5 focus:outline-none"
        >
          <div ref={arrowRef} className="flex items-center justify-center">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-[#001F54] transition-colors duration-300 group-hover:stroke-[#034078]"
              style={{ strokeWidth: 2.5, strokeLinecap: 'round', strokeLinejoin: 'round' }}
            >
              <path d="M12 3v18M19.5 13.5L12 21m0 0l-7.5-7.5" />
            </svg>
          </div>

          <span className="font-mono text-[9px] xs:text-[10px] font-bold tracking-widest text-[#034078] transition-colors duration-300 group-hover:text-[#001F54] md:text-xs">
            Haz scroll para explorar
          </span>
        </button>
      </div>
    </section>
  );
}