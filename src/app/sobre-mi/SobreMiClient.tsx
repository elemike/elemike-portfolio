"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import Footer from "@/components/Footer";

gsap.registerPlugin(ScrollTrigger, SplitText);

interface ExperienceItem {
  id: string;
  dates: string;
  yearsRange: string;
  title: string;
  org: string;
  location?: string;
  paragraphs: string[];
  imageCaption: string;
  imageSrc: string;
  imageAlt: string;
}

interface EducationItem {
  id: string;
  yearDisplay: string;
  period: string;
  title: string;
  institution: string;
  description?: string;
  badge?: string;
}

const experiences: ExperienceItem[] = [
  {
    id: "freelance",
    dates: "Noviembre 2020 — Presente",
    yearsRange: "2020 - Presente",
    title: "Desarrollador Full-Stack & Consultor Independiente",
    org: "Freelance / Consultoría",
    paragraphs: [
      "Lideré la construcción y despliegue de productos digitales a medida para Startups y PyMEs, alcanzando más de 10 aplicaciones puestas en producción con un 99.9% de disponibilidad mediante la gestión integral de todo el ciclo de vida de desarrollo con React, Node.js, .NET y PostgreSQL.",
      "Integré pasarelas de pago y automatizaciones impulsadas por Inteligencia Artificial, aumentando en un 25% promedio la conversión de checkout para negocios locales al configurar flujos de pago seguros con Stripe y PayU e integraciones API personalizadas.",
    ],
    imageCaption: "Freelance / Consultoría",
    imageSrc: "/freelance-consultoria.png",
    imageAlt: "Consultoría y desarrollo freelance",
  },
  {
    id: "elite-flower",
    dates: "Agosto 2024 — Julio 2026",
    yearsRange: "2024 - 2026",
    title: "Desarrollador de Software & IT Support",
    org: "The Elite Flower",
    location: "Sopó, Cundinamarca",
    paragraphs: [
      "Automaticé e integré los flujos de inventario y reservas operativas, reduciendo en un 40% los tiempos de procesamiento de carga y eliminando errores manuales a través del desarrollo de plataformas SaaS internas con Next.js, .NET y arquitecturas limpias de alta concurrencia.",
      "Optimicé el procesamiento masivo de documentos logísticos de exportación, triplicando la velocidad de generación de reportes diarios para planta mediante la implementación de microservicios asíncronos y soporte especializado en infraestructura IT.",
    ],
    imageCaption: "The Elite Flower",
    imageSrc: "/elite-flower-logo.png",
    imageAlt: "The Elite Flower Logo",
  },
  {
    id: "san-bartolome",
    dates: "Octubre 2022 — Junio 2023",
    yearsRange: "2022 - 2023",
    title: "Desarrollador Frontend",
    org: "Colegio Mayor de San Bartolomé",
    paragraphs: [
      "Digitalicé de forma integral el portal institucional y la intermediación de trámites académicos, disminuyendo un 65% la congestión de consultas presenciales mediante el diseño de interfaces web accesibles y reactivas enfocadas en la autogestión del usuario.",
      "Optimicé el rendimiento y los tiempos de carga de la plataforma web, logrando una mejora del 50% en las métricas de Core Web Vitals bajo alto tráfico gracias a la implementación de renderizado del lado del servidor (SSR) y optimización de recursos multimedia.",
    ],
    imageCaption: "Colegio Mayor de San Bartolomé",
    imageSrc: "/san-bartolome.png",
    imageAlt: "Colegio Mayor de San Bartolomé Exterior",
  },
];

