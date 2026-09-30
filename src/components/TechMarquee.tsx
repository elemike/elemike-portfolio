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
  const sectionRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // 1. La cabecera aparece y se queda fija
      gsap.from('.tech-header', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          once: true,
        },
      });

      // 2. Animación fluida de las filas de la lista al entrar
      const rows = gsap.utils.toArray<HTMLElement>('.tech-row');

      gsap.from(rows, {
        y: 25,
        opacity: 0,
        stagger: 0.05,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: listRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });
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
      onComplete: () => setActiveTech(null),
    });
  };

  return (
    <section
      ref={sectionRef}
      id="tecnologias"
      className="w-full py-28 md:py-36 select-none bg-[#FFF8EB]"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        {/* CABECERA CON PADDING INFERIOR AJUSTADO */}
        <div className="tech-header mb-16 flex flex-col items-start gap-2">
          <span className="font-mono text-sm font-bold uppercase tracking-[0.25em] text-[#034078]">
            TECNOLOGÍAS
          </span>
          <h2 className="text-4xl font-extrabold tracking-tight text-[#0A1128] sm:text-5xl md:text-6xl lg:text-7xl">
            Habilidades
          </h2>
          <p className="mt-4 max-w-2xl text-base font-medium leading-relaxed text-[#034078] md:text-lg">
            Herramientas, frameworks y lenguajes que utilizo día a día para construir soluciones escalables.
          </p>
        </div>

        {/* TOOLTIP EMERGENTE */}
        <div
          ref={tooltipRef}
          className={`pointer-events-none fixed top-0 left-0 z-50 max-w-xs rounded-xl border border-[#001F54]/20 bg-[#0A1128] p-4 shadow-2xl backdrop-blur-md ${
            activeTech ? 'opacity-100 block' : 'opacity-0 hidden'
          }`}
        >
          {activeTech && (
            <div>
              <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-2">
                <span className="font-mono text-[10px] font-bold tracking-widest text-[#81A4CD]">
                  {activeTech.category}
                </span>
                <span className="font-mono text-[9px] text-white/50">
                  [ Click para ver detalles ]
                </span>
              </div>

              <p className="mt-2 font-mono text-sm font-bold text-[#FFF8EB]">
                {activeTech.name}
              </p>

              <p className="mt-1 text-xs leading-relaxed text-white/80">
                {activeTech.summary}
              </p>

              <p className="mt-3 font-mono text-[10px] font-semibold text-[#81A4CD]">
                Haz click para ver las habilidades →
              </p>
            </div>
          )}
        </div>

        {/* TABLA DE TECNOLOGÍAS CON PADDING AUMENTADO EN LAS FILAS */}
        <div
          ref={listRef}
          onMouseLeave={handleMouseLeave}
          className="w-full border-t border-[#001F54]/15 pt-2"
        >
          {techStack.map((tech) => {
            const isCurrent = activeTech?.id === tech.id;

            return (
              <div
                key={tech.id}
                onMouseEnter={() => handleMouseEnter(tech)}
                onMouseMove={handleMouseMove}
                className="tech-row group flex w-full cursor-pointer items-center justify-between border-b border-[#001F54]/15 py-5 px-3 transition-colors duration-200 hover:bg-[#001F54]/5 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`text-base font-black tracking-wider transition-colors duration-200 md:text-lg ${
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
                  className={`font-mono text-[10px] font-bold tracking-widest transition-colors duration-200 ${
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