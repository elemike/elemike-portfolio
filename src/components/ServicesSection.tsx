'use client';

import { useLayoutEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    id: '01',
    category: 'Software & Web',
    title: 'Desarrollo Web / Desarrollo de Software',
    description:
      'Soluciones digitales a medida diseñadas con arquitecturas sólidas y escalables (Clean Architecture), orientadas a resolver necesidades operativas reales y potenciar las ventas.',
    features: [
      'Aplicaciones web a medida (Full-Stack): sistemas de gestión, dashboards administrativos y portales internos.',
      'Plataformas e-commerce: tiendas integradas con catálogo, carrito y pasarelas de pago (Wompi, PayU).',
      'Sistemas SaaS internos: control de inventario, reservas y automatización de flujos administrativos (DeskHub, Elite Flower).',
      'Modernización de sistemas legados: migración de aplicaciones VB6/Access a tecnologías web actuales.',
      'Consultoría de arquitectura: revisión y optimización de código/arquitectura existente.',
    ],
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=90&w=1920&auto=format&fit=crop',
    link: '#contacto',
  },
  {
    id: '02',
    category: 'Inteligencia Artificial & IA',
    title: 'Automatización de Negocios',
    description:
      'Optimizamos la interacción con tus clientes y eliminamos tareas manuales repetitivas mediante la integración de agentes inteligentes, bots y conexión de sistemas.',
    features: [
      'Bots de atención al cliente con IA (WhatsApp, Web): resolución de consultas frecuentes y reducción de carga en recepción (casos reales: clínicas odontológicas, repuestos de vehículos, barberías).',
      'Automatización de agendamiento de citas y gestión de reservas.',
      'Gestión y organización de facturación: generación, ordenamiento y reportes automáticos.',
      'Integración entre sistemas: conexión de herramientas desarticuladas (APIs, procesos ETL) para eliminar trabajo manual.',
    ],
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=90&w=1920&auto=format&fit=crop',
    link: '#contacto',
  },
  {
    id: '03',
    category: 'Agritech & Drones',
    title: 'AgTech & Monitoreo Agrícola',
    description:
      'Transformamos el campo mediante tecnología de precisión, captura de datos aéreos y visualización de métricas para la toma de decisiones estratégicas en cultivos.',
    features: [
      'Monitoreo de cultivos con drones: mapeo de cobertura y detección visual de estrés vegetal (operación real con DJI Mini 3 Pro).',
      'Reportes y dashboards para clientes agroindustriales: entrega de métricas claras y accionables sin exponer procesamiento interno.',
      'Diagnóstico inicial de campo: vuelo piloto + informe integral como punto de entrada de bajo compromiso.',
    ],
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=90&w=1920&auto=format&fit=crop',
    link: '#contacto',
  },
];

export default function ServicesSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Animación Encabezado
      gsap.from('.services-header', {
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

      // 2. Animación de tarjetas
      const cards = gsap.utils.toArray<HTMLElement>('.service-card');

      cards.forEach((card) => {
        const imageBox = card.querySelector('.service-image-box');
        const image = card.querySelector('.parallax-img');
        const content = card.querySelector('.service-content');

        if (imageBox) {
          gsap.from(imageBox, {
            scrollTrigger: {
              trigger: card,
              start: 'top 80%',
              once: true,
            },
            opacity: 0,
            y: 20,
            duration: 1,
            ease: 'power3.out',
          });
        }

        if (content) {
          gsap.from(content, {
            scrollTrigger: {
              trigger: card,
              start: 'top 75%',
              once: true,
            },
            opacity: 0,
            y: 30,
            duration: 0.9,
            ease: 'power3.out',
          });
        }

        if (image) {
          gsap.fromTo(
            image,
            { yPercent: -8, scale: 1.08 },
            {
              yPercent: 8,
              ease: 'none',
              scrollTrigger: {
                trigger: card,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
              },
            }
          );
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="servicios"
      className="w-full py-20 select-none bg-[#FFF8EB]"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        {/* HEADER DE LA SECCIÓN */}
        <div className="services-header mb-12 flex flex-col items-start gap-2">
          <span className="font-mono text-sm font-bold uppercase tracking-[0.25em] text-[#034078]">
            SERVICIOS
          </span>
          <h2 className="text-4xl font-extrabold tracking-tight text-[#0A1128] sm:text-5xl md:text-6xl lg:text-7xl">
            Soluciones digitales a medida
          </h2>
          <p className="mt-3 max-w-2xl text-base font-medium leading-relaxed text-[#034078] md:text-lg">
            Desarrollo de software, automatización e IA diseñados para optimizar procesos y escalar tu negocio.
          </p>
        </div>

        {/* BLOQUES DE SERVICIOS */}
        <div className="flex flex-col gap-24 pt-8 md:gap-32">
          {services.map((service, index) => {
            const isEven = index % 2 === 0;

            return (
              <div
                key={service.id}
                className={`service-card flex flex-col gap-10 md:items-center md:gap-16 ${
                  isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* IMAGEN ASPECTO 4:3 */}
                <div className="service-image-box relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-[#001F54]/5 md:w-1/2">
                  <div className="parallax-img absolute -top-[10%] left-0 h-[120%] w-full">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      priority={index === 0}
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                </div>

                {/* CONTENIDO DE TEXTO */}
                <div className="service-content flex w-full flex-col items-start gap-5 md:w-1/2">
                  {/* CATEGORÍA (SIN NUMERACIÓN) */}
                  <div className="font-mono text-xs font-bold  tracking-widest text-[#034078]">
                    <span>{service.category}</span>
                  </div>

                  <h3 className="text-2xl font-black leading-tight text-[#0A1128] sm:text-3xl md:text-4xl">
                    {service.title}
                  </h3>

                  <p className="text-base font-normal leading-relaxed text-[#0A1128]/80 md:text-lg">
                    {service.description}
                  </p>

                  {/* BULLETS */}
                  <ul className="flex flex-col gap-2.5 pt-1">
                    {service.features.map((feature, fIndex) => (
                      <li
                        key={fIndex}
                        className="flex items-start gap-3 text-sm font-medium leading-relaxed text-[#0A1128]/90 md:text-base"
                      >
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#034078]" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA / LINK */}
                  <a
                    href={service.link}
                    className="group inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-[#001F54] transition-colors hover:text-[#034078] pt-3"
                  >
                    <span>Solicitar Servicio</span>
                    <svg
                      className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
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
            );
          })}
        </div>
      </div>
    </section>
  );
}