const educationData: EducationItem[] = [
  {
    id: "basketball",
    yearDisplay: "2018",
    period: "2018",
    title: "El plan era el basquetbol",
    institution: "Antes del código",
    description: "Entrenaba y jugaba basquetbol a diario, con el plan de ser jugador profesional. Me di cuenta del crecimiento de la industria tecnológica, me apasioné por la programación, y descubrí que lo que más me gusta es automatizar lo que le quita tiempo a las personas.",
  },
  {
    id: "platzi",
    yearDisplay: "2019",
    period: "2019 — 2026",
    title: "Formación Continua en Tecnología",
    institution: "Platzi",
    description: "Estrategia de aprendizaje autodidacta y constante a través de rutas especializadas en ingeniería frontend y backend, computación en la nube, ciberseguridad básica, automatización de flujos de trabajo e integración de herramientas basadas en Inteligencia Artificial para potenciar la productividad y la calidad del código limpio en el día a día profesional.",
  },
  {
    id: "sena",
    yearDisplay: "2022",
    period: "2022 — 2023",
    title: "Técnico en Programación de Software",
    institution: "Servicio Nacional de Aprendizaje (SENA)",
    description: "Programa técnico estructurado para consolidar las bases fundamentales de la lógica de programación, el pensamiento computacional y la programación orientada a objetos (POO). Incluyó el diseño de diagramas de flujo, control de versiones con Git, análisis de requerimientos de software y la implementación inicial de bases de datos relacionales estructuradas en SQL.",
  },
  {
    id: "unal",
    yearDisplay: "2023",
    period: "2023",
    title: "Desarrollo de Aplicaciones Móviles",
    institution: "Universidad Nacional de Colombia",
    description: "Capacitación teórico-práctica centrada en el desarrollo integral de aplicaciones móviles multiplataforma y nativas. Se abordaron conceptos críticos de optimización de interfaz de usuario (UI/UX) para dispositivos móviles, gestión del ciclo de vida de actividades, almacenamiento local seguro, consumo eficiente de servicios web RESTful y publicación en tiendas de aplicaciones.",
  },
  {
    id: "politecnico",
    yearDisplay: "2024",
    period: "Agosto 2024 — Diciembre 2028",
    title: "Ingeniería de Software",
    institution: "Politécnico Grancolombiano",
    description: "Carrera profesional orientada a dominar los fundamentos de la ingeniería de sistemas y software moderno. Comprende el estudio profundo de estructuras de datos, diseño y patrones de arquitectura de software, gestión avanzada de bases de datos relacionales y no relacionales, metodologías ágiles de desarrollo y liderazgo de equipos técnicos en proyectos tecnológicos de gran envergadura.",
    badge: "En curso",
  },
  {
    id: "mongo-node",
    yearDisplay: "2026",
    period: "2026",
    title: "MongoDB & Node.js Developer Path",
    institution: "Certificación Profesional",
    description: "Programa especializado enfocado en el diseño de arquitecturas de bases de datos NoSQL de alto rendimiento, modelado avanzado de esquemas en MongoDB, estrategias de indexación, agregaciones complejas y la construcción de APIs robustas, escalables y seguras utilizando Node.js y Express en entornos de producción altamente exigentes.",
    badge: "Certificado",
  },
];

