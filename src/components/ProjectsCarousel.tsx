'use client';

import { useRef, useState, useEffect, useLayoutEffect } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

interface Rect {
  left: number;
  top: number;
  width: number;
  height: number;
}

// URLs de Unsplash optimizadas con formato WebP y ancho adecuado
const PROJECTS = [
  {
    id: 'deskhub',
    title: 'DeskHub',
    subtitle: 'Workplace Management Platform',
    description:
      'Plataforma para la gestión y reserva de espacios de oficina. Desarrollada con Angular y ASP.NET Core usando Clean Architecture, Entity Framework Core y control de concurrencia optimista.',
    tags: ['Angular', 'ASP.NET Core', 'C#', 'SQL Server', 'Clean Architecture'],
    image:
      'https://images.unsplash.com/photo-1643114964010-8b077e281a50?auto=format&fit=crop&w=1400&q=80&fm=webp',
    accent: '#034078',
  },
  {
    id: 'restauranthub',
    title: 'Restaurante La Ruda',
    subtitle: 'Restaurante Management System',
    description:
      'Sistema integral para la gestión de restaurantes: pedidos, mesas, menús e inventario en tiempo real. API REST con NestJS y frontend reactivo en React con TypeScript.',
    tags: ['React', 'NestJS', 'PostgreSQL', 'TypeScript', 'REST API'],
    image:
      'https://images.unsplash.com/photo-1531973968078-9bb02785f13d?auto=format&fit=crop&w=1400&q=80&fm=webp',
    accent: '#81A4CD',
  },
  {
    id: 'cropmonitoring',
    title: 'Monitereo de Cultivos',
    subtitle: 'AI + DRONES + AGRICULTURE',
    description:
      'Análisis de cultivos mediante imágenes aéreas con DJI Mini 3 Pro. Computer vision con YOLO para detectar anomalías, clasificar cultivos y generar análisis GIS con GeoTIFF.',
    tags: ['Python', 'OpenCV', 'PyTorch', 'YOLO', 'Rasterio', 'GeoTIFF', 'GIS'],
    image:
      'https://images.unsplash.com/photo-1516822277566-bb38424a2b77?auto=format&fit=crop&w=1400&q=80&fm=webp',
    accent: '#001F54',
  },
] as const;

function calculateRects(W: number, H: number) {
  if (W === 0 || H === 0) return null;

  const PADX = W > 768 ? 48 : 16;
  const HEADER = W > 768 ? 140 : 120;
  const GAP = 20;

  const innerW = W - PADX * 2;
  const innerH = H - HEADER - 30;

  const col1W = W > 768 ? innerW * 0.58 : innerW;
  const col2W = W > 768 ? innerW * 0.42 - GAP : innerW;
  const rowH = (innerH - GAP) / 2;

  const bento: Rect[] = [
    { left: PADX, top: HEADER, width: col1W, height: innerH },
    { left: PADX + col1W + GAP, top: HEADER, width: col2W, height: rowH },
    {
      left: PADX + col1W + GAP,
      top: HEADER + rowH + GAP,
      width: col2W,
      height: rowH,
    },
  ];

  const full: Rect = { left: 0, top: 0, width: W, height: H };

  return { bento, full, H };
}

