// src/app/not-found.tsx
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

// Definición del título para la pestaña del navegador
export const metadata: Metadata = {
  title: 'Página no encontrada (404)',
  description: 'La página que buscas no existe o ha sido movida.',
};

export default function NotFound() {
  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-between overflow-hidden select-none font-mono bg-[#0A1128]">
      {/* CONTENEDOR CON ZOOM PARA OCULTAR BORDES BLANCOS */}
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src="/404-landscape.png"
          alt="Atardecer en el campo"
          fill
          priority
          className="object-cover object-center pointer-events-none scale-110"
          quality={100}
        />
      </div>

      {/* CONTENIDO CENTRADO */}
      <div className="relative z-10 my-auto flex flex-col items-center text-center px-4 max-w-lg">
        <h1 className="text-7xl md:text-9xl font-extrabold tracking-tight text-[#FFF8EB] drop-shadow-lg">
          404
        </h1>

        <h2 className="mt-4 text-2xl md:text-3xl font-bold text-white drop-shadow">
          Página no encontrada
        </h2>

        <p className="mt-2 text-sm md:text-base text-amber-100/90 leading-relaxed drop-shadow-sm">
          El enlace al que intentas acceder no está disponible. Vuelve al inicio para explorar el portafolio.
        </p>

        <div className="mt-6 flex items-center justify-center gap-3">
          <Link
            href="/"
            className="px-6 py-2.5 bg-[#0A1128] text-[#FFF8EB] text-sm font-semibold rounded-full shadow-lg hover:bg-black hover:scale-105 active:scale-95 transition-all duration-200 border border-white/20"
          >
            Ir al Inicio
          </Link>
        </div>
      </div>
    </div>
  );
}