function MobileExpandableParagraphs({ paragraphs }: { paragraphs: string[] }) {
  const [expanded, setExpanded] = useState(false);
  const extraContentRef = useRef<HTMLDivElement>(null);

  const toggleExpand = () => {
    if (!expanded) {
      setExpanded(true);
      setTimeout(() => {
        if (extraContentRef.current) {
          gsap.fromTo(
            extraContentRef.current,
            { opacity: 0, y: -10 },
            { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }
          );
        }
      }, 10);
    } else {
      setExpanded(false);
    }
  };

  if (paragraphs.length <= 1) {
    return <p className="leading-relaxed text-[#050C1E]">{paragraphs[0]}</p>;
  }

  return (
    <div>
      <div className="md:hidden">
        <p className="leading-relaxed text-[#050C1E] font-normal">
          {paragraphs[0]}
        </p>

        {!expanded ? (
          <div className="mt-3 text-left">
            <button
              onClick={toggleExpand}
                className="inline-block font-mono text-xs sm:text-sm font-bold  tracking-wider text-[#034078] underline underline-offset-4 hover:opacity-80"
            >
              Ver más...
            </button>
          </div>
        ) : (
          <div ref={extraContentRef} className="mt-4 space-y-4">
            {paragraphs.slice(1).map((p, idx) => (
              <p key={idx} className="leading-relaxed text-[#050C1E] font-normal">
                {p}
              </p>
            ))}
            <div className="pt-2 text-left">
              <button
                onClick={toggleExpand}
                className="inline-block font-mono text-xs sm:text-sm font-bold  tracking-wider text-[#034078] underline underline-offset-4 hover:opacity-80"
              >
                Ver menos
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="hidden md:block space-y-5">
        {paragraphs.map((p, idx) => (
          <p key={idx} className="leading-relaxed text-[#050C1E] font-normal">
            {p}
          </p>
        ))}
      </div>
    </div>
  );
}

export default function SobreMiClient() {
  const scopeRef = useRef<HTMLDivElement>(null);
  const mainTitleRef = useRef<HTMLHeadingElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);

  const sectionSubTitleRef = useRef<HTMLSpanElement>(null);
  const sectionTitleRef = useRef<HTMLHeadingElement>(null);

  const eduSubTitleRef = useRef<HTMLSpanElement>(null);
  const eduTitleRef = useRef<HTMLHeadingElement>(null);
  const eduLineRef = useRef<HTMLDivElement>(null);

  const currentProjectRef = useRef<HTMLDivElement>(null);
  const currentProjectSubTitleRef = useRef<HTMLSpanElement>(null);
  const currentProjectTitleRef = useRef<HTMLHeadingElement>(null);
  const currentProjectContentRef = useRef<HTMLDivElement>(null);
  const currentProjectImageRef = useRef<HTMLDivElement>(null);

  const [showMoreMain, setShowMoreMain] = useState(false);
  const mainExtraRef = useRef<HTMLDivElement>(null);

  const paragraph1 =
    "Soy Michael Cruz, un desarrollador impulsado por la curiosidad de entender cómo funcionan los sistemas complejos y el deseo de construir software con un impacto directo en el negocio. A lo largo de mi trayectoria, he transformado requerimientos desafiantes en aplicaciones web escalables, estables y diseñadas para soportar altos volúmenes de operación.";
  const paragraph2 =
    "Mi enfoque combina la disciplina técnica de la arquitectura limpia con la agilidad que exigen los entornos modernos. Más allá de escribir código frontend o backend, me especializo en automatizar procesos complejos, eliminar cuellos de botella en la infraestructura e integrar Inteligencia Artificial para entregar productos digitales eficientes, medibles y competitivos.";

  const toggleMainExpand = () => {
    if (!showMoreMain) {
      setShowMoreMain(true);
      setTimeout(() => {
        if (mainExtraRef.current) {
          gsap.fromTo(
            mainExtraRef.current,
            { opacity: 0, y: -10 },
            { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }
          );
        }
      }, 10);
    } else {
      setShowMoreMain(false);
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      tl.from(scopeRef.current, {
        opacity: 0,
        duration: 0.4,
      });

      if (mainTitleRef.current) {
        const splitMainTitle = new SplitText(mainTitleRef.current, {
          type: "chars, words",
        });

        tl.from(
          splitMainTitle.chars,
          {
            opacity: 0,
            y: 25,
            rotateX: -90,
            stagger: 0.02,
            duration: 0.6,
            ease: "back.out(1.7)",
          },
          "-=0.2"
        );
      }

      if (photoRef.current) {
        tl.from(
          photoRef.current,
          {
            opacity: 0,
            y: 35,
            scale: 0.95,
            duration: 0.7,
            ease: "power2.out",
          },
          "-=0.4"
        );
      }

      if (textContainerRef.current) {
        tl.from(
          textContainerRef.current,
          {
            opacity: 0,
            y: 20,
            duration: 0.5,
          },
          "-=0.3"
        );
      }

      if (metaRef.current) {
        tl.from(
          metaRef.current,
          {
            opacity: 0,
            y: 20,
            duration: 0.5,
          },
          "-=0.2"
        );
      }

      if (sectionTitleRef.current) {
        const splitSectionTitle = new SplitText(sectionTitleRef.current, {
          type: "chars",
        });

        const titleTl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionTitleRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });

        if (sectionSubTitleRef.current) {
          titleTl.from(sectionSubTitleRef.current, {
            opacity: 0,
            y: 15,
            duration: 0.4,
          });
        }

        titleTl.from(
          splitSectionTitle.chars,
          {
            opacity: 0,
            y: 20,
            rotateX: -90,
            stagger: 0.02,
            duration: 0.6,
            ease: "back.out(1.5)",
          },
          "-=0.2"
        );
      }

      const articles = gsap.utils.toArray<HTMLElement>("[data-timeline-article]");
      articles.forEach((article) => {
        gsap.from(article, {
          opacity: 0,
          y: 35,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: article,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
      });

      if (eduTitleRef.current) {
        const splitEduTitle = new SplitText(eduTitleRef.current, {
          type: "chars",
        });

        const eduTitleTl = gsap.timeline({
          scrollTrigger: {
            trigger: eduTitleRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });

        if (eduSubTitleRef.current) {
          eduTitleTl.from(eduSubTitleRef.current, {
            opacity: 0,
            y: 15,
            duration: 0.4,
          });
        }

        eduTitleTl.from(
          splitEduTitle.chars,
          {
            opacity: 0,
            y: 20,
            rotateX: -90,
            stagger: 0.02,
            duration: 0.6,
            ease: "back.out(1.5)",
          },
          "-=0.2"
        );
      }

      if (eduLineRef.current) {
        gsap.fromTo(
          eduLineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: "[data-education-timeline-container]",
              start: "top 80%",
              end: "bottom 85%",
              scrub: 0.6,
            },
          }
        );
      }

      const eduItems = gsap.utils.toArray<HTMLElement>("[data-education-item]");
      eduItems.forEach((item) => {
        const yearNum = item.querySelector("[data-education-year]");
        const connector = item.querySelector("[data-education-connector]");
        const contentBox = item.querySelector("[data-education-content]");
        const dot = item.querySelector("[data-education-dot]");

        const eduTl = gsap.timeline({
          scrollTrigger: {
            trigger: item,
            start: "top 82%",
            toggleActions: "play none none reverse",
          },
        });

        if (dot) {
          eduTl.fromTo(
            dot,
            { scale: 0, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.3, ease: "back.out(2)" }
          );
        }

        if (connector) {
          eduTl.fromTo(
            connector,
            { scaleX: 0 },
            { scaleX: 1, duration: 0.4, ease: "power2.out" },
            "-=0.1"
          );
        }

        if (yearNum) {
          eduTl.from(
            yearNum,
            {
              opacity: 0,
              y: 20,
              scale: 0.85,
              duration: 0.5,
              ease: "back.out(1.7)",
            },
            "-=0.2"
          );
        }

        if (contentBox) {
          eduTl.from(
            contentBox,
            {
              opacity: 0,
              y: 20,
              duration: 0.5,
              ease: "power3.out",
            },
            "-=0.3"
          );
        }
      });

      if (currentProjectRef.current) {
        const titleTl = gsap.timeline({
          scrollTrigger: {
            trigger: currentProjectRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });

        if (currentProjectSubTitleRef.current) {
          titleTl.from(currentProjectSubTitleRef.current, {
            opacity: 0,
            y: 15,
            duration: 0.4,
          });
        }

        if (currentProjectTitleRef.current) {
          const splitProjTitle = new SplitText(currentProjectTitleRef.current, {
            type: "chars",
          });
          titleTl.from(
            splitProjTitle.chars,
            {
              opacity: 0,
              y: 20,
              rotateX: -90,
              stagger: 0.02,
              duration: 0.6,
              ease: "back.out(1.5)",
            },
            "-=0.2"
          );
        }

        if (currentProjectContentRef.current) {
          gsap.from(currentProjectContentRef.current, {
            opacity: 0,
            y: 25,
            duration: 0.6,
            ease: "power3.out",
            scrollTrigger: {
              trigger: currentProjectContentRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          });
        }

        if (currentProjectImageRef.current) {
          gsap.from(currentProjectImageRef.current, {
            opacity: 0,
            y: 35,
            scale: 0.97,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: {
              trigger: currentProjectImageRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          });
        }
      }
    }, scopeRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <section
        ref={scopeRef}
        className="w-full bg-[#FFF8EB] text-[#050C1E] font-sans select-none pt-28 pb-16 md:pt-36 md:pb-24"
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-8 md:px-12 lg:px-16">
          {/* TÍTULO PRINCIPAL */}
          <div className="mb-8 md:mb-12 text-center md:text-left">
            <h1
              ref={mainTitleRef}
              className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-tight tracking-tight text-[#0A1128] [perspective:1000px]"
            >
              <span className="block md:inline">¿Quién es</span>{" "}
              <span className="block md:inline">Michael Cruz?</span>
            </h1>
          </div>

          {/* ESTRUCTURA PRINCIPAL */}
          <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-12 md:gap-12 lg:gap-16">
            {/* FOTO DE PERFIL */}
            <div className="flex justify-center md:col-span-5">
              <div
                ref={photoRef}
                className="relative aspect-[3/4] w-full max-w-sm overflow-hidden rounded-3xl bg-[#001F54]/5 shadow-md md:max-w-none md:aspect-[4/5] lg:aspect-[3/4]"
              >
                <Image
                  src="/michael-cruz-principal.webp"
                  alt="Fotografía Principal — Michael Cruz"
                  fill
                  priority
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 100vw, 40vw"
                />
              </div>
            </div>

            {/* COLUMNA DE TEXTO Y DATOS ESTILO ARTÍCULO */}
            <div className="flex flex-col justify-between h-full md:col-span-7">
              <div
                ref={textContainerRef}
                className="mx-auto w-full max-w-prose px-2 sm:px-4 md:px-0 text-lg sm:text-xl lg:text-xl leading-relaxed text-[#050C1E] text-left"
              >
                <div className="md:hidden space-y-4">
                  <p className="leading-relaxed font-normal text-[#050C1E]">
                    {paragraph1}
                  </p>

                  {!showMoreMain ? (
                    <div className="pt-2 text-left">
                      <button
                        onClick={toggleMainExpand}
                        className="inline-block font-mono text-xs sm:text-sm font-bold  tracking-wider text-[#034078] underline underline-offset-4 hover:opacity-80"
                      >
                        Ver más...
                      </button>
                    </div>
                  ) : (
                    <div ref={mainExtraRef} className="mt-4 space-y-6">
                      <p className="leading-relaxed font-normal text-[#050C1E]">
                        {paragraph2}
                      </p>

                      <div className="pt-4 flex flex-col items-center text-center space-y-5 font-mono text-xs sm:text-sm text-[#0A1128]">
                        <div className="space-y-1">
                          <p className="font-bold  tracking-[0.2em] text-[#034078]">
                            Ubicación
                          </p>
                          <p className="font-bold text-base font-sans text-[#0A1128]">
                            Bogotá, Colombia
                          </p>
                        </div>

                        <div className="space-y-1">
                          <p className="font-bold  tracking-[0.2em] text-[#034078]">
                            Enfoque
                          </p>
                          <p className="font-bold text-base font-sans text-[#0A1128] leading-snug">
                            Full-Stack & Arquitectura Limpia
                          </p>
                        </div>

                        <div className="flex items-center justify-center gap-3 pt-2">
                          <a
                            href="https://www.linkedin.com/in/michaelsct/"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="LinkedIn"
                            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#001F54]/20 bg-transparent transition-all duration-200 hover:bg-[#001F54] group shrink-0"
                          >
                            <svg
                              className="h-5 w-5 fill-[#001F54] transition-colors duration-200 group-hover:fill-[#FFF8EB]"
                              viewBox="0 0 24 24"
                            >
                              <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                            </svg>
                          </a>

                          <a
                            href="https://github.com/elemike"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="GitHub"
                            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#001F54]/20 bg-transparent transition-all duration-200 hover:bg-[#001F54] group shrink-0"
                          >
                            <svg
                              className="h-5 w-5 fill-[#001F54] transition-colors duration-200 group-hover:fill-[#FFF8EB]"
                              viewBox="0 0 24 24"
                            >
                              <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" />
                            </svg>
                          </a>
                        </div>
                      </div>

                      <div className="text-center pt-2">
                        <button
                          onClick={toggleMainExpand}
                          className="font-mono text-xs sm:text-sm font-bold  tracking-wider text-[#034078] underline underline-offset-4 hover:opacity-80"
                        >
                          Ver menos
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                <div className="hidden md:block space-y-6">
                  <p className="leading-relaxed font-normal text-[#050C1E]">
                    {paragraph1}
                  </p>
                  <p className="leading-relaxed font-normal text-[#050C1E]">
                    {paragraph2}
                  </p>
                </div>
              </div>

              <div
                ref={metaRef}
                className="hidden md:grid grid-cols-3 items-start gap-6 mt-12 pt-2 font-mono text-xs text-[#0A1128]"
              >
                <div className="space-y-1 text-left">
                  <p className="font-bold  tracking-[0.2em] text-[#034078]">
                    Ubicación
                  </p>
                  <p className="font-bold text-base font-sans text-[#0A1128]">
                    Bogotá, Colombia
                  </p>
                </div>

                <div className="space-y-1 text-left">
                  <p className="font-bold  tracking-[0.2em] text-[#034078]">
                    Enfoque
                  </p>
                  <p className="font-bold text-base font-sans text-[#0A1128] leading-snug">
                    Full-Stack & Arquitectura Limpia
                  </p>
                </div>

                <div className="flex items-center justify-start gap-3 pt-1">
                  <a
                    href="https://www.linkedin.com/in/michaelsct/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#001F54]/20 bg-transparent transition-all duration-200 hover:bg-[#001F54] group shrink-0"
                  >
                    <svg
                      className="h-5 w-5 fill-[#001F54] transition-colors duration-200 group-hover:fill-[#FFF8EB]"
                      viewBox="0 0 24 24"
                    >
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                    </svg>
                  </a>

                  <a
                    href="https://github.com/elemike"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#001F54]/20 bg-transparent transition-all duration-200 hover:bg-[#001F54] group shrink-0"
                  >
                    <svg
                      className="h-5 w-5 fill-[#001F54] transition-colors duration-200 group-hover:fill-[#FFF8EB]"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* TRAYECTORIA LABORAL */}
          <div className="mt-16 md:mt-28">
            <div className="pb-6 md:pb-10 text-left">
              <span
                ref={sectionSubTitleRef}
                className="inline-block font-mono text-xs sm:text-sm font-bold  tracking-[0.25em] text-[#034078]"
              >
                // IMPACTO & EXPERIENCIA
              </span>
              <h2
                ref={sectionTitleRef}
                className="mt-1 text-2xl xs:text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-[#0A1128] leading-tight [perspective:1000px]"
              >
                Trayectoria Profesional
              </h2>
            </div>

            <div className="mt-6 md:mt-16 space-y-12 md:space-y-32">
              {experiences.map((item, index) => {
                const isEven = index % 2 === 0;

                return (
                  <article
                    key={item.id}
                    data-timeline-article
                    className="flex flex-col gap-6 md:grid md:grid-cols-12 md:items-center md:gap-14 border-b border-[#001F54]/10 pb-12 md:pb-0 md:border-none"
                  >
                    <div
                      className={`md:col-span-6 ${
                        isEven ? "md:order-2" : "md:order-1"
                      }`}
                    >
                      <span className="font-mono text-xs sm:text-sm font-bold tracking-widest text-[#034078]">
                        {item.dates}
                      </span>

                      <h3 className="mt-1 text-2xl sm:text-3xl md:text-4xl font-black leading-tight text-[#0A1128]">
                        {item.title}
                      </h3>

                      <p className="mt-1 font-extrabold text-base sm:text-lg text-[#001F54]">
                        {item.org}
                      </p>

                      <div className="mt-4 md:mt-6 text-lg sm:text-xl leading-relaxed text-[#050C1E] font-normal max-w-prose px-1 sm:px-2 md:px-0">
                        <MobileExpandableParagraphs paragraphs={item.paragraphs} />
                      </div>
                    </div>

                    <div
                      className={`md:col-span-6 ${
                        isEven ? "md:order-1" : "md:order-2"
                      }`}
                    >
                      <div>
                        <div className="relative flex aspect-[16/10] w-full items-center justify-center rounded-2xl bg-[#001F54]/5 overflow-hidden shadow-sm">
                          <Image
                            src={item.imageSrc}
                            alt={item.imageAlt}
                            fill
                            className={
                              item.id === "elite-flower"
                                ? "object-cover object-center" // Ocupa todo el ancho y alto sin márgenes
                                : "object-cover object-center"
                            }
                            sizes="(max-width: 768px) 100vw, 50vw"
                          />
                        </div>

                        <div className="mt-3 flex items-center justify-between font-mono text-xs sm:text-sm font-bold text-[#034078]">
                          <span>{item.imageCaption}</span>
                          <span>{item.yearsRange}</span>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>

          {/* SECCIÓN: TIMELINE DE EDUCACIÓN & CERTIFICACIONES */}
          <div className="mt-16 md:mt-28">
            <div className="pb-10 md:pb-16 text-left">
              <span
                ref={eduSubTitleRef}
                className="inline-block font-mono text-xs sm:text-sm font-bold  tracking-[0.25em] text-[#034078]"
              >
                // FORMACIÓN & CERTIFICACIONES
              </span>
              <h2
                ref={eduTitleRef}
                className="mt-1 text-2xl xs:text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-[#0A1128] leading-tight [perspective:1000px]"
              >
                Educación
              </h2>
            </div>

            <div data-education-timeline-container className="relative">
              {/* LÍNEA VERTICAL CENTRAL */}
              <div
                ref={eduLineRef}
                className="absolute top-0 bottom-0 left-4 md:left-1/2 w-[2px] bg-[#001F54]/20 origin-top -translate-x-1/2"
              />

              <div className="space-y-16 md:space-y-28">
                {educationData.map((item) => {
                  return (
                    <div
                      key={item.id}
                      data-education-item
                      className="relative flex flex-col md:grid md:grid-cols-12 md:items-center pl-10 md:pl-0 md:py-6"
                    >
                      {/* CONECTOR HORIZONTAL HACIA LA DERECHA */}
                      <div
                        data-education-connector
                        className="hidden md:block absolute top-1/2 -translate-y-1/2 left-1/2 w-8 lg:w-12 origin-left h-[2px] bg-[#001F54]/25 z-0"
                      />

                      {/* AÑO DESTACADO (Lado Izquierdo) */}
                      <div className="md:col-span-6 md:order-1 md:flex md:justify-end md:pr-12 lg:pr-16">
                        <div
                          data-education-year
                          className="flex flex-col items-start md:items-end gap-2 font-black tracking-tighter text-[#840032] text-4xl sm:text-5xl lg:text-7xl"
                        >
                          <span>{item.yearDisplay}</span>
                          {item.badge && (
                            <span className="font-mono text-[10px] sm:text-xs  bg-[#840032]/10 text-[#840032] border border-[#840032]/20 px-2.5 py-0.5 rounded-full font-bold whitespace-nowrap tracking-normal">
                              {item.badge}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* PUNTO CENTRAL DE LA LÍNEA DE TIEMPO */}
                      <div
                        data-education-dot
                        className="absolute left-4 md:left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[#FFF8EB] border-4 border-[#840032] z-10 shadow-sm"
                      />

                      {/* CONTENIDO (Lado Derecho) */}
                      <div
                        data-education-content
                        className="md:col-span-6 md:order-2 pl-4 md:pl-12 lg:pl-16 pt-2 md:pt-0"
                      >
                        <div className="bg-transparent">
                          <span className="font-mono text-xs sm:text-sm font-bold tracking-wider text-[#034078]">
                            {item.institution}
                          </span>
                          <h3 className="mt-1 text-xl sm:text-2xl md:text-3xl font-black leading-tight text-[#0A1128]">
                            {item.title}
                          </h3>
                          {item.description && (
                            <p className="mt-3 text-base sm:text-lg leading-relaxed text-[#050C1E] font-normal max-w-2xl">
                              {item.description}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* SECCIÓN DE PROYECTO ACTUAL (AGTECH) */}
          <div ref={currentProjectRef} className="mt-16 md:mt-28 pt-8 md:pt-12 border-t border-[#001F54]/10">
            <div className="pb-4 md:pb-6 text-left">
              <span
                ref={currentProjectSubTitleRef}
                className="inline-block font-mono text-xs sm:text-sm font-bold  tracking-[0.25em] text-[#034078]"
              >
                // INNOVACIÓN EN CURSO
              </span>
              <h2
                ref={currentProjectTitleRef}
                className="mt-1 text-2xl xs:text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-[#0A1128] leading-tight [perspective:1000px]"
              >
                Proyecto AgTech
              </h2>
            </div>

            <div className="mt-4 md:mt-8 flex flex-col gap-6">
              <div ref={currentProjectContentRef} className="w-full">
                <div className="text-lg sm:text-xl lg:text-2xl leading-relaxed text-[#050C1E] font-normal">
                  <MobileExpandableParagraphs
                    paragraphs={[
                      "Desarrollo una solución AgTech que usa un dron DJI Mini 3 Pro para monitorear cultivos mediante imágenes aéreas RGB. Combino índices de vegetación (ExG, VARI, TGI) con Deep Learning y modelos YOLO en Python para mapear la cobertura del cultivo y detectar zonas con estrés visible, señales tempranas de posibles enfermedades o deficiencias.",
                    ]}
                  />
                </div>

                <div className="mt-5 flex items-center justify-start">
                  <Link
                    href="/proyectos"
                    className="inline-flex items-center gap-2 rounded-lg bg-[#001F54] px-6 py-3.5 font-mono text-xs sm:text-sm font-bold tracking-wider text-[#FFF8EB] shadow-md transition-all hover:bg-[#0A1128] hover:scale-105 active:scale-95"
                  >
                    <span>Ver artículo completo</span>
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
                  </Link>
                </div>
              </div>

              {/* IMAGEN DEBAJO ANIMADA */}
              <div ref={currentProjectImageRef} className="w-full">
                <div className="relative aspect-[21/9] w-full items-center justify-center rounded-2xl bg-[#001F54]/5 overflow-hidden shadow-sm">
                  <Image
                    src="/dron.png"
                    alt="Proyecto AgTech - Dron"
                    fill
                    className="object-cover object-center"
                    sizes="100vw"
                  />
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* FOOTER CONECTADO */}
      <Footer />
    </>
  );
}