export default function SelectedWork() {
  const outerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);

  const [activeStep, setActiveStep] = useState(0);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [dimensions, setDimensions] = useState<{ w: number; h: number }>({
    w: 0,
    h: 0,
  });

  const useIsomorphicLayoutEffect =
    typeof window !== 'undefined' ? useLayoutEffect : useEffect;

  useIsomorphicLayoutEffect(() => {
    setDimensions({ w: window.innerWidth, h: window.innerHeight });

    const handleResize = () => {
      setDimensions({ w: window.innerWidth, h: window.innerHeight });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const rects = calculateRects(dimensions.w, dimensions.h);

  useGSAP(
    () => {
      const outer = outerRef.current;
      const sticky = stickyRef.current;
      if (!outer || !sticky || !rects) return;

      const cards = gsap.utils.toArray<HTMLElement>('.bento-card');
      const overlays = gsap.utils.toArray<HTMLElement>('.case-study-overlay');
      const previews = gsap.utils.toArray<HTMLElement>('.bento-preview');
      const STEPS = PROJECTS.length;

      const { bento, full, H } = rects;

      // Seleccionar el header y los indicadores para animar su visibilidad
      const header = sticky.querySelector('header');
      const uiControls = sticky.querySelectorAll('.ui-control');

      // Posicionamiento inicial de las tarjetas bento
      cards.forEach((card, i) => {
        gsap.set(card, {
          left: bento[i].left,
          top: bento[i].top,
          width: bento[i].width,
          height: bento[i].height,
          position: 'absolute',
          zIndex: 1,
        });
      });

      const tl = gsap.timeline({ paused: true });

      PROJECTS.forEach((_, i) => {
        const card = cards[i];
        const overlay = overlays[i];
        const preview = previews[i];

        // 1. Expansión a pantalla completa (Aumentamos zIndex a 50 para cubrir la pantalla completa)
        tl.to(
          card,
          {
            left: full.left,
            top: full.top,
            width: full.width,
            height: full.height,
            borderRadius: '0px',
            zIndex: 50,
            ease: 'power3.inOut',
            duration: 0.5,
          },
          i
        );

        // Ocultar Header y Controles de la Interfaz durante la expansión
        tl.to(
          [header, ...Array.from(uiControls)],
          {
            opacity: 0,
            pointerEvents: 'none',
            duration: 0.25,
            ease: 'power2.out',
          },
          i
        );

        // Ocultar vista previa Bento
        tl.to(
          preview,
          {
            opacity: 0,
            duration: 0.25,
            ease: 'power2.out',
          },
          i
        );

        // 2. Transición Overlay Caso de Estudio
        tl.fromTo(
          overlay,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' },
          i + 0.35
        );
        tl.to(
          overlay,
          { opacity: 0, y: -20, duration: 0.25, ease: 'power2.in' },
          i + 0.7
        );

        // 3. Atenuación de otras tarjetas
        cards.forEach((other, j) => {
          if (j === i) return;
          tl.to(other, { opacity: 0.1, duration: 0.25 }, i).to(
            other,
            { opacity: 1, duration: 0.25 },
            i + 0.75
          );
        });

        // 4. Reposicionamiento a celda Bento (Restaurar visibilidad del Header)
        if (i < STEPS - 1) {
          tl.to(
            card,
            {
              left: bento[i].left,
              top: bento[i].top,
              width: bento[i].width,
              height: bento[i].height,
              borderRadius: '1.5rem',
              zIndex: 1,
              ease: 'power3.inOut',
              duration: 0.4,
            },
            i + 0.8
          );

          // Mostrar Header y Controles nuevamente
          tl.to(
            [header, ...Array.from(uiControls)],
            {
              opacity: 1,
              pointerEvents: 'auto',
              duration: 0.3,
              ease: 'power2.inOut',
            },
            i + 0.8
          );

          tl.to(
            preview,
            {
              opacity: 1,
              duration: 0.3,
              ease: 'power2.inOut',
            },
            i + 0.8
          );
        }
      });

      ScrollTrigger.create({
        trigger: outer,
        start: 'top top',
        end: `+=${(STEPS + 0.6) * H}`,
        pin: sticky,
        scrub: 1.0,
        invalidateOnRefresh: true,
        onUpdate(self) {
          setHasScrolled(self.progress > 0.01);

          const raw = self.progress * (STEPS + 0.5) - 0.2;
          const currentProgress = Math.max(0, Math.min(STEPS, raw)) / STEPS;
          tl.progress(currentProgress);

          const step = Math.min(
            STEPS - 1,
            Math.floor(self.progress * STEPS)
          );
          setActiveStep(step);
        },
      });
    },
    { scope: outerRef, dependencies: [dimensions] }
  );

  return (
    <section ref={outerRef} className="relative w-full bg-[#FFF8EB] text-[#0A1128] select-none">
      <div ref={stickyRef} className="relative h-screen w-full overflow-hidden">
        {/* ENCABEZADO */}
        <header className="absolute top-0 left-0 right-0 z-40 flex items-end justify-between px-6 pt-8 pb-4 md:px-12 border-[#001F54]/15 bg-[#FFF8EB]/80 backdrop-blur-sm transition-opacity duration-300">
          <div className="flex flex-col items-start gap-1">
            <span className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-[#034078]">
              PORTAFOLIO
            </span>
            <h2 className="text-2xl font-black tracking-tight text-[#0A1128] sm:text-3xl md:text-4xl">
              Proyectos Destacados
            </h2>
          </div>
        </header>

        {/* INDICADOR DE SCROLL */}
        <div
          className={`ui-control absolute bottom-6 left-1/2 z-40 -translate-x-1/2 font-mono text-xs font-bold tracking-widest text-[#034078] transition-opacity duration-300 ${
            hasScrolled ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
        >
          [ Haz scroll para explorar ]
        </div>

        {/* PUNTOS DE PROGRESO LATERALES */}
        <div className="ui-control absolute right-6 top-1/2 z-40 flex -translate-y-1/2 flex-col gap-3">
          {PROJECTS.map((_, idx) => (
            <div
              key={idx}
              className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${
                activeStep === idx ? 'bg-[#001F54] scale-125' : 'bg-[#001F54]/20'
              }`}
            />
          ))}
        </div>

        {/* TARJETAS BENTO */}
        {PROJECTS.map((project, idx) => {
          const initialPos = rects?.bento[idx];

          return (
            <article
              key={project.id}
              className="bento-card absolute overflow-hidden rounded-3xl border border-neutral-900/10 bg-[#FFF8EB] shadow-2xl"
              style={{
                left: initialPos ? `${initialPos.left}px` : '0px',
                top: initialPos ? `${initialPos.top}px` : '0px',
                width: initialPos ? `${initialPos.width}px` : '100%',
                height: initialPos ? `${initialPos.height}px` : '100%',
                willChange: 'top, left, width, height, transform',
              }}
            >
              {/* IMAGEN DE FONDO CON NEXT/IMAGE */}
              <div className="absolute inset-0 z-0 overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  priority={idx === 0} // La primera tarjeta se carga de inmediato para optimizar LCP
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 50vw"
                  className="object-cover opacity-85 transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent md:bg-gradient-to-r md:from-black/80 md:via-black/40 md:to-transparent" />
              </div>

              {/* VISTA PREVIA BENTO */}
              <div className="bento-preview relative z-10 flex h-full flex-col justify-end p-6">
                <div>
                  <h3 className="text-2xl font-black tracking-tight text-[#FFF8EB] drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] md:text-3xl">
                    {project.title}
                  </h3>
                  <p className="mt-1 font-mono text-[10px] font-bold tracking-wider text-[#81A4CD] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                    {project.subtitle}
                  </p>
                </div>
              </div>

              {/* OVERLAY CASO DE ESTUDIO */}
              <div className="case-study-overlay pointer-events-none absolute inset-0 z-20 flex flex-col justify-end items-start p-6 md:p-16 text-left">
                <div className="max-w-xl space-y-4 rounded-2xl border border-[#001F54]/15 bg-[#FFF8EB]/95 p-6 md:p-8 backdrop-blur-md shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8)]">
                  <span
                    className="inline-block rounded-full border border-[#001F54]/20 bg-[#FFF8EB] px-3.5 py-1 font-mono text-[11px] font-bold tracking-widest text-[#001F54]"
                    style={{ borderColor: project.accent }}
                  >
                    {project.subtitle}
                  </span>

                  <h3 className="text-3xl font-black tracking-tight text-[#0A1128] md:text-5xl">
                    {project.title}
                  </h3>

                  <p className="text-xs leading-relaxed text-[#034078] md:text-sm font-medium">
                    {project.description}
                  </p>

                  {/* TAGS */}
                  <div className="flex flex-wrap gap-2 pt-1">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md border border-[#001F54]/10 bg-[#001F54]/5 px-2.5 py-1 font-mono text-[11px] font-semibold text-[#001F54]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* BOTÓN CTA */}
                  <div className="pt-2">
                    <button className="pointer-events-auto inline-flex cursor-pointer items-center gap-2 rounded-full bg-[#001F54] px-6 py-2.5 font-mono text-xs font-bold tracking-wider text-[#FFF8EB] transition-transform hover:scale-105 hover:bg-[#0A1128] active:scale-95 shadow-xl">
                      Ver caso de estudio →
                    </button>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}