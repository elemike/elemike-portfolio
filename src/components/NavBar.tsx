'use client';

import { useState, useEffect } from 'react';

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

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
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
          className="font-mono text-base font-black tracking-widest text-[#FFF8EB] transition-colors hover:text-[#81A4CD]"
        >
          Michael Cruz<span className="text-[#81A4CD]">.</span>
        </a>

        {/* MENÚ DESKTOP */}
        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item, index) => (
            <a
              key={index}
              href={item.href}
              className="font-mono text-xs font-bold  tracking-widest text-[#FFF8EB]/80 transition-colors hover:text-[#81A4CD]"
            >
              {item.name}
            </a>
          ))}
        </nav>

        {/* BOTÓN CTA DESKTOP */}
        <a
          href="#contacto"
          className="hidden rounded-full border border-[#81A4CD]/30 bg-[#001F54] px-5 py-2 font-mono text-xs font-bold tracking-wider text-[#FFF8EB] transition-all hover:scale-105 hover:bg-[#81A4CD] hover:text-[#0A1128] active:scale-95 md:inline-block"
        >
          Contáctame
        </a>

        {/* BOTÓN MENÚ MÓVIL */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          type="button"
          aria-label="Abrir menú"
          className="text-[#FFF8EB] focus:outline-none md:hidden"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            {mobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* MENÚ DESPLEGABLE MÓVIL */}
      {mobileMenuOpen && (
        <div className="flex flex-col gap-4 border-b border-[#81A4CD]/15 bg-[#0A1128] px-6 py-6 md:hidden">
          {navItems.map((item, index) => (
            <a
              key={index}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="font-mono text-sm font-bold  tracking-widest text-[#FFF8EB]/80 hover:text-[#81A4CD]"
            >
              {item.name}
            </a>
          ))}
          <a
            href="#contacto"
            onClick={() => setMobileMenuOpen(false)}
            className="mt-2 inline-block w-full rounded-full bg-[#001F54] py-3 text-center font-mono text-xs font-bold uppercase tracking-wider text-[#FFF8EB]"
          >
            Contáctame
          </a>
        </div>
      )}
    </header>
  );
}