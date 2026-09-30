'use client';

import { useState, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

interface TechItem {
  id: string;
  name: string;
  category: string;
  summary: string;
}

const techStack: TechItem[] = [
  {
    id: 'angular',
    name: 'Angular',
    category: 'Frontend',
    summary: 'Framework robusto para aplicaciones web empresariales escalables.',
  },
  {
    id: 'react',
    name: 'React',
    category: 'Frontend',
    summary: 'Biblioteca para interfaces de usuario reactivas y modulares.',
  },
  {
    id: 'nextjs',
    name: 'Next.js',
    category: 'Frontend',
    summary: 'Framework de React optimizado para rendimiento, SSR y SEO.',
  },
  {
    id: 'typescript',
    name: 'Typescript',
    category: 'Language',
    summary: 'JavaScript con tipado estático para código más seguro y mantenible.',
  },
  {
    id: 'csharp',
    name: 'C#',
    category: 'Backend',
    summary: 'Lenguaje orientado a objetos ideal para arquitecturas sólidas.',
  },
  {
    id: 'aspnet',
    name: 'ASP.NET CORE',
    category: 'Backend',
    summary: 'Framework de alto rendimiento para APIs REST y microservicios.',
  },
  {
    id: 'nestjs',
    name: 'NestJS',
    category: 'Backend',
    summary: 'Framework modular de Node.js estructurado con TypeScript.',
  },
  {
    id: 'nodejs',
    name: 'Node.js',
    category: 'Backend',
    summary: 'Entorno de ejecución asíncrono para servidores y APIs rápidas.',
  },
  {
    id: 'sqlserver',
    name: 'SQL Server',
    category: 'Database',
    summary: 'Gestor de bases de datos relacionales empresariales de Microsoft.',
  },
  {
    id: 'postgresql',
    name: 'PostgreSQL',
    category: 'Database',
    summary: 'Base de datos relacional open-source potente y confiable.',
  },
  {
    id: 'python',
    name: 'Python',
    category: 'AI / Vision',
    summary: 'Lenguaje clave para data science, automatización e IA.',
  },
  {
    id: 'opencv',
    name: 'OpenCV',
    category: 'AI / Vision',
    summary: 'Procesamiento y análisis de imágenes y video en tiempo real.',
  },
  {
    id: 'pytorch',
    name: 'PyTorch',
    category: 'AI / Vision',
    summary: 'Framework para entrenamiento de redes neuronales y deep learning.',
  },
  {
    id: 'yolo',
    name: 'YOLO',
    category: 'AI / Vision',
    summary: 'Modelo ultra rápido de detección de objetos en tiempo real.',
  },
];

export default function TechMarquee() {
  const [activeTech, setActiveTech] = useState<TechItem | null>(null);
  const [isMobileModalOpen, setIsMobileModalOpen] = useState<boolean>(false);

  const sectionRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  // Refs para animación modal mobile
  const backdropRef = useRef<HTMLDivElement>(null);
  const modalContentRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Timeline para revelar la cabecera y la lista ordenadamente
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%', // Se activa apenas asoma la sección
          once: true, // Se ejecuta una vez para evitar que se quede en blanco
        },
      });

      // 1. Cabecera entra suavemente
      tl.from('.tech-header', {
        y: 30,
        opacity: 0,
        duration: 0.6,
        ease: 'power3.out',
      });

      // 2. Las filas entran progresivamente en cascada
      tl.from(
        '.tech-row',
        {
          y: 20,
          opacity: 0,
          stagger: 0.04,
          duration: 0.4,
          ease: 'power2.out',
        },
        '-=0.3' // Inicia ligeramente antes de que termine la cabecera
      );
    },
    { scope: sectionRef }
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!tooltipRef.current) return;

    gsap.to(tooltipRef.current, {
      x: e.clientX + 16,
      y: e.clientY + 16,
      duration: 0.15,
      ease: 'power2.out',
    });
  };

  const handleMouseEnter = (tech: TechItem) => {
    setActiveTech(tech);
    if (!tooltipRef.current) return;

    gsap.killTweensOf(tooltipRef.current);
    gsap.to(tooltipRef.current, {
      opacity: 1,
      scale: 1,
      duration: 0.2,
      ease: 'back.out(1.5)',
    });
  };

  const handleMouseLeave = () => {
    if (!tooltipRef.current) return;

    gsap.killTweensOf(tooltipRef.current);
    gsap.to(tooltipRef.current, {
      opacity: 0,
      scale: 0.9,
      duration: 0.15,
      ease: 'power2.in',
      onComplete: () => {
        if (!isMobileModalOpen) setActiveTech(null);
      },
    });
  };

  // Abrir Modal Mobile con Animación GSAP
  const handleTechClick = (tech: TechItem) => {
    setActiveTech(tech);
    setIsMobileModalOpen(true);

    requestAnimationFrame(() => {
      if (backdropRef.current && modalContentRef.current) {
        gsap.killTweensOf([backdropRef.current, modalContentRef.current]);

        gsap.fromTo(
          backdropRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.25, ease: 'power2.out' }
        );

        gsap.fromTo(
          modalContentRef.current,
          { y: 50, opacity: 0, scale: 0.95 },
          { y: 0, opacity: 1, scale: 1, duration: 0.35, ease: 'back.out(1.2)' }
        );
      }
    });
  };

  // Cerrar Modal Mobile con Animación GSAP
  const closeMobileModal = () => {
    if (backdropRef.current && modalContentRef.current) {
      gsap.killTweensOf([backdropRef.current, modalContentRef.current]);

      gsap.to(backdropRef.current, {
        opacity: 0,
        duration: 0.2,
        ease: 'power2.in',
      });

      gsap.to(modalContentRef.current, {
        y: 30,
        opacity: 0,
        scale: 0.95,
        duration: 0.2,
        ease: 'power2.in',
        onComplete: () => {
          setIsMobileModalOpen(false);
          setActiveTech(null);
        },
      });
    } else {
      setIsMobileModalOpen(false);
      setActiveTech(null);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="tecnologias"
      className="w-full pt-10 pb-8 xs:pt-12 xs:pb-12 sm:pt-16 sm:pb-16 select-none bg-[#FFF8EB]"
    >
      <div className="mx-auto max-w-7xl px-4 xs:px-6 md:px-12">
        {/* CABECERA */}
        <div className="tech-header mb-6 sm:mb-10 flex flex-col items-start gap-1.5 sm:gap-2">
          <span className="font-mono text-xs sm:text-sm font-bold uppercase tracking-[0.25em] text-[#034078]">
            TECNOLOGÍAS
          </span>
          <h2 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-[#0A1128]">
            Habilidades
          </h2>
          <p className="mt-2 sm:mt-3 max-w-2xl text-sm xs:text-base font-medium leading-relaxed text-[#034078] md:text-lg">
            Herramientas, frameworks y lenguajes que utilizo día a día para construir soluciones escalables.
          </p>
        </div>

        {/* TOOLTIP DE ESCRITORIO (Seguidor de cursor) */}
        <div
          ref={tooltipRef}
          className={`pointer-events-none fixed top-0 left-0 z-50 hidden md:block max-w-xs rounded-xl border border-[#001F54]/20 bg-[#0A1128] p-4 shadow-2xl backdrop-blur-md ${
            activeTech && !isMobileModalOpen ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {activeTech && (
            <div>
              <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-2">
                <span className="font-mono text-[10px] font-bold tracking-widest text-[#81A4CD]">
                  {activeTech.category}
                </span>
              </div>

              <p className="mt-2 font-mono text-sm font-bold text-[#FFF8EB]">
                {activeTech.name}
              </p>

              <p className="mt-1 text-xs leading-relaxed text-white/80">
                {activeTech.summary}
              </p>
            </div>
          )}
        </div>

        {/* MODAL EMERGENTE ANIMADO PARA MÓVILES */}
        {isMobileModalOpen && activeTech && (
          <div
            ref={backdropRef}
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-[#0A1128]/60 p-4 backdrop-blur-sm md:hidden"
            onClick={closeMobileModal}
          >
            <div
              ref={modalContentRef}
              className="w-full max-w-md rounded-2xl border border-[#001F54]/30 bg-[#0A1128] p-5 xs:p-6 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#81A4CD]">
                  {activeTech.category}
                </span>
                <button
                  onClick={closeMobileModal}
                  className="rounded-full bg-white/10 p-1.5 text-white/70 hover:text-white focus:outline-none active:scale-90 transition-transform"
                  aria-label="Cerrar detalles"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <h3 className="mt-3 font-mono text-xl font-bold text-[#FFF8EB]">
                {activeTech.name}
              </h3>

              <p className="mt-2 text-sm leading-relaxed text-white/80">
                {activeTech.summary}
              </p>

              <button
                onClick={closeMobileModal}
                className="mt-5 w-full rounded-xl bg-[#034078] py-2.5 font-mono text-xs font-bold uppercase tracking-wider text-[#FFF8EB] transition-all active:scale-95 hover:bg-[#001F54]"
              >
                Cerrar
              </button>
            </div>
          </div>
        )}

        {/* TABLA DE TECNOLOGÍAS */}
        <div
          ref={listRef}
          onMouseLeave={handleMouseLeave}
          className="w-full border-t border-[#001F54]/15 pt-1"
        >
          {techStack.map((tech) => {
            const isCurrent = activeTech?.id === tech.id;

            return (
              <div
                key={tech.id}
                onClick={() => handleTechClick(tech)}
                onMouseEnter={() => handleMouseEnter(tech)}
                onMouseMove={handleMouseMove}
                className="tech-row group flex w-full cursor-pointer items-center justify-between border-b border-[#001F54]/15 py-3 px-2 xs:px-3 sm:py-3.5 transition-colors duration-200 hover:bg-[#001F54]/5 rounded-lg active:bg-[#001F54]/10"
              >
                <div className="flex items-center gap-2.5 sm:gap-3">
                  <span
                    className={`text-base font-black tracking-wider transition-colors duration-200 xs:text-lg md:text-xl ${
                      isCurrent
                        ? 'text-[#034078]'
                        : 'text-[#0A1128] group-hover:text-[#034078]'
                    }`}
                  >
                    {tech.name}
                  </span>

                  {isCurrent && (
                    <span className="h-2 w-2 rounded-full bg-[#034078] animate-ping" />
                  )}
                </div>

                <span
                  className={`font-mono text-[10px] xs:text-xs font-bold tracking-widest transition-colors duration-200 ${
                    isCurrent
                      ? 'text-[#034078]'
                      : 'text-[#001F54]/40 group-hover:text-[#034078]'
                  }`}
                >
                  {tech.category}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}