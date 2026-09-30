'use client';

import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(useGSAP);
}

const navItems = [
  { name: 'Inicio', href: '#' },
  { name: 'Sobre mí', href: '#sobre-mi' },
  { name: 'Proyectos', href: '#proyectos' },
  { name: 'Servicios', href: '#servicios' },
  { name: 'Contacto', href: '#contacto' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const lineTopRef = useRef<SVGPathElement>(null);
  const lineBottomRef = useRef<SVGPathElement>(null);

  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  // Cierre automático al detectar scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Si el usuario hace scroll mientras el menú está abierto, se dispara la animación de cierre
      if (mobileMenuOpen) {
        closeMenu();
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [mobileMenuOpen]);

  // Bloqueo del scroll del body mientras el menú está abierto
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Animaciones GSAP
  useGSAP(
    () => {
      const tl = gsap.timeline({ paused: true });

      // 1. Transformación del Icono Hamburguesa a X
      tl.to(
        lineTopRef.current,
        {
          attr: { d: 'M 6 6 L 18 18' },
          duration: 0.3,
          ease: 'power2.inOut',
        },
        0
      ).to(
        lineBottomRef.current,
        {
          attr: { d: 'M 6 18 L 18 6' },
          duration: 0.3,
          ease: 'power2.inOut',
        },
        0
      );

      // 2. Despliegue Suave del Menu Overlay
      tl.fromTo(
        menuRef.current,
        {
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
          visibility: 'hidden',
        },
        {
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
          visibility: 'visible',
          duration: 0.6,
          ease: 'power4.inOut',
        },
        0
      );

      // 3. Entrada en Cascada (Stagger) de los Enlaces
      if (linksRef.current) {
        const links = linksRef.current.querySelectorAll('.mobile-link-item');
        tl.fromTo(
          links,
          {
            opacity: 0,
            y: 25,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            stagger: 0.08,
            ease: 'power3.out',
          },
          '-=0.25'
        );
      }

      timelineRef.current = tl;
    },
    { scope: containerRef }
  );

  const toggleMenu = () => {
    if (!timelineRef.current) return;
    if (mobileMenuOpen) {
      timelineRef.current.reverse();
    } else {
      timelineRef.current.play();
    }
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMenu = () => {
    if (timelineRef.current) {
      timelineRef.current.reverse();
      setMobileMenuOpen(false);
    }
  };

  return (
    <header
      ref={containerRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 select-none ${
        scrolled
          ? 'bg-[#0A1128]/90 backdrop-blur-md py-4 border-b border-[#81A4CD]/15 shadow-md'
          : 'bg-[#0A1128] py-5'
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 md:px-10">
        {/* LOGO / NOMBRE */}
        <a
          href="#"
          className="relative z-50 font-mono text-base font-black tracking-widest text-[#FFF8EB] transition-colors hover:text-[#81A4CD]"
        >
          Michael Cruz<span className="text-[#81A4CD]">.</span>
        </a>

        {/* MENÚ DESKTOP */}
        <nav className="hidden items-center gap-8 lg:flex">
          {navItems.map((item, index) => (
            <a
              key={index}
              href={item.href}
              className="font-mono text-xs font-bold tracking-widest text-[#FFF8EB]/80 transition-colors hover:text-[#81A4CD]"
            >
              {item.name}
            </a>
          ))}
        </nav>

        {/* BOTÓN CTA DESKTOP */}
        <a
          href="#contacto"
          className="group hidden items-center gap-2.5 rounded-xl bg-[#001F54] px-5 py-2.5 font-mono text-xs font-bold text-[#FFF8EB] shadow-md transition-all duration-200 hover:bg-[#81A4CD] hover:text-[#0A1128] active:scale-[0.98] lg:inline-flex"
        >
          <span>Contáctame</span>
          <svg
            className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M7 17L17 7M17 7H7M17 7V17"
            />
          </svg>
        </a>

        {/* BOTÓN HAMBURGUESA MÓVIL / TABLET */}
        <button
          onClick={toggleMenu}
          type="button"
          aria-label="Abrir menú"
          className="relative z-50 flex h-10 w-10 items-center justify-center rounded-lg focus:outline-none lg:hidden"
        >
          <svg className="h-6 w-6 stroke-[#FFF8EB]" viewBox="0 0 24 24">
            <path
              ref={lineTopRef}
              strokeWidth="2"
              strokeLinecap="round"
              d="M 4 8 L 20 8"
            />
            <path
              ref={lineBottomRef}
              strokeWidth="2"
              strokeLinecap="round"
              d="M 4 16 L 20 16"
            />
          </svg>
        </button>
      </div>

      {/* MENÚ DESPLEGABLE CON MÁS ESPACIO Y PANTALLA COMPLETA FIXED */}
      <div
        ref={menuRef}
        className="fixed inset-0 z-40 flex h-dvh w-full flex-col justify-between bg-[#0A1128] px-8 pt-28 pb-10 text-[#FFF8EB] lg:hidden"
        style={{
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
          visibility: 'hidden',
        }}
      >
        {/* BLOQUE CENTRADO DE NAVEGACIÓN CON MAYOR ESPACIADO (gap-10) */}
        <div
          ref={linksRef}
          className="my-auto flex flex-col items-center justify-center gap-10 text-center"
        >
          {navItems.map((item, index) => (
            <a
              key={index}
              href={item.href}
              onClick={closeMenu}
              className="mobile-link-item font-mono text-3xl font-extrabold tracking-wider text-[#FFF8EB] transition-colors hover:text-[#81A4CD] sm:text-4xl"
            >
              {item.name}
            </a>
          ))}
        </div>

        {/* PIE DEL MENÚ */}
        <div className="flex flex-col gap-5 border-t border-[#81A4CD]/15 pt-6">
          <a
            href="#contacto"
            onClick={closeMenu}
            className="group inline-flex items-center justify-center gap-2.5 rounded-xl bg-[#001F54] py-3.5 px-6 font-mono text-xs font-bold text-[#FFF8EB] shadow-md transition-all duration-200 active:scale-[0.98]"
          >
            <span>Contáctame</span>
            <svg
              className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7 17L17 7M17 7H7M17 7V17"
              />
            </svg>
          </a>

          <div className="flex justify-between font-mono text-[11px] text-[#FFF8EB]/50">
            <span>Michael Cruz</span>
            <span>© 2026</span>
          </div>
        </div>
      </div>
    </header>
  );
}